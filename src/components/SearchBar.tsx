import { forwardRef, type Ref } from 'react'
import { SearchIcon } from '@/components/icons'

type SearchBarProps = {
  value?: string
  placeholder: string
  disabled?: boolean
  readOnly?: boolean
  inputTestId?: string
  submitTestId?: string
  onActivate?: () => void
  onChange?: (value: string) => void
  onSubmit?: () => void
}

export const SearchBar = forwardRef(function SearchBar(
  {
    value = '',
    placeholder,
    disabled = false,
    readOnly = false,
    inputTestId,
    submitTestId,
    onActivate,
    onChange,
    onSubmit,
  }: SearchBarProps,
  ref: Ref<HTMLInputElement>,
) {
  const canType = !disabled && !readOnly
  const canSubmit = canType && Boolean(onSubmit)

  return (
    <div className="shrink-0 px-4 pb-6 pt-2">
      <div
        className={`flex items-center gap-3 rounded-full px-5 py-3.5 ${
          disabled || readOnly ? 'bg-gp-surface/60 opacity-90' : 'bg-gp-surface-elevated'
        }`}
      >
        {canType ? (
          <input
            ref={ref}
            type="search"
            enterKeyHint="search"
            data-testid={inputTestId}
            value={value}
            placeholder={placeholder}
            disabled={disabled}
            onChange={(e) => onChange?.(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && canSubmit) {
                e.preventDefault()
                onSubmit?.()
              }
            }}
            className="min-w-0 flex-1 bg-transparent text-base text-gp-text placeholder:text-gp-text-secondary outline-none"
            aria-label={placeholder}
          />
        ) : (
          <button
            type="button"
            disabled={disabled}
            onClick={onActivate}
            className="min-w-0 flex-1 text-left text-base text-gp-text-secondary"
          >
            {placeholder}
          </button>
        )}
        {canSubmit ? (
          <button
            type="button"
            data-testid={submitTestId}
            onClick={() => onSubmit?.()}
            className="touch-target shrink-0 text-gp-text-secondary"
            aria-label="Search"
          >
            <SearchIcon className="h-5 w-5" />
          </button>
        ) : (
          <SearchIcon className="h-5 w-5 shrink-0 text-gp-text-secondary opacity-50" />
        )}
      </div>
    </div>
  )
})
