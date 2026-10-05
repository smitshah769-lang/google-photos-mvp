import { TopBar } from '@/components/TopBar'
import { useFlowStore } from '@/state/flowStore'

export function SuccessScreen() {
  const resultCount = useFlowStore((s) => s.candidates.length)
  const baselineCount = useFlowStore((s) => s.baselineCount)
  const optionTaps = useFlowStore((s) => s.optionTaps)
  const typedCount = useFlowStore((s) => s.typedCount)
  const cantRememberCount = useFlowStore((s) => s.cantRememberCount)
  const startOver = useFlowStore((s) => s.startOver)

  const taps = optionTaps + typedCount + cantRememberCount
  const baseline = baselineCount ?? resultCount

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-gp-bg">
      <TopBar title="Found" />
      <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
        <div
          className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#1e3a2f] text-3xl text-[#81c995] motion-safe:animate-[success-pop_0.45s_ease-out]"
          aria-hidden
        >
          ✓
        </div>
        <h2 className="mb-3 text-xl font-normal text-gp-text">Photo found</h2>
        <p className="mb-10 max-w-[18rem] text-base leading-relaxed text-gp-text-secondary">
          Found in {taps} tap{taps === 1 ? '' : 's'}: {resultCount} result
          {resultCount === 1 ? '' : 's'} instead of {baseline}
        </p>
        <button
          type="button"
          onClick={() => startOver()}
          className="w-full max-w-xs rounded-full bg-gp-accent py-3.5 text-base font-medium text-[#0b1d35]"
        >
          Start over
        </button>
      </div>
    </div>
  )
}
