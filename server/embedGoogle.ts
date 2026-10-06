import { copyNormalized } from '../src/lib/embeddingsMath.ts'
import type { GoogleEmbedConfig } from './embedConfig.ts'

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function googleFetch(url: string, init: RequestInit, retries = 5): Promise<Response> {
  let lastErr: unknown
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const controller = new AbortController()
      const timer = setTimeout(() => controller.abort(), 120_000)
      const res = await fetch(url, { ...init, signal: controller.signal })
      clearTimeout(timer)
      return res
    } catch (err) {
      lastErr = err
      if (attempt < retries - 1) await sleep(5000 * (attempt + 1))
    }
  }
  throw lastErr
}

function modelResource(model: string): string {
  return model.startsWith('models/') ? model : `models/${model}`
}

function isEmbedding2(model: string): boolean {
  return model.includes('embedding-2')
}

export function formatGoogleDocument(text: string, model: string): string {
  if (isEmbedding2(model)) return `title: none | text: ${text}`
  return text
}

export function formatGoogleQuery(query: string, model: string): string {
  if (isEmbedding2(model)) return `task: search result | query: ${query}`
  return query
}

type EmbedContentResponse = {
  embedding?: { values?: number[] }
  error?: { message?: string }
}

type BatchEmbedResponse = {
  embeddings?: Array<{ values?: number[] }>
  error?: { message?: string }
}

async function embedOneGoogle(
  cfg: GoogleEmbedConfig,
  text: string,
  taskType: 'RETRIEVAL_DOCUMENT' | 'RETRIEVAL_QUERY',
): Promise<number[]> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(cfg.model)}:embedContent`
  const body: Record<string, unknown> = {
    model: modelResource(cfg.model),
    content: { parts: [{ text }] },
    outputDimensionality: cfg.outputDimensionality,
  }
  if (!isEmbedding2(cfg.model)) {
    body.taskType = taskType
  }

  const res = await googleFetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': cfg.apiKey,
    },
    body: JSON.stringify(body),
  })

  const json = (await res.json()) as EmbedContentResponse
  if (!res.ok) {
    throw new Error(json.error?.message ?? `Gemini embed HTTP ${res.status}`)
  }
  const values = json.embedding?.values
  if (!values?.length) throw new Error('Empty Gemini embedding')
  return copyNormalized(values)
}

/** Free tier: each text counts toward RPM — keep batches small and pause. */
export async function embedTextsGoogle(
  cfg: GoogleEmbedConfig,
  texts: string[],
  options?: { taskType?: 'RETRIEVAL_DOCUMENT' | 'RETRIEVAL_QUERY'; batchSize?: number; pauseMs?: number },
): Promise<number[][]> {
  if (texts.length === 0) return []

  const taskType = options?.taskType ?? 'RETRIEVAL_DOCUMENT'
  const batchSize = options?.batchSize ?? 16
  const pauseMs = options?.pauseMs ?? 12_000

  const formatted = texts.map((t) =>
    taskType === 'RETRIEVAL_QUERY' ? formatGoogleQuery(t, cfg.model) : formatGoogleDocument(t, cfg.model),
  )

  const out: number[][] = []

  for (let i = 0; i < formatted.length; i += batchSize) {
    const batch = formatted.slice(i, i + batchSize)
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(cfg.model)}:batchEmbedContents`

    const requests = batch.map((text) => {
      const req: Record<string, unknown> = {
        model: modelResource(cfg.model),
        content: { parts: [{ text }] },
        outputDimensionality: cfg.outputDimensionality,
      }
      if (!isEmbedding2(cfg.model)) {
        req.taskType = taskType
      }
      return req
    })

    const res = await googleFetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': cfg.apiKey,
      },
      body: JSON.stringify({ requests }),
    })

    const json = (await res.json()) as BatchEmbedResponse
    if (!res.ok) {
      throw new Error(json.error?.message ?? `Gemini batch embed HTTP ${res.status}`)
    }

    const rows = json.embeddings ?? []
    if (rows.length !== batch.length) {
      throw new Error(`Gemini batch size mismatch: expected ${batch.length}, got ${rows.length}`)
    }

    for (const row of rows) {
      const values = row.values
      if (!values?.length) throw new Error('Empty Gemini batch embedding')
      out.push(copyNormalized(values))
    }

    const done = Math.min(i + batchSize, formatted.length)
    if (process.stdout.isTTY) {
      process.stdout.write(`\r  Google embed: ${done} / ${formatted.length}`)
    }
    if (i + batchSize < formatted.length) {
      await sleep(pauseMs)
    }
  }
  if (process.stdout.isTTY && formatted.length > 0) process.stdout.write('\n')

  return out
}

export async function embedQueryGoogle(cfg: GoogleEmbedConfig, query: string): Promise<number[]> {
  const text = formatGoogleQuery(query, cfg.model)
  return embedOneGoogle(cfg, text, 'RETRIEVAL_QUERY')
}
