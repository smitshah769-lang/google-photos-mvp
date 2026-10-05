import type { ClassifyResponse } from '@/lib/schemas'
import type { QueryClass } from '@/lib/attributes'

const ANIMAL_TERMS = [
  'dog',
  'cat',
  'poodle',
  'puppy',
  'kitten',
  'pet',
  'horse',
  'bird',
  'rabbit',
  'hamster',
  'parrot',
  'cow',
  'goat',
]

const DOC_TERMS: Array<{ word: string; docType: ClassifyResponse['extracted']['docType'] }> = [
  { word: 'receipt', docType: 'receipt' },
  { word: 'invoice', docType: 'receipt' },
  { word: 'passport', docType: 'id' },
  { word: 'ticket', docType: 'ticket' },
  { word: 'note', docType: 'note' },
  { word: 'notes', docType: 'note' },
  { word: 'slides', docType: 'slides' },
  { word: 'whiteboard', docType: 'slides' },
  { word: 'screenshot', docType: 'screenshot' },
]

const PEOPLE_TERMS = [
  'me',
  'myself',
  'i ',
  ' i',
  'friend',
  'friends',
  'mom',
  'dad',
  'family',
  'selfie',
  'group',
  'us ',
  ' us',
  'we ',
  'birthday',
  'wedding',
]

const SCENE_TERMS = [
  'beach',
  'lake',
  'mountain',
  'trek',
  'temple',
  'hotel',
  'restaurant',
  'city',
  'park',
  'forest',
  'water',
  'sunset',
  'food',
  'receipt',
]

const TIMELINE_PHRASES: Array<{ phrase: string; value: ClassifyResponse['extracted']['timeline'] }> =
  [
    { phrase: 'last week', value: 'last_week' },
    { phrase: 'last month', value: 'last_month' },
    { phrase: 'last 3 months', value: 'last_3_months' },
    { phrase: 'this year', value: 'this_year' },
    { phrase: 'last year', value: 'last_year' },
  ]

function containsTerm(hay: string, term: string): boolean {
  if (term.endsWith(' ') || term.startsWith(' ')) return hay.includes(term)
  const re = new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i')
  return re.test(hay)
}

function extractAnimals(q: string): string[] {
  const found: string[] = []
  for (const term of ANIMAL_TERMS) {
    if (containsTerm(q, term) && !found.includes(term)) found.push(term === 'puppy' ? 'dog' : term === 'kitten' ? 'cat' : term)
  }
  if (containsTerm(q, 'poodle')) found.push('dog', 'poodle')
  return [...new Set(found)]
}

function extractDocType(q: string): ClassifyResponse['extracted']['docType'] {
  for (const { word, docType } of DOC_TERMS) {
    if (containsTerm(q, word)) return docType
  }
  return null
}

function isDocumentQuery(q: string): boolean {
  return DOC_TERMS.some(({ word }) => containsTerm(q, word))
}

function hasPeopleCue(q: string): boolean {
  return PEOPLE_TERMS.some((t) => containsTerm(q, t))
}

function hasSceneCue(q: string): boolean {
  return SCENE_TERMS.some((t) => containsTerm(q, t))
}

function extractTimeline(q: string): ClassifyResponse['extracted']['timeline'] {
  for (const { phrase, value } of TIMELINE_PHRASES) {
    if (q.includes(phrase)) return value
  }
  const yearMatch = q.match(/\b(19|20)\d{2}\b/)
  if (yearMatch) return `year:${yearMatch[0]}` as ClassifyResponse['extracted']['timeline']
  return null
}

function extractObjects(q: string): string[] {
  const objects: string[] = []
  if (containsTerm(q, 'lake') || containsTerm(q, 'jheel')) objects.push('lake')
  if (containsTerm(q, 'beach')) objects.push('beach')
  return objects
}

/** Rule-based Call 1 when the LLM is unavailable (E-1.3, E-2.5, E-10.4). No fuzzy matching (E-1.5). */
export function fallbackClassifier(rawQuery: string): ClassifyResponse {
  const q = rawQuery.trim().toLowerCase()
  const extracted: ClassifyResponse['extracted'] = {
    timeline: extractTimeline(q),
    location: null,
    objects: extractObjects(q),
    animals: [],
    photoType: null,
    docType: null,
  }

  const animals = extractAnimals(q)
  if (animals.length > 0) extracted.animals = animals

  if (isDocumentQuery(q)) {
    extracted.docType = extractDocType(q)
    return { class: 'text', extracted }
  }

  const people = hasPeopleCue(q)
  const scene = hasSceneCue(q) || extracted.objects.length > 0

  if (people && (scene || animals.length > 0)) {
    return { class: 'both', extracted }
  }

  if (people || animals.length > 0) {
    return { class: 'people', extracted }
  }

  return { class: 'nonPeople', extracted }
}

export function normalizeQueryClass(value: string): QueryClass | null {
  if (value === 'people' || value === 'nonPeople' || value === 'both' || value === 'text') {
    return value
  }
  return null
}
