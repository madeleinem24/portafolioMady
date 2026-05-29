'use client'

// ─────────────────────────────────────────────────────────────────────────────
// UgcSlidePreview — Preview lateral 9:16 (sin chrome TikTok) · reduced-motion OK
// Laterales: solo poster (JPG Cloudinary). Activo: video con preload="none".
// ─────────────────────────────────────────────────────────────────────────────

import Image from 'next/image'
import { useEffect, useRef } from 'react'

interface UgcSlidePreviewProps {
  previewUrl: string
  /** Thumbnail estático — evita fetch de .mp4 en slides laterales */
  posterUrl?: string
  /** Solo el slide activo reproduce; laterales muestran poster */
  shouldPlay: boolean
  className?: string
}

export default function UgcSlidePreview({
  previewUrl,
  posterUrl,
  shouldPlay,
  className = '',
}: UgcSlidePreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const el = videoRef.current
    if (!el || !shouldPlay) return

    const play = () => {
      void el.play().catch(() => {})
    }

    if (el.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      play()
      return
    }

    el.addEventListener('canplay', play, { once: true })
    el.load()
    return () => el.removeEventListener('canplay', play)
  }, [shouldPlay, previewUrl])

  const wrapClass = ['ugc-slide-preview', className].filter(Boolean).join(' ')

  if (!shouldPlay && posterUrl) {
    return (
      <div className={wrapClass} aria-hidden="true">
        <Image
          src={posterUrl}
          alt=""
          fill
          unoptimized
          loading="lazy"
          sizes="120px"
          className="ugc-slide-preview__video object-cover"
        />
      </div>
    )
  }

  return (
    <div className={wrapClass} aria-hidden="true">
      <video
        ref={videoRef}
        src={shouldPlay ? previewUrl : undefined}
        poster={posterUrl}
        muted
        loop
        playsInline
        preload="none"
        className="ugc-slide-preview__video"
      />
    </div>
  )
}
