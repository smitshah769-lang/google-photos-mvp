/**
 * Vision search tags for research-deck photos only (source: real).
 * Writes public/photo-vision.json — does not modify src/data/photos.ts.
 *
 * Usage:
 *   npm run build:vision-tags
 *   npm run build:vision-tags -- --force
 *
 * Gemini: GEMINI_API_KEY + VISION_PROVIDER=gemini (default when key set)
 * Ollama: VISION_PROVIDER=ollama + ollama pull moondream (or set VISION_MODEL)
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { config } from 'dotenv'
import {
  isVisionConfigured,
  resolveVisionProvider,
  getGeminiVisionConfig,
  getOllamaVisionConfig,
} from '../server/visionConfig.ts'
import { describePhotoFile, visionPauseMs } from '../server/visionTagging.ts'
import type { PhotoVisionSidecar } from '../src/lib/photoVision.ts'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
config({ path: path.join(ROOT, '.env') })

const PHOTOS_TS = path.join(ROOT, 'src/data/photos.ts')
const OUT = path.join(ROOT, 'public/photo-vision.json')
const PHOTOS_MARKER = 'export const photos: Photo[] = '

type PhotoRecord = {
  id: string
  source?: string
  src: string | null
}

function parsePhotosFile(): PhotoRecord[] {
  const raw = fs.readFileSync(PHOTOS_TS, 'utf8')
  const i = raw.indexOf(PHOTOS_MARKER)
  if (i === -1) throw new Error(`Missing ${PHOTOS_MARKER} in photos.ts`)
  const json = raw.slice(i + PHOTOS_MARKER.length).trim().replace(/;\s*$/, '')
  return JSON.parse(json) as PhotoRecord[]
}

function mimeForPath(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase()
  if (ext === '.png') return 'image/png'
  if (ext === '.webp') return 'image/webp'
  return 'image/jpeg'
}

function loadSidecar(): PhotoVisionSidecar {
  if (!fs.existsSync(OUT)) {
    return { version: 1, model: '', generatedAt: '', entries: {} }
  }
  try {
    const parsed = JSON.parse(fs.readFileSync(OUT, 'utf8')) as PhotoVisionSidecar
    if (parsed.version === 1 && parsed.entries) return parsed
  } catch {
    /* overwrite corrupt file */
  }
  return { version: 1, model: '', generatedAt: '', entries: {} }
}

function saveSidecar(sidecar: PhotoVisionSidecar) {
  fs.mkdirSync(path.dirname(OUT), { recursive: true })
  fs.writeFileSync(OUT, JSON.stringify(sidecar, null, 0))
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function main() {
  const force = process.argv.includes('--force')
  if (!isVisionConfigured()) {
    console.error(
      'Vision not configured. Set GEMINI_API_KEY (gemini) or VISION_PROVIDER=ollama with Ollama running.',
    )
    process.exit(1)
  }

  const provider = resolveVisionProvider()
  const model =
    provider === 'gemini'
      ? getGeminiVisionConfig()?.model ?? 'gemini'
      : getOllamaVisionConfig().model

  const targets = parsePhotosFile().filter((p) => p.source === 'real' && p.src)
  if (targets.length === 0) {
    console.error('No source:real photos with src found.')
    process.exit(1)
  }

  const sidecar = loadSidecar()
  sidecar.model = model
  const pause = visionPauseMs()

  console.log(`Vision tagging ${targets.length} research-deck photos (${provider}, ${model})…`)
  if (provider === 'gemini') console.log(`Pause ${pause}ms between calls to reduce rate limits.`)

  let done = 0
  let failed = 0
  for (const photo of targets) {
    if (!force && sidecar.entries[photo.id]) {
      done++
      continue
    }

    const rel = photo.src!.replace(/^\//, '')
    const abs = path.join(ROOT, 'public', rel)

    if (!fs.existsSync(abs)) {
      console.warn(`  skip ${photo.id}: missing file ${abs}`)
      continue
    }

    const bytes = fs.readFileSync(abs)
    const mime = mimeForPath(abs)
    process.stdout.write(`  ${photo.id}… `)

    try {
      const entry = await describePhotoFile(bytes, mime)
      sidecar.entries[photo.id] = entry
      sidecar.generatedAt = new Date().toISOString()
      saveSidecar(sidecar)
      done++
      console.log(`${entry.searchTags.length} tags`)
    } catch (err) {
      failed++
      console.log('FAILED (will retry on next run)')
      console.error(err)
      continue
    }

    if (pause > 0) await sleep(pause)
  }

  sidecar.generatedAt = new Date().toISOString()
  saveSidecar(sidecar)
  console.log(
    `Wrote ${OUT} (${Object.keys(sidecar.entries).length}/${targets.length} entries, ${failed} failed this run)`,
  )
  if (failed > 0) {
    console.log('Re-run npm run build:vision-tags to retry missing photos.')
    process.exit(1)
  }
  console.log('Re-run npm run build:embeddings -- --force to refresh vectors with new search text.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
