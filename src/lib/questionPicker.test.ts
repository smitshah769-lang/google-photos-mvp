import { describe, expect, it } from 'vitest'
import type { Photo } from '@/data/photos'
import { fallbackPickNext, pickLoopBackLevel } from '@/lib/questionPicker'

const photo = (id: string, loc: string, tod?: Photo['timeOfDay']): Photo => ({
  id,
  kind: 'photo',
  source: 'generated',
  src: null,
  alt: id,
  width: 1,
  height: 1,
  date: '2026-01-01',
  location: loc,
  setting: 'outdoor',
  hasPeople: false,
  peopleCount: 0,
  animals: [],
  objects: ['lake'],
  colors: ['blue'],
  timeOfDay: tod,
})

describe('questionPicker', () => {
  it('E-4.7 entropy tie-break is stable across runs', () => {
    const candidates = [
      photo('1', 'A', 'morning'),
      photo('2', 'B', 'afternoon'),
      photo('3', 'C', 'morning'),
      photo('4', 'D', 'afternoon'),
    ]
    for (const p of candidates) {
      p.sky = p.timeOfDay === 'morning' ? 'clear' : 'cloudy'
    }
    const allowed = ['timeOfDay', 'sky'] as const
    const first = fallbackPickNext(candidates, {}, [...allowed], 'nonPeople')
    const second = fallbackPickNext(candidates, {}, [...allowed], 'nonPeople')
    expect(first).toBe(second)
    expect(first).toBeTruthy()
  })

  it('E-9.7 excludes answered attributes from fallbackPickNext', () => {
    const candidates = [
      photo('1', 'A', 'morning'),
      photo('2', 'B', 'afternoon'),
    ]
    const pick = fallbackPickNext(
      candidates,
      { timeOfDay: 'value' },
      ['timeOfDay', 'sky'],
      'nonPeople',
    )
    expect(pick).not.toBe('timeOfDay')
  })

  it('pickLoopBackLevel skips exhausted L2 and uses L3 (E-9.7)', () => {
    const candidates = [
      { ...photo('1', 'A', 'morning'), hasPeople: true, peopleCount: 1, pose: 'smiling', setting: 'outdoor' as const },
      { ...photo('2', 'B', 'night'), hasPeople: true, peopleCount: 2, pose: 'serious', setting: 'indoor' as const },
    ]
    const answered = { peopleCount: 'any' as const, timeOfDay: 'any' as const }
    expect(fallbackPickNext(candidates, answered, ['peopleCount', 'timeOfDay'], 'both')).toBeNull()
    expect(pickLoopBackLevel(candidates, answered, 'both')).toBe(3)
  })
})
