import { useEffect } from 'react'
import { useFlowStore } from '@/state/flowStore'

export function Toast() {
  const toast = useFlowStore((s) => s.toast)
  const dismissToast = useFlowStore((s) => s.dismissToast)

  useEffect(() => {
    if (!toast) return
    const id = window.setTimeout(() => dismissToast(), 4000)
    return () => window.clearTimeout(id)
  }, [toast, dismissToast])

  if (!toast) return null

  return (
    <div className="pointer-events-none absolute inset-x-3 top-14 z-50 flex justify-center">
      <p
        role="status"
        className="pointer-events-auto max-w-full rounded-full bg-gp-surface-elevated px-4 py-2.5 text-center text-sm text-gp-text shadow-lg ring-1 ring-gp-border"
      >
        {toast}
      </p>
    </div>
  )
}
