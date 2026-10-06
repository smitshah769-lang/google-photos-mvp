import { z } from 'zod'

export const embeddingIndexSchema = z.object({
  version: z.literal(1),
  model: z.string(),
  dimensions: z.number().int().positive(),
  libraryIdHash: z.string(),
  photoIds: z.array(z.string()),
  vectors: z.array(z.array(z.number())),
})

export type EmbeddingIndex = z.infer<typeof embeddingIndexSchema>

export function parseEmbeddingIndex(raw: unknown): EmbeddingIndex | null {
  const parsed = embeddingIndexSchema.safeParse(raw)
  return parsed.success ? parsed.data : null
}

/** Stable id for cache invalidation when photos.ts changes. */
export function libraryIdHash(photoIds: string[]): string {
  let h = 2166136261
  for (const id of photoIds) {
    for (let i = 0; i < id.length; i++) {
      h ^= id.charCodeAt(i)
      h = Math.imul(h, 16777619)
    }
    h ^= 124
    h = Math.imul(h, 16777619)
  }
  return (h >>> 0).toString(16)
}
