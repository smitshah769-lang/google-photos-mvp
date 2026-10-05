import { TopBar } from '@/components/TopBar'
import { useFlowStore } from '@/state/flowStore'

/** S9 — after two loop-backs (FR-13). */
export function FallbackScreen() {
  const query = useFlowStore((s) => s.query)
  const startOver = useFlowStore((s) => s.startOver)

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <TopBar title={query || 'Search'} />
      <div className="flex flex-1 flex-col items-center justify-center px-6">
        <article className="w-full max-w-sm rounded-gp-card bg-gp-surface px-6 py-8 text-center ring-1 ring-gp-border">
          <h2 className="mb-2 text-xl font-normal text-gp-text">Still not found?</h2>
          <p className="mb-6 text-sm leading-relaxed text-gp-text-secondary">
            We tried narrowing your search a couple of different ways. You can browse by place or
            start a fresh search.
          </p>
          <button
            type="button"
            disabled
            className="mb-4 w-full rounded-full py-3 text-base text-gp-accent opacity-50"
            aria-disabled
          >
            Browse by Places
          </button>
          <button
            type="button"
            onClick={() => startOver()}
            className="w-full rounded-full bg-gp-accent py-3.5 text-base font-medium text-[#0b1d35]"
          >
            Start over
          </button>
        </article>
      </div>
    </div>
  )
}
