import { TypedAnswerInput } from '@/components/TypedAnswerInput'
import { LoopBackCard } from '@/components/LoopBackCard'
import { TopBar } from '@/components/TopBar'
import { BottomSheet } from '@/components/BottomSheet'
import { ClarifierLoadingOverlay } from '@/components/ClarifierLoadingOverlay'
import { EARLY_STOP_AT } from '@/config'
import { formatOptionLabel } from '@/lib/profileDisplay'
import { optionWouldMatch, previewCount } from '@/lib/roundPreview'
import { useFlowStore, type RoundQuestion } from '@/state/flowStore'

function RoundQuestionBlock({
  question,
  disabled,
}: {
  question: RoundQuestion
  disabled: boolean
}) {
  const roundDraft = useFlowStore((s) => s.roundDraft)
  const profile = useFlowStore((s) => s.profile)
  const keywords = useFlowStore((s) => s.keywords)
  const candidates = useFlowStore((s) => s.candidates)
  const pool = useFlowStore((s) => s.pool)
  const detailOpenAttr = useFlowStore((s) => s.detailOpenAttr)
  const detailConfirm = useFlowStore((s) => s.detailConfirm)
  const toggleRoundOption = useFlowStore((s) => s.toggleRoundOption)
  const roundCantRemember = useFlowStore((s) => s.roundCantRemember)
  const openDetailFor = useFlowStore((s) => s.openDetailFor)

  const selected = roundDraft[question.attr]
  const detailOpen = detailOpenAttr === question.attr

  return (
    <section className="mb-5 px-4" aria-labelledby={`q-${question.attr}`}>
      <h2 id={`q-${question.attr}`} className="mb-2.5 text-base font-medium text-gp-text">
        {question.question}
      </h2>
      <div className="flex flex-wrap gap-2">
        {question.options.map((value) => {
          const isSel = selected === value
          const dimmed =
            !isSel &&
            !optionWouldMatch(pool, profile, keywords, candidates, roundDraft, question.attr, value)
          return (
            <button
              key={value}
              type="button"
              disabled={disabled}
              onClick={() => toggleRoundOption(question.attr, value)}
              className={`touch-target inline-flex min-h-10 max-w-full items-center justify-center rounded-full px-4 py-2 text-sm leading-snug ${
                isSel
                  ? 'bg-[#394457] text-[#d3e3fd]'
                  : dimmed
                    ? 'bg-gp-surface-elevated text-gp-text opacity-35 ring-1 ring-gp-border'
                    : 'bg-gp-surface-elevated text-gp-text ring-1 ring-gp-border'
              } disabled:opacity-50`}
            >
              <span className="line-clamp-2">{formatOptionLabel(question.attr, value)}</span>
            </button>
          )
        })}
        <button
          type="button"
          disabled={disabled}
          onClick={() => openDetailFor(question.attr)}
          className="touch-target inline-flex min-h-10 items-center rounded-full bg-gp-surface-elevated px-4 py-2 text-sm text-gp-accent ring-1 ring-transparent"
        >
          ✎ Add detail
        </button>
        <button
          type="button"
          disabled={disabled}
          onClick={() => roundCantRemember(question.attr)}
          className={`touch-target inline-flex min-h-10 items-center rounded-full px-4 py-2 text-sm ${
            selected === 'any'
              ? 'bg-[#394457] text-[#d3e3fd]'
              : 'border border-dashed border-gp-border text-gp-text-secondary'
          }`}
        >
          Can&apos;t remember
        </button>
      </div>

      {detailOpen ? (
        <div className="mt-3">
          <TypedAnswerInput disabled={disabled} />
          {detailConfirm ? (
            <p className="mt-2 text-xs text-gp-text-secondary">{detailConfirm}</p>
          ) : null}
        </div>
      ) : null}
    </section>
  )
}

export function ClarifierCard() {
  const query = useFlowStore((s) => s.query)
  const level = useFlowStore((s) => s.level)
  const roundQuestions = useFlowStore((s) => s.roundQuestions)
  const roundDraft = useFlowStore((s) => s.roundDraft)
  const profile = useFlowStore((s) => s.profile)
  const keywords = useFlowStore((s) => s.keywords)
  const candidates = useFlowStore((s) => s.candidates)
  const pool = useFlowStore((s) => s.pool)
  const cardLoading = useFlowStore((s) => s.cardLoading)
  const pendingKeyword = useFlowStore((s) => s.pendingKeyword)
  const yearHint = useFlowStore((s) => s.yearHint)

  const submitRound = useFlowStore((s) => s.submitRound)
  const showResultsNow = useFlowStore((s) => s.showResultsNow)
  const notFound = useFlowStore((s) => s.notFound)
  const loopBusy = useFlowStore((s) => s.loopBusy)
  const resolvePendingKeyword = useFlowStore((s) => s.resolvePendingKeyword)

  const disabled = Boolean(pendingKeyword)
  const preview = previewCount(pool, profile, keywords, candidates, roundDraft)
  const showPhotoCta = level >= 2
  const showNotFound = candidates.length > EARLY_STOP_AT
  const photoLabel =
    preview === 1 ? 'Show 1 photo' : preview === 0 ? 'Show results' : `Show ${preview} photos`
  const loadingMessage =
    roundQuestions.length === 0 ? 'Loading questions…' : 'Updating your results…'

  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      {cardLoading ? <ClarifierLoadingOverlay message={loadingMessage} /> : null}

      <TopBar
        title={query}
        trailing="Skip"
        trailingStyle="link"
        onTrailingClick={() => showResultsNow()}
      />
      <LoopBackCard />

      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto pt-2">
        {yearHint ? (
          <p className="px-4 pb-2 text-center text-xs text-gp-text-secondary">{yearHint}</p>
        ) : null}

        {cardLoading && roundQuestions.length === 0 ? (
          <div className="space-y-6 px-4 pt-4" aria-hidden>
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className="space-y-3">
                <div className="h-4 w-40 animate-pulse rounded bg-gp-surface-elevated" />
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 3 }, (_, j) => (
                    <div key={j} className="h-10 w-24 animate-pulse rounded-full bg-gp-surface-elevated" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          roundQuestions.map((question) => (
            <RoundQuestionBlock key={question.attr} question={question} disabled={disabled} />
          ))
        )}
      </div>

      <div className="shrink-0 px-4 pb-6 pt-2">
        <button
          type="button"
          disabled={disabled}
          data-testid="submit-round"
          onClick={() => void submitRound()}
          className="w-full rounded-full bg-gp-accent py-3.5 text-base font-medium text-[#0b1d35] disabled:opacity-40"
        >
          {showPhotoCta ? photoLabel : 'Continue'}
        </button>
        {showPhotoCta ? (
          <p className="mt-2 text-center text-xs text-gp-text-secondary" data-testid="match-count">
            {preview} photo{preview === 1 ? '' : 's'} match
          </p>
        ) : null}
        {showNotFound ? (
          <button
            type="button"
            disabled={disabled || loopBusy}
            data-testid="not-found-photo"
            onClick={() => void notFound()}
            className="mt-3 w-full rounded-full border border-gp-border bg-gp-surface-elevated py-3.5 text-base font-medium text-gp-text shadow-sm ring-1 ring-gp-border/80 transition-opacity disabled:opacity-50"
          >
            {loopBusy ? 'Loading…' : 'I did not find the photo'}
          </button>
        ) : null}
      </div>

      <BottomSheet
        open={Boolean(pendingKeyword)}
        ariaLabel="Keyword confirmation"
        onBackdropClick={() => void resolvePendingKeyword(false)}
      >
        <p className="mb-4 text-sm text-gp-text">
          Nothing matched &lsquo;{pendingKeyword}&rsquo;. Keep it, or remove it?
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            className="flex-1 rounded-full bg-gp-accent py-3 text-sm font-medium text-[#0b1d35]"
            onClick={() => void resolvePendingKeyword(false)}
          >
            Remove
          </button>
          <button
            type="button"
            className="flex-1 rounded-full bg-gp-surface py-3 text-sm text-gp-text ring-1 ring-gp-border"
            onClick={() => void resolvePendingKeyword(true)}
          >
            Keep
          </button>
        </div>
      </BottomSheet>
    </div>
  )
}
