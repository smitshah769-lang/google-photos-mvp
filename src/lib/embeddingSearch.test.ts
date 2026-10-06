import { describe, expect, it } from 'vitest'
import type { Photo } from '@/data/photos'
import { rankPhotosByVector } from '@/lib/embeddingSearch'
import type { EmbeddingIndex } from '@/lib/embeddingIndex'
import { copyNormalized } from '@/lib/embeddingsMath'

function photo(id: string): Photo {
  return {
    id,
    kind: 'photo',
    source: 'generated',
    src: null,
    alt: id,
    width: 100,
    height: 100,
    date: '2026-01-01',
    location: 'Test',
    setting: 'outdoor',
    hasPeople: false,
    peopleCount: 0,
    animals: [],
    objects: [],
    colors: [],
  }
}

describe('rankPhotosByVector', () => {
  it('orders photos by similarity to query vector', () => {
    const vA = copyNormalized([1, 0, 0])
    const vB = copyNormalized([0.9, 0.1, 0])
    const vC = copyNormalized([0, 1, 0])
    const index: EmbeddingIndex = {
      version: 1,
      model: 'test',
      dimensions: 3,
      libraryIdHash: 'abc',
      photoIds: ['a', 'b', 'c'],
      vectors: [vA, vB, vC],
    }
    const library = [photo('a'), photo('b'), photo('c')]
    const query = copyNormalized([1, 0, 0])
    const ranked = rankPhotosByVector(query, index, library, 3, 0.5)
    expect(ranked.map((r) => r.photo.id)).toEqual(['a', 'b'])
  })
})
