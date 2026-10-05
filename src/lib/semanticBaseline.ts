import type { Photo } from '@/data/photos'
import { QUERY_SYNONYMS } from '@/data/synonyms'

function tokenizeQuery(query: string): string[] {
  return query
    .toLowerCase()
    .split(/[^a-z0-9]+/i)
    .map((t) => t.trim())
    .filter((t) => t.length > 0)
}

function expandTerms(tokens: string[]): { queryTerms: Set<string>; synonymTerms: Set<string> } {
  const queryTerms = new Set(tokens)
  const synonymTerms = new Set<string>()

  for (const token of tokens) {
    const syns = QUERY_SYNONYMS[token]
    if (syns) {
      for (const s of syns) {
        const lower = s.toLowerCase()
        if (!queryTerms.has(lower)) synonymTerms.add(lower)
      }
    }
  }

  const joined = tokens.join(' ')
  for (const [key, syns] of Object.entries(QUERY_SYNONYMS)) {
    if (!joined.includes(key)) continue
    queryTerms.add(key)
    for (const s of syns) {
      const lower = s.toLowerCase()
      if (!queryTerms.has(lower)) synonymTerms.add(lower)
    }
  }

  return { queryTerms, synonymTerms }
}

function fieldIncludes(haystack: string[], term: string): boolean {
  return haystack.some((h) => h.toLowerCase().includes(term))
}

function photoMatchesBaselineTerm(
  photo: Photo,
  term: string,
  allowAlt: boolean,
): boolean {
  if (fieldIncludes(photo.objects, term)) return true
  if (fieldIncludes(photo.animals, term)) return true
  if (allowAlt && photo.alt.toLowerCase().includes(term)) return true
  if (
    allowAlt &&
    photo.kind === 'document' &&
    photo.docType?.toLowerCase().includes(term)
  ) {
    return true
  }
  return false
}

/** Loose tag match for the "without clarifier" count (PRD §6.4). */
export function semanticBaseline(query: string, library: Photo[]): Photo[] {
  const trimmed = query.trim()
  if (!trimmed) return []

  const tokens = tokenizeQuery(trimmed)
  const { queryTerms, synonymTerms } = expandTerms(
    tokens.length ? tokens : [trimmed.toLowerCase()],
  )

  return library.filter((photo) => {
    for (const term of queryTerms) {
      if (photoMatchesBaselineTerm(photo, term, true)) return true
    }
    for (const term of synonymTerms) {
      if (photoMatchesBaselineTerm(photo, term, false)) return true
    }
    return false
  })
}

export function semanticBaselineCount(query: string, library: Photo[]): number {
  return semanticBaseline(query, library).length
}
