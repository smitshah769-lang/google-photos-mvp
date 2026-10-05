/** Bottom-sheet / card motion (Phase 8, E-12.7). */
export const SHEET_DURATION_S = 0.175

export const sheetTransition = (reducedMotion: boolean | null) =>
  reducedMotion
    ? { duration: 0 }
    : { duration: SHEET_DURATION_S, ease: [0.32, 0.72, 0, 1] as const }

export const cardTransition = (reducedMotion: boolean | null) =>
  reducedMotion
    ? { duration: 0 }
    : { duration: SHEET_DURATION_S, ease: 'easeOut' as const }
