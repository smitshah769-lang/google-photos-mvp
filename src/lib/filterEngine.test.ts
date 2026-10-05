import { describe, expect, it } from 'vitest'
import type { Photo } from '@/data/photos'
import { photos } from '@/data/photos'
import { applyFilter, filterPhotos, photoPassesAttributeFilter } from '@/lib/filterEngine'

const basePhoto = (overrides: Partial<Photo> & Pick<Photo, 'id'>): Photo => ({
  kind: 'photo',
  source: 'real',
  src: null,
  alt: '',
  width: 900,
  height: 900,
  date: '2026-01-01',
  location: 'Test',
  setting: 'outdoor',
  hasPeople: false,
  peopleCount: 0,
  animals: [],
  objects: [],
  colors: [],
  ...overrides,
})

describe('filterEngine', () => {
  it('E-11.1 missing timeOfDay fails morning filter', () => {
    const noTod = basePhoto({ id: 'a', objects: ['lake'] })
    const morning = basePhoto({ id: 'b', objects: ['lake'], timeOfDay: 'morning' })
    const results = filterPhotos({
      library: [noTod, morning],
      profile: { timeOfDay: 'morning' },
    })
    expect(results.map((p) => p.id)).toEqual(['b'])
    expect(photoPassesAttributeFilter(noTod, 'timeOfDay', 'morning')).toBe(false)
  })

  it('E-5.3 keyword substring on objects, animals, alt', () => {
    const poodle = photos.find((p) => p.id === 'p01')!
    const results = filterPhotos({
      library: photos,
      profile: {},
      keywords: ['poodle'],
    })
    expect(results.some((p) => p.id === 'p01')).toBe(true)
    expect(poodle.animals).toContain('dog')
  })

  it('E-11.5 dog keyword matches p01 without hasPeople', () => {
    const results = filterPhotos({
      library: photos,
      profile: {},
      keywords: ['dog'],
    })
    expect(results.some((p) => p.id === 'p01')).toBe(true)
    const p01 = photos.find((p) => p.id === 'p01')!
    expect(p01.hasPeople).toBe(false)
  })

  it('E-7.2 applyFilter rejects empty result set', () => {
    const a = basePhoto({ id: 'x', location: 'A' })
    const b = basePhoto({ id: 'y', location: 'B' })
    const prev = filterPhotos({ library: [a, b], profile: {} })
    const result = applyFilter([a, b], prev, {}, [], 'location', 'Nowhere')
    expect(result.applied).toBe(false)
    expect(result.candidates).toEqual(prev)
  })

  it('location is exact (E-11.8)', () => {
    const van = basePhoto({ id: 'v', location: 'Vancouver, Canada' })
    const island = basePhoto({ id: 'i', location: 'Vancouver Island, Canada' })
    const results = filterPhotos({
      library: [van, island],
      profile: { location: 'Vancouver Island, Canada' },
    })
    expect(results.map((p) => p.id)).toEqual(['i'])
  })
})
