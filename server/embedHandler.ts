import type { IncomingMessage, ServerResponse } from 'node:http'
import { z } from 'zod'
import { getEmbedServerStatus } from './embedConfig.ts'
import { embedQuery } from './embeddingProvider.ts'

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    req.on('data', (c) => chunks.push(Buffer.from(c)))
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
    req.on('error', reject)
  })
}

const embedRequestSchema = z.object({ query: z.string().min(1).max(500) })

export function handleGetEmbedStatus(_req: IncomingMessage, res: ServerResponse): void {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(getEmbedServerStatus()))
}

export async function handlePostEmbed(req: IncomingMessage, res: ServerResponse): Promise<void> {
  if (req.method !== 'POST') {
    res.statusCode = 405
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ error: 'Method not allowed' }))
    return
  }

  try {
    const bodyText = await readBody(req)
    const body: unknown = bodyText ? JSON.parse(bodyText) : {}
    const { query } = embedRequestSchema.parse(body)
    const vector = await embedQuery(query)
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ ok: true, vector, dimensions: vector.length }))
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    const isConfig = message.includes('LLM_API_KEY') || message.includes('GEMINI_API_KEY')
    res.statusCode = isConfig ? 503 : 400
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ ok: false, error: message }))
  }
}

export async function handleEmbedApi(req: IncomingMessage, res: ServerResponse): Promise<void> {
  const path = req.url?.split('?')[0] ?? ''
  if (path === '/api/embed/status' && req.method === 'GET') {
    handleGetEmbedStatus(req, res)
    return
  }
  if (path === '/api/embed' && req.method === 'POST') {
    await handlePostEmbed(req, res)
    return
  }
  res.statusCode = 404
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({ error: 'Not found' }))
}

export function embedApiMiddleware(
  req: IncomingMessage,
  res: ServerResponse,
  next: () => void,
): void {
  if (!req.url?.startsWith('/api/embed')) {
    next()
    return
  }
  void handleEmbedApi(req, res)
}
