# Implementation Plan: Intent Clarifier Prototype

> **Read before coding:** [`PRD.md`](./PRD.md) (functional spec and build order), [`system architecture.md`](./system%20architecture.md) (modules, state machine, LLM boundary), [`edge cases.md`](./edge%20cases.md) (P0/P1 behaviour).  
> **This file** is the build sequence. It does not replace those specs. Where they disagree, [§2](#2-locked-decisions) is the rule to implement.

**Current workspace:** Phases 0–8 implemented (polish, Vitest, Playwright, README). The **430-entry library** is produced by **`npm run build:library`** (Unsplash download + deterministic metadata). Do not hand-author hundreds of rows in the app. **`prototype-assets.zip`** remains an optional offline fallback if Unsplash build is skipped. See [`ACCEPTANCE.md`](./ACCEPTANCE.md) for PRD §9 sign-off.

---

## 1. What “done” means

A clickable dark-theme phone UI (390×844) that runs the flow in PRD §5:

`HOME → QUERY → CLASSIFYING → LEVEL1 → LEVEL2 → LEVEL3 → SEARCHING → RESULTS → SUCCESS | LOOPBACK | FALLBACK`

Search over the mock library is deterministic. The LLM only classifies, writes questions, and interprets typed text. The demo works with no API key (`VITE_USE_MOCK_LLM=true`).

**Ship when:**

- PRD §9 acceptance criteria 1–18 pass.
- PRD §10 paths A, B, and C complete without facilitator workarounds.
- Every **P0** row in `edge cases.md` behaves as written. P1 is in scope for the same build; P2 only if it falls out of the same code.
- `edge cases.md` §13 unit tests exist and pass. Playwright covers paths A–C.

---

## 2. Locked decisions

Implement these. Do not reopen them mid-build.

| Topic | Implement this | Sources |
|---|---|---|
| Call 1 wait | **6 s.** If the LLM returns within 6 s, use it. After 6 s, use `fallbackClassifier` and **discard** a late Call 1 for that `requestId`. | E-2.12, architecture §7.3, edge §14. PRD §6.5’s 4 s figure is superseded. |
| Call 2 wait | Skeleton immediately. At **3 s** (or on failure), template question + `fallbackPickNext`. | E-10.12, architecture §7.3 |
| Call 3 failure | Raw text becomes a keyword pill. Never block the flow. | E-5.11 |
| Pet / animal queries | Class **`people`**. Extract into `animals` (and `objects` when useful). Match `animals[]`, `objects`, `alt`. Do not require `hasPeople`. Skip people-count when every candidate is animal-only. | E-2.5, E-2.13, E-11.5, architecture §5. PRD §8.4’s “dog → Non-people” class column is superseded for the clarifier ladder. `semanticBaseline("dog")` stays a loose tag match and can still be ~11. |
| “me and my dog” | Class **`both`**. Humans use people-count / photo type; the pet matches via `animals`. | E-2.6 |
| Zero-result filter | Undo the filter, toast, keep the previous candidate set. Unknown locations stay as chips and are not hard filters when they match nothing. | E-7.2, E-3.3, edge §14 |
| Keyword with 0 hits | Do not apply. Ask “Nothing matched ‘…’. Keep it, or remove it?” Remove is the default. | E-5.4 |
| “Can’t remember” on loop-back | Already-answered attributes are excluded. A “Can’t remember” attribute may be **re-asked once**. | E-9.7 |
| Year with no entries | Disable empty years in the picker. A typed empty year still runs the ±1 year crawl and explains the neighbour year. | E-6.4, FR-4 |
| 3-question cap vs first level | Ask the **full first-level ladder** for the class (skip already-known and unsplittable attributes). Early stop at ≤ 12 still applies during that ladder. The cap of **3 applies to the contextual round** (level 2 and 3, and each loop-back), so “me at the beach” can show all four first-level questions (acceptance 4) and “friends” can reach “How many people” after the three first-level questions (path C). | FR-10, E-7.7, PRD §9.4, §10 path C |
| Third-level gate | After the second-level questions in the round, enter level 3 only if candidates **> 30** and third-level attributes remain inside the 3-question budget. 13–30 goes to search. | FR-11, E-7.8, E-7.9 |
| Module layout | Use architecture §11. `questions.ts` lives in `src/data/`. `flowStore.ts` lives in `src/state/`. Do not nest those under `config.ts` or `server/` (PRD §8.2 tree is mis-indented). | Architecture §11 |
| Proxy | One code path: `server/` handler mounted as Vite middleware in dev and as a small Node server for a static demo. | Architecture §3, §7.5 |
| Assets | Run **`npm run build:library`** with `UNSPLASH_ACCESS_KEY` in `.env` → writes `public/photos/` + `src/data/photos.ts`. Metadata (dates, locations, tags, demo cluster for **p10** / lily pads) is **deterministic** (fixed seed + authored overrides); Unsplash supplies pixels only. Commit built assets for CI/demo without a key. Optional: unzip `prototype-assets.zip` instead. | PRD §8.4 |

**Proposed defaults in edge §14 are accepted** and are already in the table above.

---

## 3. Constants (`src/config.ts`)

| Name | Value | Used for |
|---|---|---|
| `REFERENCE_DATE` | `2026-10-05` | Re-export from `photos.ts` if it already exports it; do not fork a second date |
| `EARLY_STOP_AT` | `12` | FR-10, E-7.3, E-7.4 |
| `THIRD_LEVEL_ABOVE` | `30` | FR-11 |
| `QUESTIONS_PER_ROUND` | `3` | Contextual round only (§2) |
| `LOOP_LIMIT` | `2` | FR-13, E-9.5 |
| `CALL1_TIMEOUT_MS` | `6000` | E-2.12 |
| `CALL2_TIMEOUT_MS` | `3000` | E-10.12 |
| `MAX_QUERY_CHARS` | `200` | E-1.2, E-5.7 |
| `MAX_OPTIONS` | `6` | E-4.6; Location uses top **4** + “Somewhere else” (FR-5) |
| `FEW_RESULTS` | `3` | Relax threshold (FR-12, E-9.1) |

### Timeline windows

Document these next to the filter. `REFERENCE_DATE` is “today”. Inclusive ranges:

| Value | Window |
|---|---|
| `last_week` | 2026-09-28 through 2026-10-05 (the seven days before the reference date, plus the reference date itself — E-6.1, E-6.3) |
| `last_month` | The 30 days before the reference date through the reference date. Overlaps last week (E-6.2). |
| `last_3_months` | The 90 days before the reference date through the reference date. PRD lists the option and does not define the window; this overlap rule matches E-6.2. |
| `this_year` | 2026-01-01 through the reference date, then ±1 year crawl (also 2025 and 2027) |
| `last_year` | Calendar 2025, then ±1 year crawl (2024 and 2026) |
| `older` | Strictly before 2025-10-05 (before the last 12 months — E-6.6) |
| `year:YYYY` | 1 Jan `(Y−1)` through 31 Dec `(Y+1)`. Helper: “Also checking {Y−1} and {Y+1}” (E-6.5) |

Relative buckets do not crawl. Only year selections do.

---

## 4. Target layout

```
src/
  App.tsx
  main.tsx
  config.ts
  data/
    photos.ts                 # generated by build:library (or copied from prototype-assets.zip)
    questions.ts              # template copy for fallback
    synonyms.ts               # semanticBaseline map
  lib/
    llmClient.ts
    fallbackClassifier.ts
    schemas.ts
    filterEngine.ts
    attributeStats.ts
    questionPicker.ts
    semanticBaseline.ts
    timeline.ts               # bucket math, unit-tested with filterEngine
    grounding.ts              # drop options not in attributeStats
  state/
    flowStore.ts
  components/
    PhoneFrame.tsx
    AskPhotosHome.tsx
    QueryInput.tsx
    ClarifierCard.tsx
    TypedAnswerInput.tsx
    ProfilePills.tsx
    ResultsGrid.tsx
    PhotoCard.tsx             # real / gradient / document
    PhotoViewer.tsx
    SuccessScreen.tsx
    LoopBackCard.tsx
    FallbackScreen.tsx
    DebugDrawer.tsx
    DevLibrary.tsx            # /dev grid, not part of the demo flow
server/
  index.ts                    # POST /api/llm only
  llm.ts
  prompts.ts
  parse.ts                    # strip fences, first JSON object (E-10.13)
public/photos/photo-01.jpg … photo-30.jpg
```

Stack (PRD §8.1): Vite, React, TypeScript, Tailwind, Zustand, Zod, Framer Motion for the 150–200 ms sheet. Tests: Vitest for `src/lib` and the store; Playwright for paths A–C.

---

## 5. Build sequence

Work in this order (PRD §11). Do not start a phase until the previous phase’s exit check passes.

### Phase 0 — Scaffold

1. `npm create vite` React + TypeScript. Tailwind. Path alias `@/` → `src/`.
2. Dark Google Photos tokens: near-black background, Google Sans with Inter fallback, 16 px radius on cards, chips ≥ 44×44 (E-12.9).
3. `PhoneFrame`: fixed 390×844, centred on desktop. Below 390 px wide, scale the frame with `transform` so the page never scrolls horizontally (E-12.4, acceptance 18).
4. `.env.example` with `LLM_API_KEY`, `LLM_MODEL`, `VITE_USE_MOCK_LLM`. The key is read only in `server/`. No `VITE_LLM_API_KEY` (E-10.10).
5. `.gitignore` includes `.env`.

**Exit:** blank phone frame on a desktop page, no horizontal scroll at 320 px and at 1440 px.

### Phase 1 — Library and three renderers

**Blocker:** `src/data/photos.ts` and image files under `public/photos/` must exist. Produce them with **`npm run build:library`** (preferred) or by unzipping **`prototype-assets.zip`**. Stop if neither is available.

1. **`scripts/build_library.ts`** (or `.py`): read `UNSPLASH_ACCESS_KEY` from `.env`; fetch **400** Unsplash photos (search/curated queries + pagination); save as `public/photos/u-*.jpg` (or equivalent); merge with **~30 document rows** and **authored demo metadata** (lake last-week cluster, single **lily pads** target, Whistler/Banff/Vancouver Island mix) into `photos.ts`. Respect Unsplash [API guidelines](https://help.unsplash.com/en/articles/2511315-guideline-attribution) (hotlink URLs or download per license; store photographer attribution in data if required).
2. Confirm **430 unique ids** (exact id scheme is defined by the generator; assert count on `/dev`, E-11.7).
3. Flag `peopleCount` / `hasPeople` mismatches on the dev page (E-11.6). Do not “fix” rows by hand in `photos.ts`—fix the generator.
4. `PhotoCard`:
   - `kind: 'photo'` with a non-null `src` → `<img src={src}>`, grid `object-cover` square. `onError` → gradient + `alt`, no broken icon (E-8.3, E-11.2).
   - `kind: 'photo'` and `src: null` (legacy/generated-only rows) → gradient card (E-11.3).
   - `kind: 'document'` → paper card, `docType` label, grey bars. No fake names or numbers (E-11.4).
5. Route `/dev`: all 430 cells plus id, date, location, peopleCount, objects. Use it to eyeball the PRD §8.4 test-query counts after `semanticBaseline` exists (Phase 2).

**Exit:** every photo row with `src` loads or falls back; document cells never hit Unsplash; 430 ids unique; demo target id for path A still has `lily pads` + last-week lake cluster per generator spec.

### Phase 2 — Deterministic search

No LLM in this phase. Pure functions, Vitest first.

#### `timeline.ts` + `filterEngine.ts`

Input: library, profile, optional keyword list. Output: candidates and a score per photo.

- Profile values AND together. `'any'` (Can’t remember) does not filter.
- Missing optional fields (`timeOfDay`, `sky`, `pose`, …) are unknown: omitted from option stats and **fail** a strict filter on that attribute (E-11.1).
- People class + named pet: include animal-tagged rows without `hasPeople` (E-11.5). `peopleCount` buckets (`1`, `2`, `3-5`, `6+`) apply only when the set contains humans.
- Keywords: case-insensitive substring on `objects`, `animals`, `alt` (E-5.3).
- Location strings are exact (E-11.8). Do not merge “Vancouver” and “Vancouver Island”.
- Score: count of satisfied profile attributes + matched keywords. Sort score desc, `date` desc, `id` asc (E-8.10, E-8.2).
- `applyFilter` helper used by the store: if the new set would be empty, return `{ applied: false, candidates: previous }` so the store can toast (E-7.2). The engine itself stays pure; the store decides the toast.

#### `semanticBaseline.ts`

Loose token match of the raw query against `objects`, `animals`, `alt`, plus `synonyms.ts` (PRD §6.4: lake → water, sea, harbour, waves, sun over water). Independent of the profile. Tune synonyms until the dev page is in the neighbourhood of the PRD §8.4 table (lake ~73, sunset ~31, dog ~11, beach ~34, Diwali 1, hotel receipt ~5). The UI prints **computed** numbers, not the table.

#### `attributeStats.ts` + `questionPicker.ts` + `grounding.ts`

- Counts and Shannon entropy per allowed attribute. Unknown / missing values are not a bucket.
- Skip an attribute with fewer than 2 distinct values (E-4.4, E-4.12).
- Options: values with count ≥ 1 only (E-6.8, E-4.13). Cap at 6 by frequency (E-4.6). Location: top 4.
- Tie-break: fixed first-level order for that class, then attribute name alphabetical (E-4.7).
- `fallbackPickNext`: highest entropy among unanswered allowed attributes (architecture §6.3).
- `groundOptions`: intersect LLM options with stats keys; if fewer than 2 remain, signal skip (E-4.5, E-10.6).

**Allowed attributes**

| Class | Level 1 (fixed order) | Level 2 | Level 3 |
|---|---|---|---|
| `people` | timeline, location, photoType | peopleCount, pose | clothingColor, background |
| `nonPeople` | timeline, location, object | timeOfDay, sky | dominantColor, activity |
| `both` | timeline, location, object, photoType | peopleCount, timeOfDay | pose, background |
| `text` | docType, timeline | language, textContent | layout, pageColor |

`clothingColor`, `dominantColor`, `activity`, `background`, `layout`, `pageColor` must be derived from fields that actually exist (`colors`, `setting`, `objects`, `docType` / text). If a third-level attribute cannot be derived for a candidate, treat it as unknown (E-11.1) rather than inventing a value.

**Exit — tests from edge §13.1–3:**

- E-6.1 through E-6.5 boundaries, including crawl helper text inputs.
- E-11.1 missing `timeOfDay` excluded by a Morning filter.
- E-5.3 keyword substring; E-11.5 poodle/dog does not require `hasPeople` (p01, p25).
- E-4.4 single-value skip; E-4.7 entropy tie is stable across runs.
- E-9.7 answered attributes excluded from `fallbackPickNext`.

### Phase 3 — LLM boundary

#### Schemas (`src/lib/schemas.ts`)

Zod for the three payloads in PRD §6.6, plus:

```ts
extracted.animals: string[]   // architecture §7.1; default []
```

Closed enums only. Extra keys stripped (E-5.8, E-5.10). Class outside the enum is invalid (E-2.10).

#### Server

- `POST /api/llm` with a discriminant: `classify | nextQuestion | interpretTyped`.
- `prompts.ts`: short MCQs, JSON only, never re-ask known profile attributes, stats not photo lists, prompt budget ~1k tokens (PRD §6.6, architecture §15).
- Call 1 system addendum: pet and animal queries (`dog`, `cat`, `poodle`, “my cat”) are class `people` and fill `animals`. Human + pet (“me and my dog”) is `both` (E-2.5, E-2.6).
- `parse.ts`: strip ``` fences, take the first JSON object (E-10.13).
- Provider SDK only in `server/llm.ts` (E-10.14). One retry on invalid JSON or 429/5xx after ~500 ms (E-10.3, E-10.4).
- Log token usage when the provider returns it (architecture §15) for the debug drawer.

#### `llmClient.ts`

- `classify`, `nextQuestion`, `interpretTyped`.
- Monotonic `requestId` per operation. Store ignores any response that is not the latest (E-10.7).
- `AbortController` on reset, back, and force-class (E-10.11, E-12.5).
- Call 2 cache key `(class, stableProfileJson, level)`. Invalidate on force-class (E-10.9). Do **not** prefetch during the usability test (architecture §15).
- Timeouts per §2. Proxy down → same fallback as mock, one toast “Using offline mode” (E-10.2).

#### `fallbackClassifier.ts` + `data/questions.ts`

Keyword lists, no fuzzy match (E-1.5):

- Animal terms → `people`, with the animal token in `extracted.animals`.
- Document words (receipt, passport, invoice, ticket, notes, slides) → `text`, with `docType` when the word maps.
- People words (me, friends, mom, selfie, group) without a scene → `people`.
- People words plus a place/object → `both`.
- Otherwise → `nonPeople` (E-1.3, E-1.4).
- Bare 4-digit year → `extracted.timeline` year (E-1.3).

Template questions: one sentence per attribute, options filled from `attributeStats` at runtime. If the LLM question is empty, longer than ~120 characters, or not a question, use the template (E-4.9).

Mock mode when `VITE_USE_MOCK_LLM=true` or `LLM_API_KEY` is absent. No console errors (E-10.1).

**Exit:** mocked-proxy tests for invalid JSON, timeout, and stale `requestId` (E-10.4, E-10.7, E-10.12). Manual calls for “lake”, “me at the beach”, “friends”, “hotel receipt”, “dog” return the classes in §2.

### Phase 4 — `flowStore`

Zustand store. Candidates are **derived** on every profile change via `filterEngine` (architecture §4). Persist nothing (E-12.1).

```ts
type FlowState = {
  stage: Stage;
  query: string;
  queryClass: QueryClass | null;
  profile: Partial<Record<Attr, string | 'any'>>;
  keywords: string[];
  candidates: Photo[];
  candidateHistory: number[];
  baselineCount: number | null;
  loopCount: number;
  level: 1 | 2 | 3;
  questionsThisRound: number;      // contextual questions only
  answered: Partial<Record<Attr, 'value' | 'any'>>;
  cantRememberReasked: Set<Attr>;  // E-9.7 once
  currentQuestion: Attr | null;
  extractedChips: Attr[];          // FR-1 "Already understood"
  relaxed: Attr[];                 // filters undone by loop-back
  llmLog: LlmLogEntry[];           // latency, fallback flag, raw JSON
  mockMode: boolean;
  requestGeneration: number;       // bumps on reset / back / force-class
};
```

**Transitions**

| Event | Behaviour |
|---|---|
| Submit query | Ignore if empty/whitespace (E-1.1) or a classify is in flight (E-1.7). Truncate to 200 (E-1.2). Stage `CLASSIFYING`. |
| Call 1 result | Apply `extracted` that match the library. Unmatched location/object stays a chip and is not a hard filter (E-3.3). Unmappable timeline is dropped and asked normally (E-3.4). Set baseline candidates and `semanticBaseline` count. 0 baseline → empty results, skip clarifier (E-7.1). ≤ 12 → results (E-7.5). Else first unanswered L1 attribute. |
| Option tap | One registration; ignore while the next card loads (E-4.1, E-4.3, E-10.8). `'any'` marks answered, count unchanged (E-4.2). Otherwise `applyFilter`; on reject, toast and stay (E-7.2). |
| Typed submit | Empty disabled (E-5.5). Call 3. Apply `updates` that are allowed and in `knownValues`; drop the rest (E-5.10). Mark every filled attribute answered (E-5.2). Keywords go through the 0-hit confirm (E-5.4). Contradiction overwrites and toasts “Updated {Attribute}” (E-5.6). Chip tap while typing: chip wins, clear the field (E-5.12). |
| After each answer | Append history. If count ≤ 12 → search (E-7.3). If count is 13, keep asking (E-7.4). If L1 remains, next L1 attribute in fixed order. If L1 is done and count > 12, level 2, LLM pick. After L2, count > 30 → level 3 if budget remains (E-7.8); else search (E-7.9). Contextual questions increment `questionsThisRound`; at 3, search (E-7.7). No legal attribute left → search (E-7.10). |
| Show results now | Search with current profile; unanswered attributes stay available (E-7.11). |
| Not found | Debounce to one loop (E-9.6). If `loopCount` is already 2 → fallback (E-9.5). If no unused attribute → fallback early (E-9.4). If results < 3, relax the answered hard filter whose removal grows the set the most; tie-break most recently answered (E-9.1, path B relaxes Location). If results ≥ 3, do not relax (E-9.2). If still zero, drop the last two filters (E-9.3). New round: `questionsThisRound = 0`, stage briefly `LOOPBACK` (“Let’s narrow it down differently.”) then S4. If the new set equals the previous set, ask one more question before showing it again (E-9.8). |
| Force class | Bump generation, clear profile and history, restart L1 for that class, log override (E-2.11). |
| Start over / debug Reset | Clear query, profile, history, loop count, pills. Abort in-flight calls. Cache may remain (E-9.10, E-12.5, E-12.10). Return to S1. |
| Back | In-memory stack + `popstate`. Question → previous question (profile reverts) → query (profile cleared, E-1.8) → home (E-12.2, E-9.9). Refresh always boots at S1 because nothing is stored. |

Counter UI binds to the latest `candidates.length` only (E-7.12).

**Exit — store tests:** 12 vs 13 (E-7.3, E-7.4), contextual cap does not eat the `both` L1 ladder, loop limit 2 (E-9.5), relax picks Location on a Whistler-sized fixture, pet query does not set `hasPeople`.

### Phase 5 — Screens S1–S5 (happy path)

Build in order. Wire each screen to the store before starting the next.

| Screen | Build notes | P0 checks |
|---|---|---|
| S1 `AskPhotosHome` | Title, suggestion list, chip **Can’t remember the photo clearly** above a disabled or same-route input bar (E-1.9). | Acceptance 1 |
| S2 `QueryInput` | Placeholders: lake, me at the beach, hotel receipt. Submit disabled when blank. Char counter appears near 200. | E-1.1 |
| S3 | Shimmer copy: “Understanding what you’re looking for…” | |
| S4 `ClarifierCard` | Progress, question, ≤ 6 chips, `TypedAnswerInput`, ghost **Can’t remember**, `ProfilePills`, “~N photos match”. Skeleton while Call 2 runs; taps disabled (E-10.8). “Somewhere else” focuses the field with placeholder “Where was it?” (E-4.11). Long labels wrap to two lines inside 390 px (E-4.8). **Show results now** always visible. | E-4.1, E-4.2, FR-3a |
| S5 `ResultsGrid` | 3 columns, equal cells, header “N photos match”, pills, comparison chip, bottom **I did not find the photo**. Empty copy for E-7.1 includes non-functional **Browse by Places**. | E-8.1, E-8.5 |

“Already understood” chips render from `extractedChips` (E-3.1). Removing a chip is P2 (E-3.6, E-8.9); leave the control out until P0 paths pass.

Comparison chip: `Without clarifier: {baseline} → With clarifier: {n}`. If `n > baseline`, show only “N results” (E-8.4).

**Exit:** with mock mode, path A reaches a results grid that contains **p10** after Last week + typed “the island, with lily pads” (the interpreter can be a fixture in mock mode that maps that exact string — see Phase 3 mock fixtures). Acceptance 2, 3, 6, 8, 10, 11.

### Phase 6 — Viewer, success, loop-back, fallback

| Screen | Notes |
|---|---|
| S6 `PhotoViewer` | Aspect from `width`/`height` (E-11.2). **This is it** and back. Back restores grid scroll (E-8.7). Placeholder “This is it” uses the same success path (E-8.8). |
| S7 `SuccessScreen` | “Found in {taps} taps: {n} results instead of {baseline}”. Start over clears loop count and pills (E-12.10). |
| S8 `LoopBackCard` | Copy from FR-12, then S4. |
| S9 `FallbackScreen` | After 2 loop-backs: “Still not found? Browse by Places” (dead control) and **Start over** (FR-13). |

**Exit:** path B. Last week + Whistler → 2 results, not p10 → not found → Location relaxed → Time of day Morning → p10 in the morning last-week lake set. Third not-found shows S9 (E-9.5). Acceptance 15, 16.

### Phase 7 — Debug drawer and instrumentation

Dock the drawer **beside** the frame on desktop so it never covers taps (E-12.6). On a narrow viewport, a toggle overlay is acceptable only if the frame remains tappable while closed.

Show (PRD §4 and §7):

- Class, profile, answered vs any, candidate history (`73 → 15 → 1`)
- Force-class dropdown (E-2.11)
- Per-call latency, fallback flag, raw request/response (truncate typed text in any log that is not this drawer — E-5.9)
- Mock-mode badge (E-10.1)
- Question counts: tapped vs typed vs can’t-remember; loop count; time from submit to results
- Reset (E-12.5)

**Exit:** acceptance 9 and 17. Force-class from a lake session into `text` restarts at doc type / timeline with a clean profile.

### Phase 8 — Polish and acceptance pass

1. Bottom-sheet motion 150–200 ms; count-up on the candidate number. `prefers-reduced-motion`: instant (E-12.7).
2. New card moves focus to the question title; options are buttons; Can’t remember is in tab order (E-12.8).
3. Typed field stays above the keyboard (E-12.3).
4. Results list may virtualise above ~50 cells (E-8.6, P2 — skip if the 430-grid already scrolls smoothly).
5. README: how to run mock vs live, that typed text is sent only for interpretation and is not logged outside the debug drawer (E-5.9), and that `LLM_API_KEY` stays server-side.
6. Walk PRD §9 line by line and the P0 table in [§7](#7-p0-acceptance-map). Fix before calling the phase done.

**Exit:** acceptance 1–18 checked off in the PR, paths A–C recorded (mock mode and, if a key is available, one live pass).

---

## 6. Mock-mode fixtures for the demo script

Mock mode must make paths A–C deterministic so a usability test does not depend on provider drift. Live mode uses the same store; only the three call implementations swap.

| Input | Mock result |
|---|---|
| “lake” | `nonPeople`, no extracted fields |
| “lake last week” | `nonPeople`, timeline `last_week`, objects `['lake']` |
| “me at the beach” | `both` |
| “friends” | `people` |
| “hotel receipt” | `text`, docType `receipt` |
| “dog” / “my cat” / “poodle” | `people`, `animals` set |
| “me and my dog” | `both`, animals `['dog']` |
| Typed “the island, with lily pads” while attribute is location | updates location `Vancouver Island` (exact library string) and object `lily pads` |
| Any other typed text in mock mode | keyword pill using the raw string (Call 3 failure path, E-5.11) so the flow still advances |

Question text in mock mode comes from `questions.ts`. Options always come from `attributeStats`.

---

## 7. P0 acceptance map

If a row is not covered by the phase exit checks above, it is still required before Phase 8 closes.

| Area | IDs |
|---|---|
| Query entry | E-1.1, E-1.7, E-1.8 |
| Classify | E-2.1, E-2.2, E-2.3, E-2.4, E-2.5, E-2.9, E-2.10, E-2.12 |
| Extracted chips | E-3.1, E-3.3 |
| Cards | E-4.1, E-4.2, E-4.3, E-4.4, E-4.5, E-4.6, E-4.13 |
| Typed | E-5.1, E-5.2, E-5.3, E-5.4, E-5.5, E-5.8, E-5.10, E-5.11 |
| Timeline | E-6.1, E-6.5, E-6.8 |
| Stop rules | E-7.1, E-7.2, E-7.3, E-7.4, E-7.5, E-7.6, E-7.7, E-7.10, E-7.11 |
| Results | E-8.1, E-8.2, E-8.3 |
| Loop | E-9.1, E-9.2, E-9.4, E-9.5, E-9.6, E-9.7, E-9.10 |
| LLM | E-10.1, E-10.2, E-10.3, E-10.4, E-10.5, E-10.6, E-10.7, E-10.8, E-10.10, E-10.12 |
| Data | E-11.1, E-11.2, E-11.3, E-11.5 |
| Frame | E-12.4, E-12.5, E-12.10 |

P1 follows the same modules (timeouts, back stack, cache, third-level gate tests, force-class, scroll restore). Do not cut a P1 that is a branch of a P0 function already being written — implement it there. P2 (fuzzy typos, chip removal, reduced motion, screen reader) is a last pass.

---

## 8. Demo paths (manual script)

Numbers are whatever `photos.ts` computes. The PRD §10 figures are the sanity check.

**A — lake + typed detail**

1. Can’t remember → “lake” → `nonPeople`, baseline ~73.
2. Timeline **Last week** → ~15, still above 12.
3. Type “the island, with lily pads” → pills Vancouver Island and lily pads → 1 result, **p10**.
4. Chip shows the real baseline → 1. Viewer → This is it.

Alternate: tap Vancouver Island instead of typing → ≤ 12, early stop, p10 is the only real photo in that set.

**B — Whistler loop-back**

1. “lake” → Last week → Location **Whistler** (2).
2. Not found → relax Location → Time of day **Morning** → p10 present.
3. A third not-found on a fresh run lands on S9.

**C — class ladders**

- “friends” → people L1 (timeline, location, photo type) then people count.
- “me at the beach” → both, four L1 questions while the set stays above 12.
- “hotel receipt” → text, doc type pre-filled, Timeline is the first question asked.

---

## 9. Verification

| Layer | Command / action | Covers |
|---|---|---|
| Unit | `vitest` on `timeline`, `filterEngine`, `attributeStats`, `questionPicker`, `semanticBaseline`, `grounding`, `flowStore`, `llmClient` | Edge §13.1–5 |
| Data | `/dev` plus a test that imports `photos` | 430 ids, 400 Unsplash `src` paths (when built from API), baseline counts |
| E2E | Playwright, `VITE_USE_MOCK_LLM=true` | Paths A–C, acceptance 18 at 390×844 and at 320 px width |
| Live (optional) | One pass of path A with a real key | Call 1 within 6 s replaces fallback; debug shows latency |

Browser check before any UI phase is called done: run the flow, do not stop at a screenshot. Confirm S4 taps, typed submit, results → viewer → back (scroll kept), loop-back, and reset.

---

## 10. Explicitly out of scope

Real Google Photos APIs, auth, on-device vision, geocoding, EXIF, server-side photo storage, persistent sessions, functional Browse by Places, voice input, and Call 2 prefetch during the test week (architecture §15–16, PRD §12).

Token budget for 6 people × 2 runs is about 60k–75k tokens if prefetch stays off (architecture §15). Default local work to mock mode.
