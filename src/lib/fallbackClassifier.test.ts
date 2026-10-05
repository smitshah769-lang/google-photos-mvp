import { describe, expect, it } from 'vitest'
import { fallbackClassifier } from '@/lib/fallbackClassifier'

describe('fallbackClassifier', () => {
  it('classifies lake as nonPeople', () => {
    expect(fallbackClassifier('lake').class).toBe('nonPeople')
  })

  it('classifies me at the beach as both', () => {
    expect(fallbackClassifier('me at the beach').class).toBe('both')
  })

  it('classifies friends as people', () => {
    expect(fallbackClassifier('friends').class).toBe('people')
  })

  it('classifies hotel receipt as text with docType', () => {
    const r = fallbackClassifier('hotel receipt')
    expect(r.class).toBe('text')
    expect(r.extracted.docType).toBe('receipt')
  })

  it('classifies dog as people with animals', () => {
    const r = fallbackClassifier('dog')
    expect(r.class).toBe('people')
    expect(r.extracted.animals).toContain('dog')
  })

  it('extracts bare year into timeline', () => {
    const r = fallbackClassifier('2025')
    expect(r.extracted.timeline).toBe('year:2025')
  })
})
