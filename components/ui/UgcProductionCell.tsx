'use client'

// ─────────────────────────────────────────────────────────────────────────────
// components/ui/UgcProductionCell.tsx — Celda 16:9 para videos de producción.
// Reemplaza ProductionVideoCell. CSS class prefix: uprod-*
// Hover: autoplay muted. Click: toggle con audio.
// prefers-reduced-motion: poster estático + botón de play explícito.
// ─────────────────────────────────────────────────────────────────────────────

import { useCallback, useEffect, useRef, useState } from 'react'

import {
  getProductionVideoPreviewUrl,
  getProductionVideoPosterUrl,
} from '@/lib/videos'
import type { ProductionVideoData } from '@/lib/types'

interface UgcProductionCellProps {
  video: ProductionVideoData
  featured?: boolean
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

export default function UgcProductionCell({
  video,
  featured = false,
}: UgcProductionCellProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const cellRef  = useRef<HTMLDivElement>(null)

  const [isHovering,    setIsHovering]    = useState(false)
  const [isPlaying,     setIsPlaying]     = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)

  const prefersReduced = usePrefersReducedMotion()
  const previewUrl = getProductionVideoPreviewUrl(video) ?? ''
  const posterUrl  = getProductionVideoPosterUrl(video)

  // Hover: autoplay muted preview
  useEffect(() => {
    const v = videoRef.current
    if (!v || !previewUrl) return

    if (isHovering && !prefersReduced && !isPlaying) {
      v.muted = true
      void v.play().catch(() => {})
    } else if (!isHovering && !isPlaying) {
      v.pause()
      v.currentTime = 0
    }
  }, [isHovering, isPlaying, prefersReduced, previewUrl])

  const handleClick = useCallback(() => {
    const v = videoRef.current
    if (!v || !previewUrl) return
    setHasInteracted(true)

    if (isPlaying) {
      v.pause()
      v.muted = true
      setIsPlaying(false)
    } else {
      v.muted = false
      void v.play().catch(() => {})
      setIsPlaying(true)
    }
  }, [isPlaying, previewUrl])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        handleClick()
      }
    },
    [handleClick],
  )

  const hasVideo = Boolean(previewUrl)

  return (
    <div
      ref={cellRef}
      className={[
        'uprod-cell',
        featured        ? 'uprod-cell--featured' : '',
        isPlaying       ? 'uprod-cell--playing'  : '',
      ]
        .filter(Boolean)
        .join(' ')}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* ── Media ────────────────────────────────────────────────────────── */}
      <div
        role={hasVideo ? 'button' : undefined}
        tabIndex={hasVideo ? 0 : undefined}
        className="uprod-cell__media"
        onClick={hasVideo ? handleClick : undefined}
        onKeyDown={hasVideo ? handleKeyDown : undefined}
        aria-label={
          hasVideo
            ? isPlaying
              ? `Pausar: ${video.title}`
              : `Reproducir: ${video.title}`
            : video.title
        }
        aria-pressed={hasVideo ? isPlaying : undefined}
      >
        {hasVideo ? (
          <video
            ref={videoRef}
            src={previewUrl}
            poster={posterUrl}
            muted
            loop
            playsInline
            preload="none"
            className="uprod-cell__video"
          />
        ) : (
          posterUrl && (
            <img
              src={posterUrl}
              alt={video.videoAlt}
              className="uprod-cell__video"
            />
          )
        )}

        {/* Scrim */}
        <div className="uprod-cell__scrim" aria-hidden="true" />

        {/* Play / Pause */}
        {hasVideo && (
          <div className="uprod-cell__play-icon" aria-hidden="true">
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </div>
        )}

        {/* Botón "Ver completo" — abre el video en Cloudinary */}
        {video.cloudinaryUrl && (
          <a
            href={video.cloudinaryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="uprod-cell__watch-btn"
            aria-label={`Ver video completo: ${video.title}`}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <ExternalIcon />
            <span>Ver completo</span>
          </a>
        )}

        {/* Meta overlay */}
        <div className="uprod-cell__meta">
          {video.client && (
            <span className="uprod-cell__client">{video.client}</span>
          )}
          <p className="uprod-cell__title">{video.title}</p>
        </div>

        {/* Hint audio activo */}
        {isPlaying && !hasInteracted && (
          <p className="uprod-cell__sound-hint" aria-live="polite">
            ♪ con audio
          </p>
        )}
      </div>

      {/* Hint reduced-motion */}
      {prefersReduced && !hasInteracted && hasVideo && (
        <p className="uprod-cell__hint" aria-hidden="true">
          Clic para reproducir
        </p>
      )}
    </div>
  )
}

function PlayIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M8 5v14l11-7z" />
    </svg>
  )
}

function PauseIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}
