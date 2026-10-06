import { z } from 'zod'

/** Search-only enrichment from offline vision (does not replace photos.ts fields). */
export const photoVisionEntrySchema = z.object({
  searchTags: z.array(z.string()).default([]),
  caption: z.string().optional(),
})

export type PhotoVisionEntry = z.infer<typeof photoVisionEntrySchema>

export const photoVisionSidecarSchema = z.object({
  version: z.literal(1),
  model: z.string(),
  generatedAt: z.string(),
  entries: z.record(z.string(), photoVisionEntrySchema),
})

export type PhotoVisionSidecar = z.infer<typeof photoVisionSidecarSchema>

let cachedSidecar: PhotoVisionSidecar | null | undefined
let loadPromise: Promise<PhotoVisionSidecar | null> | null = null

export function resetPhotoVisionCache(): void {
  cachedSidecar = undefined
  loadPromise = null
}

export function setPhotoVisionSidecar(sidecar: PhotoVisionSidecar | null): void {
  cachedSidecar = sidecar
  loadPromise = null
}

export function parsePhotoVisionSidecar(raw: unknown): PhotoVisionSidecar | null {
  const parsed = photoVisionSidecarSchema.safeParse(raw)
  return parsed.success ? parsed.data : null
}

/** Browser: load public/photo-vision.json once per session. */
export async function loadPhotoVisionSidecar(): Promise<PhotoVisionSidecar | null> {
  if (cachedSidecar !== undefined) return cachedSidecar
  if (!loadPromise) {
    loadPromise = (async () => {
      try {
        const res = await fetch('/photo-vision.json', { cache: 'force-cache' })
        if (!res.ok) return null
        const raw: unknown = await res.json()
        return parsePhotoVisionSidecar(raw)
      } catch {
        return null
      }
    })()
  }
  cachedSidecar = await loadPromise
  return cachedSidecar
}

export function getPhotoVisionEntry(photoId: string): PhotoVisionEntry | undefined {
  return cachedSidecar?.entries[photoId]
}

/** Terms used for baseline / keyword search (search layer only). */
export function visionSearchTerms(photoId: string): string[] {
  const entry = getPhotoVisionEntry(photoId)
  if (!entry) return []
  const out: string[] = []
  if (entry.caption?.trim()) out.push(entry.caption.trim())
  for (const tag of entry.searchTags) {
    const t = tag.trim()
    if (t) out.push(t)
  }
  return out
}

/** Stable suffix for embedding cache when vision sidecar changes. */
export function photoVisionSidecarHash(sidecar: PhotoVisionSidecar | null): string {
  if (!sidecar || Object.keys(sidecar.entries).length === 0) return 'none'
  const ids = Object.keys(sidecar.entries).sort()
  let h = 2166136261
  for (const id of ids) {
    const entry = sidecar.entries[id]!
    const blob = `${id}:${entry.searchTags.join('|')}:${entry.caption ?? ''}`
    for (let i = 0; i < blob.length; i++) {
      h ^= blob.charCodeAt(i)
      h = Math.imul(h, 16777619)
    }
  }
  return (h >>> 0).toString(16)
}
