import type { Photo } from '@/data/photos'
import type { Attr } from '@/lib/attributes'
import { CHIP_OPTIONS_PER_QUESTION, LOCATION_OPTION_CAP } from '@/config'
import { getPhotoAttributeValue } from '@/lib/photoAttributes'
import { photoMatchesTimeline } from '@/lib/timeline'

/** Fixed Timeline MCQ order (FR-4). Years are a separate picker, not extra chips. */
export const TIMELINE_BUCKETS = [
  'last_week',
  'last_month',
  'last_3_months',
  'this_year',
  'last_year',
  'older',
] as const

export type ValueCounts = Record<string, number>

export type AttributeStat = {
  counts: ValueCounts
  entropy: number
  distinct: number
}

export type AttributeStatsMap = Partial<Record<Attr, AttributeStat>>

function shannonEntropy(counts: ValueCounts): number {
  const total = Object.values(counts).reduce((a, b) => a + b, 0)
  if (total === 0) return 0
  let h = 0
  for (const c of Object.values(counts)) {
    if (c <= 0) continue
    const p = c / total
    h -= p * Math.log2(p)
  }
  return h
}

export function computeValueCounts(candidates: Photo[], attr: Attr): ValueCounts {
  const counts: ValueCounts = {}

  if (attr === 'timeline') {
    for (const bucket of TIMELINE_BUCKETS) {
      let n = 0
      for (const photo of candidates) {
        if (photoMatchesTimeline(photo.date, bucket)) n++
      }
      if (n > 0) counts[bucket] = n
    }
    return counts
  }

  if (attr === 'location') {
    for (const photo of candidates) {
      counts[photo.location] = (counts[photo.location] ?? 0) + 1
    }
    return counts
  }

  if (attr === 'object') {
    for (const photo of candidates) {
      for (const tag of photo.objects) {
        counts[tag] = (counts[tag] ?? 0) + 1
      }
    }
    return counts
  }

  if (attr === 'clothingColor' || attr === 'dominantColor' || attr === 'pageColor') {
    for (const photo of candidates) {
      for (const c of photo.colors) {
        counts[c] = (counts[c] ?? 0) + 1
      }
    }
    return counts
  }

  if (attr === 'textContent') {
    for (const photo of candidates) {
      for (const t of photo.textContent ?? []) {
        counts[t] = (counts[t] ?? 0) + 1
      }
    }
    return counts
  }

  for (const photo of candidates) {
    const v = getPhotoAttributeValue(photo, attr)
    if (v === null) continue
    counts[v] = (counts[v] ?? 0) + 1
  }
  return counts
}

export function computeAttributeStat(candidates: Photo[], attr: Attr): AttributeStat {
  const counts = computeValueCounts(candidates, attr)
  const distinct = Object.keys(counts).length
  return { counts, entropy: shannonEntropy(counts), distinct }
}

export function attributeStats(candidates: Photo[], attrs: Attr[]): AttributeStatsMap {
  const map: AttributeStatsMap = {}
  for (const attr of attrs) {
    map[attr] = computeAttributeStat(candidates, attr)
  }
  return map
}

export function distinctValueCount(candidates: Photo[], attr: Attr): number {
  return Object.keys(computeValueCounts(candidates, attr)).length
}

/** Fewer than 2 distinct values → skip question (E-4.4). */
export function hasSplittableAttribute(candidates: Photo[], attr: Attr): boolean {
  return distinctValueCount(candidates, attr) >= 2
}

/** Calendar years that actually appear on the current candidates (E-6.4). */
export function yearsPresent(candidates: Photo[]): number[] {
  const years = new Set<number>()
  for (const photo of candidates) {
    const year = Number(photo.date.slice(0, 4))
    if (Number.isFinite(year)) years.add(year)
  }
  return [...years].sort((a, b) => b - a)
}

/** Options for MCQs: frequency order, capped (E-4.6, FR-5). Timeline keeps FR-4 order. */
export function optionsFromStats(attr: Attr, counts: ValueCounts): string[] {
  if (attr === 'timeline') {
    return TIMELINE_BUCKETS.filter((bucket) => (counts[bucket] ?? 0) >= 1).slice(
      0,
      CHIP_OPTIONS_PER_QUESTION,
    )
  }

  const sorted = Object.entries(counts)
    .filter(([, c]) => c >= 1)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([value]) => value)

  const cap = attr === 'location' ? LOCATION_OPTION_CAP : CHIP_OPTIONS_PER_QUESTION
  return sorted.slice(0, cap)
}
