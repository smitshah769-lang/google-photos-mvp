export type EmbedProvider = 'groq' | 'google'

const DEFAULT_GOOGLE_MODEL = 'gemini-embedding-001'
const DEFAULT_GROQ_MODEL = 'nomic-embed-text-v1_5'

export function resolveEmbedProvider(): EmbedProvider {
  const explicit = process.env.EMBED_PROVIDER?.trim().toLowerCase()
  if (explicit === 'groq') return 'groq'
  if (explicit === 'google' || explicit === 'gemini') return 'google'
  if (googleEmbedApiKey()) return 'google'
  return 'groq'
}

/** Server-only Google AI Studio / Gemini API key for embeddings (never VITE_*). */
export function googleEmbedApiKey(): string | null {
  const key = process.env.GEMINI_API_KEY?.trim() || process.env.GOOGLE_API_KEY?.trim()
  return key || null
}

export type GoogleEmbedConfig = {
  apiKey: string
  model: string
  outputDimensionality: number
}

export type GroqEmbedConfig = {
  apiKey: string
  model: string
  baseUrl: string
}

export function getGoogleEmbedConfig(): GoogleEmbedConfig | null {
  const apiKey = googleEmbedApiKey()
  if (!apiKey) return null
  const model = process.env.EMBED_MODEL?.trim() || DEFAULT_GOOGLE_MODEL
  const dimRaw = process.env.EMBED_DIMENSION?.trim()
  const outputDimensionality = dimRaw ? Number(dimRaw) : 768
  if (!Number.isFinite(outputDimensionality) || outputDimensionality < 128) {
    return { apiKey, model, outputDimensionality: 768 }
  }
  return { apiKey, model, outputDimensionality }
}

export function getGroqEmbedConfig(): GroqEmbedConfig | null {
  const apiKey = process.env.LLM_API_KEY?.trim()
  if (!apiKey) return null
  const model = process.env.EMBED_MODEL?.trim() || DEFAULT_GROQ_MODEL
  const custom = process.env.LLM_BASE_URL?.trim()
  const baseUrl = custom ? custom.replace(/\/$/, '') : 'https://api.groq.com/openai/v1'
  return { apiKey, model, baseUrl }
}

export function isEmbedConfigured(): boolean {
  const provider = resolveEmbedProvider()
  if (provider === 'google') return getGoogleEmbedConfig() !== null
  return getGroqEmbedConfig() !== null
}

export function getEmbedServerStatus(): {
  provider: EmbedProvider
  configured: boolean
  model: string | null
  outputDimensionality: number | null
} {
  const provider = resolveEmbedProvider()
  if (provider === 'google') {
    const cfg = getGoogleEmbedConfig()
    if (!cfg) {
      return { provider, configured: false, model: null, outputDimensionality: null }
    }
    return {
      provider,
      configured: true,
      model: cfg.model,
      outputDimensionality: cfg.outputDimensionality,
    }
  }
  const cfg = getGroqEmbedConfig()
  if (!cfg) {
    return { provider, configured: false, model: null, outputDimensionality: null }
  }
  return { provider, configured: true, model: cfg.model, outputDimensionality: null }
}
