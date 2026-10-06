import { extractJsonObject } from './parse.ts'
import {
  GEMINI_VISION_FALLBACKS,
  getGeminiVisionConfig,
  getOllamaVisionConfig,
  resolveVisionProvider,
} from './visionConfig.ts'
import { photoVisionEntrySchema, type PhotoVisionEntry } from '../src/lib/photoVision.ts'

const SYSTEM = `You describe photos for search retrieval. Return JSON only.

Output shape:
{"searchTags": string[], "caption": string}

Rules:
- searchTags: 5–20 short lowercase nouns/adjectives visible in the image (objects, scene, colors, activities). No people names. No guessed GPS or dates.
- caption: one neutral English sentence describing the photo.
- Do not invent text that is not visible.
- Omit brand names unless clearly visible.`

function normalizeEntry(raw: PhotoVisionEntry): PhotoVisionEntry {
  const seen = new Set<string>()
  const searchTags: string[] = []
  for (const tag of raw.searchTags) {
    const t = tag.trim().toLowerCase()
    if (!t || t.length > 48) continue
    if (seen.has(t)) continue
    seen.add(t)
    searchTags.push(t)
    if (searchTags.length >= 24) break
  }
  const caption = raw.caption?.trim().slice(0, 280)
  return { searchTags, caption: caption || undefined }
}

function parseVisionJsonLoose(text: string): PhotoVisionEntry {
  const trimmed = text.trim()
  try {
    const json = extractJsonObject(trimmed)
    const parsed = photoVisionEntrySchema.parse(JSON.parse(json))
    return normalizeEntry(parsed)
  } catch {
    try {
      const parsed = photoVisionEntrySchema.parse(JSON.parse(trimmed))
      return normalizeEntry(parsed)
    } catch {
      const stripped = trimmed.replace(/```(?:json)?/gi, '').trim()
      const caption = stripped.slice(0, 280)
      const words = caption.toLowerCase().match(/[a-z][a-z0-9-]{2,23}/g) ?? []
      const searchTags = [...new Set(words)].filter((w) => w.length >= 3).slice(0, 18)
      if (searchTags.length === 0) throw new Error('Could not parse vision model output')
      return normalizeEntry({ searchTags, caption: caption || undefined })
    }
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function describeWithGemini(
  apiKey: string,
  model: string,
  mimeType: string,
  base64: string,
  signal?: AbortSignal,
): Promise<PhotoVisionEntry> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': apiKey,
    },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: SYSTEM }] },
      contents: [
        {
          role: 'user',
          parts: [
            { text: 'Describe this photo for search indexing.' },
            { inlineData: { mimeType, data: base64 } },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.2,
        responseMimeType: 'application/json',
      },
    }),
    signal,
  })

  if (!res.ok) {
    const errText = await res.text().catch(() => '')
    const err = new Error(`Gemini vision HTTP ${res.status}: ${errText.slice(0, 200)}`)
    ;(err as Error & { status?: number }).status = res.status
    throw err
  }

  const json = (await res.json()) as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>
  }
  const content = json.candidates?.[0]?.content?.parts?.map((p) => p.text ?? '').join('').trim()
  if (!content) throw new Error('Empty Gemini vision response')
  return parseVisionJsonLoose(content)
}

async function describeWithOllama(
  baseUrl: string,
  model: string,
  base64: string,
  signal?: AbortSignal,
): Promise<PhotoVisionEntry> {
  const res = await fetch(`${baseUrl}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model,
      stream: false,
      options: { num_predict: 512, temperature: 0.2 },
      messages: [
        { role: 'system', content: SYSTEM },
        {
          role: 'user',
          content: 'Describe this photo for search indexing.',
          images: [base64],
        },
      ],
    }),
    signal,
  })

  if (!res.ok) {
    const errText = await res.text().catch(() => '')
    throw new Error(`Ollama vision HTTP ${res.status}: ${errText.slice(0, 200)}`)
  }

  const json = (await res.json()) as { message?: { content?: string } }
  const content = json.message?.content?.trim()
  if (!content) throw new Error('Empty Ollama vision response')
  return parseVisionJsonLoose(content)
}

export type DescribePhotoOptions = {
  pauseMs?: number
  maxRetries?: number
  signal?: AbortSignal
}

/** Vision tag one image (Gemini or Ollama). Does not touch library metadata. */
export async function describePhotoFile(
  imageBytes: Buffer,
  mimeType: string,
  options?: DescribePhotoOptions,
): Promise<PhotoVisionEntry> {
  const base64 = imageBytes.toString('base64')
  const provider = resolveVisionProvider()
  const maxRetries = options?.maxRetries ?? 8
  let lastErr: unknown

  const perRequestMs = 120_000

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      if (provider === 'gemini') {
        const cfg = getGeminiVisionConfig()
        if (!cfg) throw new Error('GEMINI_API_KEY not configured for vision')
        const models = [
          cfg.model,
          ...GEMINI_VISION_FALLBACKS.filter((m) => m !== cfg.model),
        ]
        let lastGeminiErr: unknown
        for (const model of models) {
          const controller = new AbortController()
          const timer = setTimeout(() => controller.abort(), perRequestMs)
          const onAbort = () => controller.abort()
          options?.signal?.addEventListener('abort', onAbort)
          try {
            return await describeWithGemini(cfg.apiKey, model, mimeType, base64, controller.signal)
          } catch (err) {
            lastGeminiErr = err
            const status = (err as Error & { status?: number }).status
            if (status === 404 || status === 503) continue
            throw err
          } finally {
            clearTimeout(timer)
            options?.signal?.removeEventListener('abort', onAbort)
          }
        }
        throw lastGeminiErr
      }
      const cfg = getOllamaVisionConfig()
      const controller = new AbortController()
      const timer = setTimeout(() => controller.abort(), perRequestMs)
      try {
        return await describeWithOllama(cfg.baseUrl, cfg.model, base64, controller.signal)
      } finally {
        clearTimeout(timer)
      }
    } catch (err) {
      lastErr = err
      if (attempt >= maxRetries - 1) break
      const status = (err as Error & { status?: number }).status
      if (status === 429) {
        await sleep(60_000 * (attempt + 1))
        continue
      }
      if (status === 503 || (status !== undefined && status >= 500)) {
        await sleep(2000 * (attempt + 1) ** 2)
        continue
      }
      await sleep(5000 * (attempt + 1))
    }
  }
  throw lastErr
}

export function visionPauseMs(): number {
  const raw = process.env.VISION_PAUSE_MS?.trim()
  const n = raw ? Number(raw) : NaN
  if (Number.isFinite(n) && n >= 0) return n
  return resolveVisionProvider() === 'gemini' ? 4000 : 500
}
