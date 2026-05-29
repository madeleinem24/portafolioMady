'use client'

// ─────────────────────────────────────────────────────────────────────────────
// components/ui/AnimationCell.tsx — Celda de animación de marca (Cortefino IG)
//
// Patrón alineado con UgcTikTokCell + TikTokFrame:
//   • src siempre en el <video> (sin lazy-load que rompe preload)
//   • IntersectionObserver → isInView
//   • useBentoRevealed → espera bento-cell--visible (opacity 0 bloquea play())
//   • el.load() + play() en efecto dedicado
//
// Badge IG es el único elemento que navega a Instagram.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef, useState } from 'react'

import {
  getAnimationVideoPreviewUrl,
  getAnimationVideoPosterUrl,
} from '@/lib/videos'
import type { AnimationVideoData } from '@/lib/videos'

interface AnimationCellProps {
  video:      AnimationVideoData
  autoplay?:  boolean
  className?: string
}

/** Espera a que el padre .bento-cell termine el scroll-reveal (opacity → 1). */
function useBentoRevealed(cellRef: React.RefObject<HTMLDivElement | null>): boolean {
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const bento = cellRef.current?.closest('.bento-cell')
    if (!bento) {
      setRevealed(true)
      return
    }

    const sync = () => {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const opacity = Number.parseFloat(window.getComputedStyle(bento).opacity || '1')
      if (reducedMotion || bento.classList.contains('bento-cell--visible') || opacity > 0.01) {
        setRevealed(true)
      }
    }

    sync()

    const mo = new MutationObserver(sync)
    mo.observe(bento, { attributes: true, attributeFilter: ['class'] })
    return () => mo.disconnect()
  }, [cellRef])

  return revealed
}

export default function AnimationCell({
  video,
  autoplay  = false,
  className = '',
}: AnimationCellProps) {
  const cellRef  = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const [isInView,   setIsInView]   = useState(false)

  const bentoRevealed  = useBentoRevealed(cellRef)

  const previewUrl = getAnimationVideoPreviewUrl(video)
  const posterUrl  = getAnimationVideoPosterUrl(video)
  const hasVideo   = Boolean(previewUrl)
  const igUrl      = video.igUrl ?? video.cloudinaryUrl
  const label      = video.title.replace(/^Cortefino\s*[—–]\s*/i, '')

  const shouldPlay =
    Boolean(autoplay && hasVideo && previewUrl) &&
    bentoRevealed &&
    isInView

  // ── Viewport (mismo criterio que UgcTikTokCell) ─────────────────────────
  useEffect(() => {
    if (!autoplay || !hasVideo) return
    const el = cellRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.12, rootMargin: '120px 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [autoplay, hasVideo])

  // ── Reproducción controlada por viewport/interacción ────────────────────
  useEffect(() => {
    const el = videoRef.current
    if (!el || !previewUrl) return

    if (shouldPlay) {
      const play = () => {
        void el.play().catch(() => {})
      }

      if (el.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
        play()
      } else {
        el.addEventListener('canplay', play, { once: true })
        return () => el.removeEventListener('canplay', play)
      }
    } else {
      el.pause()
    }
  }, [shouldPlay, previewUrl])

  // Fallback: asegurar loop continuo cuando está visible.
  useEffect(() => {
    const el = videoRef.current
    if (!el) return

    const onEnded = () => {
      if (!shouldPlay) return
      el.currentTime = 0
      void el.play().catch(() => {})
    }
    el.addEventListener('ended', onEnded)
    return () => el.removeEventListener('ended', onEnded)
  }, [shouldPlay])

  const classes = [
    'anim-cell',
    hasVideo ? 'anim-cell--live' : 'anim-cell--pending',
    className,
  ].filter(Boolean).join(' ')

  return (
    <div
      ref={cellRef}
      className={classes}
    >
      <div
        className="anim-cell__inner"
        aria-label={hasVideo ? `Animación: ${label}` : `Próximamente: ${label}`}
      >
        {hasVideo ? (
          <>
            <video
              ref={videoRef}
              src={previewUrl}
              poster={posterUrl ?? undefined}
              muted
              loop
              playsInline
              preload="none"
              className="anim-cell__video"
            />
            <div className="anim-cell__scrim" aria-hidden="true" />
          </>
        ) : (
          <div className="anim-cell__pending-bg" aria-hidden="true">
            <span className="anim-cell__pending-icon">
              <ClockIcon />
            </span>
          </div>
        )}

        {igUrl ? (
          <a
            href={igUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="anim-cell__badge"
            aria-label={`Ver en Instagram: ${label}`}
          >
            <InstagramIcon />
            <span>IG</span>
          </a>
        ) : (
          <div className="anim-cell__badge" aria-hidden="true">
            <InstagramIcon />
            <span>IG</span>
          </div>
        )}

        <div className="anim-cell__meta">
          <p className="anim-cell__title">{label}</p>
          {!hasVideo && (
            <span className="anim-cell__soon">próximamente</span>
          )}
        </div>
      </div>
    </div>
  )
}

function InstagramIcon() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" strokeWidth="0" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}
