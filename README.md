# Intent Clarifier Prototype (Google Photos MVP)

Dark-theme phone UI (390×844) matching **Mockups/screens.html**: Ask Photos home with entry chip, query in the home bar, classify, then **question rounds** (up to three per screen, live **Show N photos** submit), optional **✎ Add detail** per question, and filtered results from a **430-entry mock library**.

Specs: [`PRD.md`](./PRD.md), [`implementation plan.md`](./implementation%20plan.md), [`system architecture.md`](./system%20architecture.md), [`edge cases.md`](./edge%20cases.md).

## Quick start

```bash
npm install
npm run dev
```

Open the URL printed by Vite (often `5173`; if busy, Vite uses `5174`, `5177`, etc. — **same code and LLM proxy**, only the port differs). The debug panel docks beside the phone on wide screens; use **Debug** on narrow viewports. Check the badge: **Live LLM** (Gemini) vs **Mock mode** (template questions).

### Mock vs live LLM

| Mode | When | Behaviour |
|------|------|-----------|
| **Mock** | `VITE_USE_MOCK_LLM=true` in `.env`, or no `LLM_API_KEY` | Rule-based classify + template questions; deterministic demo paths A–C |
| **Live** | `LLM_API_KEY` + `LLM_MODEL` in `.env`, **`VITE_USE_MOCK_LLM=false`**, restart dev server | `POST /api/llm` via Vite middleware (dev) or `npm run serve` (static + proxy) |

Copy [`.env.example`](./.env.example) to `.env`. **`LLM_API_KEY` is server-only** — never use a `VITE_*` prefix (E-10.10).

**Gemini (Google AI Studio):** `LLM_PROVIDER=gemini`, `LLM_MODEL=gemini-3.8-flash`, Google API key.

**OpenAI:** `LLM_PROVIDER=openai`, `LLM_MODEL=gpt-4o-mini`.

**Groq chat + Google embeddings (recommended):** put keys in **`.env` at the project root** (copy from `.env.example`). Never use `VITE_` for secrets.

```env
# Chat — Groq
LLM_PROVIDER=groq
LLM_BASE_URL=https://api.groq.com/openai/v1
LLM_MODEL=qwen/qwen3.8-27b
LLM_API_KEY=gsk_...

# Embeddings — Google AI Studio (https://aistudio.google.com/apikey)
EMBED_PROVIDER=google
GEMINI_API_KEY=AIza...
EMBED_MODEL=gemini-embedding-001
EMBED_DIMENSION=768

VITE_USE_MOCK_LLM=false
```

Then: `npm run build:embeddings` → commit `public/photo-embeddings.json` → `npm run dev`.

Use the exact Qwen slug from [Groq’s model list](https://console.groq.com/docs/models). Restart `npm run dev` after any `.env` change.

**Debug shows `fallback` on every call?** The UI fell back to rule-based classify/templates because the `/api/llm` call failed or exceeded the client timeout. Expand the log row and read **error** (e.g. `Call 2 timeout`, `Gemini HTTP 503`, `Failed to fetch`). After changing `.env`, **restart** `npm run dev`. Live Gemini calls often take **10–20s** for `nextQuestion`; timeouts are set accordingly. If you still see `503`, retry in a minute or switch model (e.g. `gemini-2.0-flash`).

### How to test the full prototype

1. **Install and run**
   ```bash
   npm install
   npm run dev
   ```
   Open the URL Vite prints. Use the **Debug** drawer for stage, **Loop-backs**, and LLM logs — live calls show latency and no `fallback` tag; mock/failed calls show **fallback**.

2. **Automated (mock LLM — no API key needed)**
   ```bash
   npm test              # filter engine, store, LLM client fallbacks, library
   npm run test:e2e      # PRD demo paths A–B–C at phone width
   ```

3. **Manual happy path (mock or live)**
   - Tap **Can't remember the photo clearly** → faces and recents hide; type in the bottom bar (e.g. `lake`).
   - Answer MCQs; use **Show N photos** to submit each round; try **✎ Add detail** on path A (`the island, with lily pads`).
   - Confirm results grid, **Without clarifier** chip, viewer, **I did not find the photo** loop-back, and **Reset** in debug.

4. **Live LLM smoke test**
   - In `.env`: `LLM_API_KEY`, `LLM_MODEL=gemini-3.8-flash`, `VITE_USE_MOCK_LLM=false`.
   - Restart `npm run dev`, run path A once. In the debug drawer, Call 1 / 2 / 3 should show **fallback: false** and latency when the model responds within timeout (~6s classify, ~8s questions).

5. **Semantic embeddings (Google Gemini, cached index)**
   - **`GEMINI_API_KEY`** in `.env` (AI Studio) + **`EMBED_PROVIDER=google`**. Groq **`LLM_API_KEY`** stays for chat only.
   - One-time (or after `photos.ts` changes): `npm run build:embeddings` → `public/photo-embeddings.json` (~5–8 min on free tier).
   - Runtime: `POST /api/embed` embeds each query with the same Google model. Tag baseline still powers the **Without clarifier** chip; the search **pool** unions embedding hits with tag matches.
   - Commit `photo-embeddings.json` for Vercel. Set **`GEMINI_API_KEY`** in Vercel env for query embeds at runtime.

6. **Production-style serve**
   ```bash
   npm run build
   npm run serve
   ```
   Static app + `/api/llm` and `/api/embed` on port 4173 (reads `.env`).

7. **Checklist:** [`ACCEPTANCE.md`](./ACCEPTANCE.md) and PRD §10 demo script.

Typed answers are sent to the server **only** for Call 3 interpretation. They are **not** logged to the console; full request/response appears in the **debug drawer** only (E-5.9).

## Photo library

```bash
# Requires UNSPLASH_ACCESS_KEY in .env (see .env.example)
npm run build:library -- --unsplash
```

Writes JPEGs to `public/photos/` and updates `src/data/photos.ts`. Metadata (dates, locations, demo **p10** cluster) stays deterministic; Unsplash supplies pixels. Re-run to resume after rate limits.

Optional offline fallback: unzip `prototype-assets.zip` (see implementation plan Phase 1).

To use local JPEGs from **`Sample images/`** (any filenames, `.jpg`/`.jpeg` only):

```bash
npm run build:library -- --from-samples
```

Copies onto `public/photos/{id}.jpg` for rows still missing `src`, then updates `photos.ts`.

Dev grid: [http://127.0.0.1:5173/dev](http://127.0.0.1:5173/dev)

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Vite dev server + LLM proxy middleware |
| `npm run build` | Production bundle |
| `npm run serve` | Node server for static demo + `/api/llm` |
| `npm run build:library` | Generate / sync photo library |
| `npm test` | Vitest (lib, store, library data) |
| `npm run test:e2e` | Playwright demo paths A–C (mock LLM) |

## Verification

- **Unit:** `npm test` — filter engine, timeline, LLM client, `flowStore`, library integrity.
- **E2E:** `npm run test:e2e` — paths A–B–C at 390×844 and 320px width (acceptance 18).
- **Manual:** PRD §10 script; checklist in [`ACCEPTANCE.md`](./ACCEPTANCE.md).

## Stack

Vite, React 19, TypeScript, Tailwind 4, Zustand, Zod, Framer Motion (Phase 8 polish), Vitest, Playwright.
