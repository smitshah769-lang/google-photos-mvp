import {
  getGoogleEmbedConfig,
  getGroqEmbedConfig,
  resolveEmbedProvider,
} from './embedConfig.ts'
import { embedQueryGoogle, embedTextsGoogle } from './embedGoogle.ts'
import { embedTextsGroq } from './embedGroq.ts'

export async function embedTextsUnified(texts: string[]): Promise<{ vectors: number[][]; model: string }> {
  const provider = resolveEmbedProvider()
  if (provider === 'google') {
    const cfg = getGoogleEmbedConfig()
    if (!cfg) throw new Error('GEMINI_API_KEY is not configured')
    const vectors = await embedTextsGoogle(cfg, texts, { taskType: 'RETRIEVAL_DOCUMENT' })
    return { vectors, model: cfg.model }
  }

  const cfg = getGroqEmbedConfig()
  if (!cfg) throw new Error('LLM_API_KEY is not configured')
  const vectors = await embedTextsGroq(cfg, texts)
  return { vectors, model: cfg.model }
}

export async function embedQuery(query: string): Promise<number[]> {
  const trimmed = query.trim()
  if (!trimmed) throw new Error('Query is empty')

  const provider = resolveEmbedProvider()
  if (provider === 'google') {
    const cfg = getGoogleEmbedConfig()
    if (!cfg) throw new Error('GEMINI_API_KEY is not configured')
    return embedQueryGoogle(cfg, trimmed)
  }

  const { vectors } = await embedTextsUnified([trimmed])
  const vector = vectors[0]
  if (!vector) throw new Error('Empty embedding response')
  return vector
}
