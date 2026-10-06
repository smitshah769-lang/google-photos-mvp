import { createStore, type StoreApi } from 'zustand/vanilla'
import { useStore } from 'zustand'
import {
  EARLY_STOP_AT,
  FEW_RESULTS,
  LOOP_LIMIT,
  MAX_QUERY_CHARS,
  QUESTIONS_PER_ROUND,
  CHIP_OPTIONS_PER_QUESTION,
  THIRD_LEVEL_ABOVE,
} from '@/config'
import { photos, type Photo } from '@/data/photos'
import { resolveQuestionText } from '@/data/questions'
import {
  allClassAttributes,
  clarifierAttributePool,
  clarifierLevelForAttribute,
  coarseAttributePool,
  loopBackAttributePool,
  type Attr,
  type ClarifierLevel,
  type QueryClass,
} from '@/lib/attributes'
import {
  computeValueCounts,
  hasSplittableAttribute,
  optionsFromStats,
  yearsPresent,
  type ValueCounts,
} from '@/lib/attributeStats'
import {
  applyFilter,
  filterPhotos,
  type IntentProfile,
  type ScoredPhoto,
} from '@/lib/filterEngine'
import { groundOptionsForAttribute } from '@/lib/grounding'
import {
  bumpSessionGeneration,
  classify,
  consumeOfflineToast,
  interpretTyped,
  invalidateQuestionCache,
  isMockLlmMode,
  nextQuestion,
  type LlmLogEntry,
} from '@/lib/llmClient'
import { normalizeProfileValue } from '@/lib/photoAttributes'
import {
  fallbackPickNext,
  getStatsForPool,
  pickLoopBackLevel,
  type AnsweredMap,
} from '@/lib/questionPicker'
import { resolveSearchPool } from '@/lib/embeddingSearch'
import { semanticBaselineCount } from '@/lib/semanticBaseline'
import type { ClassifyResponse } from '@/lib/schemas'
import { candidatesWithDraft, type RoundDraft } from '@/lib/roundPreview'
import { parseTimelineValue, yearCrawlHelperText } from '@/lib/timeline'

export type RoundQuestion = {
  attr: Attr
  question: string
  options: string[]
  showSomewhereElse: boolean
  yearOptions: number[]
}

export type Stage =
  | 'HOME'
  | 'QUERY'
  | 'CLASSIFYING'
  | 'LEVEL1'
  | 'LEVEL2'
  | 'LEVEL3'
  | 'SEARCHING'
  | 'RESULTS'
  | 'LOOPBACK'
  | 'FALLBACK'

export type UnappliedChip = { attr: Attr; value: string }

export type ClassOverride = { from: QueryClass | null; to: QueryClass }

const ATTR_LABEL: Record<Attr, string> = {
  timeline: 'Timeline',
  location: 'Location',
  object: 'Object',
  photoType: 'Type of photo',
  docType: 'Type of document',
  peopleCount: 'People count',
  pose: 'Pose',
  timeOfDay: 'Time of day',
  sky: 'Sky',
  clothingColor: 'Clothing colour',
  background: 'Background',
  dominantColor: 'Colour',
  activity: 'Activity',
  language: 'Language',
  textContent: 'Content',
  layout: 'Layout',
  pageColor: 'Page colour',
}

const LOOP_COPY = "Let's narrow it down differently."

export function attributeLabel(attr: Attr): string {
  return ATTR_LABEL[attr]
}

function stageForLevel(level: ClarifierLevel): Stage {
  if (level === 1) return 'LEVEL1'
  if (level === 2) return 'LEVEL2'
  return 'LEVEL3'
}

function classAttributes(queryClass: QueryClass): Attr[] {
  return allClassAttributes(queryClass)
}

function attributePoolForRound(
  queryClass: QueryClass,
  uiLevel: ClarifierLevel,
  candidateCount: number,
  loopBack: boolean,
): Attr[] {
  const includeLevel3 =
    loopBack || uiLevel >= 3 || (uiLevel >= 2 && candidateCount > THIRD_LEVEL_ABOVE)
  return clarifierAttributePool(queryClass, { loopBack, includeLevel3 })
}

function effectiveLevelForRound(attrs: Attr[], queryClass: QueryClass): ClarifierLevel {
  let max: ClarifierLevel = 1
  for (const attr of attrs) {
    const tier = clarifierLevelForAttribute(queryClass, attr)
    if (tier > max) max = tier
  }
  return max
}

function isAnimalOnly(candidates: Photo[]): boolean {
  return candidates.length > 0 && candidates.every((photo) => photo.animals.length > 0 && !photo.hasPeople)
}

function profileRecord(profile: IntentProfile): Record<string, string | 'any'> {
  const out: Record<string, string | 'any'> = {}
  for (const [key, value] of Object.entries(profile)) {
    if (value !== undefined) out[key] = value
  }
  return out
}

function resultKey(candidates: Photo[]): string {
  return candidates.map((photo) => photo.id).join('\0')
}

function addKeyword(keywords: string[], keyword: string): string[] {
  const needle = keyword.trim()
  if (!needle) return keywords
  if (keywords.some((item) => item.toLowerCase() === needle.toLowerCase())) return keywords
  return [...keywords, needle]
}

function canonicalValue(attr: Attr, raw: string, known: string[]): string | null {
  const trimmed = raw.trim()
  if (!trimmed) return null
  const normalized = normalizeProfileValue(attr, trimmed)

  if (attr === 'timeline') {
    const parsed = parseTimelineValue(normalized)
    if (!parsed) return null
    const asString = String(parsed)
    if (asString.startsWith('year:')) return asString
    return known.includes(asString) ? asString : null
  }

  const exact =
    known.find((value) => value === normalized) ??
    known.find((value) => value.toLowerCase() === normalized.toLowerCase())
  if (exact) return exact

  if (attr === 'location') {
    const hits = known.filter((value) => value.toLowerCase().includes(normalized.toLowerCase()))
    if (hits.length === 1) return hits[0] ?? null
  }

  return null
}

function knownValues(candidates: Photo[], queryClass: QueryClass): Partial<Record<Attr, string[]>> {
  const attrs = classAttributes(queryClass)
  const out: Partial<Record<Attr, string[]>> = {}
  for (const attr of attrs) {
    if (attr === 'timeline') {
      const buckets = Object.keys(computeValueCounts(candidates, 'timeline'))
      const years = yearsPresent(candidates).map((year) => `year:${year}`)
      out.timeline = [...buckets, ...years]
    } else {
      out[attr] = Object.keys(computeValueCounts(candidates, attr))
    }
  }
  return out
}

function yearHintFor(profile: IntentProfile): string | null {
  const timeline = profile.timeline
  if (!timeline || timeline === 'any') return null
  return yearCrawlHelperText(timeline)
}

function roundAllCantRemember(roundQuestions: RoundQuestion[], roundDraft: RoundDraft): boolean {
  return (
    roundQuestions.length > 0 && roundQuestions.every((q) => roundDraft[q.attr] === 'any')
  )
}

function canAsk(
  candidates: Photo[],
  attr: Attr,
  answered: AnsweredMap,
  pool: Attr[],
): boolean {
  if (!pool.includes(attr)) return false
  if (answered[attr] !== undefined) return false
  if (!hasSplittableAttribute(candidates, attr)) return false
  if (attr === 'peopleCount' && isAnimalOnly(candidates)) return false
  return true
}

function withBlocked(answered: AnsweredMap, blocked: ReadonlySet<Attr>): AnsweredMap {
  if (blocked.size === 0) return answered
  const next = { ...answered }
  for (const attr of blocked) next[attr] = 'value'
  return next
}

function withoutReaskable(answered: AnsweredMap, reasked: ReadonlySet<Attr>, blocked: ReadonlySet<Attr>): AnsweredMap {
  const next = withBlocked(answered, blocked)
  for (const [attr, kind] of Object.entries(answered) as [Attr, 'value' | 'any'][]) {
    if (kind === 'any' && !reasked.has(attr) && !blocked.has(attr)) delete next[attr]
  }
  return next
}

type ExtractedApply = {
  profile: IntentProfile
  keywords: string[]
  candidates: ScoredPhoto[]
  extractedChips: Attr[]
  unapplied: UnappliedChip[]
  answered: AnsweredMap
  answerOrder: Attr[]
  toasts: string[]
}

function pushChip(chips: Attr[], attr: Attr) {
  if (!chips.includes(attr)) chips.push(attr)
}

function applyExtracted(data: ClassifyResponse, pool: Photo[], toastOnSoft: boolean): ExtractedApply {
  let profile: IntentProfile = {}
  let keywords: string[] = []
  let candidates = filterPhotos({ library: pool, profile, keywords })
  const extractedChips: Attr[] = []
  const unapplied: UnappliedChip[] = []
  const answered: AnsweredMap = {}
  const answerOrder: Attr[] = []
  const toasts: string[] = []

  const noteSoft = (attr: Attr, value: string) => {
    pushChip(extractedChips, attr)
    answered[attr] = 'value'
    unapplied.push({ attr, value })
    if (toastOnSoft) {
      toasts.push(`No photos from ${value}. Showing everything else.`)
    }
  }

  const tryHard = (attr: Attr, value: string) => {
    const result = applyFilter(pool, candidates, profile, keywords, attr, value)
    if (!result.applied) {
      noteSoft(attr, value)
      return
    }
    profile = result.profile
    candidates = result.candidates
    answered[attr] = 'value'
    answerOrder.push(attr)
    pushChip(extractedChips, attr)
  }

  const timeline = data.extracted.timeline
  if (timeline) {
    const value = String(timeline)
    if (parseTimelineValue(value)) tryHard('timeline', value)
  }

  const location = data.extracted.location?.trim()
  if (location) {
    const known = Object.keys(computeValueCounts(pool, 'location'))
    const canonical = canonicalValue('location', location, known)
    if (!canonical) noteSoft('location', location)
    else tryHard('location', canonical)
  }

  for (const objectName of data.extracted.objects ?? []) {
    const known = Object.keys(computeValueCounts(candidates, 'object'))
    const canonical = canonicalValue('object', objectName, known)
    if (!canonical) {
      noteSoft('object', objectName)
      continue
    }
    if (profile.object === undefined) {
      tryHard('object', canonical)
      continue
    }
    const nextKeywords = addKeyword(keywords, canonical)
    const next = filterPhotos({ library: pool, profile, keywords: nextKeywords })
    if (next.length > 0) {
      keywords = nextKeywords
      candidates = next
    }
  }

  for (const animal of data.extracted.animals ?? []) {
    const nextKeywords = addKeyword(keywords, animal)
    const next = filterPhotos({ library: pool, profile, keywords: nextKeywords })
    if (next.length > 0) {
      keywords = nextKeywords
      candidates = next
    }
  }

  if (data.extracted.photoType) {
    const known = Object.keys(computeValueCounts(candidates, 'photoType'))
    const canonical = canonicalValue('photoType', data.extracted.photoType, known)
    if (canonical) tryHard('photoType', canonical)
  }

  if (data.extracted.docType) {
    const known = Object.keys(computeValueCounts(candidates, 'docType'))
    const canonical = canonicalValue('docType', data.extracted.docType, known)
    if (canonical) tryHard('docType', canonical)
    else noteSoft('docType', data.extracted.docType)
  }

  return {
    profile,
    keywords,
    candidates,
    extractedChips,
    unapplied,
    answered,
    answerOrder,
    toasts,
  }
}

function bestRelaxAttr(
  pool: Photo[],
  profile: IntentProfile,
  keywords: string[],
  answerOrder: Attr[],
  relaxed: Attr[],
): Attr | null {
  const hard = answerOrder.filter((attr, index) => {
    const value = profile[attr]
    return value !== undefined && value !== 'any' && !relaxed.includes(attr) && answerOrder.indexOf(attr) === index
  })
  if (hard.length === 0) return null

  let best = hard[0]!
  let bestCount = -1
  let bestRecency = -1
  for (const attr of hard) {
    const nextProfile = { ...profile }
    delete nextProfile[attr]
    const count = filterPhotos({ library: pool, profile: nextProfile, keywords }).length
    const recency = answerOrder.lastIndexOf(attr)
    if (count > bestCount || (count === bestCount && recency > bestRecency)) {
      best = attr
      bestCount = count
      bestRecency = recency
    }
  }
  return best
}

/** When the set is too small to split (e.g. one “grass” hit), widen for loop-back MCQs (FR-12, E-9.1). */
function widenForLoopBack(
  library: Photo[],
  s: {
    pool: Photo[]
    profile: IntentProfile
    keywords: string[]
    candidates: Photo[]
    answerOrder: Attr[]
    relaxed: Attr[]
    queryClass: QueryClass | null
    answered: AnsweredMap
    cantRememberReasked: ReadonlySet<Attr>
  },
): {
  pool: Photo[]
  profile: IntentProfile
  keywords: string[]
  candidates: Photo[]
  relaxed: Attr[]
} {
  let profile = { ...s.profile }
  let relaxed = [...s.relaxed]
  let keywords: string[] = []
  let pool = s.pool.length > 0 ? s.pool : library
  let candidates = s.candidates

  for (const attr of s.answerOrder) {
    const value = profile[attr]
    if (value !== undefined && value !== 'any' && !relaxed.includes(attr)) {
      delete profile[attr]
      relaxed = [...relaxed, attr]
    }
  }

  candidates = filterPhotos({ library: pool, profile, keywords })

  const queryClass = s.queryClass
  const askable =
    queryClass &&
    hasAskable(candidates, s.answered, queryClass, s.cantRememberReasked, true)

  if ((!askable || candidates.length < FEW_RESULTS) && library.length > FEW_RESULTS) {
    pool = library
    profile = {}
    keywords = []
    candidates = filterPhotos({ library: pool, profile, keywords })
    if (candidates.length < 2) {
      candidates = library
    }
  }

  return { pool, profile, keywords, candidates, relaxed }
}

function hasAskable(
  candidates: Photo[],
  answered: AnsweredMap,
  queryClass: QueryClass,
  reasked: ReadonlySet<Attr>,
  allowReask: boolean,
): boolean {
  const pool = loopBackAttributePool(queryClass)
  if (fallbackPickNext(candidates, answered, pool, queryClass)) return true
  if (allowReask) {
    const opened = withoutReaskable(answered, reasked, new Set())
    if (fallbackPickNext(candidates, opened, pool, queryClass)) return true
  }
  return false
}

function resolveOptions(attr: Attr, counts: ValueCounts, llmOptions: string[]): { options: string[]; skip: boolean } {
  const fromStats = optionsFromStats(attr, counts).slice(0, CHIP_OPTIONS_PER_QUESTION)
  if (llmOptions.length === 0) {
    return { options: fromStats, skip: fromStats.length < 2 }
  }
  const grounded = groundOptionsForAttribute(attr, llmOptions, counts)
  if (grounded.skip) return { options: [], skip: true }
  const options = grounded.options
    .filter((option) => fromStats.includes(option))
    .slice(0, CHIP_OPTIONS_PER_QUESTION)
  if (options.length < 2) {
    const fallback = fromStats.slice(0, CHIP_OPTIONS_PER_QUESTION)
    return { options: fallback, skip: fallback.length < 2 }
  }
  return { options, skip: false }
}

type Snap = {
  stage: Stage
  query: string
  queryClass: QueryClass | null
  profile: IntentProfile
  keywords: string[]
  candidates: ScoredPhoto[]
  candidateHistory: number[]
  baselineCount: number | null
  loopCount: number
  level: ClarifierLevel
  questionsThisRound: number
  answered: AnsweredMap
  cantRememberReasked: Attr[]
  currentQuestion: Attr | null
  questionText: string | null
  questionOptions: string[]
  roundQuestions: RoundQuestion[]
  roundDraft: RoundDraft
  detailOpenAttr: Attr | null
  detailConfirm: string | null
  yearOptions: number[]
  yearHint: string | null
  showSomewhereElse: boolean
  allowTyping: boolean
  extractedChips: Attr[]
  unapplied: UnappliedChip[]
  relaxed: Attr[]
  pool: Photo[]
  answerOrder: Attr[]
  loopBanner: string | null
  lastShownKey: string | null
  askedIdenticalExtra: boolean
  somewhereElse: boolean
  typedPlaceholder: string
}

type Picked = { attr: Attr; question: string; options: string[] }

export type FlowState = {
  stage: Stage
  query: string
  queryClass: QueryClass | null
  profile: IntentProfile
  keywords: string[]
  candidates: ScoredPhoto[]
  candidateHistory: number[]
  baselineCount: number | null
  loopCount: number
  level: ClarifierLevel
  questionsThisRound: number
  answered: AnsweredMap
  cantRememberReasked: Set<Attr>
  currentQuestion: Attr | null
  extractedChips: Attr[]
  relaxed: Attr[]
  llmLog: LlmLogEntry[]
  mockMode: boolean
  requestGeneration: number
  pool: Photo[]
  toast: string | null
  cardLoading: boolean
  classifyLock: boolean
  loopBusy: boolean
  questionText: string | null
  questionOptions: string[]
  roundQuestions: RoundQuestion[]
  roundDraft: RoundDraft
  detailOpenAttr: Attr | null
  detailConfirm: string | null
  yearOptions: number[]
  yearHint: string | null
  showSomewhereElse: boolean
  allowTyping: boolean
  pendingKeyword: string | null
  unapplied: UnappliedChip[]
  typedDraft: string
  typedPlaceholder: string
  somewhereElse: boolean
  stack: Snap[]
  answerOrder: Attr[]
  lastShownKey: string | null
  askedIdenticalExtra: boolean
  loopBanner: string | null
  optionTaps: number
  typedCount: number
  cantRememberCount: number
  submittedAt: number | null
  resultsAt: number | null
  overrideLog: ClassOverride[]
}

export type FlowActions = {
  openQuery: () => void
  submitQuery: (raw: string) => Promise<void>
  toggleRoundOption: (attr: Attr, value: string) => void
  roundCantRemember: (attr: Attr) => void
  openDetailFor: (attr: Attr) => void
  closeDetail: () => void
  submitRound: () => Promise<void>
  answerOption: (value: string) => Promise<void>
  answerCantRemember: () => Promise<void>
  setTypedDraft: (text: string) => void
  submitTyped: (text: string) => Promise<void>
  resolvePendingKeyword: (keep: boolean) => Promise<void>
  showResultsNow: () => void
  notFound: () => Promise<void>
  forceClass: (queryClass: QueryClass) => Promise<void>
  startOver: () => void
  back: (opts?: { fromPopState?: boolean }) => void
  dismissToast: () => void
  chooseSomewhereElse: () => void
}

export type FlowStore = FlowState & FlowActions

function blankState(mockMode: boolean): FlowState {
  return {
    stage: 'HOME',
    query: '',
    queryClass: null,
    profile: {},
    keywords: [],
    candidates: [],
    candidateHistory: [],
    baselineCount: null,
    loopCount: 0,
    level: 1,
    questionsThisRound: 0,
    answered: {},
    cantRememberReasked: new Set(),
    currentQuestion: null,
    extractedChips: [],
    relaxed: [],
    llmLog: [],
    mockMode,
    requestGeneration: 0,
    pool: [],
    toast: null,
    cardLoading: false,
    classifyLock: false,
    loopBusy: false,
    questionText: null,
    questionOptions: [],
    roundQuestions: [],
    roundDraft: {},
    detailOpenAttr: null,
    detailConfirm: null,
    yearOptions: [],
    yearHint: null,
    showSomewhereElse: false,
    allowTyping: true,
    pendingKeyword: null,
    unapplied: [],
    typedDraft: '',
    typedPlaceholder: 'Add a detail',
    somewhereElse: false,
    stack: [],
    answerOrder: [],
    lastShownKey: null,
    askedIdenticalExtra: false,
    loopBanner: null,
    optionTaps: 0,
    typedCount: 0,
    cantRememberCount: 0,
    submittedAt: null,
    resultsAt: null,
    overrideLog: [],
  }
}

let suppressPop = false

export type FlowStoreApi = StoreApi<FlowStore>

export function bindFlowHistory(store: FlowStoreApi): () => void {
  if (typeof window === 'undefined') return () => {}
  const onPop = () => {
    if (suppressPop) {
      suppressPop = false
      return
    }
    store.getState().back({ fromPopState: true })
  }
  window.addEventListener('popstate', onPop)
  return () => window.removeEventListener('popstate', onPop)
}

export function createFlowStore(library: Photo[] = photos): FlowStoreApi {
  return createStore<FlowStore>()((set, get) => {
    function takeSnapshot(): Snap {
      const s = get()
      return {
        stage: s.stage,
        query: s.query,
        queryClass: s.queryClass,
        profile: { ...s.profile },
        keywords: [...s.keywords],
        candidates: s.candidates,
        candidateHistory: [...s.candidateHistory],
        baselineCount: s.baselineCount,
        loopCount: s.loopCount,
        level: s.level,
        questionsThisRound: s.questionsThisRound,
        answered: { ...s.answered },
        cantRememberReasked: [...s.cantRememberReasked],
        currentQuestion: s.currentQuestion,
        questionText: s.questionText,
        questionOptions: [...s.questionOptions],
        roundQuestions: s.roundQuestions.map((item) => ({ ...item, options: [...item.options] })),
        roundDraft: { ...s.roundDraft },
        detailOpenAttr: s.detailOpenAttr,
        detailConfirm: s.detailConfirm,
        yearOptions: [...s.yearOptions],
        yearHint: s.yearHint,
        showSomewhereElse: s.showSomewhereElse,
        allowTyping: s.allowTyping,
        extractedChips: [...s.extractedChips],
        unapplied: s.unapplied.map((chip) => ({ ...chip })),
        relaxed: [...s.relaxed],
        pool: s.pool,
        answerOrder: [...s.answerOrder],
        loopBanner: s.loopBanner,
        lastShownKey: s.lastShownKey,
        askedIdenticalExtra: s.askedIdenticalExtra,
        somewhereElse: s.somewhereElse,
        typedPlaceholder: s.typedPlaceholder,
      }
    }

    function pushSnapshot() {
      set({ stack: [...get().stack, takeSnapshot()] })
      if (typeof window !== 'undefined') window.history.pushState({ flow: true }, '')
    }

    function restore(snap: Snap) {
      set({
        stage: snap.stage,
        query: snap.query,
        queryClass: snap.queryClass,
        profile: snap.profile,
        keywords: snap.keywords,
        candidates: snap.candidates,
        candidateHistory: snap.candidateHistory,
        baselineCount: snap.baselineCount,
        loopCount: snap.loopCount,
        level: snap.level,
        questionsThisRound: snap.questionsThisRound,
        answered: snap.answered,
        cantRememberReasked: new Set(snap.cantRememberReasked),
        currentQuestion: snap.currentQuestion,
        questionText: snap.questionText,
        questionOptions: snap.questionOptions,
        roundQuestions: snap.roundQuestions,
        roundDraft: snap.roundDraft,
        detailOpenAttr: snap.detailOpenAttr,
        detailConfirm: snap.detailConfirm,
        yearOptions: snap.yearOptions,
        yearHint: snap.yearHint,
        showSomewhereElse: snap.showSomewhereElse,
        allowTyping: snap.allowTyping,
        extractedChips: snap.extractedChips,
        unapplied: snap.unapplied,
        relaxed: snap.relaxed,
        pool: snap.pool,
        answerOrder: snap.answerOrder,
        loopBanner: snap.loopBanner,
        lastShownKey: snap.lastShownKey,
        askedIdenticalExtra: snap.askedIdenticalExtra,
        somewhereElse: snap.somewhereElse,
        typedPlaceholder: snap.typedPlaceholder,
        typedDraft: '',
        pendingKeyword: null,
        cardLoading: false,
        classifyLock: false,
        loopBusy: false,
      })
    }

    function revealRound(questions: RoundQuestion[], level: ClarifierLevel) {
      const first = questions[0]
      set({
        stage: stageForLevel(level),
        level,
        roundQuestions: questions,
        roundDraft: {},
        detailOpenAttr: null,
        detailConfirm: null,
        currentQuestion: first?.attr ?? null,
        questionText: first?.question ?? null,
        questionOptions: first?.options ?? [],
        yearOptions: first?.attr === 'timeline' ? (first.yearOptions ?? []) : [],
        showSomewhereElse: first?.showSomewhereElse ?? false,
        allowTyping: true,
        cardLoading: false,
        classifyLock: false,
        yearHint: yearHintFor(get().profile),
        somewhereElse: false,
        typedPlaceholder: 'Add a detail',
      })
    }

    function hasAskableCoarsePool(): boolean {
      const s = get()
      if (!s.queryClass) return false
      const pool = coarseAttributePool(s.queryClass)
      return fallbackPickNext(s.candidates, s.answered, pool, s.queryClass) !== null
    }

    async function buildRound(level: ClarifierLevel, allowReask: boolean, gen: number): Promise<RoundQuestion[]> {
      const roundBlocked = new Set<Attr>()
      const questions: RoundQuestion[] = []

      while (questions.length < QUESTIONS_PER_ROUND) {
        const picked = await pick(level, allowReask, gen, roundBlocked)
        if (get().requestGeneration !== gen) return questions
        if (!picked) break
        roundBlocked.add(picked.attr)
        questions.push({
          attr: picked.attr,
          question: picked.question,
          options: picked.options,
          showSomewhereElse: false,
          yearOptions: [],
        })
      }
      return questions
    }

    async function loadRound(gen: number, allowReask = false, probing = false) {
      if (get().requestGeneration !== gen) return
      const loopBack = get().stage === 'LOOPBACK' || get().loopBanner !== null
      const s0 = get()
      const tightBaseline =
        s0.baselineCount !== null && s0.baselineCount <= FEW_RESULTS && s0.baselineCount > 0
      const forceQuestions = loopBack || tightBaseline || s0.candidates.length <= FEW_RESULTS || probing

      // Widen to full library only for PRD tight-baseline demos — not large semantic pools (lake + embeddings).
      if (
        tightBaseline &&
        s0.candidates.length <= FEW_RESULTS &&
        library.length > FEW_RESULTS
      ) {
        set({ pool: library, candidates: library, keywords: [] })
      }

      const s = get()
      if (!forceQuestions && s.candidates.length <= EARLY_STOP_AT) {
        finishSearch()
        return
      }

      let level = get().level
      if (level === 1 && get().queryClass && !hasAskableCoarsePool()) {
        level = 2
        set({ level: 2 })
      }

      if (level >= 2 && !probing && get().questionsThisRound >= QUESTIONS_PER_ROUND) {
        finishSearch()
        return
      }

      set({ cardLoading: true, roundQuestions: [], roundDraft: {} })
      let questions = await buildRound(level, allowReask, gen)
      if (get().requestGeneration !== gen) return

      if (questions.length === 0) {
        if (level === 1) {
          set({ level: 2 })
          questions = await buildRound(2, allowReask, gen)
          if (get().requestGeneration !== gen) return
          level = 2
        }
        if (questions.length === 0 && level === 2 && get().candidates.length > THIRD_LEVEL_ABOVE) {
          set({ level: 3 })
          questions = await buildRound(3, allowReask, gen)
          if (get().requestGeneration !== gen) return
          level = 3
        }
      }

      if (questions.length === 0) {
        if (loopBack) {
          set({
            stage: 'FALLBACK',
            cardLoading: false,
            loopBanner: null,
            currentQuestion: null,
          })
        } else {
          finishSearch()
        }
        return
      }

      const qc = get().queryClass
      const displayLevel =
        qc !== null ? effectiveLevelForRound(questions.map((q) => q.attr), qc) : level
      revealRound(questions, displayLevel)
    }

    function finishSearch(force = false) {
      const s = get()
      const key = resultKey(s.candidates)
      if (!force && s.lastShownKey !== null && key === s.lastShownKey && !s.askedIdenticalExtra) {
        set({ askedIdenticalExtra: true, cardLoading: true })
        void askIdenticalExtra(s.requestGeneration)
        return
      }
      set({
        stage: 'SEARCHING',
      })
      set({
        stage: 'RESULTS',
        lastShownKey: key,
        askedIdenticalExtra: false,
        cardLoading: false,
        classifyLock: false,
        currentQuestion: null,
        questionText: null,
        questionOptions: [],
        roundQuestions: [],
        roundDraft: {},
        detailOpenAttr: null,
        detailConfirm: null,
        showSomewhereElse: false,
        resultsAt: s.resultsAt ?? Date.now(),
        yearHint: yearHintFor(s.profile),
      })
    }

    async function askIdenticalExtra(gen: number) {
      if (get().level < 2) set({ level: 2 })
      await loadRound(gen, true)
    }

    async function pick(
      level: ClarifierLevel,
      allowReask: boolean,
      gen: number,
      extraBlocked: ReadonlySet<Attr> = new Set(),
    ): Promise<Picked | null> {
      const blocked = new Set<Attr>(extraBlocked)
      for (let attempt = 0; attempt < 8; attempt++) {
        const chosen = await chooseAttr(level, allowReask, blocked, gen)
        if (get().requestGeneration !== gen) return null
        if (!chosen) return null
        const counts = computeValueCounts(get().candidates, chosen.attr)
        const display = resolveOptions(chosen.attr, counts, chosen.llmOptions)
        if (display.skip) {
          blocked.add(chosen.attr)
          continue
        }
        return { attr: chosen.attr, question: chosen.question, options: display.options }
      }
      return null
    }

    async function chooseAttr(
      level: ClarifierLevel,
      allowReask: boolean,
      blocked: Set<Attr>,
      gen: number,
    ): Promise<{ attr: Attr; question: string; llmOptions: string[] } | null> {
      const s = get()
      if (!s.queryClass) return null
      const answered = withBlocked(s.answered, blocked)
      const loopBack = s.stage === 'LOOPBACK' || s.loopBanner !== null
      const pool = attributePoolForRound(
        s.queryClass,
        level,
        s.candidates.length,
        loopBack,
      )

      let attr = fallbackPickNext(s.candidates, answered, pool, s.queryClass)
      if (!attr && allowReask) {
        const opened = withoutReaskable(s.answered, s.cantRememberReasked, blocked)
        attr = fallbackPickNext(s.candidates, opened, pool, s.queryClass)
      }
      if (!attr || !canAsk(s.candidates, attr, answered, pool)) return null

      const attrLevel = clarifierLevelForAttribute(s.queryClass, attr)
      const outcome = await nextQuestion({
        queryClass: s.queryClass,
        query: s.query,
        profile: profileRecord(s.profile),
        candidateCount: s.candidates.length,
        attributeStats: getStatsForPool(s.candidates, pool),
        level: attrLevel,
        candidates: s.candidates,
        answered,
        forceAttribute: attr,
        loopBack,
        loopCount: s.loopCount,
        previouslyAskedAttributes: loopBack ? s.answerOrder : undefined,
      })
      if (get().requestGeneration !== gen) return null
      if (outcome) set({ llmLog: [...get().llmLog, outcome.log] })
      if (consumeOfflineToast()) set({ toast: 'Using offline mode' })
      if (outcome?.fallback) {
        set({
          toast: `Using default question wording (${outcome.log.error ?? 'LLM unavailable'})`,
        })
      }

      const llmQuestion = outcome && !outcome.fallback ? outcome.data.question : undefined
      const question = resolveQuestionText(attr, llmQuestion, {
        query: s.query,
        profileLocation:
          typeof s.profile.location === 'string' ? s.profile.location : null,
      })
      const llmOptions =
        outcome && !outcome.fallback ? llmOptionValues(outcome.data.options) : []
      return { attr, question, llmOptions }
    }

    async function continueAsking(gen: number) {
      await loadRound(gen, false)
    }

    async function afterRoundSubmit(
      gen: number,
      questionsInRound: number,
      allCantRemember = false,
      roundAttrs: Attr[] = [],
    ) {
      if (get().requestGeneration !== gen) return
      if (
        allCantRemember &&
        get().level >= 2 &&
        roundAttrs.length > 0 &&
        get().queryClass
      ) {
        const tier = effectiveLevelForRound(roundAttrs, get().queryClass!)
        const nextLevel = Math.min(3, tier + 1) as ClarifierLevel
        if (nextLevel > get().level) set({ level: nextLevel })
      } else if (get().level >= 2) {
        const nextCount = get().questionsThisRound + questionsInRound
        set({ questionsThisRound: nextCount })
        if (nextCount >= QUESTIONS_PER_ROUND) {
          finishSearch()
          return
        }
      }
      if (!allCantRemember && get().candidates.length <= EARLY_STOP_AT) {
        finishSearch()
        return
      }
      await loadRound(gen, false, allCantRemember)
    }

    function noteHistory(count: number) {
      set({ candidateHistory: [...get().candidateHistory, count] })
    }

    async function commitChoice(value: string | 'any') {
      const s = get()
      const attr = s.currentQuestion ?? s.roundQuestions[0]?.attr ?? null
      if (s.cardLoading || s.pendingKeyword || !attr) return
      if (s.stage !== 'LEVEL1' && s.stage !== 'LEVEL2' && s.stage !== 'LEVEL3' && s.stage !== 'LOOPBACK') {
        return
      }
      const gen = s.requestGeneration
      set({
        cardLoading: true,
        typedDraft: '',
        somewhereElse: false,
        loopBanner: null,
        typedPlaceholder: 'Add a detail',
        currentQuestion: attr,
      })

      if (value === 'any') {
        pushSnapshot()
        const reasked = new Set(s.cantRememberReasked)
        if (s.answered[attr] === 'any') reasked.add(attr)
        const profile: IntentProfile = { ...s.profile, [attr]: 'any' }
        const candidates = filterPhotos({ library: s.pool, profile, keywords: s.keywords })
        set({
          profile,
          candidates,
          answered: { ...s.answered, [attr]: 'any' },
          cantRememberReasked: reasked,
          cantRememberCount: s.cantRememberCount + 1,
          yearHint: yearHintFor(profile),
        })
        noteHistory(candidates.length)
        await afterRoundSubmit(gen, s.roundQuestions.length || 1, true, attr ? [attr] : [])
        return
      }

      const result = applyFilter(s.pool, s.candidates, s.profile, s.keywords, attr, value)
      if (!result.applied) {
        set({
          cardLoading: false,
          toast: "That left no photos, so it wasn't applied.",
        })
        return
      }

      pushSnapshot()
      const previous = s.profile[attr]
      const answerOrder = [...s.answerOrder.filter((item) => item !== attr), attr]
      const toasts: string[] = []
      if (previous && previous !== 'any' && previous !== value) {
        toasts.push(`Updated ${attributeLabel(attr)}`)
      }
      set({
        profile: result.profile,
        candidates: result.candidates,
        answered: { ...s.answered, [attr]: 'value' },
        answerOrder,
        optionTaps: s.optionTaps + 1,
        yearHint: yearHintFor(result.profile),
        toast: toasts[0] ?? null,
      })
      noteHistory(result.candidates.length)
      await afterRoundSubmit(gen, s.roundQuestions.length || 1)
    }

    return {
      ...blankState(isMockLlmMode()),

      openQuery() {
        if (get().stage === 'QUERY') return
        if (get().stage !== 'HOME') return
        pushSnapshot()
        set({ stage: 'QUERY' })
      },

      async submitQuery(raw: string) {
        const trimmed = raw.trim()
        if (!trimmed) return
        if (get().classifyLock || get().stage === 'CLASSIFYING') return
        if (get().stage !== 'HOME') return

        const query = trimmed.slice(0, MAX_QUERY_CHARS)
        invalidateQuestionCache()
        set({ query })
        if (get().stage === 'HOME') {
          pushSnapshot()
        }
        pushSnapshot()
        const gen = get().requestGeneration
        set({
          stage: 'CLASSIFYING',
          classifyLock: true,
          cardLoading: true,
          submittedAt: Date.now(),
          resultsAt: null,
          mockMode: isMockLlmMode(),
          loopBanner: null,
          pendingKeyword: null,
        })

        const outcome = await classify(query)
        if (get().requestGeneration !== gen) return
        if (!outcome) {
          set({ classifyLock: false, cardLoading: false, stage: 'HOME' })
          return
        }

        const notes: string[] = []
        if (consumeOfflineToast()) notes.push('Using offline mode')
        const baselineCount = semanticBaselineCount(query, library)
        const { pool } = await resolveSearchPool(query, library)
        const extracted = applyExtracted(outcome.data, pool, pool.length > 0)
        notes.push(...extracted.toasts)

        const history = [pool.length]
        if (extracted.candidates.length !== pool.length) history.push(extracted.candidates.length)

        set({
          llmLog: [...get().llmLog, outcome.log],
          queryClass: outcome.data.class,
          pool,
          profile: extracted.profile,
          keywords: extracted.keywords,
          candidates: extracted.candidates,
          extractedChips: extracted.extractedChips,
          unapplied: extracted.unapplied,
          answered: extracted.answered,
          answerOrder: extracted.answerOrder,
          baselineCount,
          candidateHistory: history,
          level: 1,
          questionsThisRound: 0,
          loopCount: 0,
          relaxed: [],
          cantRememberReasked: new Set(),
          currentQuestion: null,
          lastShownKey: null,
          askedIdenticalExtra: false,
          yearHint: yearHintFor(extracted.profile),
          classifyLock: false,
          toast: notes.length ? notes.join(' ') : null,
        })

        if (pool.length === 0) {
          finishSearch()
          return
        }
        const matchCount = extracted.candidates.length
        const tightBaseline =
          baselineCount <= FEW_RESULTS && baselineCount > 0
        if (matchCount <= FEW_RESULTS) {
          if (
            matchCount > 0 &&
            tightBaseline &&
            pool.length <= FEW_RESULTS &&
            library.length > FEW_RESULTS
          ) {
            set({ pool: library, candidates: library, keywords: [] })
          }
          await continueAsking(gen)
          return
        }
        if (matchCount <= EARLY_STOP_AT) {
          finishSearch()
          return
        }
        await continueAsking(gen)
      },

      toggleRoundOption(attr: Attr, value: string) {
        const s = get()
        if (s.cardLoading || s.pendingKeyword) return
        const draft = { ...s.roundDraft }
        if (draft[attr] === value) delete draft[attr]
        else draft[attr] = value
        set({ roundDraft: draft, detailOpenAttr: null, detailConfirm: null })
      },

      roundCantRemember(attr: Attr) {
        const s = get()
        if (s.cardLoading || s.pendingKeyword) return
        const draft = { ...s.roundDraft }
        if (draft[attr] === 'any') delete draft[attr]
        else draft[attr] = 'any'
        set({ roundDraft: draft })
      },

      openDetailFor(attr: Attr) {
        set({
          detailOpenAttr: attr,
          detailConfirm: null,
          typedDraft: '',
          typedPlaceholder: attr === 'location' ? 'Where was it?' : 'Add a detail',
          currentQuestion: attr,
        })
      },

      closeDetail() {
        set({ detailOpenAttr: null, detailConfirm: null, typedDraft: '' })
      },

      async submitRound() {
        const s = get()
        if (s.pendingKeyword || s.roundQuestions.length === 0) return
        if (s.stage !== 'LEVEL1' && s.stage !== 'LEVEL2' && s.stage !== 'LEVEL3' && s.stage !== 'LOOPBACK') {
          return
        }
        const gen = s.requestGeneration
        const questionsInRound = s.roundQuestions.length
        const allCantRemember = roundAllCantRemember(s.roundQuestions, s.roundDraft)
        set({
          cardLoading: true,
          loopBanner: null,
          typedDraft: '',
          detailOpenAttr: null,
          detailConfirm: null,
          somewhereElse: false,
        })

        pushSnapshot()

        let profile = { ...s.profile }
        let keywords = [...s.keywords]
        let candidates = s.candidates
        let answered = { ...s.answered }
        let answerOrder = [...s.answerOrder]
        const reasked = new Set(s.cantRememberReasked)
        let cantRememberCount = s.cantRememberCount
        let optionTaps = s.optionTaps

        for (const question of s.roundQuestions) {
          const choice = s.roundDraft[question.attr]
          if (choice === undefined) continue
          if (choice === 'any') {
            if (answered[question.attr] === 'any') reasked.add(question.attr)
            profile = { ...profile, [question.attr]: 'any' }
            answered = { ...answered, [question.attr]: 'any' }
            cantRememberCount += 1
            candidates = filterPhotos({ library: s.pool, profile, keywords })
            continue
          }
          const result = applyFilter(s.pool, candidates, profile, keywords, question.attr, choice)
          if (!result.applied) {
            set({
              cardLoading: false,
              toast: "That left no photos, so it wasn't applied.",
            })
            return
          }
          profile = result.profile
          candidates = result.candidates
          answered = { ...answered, [question.attr]: 'value' }
          answerOrder = [...answerOrder.filter((item) => item !== question.attr), question.attr]
          optionTaps += 1
        }

        set({
          profile,
          keywords,
          candidates,
          answered,
          answerOrder,
          cantRememberReasked: reasked,
          cantRememberCount,
          optionTaps,
          roundDraft: {},
          roundQuestions: [],
          currentQuestion: null,
          questionText: null,
          questionOptions: [],
          yearHint: yearHintFor(profile),
        })
        noteHistory(candidates.length)
        try {
          await afterRoundSubmit(
            gen,
            questionsInRound,
            allCantRemember,
            s.roundQuestions.map((q) => q.attr),
          )
        } catch {
          if (get().requestGeneration === gen) {
            set({
              cardLoading: false,
              toast: 'Could not update results. Try Skip or Reset in Debug.',
            })
          }
        }
      },

      answerOption(value: string) {
        const s = get()
        const attr = s.currentQuestion ?? s.roundQuestions[0]?.attr
        if (attr && s.roundQuestions.length > 0) {
          get().toggleRoundOption(attr, value)
          return Promise.resolve()
        }
        return commitChoice(value)
      },

      answerCantRemember() {
        const s = get()
        const attr = s.currentQuestion ?? s.roundQuestions[0]?.attr
        if (attr && s.roundQuestions.length > 0) {
          get().roundCantRemember(attr)
          return Promise.resolve()
        }
        return commitChoice('any')
      },

      setTypedDraft(text: string) {
        set({ typedDraft: text })
      },

      async submitTyped(text: string) {
        const trimmed = text.trim()
        if (!trimmed) return
        const s = get()
        const current = s.detailOpenAttr ?? s.currentQuestion
        if (s.cardLoading || s.pendingKeyword || !current || !s.queryClass) return
        const gen = s.requestGeneration
        const clipped = trimmed.slice(0, MAX_QUERY_CHARS)
        set({ cardLoading: true, typedDraft: '' })

        const draftBase = candidatesWithDraft(
          s.pool,
          s.profile,
          s.keywords,
          s.candidates,
          s.roundDraft,
        )

        const outcome = await interpretTyped({
          text: clipped,
          currentAttribute: current,
          profile: profileRecord(s.profile),
          allowedAttributes: classAttributes(s.queryClass),
          knownValues: knownValues(draftBase, s.queryClass),
        })
        if (get().requestGeneration !== gen) return
        if (!outcome) {
          set({ cardLoading: false })
          return
        }
        set({ llmLog: [...get().llmLog, outcome.log] })
        if (consumeOfflineToast()) set({ toast: 'Using offline mode' })

        const latest = get()
        const allowed = new Set(classAttributes(latest.queryClass!))
        const known = knownValues(
          candidatesWithDraft(latest.pool, latest.profile, latest.keywords, latest.candidates, latest.roundDraft),
          latest.queryClass!,
        )
        const roundDraft = { ...latest.roundDraft }
        const toasts: string[] = []
        let appliedAny = false

        for (const update of outcome.data.updates) {
          if (!allowed.has(update.attribute)) continue
          const value = canonicalValue(update.attribute, update.value, known[update.attribute] ?? [])
          if (!value) continue
          const preview = candidatesWithDraft(latest.pool, latest.profile, latest.keywords, latest.candidates, {
            ...roundDraft,
            [update.attribute]: value,
          })
          if (preview.length === 0) {
            toasts.push("That left no photos, so it wasn't applied.")
            continue
          }
          roundDraft[update.attribute] = value
          appliedAny = true
        }

        const keywordList = outcome.data.keywords.length
          ? outcome.data.keywords
          : appliedAny
            ? []
            : [clipped]

        for (const keyword of keywordList) {
          const nextKeywords = addKeyword(latest.keywords, keyword)
          if (nextKeywords === latest.keywords) continue
          const preview = filterPhotos({
            library: latest.pool,
            profile: latest.profile,
            keywords: nextKeywords,
          })
          if (preview.length === 0) {
            set({
              cardLoading: false,
              pendingKeyword: keyword,
              typedCount: latest.typedCount + 1,
              toast: toasts[0] ?? get().toast,
            })
            return
          }
          appliedAny = true
        }

        if (!appliedAny) {
          set({ cardLoading: false, toast: toasts[0] ?? get().toast })
          return
        }

        set({
          roundDraft,
          detailConfirm: outcome.data.pillLabel ?? null,
          typedCount: latest.typedCount + 1,
          cardLoading: false,
          toast: toasts[0] ?? null,
        })
      },

      async resolvePendingKeyword(keep: boolean) {
        const s = get()
        if (!s.pendingKeyword) return
        const keyword = s.pendingKeyword
        const gen = s.requestGeneration
        const current = s.currentQuestion
        if (!keep) {
          const answered = { ...s.answered }
          if (current && answered[current] === undefined) answered[current] = 'any'
          set({ pendingKeyword: null, answered, cardLoading: true })
          noteHistory(s.candidates.length)
          await loadRound(gen, false)
          return
        }

        const keywords = addKeyword(s.keywords, keyword)
        const candidates = filterPhotos({ library: s.pool, profile: s.profile, keywords })
        set({
          pendingKeyword: null,
          keywords,
          candidates,
          cardLoading: true,
        })
        noteHistory(candidates.length)
        if (candidates.length === 0) {
          finishSearch(true)
          return
        }
        await loadRound(gen, false)
      },

      showResultsNow() {
        const stage = get().stage
        if (stage !== 'LEVEL1' && stage !== 'LEVEL2' && stage !== 'LEVEL3' && stage !== 'LOOPBACK') return
        pushSnapshot()
        finishSearch(true)
      },

      async notFound() {
        const s = get()
        if (s.loopBusy) return

        const fromClarifier =
          s.stage === 'LEVEL1' ||
          s.stage === 'LEVEL2' ||
          s.stage === 'LEVEL3' ||
          s.stage === 'LOOPBACK'
        if (fromClarifier) {
          pushSnapshot()
          finishSearch(true)
        } else if (s.stage !== 'RESULTS') {
          return
        }

        const gen = s.requestGeneration
        set({ loopBusy: true, cardLoading: true })
        try {
          if (s.loopCount >= LOOP_LIMIT) {
            set({ stage: 'FALLBACK', cardLoading: false, currentQuestion: null, loopBanner: null })
            return
          }

          let profile = { ...s.profile }
          let relaxed = [...s.relaxed]
          let keywords = [...s.keywords]
          let pool = s.pool
          let candidates = s.candidates

          if (candidates.length < FEW_RESULTS) {
            const attr = bestRelaxAttr(pool, profile, keywords, s.answerOrder, relaxed)
            if (attr) {
              delete profile[attr]
              relaxed = [...relaxed, attr]
              candidates = filterPhotos({ library: pool, profile, keywords })
              if (candidates.length === 0) {
                const stillHard = s.answerOrder.filter((item) => {
                  const value = profile[item]
                  return value !== undefined && value !== 'any'
                })
                const drop = [...new Set(stillHard)].slice(-2)
                for (const item of drop) {
                  delete profile[item]
                  if (!relaxed.includes(item)) relaxed = [...relaxed, item]
                }
                candidates = filterPhotos({ library: pool, profile, keywords })
              }
            }
          }

          const queryClass = s.queryClass
          if (!queryClass) {
            set({ stage: 'FALLBACK', cardLoading: false, currentQuestion: null, loopBanner: null })
            return
          }

          const tightSearch =
            (s.baselineCount !== null && s.baselineCount <= FEW_RESULTS) ||
            candidates.length <= FEW_RESULTS

          let answered = { ...get().answered }

          if (
            tightSearch ||
            !hasAskable(candidates, answered, queryClass, s.cantRememberReasked, true)
          ) {
            const widened = widenForLoopBack(library, {
              pool,
              profile,
              keywords,
              candidates,
              answerOrder: s.answerOrder,
              relaxed,
              queryClass,
              answered,
              cantRememberReasked: s.cantRememberReasked,
            })
            pool = widened.pool
            profile = widened.profile
            keywords = widened.keywords
            candidates = widened.candidates
            relaxed = widened.relaxed
          }

          answered = { ...get().answered }
          const loopLevel = pickLoopBackLevel(candidates, answered, queryClass)
          if (loopLevel === null) {
            set({ stage: 'FALLBACK', cardLoading: false, currentQuestion: null, loopBanner: null })
            return
          }

          invalidateQuestionCache()

          set({
            pool,
            profile,
            keywords,
            relaxed,
            candidates,
            answered,
            yearHint: yearHintFor(profile),
            candidateHistory: [...s.candidateHistory, candidates.length],
            questionsThisRound: 0,
            level: loopLevel,
            loopBanner: LOOP_COPY,
            stage: 'LOOPBACK',
            lastShownKey: null,
            askedIdenticalExtra: false,
          })

          await loadRound(gen, false)
          if (get().requestGeneration !== gen) return
          if (get().roundQuestions.length === 0) {
            set({ stage: 'FALLBACK', cardLoading: false, loopBanner: null, currentQuestion: null })
            return
          }

          set({ loopCount: s.loopCount + 1 })
        } finally {
          if (get().requestGeneration === gen) set({ loopBusy: false })
        }
      },

      async forceClass(queryClass: QueryClass) {
        const s = get()
        if (!s.query) return
        bumpSessionGeneration()
        invalidateQuestionCache()
        const gen = s.requestGeneration + 1
        const candidates = filterPhotos({ library: s.pool, profile: {}, keywords: [] })
        set({
          requestGeneration: gen,
          overrideLog: [...s.overrideLog, { from: s.queryClass, to: queryClass }],
          queryClass,
          profile: {},
          keywords: [],
          answered: {},
          answerOrder: [],
          extractedChips: [],
          unapplied: [],
          relaxed: [],
          cantRememberReasked: new Set(),
          candidateHistory: [candidates.length],
          loopCount: 0,
          level: 1,
          questionsThisRound: 0,
          currentQuestion: null,
          loopBanner: null,
          pendingKeyword: null,
          candidates,
          cardLoading: true,
          classifyLock: false,
          lastShownKey: null,
          askedIdenticalExtra: false,
          yearHint: null,
        })
        if (candidates.length === 0 || candidates.length <= EARLY_STOP_AT) {
          finishSearch(true)
          return
        }
        await continueAsking(gen)
      },

      startOver() {
        bumpSessionGeneration()
        const gen = get().requestGeneration + 1
        set({ ...blankState(isMockLlmMode()), requestGeneration: gen })
      },

      back(opts) {
        const stack = get().stack
        if (stack.length === 0) {
          if (get().stage !== 'HOME') {
            bumpSessionGeneration()
            const gen = get().requestGeneration + 1
            set({ ...blankState(isMockLlmMode()), requestGeneration: gen })
          }
          return
        }
        bumpSessionGeneration()
        const gen = get().requestGeneration + 1
        const prev = stack[stack.length - 1]!
        restore(prev)
        set({ stack: stack.slice(0, -1), requestGeneration: gen })
        if (typeof window !== 'undefined' && !opts?.fromPopState) {
          suppressPop = true
          window.history.back()
        }
      },

      dismissToast() {
        set({ toast: null })
      },

      chooseSomewhereElse() {
        if (get().currentQuestion !== 'location') return
        set({ somewhereElse: true, typedPlaceholder: 'Where was it?', typedDraft: '' })
      },
    }
  })
}

function llmOptionValues(options: { label: string; value: string }[] | undefined): string[] {
  if (!options?.length) return []
  return options.flatMap((option) => [option.value, option.label])
}

export const flowStore = createFlowStore()

export function useFlowStore<T>(selector: (state: FlowStore) => T): T {
  return useStore(flowStore, selector)
}

if (typeof window !== 'undefined') bindFlowHistory(flowStore)
