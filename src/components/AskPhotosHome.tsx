import { useEffect, useRef } from 'react'
import { ClockIcon, SparkleSearchIcon, SparkleIcon } from '@/components/icons'
import { SearchBar } from '@/components/SearchBar'
import { TopBar } from '@/components/TopBar'
import { MAX_QUERY_CHARS } from '@/config'
import { photos } from '@/data/photos'

const HISTORY = ['Delhi', 'Kodaikanal'] as const

const SUGGESTIONS = [
  'List the places that I visited in October',
  'Show me scenic views of mountains',
  'What did I do in October?',
  'Show me my best cooking photos',
] as const

const ENTRY_LABEL = "Can't remember the photo clearly"

const peopleFaces = photos.filter((p) => p.hasPeople && p.src).slice(0, 5)
const petFace = photos.find((p) => p.animals.length > 0 && p.src)
const FACE_SAMPLES = petFace ? [...peopleFaces.slice(0, 5), petFace] : peopleFaces

type AskPhotosHomeProps = {
  queryDraft: string
  clarifierEntry: boolean
  onQueryChange: (text: string) => void
  onClarifierEntryChange: (active: boolean) => void
  onSubmitQuery: (text: string) => void
  onPickQuery: (text: string) => void
}

export function AskPhotosHome({
  queryDraft,
  clarifierEntry,
  onQueryChange,
  onClarifierEntryChange,
  onSubmitQuery,
  onPickQuery,
}: AskPhotosHomeProps) {
  const inputEnabled = clarifierEntry
  const placeholder = clarifierEntry ? 'Describe what you remember' : 'Search or ask'
  const showCounter = queryDraft.length >= MAX_QUERY_CHARS - 30
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (clarifierEntry) searchRef.current?.focus()
  }, [clarifierEntry])

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <TopBar
        trailingLabel={ENTRY_LABEL}
        trailingSelected={clarifierEntry}
        onBack={
          clarifierEntry
            ? () => {
                onClarifierEntryChange(false)
                onQueryChange('')
              }
            : undefined
        }
        trailing={
          <span className="inline-flex min-w-0 items-center gap-1 whitespace-nowrap text-[11px] leading-none text-gp-text-secondary sm:text-xs">
            <SparkleIcon className="h-3.5 w-3.5 shrink-0 text-gp-accent" />
            <span>{ENTRY_LABEL}</span>
            {clarifierEntry ? <span className="shrink-0 text-gp-text-secondary" aria-hidden>✕</span> : null}
          </span>
        }
        onTrailingClick={() => {
          if (clarifierEntry) {
            onClarifierEntryChange(false)
            onQueryChange('')
          } else onClarifierEntryChange(true)
        }}
      />

      <div className="flex-1 overflow-y-auto pb-2">
        {clarifierEntry ? (
          <div
            className="flex flex-1 flex-col px-6 pt-10"
            data-testid="clarifier-query-screen"
          >
            <h2 className="text-xl font-normal leading-snug text-gp-text">
              Describe what you remember
            </h2>
            <p className="mt-3 text-base leading-relaxed text-gp-text-secondary">
              A few details are enough — where it might have been, who was there, or what was in the
              photo.
            </p>
          </div>
        ) : (
          <>
            <div
              className="flex gap-3 overflow-x-auto px-4 py-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              data-testid="home-faces-row"
            >
              {FACE_SAMPLES.map((photo) => (
                <div
                  key={photo.id}
                  className="h-14 w-14 shrink-0 overflow-hidden rounded-full bg-gp-surface ring-1 ring-gp-border"
                >
                  {photo.src ? (
                    <img src={photo.src} alt="" className="h-full w-full object-cover" />
                  ) : null}
                </div>
              ))}
            </div>

            <ul className="divide-y divide-gp-border px-2" data-testid="home-recents-list">
              {HISTORY.map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    onClick={() => onPickQuery(item)}
                    className="flex w-full items-center gap-4 px-3 py-4 text-left text-base text-gp-text"
                  >
                    <ClockIcon className="shrink-0 text-gp-text-secondary" />
                    <span>{item}</span>
                  </button>
                </li>
              ))}
              {SUGGESTIONS.map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    onClick={() => onPickQuery(item)}
                    className="flex w-full items-center gap-4 px-3 py-4 text-left text-base text-gp-text"
                  >
                    <SparkleSearchIcon className="shrink-0 text-gp-text-secondary" />
                    <span className="leading-snug">{item}</span>
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      {showCounter ? (
        <p className="px-4 pb-1 text-right text-xs text-gp-text-secondary">
          {queryDraft.length}/{MAX_QUERY_CHARS}
        </p>
      ) : null}
      <SearchBar
        ref={searchRef}
        value={queryDraft}
        inputTestId="query-input"
        submitTestId="query-submit"
        placeholder={placeholder}
        readOnly={!inputEnabled}
        onChange={(next) => onQueryChange(next.slice(0, MAX_QUERY_CHARS))}
        onSubmit={() => onSubmitQuery(queryDraft)}
      />
    </div>
  )
}
