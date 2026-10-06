import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import dotenv from 'dotenv'
import { handleEmbedApi } from './embedHandler.ts'
import { handleLlmApi } from './handler.ts'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '..', '.env') })

const PORT = Number(process.env.PORT) || 4173
const distDir = path.join(__dirname, '..', 'dist')

const MIME: Record<string, string> = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
}

function serveStatic(req: http.IncomingMessage, res: http.ServerResponse): void {
  const urlPath = req.url?.split('?')[0] ?? '/'
  const rel = urlPath === '/' ? '/index.html' : urlPath
  const filePath = path.join(distDir, rel)

  if (!filePath.startsWith(distDir)) {
    res.statusCode = 403
    res.end('Forbidden')
    return
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      fs.readFile(path.join(distDir, 'index.html'), (err2, indexHtml) => {
        if (err2) {
          res.statusCode = 404
          res.end('Not found')
          return
        }
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html')
        res.end(indexHtml)
      })
      return
    }
    const ext = path.extname(filePath)
    res.statusCode = 200
    res.setHeader('Content-Type', MIME[ext] ?? 'application/octet-stream')
    res.end(data)
  })
}

const server = http.createServer((req, res) => {
  if (req.url?.startsWith('/api/embed')) {
    void handleEmbedApi(req, res)
    return
  }
  if (req.url?.startsWith('/api/llm')) {
    void handleLlmApi(req, res)
    return
  }
  serveStatic(req, res)
})

server.listen(PORT, () => {
  console.log(`Demo server listening on http://localhost:${PORT}`)
})
