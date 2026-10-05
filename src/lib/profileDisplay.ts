import type { Attr } from '@/lib/attributes'
import { timelineOptionLabel } from '@/data/questions'

const DOC_TYPE_LABELS: Record<string, string> = {
  receipt: 'Receipt',
  id: 'ID / Card',
  ticket: 'Ticket',
  note: 'Handwritten note',
  screenshot: 'Screenshot',
  slides: 'Slides / Whiteboard',
}

const PHOTO_TYPE_LABELS: Record<string, string> = {
  selfie: 'Selfie',
  portrait: 'Portrait',
  group: 'Group photo',
  candid: 'Candid',
  action: 'Mid-action',
}

function titleCase(value: string): string {
  if (!value) return value
  return value.charAt(0).toUpperCase() + value.slice(1)
}

/** Human-readable chip label for profile / option values. */
export function formatProfileValue(attr: Attr, value: string): string {
  if (attr === 'timeline') return timelineOptionLabel(value)
  if (attr === 'docType') return DOC_TYPE_LABELS[value.toLowerCase()] ?? titleCase(value)
  if (attr === 'photoType') return PHOTO_TYPE_LABELS[value.toLowerCase()] ?? titleCase(value)
  return titleCase(value)
}

export function formatOptionLabel(attr: Attr, value: string): string {
  if (value === 'Somewhere else') return value
  return formatProfileValue(attr, value)
}
