import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { SHEET_DURATION_S } from '@/lib/motion'

type AnimatedCountProps = {
  value: number
  className?: string
  /** When true, prefix with ~ (clarifier). */
  approximate?: boolean
}

export function AnimatedCount({
  value,
  className = '',
  approximate = true,
}: AnimatedCountProps) {
  const reducedMotion = useReducedMotion()
  const [display, setDisplay] = useState(value)
  const prevRef = useRef(value)

  useEffect(() => {
    const from = prevRef.current
    const to = value
    if (reducedMotion || from === to) {
      setDisplay(to)
      prevRef.current = to
      return
    }

    const durationMs = SHEET_DURATION_S * 1000
    const start = performance.now()
    let raf = 0

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs)
      const eased = 1 - (1 - t) ** 2
      setDisplay(Math.round(from + (to - from) * eased))
      if (t < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        prevRef.current = to
      }
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [value, reducedMotion])

  const prefix = approximate ? '~' : ''
  const noun = display === 1 ? 'photo' : 'photos'

  return (
    <span className={className} data-testid="match-count">
      {prefix}
      {display} {noun} match
    </span>
  )
}
