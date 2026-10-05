import type { Photo } from '@/data/photos'

export const EXPECTED_LIBRARY_SIZE = 430

export function findDuplicateIds(photos: Photo[]): string[] {
  const seen = new Set<string>()
  const dupes: string[] = []
  for (const p of photos) {
    if (seen.has(p.id)) dupes.push(p.id)
    else seen.add(p.id)
  }
  return dupes
}

/** E-11.6 — flag inconsistent people flags (animal-only rows are allowed). */
export function hasPeopleMetadataMismatch(photo: Photo): boolean {
  if (photo.kind === 'document') return false
  if (photo.hasPeople && photo.peopleCount === 0) return true
  if (!photo.hasPeople && photo.peopleCount > 0) return true
  return false
}

export function libraryIntegrity(photos: Photo[]) {
  const duplicateIds = findDuplicateIds(photos)
  const mismatches = photos.filter(hasPeopleMetadataMismatch)
  return {
    count: photos.length,
    unique: duplicateIds.length === 0 && photos.length === new Set(photos.map((p) => p.id)).size,
    expectedSize: EXPECTED_LIBRARY_SIZE,
    countOk: photos.length === EXPECTED_LIBRARY_SIZE,
    duplicateIds,
    peopleMismatches: mismatches.map((p) => p.id),
  }
}
