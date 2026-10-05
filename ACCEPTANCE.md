# PRD §9 acceptance checklist

Use with mock LLM (`VITE_USE_MOCK_LLM=true`) unless noted. Automated coverage: `npm test`, `npm run test:e2e`.

| # | Criterion | Verified |
|---|-----------|----------|
| 1 | Home → “Can't remember the photo clearly” opens query input | E2E |
| 2 | “lake” → Non-people, Timeline / Location / Object order | Manual / mock classify |
| 3 | “lake last week” → Timeline skipped, chip shown | Manual |
| 4 | “me at the beach” → Both, four L1 questions | Manual path C |
| 5 | “hotel receipt” → Text, doc type understood, Timeline asked | E2E path C |
| 6 | “Can't remember” on every question applies no filter | Manual |
| 7 | Typed field on every card; optional; pills update count | E2E path A |
| 8 | Options grounded in candidate set | Unit + manual |
| 9 | No key / failure → fallback, debug shows fallback | Manual + unit |
| 10 | Candidate counter updates after each answer | E2E + AnimatedCount |
| 11 | ≤12 candidates → early stop to results | Unit E-7.3 |
| 12 | Level 3 only if >30 after level 2 | Unit E-7.9 |
| 13 | Year selection includes Y±1 crawl | Unit timeline |
| 14 | Results: real / gradient / document cards + comparison chip | E2E path A |
| 15 | “I did not find the photo” → loop-back L2 | E2E path B |
| 16 | After 2 loop-backs → fallback screen | Unit E-9.5 |
| 17 | Debug: class, profile, history, Reset → home | E2E reset |
| 18 | 390×844, no horizontal scroll; 320px scaled frame | E2E narrow project |

## Demo paths (PRD §10)

| Path | Script | Automated |
|------|--------|-----------|
| A | lake → Last week → typed lily pads → p10 | `demo-paths.spec.ts` Path A |
| B | lake → Last week → Whistler → not found → loop-back | Path B (partial) |
| C | friends / beach / receipt class ladders | Path C tests |

**Optional live:** one path A run with real `LLM_API_KEY`; debug drawer should show latency and non-fallback Call 1 when within 6s.
