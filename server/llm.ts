import { buildSystemPrompt, buildUserPrompt } from './prompts.ts'
import { parseModelJson } from './parse.ts'
import type { LlmRequest } from '../src/lib/schemas.ts'
import {
  classifyResponseSchema,
  interpretTypedResponseSchema,
  nextQuestionResponseSchema,
} from '../src/lib/schemas.ts'

export type LlmProvider = 'gemini' | 'openai' | 'openai-compatible'

export type LlmCallMeta = {
  latencyMs: number
  usage?: { promptTokens?: number; completionTokens?: number; totalTokens?: number }
  raw: string
  provider?: LlmProvider
}

export type LlmCallResult<T> = {
  data: T
  meta: LlmCallMeta
}

const RETRY_DELAY_MS = 800
const RETRY_DELAY_MS_503 = 2000

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function resolveProvider(model: string): LlmProvider {
  const explicit = process.env.LLM_PROVIDER?.trim().toLowerCase()
  if (explicit === 'gemini' || explicit === 'google') return 'gemini'
  if (explicit === 'openai') return 'openai'
  if (
    explicit === 'groq' ||
    explicit === 'openai-compatible' ||
    explicit === 'compatible'
  ) {
    return 'openai-compatible'
  }
  if (model.toLowerCase().startsWith('gemini')) return 'gemini'
  if (model.toLowerCase().includes('qwen')) return 'openai-compatible'
  return 'openai'
}

function resolveOpenAiCompatibleBaseUrl(): string {
  const custom = process.env.LLM_BASE_URL?.trim()
  if (custom) return custom.replace(/\/$/, '')
  const explicit = process.env.LLM_PROVIDER?.trim().toLowerCase()
  if (explicit === 'groq') return 'https://api.groq.com/openai/v1'
  return 'https://api.openai.com/v1'
}

function getConfig(): {
  apiKey: string
  model: string
  provider: LlmProvider
  openAiBaseUrl: string
} | null {
  const apiKey = process.env.LLM_API_KEY?.trim()
  if (!apiKey) return null
  const model = process.env.LLM_MODEL?.trim() || 'gpt-4o-mini'
  const provider = resolveProvider(model)
  return {
    apiKey,
    model,
    provider,
    openAiBaseUrl:
      provider === 'openai-compatible'
        ? resolveOpenAiCompatibleBaseUrl()
        : 'https://api.openai.com/v1',
  }
}

async function callOpenAiOnce(
  req: LlmRequest,
  apiKey: string,
  model: string,
  baseUrl: string,
  signal?: AbortSignal,
): Promise<{ content: string; usage?: LlmCallMeta['usage'] }> {
  const body: Record<string, unknown> = {
    model,
    temperature: 0.2,
    response_format: { type: 'json_object' as const },
    messages: [
      { role: 'system' as const, content: buildSystemPrompt(req) },
      { role: 'user' as const, content: buildUserPrompt(req) },
    ],
  }
  if (baseUrl.includes('groq.com') && model.toLowerCase().includes('qwen')) {
    body.reasoning_effort = 'none'
  }

  const res = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    signal,
  })

  if (!res.ok) {
    const errText = await res.text().catch(() => '')
    const label = baseUrl.includes('groq.com') ? 'Groq' : 'OpenAI-compatible'
    const err = new Error(`${label} HTTP ${res.status}: ${errText.slice(0, 200)}`)
    ;(err as Error & { status?: number }).status = res.status
    throw err
  }

  const json = (await res.json()) as {
    choices?: Array<{ message?: { content?: string } }>
    usage?: { prompt_tokens?: number; completion_tokens?: number; total_tokens?: number }
  }

  const content = json.choices?.[0]?.message?.content
  if (!content) throw new Error('Empty OpenAI response')

  const usage = json.usage
    ? {
        promptTokens: json.usage.prompt_tokens,
        completionTokens: json.usage.completion_tokens,
        totalTokens: json.usage.total_tokens,
      }
    : undefined

  return { content, usage }
}

async function callGeminiOnce(
  req: LlmRequest,
  apiKey: string,
  model: string,
  signal?: AbortSignal,
): Promise<{ content: string; usage?: LlmCallMeta['usage'] }> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': apiKey,
    },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: buildSystemPrompt(req) }] },
      contents: [{ role: 'user', parts: [{ text: buildUserPrompt(req) }] }],
      generationConfig: {
        temperature: 0.2,
        responseMimeType: 'application/json',
      },
    }),
    signal,
  })

  if (!res.ok) {
    const errText = await res.text().catch(() => '')
    const err = new Error(`Gemini HTTP ${res.status}: ${errText.slice(0, 200)}`)
    ;(err as Error & { status?: number }).status = res.status
    throw err
  }

  const json = (await res.json()) as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>
    usageMetadata?: {
      promptTokenCount?: number
      candidatesTokenCount?: number
      totalTokenCount?: number
    }
  }

  const content = json.candidates?.[0]?.content?.parts?.map((p) => p.text ?? '').join('').trim()
  if (!content) throw new Error('Empty Gemini response')

  const usageMeta = json.usageMetadata
  const usage = usageMeta
    ? {
        promptTokens: usageMeta.promptTokenCount,
        completionTokens: usageMeta.candidatesTokenCount,
        totalTokens: usageMeta.totalTokenCount,
      }
    : undefined

  return { content, usage }
}

async function callProviderOnce(
  req: LlmRequest,
  apiKey: string,
  model: string,
  provider: LlmProvider,
  openAiBaseUrl: string,
  signal?: AbortSignal,
): Promise<{ content: string; usage?: LlmCallMeta['usage'] }> {
  if (provider === 'gemini') return callGeminiOnce(req, apiKey, model, signal)
  return callOpenAiOnce(req, apiKey, model, openAiBaseUrl, signal)
}

function shouldRetry(err: unknown): boolean {
  if (err instanceof SyntaxError) return true
  if (err instanceof Error && err.message.includes('JSON')) return true
  const status = (err as Error & { status?: number }).status
  if (status === 429 || (status !== undefined && status >= 500)) return true
  return false
}

export async function runLlmCall<T>(
  req: LlmRequest,
  validate: (data: unknown) => T,
  signal?: AbortSignal,
): Promise<LlmCallResult<T>> {
  const config = getConfig()
  if (!config) throw new Error('LLM_API_KEY not configured')

  const started = Date.now()
  let lastRaw = ''
  let lastUsage: LlmCallMeta['usage']

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const { content, usage } = await callProviderOnce(
        req,
        config.apiKey,
        config.model,
        config.provider,
        config.openAiBaseUrl,
        signal,
      )
      lastRaw = content
      lastUsage = usage
      const data = parseModelJson(content, (raw) => validate(raw))
      return {
        data,
        meta: {
          latencyMs: Date.now() - started,
          usage: lastUsage,
          raw: lastRaw,
          provider: config.provider,
        },
      }
    } catch (err) {
      if (attempt === 0 && shouldRetry(err)) {
        const status = (err as Error & { status?: number }).status
        await sleep(status === 503 ? RETRY_DELAY_MS_503 : RETRY_DELAY_MS)
        continue
      }
      if (lastRaw) {
        const wrapped = err instanceof Error ? err : new Error(String(err))
        ;(wrapped as Error & { raw?: string }).raw = lastRaw
        throw wrapped
      }
      throw err
    }
  }

  const failed = new Error('LLM call failed after retry')
  if (lastRaw) (failed as Error & { raw?: string }).raw = lastRaw
  throw failed
}

export function getLlmServerStatus(): {
  configured: boolean
  provider?: LlmProvider
  model?: string
} {
  const config = getConfig()
  if (!config) return { configured: false }
  return { configured: true, provider: config.provider, model: config.model }
}

export async function handleLlmRequest(
  req: LlmRequest,
  signal?: AbortSignal,
): Promise<LlmCallResult<unknown>> {
  switch (req.type) {
    case 'classify':
      return runLlmCall(req, (raw) => classifyResponseSchema.parse(raw), signal)
    case 'nextQuestion':
      return runLlmCall(req, (raw) => nextQuestionResponseSchema.parse(raw), signal)
    case 'interpretTyped':
      return runLlmCall(req, (raw) => interpretTypedResponseSchema.parse(raw), signal)
  }
}
