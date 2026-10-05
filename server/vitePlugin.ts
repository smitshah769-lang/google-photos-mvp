import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Plugin } from 'vite'
import dotenv from 'dotenv'
import { llmApiMiddleware } from './handler.ts'

const projectRoot = path.dirname(fileURLToPath(import.meta.url))

export function llmProxyPlugin(): Plugin {
  return {
    name: 'llm-api-proxy',
    configureServer(server) {
      dotenv.config({ path: path.join(projectRoot, '..', '.env') })
      server.middlewares.use(llmApiMiddleware)
    },
  }
}
