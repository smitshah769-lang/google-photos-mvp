import { type ReactNode, useEffect, useState } from 'react'

/** Logical phone viewport (PRD §7, E-12.4). */
export const PHONE_WIDTH = 390
export const PHONE_HEIGHT = 844

type PhoneFrameProps = {
  children?: ReactNode
}

export function PhoneFrame({ children }: PhoneFrameProps) {
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const updateScale = () => {
      const viewportWidth = window.innerWidth
      setScale(viewportWidth < PHONE_WIDTH ? viewportWidth / PHONE_WIDTH : 1)
    }

    updateScale()
    window.addEventListener('resize', updateScale)
    return () => window.removeEventListener('resize', updateScale)
  }, [])

  const outerWidth = PHONE_WIDTH * scale
  const outerHeight = PHONE_HEIGHT * scale

  return (
    <div className="flex min-h-dvh w-full justify-center overflow-x-hidden bg-gp-bg px-0 py-6 sm:py-10">
      <div
        className="relative shrink-0"
        style={{ width: outerWidth, height: outerHeight }}
      >
        <div
          className="absolute left-0 top-0 overflow-hidden rounded-[2rem] border border-gp-border bg-gp-surface shadow-[0_24px_80px_rgba(0,0,0,0.55)]"
          style={{
            width: PHONE_WIDTH,
            height: PHONE_HEIGHT,
            transform: scale < 1 ? `scale(${scale})` : undefined,
            transformOrigin: 'top left',
          }}
        >
          <div className="flex h-full w-full flex-col">{children}</div>
        </div>
      </div>
    </div>
  )
}
