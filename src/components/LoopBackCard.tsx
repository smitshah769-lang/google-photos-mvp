import { useFlowStore } from '@/state/flowStore'

/** FR-12 loop-back intro — plain line only (Mockups/screens.html S5). */
export const LOOP_BACK_MESSAGE = "Let's narrow it down differently."

export function LoopBackCard() {
  const loopBanner = useFlowStore((s) => s.loopBanner)

  if (!loopBanner) return null

  return (
    <p
      className="px-4 pb-2 text-sm text-gp-text-secondary"
      data-testid="loop-back-banner"
    >
      {loopBanner}
    </p>
  )
}
