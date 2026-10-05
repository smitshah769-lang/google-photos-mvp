import { describe, expect, it } from 'vitest'
import { photos } from '@/data/photos'
import { libraryIntegrity } from '@/lib/libraryChecks'
import { semanticBaselineCount } from '@/lib/semanticBaseline'

describe('photo library (implementation plan §9)', () => {
  it('has 430 unique ids', () => {
    const integrity = libraryIntegrity(photos)
    expect(integrity.countOk).toBe(true)
    expect(integrity.duplicateIds).toEqual([])
    expect(integrity.peopleMismatches).toEqual([])
  })

  it('includes demo target p10 with lily pads in last-week cluster metadata', () => {
    const p10 = photos.find((p) => p.id === 'p10')
    expect(p10).toBeDefined()
    expect(p10?.objects).toContain('lily pads')
    expect(p10?.kind).toBe('photo')
  })

  it('computes PRD §8.4 baseline counts in the expected neighbourhood', () => {
    const lake = semanticBaselineCount('lake', photos)
    const dog = semanticBaselineCount('dog', photos)
    expect(lake).toBeGreaterThan(50)
    expect(lake).toBeLessThan(120)
    expect(dog).toBeGreaterThan(5)
    expect(dog).toBeLessThan(25)
  })
})
