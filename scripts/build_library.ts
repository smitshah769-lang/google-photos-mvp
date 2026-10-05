/**
 * Build or restore src/data/photos.ts and public/photos/.
 *
 * Usage:
 *   npm run build:library                    — ensure library from prototype-assets.zip
 *   npm run build:library -- --regenerate    — re-run seeded Python generator
 *   npm run build:library -- --unsplash      — download Unsplash JPEGs + update src in photos.ts (metadata unchanged)
 *   npm run build:library -- --sync-only     — point photos.ts at existing public/photos/{id}.jpg (no API)
 *   npm run build:library -- --from-samples  — copy JPEGs from ./Sample images/ onto rows missing src
 */
import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { config } from 'dotenv'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
config({ path: path.join(ROOT, '.env') })

const PHOTOS_TS = path.join(ROOT, 'src/data/photos.ts')
const PUBLIC_PHOTOS = path.join(ROOT, 'public/photos')
const ZIP = path.join(ROOT, 'prototype-assets.zip')
const PYTHON_GEN = path.join(ROOT, 'prototype-assets/scripts/generate_library.py')

const PHOTOS_MARKER = 'export const photos: Photo[] = '

type PhotoRecord = Record<string, unknown> & {
  id: string
  kind: string
  source?: string
  src: string | null
  objects: string[]
  alt: string
  width: number
  height: number
}

type UnsplashPhoto = {
  id: string
  urls: { regular: string }
  width: number
  height: number
  links: { download_location: string; html: string }
  user: { name: string; links: { html: string } }
}

const PHOTOS_TS_HEADER = `// SAMPLE LIBRARY for the Intent Clarifier prototype (430 entries).
//  - 30 research-deck photos (source: 'real') — metadata fixed; images from zip or unchanged
//  - ~393 Unsplash-backed photos (source: 'unsplash') — mock metadata from seed 42; JPEGs from build:library
//  - ~30 document entries (source: 'handmade-doc' | 'generated', src: null)
// NOTE: dates, locations, and tags are MOCK values for the demo (not from Unsplash).

export const REFERENCE_DATE = "2026-10-05"; // treat as "today" so relative timeline options stay stable

export type Photo = {
  id: string;
  kind: "photo" | "document";
  source: "real" | "unsplash" | "handmade-doc" | "generated";
  src: string | null;
  placeholder?: { hueA: number; hueB: number; emoji: string };
  alt: string;
  width: number;
  height: number;
  date: string;
  location: string;
  setting: "indoor" | "outdoor";
  hasPeople: boolean;
  peopleCount: number;
  photoType?: "selfie" | "portrait" | "group" | "candid";
  pose?: "smiling" | "serious" | "posing" | "action";
  animals: string[];
  objects: string[];
  timeOfDay?: "morning" | "afternoon" | "sunset" | "night";
  sky?: "clear" | "cloudy" | "foggy";
  colors: string[];
  docType?: "receipt" | "id" | "ticket" | "note" | "screenshot" | "slides";
  textContent?: Array<"name" | "number" | "date" | "address">;
  language?: string;
  unsplashCredit?: { photoId: string; photographer: string; profileUrl: string; photoUrl: string };
};

`

function parsePhotosFile(): PhotoRecord[] {
  const raw = fs.readFileSync(PHOTOS_TS, 'utf8')
  const i = raw.indexOf(PHOTOS_MARKER)
  if (i === -1) throw new Error(`Missing ${PHOTOS_MARKER} in photos.ts`)
  const json = raw.slice(i + PHOTOS_MARKER.length).trim().replace(/;\s*$/, '')
  return JSON.parse(json) as PhotoRecord[]
}

function writePhotosFile(photos: PhotoRecord[]) {
  fs.mkdirSync(path.dirname(PHOTOS_TS), { recursive: true })
  const body = JSON.stringify(photos, null, 1)
  fs.writeFileSync(PHOTOS_TS, PHOTOS_TS_HEADER + PHOTOS_MARKER + body + ';\n', 'utf8')
}

function ensureFromZip(force: boolean) {
  if (!force && fs.existsSync(PHOTOS_TS)) {
    const jpgCount = fs.existsSync(PUBLIC_PHOTOS)
      ? fs.readdirSync(PUBLIC_PHOTOS).filter((f) => f.endsWith('.jpg')).length
      : 0
    console.log(`Library present: ${PHOTOS_TS} (${jpgCount} JPGs in public/photos/)`)
    return
  }

  if (!fs.existsSync(ZIP)) {
    console.error(
      'Missing prototype-assets.zip and no photos.ts. Add the zip or run with --unsplash.',
    )
    process.exit(1)
  }

  console.log('Extracting prototype-assets.zip…')
  execSync(`unzip -o "${ZIP}"`, { cwd: ROOT, stdio: 'inherit' })
  fs.mkdirSync(path.join(ROOT, 'src/data'), { recursive: true })
  fs.mkdirSync(PUBLIC_PHOTOS, { recursive: true })
  fs.copyFileSync(
    path.join(ROOT, 'prototype-assets/src/data/photos.ts'),
    PHOTOS_TS,
  )
  for (const file of fs.readdirSync(path.join(ROOT, 'prototype-assets/public/photos'))) {
    if (file.endsWith('.jpg')) {
      fs.copyFileSync(
        path.join(ROOT, 'prototype-assets/public/photos', file),
        path.join(PUBLIC_PHOTOS, file),
      )
    }
  }
  console.log('Copied photos.ts and real photo JPEGs.')
}

function regenerateMetadata() {
  if (!fs.existsSync(PYTHON_GEN)) {
    console.error(`Missing ${PYTHON_GEN}`)
    process.exit(1)
  }
  console.log('Regenerating generated entries (seed 42)…')
  execSync(`python3 "${PYTHON_GEN}"`, { cwd: path.dirname(PYTHON_GEN), stdio: 'inherit' })
  const generated = path.join(ROOT, 'prototype-assets/src/data/photos.ts')
  if (fs.existsSync(generated)) {
    fs.copyFileSync(generated, PHOTOS_TS)
    console.log('Copied regenerated photos.ts into src/data/')
  }
}

async function sleep(ms: number) {
  await new Promise((r) => setTimeout(r, ms))
}

async function unsplashFetch(
  url: string,
  key: string,
  retries = 3,
): Promise<Response> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    const res = await fetch(url, { headers: { Authorization: `Client-ID ${key}` } })
    if ((res.status === 429 || res.status === 403) && attempt < retries) {
      const retryAfter = Number(res.headers.get('retry-after') ?? 120)
      console.warn(`Unsplash ${res.status}; waiting ${retryAfter}s before retry…`)
      await sleep(retryAfter * 1000)
      continue
    }
    return res
  }
  throw new Error('Unsplash fetch failed after retries')
}

async function triggerUnsplashDownload(downloadLocation: string, key: string) {
  try {
    await unsplashFetch(downloadLocation, key, 1)
  } catch {
    /* non-fatal */
  }
}

async function listPhotosPage(
  page: number,
  perPage: number,
  key: string,
): Promise<UnsplashPhoto[]> {
  const url = new URL('https://api.unsplash.com/photos')
  url.searchParams.set('page', String(page))
  url.searchParams.set('per_page', String(perPage))

  const res = await unsplashFetch(url.toString(), key, 2)
  if (!res.ok) {
    const body = await res.text().catch(() => '')
    const err = new Error(`List photos failed HTTP ${res.status} (page ${page}) ${body.slice(0, 120)}`)
    ;(err as Error & { status?: number }).status = res.status
    throw err
  }
  return (await res.json()) as UnsplashPhoto[]
}

async function fetchPhotoPool(needed: number, key: string): Promise<UnsplashPhoto[]> {
  const pool: UnsplashPhoto[] = []
  const seen = new Set<string>()
  const perPage = 30
  let page = 1

  while (pool.length < needed && page <= 40) {
    console.log(`Fetching Unsplash list page ${page}…`)
    const batch = await listPhotosPage(page, perPage, key)
    if (batch.length === 0) break
    for (const photo of batch) {
      if (!seen.has(photo.id)) {
        seen.add(photo.id)
        pool.push(photo)
      }
    }
    page += 1
    await sleep(500)
  }

  if (pool.length < needed) {
    console.warn(`Only collected ${pool.length} Unsplash photos; need ${needed}. Re-run later to resume.`)
  }
  return pool
}

function localPathForId(id: string) {
  return `/photos/${id}.jpg`
}

function filePathForId(id: string) {
  return path.join(PUBLIC_PHOTOS, `${id}.jpg`)
}

function isPhotoDownloadComplete(entry: PhotoRecord): boolean {
  if (entry.kind !== 'photo' || entry.src === null) return false
  const file = filePathForId(entry.id)
  if (entry.source === 'real') return fs.existsSync(file) || fs.existsSync(path.join(PUBLIC_PHOTOS, path.basename(entry.src)))
  return fs.existsSync(file)
}

async function downloadUnsplashLibrary(limit: number, delayMs: number) {
  const key = process.env.UNSPLASH_ACCESS_KEY
  if (!key) {
    console.error('Set UNSPLASH_ACCESS_KEY in .env (see .env.example).')
    process.exit(1)
  }

  if (!fs.existsSync(PHOTOS_TS)) {
    ensureFromZip(false)
  }

  const photos = parsePhotosFile()
  fs.mkdirSync(PUBLIC_PHOTOS, { recursive: true })

  const targets = photos.filter(
    (p) =>
      p.kind === 'photo' &&
      p.source !== 'real' &&
      (!isPhotoDownloadComplete(p) || p.src === null),
  )

  const batch = targets.slice(0, limit)
  let downloaded = 0
  let skipped = 0

  console.log(`Unsplash: ${targets.length} photo rows need images (processing ${batch.length})…`)

  for (const entry of batch) {
    const diskPath = filePathForId(entry.id)
    const publicSrc = localPathForId(entry.id)

    if (fs.existsSync(diskPath) && entry.src === publicSrc) {
      skipped += 1
      continue
    }

    if (fs.existsSync(diskPath) && entry.src === null) {
      entry.src = publicSrc
      if (entry.source === 'generated') entry.source = 'unsplash'
      writePhotosFile(photos)
      skipped += 1
    }
  }

  const stillNeed = batch.filter((entry) => {
    const publicSrc = localPathForId(entry.id)
    return !(fs.existsSync(filePathForId(entry.id)) && entry.src === publicSrc)
  })

  if (stillNeed.length === 0) {
    console.log('All batch entries already on disk.')
  } else {
    let pool: UnsplashPhoto[] = []
    try {
      pool = await fetchPhotoPool(stillNeed.length, key)
    } catch (err) {
      const status = (err as Error & { status?: number }).status
      console.error(String(err))
      if (status === 403 || status === 429) {
        console.error(
          'Unsplash hourly limit likely reached. Wait ~1 hour, then re-run the same command (resume-safe).',
        )
      }
      syncDiskToPhotos(photos)
      writePhotosFile(photos)
      reportSummary(photos, downloaded, skipped)
      process.exit(status === 403 || status === 429 ? 0 : 1)
    }

    for (let i = 0; i < stillNeed.length && i < pool.length; i++) {
      const entry = stillNeed[i]
      const hit = pool[i]
      const diskPath = filePathForId(entry.id)
      const publicSrc = localPathForId(entry.id)

      await triggerUnsplashDownload(hit.links.download_location, key)

      const imgRes = await fetch(hit.urls.regular)
      if (!imgRes.ok) {
        console.warn(`Image bytes failed for ${entry.id}`)
        continue
      }

      fs.writeFileSync(diskPath, Buffer.from(await imgRes.arrayBuffer()))

      entry.src = publicSrc
      entry.width = hit.width
      entry.height = hit.height
      if (entry.source === 'generated') entry.source = 'unsplash'
      entry.unsplashCredit = {
        photoId: hit.id,
        photographer: hit.user.name,
        profileUrl: hit.user.links.html,
        photoUrl: hit.links.html,
      }

      writePhotosFile(photos)
      downloaded += 1

      if (downloaded % 25 === 0) {
        console.log(`  …${downloaded} saved (${entry.id})`)
      }

      await sleep(delayMs)
    }
  }

  syncDiskToPhotos(photos)
  writePhotosFile(photos)
  reportSummary(photos, downloaded, skipped)
}

function syncDiskToPhotos(photos: PhotoRecord[]) {
  for (const entry of photos) {
    if (entry.kind !== 'photo' || entry.source === 'real') continue
    const diskPath = filePathForId(entry.id)
    if (!fs.existsSync(diskPath)) continue
    const publicSrc = localPathForId(entry.id)
    if (entry.src === publicSrc) continue
    entry.src = publicSrc
    if (entry.source === 'generated') entry.source = 'unsplash'
  }
}

function reportSummary(photos: PhotoRecord[], downloaded: number, skipped: number) {
  const photoRows = photos.filter((p) => p.kind === 'photo')
  const withSrc = photoRows.filter((p) => p.src !== null).length
  console.log(
    `Done. Downloaded ${downloaded}, skipped ${skipped}. Photos with src: ${withSrc}/${photoRows.length}.`,
  )
  if (withSrc < photoRows.length) {
    console.log(`Re-run: npm run build:library -- --unsplash --limit=${photoRows.length - withSrc}`)
  }
  console.log('Demo metadata (dates, locations, objects, p10 lily pads) was not modified.')
  console.log('Credit photographers per https://unsplash.com/api-terms when displaying images.')
}

function syncOnly() {
  if (!fs.existsSync(PHOTOS_TS)) {
    ensureFromZip(false)
  }
  const photos = parsePhotosFile()
  syncDiskToPhotos(photos)
  writePhotosFile(photos)
  reportSummary(photos, 0, 0)
}

const SAMPLE_IMAGE_EXT = new Set(['.jpg', '.jpeg'])

function collectSampleJpegs(dir: string, out: string[] = []): string[] {
  if (!fs.existsSync(dir)) return out
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name)
    const stat = fs.statSync(full)
    if (stat.isDirectory()) {
      collectSampleJpegs(full, out)
      continue
    }
    const ext = path.extname(name).toLowerCase()
    if (!SAMPLE_IMAGE_EXT.has(ext)) continue
    // Skip tiny Unsplash thumbs bundled in some packs
    if (/_96x96/i.test(name) && stat.size < 20_000) continue
    out.push(full)
  }
  out.sort((a, b) => a.localeCompare(b, 'en'))
  return out
}

function importFromSampleDir(sampleDir: string, limit: number) {
  if (!fs.existsSync(PHOTOS_TS)) {
    ensureFromZip(false)
  }

  const resolvedDir = path.isAbsolute(sampleDir)
    ? sampleDir
    : path.join(ROOT, sampleDir)

  if (!fs.existsSync(resolvedDir)) {
    console.error(`Sample directory not found: ${resolvedDir}`)
    process.exit(1)
  }

  const photos = parsePhotosFile()
  fs.mkdirSync(PUBLIC_PHOTOS, { recursive: true })

  const targets = photos.filter(
    (p) =>
      p.kind === 'photo' &&
      p.source !== 'real' &&
      (!isPhotoDownloadComplete(p) || p.src === null),
  )

  const files = collectSampleJpegs(resolvedDir)
  const batch = targets.slice(0, limit)
  const pairs = Math.min(batch.length, files.length)

  console.log(
    `Samples: ${files.length} JPEGs in ${resolvedDir}; ${targets.length} rows need images (copying ${pairs})…`,
  )

  let copied = 0
  for (let i = 0; i < pairs; i++) {
    const entry = batch[i]
    const dest = filePathForId(entry.id)
    fs.copyFileSync(files[i], dest)
    entry.src = localPathForId(entry.id)
    if (entry.source === 'generated') entry.source = 'unsplash'
    copied += 1
  }

  syncDiskToPhotos(photos)
  writePhotosFile(photos)
  reportSummary(photos, copied, 0)

  if (targets.length > pairs) {
    console.log(
      `Still ${targets.length - pairs} rows without images. Add more JPEGs or run --unsplash.`,
    )
  }
}

async function main() {
  const args = process.argv.slice(2)
  const force = args.includes('--force')
  const unsplash = args.includes('--unsplash')
  const limitArg = args.find((a) => a.startsWith('--limit='))
  const delayArg = args.find((a) => a.startsWith('--delay='))
  const limit = limitArg ? Number(limitArg.split('=')[1]) : 500
  const delayMs = delayArg ? Number(delayArg.split('=')[1]) : 350

  if (args.includes('--sync-only')) {
    syncOnly()
    return
  }

  if (args.includes('--from-samples')) {
    const dirArg = args.find((a) => a.startsWith('--sample-dir='))
    const sampleDir = dirArg ? dirArg.split('=').slice(1).join('=') : 'Sample images'
    importFromSampleDir(sampleDir, limit)
    return
  }

  if (unsplash) {
    await downloadUnsplashLibrary(limit, delayMs)
    return
  }

  ensureFromZip(force)
  if (args.includes('--regenerate')) {
    regenerateMetadata()
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
