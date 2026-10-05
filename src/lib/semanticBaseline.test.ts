import { describe, expect, it } from 'vitest'
import { photos } from '@/data/photos'
import { semanticBaselineCount } from '@/lib/semanticBaseline'

/** PRD §8.4 neighbourhood — not exact literals. */
const BASELINE_TARGETS: Record<string, [number, number]> = {
  lake: [65, 95],
  sunset: [20, 45],
  dog: [5, 20],
  beach: [25, 45],
  Diwali: [1, 3],
  'hotel receipt': [3, 10],
}

describe('semanticBaseline vs library', () => {
  for (const [query, [min, max]] of Object.entries(BASELINE_TARGETS)) {
    it(`${query} baseline count in ~PRD range`, () => {
      const n = semanticBaselineCount(query, photos)
      expect(n).toBeGreaterThanOrEqual(min)
      expect(n).toBeLessThanOrEqual(max)
    })
  }
})
