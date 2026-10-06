import { describe, expect, it, beforeEach } from 'vitest'
import type { Photo } from '@/data/photos'
import { resetPhotoVisionCache, setPhotoVisionSidecar } from '@/lib/photoVision'
import { photoSearchText } from '@/lib/photoSearchText'

const base: Photo = {
  id: 'p10',
  kind: 'photo',
  source: 'real',
  src: '/photos/photo-10.jpg',
  alt: 'Calm lake',
  width: 900,
  height: 600,
  date: '2026-10-02',
  location: 'Vancouver Island, Canada',
  setting: 'outdoor',
  hasPeople: false,
  peopleCount: 0,
  animals: [],
  objects: ['lake'],
  colors: ['green'],
}

beforeEach(() => {
  resetPhotoVisionCache()
  setPhotoVisionSidecar(null)
})

describe('photoSearchText with vision sidecar', () => {
  it('keeps photos.ts fields and appends search-only vision text', () => {
    setPhotoVisionSidecar({
      version: 1,
      model: 'test',
      generatedAt: '2026-01-01',
      entries: {
        p10: {
          searchTags: ['lily pads', 'island'],
          caption: 'Small tree on a rock in a lake',
        },
      },
    })

    const text = photoSearchText(base)
    expect(text).toContain('Calm lake')
    expect(text).toContain('lake')
    expect(text).toContain('lily pads')
    expect(text).toContain('Small tree on a rock')
  })
})
