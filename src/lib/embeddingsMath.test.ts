import { describe, expect, it } from 'vitest'
import { cosineSimilarity, copyNormalized } from '@/lib/embeddingsMath'

describe('embeddingsMath', () => {
  it('cosine similarity is 1 for identical normalized vectors', () => {
    const a = copyNormalized([1, 2, 3])
    const b = copyNormalized([1, 2, 3])
    expect(cosineSimilarity(a, b)).toBeCloseTo(1, 5)
  })

  it('cosine similarity is 0 for orthogonal vectors', () => {
    const a = copyNormalized([1, 0, 0])
    const b = copyNormalized([0, 1, 0])
    expect(cosineSimilarity(a, b)).toBeCloseTo(0, 5)
  })
})
