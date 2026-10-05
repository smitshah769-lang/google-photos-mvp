import { useEffect, useState } from 'react'
import { TopBar } from '@/components/TopBar'

type ClassifyingScreenProps = {
  message?: string
}

export function ClassifyingScreen({
  message = "Understanding what you're looking for…",
}: ClassifyingScreenProps) {
  const [slow, setSlow] = useState(false)

  useEffect(() => {
    const id = window.setTimeout(() => setSlow(true), 3000)
    return () => window.clearTimeout(id)
  }, [])

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <TopBar />
      <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
        <div className="mb-6 h-2 w-48 overflow-hidden rounded-full bg-gp-surface">
          <div className="h-full w-1/3 animate-[shimmer_1.2s_ease-in-out_infinite] rounded-full bg-gp-accent/70" />
        </div>
        <p className="text-base text-gp-text-secondary">{message}</p>
        {slow ? (
          <p className="mt-2 text-sm text-gp-text-secondary">Taking longer than usual…</p>
        ) : null}
      </div>
    </div>
  )
}
