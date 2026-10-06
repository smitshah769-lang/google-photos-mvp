import type { Photo } from '../data/photos'
import { visionSearchTerms } from './photoVision'

/** Text blob embedded for semantic retrieval (index + query use the same format). */
export function photoSearchText(photo: Photo): string {
  const parts: string[] = [photo.alt]

  for (const term of visionSearchTerms(photo.id)) {
    parts.push(term)
  }

  if (photo.location) parts.push(photo.location)
  if (photo.setting) parts.push(photo.setting)
  if (photo.objects.length) parts.push(photo.objects.join(', '))
  if (photo.animals.length) parts.push(photo.animals.join(', '))
  if (photo.colors.length) parts.push(photo.colors.join(', '))
  if (photo.photoType) parts.push(photo.photoType)
  if (photo.pose) parts.push(photo.pose)
  if (photo.timeOfDay) parts.push(photo.timeOfDay)
  if (photo.sky) parts.push(photo.sky)
  if (photo.hasPeople) parts.push('people')
  if (photo.peopleCount > 0) parts.push(`${photo.peopleCount} people`)
  if (photo.docType) parts.push(photo.docType)
  if (photo.textContent?.length) parts.push(photo.textContent.join(', '))
  if (photo.language) parts.push(photo.language)

  return parts.filter(Boolean).join('. ')
}
