import type { Photo } from '@/data/photos'
import type { Attr, QueryClass } from '@/lib/attributes'
import {
  allowedAttributes,
  attributeRankIndex,
  loopBackAttributePool,
} from '@/lib/attributes'
import {
  attributeStats,
  hasSplittableAttribute,
  type AttributeStatsMap,
} from '@/lib/attributeStats'

export type AnsweredMap = Partial<Record<Attr, 'value' | 'any'>>

function isAnswered(answered: AnsweredMap, attr: Attr): boolean {
  return answered[attr] !== undefined
}

function candidatesAreAnimalOnly(candidates: Photo[]): boolean {
  if (candidates.length === 0) return false
  return candidates.every((p) => p.animals.length > 0 && !p.hasPeople)
}

/** Highest-entropy unanswered allowed attribute (architecture §6.3, E-10.5). */
export function fallbackPickNext(
  candidates: Photo[],
  answered: AnsweredMap,
  allowed: Attr[],
  queryClass: QueryClass,
): Attr | null {
  const open = allowed.filter((a) => !isAnswered(answered, a))
  if (open.length === 0) return null

  const stats = attributeStats(candidates, open)

  const scored = open
    .filter((a) => {
      if (a === 'peopleCount' && candidatesAreAnimalOnly(candidates)) return false
      return hasSplittableAttribute(candidates, a)
    })
    .map((a) => ({
      attr: a,
      entropy: stats[a]?.entropy ?? 0,
      rank: attributeRankIndex(queryClass, a),
    }))

  if (scored.length === 0) return null

  scored.sort((x, y) => {
    if (y.entropy !== x.entropy) return y.entropy - x.entropy
    if (x.rank !== y.rank) return x.rank - y.rank
    return x.attr.localeCompare(y.attr)
  })

  return scored[0]?.attr ?? null
}

export function pickNextWithLevel(
  candidates: Photo[],
  answered: AnsweredMap,
  queryClass: QueryClass,
  level: 1 | 2 | 3,
): Attr | null {
  const allowed = allowedAttributes(queryClass, level)

  if (level === 1) {
    for (const attr of allowed) {
      if (isAnswered(answered, attr)) continue
      if (!hasSplittableAttribute(candidates, attr)) continue
      if (attr === 'peopleCount' && candidatesAreAnimalOnly(candidates)) continue
      return attr
    }
    return null
  }

  return fallbackPickNext(candidates, answered, allowed, queryClass)
}

/** Stable entropy tie across runs (E-4.7) — exposed for tests. */
export function compareAttributePriority(
  a: Attr,
  b: Attr,
  entropyA: number,
  entropyB: number,
  queryClass: QueryClass,
): number {
  if (entropyB !== entropyA) return entropyB - entropyA
  const ra = attributeRankIndex(queryClass, a)
  const rb = attributeRankIndex(queryClass, b)
  if (ra !== rb) return ra - rb
  return a.localeCompare(b)
}

export function getStatsForAllowed(
  candidates: Photo[],
  queryClass: QueryClass,
  level: 1 | 2 | 3,
): AttributeStatsMap {
  return attributeStats(candidates, allowedAttributes(queryClass, level))
}

export function getStatsForPool(candidates: Photo[], pool: Attr[]): AttributeStatsMap {
  return attributeStats(candidates, pool)
}

/** FR-12 / E-9.7: loop-back picks from L2∪L3; UI level follows the attribute tier. */
export function pickLoopBackLevel(
  candidates: Photo[],
  answered: AnsweredMap,
  queryClass: QueryClass,
): 2 | 3 | null {
  const pool = loopBackAttributePool(queryClass)
  const attr = fallbackPickNext(candidates, answered, pool, queryClass)
  if (!attr) return null
  if (allowedAttributes(queryClass, 2).includes(attr)) return 2
  return 3
}
