import { PhotoCard } from '@/components/PhotoCard'
import { TopBar } from '@/components/TopBar'
import { useFlowStore } from '@/state/flowStore'

export function PhotoViewer() {
  const selectedPhotoId = useFlowStore((s) => s.selectedPhotoId)
  const candidates = useFlowStore((s) => s.candidates)
  const confirmPhoto = useFlowStore((s) => s.confirmPhoto)
  const closeViewer = useFlowStore((s) => s.closeViewer)

  const photo = candidates.find((p) => p.id === selectedPhotoId)

  const aspect =
    photo?.width && photo?.height ? `${photo.width} / ${photo.height}` : undefined

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-black">
      <TopBar onBack={closeViewer} />
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-3 pb-2">
        {photo ? (
          <div
            className="flex w-full max-h-[min(72dvh,640px)] items-center justify-center"
            style={aspect ? { aspectRatio: aspect } : undefined}
          >
            <PhotoCard photo={photo} variant="viewer" className="max-h-full w-full" />
          </div>
        ) : (
          <p className="text-sm text-gp-text-secondary">Photo unavailable</p>
        )}
        {photo?.alt ? (
          <p className="mt-3 line-clamp-2 px-2 text-center text-xs text-gp-text-secondary">
            {photo.alt}
          </p>
        ) : null}
      </div>
      <div className="shrink-0 px-4 pb-6 pt-2">
        <button
          type="button"
          onClick={() => confirmPhoto()}
          className="touch-target w-full rounded-full bg-gp-accent py-3.5 text-base font-medium text-[#0b1d35]"
        >
          This is it
        </button>
      </div>
    </div>
  )
}
