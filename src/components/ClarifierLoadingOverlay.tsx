type ClarifierLoadingOverlayProps = {
  message?: string
}

export function ClarifierLoadingOverlay({
  message = 'Loading questions…',
}: ClarifierLoadingOverlayProps) {
  return (
    <div
      className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-gp-bg/85 px-8 text-center"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="mb-6 h-2 w-48 overflow-hidden rounded-full bg-gp-surface">
        <div className="h-full w-1/3 animate-[shimmer_1.2s_ease-in-out_infinite] rounded-full bg-gp-accent/70" />
      </div>
      <p className="text-base text-gp-text-secondary">{message}</p>
    </div>
  )
}
