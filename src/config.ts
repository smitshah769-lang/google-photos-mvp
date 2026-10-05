import { REFERENCE_DATE as PHOTOS_REFERENCE_DATE } from '@/data/photos'

/** Re-export from photos.ts — single source for "today" (implementation plan §3). */
export const REFERENCE_DATE = PHOTOS_REFERENCE_DATE

export const EARLY_STOP_AT = 12
export const THIRD_LEVEL_ABOVE = 30
export const QUESTIONS_PER_ROUND = 3
/** After this many loop-backs from "I did not find the photo", show the start-over screen (FR-13). */
export const LOOP_LIMIT = 1
/** Classify (Call 1). Gemini often needs 5–10s; 6s caused false fallbacks. */
export const CALL1_TIMEOUT_MS = 20_000
/** nextQuestion (Call 2). Large attributeStats payloads often need 10–20s. */
export const CALL2_TIMEOUT_MS = 25_000
export const MAX_QUERY_CHARS = 200
export const MAX_OPTIONS = 6
export const FEW_RESULTS = 3

/** MCQ chips per question (UI shows 3 + Add detail + Can't remember). */
export const CHIP_OPTIONS_PER_QUESTION = 3

/** Location MCQ: top values by frequency (overflow via Add detail). */
export const LOCATION_OPTION_CAP = CHIP_OPTIONS_PER_QUESTION
