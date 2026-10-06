import { copyNormalized } from '../src/lib/embeddingsMath.ts'
import type { GroqEmbedConfig } from './embedConfig.ts'

type GroqEmbeddingResponse = {
  data?: Array<{ embedding: number[]; index: number }>
  error?: { message?: string }
}

export async function embedTextsGroq(cfg: GroqEmbedConfig, texts: string[]): Promise<number[][]> {
  if (texts.length === 0) return []

  const res = await fetch(`${cfg.baseUrl}/embeddings`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${cfg.apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: cfg.model,
      input: texts,
      encoding_format: 'float',
    }),
  })

  const body = (await res.json()) as GroqEmbeddingResponse
  if (!res.ok) {
    const msg = body.error?.message ?? `Embedding HTTP ${res.status}`
    throw new Error(msg)
  }

  const rows = body.data ?? []
  if (rows.length !== texts.length) {
    throw new Error(`Embedding count mismatch: expected ${texts.length}, got ${rows.length}`)
  }

  const sorted = [...rows].sort((a, b) => a.index - b.index)
  return sorted.map((row) => copyNormalized(row.embedding))
}
