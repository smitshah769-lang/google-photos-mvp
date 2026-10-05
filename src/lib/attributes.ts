export type QueryClass = 'people' | 'nonPeople' | 'both' | 'text'

export type Attr =
  | 'timeline'
  | 'location'
  | 'object'
  | 'photoType'
  | 'docType'
  | 'peopleCount'
  | 'pose'
  | 'timeOfDay'
  | 'sky'
  | 'clothingColor'
  | 'background'
  | 'dominantColor'
  | 'activity'
  | 'language'
  | 'textContent'
  | 'layout'
  | 'pageColor'

export type ClarifierLevel = 1 | 2 | 3

const LEVEL1_ORDER: Record<QueryClass, Attr[]> = {
  people: ['timeline', 'location', 'photoType'],
  nonPeople: ['timeline', 'location', 'object'],
  both: ['timeline', 'location', 'object', 'photoType'],
  text: ['docType', 'timeline'],
}

const LEVEL2_ORDER: Record<QueryClass, Attr[]> = {
  people: ['peopleCount', 'pose'],
  nonPeople: ['timeOfDay', 'sky'],
  both: ['peopleCount', 'timeOfDay'],
  text: ['language', 'textContent'],
}

const LEVEL3_ORDER: Record<QueryClass, Attr[]> = {
  people: ['clothingColor', 'background'],
  nonPeople: ['dominantColor', 'activity'],
  both: ['pose', 'background'],
  text: ['layout', 'pageColor'],
}

export function allowedAttributes(
  queryClass: QueryClass,
  level: ClarifierLevel,
): Attr[] {
  if (level === 1) return [...LEVEL1_ORDER[queryClass]]
  if (level === 2) return [...LEVEL2_ORDER[queryClass]]
  return [...LEVEL3_ORDER[queryClass]]
}

/** Fixed first-level order for tie-breaking (E-4.7). */
export function level1OrderIndex(queryClass: QueryClass, attr: Attr): number {
  const order = LEVEL1_ORDER[queryClass]
  const idx = order.indexOf(attr)
  return idx === -1 ? Number.MAX_SAFE_INTEGER : idx
}

export function nextLevel1Attribute(
  queryClass: QueryClass,
  answered: Set<Attr>,
): Attr | null {
  for (const attr of LEVEL1_ORDER[queryClass]) {
    if (!answered.has(attr)) return attr
  }
  return null
}
