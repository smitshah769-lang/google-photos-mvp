import { describe, expect, it } from 'vitest'
import { groundOptions } from '@/lib/grounding'

describe('grounding (E-4.5, E-10.6)', () => {
  it('drops unknown options and skips when fewer than 2 remain', () => {
    const { options, skip } = groundOptions(
      ['Mumbai, India', 'Fake City'],
      { 'Mumbai, India': 3, 'Taipei, Taiwan': 2 },
      false,
    )
    expect(options).toEqual(['Mumbai, India'])
    expect(skip).toBe(true)
  })

  it('keeps grounded options when at least 2 remain', () => {
    const { options, skip } = groundOptions(
      ['Mumbai, India', 'Taipei, Taiwan', 'Nowhere'],
      { 'Mumbai, India': 3, 'Taipei, Taiwan': 2 },
      false,
    )
    expect(options).toEqual(['Mumbai, India', 'Taipei, Taiwan'])
    expect(skip).toBe(false)
  })
})
