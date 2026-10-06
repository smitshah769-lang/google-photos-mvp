import { PhotoCard } from '@/components/PhotoCard'
import { ProfilePills } from '@/components/ProfilePills'
import { TopBar } from '@/components/TopBar'
import { useFlowStore } from '@/state/flowStore'

function ComparisonChip() {
  const count = useFlowStore((s) => s.candidates.length)
  const baseline = useFlowStore((s) => s.baselineCount)

  if (baseline === null || baseline <= 0) return null
  if (count > baseline) {
    return (
      <p className="px-4 pb-2 text-sm text-gp-text-secondary">
        {count} result{count === 1 ? '' : 's'}
      </p>
    )
  }

  return (
    <p className="px-4 pb-2 text-sm text-gp-text-secondary">
      Without clarifier: {baseline} → With clarifier: {count}
    </p>
  )
}

export function ResultsGrid() {
  const query = useFlowStore((s) => s.query)
  const candidates = useFlowStore((s) => s.candidates)
  const baselineCount = useFlowStore((s) => s.baselineCount)
  const notFound = useFlowStore((s) => s.notFound)
  const startOver = useFlowStore((s) => s.startOver)
  const loopBusy = useFlowStore((s) => s.loopBusy)

  const count = candidates.length
  const emptyBaseline = count === 0 && (baselineCount ?? 0) === 0

  if (emptyBaseline) {
    return (
      <div className="flex min-h-0 flex-1 flex-col">
        <TopBar title={query} />
        <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
          <p className="mb-6 text-base text-gp-text">
            No photos matched &lsquo;{query}&rsquo;.
          </p>
          <button
            type="button"
            onClick={() => startOver()}
            className="mb-3 w-full max-w-xs rounded-full bg-gp-accent py-3 text-base font-medium text-[#0b1d35]"
          >
            Start over
          </button>
          <button
            type="button"
            disabled
            className="w-full max-w-xs rounded-full py-3 text-base text-gp-text-secondary opacity-60"
          >
            Browse by Places
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <TopBar title={query} />
      <div className="px-4 pb-2">
        <h2 className="text-lg text-gp-text">
          {count} photo{count === 1 ? '' : 's'} match
        </h2>
      </div>
      <ComparisonChip />
      <ProfilePills mode="results" />

      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="grid grid-cols-3 gap-0.5 px-0.5 pb-24">
          {candidates.map((photo) => (
            <div key={photo.id} className="aspect-square overflow-hidden bg-gp-surface">
              <PhotoCard photo={photo} variant="grid" className="h-full w-full" />
            </div>
          ))}
        </div>
      </div>

      <div className="shrink-0 border-t border-gp-border bg-gp-bg px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <button
          type="button"
          disabled={loopBusy}
          data-testid="not-found-photo"
          onClick={() => void notFound()}
          className="w-full rounded-full border border-gp-border bg-gp-surface-elevated py-3.5 text-base font-medium text-gp-text shadow-sm ring-1 ring-gp-border/80 transition-opacity disabled:opacity-50"
        >
          {loopBusy ? 'Loading…' : 'I did not find the photo'}
        </button>
      </div>
    </div>
  )
}
