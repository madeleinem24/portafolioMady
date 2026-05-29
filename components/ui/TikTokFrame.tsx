'use client'

// ─────────────────────────────────────────────────────────────────────────────
// components/ui/TikTokFrame.tsx — Mockup móvil TikTok "For You" (plantilla adjunta)
// UI: negro/blanco/rosa · Marco teléfono · Video Cloudinary central
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef } from 'react'

import type { UgcVideoData } from '@/lib/types'

interface TikTokFrameProps {
  video: UgcVideoData
  previewUrl: string
  /** Reproducir preview (false si reduced-motion sin interacción) */
  shouldPlay: boolean
  /**
   * URL de poster estático (primer frame). Usar `getUgcVideoPosterUrl()`.
   * Con `preload="none"` evita cargas anticipadas; el poster se muestra hasta play().
   */
  posterUrl?: string
  className?: string
}

function tiktokHandle(video: UgcVideoData): string {
  const fromUrl = video.tiktokUrl.match(/@([^/]+)/)
  if (fromUrl) return `@${fromUrl[1]}`
  if (video.client) {
    return `@${video.client.toLowerCase().replace(/\s+/g, '')}`
  }
  return '@username'
}

function captionLine(video: UgcVideoData): string {
  const base = video.title.replace(/^[^:]+:\s*/, '').trim() || video.title
  return `${base} #ugc #reels #branding`
}

function formatCount(value: string | number | undefined, fallback: string): string {
  if (value == null) return fallback
  return String(value)
}

export default function TikTokFrame({
  video,
  previewUrl,
  shouldPlay,
  posterUrl,
  className = '',
}: TikTokFrameProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const handle = tiktokHandle(video)
  const caption = captionLine(video)
  const posted = video.postedAgo ?? '3h ago'
  const likes = formatCount(video.likeCount, '365')
  const comments = formatCount(video.commentCount, '105')

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
    <article
      className={['tiktok-phone', className].filter(Boolean).join(' ')}
      aria-hidden="true"
    >
      <div className="tiktok-phone__notch" />
      <div className="tiktok-phone__screen">
        <video
          ref={videoRef}
          src={previewUrl}
          poster={posterUrl}
          muted
          loop
          playsInline
          preload="none"
          className="tiktok-phone__video"
        />
        <div className="tiktok-phone__scrim" />

        <div className="tiktok-ui">
          <p className="tiktok-ui__tabs">
            <span>Following</span>
            <span aria-hidden="true"> | </span>
            <strong>For you</strong>
          </p>

          <div className="tiktok-ui__body">
            <aside className="tiktok-ui__rail">
              <div className="tiktok-ui__avatar-wrap">
                <span className="tiktok-ui__avatar" />
                <span className="tiktok-ui__avatar-plus">+</span>
              </div>

              <div className="tiktok-ui__action">
                <TikTokHeartIcon />
                <span className="tiktok-ui__count">{likes}</span>
              </div>

              <div className="tiktok-ui__action">
                <TikTokCommentIcon />
                <span className="tiktok-ui__count">{comments}</span>
              </div>

              <div className="tiktok-ui__action">
                <TikTokShareIcon />
                <span className="tiktok-ui__label">share</span>
              </div>

              <span className="tiktok-ui__disc" />
            </aside>

            <div className="tiktok-ui__meta">
              <p className="tiktok-ui__handle">
                {handle}
                <span className="tiktok-ui__muted"> · {posted}</span>
              </p>
              <p className="tiktok-ui__caption">{caption}</p>
              <p className="tiktok-ui__muted">See translation</p>
              <p className="tiktok-ui__sound">
                <span aria-hidden="true">🎵</span>
                Original sound
                <span className="tiktok-ui__muted"> · Mute</span>
              </p>
            </div>
          </div>

          <span className="tiktok-ui__progress" />

          <nav className="tiktok-ui__nav" aria-hidden="true">
            <span className="tiktok-ui__nav-item">
              <TikTokNavHome />
              home
            </span>
            <span className="tiktok-ui__nav-item">
              <TikTokNavSearch />
              search
            </span>
            <span className="tiktok-ui__nav-create">+</span>
            <span className="tiktok-ui__nav-item">
              <TikTokNavInbox />
              inbox
            </span>
            <span className="tiktok-ui__nav-item">
              <TikTokNavProfile />
              profile
            </span>
          </nav>

          <span className="tiktok-ui__home-bar" />
        </div>
      </div>
    </article>
  )
}

function TikTokHeartIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" className="tiktok-ui__heart" aria-hidden>
      <path
        fill="currentColor"
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      />
    </svg>
  )
}

function TikTokCommentIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 20c4.4 0 8-3.1 8-7s-3.6-7-8-7-8 3.1-8 7c0 1.5.5 2.9 1.4 4.1L4 21l3.6-1.2c1.2.8 2.6 1.2 4.4 1.2z"
        stroke="oklch(0.984 0.009 45)"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function TikTokShareIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 12v7a1 1 0 001 1h14a1 1 0 001-1v-7M16 6l-4-4-4 4M12 2v13"
        stroke="oklch(0.984 0.009 45)"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function TikTokNavHome() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 10.5L12 4l8 6.5V20a1 1 0 01-1 1h-5v-6H10v6H5a1 1 0 01-1-1v-9.5z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function TikTokNavSearch() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16 16l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function TikTokNavInbox() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 6h16v9H8l-4 4V6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}

function TikTokNavProfile() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="9" r="3.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
