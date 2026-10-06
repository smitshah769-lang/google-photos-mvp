import { useEffect, useState } from 'react'
import { SparkleIcon } from '@/components/icons'
import { TopBar } from '@/components/TopBar'
import { useFlowStore } from '@/state/flowStore'

type ClassifyingScreenProps = {
  message?: string
}

function SkeletonBars() {
  return (
    <div className="mt-5 flex w-full max-w-[17rem] flex-col gap-3" aria-hidden>
      <div className="h-3 w-full rounded-full bg-gp-surface-elevated" />
      <div className="h-3 w-[72%] rounded-full bg-gp-surface-elevated" />
      <div className="h-3 w-[42%] rounded-full bg-gp-surface-elevated" />
    </div>
  )
}

export function ClassifyingScreen({
  message = "Understanding what you're looking for…",
}: ClassifyingScreenProps) {
  const query = useFlowStore((s) => s.query)
  const [slow, setSlow] = useState(false)

  useEffect(() => {
    const id = window.setTimeout(() => setSlow(true), 3000)
    return () => window.clearTimeout(id)
  }, [])

  return (
    <div className="flex min-h-0 flex-1 flex-col" data-testid="classifying-screen">
      <TopBar />
      <div className="flex flex-1 flex-col px-4 pb-8 pt-2">
        {query ? (
          <div className="flex justify-end">
            <p className="max-w-[85%] rounded-[1.25rem] bg-gp-surface-elevated px-4 py-2.5 text-base text-gp-text">
              {query}
            </p>
          </div>
        ) : null}

        <div className="mt-8 flex flex-col items-start">
          <div className="flex items-start gap-2 text-gp-accent">
            <SparkleIcon className="mt-0.5 h-[18px] w-[18px] shrink-0" />
            <p className="text-base leading-snug">{message}</p>
          </div>
          <SkeletonBars />
          {slow ? (
            <p className="mt-6 text-sm text-gp-text-secondary">Taking longer than usual…</p>
          ) : null}
        </div>
      </div>
    </div>
  )
}
