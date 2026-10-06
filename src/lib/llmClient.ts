import { CALL1_TIMEOUT_MS, CALL2_TIMEOUT_MS } from '@/config'
import type { Photo } from '@/data/photos'
import { resolveQuestionText } from '@/data/questions'
import type { Attr, ClarifierLevel, QueryClass } from '@/lib/attributes'
import { allowedAttributes } from '@/lib/attributes'
import type { AttributeStatsMap } from '@/lib/attributeStats'
import { fallbackClassifier } from '@/lib/fallbackClassifier'
import { hasSplittableAttribute } from '@/lib/attributeStats'
import { fallbackPickNext, type AnsweredMap } from '@/lib/questionPicker'
import type {
  ClassifyResponse,
  InterpretTypedResponse,
  LlmRequest,
  NextQuestionResponse,
} from '@/lib/schemas'
import {
  classifyResponseSchema,
  interpretTypedResponseSchema,
  nextQuestionResponseSchema,
} from '@/lib/schemas'

export type LlmLogEntry = {
  type: LlmRequest['type']
  requestId: number
  latencyMs: number
  fallback: boolean
  /** True when served from in-session question cache (latencyMs is 0). */
  cached?: boolean
  rawRequest?: LlmRequest
  rawResponse?: unknown
  error?: string
  usage?: { promptTokens?: number; completionTokens?: number; totalTokens?: number }
}

export type ClassifyOutcome = {
  requestId: number
  stale: boolean
  data: ClassifyResponse
  fallback: boolean
  log: LlmLogEntry
}

export type NextQuestionOutcome = {
  requestId: number
  stale: boolean
  data: NextQuestionResponse
  fallback: boolean
  log: LlmLogEntry
}

export type InterpretOutcome = {
  requestId: number
  stale: boolean
  data: InterpretTypedResponse
  fallback: boolean
  log: LlmLogEntry
}

type ApiEnvelope = {
  ok: boolean
  data?: unknown
  meta?: {
    latencyMs: number
    usage?: LlmLogEntry['usage']
    raw?: string
  }
  error?: string
}

function useMockLlm(): boolean {
  const flag = import.meta.env.VITE_USE_MOCK_LLM
  return flag === 'true' || flag === true
}

/** Raw Vite env string for debug (undefined if unset). */
export function mockLlmEnvValue(): string {
  const flag = import.meta.env.VITE_USE_MOCK_LLM
  if (flag === undefined || flag === null) return '(unset → live)'
  return String(flag)
}

export function isMockLlmMode(): boolean {
  return useMockLlm()
}

let classifyRequestId = 0
let nextQuestionRequestId = 0
let interpretRequestId = 0
let sessionGeneration = 0

const abortControllers = new Set<AbortController>()
const questionCache = new Map<string, NextQuestionResponse>()

let offlineToastPending = false

export function bumpSessionGeneration(): void {
  sessionGeneration++
  abortInFlight()
}

export function abortInFlight(): void {
  for (const c of abortControllers) c.abort()
  abortControllers.clear()
}

export function invalidateQuestionCache(): void {
  questionCache.clear()
}

export function consumeOfflineToast(): boolean {
  if (!offlineToastPending) return false
  offlineToastPending = false
  return true
}

function trackAbort(signal?: AbortSignal): AbortController {
  const controller = new AbortController()
  abortControllers.add(controller)
  if (signal) {
    signal.addEventListener('abort', () => controller.abort(), { once: true })
  }
  return controller
}

function stableProfileJson(profile: Record<string, string | 'any'>): string {
  const keys = Object.keys(profile).sort()
  const sorted: Record<string, string | 'any'> = {}
  for (const k of keys) sorted[k] = profile[k]!
  return JSON.stringify(sorted)
}

function questionCacheKey(
  query: string,
  queryClass: QueryClass,
  profile: Record<string, string | 'any'>,
  level: ClarifierLevel,
  forceAttribute?: Attr,
  loopCount = 0,
): string {
  const q = query.trim().toLowerCase()
  return `${q}|${queryClass}|${stableProfileJson(profile)}|${level}|${forceAttribute ?? '*'}|loop${loopCount}`
}

async function postLlm(body: LlmRequest, signal: AbortSignal): Promise<ApiEnvelope> {
  const res = await fetch('/api/llm', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    signal,
  })
  const json = (await res.json()) as ApiEnvelope
  if (!res.ok && !json.error) {
    return { ok: false, error: `HTTP ${res.status}` }
  }
  return json
}

function sleep(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => resolve(), ms)
    signal?.addEventListener(
      'abort',
      () => {
        clearTimeout(t)
        reject(new DOMException('Aborted', 'AbortError'))
      },
      { once: true },
    )
  })
}

function mockClassify(query: string): ClassifyResponse {
  const q = query.trim().toLowerCase()
  if (q === 'lake') return { class: 'nonPeople', extracted: { objects: [], animals: [] } }
  if (q === 'lake last week') {
    return {
      class: 'nonPeople',
      extracted: { timeline: 'last_week', objects: ['lake'], animals: [] },
    }
  }
  if (q === 'me at the beach') {
    return { class: 'both', extracted: { objects: ['beach'], animals: [] } }
  }
  if (q === 'friends') return { class: 'people', extracted: { objects: [], animals: [] } }
  if (q === 'hotel receipt') {
    return { class: 'text', extracted: { docType: 'receipt', objects: [], animals: [] } }
  }
  if (q === 'dog' || q === 'my cat' || q === 'poodle') {
    const animals = q === 'poodle' ? ['dog', 'poodle'] : q.includes('cat') ? ['cat'] : ['dog']
    return { class: 'people', extracted: { animals, objects: [] } }
  }
  if (q === 'me and my dog') {
    return { class: 'both', extracted: { animals: ['dog'], objects: [] } }
  }
  return fallbackClassifier(query)
}

function mockInterpretTyped(text: string, currentAttribute: Attr): InterpretTypedResponse {
  const normalized = text.trim().toLowerCase()
  if (
    currentAttribute === 'location' &&
    normalized.includes('island') &&
    normalized.includes('lily')
  ) {
    return {
      updates: [
        { attribute: 'location', value: 'Vancouver Island' },
        { attribute: 'object', value: 'lily pads' },
      ],
      keywords: [],
      pillLabel: 'Vancouver Island · Lily pads',
    }
  }
  const trimmed = text.trim()
  if (!trimmed) {
    return { updates: [], keywords: [], pillLabel: '' }
  }
  return { updates: [], keywords: [trimmed], pillLabel: trimmed }
}

function buildFallbackQuestion(
  queryClass: QueryClass,
  level: ClarifierLevel,
  candidates: Photo[],
  answered: AnsweredMap,
  forceAttribute?: Attr,
): NextQuestionResponse | null {
  const attr =
    forceAttribute && hasSplittableAttribute(candidates, forceAttribute)
      ? forceAttribute
      : fallbackPickNext(
          candidates,
          answered,
          forceAttribute ? [forceAttribute] : allowedAttributes(queryClass, level),
          queryClass,
        )
  if (!attr) return null
  return {
    attribute: attr,
    question: resolveQuestionText(attr, undefined),
    options: [],
    allowTyping: true,
  }
}

function isStale(kind: 'classify' | 'nextQuestion' | 'interpret', id: number, gen: number): boolean {
  if (gen !== sessionGeneration) return true
  if (kind === 'classify') return id !== classifyRequestId
  if (kind === 'nextQuestion') return id !== nextQuestionRequestId
  return id !== interpretRequestId
}

export async function classify(
  query: string,
  options?: { signal?: AbortSignal },
): Promise<ClassifyOutcome | null> {
  const requestId = ++classifyRequestId
  const gen = sessionGeneration
  const started = Date.now()

  if (useMockLlm()) {
    const data = mockClassify(query)
    if (isStale('classify', requestId, gen)) return null
    const log: LlmLogEntry = {
      type: 'classify',
      requestId,
      latencyMs: Date.now() - started,
      fallback: false,
      rawRequest: { type: 'classify', query },
      rawResponse: data,
    }
    return { requestId, stale: false, data, fallback: false, log }
  }

  const controller = trackAbort(options?.signal)
  const body: LlmRequest = { type: 'classify', query }

  try {
    type RaceResult =
      | { kind: 'ok'; envelope: ApiEnvelope }
      | { kind: 'timeout' }
      | { kind: 'error'; message: string }

    const raced = await Promise.race<RaceResult>([
      postLlm(body, controller.signal)
        .then((envelope) => ({ kind: 'ok' as const, envelope }))
        .catch((err: Error) => {
          if (err.name === 'AbortError') throw err
          return { kind: 'error' as const, message: err.message }
        }),
      sleep(CALL1_TIMEOUT_MS).then(() => ({ kind: 'timeout' as const })),
    ])

    abortControllers.delete(controller)

    if (isStale('classify', requestId, gen)) return null

    if (raced.kind === 'timeout') {
      controller.abort()
      const data = fallbackClassifier(query)
      return {
        requestId,
        stale: false,
        data,
        fallback: true,
        log: {
          type: 'classify',
          requestId,
          latencyMs: CALL1_TIMEOUT_MS,
          fallback: true,
          rawRequest: body,
          rawResponse: data,
          error: 'Call 1 timeout',
        },
      }
    }

    if (raced.kind === 'error' || !raced.envelope.ok || !raced.envelope.data) {
      offlineToastPending = true
      const data = fallbackClassifier(query)
      const message =
        raced.kind === 'error' ? raced.message : (raced.envelope.error ?? 'LLM failed')
      return {
        requestId,
        stale: false,
        data,
        fallback: true,
        log: {
          type: 'classify',
          requestId,
          latencyMs: Date.now() - started,
          fallback: true,
          rawRequest: body,
          rawResponse: data,
          error: message,
        },
      }
    }

    const data = classifyResponseSchema.parse(raced.envelope.data)
    return {
      requestId,
      stale: false,
      data,
      fallback: false,
      log: {
        type: 'classify',
        requestId,
        latencyMs: raced.envelope.meta?.latencyMs ?? Date.now() - started,
        fallback: false,
        rawRequest: body,
        rawResponse: data,
        usage: raced.envelope.meta?.usage,
      },
    }
  } catch (err) {
    abortControllers.delete(controller)
    if ((err as Error).name === 'AbortError' || isStale('classify', requestId, gen)) return null
    throw err
  }
}

export type NextQuestionParams = {
  queryClass: QueryClass
  query: string
  profile: Record<string, string | 'any'>
  candidateCount: number
  attributeStats: AttributeStatsMap
  level: ClarifierLevel
  candidates: Photo[]
  answered: AnsweredMap
  /** Attribute already chosen by search logic; LLM writes question + option labels only. */
  forceAttribute?: Attr
  loopBack?: boolean
  previouslyAskedAttributes?: Attr[]
  loopCount?: number
  signal?: AbortSignal
}

export async function nextQuestion(params: NextQuestionParams): Promise<NextQuestionOutcome | null> {
  const requestId = ++nextQuestionRequestId
  const gen = sessionGeneration
  const started = Date.now()
  const allowed = params.forceAttribute
    ? [params.forceAttribute]
    : allowedAttributes(params.queryClass, params.level)
  const cacheKey = questionCacheKey(
    params.query,
    params.queryClass,
    params.profile,
    params.level,
    params.forceAttribute,
    params.loopCount ?? 0,
  )
  const cached = questionCache.get(cacheKey)
  if (cached) {
    if (isStale('nextQuestion', requestId, gen)) return null
    const log: LlmLogEntry = {
      type: 'nextQuestion',
      requestId,
      latencyMs: 0,
      fallback: false,
      cached: true,
      rawResponse: cached,
    }
    return { requestId, stale: false, data: cached, fallback: false, log }
  }

  const body: LlmRequest = {
    type: 'nextQuestion',
    queryClass: params.queryClass,
    query: params.query,
    profile: params.profile,
    candidateCount: params.candidateCount,
    attributeStats: params.attributeStats,
    allowedAttributes: allowed,
    level: params.level,
    ...(params.loopBack ? { loopBack: true } : {}),
    ...(params.previouslyAskedAttributes?.length
      ? { previouslyAskedAttributes: params.previouslyAskedAttributes }
      : {}),
  }

  const finishFallback = (
    error: string,
    extras?: { rawResponse?: unknown; serverRaw?: string },
  ): NextQuestionOutcome | null => {
    const fb = buildFallbackQuestion(
      params.queryClass,
      params.level,
      params.candidates,
      params.answered,
      params.forceAttribute,
    )
    if (!fb) return null
    const log: LlmLogEntry = {
      type: 'nextQuestion',
      requestId,
      latencyMs: Date.now() - started,
      fallback: true,
      error,
      rawRequest: body,
      rawResponse: extras?.rawResponse ?? fb,
    }
    if (extras?.serverRaw) {
      log.rawResponse = { ruleBased: fb, modelOutput: extras.serverRaw }
    }
    return { requestId, stale: false, data: fb, fallback: true, log }
  }

  if (useMockLlm()) {
    const fb = finishFallback('Mock LLM mode (VITE_USE_MOCK_LLM)')
    if (!fb || isStale('nextQuestion', requestId, gen)) return null
    return fb
  }

  const controller = trackAbort(params.signal)

  const llmPromise = (async (): Promise<NextQuestionOutcome> => {
    let modelPayload: unknown
    try {
      const envelope = await postLlm(body, controller.signal)
      if (!envelope.ok || !envelope.data) {
        const serverRaw =
          typeof envelope.meta?.raw === 'string' ? envelope.meta.raw : undefined
        throw Object.assign(new Error(envelope.error ?? 'LLM failed'), {
          serverRaw,
        })
      }
      modelPayload = envelope.data
      const parsed = nextQuestionResponseSchema.parse(modelPayload)
      const attribute = params.forceAttribute ?? parsed.attribute
      const data: NextQuestionResponse = {
        ...parsed,
        attribute,
        question: resolveQuestionText(attribute, parsed.question, {
          query: params.query,
          profileLocation: params.profile.location ?? null,
        }),
      }
      questionCache.set(cacheKey, data)
      const log: LlmLogEntry = {
        type: 'nextQuestion',
        requestId,
        latencyMs: envelope.meta?.latencyMs ?? Date.now() - started,
        fallback: false,
        rawRequest: body,
        rawResponse: data,
        usage: envelope.meta?.usage,
      }
      return { requestId, stale: false, data, fallback: false, log }
    } catch (err) {
      if ((err as Error).name === 'AbortError') throw err
      offlineToastPending = true
      const message = err instanceof Error ? err.message : String(err)
      const serverRaw = (err as Error & { serverRaw?: string }).serverRaw
      const fb = finishFallback(message, {
        ...(serverRaw ? { serverRaw } : {}),
        ...(modelPayload !== undefined ? { rawResponse: modelPayload } : {}),
      })
      if (!fb) throw err
      return fb
    }
  })()

  const timeoutPromise = sleep(CALL2_TIMEOUT_MS, controller.signal).then((): NextQuestionOutcome => {
    controller.abort()
    const fb = finishFallback(
      `Call 2 timeout (no response within ${CALL2_TIMEOUT_MS}ms)`,
    )
    if (!fb) {
      return {
        requestId,
        stale: false,
        data: {
          attribute: allowed[0]!,
          question: resolveQuestionText(allowed[0]!, undefined),
          options: [],
          allowTyping: true,
        },
        fallback: true,
        log: {
          type: 'nextQuestion',
          requestId,
          latencyMs: CALL2_TIMEOUT_MS,
          fallback: true,
          error: `Call 2 timeout (no response within ${CALL2_TIMEOUT_MS}ms)`,
          rawRequest: body,
        },
      }
    }
    return fb
  })

  try {
    const result = await Promise.race([llmPromise, timeoutPromise])
    abortControllers.delete(controller)
    if (isStale('nextQuestion', requestId, gen)) return null
    return result
  } catch (err) {
    abortControllers.delete(controller)
    if ((err as Error).name === 'AbortError' || isStale('nextQuestion', requestId, gen)) return null
    throw err
  }
}

export type InterpretParams = {
  text: string
  currentAttribute: Attr
  profile: Record<string, string | 'any'>
  allowedAttributes: Attr[]
  knownValues: Partial<Record<Attr, string[]>>
  signal?: AbortSignal
}

export async function interpretTyped(params: InterpretParams): Promise<InterpretOutcome | null> {
  const requestId = ++interpretRequestId
  const gen = sessionGeneration
  const started = Date.now()

  const keywordFallback = (): InterpretTypedResponse => {
    const trimmed = params.text.trim()
    if (!trimmed) return { updates: [], keywords: [], pillLabel: '' }
    return { updates: [], keywords: [trimmed], pillLabel: trimmed }
  }

  if (useMockLlm()) {
    const data = mockInterpretTyped(params.text, params.currentAttribute)
    if (isStale('interpret', requestId, gen)) return null
    const log: LlmLogEntry = {
      type: 'interpretTyped',
      requestId,
      latencyMs: Date.now() - started,
      fallback: false,
      rawResponse: data,
    }
    return { requestId, stale: false, data, fallback: false, log }
  }

  const controller = trackAbort(params.signal)
  const body: LlmRequest = {
    type: 'interpretTyped',
    text: params.text,
    currentAttribute: params.currentAttribute,
    profile: params.profile,
    allowedAttributes: params.allowedAttributes,
    knownValues: params.knownValues as Record<string, string[]>,
  }

  try {
    const envelope = await postLlm(body, controller.signal)
    abortControllers.delete(controller)
    if (isStale('interpret', requestId, gen)) return null

    if (!envelope.ok || !envelope.data) {
      offlineToastPending = true
      const data = keywordFallback()
      return {
        requestId,
        stale: false,
        data,
        fallback: true,
        log: {
          type: 'interpretTyped',
          requestId,
          latencyMs: Date.now() - started,
          fallback: true,
          rawRequest: body,
          rawResponse: data,
          error: envelope.error,
        },
      }
    }

    const data = interpretTypedResponseSchema.parse(envelope.data)
    const log: LlmLogEntry = {
      type: 'interpretTyped',
      requestId,
      latencyMs: envelope.meta?.latencyMs ?? Date.now() - started,
      fallback: false,
      rawRequest: body,
      rawResponse: data,
      usage: envelope.meta?.usage,
    }
    return { requestId, stale: false, data, fallback: false, log }
  } catch (err) {
    abortControllers.delete(controller)
    if ((err as Error).name === 'AbortError' || isStale('interpret', requestId, gen)) return null
    offlineToastPending = true
    const data = keywordFallback()
    return {
      requestId,
      stale: false,
      data,
      fallback: true,
      log: {
        type: 'interpretTyped',
        requestId,
        latencyMs: Date.now() - started,
        fallback: true,
        rawRequest: body,
        rawResponse: data,
        error: err instanceof Error ? err.message : String(err),
      },
    }
  }
}
