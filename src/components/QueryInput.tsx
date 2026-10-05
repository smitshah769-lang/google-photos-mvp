import { useMemo } from 'react'
import { SearchBar } from '@/components/SearchBar'
import { TopBar } from '@/components/TopBar'
import { MAX_QUERY_CHARS } from '@/config'
import { useFlowStore } from '@/state/flowStore'

const PLACEHOLDERS = ['lake', 'me at the beach', 'hotel receipt'] as const

type QueryInputProps = {
  value: string
  onChange: (value: string) => void
}

export function QueryInput({ value, onChange }: QueryInputProps) {
  const submitQuery = useFlowStore((s) => s.submitQuery)
  const classifyLock = useFlowStore((s) => s.classifyLock)
  const placeholder = useMemo(
    () => PLACEHOLDERS[Math.floor(Date.now() / 8000) % PLACEHOLDERS.length],
    [],
  )
  const trimmed = value.trim()
  const showCounter = value.length >= MAX_QUERY_CHARS - 30

  const submit = () => {
    if (!trimmed || classifyLock) return
    void submitQuery(value)
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <TopBar title="Search or ask" />
      <div className="flex flex-1 flex-col justify-end">
        {showCounter ? (
          <p className="px-4 pb-1 text-right text-xs text-gp-text-secondary">
            {value.length}/{MAX_QUERY_CHARS}
          </p>
        ) : null}
        <SearchBar
          value={value}
          inputTestId="query-input"
          placeholder={`Try “${placeholder}”`}
          onChange={(next) => onChange(next.slice(0, MAX_QUERY_CHARS))}
          onSubmit={submit}
        />
        <div className="px-4 pb-4">
          <button
            type="button"
            data-testid="query-submit"
            disabled={!trimmed || classifyLock}
            onClick={submit}
            className="w-full rounded-full bg-gp-accent py-3 text-base font-medium text-[#0b1d35] disabled:opacity-40"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  )
}
