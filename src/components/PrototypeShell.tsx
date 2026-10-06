import { type ReactNode, useEffect, useState } from 'react'
import { DebugDrawer } from '@/components/DebugDrawer'
import { PHONE_WIDTH } from '@/components/PhoneFrame'
import { SHOW_DEBUG_PANEL } from '@/config'

/** Side-by-side when viewport fits phone + drawer (E-12.6). */
const DOCK_BREAKPOINT = PHONE_WIDTH + 400

type PrototypeShellProps = {
  children: ReactNode
}

export function PrototypeShell({ children }: PrototypeShellProps) {
  const [dock, setDock] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth >= DOCK_BREAKPOINT : false,
  )
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onResize = () => {
      const nextDock = window.innerWidth >= DOCK_BREAKPOINT
      setDock(nextDock)
      if (nextDock) setMobileOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <div className="min-h-dvh bg-gp-bg">
      <div
        className={`flex w-full min-h-dvh ${
          dock ? 'flex-row items-start justify-center gap-6 px-4 py-6 sm:py-10' : 'flex-col items-center'
        }`}
      >
        {children}
        {SHOW_DEBUG_PANEL && dock ? (
          <aside className="w-[min(100%,380px)] shrink-0" aria-label="Debug panel">
            <DebugDrawer className="sticky top-6 w-full" />
          </aside>
        ) : null}
      </div>

      {SHOW_DEBUG_PANEL && !dock ? (
        <>
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="fixed bottom-5 right-4 z-30 rounded-full bg-gp-surface-elevated px-4 py-2.5 text-sm font-medium text-gp-text shadow-lg ring-1 ring-gp-border"
          >
            Debug
          </button>
          {mobileOpen ? (
            <>
              <button
                type="button"
                aria-label="Close debug overlay"
                className="fixed inset-0 z-40 bg-black/50"
                onClick={() => setMobileOpen(false)}
              />
              <aside className="fixed inset-y-0 right-0 z-50 flex w-[min(100%,360px)] flex-col p-3 shadow-2xl">
                <DebugDrawer className="h-full w-full" onClose={() => setMobileOpen(false)} />
              </aside>
            </>
          ) : null}
        </>
      ) : null}
    </div>
  )
}
