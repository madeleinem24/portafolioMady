'use client'

// ─────────────────────────────────────────────────────────────────────────────
// UgcSlidePreview — Preview lateral 9:16 (sin chrome TikTok) · reduced-motion OK
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef } from 'react'

interface UgcSlidePreviewProps {
  previewUrl: string
  /** false en prefers-reduced-motion hasta que el usuario interactúe */
  shouldPlay: boolean
  className?: string
}

export default function UgcSlidePreview({
  previewUrl,
  shouldPlay,
  className = '',
}: UgcSlidePreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    el.load()
    if (shouldPlay) {
      void el.play().catch(() => {})
    } else {
      el.pause()
    }
  }, [shouldPlay, previewUrl])

  return (
    <div
      className={['ugc-slide-preview', className].filter(Boolean).join(' ')}
      aria-hidden="true"
    >
      <video
        ref={videoRef}
        src={previewUrl}
        muted
        loop
        playsInline
        preload="metadata"
        className="ugc-slide-preview__video"
      />
    </div>
  )
}
