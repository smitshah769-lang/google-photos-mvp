import { type ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { sheetTransition } from '@/lib/motion'

type BottomSheetProps = {
  open: boolean
  onBackdropClick?: () => void
  children: ReactNode
  /** Optional label for the dialog region. */
  ariaLabel?: string
}

export function BottomSheet({
  open,
  onBackdropClick,
  children,
  ariaLabel = 'Dialog',
}: BottomSheetProps) {
  const reducedMotion = useReducedMotion()

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="sheet-root"
          className="absolute inset-0 z-40 flex items-end bg-black/55 p-4"
          initial={{ opacity: reducedMotion ? 1 : 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: reducedMotion ? 1 : 0 }}
          transition={sheetTransition(reducedMotion)}
          role="presentation"
          onClick={onBackdropClick}
        >
          <motion.div
            role="dialog"
            aria-label={ariaLabel}
            className="w-full rounded-gp-card bg-gp-surface-elevated p-4 ring-1 ring-gp-border"
            initial={{ y: reducedMotion ? 0 : '100%' }}
            animate={{ y: 0 }}
            exit={{ y: reducedMotion ? 0 : '100%' }}
            transition={sheetTransition(reducedMotion)}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
