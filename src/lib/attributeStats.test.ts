import { describe, expect, it } from 'vitest'
import type { Photo } from '@/data/photos'
import {
  computeValueCounts,
  distinctValueCount,
  hasSplittableAttribute,
  optionsFromStats,
} from '@/lib/attributeStats'

const p = (id: string, extra: Partial<Photo> = {}): Photo => ({
  id,
  kind: 'photo',
  source: 'generated',
  src: null,
  alt: id,
  width: 1,
  height: 1,
  date: '2026-01-01',
  location: 'Same',
  setting: 'outdoor',
  hasPeople: false,
  peopleCount: 0,
  animals: [],
  objects: ['lake'],
  colors: ['blue'],
  ...extra,
})

describe('attributeStats (E-4.4)', () => {
  it('skips attribute with only one distinct value', () => {
    const candidates = [p('1'), p('2'), p('3')]
    expect(distinctValueCount(candidates, 'location')).toBe(1)
    expect(hasSplittableAttribute(candidates, 'location')).toBe(false)
  })

  it('allows attribute with two or more values', () => {
    const candidates = [
      p('1', { location: 'A' }),
      p('2', { location: 'B' }),
    ]
    expect(hasSplittableAttribute(candidates, 'location')).toBe(true)
  })

  it('E-6.8 timeline options are buckets with at least one candidate', () => {
    const candidates = [
      p('1', { date: '2026-10-01' }),
      p('2', { date: '2024-01-15' }),
    ]
    const counts = computeValueCounts(candidates, 'timeline')
    expect(counts.last_week).toBe(1)
    expect(counts.older).toBeGreaterThan(0)
    expect(hasSplittableAttribute(candidates, 'timeline')).toBe(true)
    const options = optionsFromStats('timeline', counts)
    expect(options).toContain('last_week')
    expect(options.length).toBeLessThanOrEqual(3)
    expect(options.every((option) => (counts[option] ?? 0) >= 1)).toBe(true)
  })
})
