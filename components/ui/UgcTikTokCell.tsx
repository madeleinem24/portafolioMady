'use client'

// ─────────────────────────────────────────────────────────────────────────────
// components/ui/UgcTikTokCell.tsx — Tile 9:16 editorial para TikTok / Reels
// Sin chrome de teléfono. Autoplay on-hover + on-viewport (IntersectionObserver).
// Uso: bento grids, strips de contenido UGC.
// Diferencia de UgcPhoneCell: layout editorial puro, no mockup.
// ─────────────────────────────────────────────────────────────────────────────

import { useCallback, useEffect, useRef, useState } from 'react'

import { getUgcVideoOpenUrl, getUgcVideoPosterUrl, getUgcVideoPreviewUrl } from '@/lib/videos'
import type { UgcVideoData } from '@/lib/types'

interface UgcTikTokCellProps {
  video: UgcVideoData
  /** Muestra overlay de cliente y título (default true) */
  showMeta?: boolean
  /** Autoplay al entrar al viewport, no solo en hover (default true) */
  autoplayOnScroll?: boolean
  className?: string
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return reduced
}

export default function UgcTikTokCell({
  video,
  showMeta = true,
  autoplayOnScroll = true,
  className = '',
}: UgcTikTokCellProps) {
  const cellRef  = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const [isHovering, setIsHovering] = useState(false)
  const [isInView,   setIsInView]   = useState(false)
  const prefersReduced = usePrefersReducedMotion()

  const previewUrl = getUgcVideoPreviewUrl(video)
  const posterUrl  = getUgcVideoPosterUrl(video)

  // Viewport observer — autoplay al entrar
  useEffect(() => {
    const el = cellRef.current
    if (!el || prefersReduced || !autoplayOnScroll) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.45, rootMargin: '0px 0px -60px 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [prefersReduced, autoplayOnScroll])

  // Control de reproducción
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const shouldPlay = (isInView || isHovering) && !prefersReduced
    if (shouldPlay) {
      void v.play().catch(() => {})
    } else {
      v.pause()
    }
  }, [isInView, isHovering, prefersReduced])

  const openUrl = getUgcVideoOpenUrl(video)

  const handleClick = useCallback(() => {
    if (openUrl) {
      window.open(openUrl, '_blank', 'noopener,noreferrer')
    }
  }, [openUrl])

  const classes = ['ugc-tiktok-cell', className].filter(Boolean).join(' ')

  return (
    <div
      ref={cellRef}
      className={classes}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        role={openUrl ? 'button' : undefined}
        tabIndex={openUrl ? 0 : undefined}
        className="ugc-tiktok-cell__inner"
        onClick={openUrl ? handleClick : undefined}
        onKeyDown={
          openUrl
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleClick()
                }
              }
            : undefined
        }
        aria-label={
          openUrl
            ? `${video.videoAlt || video.title}. Ver video completo`
            : video.videoAlt || video.title
        }
      >
        {/* Video */}
        <video
          ref={videoRef}
          src={previewUrl}
          poster={posterUrl}
          muted
          loop
          playsInline
          preload="none"
          className="ugc-tiktok-cell__video"
        />

        {/* Scrim bottom */}
        <div className="ugc-tiktok-cell__scrim" aria-hidden="true" />

        {/* TikTok badge top-right */}
        <div className="ugc-tiktok-cell__badge" aria-hidden="true">
          <TikTokIcon />
        </div>

        {/* Overlay de meta */}
        {showMeta && (
          <div className="ugc-tiktok-cell__meta">
            {video.client && (
              <span className="ugc-tiktok-cell__client">{video.client}</span>
            )}
            <p className="ugc-tiktok-cell__title">
              {video.title.replace(/^[^:]+:\s*/, '')}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

function TikTokIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.37 6.37 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.19 8.19 0 004.79 1.52V6.76a4.85 4.85 0 01-1.02-.07z" />
    </svg>
  )
}
