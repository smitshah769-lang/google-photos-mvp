import { photos } from '@/data/photos'
import { libraryIntegrity, hasPeopleMetadataMismatch } from '@/lib/libraryChecks'
import { semanticBaselineCount } from '@/lib/semanticBaseline'
import { PhotoCard } from '@/components/PhotoCard'

const BASELINE_QUERIES = [
  'lake',
  'sunset',
  'dog',
  'beach',
  'Diwali',
  'hotel receipt',
] as const

const integrity = libraryIntegrity(photos)

export function DevLibrary() {
  return (
    <div className="min-h-dvh bg-gp-bg px-4 py-6 text-gp-text">
      <header className="mx-auto mb-6 max-w-6xl">
        <h1 className="text-xl font-medium">Library dev grid</h1>
        <p className="mt-1 text-sm text-gp-text-secondary">
          {photos.length} entries · Phase 2 semantic baselines (computed)
        </p>

        <ul className="mt-3 flex flex-wrap gap-2 text-xs text-gp-text-secondary">
          {BASELINE_QUERIES.map((q) => (
            <li
              key={q}
              className="rounded-full border border-gp-border bg-gp-surface px-2.5 py-1"
            >
              <span className="text-gp-text">{q}</span>: {semanticBaselineCount(q, photos)}
            </li>
          ))}
        </ul>

        <div className="mt-4 flex flex-col gap-2 rounded-gp-card border border-gp-border bg-gp-surface p-4 text-sm">
          <IntegrityRow
            ok={integrity.countOk}
            label={`Entry count is ${integrity.expectedSize}`}
            detail={
              integrity.countOk
                ? undefined
                : `Found ${integrity.count}; expected ${integrity.expectedSize}.`
            }
          />
          <IntegrityRow
            ok={integrity.unique && integrity.duplicateIds.length === 0}
            label="All ids unique"
            detail={
              integrity.duplicateIds.length > 0
                ? `Duplicates: ${integrity.duplicateIds.join(', ')}`
                : undefined
            }
          />
          <IntegrityRow
            ok={integrity.peopleMismatches.length === 0}
            label="No hasPeople / peopleCount mismatches"
            detail={
              integrity.peopleMismatches.length > 0
                ? `Flagged: ${integrity.peopleMismatches.join(', ')}`
                : undefined
            }
          />
        </div>
      </header>

      <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {photos.map((photo) => {
          const mismatch = hasPeopleMetadataMismatch(photo)
          return (
            <li
              key={photo.id}
              className={`rounded-gp-card border bg-gp-surface p-2 ${
                mismatch ? 'border-red-500/80' : 'border-gp-border'
              }`}
            >
              <PhotoCard photo={photo} variant="grid" className="w-full rounded-lg" />
              <dl className="mt-2 space-y-0.5 text-[11px] leading-snug text-gp-text-secondary">
                <div className="flex justify-between gap-2 font-medium text-gp-text">
                  <dt className="sr-only">Id</dt>
                  <dd>{photo.id}</dd>
                  {mismatch && (
                    <span className="shrink-0 text-red-400" title="E-11.6">
                      people mismatch
                    </span>
                  )}
                </div>
                <div>
                  <dt className="inline">Date: </dt>
                  <dd className="inline">{photo.date}</dd>
                </div>
                <div>
                  <dt className="inline">Location: </dt>
                  <dd className="inline">{photo.location}</dd>
                </div>
                <div>
                  <dt className="inline">People: </dt>
                  <dd className="inline">
                    {photo.peopleCount} (hasPeople={String(photo.hasPeople)})
                  </dd>
                </div>
                <div>
                  <dt className="inline">Objects: </dt>
                  <dd className="inline line-clamp-2">
                    {photo.objects.length ? photo.objects.join(', ') : '—'}
                  </dd>
                </div>
              </dl>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function IntegrityRow({
  ok,
  label,
  detail,
}: {
  ok: boolean
  label: string
  detail?: string
}) {
  return (
    <div className={ok ? 'text-gp-text' : 'text-red-400'}>
      <span aria-hidden>{ok ? '✓' : '✗'} </span>
      {label}
      {detail && <span className="mt-0.5 block text-gp-text-secondary">{detail}</span>}
    </div>
  )
}
