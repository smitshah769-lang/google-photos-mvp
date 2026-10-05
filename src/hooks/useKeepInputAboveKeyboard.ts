import { type RefObject, useEffect } from 'react'

/** Scroll focused input into view when the virtual keyboard opens (E-12.3). */
export function useKeepInputAboveKeyboard(inputRef: RefObject<HTMLInputElement | null>) {
  useEffect(() => {
    const input = inputRef.current
    if (!input) return

    const scrollIntoView = () => {
      if (document.activeElement !== input) return
      input.scrollIntoView({ block: 'center', behavior: 'auto' })
    }

    const onFocus = () => {
      requestAnimationFrame(scrollIntoView)
      setTimeout(scrollIntoView, 100)
    }

    input.addEventListener('focus', onFocus)
    window.visualViewport?.addEventListener('resize', scrollIntoView)
    window.visualViewport?.addEventListener('scroll', scrollIntoView)

    return () => {
      input.removeEventListener('focus', onFocus)
      window.visualViewport?.removeEventListener('resize', scrollIntoView)
      window.visualViewport?.removeEventListener('scroll', scrollIntoView)
    }
  }, [inputRef])
}
