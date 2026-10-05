import type { Photo } from '@/data/photos'
import type { Attr } from '@/lib/attributes'
import { applyFilter, type IntentProfile, type ScoredPhoto } from '@/lib/filterEngine'

export type RoundDraft = Partial<Record<Attr, string | 'any'>>

export function candidatesWithDraft(
  pool: Photo[],
  profile: IntentProfile,
  keywords: string[],
  baseCandidates: ScoredPhoto[],
  draft: RoundDraft,
): ScoredPhoto[] {
  let nextProfile = { ...profile }
  let nextKeywords = [...keywords]
  let candidates = baseCandidates

  for (const [rawAttr, value] of Object.entries(draft) as [Attr, string | 'any'][]) {
    if (value === 'any' || value === undefined) continue
    const result = applyFilter(pool, candidates, nextProfile, nextKeywords, rawAttr, value)
    if (!result.applied) continue
    nextProfile = result.profile
    candidates = result.candidates
  }

  return candidates
}

export function optionWouldMatch(
  pool: Photo[],
  profile: IntentProfile,
  keywords: string[],
  baseCandidates: ScoredPhoto[],
  draft: RoundDraft,
  attr: Attr,
  value: string,
): boolean {
  const merged: RoundDraft = { ...draft, [attr]: value }
  return candidatesWithDraft(pool, profile, keywords, baseCandidates, merged).length > 0
}

export function previewCount(
  pool: Photo[],
  profile: IntentProfile,
  keywords: string[],
  candidates: ScoredPhoto[],
  draft: RoundDraft,
): number {
  return candidatesWithDraft(pool, profile, keywords, candidates, draft).length
}
