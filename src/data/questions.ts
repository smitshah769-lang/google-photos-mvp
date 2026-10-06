import type { Attr } from '@/lib/attributes'

/** Default copy aligned with Mockups/screens.html (screen 03). */
const TEMPLATE: Record<Attr, string> = {
  timeline: 'When was the photo clicked?',
  location: 'Where was it?',
  object: "What's in it?",
  photoType: 'What kind of photo is it?',
  docType: 'What type of document is it?',
  peopleCount: 'How many people are in it?',
  pose: 'What are they doing?',
  timeOfDay: 'What time of day was it?',
  sky: 'What was the sky like?',
  clothingColor: 'What colour clothing stands out?',
  background: 'Was it indoors or outdoors?',
  dominantColor: 'Main colour?',
  activity: 'What activity was going on nearby?',
  language: 'Which language?',
  textContent: 'What does it show?',
  layout: 'Is it printed or handwritten?',
  pageColor: 'What colour is the page or background?',
}

const TIMELINE_LABELS: Record<string, string> = {
  last_week: 'Last week',
  last_month: 'Last month',
  last_3_months: 'Last 3 months',
  this_year: 'This year',
  last_year: 'Last year',
  older: 'Older',
}

export function timelineOptionLabel(value: string): string {
  if (value.startsWith('year:')) return value.slice(5)
  return TIMELINE_LABELS[value] ?? value
}

export function getTemplateQuestion(attr: Attr): string {
  return TEMPLATE[attr]
}

const MAX_QUESTION_LEN = 120

export type QuestionResolveContext = {
  query: string
  profileLocation?: string | null
}

/** True when the LLM echoed a catalog place the user did not mention (e.g. Lake Tuz for query "lake"). */
export function questionLeaksCatalogPlace(
  question: string,
  query: string,
  profileLocation?: string | null,
): boolean {
  const loc = profileLocation?.trim()
  if (loc) {
    const core = loc.split(',')[0]!.trim().toLowerCase()
    if (core.length >= 3 && question.toLowerCase().includes(core)) return false
  }

  const queryLower = query.trim().toLowerCase()
  const queryTokens = new Set(
    queryLower.split(/[^a-z0-9]+/i).filter((t) => t.length > 0),
  )

  const photoOf = question.match(/\bphoto of\s+([^?]+)/i)
  if (photoOf) {
    const phraseTokens = photoOf[1]!
      .trim()
      .toLowerCase()
      .split(/[^a-z0-9]+/i)
      .filter((t) => t.length > 2)
    const extras = phraseTokens.filter((t) => !queryTokens.has(t))
    if (extras.length > 0) return true
  }

  const atPlace = question.match(/\b(?:at|in|from)\s+([A-Z][A-Za-z]+(?:\s+[A-Z][A-Za-z]+)+)/)
  if (atPlace) {
    const placeTokens = atPlace[1]!
      .toLowerCase()
      .split(/\s+/)
      .filter((t) => t.length > 2)
    const extras = placeTokens.filter((t) => !queryTokens.has(t))
    if (extras.length > 0) return true
  }

  return false
}

/** Use template when LLM text is empty or unusable (E-4.9). */
export function resolveQuestionText(
  attr: Attr,
  llmQuestion: string | undefined,
  ctx?: QuestionResolveContext,
): string {
  if (attr === 'timeline') return getTemplateQuestion('timeline')

  const q = llmQuestion?.trim() ?? ''
  if (!q) return getTemplateQuestion(attr)
  if (q.length > MAX_QUESTION_LEN) return getTemplateQuestion(attr)
  if (ctx && questionLeaksCatalogPlace(q, ctx.query, ctx.profileLocation)) {
    return getTemplateQuestion(attr)
  }
  if (q.includes('?')) return q
  if (q.length >= 12) return q.endsWith('.') ? q.slice(0, -1) + '?' : `${q}?`
  return getTemplateQuestion(attr)
}
