import type { Photo } from '@/data/photos'
import type { Attr } from '@/lib/attributes'
import { photoMatchesTimeline } from '@/lib/timeline'
import {
  getPhotoAttributeValue,
  profileValueMatchesPhoto,
} from '@/lib/photoAttributes'

export type IntentProfile = Partial<Record<Attr, string | 'any'>>

export type ScoredPhoto = Photo & { score: number }

export type FilterInput = {
  library: Photo[]
  profile: IntentProfile
  keywords?: string[]
}

function keywordMatchesPhoto(photo: Photo, keyword: string): boolean {
  const needle = keyword.toLowerCase()
  if (photo.alt.toLowerCase().includes(needle)) return true
  if (photo.animals.some((a) => a.toLowerCase().includes(needle))) return true
  if (photo.objects.some((o) => o.toLowerCase().includes(needle))) return true
  return false
}

function photoMatchesProfile(photo: Photo, profile: IntentProfile): boolean {
  for (const [attr, value] of Object.entries(profile) as [Attr, string | 'any'][]) {
    if (value === 'any' || value === undefined) continue

    if (attr === 'timeline') {
      if (!photoMatchesTimeline(photo.date, value)) return false
      continue
    }

    if (!profileValueMatchesPhoto(photo, attr, value)) return false
  }
  return true
}

function countMatchedProfileAttributes(photo: Photo, profile: IntentProfile): number {
  let n = 0
  for (const [attr, value] of Object.entries(profile) as [Attr, string | 'any'][]) {
    if (value === 'any' || value === undefined) continue
    if (attr === 'timeline') {
      if (photoMatchesTimeline(photo.date, value)) n++
      continue
    }
    if (profileValueMatchesPhoto(photo, attr, value)) n++
  }
  return n
}

function countMatchedKeywords(photo: Photo, keywords: string[]): number {
  let n = 0
  for (const kw of keywords) {
    if (keywordMatchesPhoto(photo, kw)) n++
  }
  return n
}

/** Filter library by profile + keywords; score and sort (E-8.10, E-8.2). */
export function filterPhotos(input: FilterInput): ScoredPhoto[] {
  const keywords = input.keywords ?? []
  const matched = input.library.filter(
    (photo) =>
      photoMatchesProfile(photo, input.profile) &&
      keywords.every((kw) => keywordMatchesPhoto(photo, kw)),
  )

  const scored: ScoredPhoto[] = matched.map((photo) => ({
    ...photo,
    score:
      countMatchedProfileAttributes(photo, input.profile) +
      countMatchedKeywords(photo, keywords),
  }))

  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score
    if (b.date !== a.date) return b.date.localeCompare(a.date)
    return a.id.localeCompare(b.id)
  })

  return scored
}

export type ApplyFilterResult = {
  applied: boolean
  candidates: ScoredPhoto[]
  profile: IntentProfile
}

/**
 * Apply one profile update. If the filter would yield zero results, undo (E-7.2).
 * `previousCandidates` is returned unchanged on reject (scores preserved).
 */
export function applyFilter(
  library: Photo[],
  previousCandidates: ScoredPhoto[],
  profile: IntentProfile,
  keywords: string[],
  attr: Attr,
  value: string | 'any',
): ApplyFilterResult {
  const nextProfile: IntentProfile = { ...profile, [attr]: value }

  if (value === 'any') {
    return {
      applied: true,
      profile: nextProfile,
      candidates: filterPhotos({ library, profile: nextProfile, keywords }),
    }
  }

  const next = filterPhotos({ library, profile: nextProfile, keywords })
  if (next.length === 0) {
    return { applied: false, profile, candidates: previousCandidates }
  }

  return { applied: true, profile: nextProfile, candidates: next }
}

/** Whether a photo would pass a strict filter on one attribute (E-11.1). */
export function photoPassesAttributeFilter(
  photo: Photo,
  attr: Attr,
  value: string,
): boolean {
  if (attr === 'timeline') return photoMatchesTimeline(photo.date, value)
  const raw = getPhotoAttributeValue(photo, attr)
  if (raw === null) return false
  return profileValueMatchesPhoto(photo, attr, value)
}
