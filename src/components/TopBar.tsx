import { type ReactNode } from 'react'
import { ChevronBackIcon } from '@/components/icons'
import { useFlowStore } from '@/state/flowStore'

type TopBarProps = {
  title?: string
  trailing?: ReactNode
  trailingStyle?: 'chip' | 'link'
  trailingLabel?: string
  trailingSelected?: boolean
  onTrailingClick?: () => void
  onBack?: () => void
}

export function TopBar({
  title,
  trailing,
  trailingStyle = 'chip',
  trailingLabel,
  trailingSelected = false,
  onTrailingClick,
  onBack,
}: TopBarProps) {
  const back = useFlowStore((s) => s.back)
  const handleBack = onBack ?? back

  return (
    <header className="flex shrink-0 items-center gap-2 px-2 pt-2 pb-1">
      <button
        type="button"
        onClick={() => handleBack()}
        className="touch-target flex items-center justify-center rounded-full text-gp-text"
        aria-label="Back"
      >
        <ChevronBackIcon />
      </button>
      {title ? (
        <h1 className="min-w-0 flex-1 truncate pr-2 text-base font-normal text-gp-text">{title}</h1>
      ) : (
        <span className="flex-1" />
      )}
      {trailing ? (
        trailingStyle === 'chip' && !trailingSelected ? (
          <div className="chip-moving-outline mr-1 max-w-[min(100%,17rem)] shrink-0 rounded-full">
            <button
              type="button"
              aria-label={trailingLabel}
              onClick={onTrailingClick}
              className="touch-target inline-flex w-full items-center rounded-full border border-transparent bg-gp-surface px-2.5 py-1.5 text-left"
            >
              {trailing}
            </button>
          </div>
        ) : (
          <button
            type="button"
            aria-label={trailingLabel}
            onClick={onTrailingClick}
            className={
              trailingStyle === 'link'
                ? 'touch-target shrink-0 px-2 py-1 text-sm text-gp-accent'
                : `touch-target mr-1 inline-flex max-w-[min(100%,17rem)] shrink-0 items-center rounded-full border px-2.5 py-1.5 text-left ${
                    trailingSelected
                      ? 'border-gp-accent bg-gp-surface-elevated'
                      : 'border-gp-border'
                  }`
            }
          >
            {trailing}
          </button>
        )
      ) : null}
    </header>
  )
}
