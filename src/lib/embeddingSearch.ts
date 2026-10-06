import type { Photo } from '@/data/photos'
import {
  EMBED_MIN_SCORE,
  EMBED_POOL_CAP,
  EMBED_QUERY_TIMEOUT_MS,
  EMBED_TOP_K,
} from '@/config'
import type { EmbeddingIndex } from '@/lib/embeddingIndex'
import { parseEmbeddingIndex } from '@/lib/embeddingIndex'
import { cosineSimilarity, copyNormalized } from '@/lib/embeddingsMath'
import { semanticBaseline } from '@/lib/semanticBaseline'

let cachedIndex: EmbeddingIndex | null | undefined
let indexLoadPromise: Promise<EmbeddingIndex | null> | null = null

export function resetEmbeddingIndexCache(): void {
  cachedIndex = undefined
  indexLoadPromise = null
}

async function fetchEmbeddingIndex(): Promise<EmbeddingIndex | null> {
  try {
    const res = await fetch('/photo-embeddings.json', { cache: 'force-cache' })
    if (!res.ok) return null
    const raw: unknown = await res.json()
    return parseEmbeddingIndex(raw)
  } catch {
    return null
  }
}

/** Load prebuilt vectors from public/photo-embeddings.json (once per session). */
export async function loadEmbeddingIndex(): Promise<EmbeddingIndex | null> {
  if (cachedIndex !== undefined) return cachedIndex
  if (!indexLoadPromise) indexLoadPromise = fetchEmbeddingIndex()
  cachedIndex = await indexLoadPromise
  return cachedIndex
}

async function embedQueryVector(query: string): Promise<number[] | null> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), EMBED_QUERY_TIMEOUT_MS)
  try {
    const res = await fetch('/api/embed', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
      signal: controller.signal,
    })
    const body = (await res.json()) as { ok?: boolean; vector?: number[]; error?: string }
    if (!res.ok || !body.ok || !body.vector?.length) return null
    return copyNormalized(body.vector)
  } catch {
    return null
  } finally {
    clearTimeout(timer)
  }
}

export type EmbeddingRankResult = {
  photo: Photo
  score: number
}

export function rankPhotosByVector(
  queryVector: number[],
  index: EmbeddingIndex,
  library: Photo[],
  topK = EMBED_TOP_K,
  minScore = EMBED_MIN_SCORE,
): EmbeddingRankResult[] {
  if (index.photoIds.length !== index.vectors.length) return []

  const byId = new Map(library.map((p) => [p.id, p]))
  const scored: EmbeddingRankResult[] = []

  for (let i = 0; i < index.photoIds.length; i++) {
    const id = index.photoIds[i]!
    const photo = byId.get(id)
    const vec = index.vectors[i]
    if (!photo || !vec?.length) continue
    const score = cosineSimilarity(queryVector, vec)
    if (score >= minScore) scored.push({ photo, score })
  }

  scored.sort((a, b) => b.score - a.score)
  return scored.slice(0, topK)
}

function unionPhotos(primary: Photo[], extra: Photo[]): Photo[] {
  const seen = new Set<string>()
  const out: Photo[] = []
  for (const p of [...primary, ...extra]) {
    if (seen.has(p.id)) continue
    seen.add(p.id)
    out.push(p)
  }
  return out
}

export type SearchPoolResult = {
  pool: Photo[]
  usedEmbeddings: boolean
  embeddingCount: number
}

/**
 * Initial candidate pool: embedding top-K (when index + API work) union substring baseline.
 * baselineCount for the UI chip stays semanticBaseline-only (see flowStore).
 */
export async function resolveSearchPool(query: string, library: Photo[]): Promise<SearchPoolResult> {
  const tagPool = semanticBaseline(query, library)
  const index = await loadEmbeddingIndex()
  if (!index) {
    return { pool: tagPool, usedEmbeddings: false, embeddingCount: 0 }
  }

  const queryVector = await embedQueryVector(query)
  if (!queryVector) {
    return { pool: tagPool, usedEmbeddings: false, embeddingCount: 0 }
  }

  if (queryVector.length !== index.dimensions) {
    return { pool: tagPool, usedEmbeddings: false, embeddingCount: 0 }
  }

  const ranked = rankPhotosByVector(queryVector, index, library)
  let embedPool = ranked.map((r) => r.photo)

  if (embedPool.length === 0 && tagPool.length === 0) {
    const relaxed = rankPhotosByVector(queryVector, index, library, EMBED_TOP_K, 0)
    embedPool = relaxed.map((r) => r.photo)
  }

  const pool = unionPhotos(embedPool, tagPool).slice(0, EMBED_POOL_CAP)
  return {
    pool: pool.length > 0 ? pool : tagPool,
    usedEmbeddings: embedPool.length > 0,
    embeddingCount: embedPool.length,
  }
}
