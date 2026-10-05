import type { Attr } from '@/lib/attributes'
import type { ValueCounts } from '@/lib/attributeStats'

export type GroundOptionsResult = {
  options: string[]
  skip: boolean
}

/**
 * Intersect LLM options with attributeStats keys (E-4.5, E-10.6).
 * If fewer than 2 remain, signal skip.
 */
export function groundOptions(
  llmOptions: string[],
  counts: ValueCounts,
  caseInsensitive = true,
): GroundOptionsResult {
  const keys = new Set(Object.keys(counts))
  const keyLookup = caseInsensitive
    ? new Map([...keys].map((k) => [k.toLowerCase(), k]))
    : null

  const grounded: string[] = []
  for (const opt of llmOptions) {
    if (keys.has(opt)) {
      grounded.push(opt)
      continue
    }
    if (keyLookup) {
      const canonical = keyLookup.get(opt.toLowerCase())
      if (canonical && !grounded.includes(canonical)) grounded.push(canonical)
    }
  }

  const unique = [...new Set(grounded)]
  return { options: unique, skip: unique.length < 2 }
}

export function groundOptionsForAttribute(
  attr: Attr,
  llmOptions: string[],
  counts: ValueCounts,
): GroundOptionsResult {
  const caseInsensitive = attr !== 'location'
  return groundOptions(llmOptions, counts, caseInsensitive)
}
