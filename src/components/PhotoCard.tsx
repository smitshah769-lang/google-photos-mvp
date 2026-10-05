import { useState } from 'react'
import type { Photo } from '@/data/photos'

export type PhotoCardVariant = 'grid' | 'viewer'

type PhotoCardProps = {
  photo: Photo
  variant?: PhotoCardVariant
  className?: string
}

function docTypeLabel(docType: Photo['docType']): string {
  if (!docType) return 'Document'
  return docType.charAt(0).toUpperCase() + docType.slice(1)
}

function GradientPhotoCard({
  photo,
  variant,
  className = '',
}: {
  photo: Photo
  variant: PhotoCardVariant
  className?: string
}) {
  const { hueA = 200, hueB = 240, emoji = '📷' } = photo.placeholder ?? {}
  const aspect =
    variant === 'viewer' && photo.width && photo.height
      ? `${photo.width} / ${photo.height}`
      : undefined

  return (
    <div
      className={`relative flex flex-col items-center justify-center overflow-hidden bg-gp-surface-elevated ${className}`}
      style={{
        aspectRatio: aspect,
        background: `linear-gradient(145deg, hsl(${hueA} 60% 45%), hsl(${hueB} 60% 35%))`,
      }}
    >
      <span className="text-4xl" aria-hidden>
        {emoji}
      </span>
      {variant === 'grid' && (
        <p className="absolute inset-x-0 bottom-0 line-clamp-2 bg-black/45 px-1.5 py-1 text-[10px] leading-tight text-gp-text">
          {photo.alt}
        </p>
      )}
    </div>
  )
}

function DocumentCard({ photo, className = '' }: { photo: Photo; className?: string }) {
  return (
    <div
      className={`flex aspect-square flex-col rounded-gp-card border border-gp-border bg-[#f5f5f0] p-3 text-[#3c4043] shadow-inner ${className}`}
    >
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gp-text-secondary">
        {docTypeLabel(photo.docType)}
      </p>
      <div className="flex flex-1 flex-col justify-center gap-2">
        <div className="h-2 w-full rounded bg-[#dadce0]" />
        <div className="h-2 w-[85%] rounded bg-[#dadce0]" />
        <div className="h-2 w-[70%] rounded bg-[#dadce0]" />
        <div className="h-2 w-[90%] rounded bg-[#dadce0]" />
      </div>
    </div>
  )
}

function RealPhotoCard({
  photo,
  variant,
  className = '',
}: {
  photo: Photo
  variant: PhotoCardVariant
  className?: string
}) {
  const [failed, setFailed] = useState(false)

  if (failed || !photo.src) {
    return <GradientPhotoCard photo={photo} variant={variant} className={className} />
  }

  const aspect =
    variant === 'viewer' && photo.width && photo.height
      ? `${photo.width} / ${photo.height}`
      : undefined

  return (
    <div
      className={`relative overflow-hidden bg-gp-surface-elevated ${className}`}
      style={aspect ? { aspectRatio: aspect } : undefined}
    >
      <img
        src={photo.src}
        alt={photo.alt}
        className={
          variant === 'grid'
            ? 'h-full w-full object-cover'
            : 'h-full w-full object-contain'
        }
        loading="lazy"
        onError={() => setFailed(true)}
      />
    </div>
  )
}

export function PhotoCard({ photo, variant = 'grid', className = '' }: PhotoCardProps) {
  if (photo.kind === 'document') {
    return <DocumentCard photo={photo} className={className} />
  }

  if (photo.src) {
    return (
      <RealPhotoCard
        photo={photo}
        variant={variant}
        className={variant === 'grid' ? `aspect-square ${className}` : className}
      />
    )
  }

  return (
    <GradientPhotoCard
      photo={photo}
      variant={variant}
      className={variant === 'grid' ? `aspect-square ${className}` : className}
    />
  )
}
