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

function uniqueOrdered(...groups: Attr[][]): Attr[] {
  const seen = new Set<Attr>()
  const out: Attr[] = []
  for (const group of groups) {
    for (const attr of group) {
      if (seen.has(attr)) continue
      seen.add(attr)
      out.push(attr)
    }
  }
  return out
}

export function allowedAttributes(
  queryClass: QueryClass,
  level: ClarifierLevel,
): Attr[] {
  if (level === 1) return [...LEVEL1_ORDER[queryClass]]
  if (level === 2) return [...LEVEL2_ORDER[queryClass]]
  return [...LEVEL3_ORDER[queryClass]]
}

/** L1 ∪ L2 — adaptive first passes (peopleCount can appear early for "friends"). */
export function coarseAttributePool(queryClass: QueryClass): Attr[] {
  return uniqueOrdered(LEVEL1_ORDER[queryClass], LEVEL2_ORDER[queryClass])
}

/** L2 ∪ L3 — loop-back (FR-12); never re-asks L1 filters. */
export function loopBackAttributePool(queryClass: QueryClass): Attr[] {
  return uniqueOrdered(LEVEL2_ORDER[queryClass], LEVEL3_ORDER[queryClass])
}

/** Full clarifier pool for a round. */
export function clarifierAttributePool(
  queryClass: QueryClass,
  options: { includeLevel3: boolean; loopBack?: boolean },
): Attr[] {
  if (options.loopBack) return loopBackAttributePool(queryClass)
  const coarse = coarseAttributePool(queryClass)
  if (!options.includeLevel3) return coarse
  return uniqueOrdered(coarse, LEVEL3_ORDER[queryClass])
}

/** Stable tie-break order across L1 → L2 → L3 (E-4.7). */
export function attributeRankIndex(queryClass: QueryClass, attr: Attr): number {
  const order = clarifierAttributePool(queryClass, { includeLevel3: true })
  const idx = order.indexOf(attr)
  return idx === -1 ? Number.MAX_SAFE_INTEGER : idx
}

/** @deprecated Use attributeRankIndex */
export function level1OrderIndex(queryClass: QueryClass, attr: Attr): number {
  return attributeRankIndex(queryClass, attr)
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

export function clarifierLevelForAttribute(queryClass: QueryClass, attr: Attr): ClarifierLevel {
  if (LEVEL1_ORDER[queryClass].includes(attr)) return 1
  if (LEVEL2_ORDER[queryClass].includes(attr)) return 2
  return 3
}

export function allClassAttributes(queryClass: QueryClass): Attr[] {
  return clarifierAttributePool(queryClass, { includeLevel3: true })
}
