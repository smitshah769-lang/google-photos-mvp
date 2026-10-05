import { describe, expect, it } from 'vitest'
import { extractJsonObject } from '../../server/parse.ts'

describe('extractJsonObject', () => {
  it('strips markdown fences (E-10.13)', () => {
    const raw = 'Here you go:\n```json\n{"class":"nonPeople","extracted":{"objects":[]}}\n```'
    const json = extractJsonObject(raw)
    expect(JSON.parse(json)).toEqual({ class: 'nonPeople', extracted: { objects: [] } })
  })

  it('extracts first object when extra text follows', () => {
    const json = extractJsonObject('prefix {"a":1} suffix')
    expect(JSON.parse(json)).toEqual({ a: 1 })
  })
})
