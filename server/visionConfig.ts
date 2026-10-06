import { googleEmbedApiKey } from './embedConfig.ts'

export type VisionProvider = 'gemini' | 'ollama'

const DEFAULT_GEMINI_VISION = 'gemini-2.5-flash'
/** If VISION_MODEL fails (503/404), try these in order. */
export const GEMINI_VISION_FALLBACKS = ['gemini-2.5-flash', 'gemini-3.8-flash'] as const
const DEFAULT_OLLAMA_VISION = 'moondream'

export function resolveVisionProvider(): VisionProvider {
  const explicit = process.env.VISION_PROVIDER?.trim().toLowerCase()
  if (explicit === 'ollama') return 'ollama'
  if (explicit === 'gemini' || explicit === 'google') return 'gemini'
  if (googleEmbedApiKey()) return 'gemini'
  return 'ollama'
}

export function getGeminiVisionConfig(): { apiKey: string; model: string } | null {
  const apiKey = googleEmbedApiKey()
  if (!apiKey) return null
  const model = process.env.VISION_MODEL?.trim() || DEFAULT_GEMINI_VISION
  return { apiKey, model }
}

export function getOllamaVisionConfig(): { baseUrl: string; model: string } {
  const baseUrl = (process.env.OLLAMA_HOST?.trim() || 'http://127.0.0.1:11434').replace(/\/$/, '')
  const model = process.env.VISION_MODEL?.trim() || DEFAULT_OLLAMA_VISION
  return { baseUrl, model }
}

export function isVisionConfigured(): boolean {
  const provider = resolveVisionProvider()
  if (provider === 'gemini') return getGeminiVisionConfig() !== null
  return true
}
