'use client'

// ─────────────────────────────────────────────────────────────────────────────
// components/ui/UgcPhoneCell.tsx — Phone TikTok en celda de bento grid
// Autoplay cuando entra al viewport (IntersectionObserver).
// reduced-motion: static hasta interacción explícita.
// ─────────────────────────────────────────────────────────────────────────────

import { useCallback, useEffect, useRef, useState } from 'react'

import TikTokFrame from '@/components/ui/TikTokFrame'
import { getUgcVideoOpenUrl, getUgcVideoPosterUrl, getUgcVideoPreviewUrl } from '@/lib/videos'
import type { UgcVideoData } from '@/lib/types'

interface UgcPhoneCellProps {
  video: UgcVideoData
  /** Variante sin max-width fija — rellena la columna del bento */
  fluid?: boolean
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

export default function UgcPhoneCell({
  video,
  fluid = false,
  className = '',
}: UgcPhoneCellProps) {
  const cellRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const prefersReduced = usePrefersReducedMotion()

  const previewUrl = getUgcVideoPreviewUrl(video)
  const posterUrl  = getUgcVideoPosterUrl(video)
  const openUrl    = getUgcVideoOpenUrl(video)

  // Autoplay cuando entra al viewport (≥40% visible)
  useEffect(() => {
    const el = cellRef.current
    if (!el || prefersReduced) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting
        setIsInView(visible)
        if (visible) setHasInteracted(true)
      },
      { threshold: 0.4, rootMargin: '0px 0px -60px 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [prefersReduced])

  const shouldPlay = isInView && !prefersReduced

  const handleClick = useCallback(() => {
    setHasInteracted(true)
    if (openUrl) {
      window.open(openUrl, '_blank', 'noopener,noreferrer')
    }
  }, [openUrl])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        handleClick()
      }
    },
    [handleClick],
  )

  const classes = [
    'ugc-phone-cell',
    fluid ? 'ugc-phone-cell--fluid' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div ref={cellRef} className={classes}>
      <div
        role="button"
        tabIndex={0}
        className="ugc-phone-cell__btn"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-label={
          openUrl
            ? `${video.videoAlt}. Ver video completo`
            : video.videoAlt
        }
      >
        <TikTokFrame
          video={video}
          previewUrl={previewUrl}
          posterUrl={posterUrl}
          shouldPlay={shouldPlay || (prefersReduced && hasInteracted)}
        />
      </div>

      {/* Hint solo si reduced-motion y sin interacción previa */}
      {prefersReduced && !hasInteracted && (
        <p className="ugc-phone-cell__hint" aria-hidden="true">
          Toca para reproducir
        </p>
      )}
    </div>
  )
}
