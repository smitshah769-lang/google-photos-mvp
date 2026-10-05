import { useLayoutEffect, useRef } from 'react'
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

type ResultsGridProps = {
  /** Keep mounted under the viewer so scroll position is preserved (E-8.7). */
  hidden?: boolean
}

export function ResultsGrid({ hidden = false }: ResultsGridProps) {
  const query = useFlowStore((s) => s.query)
  const candidates = useFlowStore((s) => s.candidates)
  const baselineCount = useFlowStore((s) => s.baselineCount)
  const resultsScrollTop = useFlowStore((s) => s.resultsScrollTop)
  const openPhoto = useFlowStore((s) => s.openPhoto)
  const notFound = useFlowStore((s) => s.notFound)
  const startOver = useFlowStore((s) => s.startOver)
  const loopBusy = useFlowStore((s) => s.loopBusy)
  const scrollRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (hidden) return
    const el = scrollRef.current
    if (!el) return
    el.scrollTop = resultsScrollTop
  }, [hidden, resultsScrollTop, candidates.length])

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
    <div
      className={`flex min-h-0 flex-1 flex-col ${hidden ? 'pointer-events-none invisible absolute inset-0 -z-10 overflow-hidden' : ''}`}
      aria-hidden={hidden}
    >
      <TopBar title={query} />
      <div className="px-4 pb-2">
        <h2 className="text-lg text-gp-text">
          {count} photo{count === 1 ? '' : 's'} match
        </h2>
      </div>
      <ComparisonChip />
      <ProfilePills mode="results" />

      <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto">
        <div className="grid grid-cols-3 gap-0.5 px-0.5 pb-24">
          {candidates.map((photo) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => {
                const scrollTop = scrollRef.current?.scrollTop ?? 0
                openPhoto(photo.id, scrollTop)
              }}
              className="aspect-square overflow-hidden bg-gp-surface text-left"
            >
              <PhotoCard photo={photo} variant="grid" className="h-full w-full" />
            </button>
          ))}
        </div>
      </div>

      <div className="shrink-0 border-t border-gp-border/60 bg-gp-bg px-4 py-3">
        <button
          type="button"
          disabled={loopBusy}
          onClick={() => void notFound()}
          className="w-full rounded-full py-3 text-sm text-gp-text-secondary disabled:opacity-50"
        >
          I did not find the photo
        </button>
      </div>
    </div>
  )
}
