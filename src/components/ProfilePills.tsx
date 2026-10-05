import type { Attr } from '@/lib/attributes'
import { formatProfileValue } from '@/lib/profileDisplay'
import { useFlowStore } from '@/state/flowStore'

type ProfilePillsProps = {
  mode?: 'clarifier' | 'results'
}

function Pill({ label }: { label: string }) {
  return (
    <span className="inline-flex max-w-full items-center rounded-full bg-gp-surface-elevated px-3 py-1.5 text-sm text-gp-text ring-1 ring-gp-border">
      <span className="truncate">{label}</span>
    </span>
  )
}

export function ProfilePills({ mode = 'clarifier' }: ProfilePillsProps) {
  const profile = useFlowStore((s) => s.profile)
  const keywords = useFlowStore((s) => s.keywords)
  const extractedChips = useFlowStore((s) => s.extractedChips)
  const unapplied = useFlowStore((s) => s.unapplied)
  const answerOrder = useFlowStore((s) => s.answerOrder)

  if (mode === 'clarifier' && extractedChips.length > 0) {
    const understood = extractedChips
      .map((attr) => {
        const fromProfile = profile[attr]
        const soft = unapplied.find((chip) => chip.attr === attr)?.value
        const raw = fromProfile && fromProfile !== 'any' ? fromProfile : soft
        if (!raw) return null
        return { attr, label: formatProfileValue(attr, raw) }
      })
      .filter((item): item is { attr: Attr; label: string } => item !== null)

    if (understood.length === 0) return null

    return (
      <div className="px-4 pb-2">
        <p className="mb-2 text-xs text-gp-text-secondary">Already understood</p>
        <div className="flex flex-wrap gap-2">
          {understood.map((item) => (
            <Pill key={item.attr} label={item.label} />
          ))}
        </div>
      </div>
    )
  }

  const seen = new Set<string>()
  const pills: string[] = []

  for (const attr of answerOrder) {
    const value = profile[attr]
    if (value === undefined || value === 'any') continue
    const label = formatProfileValue(attr, value)
    if (!seen.has(label)) {
      seen.add(label)
      pills.push(label)
    }
  }

  for (const chip of unapplied) {
    const label = formatProfileValue(chip.attr, chip.value)
    if (!seen.has(label)) {
      seen.add(label)
      pills.push(label)
    }
  }

  for (const keyword of keywords) {
    const label = keyword.trim()
    if (label && !seen.has(label)) {
      seen.add(label)
      pills.push(label)
    }
  }

  if (pills.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2 px-4 pb-3">
      {pills.map((label) => (
        <Pill key={label} label={label} />
      ))}
    </div>
  )
}
