import type { Attr } from '@/lib/attributes'

/** Default copy aligned with Mockups/screens.html (screen 03). */
const TEMPLATE: Record<Attr, string> = {
  timeline: 'When was it?',
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

/** Use template when LLM text is empty or unusable (E-4.9). */
export function resolveQuestionText(attr: Attr, llmQuestion: string | undefined): string {
  const q = llmQuestion?.trim() ?? ''
  if (!q) return getTemplateQuestion(attr)
  if (q.length > MAX_QUESTION_LEN) return getTemplateQuestion(attr)
  if (q.includes('?')) return q
  if (q.length >= 12) return q.endsWith('.') ? q.slice(0, -1) + '?' : `${q}?`
  return getTemplateQuestion(attr)
}
