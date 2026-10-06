import { describe, expect, it } from 'vitest'
import {
  questionLeaksCatalogPlace,
  resolveQuestionText,
} from '@/data/questions'

describe('questionLeaksCatalogPlace', () => {
  it('flags Lake Tuz when user only said lake', () => {
    expect(
      questionLeaksCatalogPlace(
        'What stood out most in the photo of Lake Tuz?',
        'lake',
        null,
      ),
    ).toBe(true)
  })

  it('allows place when user mentioned it', () => {
    expect(
      questionLeaksCatalogPlace(
        'What stood out at Lake Tuz?',
        'lake tuz turkey',
        null,
      ),
    ).toBe(false)
  })
})

describe('resolveQuestionText', () => {
  it('always uses timeline template (ignores LLM wording)', () => {
    expect(
      resolveQuestionText('timeline', 'When was it taken?', {
        query: 'lake',
        profileLocation: null,
      }),
    ).toBe('When was the photo clicked?')
  })

  it('falls back to template when place leaks', () => {
    expect(
      resolveQuestionText(
        'object',
        'What stood out most in the photo of Lake Tuz?',
        { query: 'lake', profileLocation: null },
      ),
    ).toBe("What's in it?")
  })
})
