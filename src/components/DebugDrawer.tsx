import { useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Attr, QueryClass } from '@/lib/attributes'
import { formatProfileValue } from '@/lib/profileDisplay'
import { getTemplateQuestion } from '@/data/questions'
import { isMockLlmMode, mockLlmEnvValue, type LlmLogEntry } from '@/lib/llmClient'
import { attributeLabel, useFlowStore, type Stage } from '@/state/flowStore'

const CLASS_LABEL: Record<QueryClass, string> = {
  people: 'People only',
  nonPeople: 'Non-people only',
  both: 'Both people & scene',
  text: 'Text only',
}

const STAGE_LABEL: Partial<Record<Stage, string>> = {
  HOME: 'Home',
  QUERY: 'Query',
  CLASSIFYING: 'Classifying',
  LEVEL1: 'Level 1',
  LEVEL2: 'Level 2',
  LEVEL3: 'Level 3',
  SEARCHING: 'Searching',
  RESULTS: 'Results',
  LOOPBACK: 'Loop-back',
  FALLBACK: 'Fallback',
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-b border-gp-border/60 py-3 last:border-b-0">
      <h3 className="mb-2 text-xs font-medium uppercase tracking-wide text-gp-text-secondary">
        {title}
      </h3>
      {children}
    </section>
  )
}

function KeyValue({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex gap-2 py-0.5 text-sm">
      <span className="w-28 shrink-0 text-gp-text-secondary">{label}</span>
      <span className="min-w-0 flex-1 break-words text-gp-text">{value}</span>
    </div>
  )
}

function formatMs(ms: number): string {
  if (ms < 1000) return `${ms} ms`
  return `${(ms / 1000).toFixed(1)} s`
}

function nextQuestionSummary(entry: LlmLogEntry): string | null {
  if (entry.type !== 'nextQuestion') return null
  const raw = entry.rawResponse
  if (!raw || typeof raw !== 'object' || !('question' in raw)) return null
  const q = String((raw as { question: string }).question).trim()
  return q.length > 48 ? `${q.slice(0, 48)}…` : q
}

function LlmLogBlock({ entry, index }: { entry: LlmLogEntry; index: number }) {
  const [open, setOpen] = useState(index === 0)
  const qSummary = nextQuestionSummary(entry)

  return (
    <div className="rounded-lg bg-gp-bg/80 ring-1 ring-gp-border/80">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-sm"
      >
        <span className="min-w-0 text-gp-text">
          {entry.type}
          {qSummary ? (
            <span className="ml-1 text-gp-text-secondary">· {qSummary}</span>
          ) : null}
          {entry.cached ? (
            <span className="ml-2 rounded bg-slate-800/80 px-1.5 py-0.5 text-[10px] text-slate-200">
              cached
            </span>
          ) : null}
          {entry.fallback ? (
            <span
              className="ml-2 rounded bg-amber-900/40 px-1.5 py-0.5 text-[10px] text-amber-200"
              title={entry.error ?? 'Rule-based backup used instead of model JSON'}
            >
              fallback
            </span>
          ) : null}
        </span>
        <span className="shrink-0 text-xs text-gp-text-secondary">{entry.latencyMs} ms</span>
      </button>
      {open ? (
        <div className="space-y-2 border-t border-gp-border/60 px-3 py-2 text-xs">
          {entry.fallback ? (
            <div className="rounded-md bg-amber-950/60 px-2 py-2 ring-1 ring-amber-800/50">
              <p className="mb-0.5 text-[10px] font-medium uppercase tracking-wide text-amber-200/90">
                Fallback reason
              </p>
              <p className="whitespace-pre-wrap break-words text-amber-50">
                {entry.error ??
                  'Rule-based backup was used; no error string was stored for this entry.'}
              </p>
            </div>
          ) : null}
          {entry.usage ? (
            <p className="text-gp-text-secondary">
              Tokens: {entry.usage.promptTokens ?? '—'} in / {entry.usage.completionTokens ?? '—'}{' '}
              out
              {entry.usage.totalTokens != null ? ` (${entry.usage.totalTokens} total)` : ''}
            </p>
          ) : null}
          {entry.rawRequest ? (
            <div>
              <p className="mb-1 text-gp-text-secondary">Request</p>
              <pre className="max-h-40 overflow-auto rounded bg-black/40 p-2 text-[10px] leading-relaxed text-gp-text">
                {JSON.stringify(entry.rawRequest, null, 2)}
              </pre>
            </div>
          ) : null}
          {entry.rawResponse !== undefined ? (
            <div>
              <p className="mb-1 text-gp-text-secondary">Response</p>
              <pre className="max-h-48 overflow-auto rounded bg-black/40 p-2 text-[10px] leading-relaxed text-gp-text">
                {typeof entry.rawResponse === 'string'
                  ? entry.rawResponse
                  : JSON.stringify(entry.rawResponse, null, 2)}
              </pre>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

type DebugDrawerProps = {
  onClose?: () => void
  className?: string
}

export function DebugDrawer({ onClose, className = '' }: DebugDrawerProps) {
  const stage = useFlowStore((s) => s.stage)
  const query = useFlowStore((s) => s.query)
  const queryClass = useFlowStore((s) => s.queryClass)
  const profile = useFlowStore((s) => s.profile)
  const answered = useFlowStore((s) => s.answered)
  const historyTrail = useFlowStore((s) => s.candidateHistory)
  const candidatesLen = useFlowStore((s) => s.candidates.length)
  const clientMock = isMockLlmMode()
  const [serverStatus, setServerStatus] = useState<{
    configured: boolean
    provider?: string
    model?: string
  } | null>(null)

  useEffect(() => {
    let cancelled = false
    void fetch('/api/llm/status')
      .then((r) => r.json())
      .then((json: { configured: boolean; provider?: string; model?: string }) => {
        if (!cancelled) setServerStatus(json)
      })
      .catch(() => {
        if (!cancelled) setServerStatus({ configured: false })
      })
    return () => {
      cancelled = true
    }
  }, [])
  const llmLog = useFlowStore((s) => s.llmLog)
  const roundQuestions = useFlowStore((s) => s.roundQuestions)
  const loopCount = useFlowStore((s) => s.loopCount)
  const optionTaps = useFlowStore((s) => s.optionTaps)
  const typedCount = useFlowStore((s) => s.typedCount)
  const cantRememberCount = useFlowStore((s) => s.cantRememberCount)
  const submittedAt = useFlowStore((s) => s.submittedAt)
  const resultsAt = useFlowStore((s) => s.resultsAt)
  const overrideLog = useFlowStore((s) => s.overrideLog)
  const keywords = useFlowStore((s) => s.keywords)
  const relaxed = useFlowStore((s) => s.relaxed)
  const startOver = useFlowStore((s) => s.startOver)
  const forceClass = useFlowStore((s) => s.forceClass)

  const [forcePick, setForcePick] = useState<QueryClass | ''>('')

  const historyLine = useMemo(() => {
    const parts = historyTrail.length ? [...historyTrail] : []
    if (parts.length === 0 && candidatesLen > 0) return String(candidatesLen)
    if (parts.length > 0 && parts[parts.length - 1] !== candidatesLen) {
      parts.push(candidatesLen)
    }
    return parts.join(' → ')
  }, [historyTrail, candidatesLen])

  const timeToResults =
    submittedAt && resultsAt ? formatMs(resultsAt - submittedAt) : submittedAt ? 'In progress…' : '—'

  const profileLines = Object.entries(profile).filter(([, v]) => v !== undefined)
  const answeredLines = Object.entries(answered)

  return (
    <div
      className={`flex max-h-[min(844px,100dvh-2rem)] flex-col rounded-gp-card bg-gp-surface text-gp-text ring-1 ring-gp-border ${className}`}
    >
      <div className="flex shrink-0 items-center justify-between gap-2 border-b border-gp-border/60 px-4 py-3">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-sm font-medium">Debug</h2>
          {clientMock ? (
            <span className="rounded-full bg-violet-900/50 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-violet-200">
              Mock (client)
            </span>
          ) : serverStatus?.configured ? (
            <span className="rounded-full bg-emerald-900/40 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-emerald-200">
              Live · {serverStatus.provider ?? 'LLM'}
            </span>
          ) : (
            <span className="rounded-full bg-amber-900/50 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-amber-200">
              Live client · no server key
            </span>
          )}
        </div>
        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            className="touch-target rounded-full px-2 text-sm text-gp-text-secondary"
            aria-label="Close debug panel"
          >
            ✕
          </button>
        ) : null}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-4">
        <Section title="Flow">
          <KeyValue label="VITE_USE_MOCK_LLM" value={mockLlmEnvValue()} />
          <KeyValue
            label="Server LLM"
            value={
              serverStatus === null
                ? 'Checking…'
                : serverStatus.configured
                  ? `${serverStatus.provider ?? '?'} · ${serverStatus.model ?? '?'}`
                  : 'Not configured (add LLM_API_KEY, restart dev server)'
            }
          />
          <KeyValue
            label="App URL"
            value={typeof window !== 'undefined' ? window.location.origin : '—'}
          />
          <KeyValue label="Stage" value={STAGE_LABEL[stage] ?? stage} />
          {roundQuestions.length > 0 ? (
            <div className="mt-2 space-y-1 border-t border-gp-border/40 pt-2">
              <p className="text-[10px] font-medium uppercase tracking-wide text-gp-text-secondary">
                Questions on screen
              </p>
              <ul className="space-y-1 text-xs">
                {roundQuestions.map((rq) => {
                  const template = getTemplateQuestion(rq.attr)
                  const isTemplate = rq.question.trim() === template
                  return (
                    <li key={rq.attr} className="break-words">
                      <span className="text-gp-text-secondary">{attributeLabel(rq.attr)}:</span>{' '}
                      {rq.question}
                      {isTemplate ? (
                        <span className="ml-1 rounded bg-amber-900/40 px-1 text-[10px] text-amber-200">
                          template
                        </span>
                      ) : (
                        <span className="ml-1 rounded bg-emerald-900/40 px-1 text-[10px] text-emerald-200">
                          LLM
                        </span>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          ) : null}
          <KeyValue label="Query" value={query || '—'} />
          <KeyValue
            label="Class"
            value={queryClass ? CLASS_LABEL[queryClass] : '—'}
          />
          <KeyValue label="Candidates" value={historyLine || '—'} />
          <KeyValue label="Time to results" value={timeToResults} />
        </Section>

        <Section title="Answers">
          <KeyValue label="Tapped" value={optionTaps} />
          <KeyValue label="Typed" value={typedCount} />
          <KeyValue label="Can't remember" value={cantRememberCount} />
          <KeyValue label="Loop-backs" value={loopCount} />
        </Section>

        <Section title="Profile">
          {profileLines.length === 0 && keywords.length === 0 ? (
            <p className="text-sm text-gp-text-secondary">Empty</p>
          ) : (
            <ul className="space-y-1 text-sm">
              {profileLines.map(([attr, value]) => (
                <li key={attr}>
                  <span className="text-gp-text-secondary">{attributeLabel(attr as Attr)}:</span>{' '}
                  {value === 'any' ? (
                    <span className="italic text-gp-text-secondary">any</span>
                  ) : (
                    formatProfileValue(attr as Attr, value)
                  )}
                </li>
              ))}
              {keywords.map((kw) => (
                <li key={kw}>
                  <span className="text-gp-text-secondary">Keyword:</span> {kw}
                </li>
              ))}
            </ul>
          )}
          {answeredLines.length > 0 ? (
            <div className="mt-2 border-t border-gp-border/40 pt-2">
              <p className="mb-1 text-xs text-gp-text-secondary">Answered state</p>
              <ul className="space-y-0.5 text-xs">
                {answeredLines.map(([attr, kind]) => (
                  <li key={attr}>
                    {attributeLabel(attr as Attr)} →{' '}
                    {kind === 'any' ? "can't remember" : 'value'}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {relaxed.length > 0 ? (
            <p className="mt-2 text-xs text-gp-text-secondary">
              Relaxed: {relaxed.map((a) => attributeLabel(a)).join(', ')}
            </p>
          ) : null}
        </Section>

        {overrideLog.length > 0 ? (
          <Section title="Class overrides">
            <ul className="space-y-1 text-xs text-gp-text-secondary">
              {overrideLog.map((entry, i) => (
                <li key={i}>
                  {entry.from ?? '—'} → {entry.to}
                </li>
              ))}
            </ul>
          </Section>
        ) : null}

        <Section title="Force class">
          <div className="flex flex-col gap-2">
            <select
              value={forcePick}
              disabled={!query.trim()}
              onChange={(e) => setForcePick(e.target.value as QueryClass | '')}
              className="w-full rounded-lg bg-gp-bg px-3 py-2 text-sm text-gp-text ring-1 ring-gp-border disabled:opacity-50"
            >
              <option value="">Choose class…</option>
              {(Object.keys(CLASS_LABEL) as QueryClass[]).map((key) => (
                <option key={key} value={key}>
                  {CLASS_LABEL[key]}
                </option>
              ))}
            </select>
            <button
              type="button"
              disabled={!forcePick || !query.trim()}
              onClick={() => {
                if (!forcePick) return
                void forceClass(forcePick)
                setForcePick('')
              }}
              className="rounded-full bg-gp-surface-elevated py-2 text-sm text-gp-accent ring-1 ring-gp-border disabled:opacity-40"
            >
              Apply force class
            </button>
          </div>
        </Section>

        <Section title="LLM calls">
          {llmLog.length === 0 ? (
            <p className="text-sm text-gp-text-secondary">No calls yet</p>
          ) : (
            <div className="space-y-2">
              {[...llmLog].reverse().map((entry, index) => (
                <LlmLogBlock key={`${entry.type}-${entry.requestId}-${index}`} entry={entry} index={index} />
              ))}
            </div>
          )}
        </Section>
      </div>

      <div className="shrink-0 border-t border-gp-border/60 p-4">
        <button
          type="button"
          onClick={() => startOver()}
          className="w-full rounded-full bg-gp-accent py-2.5 text-sm font-medium text-[#0b1d35]"
        >
          Reset
        </button>
      </div>
    </div>
  )
}
