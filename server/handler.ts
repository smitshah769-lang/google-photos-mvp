import type { IncomingMessage, ServerResponse } from 'node:http'
import { llmRequestSchema } from '../src/lib/schemas.ts'
import { getLlmServerStatus, handleLlmRequest } from './llm.ts'

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    req.on('data', (c) => chunks.push(Buffer.from(c)))
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
    req.on('error', reject)
  })
}

export function handleGetLlmStatus(_req: IncomingMessage, res: ServerResponse): void {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(getLlmServerStatus()))
}

export async function handlePostLlm(req: IncomingMessage, res: ServerResponse): Promise<void> {
  if (req.method !== 'POST') {
    res.statusCode = 405
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ error: 'Method not allowed' }))
    return
  }

  try {
    const bodyText = await readBody(req)
    const body: unknown = bodyText ? JSON.parse(bodyText) : {}
    const parsed = llmRequestSchema.parse(body)
    const result = await handleLlmRequest(parsed)
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(
      JSON.stringify({
        ok: true,
        data: result.data,
        meta: result.meta,
      }),
    )
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    const isConfig = message.includes('LLM_API_KEY')
    const raw = (err as Error & { raw?: string }).raw
    res.statusCode = isConfig ? 503 : 400
    res.setHeader('Content-Type', 'application/json')
    res.end(
      JSON.stringify({
        ok: false,
        error: message,
        meta: raw ? { raw } : undefined,
      }),
    )
  }
}

export async function handleLlmApi(req: IncomingMessage, res: ServerResponse): Promise<void> {
  const path = req.url?.split('?')[0] ?? ''
  if (path === '/api/llm/status' && req.method === 'GET') {
    handleGetLlmStatus(req, res)
    return
  }
  if (path === '/api/llm' || path.startsWith('/api/llm/')) {
    if (req.method === 'POST') {
      await handlePostLlm(req, res)
      return
    }
  }
  res.statusCode = 405
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({ error: 'Method not allowed' }))
}

/** Connect-style middleware for Vite dev server. */
export function llmApiMiddleware(
  req: IncomingMessage,
  res: ServerResponse,
  next: () => void,
): void {
  if (!req.url?.startsWith('/api/llm')) {
    next()
    return
  }
  void handleLlmApi(req, res)
}
