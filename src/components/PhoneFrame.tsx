import { type ReactNode, useEffect, useState } from 'react'

/** Logical phone viewport (PRD §7, E-12.4). */
export const PHONE_WIDTH = 390
export const PHONE_HEIGHT = 844

/** Slightly below 1 so the frame + chrome fits common laptop viewports without page scroll. */
const MAX_FRAME_SCALE = 0.88
const FRAME_VIEWPORT_PADDING_X = 24
const FRAME_VIEWPORT_PADDING_Y = 48

type PhoneFrameProps = {
  children?: ReactNode
}

export function PhoneFrame({ children }: PhoneFrameProps) {
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const updateScale = () => {
      const vw = window.innerWidth
      const vh = window.innerHeight
      const scaleW = (vw - FRAME_VIEWPORT_PADDING_X) / PHONE_WIDTH
      const scaleH = (vh - FRAME_VIEWPORT_PADDING_Y) / PHONE_HEIGHT
      setScale(Math.min(MAX_FRAME_SCALE, scaleW, scaleH))
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
          data-testid="phone-frame"
          className="absolute left-0 top-0 overflow-hidden rounded-[2rem] border-2 border-[#5f6368] bg-gp-surface shadow-[0_24px_80px_rgba(0,0,0,0.55)] ring-1 ring-white/10"
          style={{
            width: PHONE_WIDTH,
            height: PHONE_HEIGHT,
            transform: scale < 1 ? `scale(${scale})` : undefined,
            transformOrigin: 'top left',
          }}
        >
          <div className="flex h-full w-full flex-col">{children}</div>
          <div
            className="pointer-events-none absolute inset-x-0 bottom-2.5 z-30 flex justify-center"
            aria-hidden
          >
            <div className="h-1 w-[134px] rounded-full bg-white/45 shadow-[0_0_12px_rgba(255,255,255,0.15)]" />
          </div>
        </div>
      </div>
    </div>
  )
}
