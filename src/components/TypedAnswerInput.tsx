import { useEffect, useRef } from 'react'
import { SendIcon } from '@/components/icons'
import { MAX_QUERY_CHARS } from '@/config'
import { useKeepInputAboveKeyboard } from '@/hooks/useKeepInputAboveKeyboard'
import { useFlowStore } from '@/state/flowStore'

type TypedAnswerInputProps = {
  disabled?: boolean
}

export function TypedAnswerInput({ disabled = false }: TypedAnswerInputProps) {
  const draft = useFlowStore((s) => s.typedDraft)
  const placeholder = useFlowStore((s) => s.typedPlaceholder)
  const setTypedDraft = useFlowStore((s) => s.setTypedDraft)
  const submitTyped = useFlowStore((s) => s.submitTyped)
  const somewhereElse = useFlowStore((s) => s.somewhereElse)
  const inputRef = useRef<HTMLInputElement>(null)
  useKeepInputAboveKeyboard(inputRef)

  useEffect(() => {
    if (somewhereElse) inputRef.current?.focus()
  }, [somewhereElse])

  const canSend = draft.trim().length > 0 && !disabled

  return (
    <div className="pb-1">
      <div className="flex items-center gap-2 rounded-full bg-gp-surface-elevated px-3 py-2 ring-1 ring-gp-border">
        <input
          ref={inputRef}
          type="text"
          data-testid="typed-answer-input"
          value={draft}
          disabled={disabled}
          maxLength={MAX_QUERY_CHARS}
          placeholder={placeholder}
          onChange={(e) => setTypedDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && canSend) {
              e.preventDefault()
              void submitTyped(draft)
            }
          }}
          className="min-w-0 flex-1 bg-transparent text-sm text-gp-text placeholder:text-gp-text-secondary outline-none"
        />
        <button
          type="button"
          disabled={!canSend}
          onClick={() => void submitTyped(draft)}
          className="touch-target flex items-center justify-center rounded-full text-gp-accent disabled:opacity-40"
          aria-label="Send typed answer"
        >
          <SendIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
