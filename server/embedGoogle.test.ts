import { describe, expect, it } from 'vitest'
import { formatGoogleDocument, formatGoogleQuery } from './embedGoogle.ts'

describe('formatGoogle embed text', () => {
  it('prefixes embedding-2 query and document', () => {
    expect(formatGoogleQuery('hugging', 'gemini-embedding-2')).toContain('task: search result')
    expect(formatGoogleDocument('alt text', 'gemini-embedding-2')).toContain('title: none')
  })

  it('leaves embedding-001 plain', () => {
    expect(formatGoogleQuery('hugging', 'gemini-embedding-001')).toBe('hugging')
    expect(formatGoogleDocument('alt', 'gemini-embedding-001')).toBe('alt')
  })
})
