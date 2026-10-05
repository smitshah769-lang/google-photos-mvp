import type { Photo } from '@/data/photos'
import type { Attr } from '@/lib/attributes'

const ACTIVITY_OBJECT_MAP: Array<{ needle: string; activity: string }> = [
  { needle: 'trek', activity: 'trek' },
  { needle: 'hike', activity: 'trek' },
  { needle: 'boat', activity: 'boating' },
  { needle: 'harbour', activity: 'boating' },
  { needle: 'harbor', activity: 'boating' },
  { needle: 'tent', activity: 'camping' },
  { needle: 'camp', activity: 'camping' },
]

function peopleCountBucket(count: number): string | null {
  if (count <= 0) return null
  if (count === 1) return '1'
  if (count === 2) return '2'
  if (count <= 5) return '3-5'
  return '6+'
}

function deriveActivity(photo: Photo): string | null {
  const hay = [...photo.objects, ...photo.animals, photo.alt].join(' ').toLowerCase()
  for (const { needle, activity } of ACTIVITY_OBJECT_MAP) {
    if (hay.includes(needle)) return activity
  }
  return null
}

function deriveLayout(photo: Photo): string | null {
  if (photo.kind !== 'document') return null
  if (photo.docType === 'note') return 'handwritten'
  if (
    photo.docType === 'receipt' ||
    photo.docType === 'ticket' ||
    photo.docType === 'slides' ||
    photo.docType === 'id'
  ) {
    return 'printed'
  }
  if (photo.docType === 'screenshot') return 'printed'
  return null
}

function normalizePhotoType(value: string): string {
  const v = value.toLowerCase()
  if (v === 'group photo' || v === 'group') return 'group'
  if (v === 'selfie') return 'selfie'
  if (v === 'portrait') return 'portrait'
  if (v === 'candid') return 'candid'
  if (v === 'mid-action' || v === 'action') return 'action'
  return v
}

/** Raw value for stats / filtering. `null` = unknown (E-11.1). */
export function getPhotoAttributeValue(photo: Photo, attr: Attr): string | null {
  switch (attr) {
    case 'timeline':
      return null
    case 'location':
      return photo.location || null
    case 'object': {
      if (photo.objects.length === 0) return null
      return photo.objects[0] ?? null
    }
    case 'photoType':
      return photo.photoType ?? null
    case 'docType':
      return photo.docType ?? null
    case 'peopleCount': {
      if (photo.animals.length > 0 && !photo.hasPeople) return null
      if (!photo.hasPeople && photo.peopleCount === 0) return null
      return peopleCountBucket(photo.peopleCount)
    }
    case 'pose':
      return photo.pose ?? null
    case 'timeOfDay':
      return photo.timeOfDay ?? null
    case 'sky':
      return photo.sky ?? null
    case 'clothingColor':
    case 'dominantColor':
    case 'pageColor':
      return photo.colors[0] ?? null
    case 'background':
      return photo.setting
    case 'activity':
      return deriveActivity(photo)
    case 'language':
      return photo.language ?? null
    case 'textContent':
      return photo.textContent?.[0] ?? null
    case 'layout':
      return deriveLayout(photo)
    default:
      return null
  }
}

/** All distinct values for multi-valued fields (object tags, colors, textContent). */
export function getPhotoAttributeValues(photo: Photo, attr: Attr): string[] {
  switch (attr) {
    case 'object':
      return photo.objects.map((o) => o.toLowerCase())
    case 'clothingColor':
    case 'dominantColor':
    case 'pageColor':
      return photo.colors.map((c) => c.toLowerCase())
    case 'textContent':
      return (photo.textContent ?? []).map((t) => t.toLowerCase())
    default: {
      const single = getPhotoAttributeValue(photo, attr)
      return single ? [single.toLowerCase()] : []
    }
  }
}

export function profileValueMatchesPhoto(
  photo: Photo,
  attr: Attr,
  profileValue: string,
): boolean {
  const want = profileValue.toLowerCase()

  if (attr === 'photoType') {
    const pt = photo.photoType
    if (!pt) return false
    return normalizePhotoType(pt) === normalizePhotoType(want)
  }

  if (attr === 'object') {
    return photo.objects.some((o) => o.toLowerCase() === want)
  }

  if (attr === 'peopleCount' || attr === 'pose' || attr === 'timeOfDay' || attr === 'sky') {
    const v = getPhotoAttributeValue(photo, attr)
    if (v === null) return false
    return v.toLowerCase() === want
  }

  if (attr === 'clothingColor' || attr === 'dominantColor' || attr === 'pageColor') {
    return photo.colors.some((c) => c.toLowerCase() === want)
  }

  if (attr === 'textContent') {
    return (photo.textContent ?? []).some((t) => t.toLowerCase() === want)
  }

  const v = getPhotoAttributeValue(photo, attr)
  if (v === null) return false
  return v.toLowerCase() === want
}

export function normalizeProfileValue(attr: Attr, value: string): string {
  if (attr === 'photoType') return normalizePhotoType(value)
  if (attr === 'pose' && (value === 'Mid-action' || value === 'mid-action')) return 'action'
  return value
}
