/**
 * Strip markdown fences and extract the first JSON object (E-10.13).
 */
export function extractJsonObject(raw: string): string {
  let text = raw.trim()
  const fence = /^```(?:json)?\s*\n?([\s\S]*?)\n?```/i
  const m = text.match(fence)
  if (m?.[1]) text = m[1].trim()

  const start = text.indexOf('{')
  if (start === -1) throw new Error('No JSON object in model output')

  let depth = 0
  let inString = false
  let escape = false

  for (let i = start; i < text.length; i++) {
    const ch = text[i]
    if (inString) {
      if (escape) {
        escape = false
        continue
      }
      if (ch === '\\') {
        escape = true
        continue
      }
      if (ch === '"') inString = false
      continue
    }
    if (ch === '"') {
      inString = true
      continue
    }
    if (ch === '{') depth++
    else if (ch === '}') {
      depth--
      if (depth === 0) return text.slice(start, i + 1)
    }
  }

  throw new Error('Unclosed JSON object in model output')
}

export function parseModelJson<T>(raw: string, validate: (data: unknown) => T): T {
  const jsonText = extractJsonObject(raw)
  const parsed: unknown = JSON.parse(jsonText)
  return validate(parsed)
}
