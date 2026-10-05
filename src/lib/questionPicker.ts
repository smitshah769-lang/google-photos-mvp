import type { Photo } from '@/data/photos'
import type { Attr, QueryClass } from '@/lib/attributes'
import { allowedAttributes, level1OrderIndex } from '@/lib/attributes'
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
      l1: level1OrderIndex(queryClass, a),
    }))

  if (scored.length === 0) return null

  scored.sort((x, y) => {
    if (y.entropy !== x.entropy) return y.entropy - x.entropy
    if (x.l1 !== y.l1) return x.l1 - y.l1
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
  const l1a = level1OrderIndex(queryClass, a)
  const l1b = level1OrderIndex(queryClass, b)
  if (l1a !== l1b) return l1a - l1b
  return a.localeCompare(b)
}

export function getStatsForAllowed(
  candidates: Photo[],
  queryClass: QueryClass,
  level: 1 | 2 | 3,
): AttributeStatsMap {
  return attributeStats(candidates, allowedAttributes(queryClass, level))
}

/** FR-12 / E-9.7: loop-back uses level 2 if any unused L2 attrs, else level 3. Never re-opens "can't remember" here. */
export function pickLoopBackLevel(
  candidates: Photo[],
  answered: AnsweredMap,
  queryClass: QueryClass,
): 2 | 3 | null {
  for (const level of [2, 3] as const) {
    const allowed = allowedAttributes(queryClass, level)
    if (fallbackPickNext(candidates, answered, allowed, queryClass)) return level
  }
  return null
}
