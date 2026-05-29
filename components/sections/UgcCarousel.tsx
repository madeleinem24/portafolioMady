'use client'

// ─────────────────────────────────────────────────────────────────────────────
// components/sections/UgcCarousel.tsx — Reels UGC · prev | ACTIVE | next (3D)
// Atmósfera TikTok · swipe · teclado · indicador editorial · reduced-motion
// ─────────────────────────────────────────────────────────────────────────────

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react'

import SectionLabel from '@/components/ui/SectionLabel'
import TikTokFrame from '@/components/ui/TikTokFrame'
import UgcSlidePreview from '@/components/ui/UgcSlidePreview'
import { getUgcVideoOpenUrl, getUgcVideoPosterUrl, getUgcVideoPreviewUrl, ugcVideos } from '@/lib/videos'
import type { UgcVideoData } from '@/lib/types'

function mod(n: number, m: number): number {
  return ((n % m) + m) % m
}

function formatIndex(n: number, total: number): string {
  const pad = String(total).length
  return String(n + 1).padStart(pad, '0')
}

export default function UgcCarousel() {
  const total = ugcVideos.length
  const [active, setActive] = useState(0)
  const [liveMsg, setLiveMsg] = useState('')
  const [hasInteracted, setHasInteracted] = useState(false)
  const [isChanging, setIsChanging] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const touchStartX = useRef<number | null>(null)
  const headingId = useId()

  const goTo = useCallback((index: number) => {
    setHasInteracted(true)
    setIsChanging(true)
    setActive(mod(index, total))
    window.setTimeout(() => setIsChanging(false), 280)
  }, [total])

  const goBy = useCallback((delta: number) => {
    setHasInteracted(true)
    setIsChanging(true)
    setActive((currentIndex) => mod(currentIndex + delta, total))
    window.setTimeout(() => setIsChanging(false), 280)
  }, [total])

  const goPrev = useCallback(() => goBy(-1), [goBy])
  const goNext = useCallback(() => goBy(1), [goBy])

  const current = ugcVideos[active]
  const previewUrl = current ? getUgcVideoPreviewUrl(current) : ''
  const posterUrl  = current ? getUgcVideoPosterUrl(current) : undefined
  const shouldPlay = Boolean(current) && isInView

  const prevIndex = total > 1 ? mod(active - 1, total) : active
  const nextIndex = total > 1 ? mod(active + 1, total) : active

  const prevVideo: UgcVideoData | undefined = ugcVideos[prevIndex]
  const nextVideo: UgcVideoData | undefined = ugcVideos[nextIndex]
  const prevPreviewUrl = prevVideo ? getUgcVideoPreviewUrl(prevVideo) : ''
  const nextPreviewUrl = nextVideo ? getUgcVideoPreviewUrl(nextVideo) : ''

  useEffect(() => {
    if (!current) return
    setLiveMsg(`Reel ${active + 1} de ${total}: ${current.title}`)
  }, [active, total, current])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const root = sectionRef.current
      if (!root?.contains(document.activeElement)) return
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        goPrev()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        goNext()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goPrev, goNext])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.25, rootMargin: '120px 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStartX.current
    if (start == null) return
    const end = e.changedTouches[0]?.clientX ?? start
    const delta = end - start
    if (Math.abs(delta) > 48) {
      if (delta < 0) goNext()
      else goPrev()
    }
    touchStartX.current = null
  }

  const openTikTok = () => {
    if (!current) return
    const url = getUgcVideoOpenUrl(current)
    if (!url) return
    setHasInteracted(true)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  if (total === 0 || !current) return null

  const carouselClass = ['ugc-carousel', total < 2 ? 'ugc-carousel--single' : '']
    .filter(Boolean)
    .join(' ')

  const activeHitClass = [
    'ugc-slide__hit',
    'ugc-slide__hit--active',
    isChanging ? 'ugc-slide__hit--changing' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <section
      ref={sectionRef}
      id="ugc"
      className="relative isolate overflow-x-visible overflow-y-hidden section-pad-ugc"
      aria-labelledby={headingId}
      role="region"
      aria-label="Reels UGC"
      tabIndex={-1}
    >
      <div className="ugc-tiktok-atmosphere" aria-hidden="true" />

      <div className="container-editorial ugc-inner">
        <div className="ugc-head mb-10 md:mb-14">
          <SectionLabel index="04" text="Reels UGC" lineFull className="mb-4" />

          <h2
            id={headingId}
            className={[
              'font-display font-black text-canvas',
              'text-[clamp(2.25rem,5vw,4.5rem)]',
              'leading-[0.9] tracking-[-0.035em] uppercase',
            ].join(' ')}
          >
            Contenido
            <br />
            <em
              className={[
                'font-serif italic font-normal normal-case',
                'text-lime text-[1.05em] tracking-[-0.02em]',
              ].join(' ')}
            >
              en movimiento.
            </em>
          </h2>

          <p className="type-lead mt-6 max-w-[42ch] text-petal/55">
            Previews auténticos para TikTok. Desliza o usa las flechas; toca el teléfono para abrir en la app.
          </p>
        </div>

        <div
          className="ugc-indicator mb-8 flex items-center justify-center gap-3"
          role="tablist"
          aria-label="Índice de reels"
        >
          {ugcVideos.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === active}
              className={[
                'type-nano tabular-nums min-h-[44px] min-w-[44px]',
                'transition-colors duration-[var(--duration-base)]',
                'focus-visible:outline focus-visible:outline-2 focus-visible:outline-lavender focus-visible:outline-offset-2',
                i === active ? 'text-lime' : 'text-lavender/45 hover:text-lavender',
              ].join(' ')}
              onClick={() => goTo(i)}
            >
              {formatIndex(i, total)}
            </button>
          ))}
        </div>

        <p className="sr-only" aria-live="polite" aria-atomic="true">
          {liveMsg}
        </p>

        <div className={carouselClass}>
          <div className="ugc-carousel__shell">
            <button
              type="button"
              className="ugc-nav-btn ugc-nav-btn--prev"
              onClick={goPrev}
              aria-label="Reel anterior"
            >
              <span aria-hidden="true">←</span>
            </button>

            <div
              className="ugc-carousel__stage"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              {total >= 2 ? (
                <div className="ugc-carousel__track">
                  <div className="ugc-slide ugc-slide--prev">
                    <button
                      type="button"
                      className="ugc-slide__hit"
                      onClick={() => goTo(prevIndex)}
                      aria-label={
                        prevVideo
                          ? `Centrar reel: ${prevVideo.title}`
                          : 'Reel anterior'
                      }
                    >
                      <UgcSlidePreview
                        key={`prev-${prevIndex}`}
                        previewUrl={prevPreviewUrl}
                        posterUrl={prevVideo ? getUgcVideoPosterUrl(prevVideo) : undefined}
                        shouldPlay={false}
                      />
                    </button>
                  </div>

                  <div className="ugc-slide ugc-slide--active">
                    <button
                      type="button"
                      className={activeHitClass}
                      onClick={openTikTok}
                      aria-label={`${current.videoAlt}. Abrir en TikTok`}
                    >
                      <TikTokFrame
                        key={current.id}
                        video={current}
                        previewUrl={previewUrl}
                        posterUrl={posterUrl}
                        shouldPlay={shouldPlay}
                      />
                    </button>
                  </div>

                  <div className="ugc-slide ugc-slide--next">
                    <button
                      type="button"
                      className="ugc-slide__hit"
                      onClick={() => goTo(nextIndex)}
                      aria-label={
                        nextVideo
                          ? `Centrar reel: ${nextVideo.title}`
                          : 'Reel siguiente'
                      }
                    >
                      <UgcSlidePreview
                        key={`next-${nextIndex}`}
                        previewUrl={nextPreviewUrl}
                        posterUrl={nextVideo ? getUgcVideoPosterUrl(nextVideo) : undefined}
                        shouldPlay={false}
                      />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="ugc-carousel__track ugc-carousel__track--single">
                  <div className="ugc-slide ugc-slide--active">
                    <button
                      type="button"
                      className={activeHitClass}
                      onClick={openTikTok}
                      aria-label={`${current.videoAlt}. Abrir en TikTok`}
                    >
                      <TikTokFrame
                        key={current.id}
                        video={current}
                        previewUrl={previewUrl}
                        posterUrl={posterUrl}
                        shouldPlay={shouldPlay}
                      />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              className="ugc-nav-btn ugc-nav-btn--next"
              onClick={goNext}
              aria-label="Reel siguiente"
            >
              <span aria-hidden="true">→</span>
            </button>
          </div>

          {!isInView && (
            <p className="type-nano mt-6 text-center text-petal/45">
              Desliza hasta esta sección para activar previews
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
