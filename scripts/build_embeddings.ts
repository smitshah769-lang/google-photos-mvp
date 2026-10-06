/**
 * Build public/photo-embeddings.json (Google Gemini or Groq).
 *
 * Usage:
 *   npm run build:embeddings
 *   npm run build:embeddings -- --force
 *
 * Google (recommended with Groq chat): GEMINI_API_KEY + EMBED_PROVIDER=google in .env
 * Groq embed: LLM_API_KEY + EMBED_PROVIDER=groq
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { config } from 'dotenv'
import { isEmbedConfigured, resolveEmbedProvider } from '../server/embedConfig.ts'
import { embedTextsUnified } from '../server/embeddingProvider.ts'
import { libraryIdHash } from '../src/lib/embeddingIndex.ts'
import type { EmbeddingIndex } from '../src/lib/embeddingIndex.ts'
import {
  parsePhotoVisionSidecar,
  photoVisionSidecarHash,
  setPhotoVisionSidecar,
} from '../src/lib/photoVision.ts'
import { photoSearchText } from '../src/lib/photoSearchText.ts'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
config({ path: path.join(ROOT, '.env') })

const PHOTOS_TS = path.join(ROOT, 'src/data/photos.ts')
const OUT = path.join(ROOT, 'public/photo-embeddings.json')
const VISION_OUT = path.join(ROOT, 'public/photo-vision.json')
const PHOTOS_MARKER = 'export const photos: Photo[] = '
/** Groq OpenAI-style batch; Google uses smaller batches + pauses inside embedGoogle. */
const BATCH_SIZE = 96

type PhotoRecord = {
  id: string
  alt: string
  location: string
  setting: string
  hasPeople: boolean
  peopleCount: number
  photoType?: string
  pose?: string
  animals: string[]
  objects: string[]
  timeOfDay?: string
  sky?: string
  colors: string[]
  docType?: string
  textContent?: string[]
  language?: string
  kind: string
}

function parsePhotosFile(): PhotoRecord[] {
  const raw = fs.readFileSync(PHOTOS_TS, 'utf8')
  const i = raw.indexOf(PHOTOS_MARKER)
  if (i === -1) throw new Error(`Missing ${PHOTOS_MARKER} in photos.ts`)
  const json = raw.slice(i + PHOTOS_MARKER.length).trim().replace(/;\s*$/, '')
  return JSON.parse(json) as PhotoRecord[]
}

function existingIndex(): EmbeddingIndex | null {
  if (!fs.existsSync(OUT)) return null
  try {
    return JSON.parse(fs.readFileSync(OUT, 'utf8')) as EmbeddingIndex
  } catch {
    return null
  }
}

async function main() {
  const force = process.argv.includes('--force')
  if (!isEmbedConfigured()) {
    console.error(
      'Embedding not configured. For Google: set GEMINI_API_KEY and EMBED_PROVIDER=google in .env\nFor Groq: set LLM_API_KEY and EMBED_PROVIDER=groq',
    )
    process.exit(1)
  }

  const provider = resolveEmbedProvider()
  const photos = parsePhotosFile()
  const photoIds = photos.map((p) => p.id)

  let visionSidecar = null
  if (fs.existsSync(VISION_OUT)) {
    try {
      visionSidecar = parsePhotoVisionSidecar(JSON.parse(fs.readFileSync(VISION_OUT, 'utf8')))
    } catch {
      visionSidecar = null
    }
  }
  setPhotoVisionSidecar(visionSidecar)

  const hash = `${libraryIdHash(photoIds)}-${photoVisionSidecarHash(visionSidecar)}`

  const prev = existingIndex()
  if (!force && prev?.libraryIdHash === hash && prev.photoIds.length === photos.length) {
    console.log(`Up to date: ${OUT} (${photos.length} photos, hash ${hash})`)
    return
  }

  console.log(`Embedding ${photos.length} photos (provider: ${provider})…`)
  if (provider === 'google') {
    console.log('Google free tier: batched with pauses (~5–8 min for 430 photos).')
  }

  const texts = photos.map((p) => photoSearchText(p as Parameters<typeof photoSearchText>[0]))
  let vectors: number[][] = []
  let modelName = process.env.EMBED_MODEL?.trim() ?? 'default'

  try {
    if (provider === 'google') {
      const result = await embedTextsUnified(texts)
      modelName = result.model
      vectors = result.vectors
      console.log(`  ${texts.length} / ${texts.length}`)
    } else {
      for (let i = 0; i < texts.length; i += BATCH_SIZE) {
        const batch = texts.slice(i, i + BATCH_SIZE)
        const result = await embedTextsUnified(batch)
        modelName = result.model
        vectors.push(...result.vectors)
        console.log(`  ${Math.min(i + BATCH_SIZE, texts.length)} / ${texts.length}`)
      }
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    if (msg.includes('does not exist')) {
      console.error(
        'Groq embedding is not enabled on this API key. Use EMBED_PROVIDER=google + GEMINI_API_KEY instead.',
      )
    }
    if (msg.toLowerCase().includes('quota')) {
      console.error('Gemini quota exceeded — wait a minute or check AI Studio rate limits, then retry.')
    }
    throw err
  }

  const dimensions = vectors[0]?.length ?? 0
  if (dimensions === 0 || vectors.length !== photos.length) {
    throw new Error('Embedding build failed: dimension or count mismatch')
  }

  const index: EmbeddingIndex = {
    version: 1,
    model: modelName,
    dimensions,
    libraryIdHash: hash,
    photoIds,
    vectors,
  }

  fs.mkdirSync(path.dirname(OUT), { recursive: true })
  fs.writeFileSync(OUT, JSON.stringify(index))
  console.log(`Wrote ${OUT} (${(fs.statSync(OUT).size / 1024 / 1024).toFixed(2)} MB)`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
