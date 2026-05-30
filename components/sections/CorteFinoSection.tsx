'use client'

// ─────────────────────────────────────────────────────────────────────────────
// sections/CorteFinoSection.tsx — §05 Diseño gráfico para Cortefino
//
// Layout Opción B — spread editorial:
//   Header
//   Row 1: 3 carruseles (5+4+3) · misma altura 4:5
//   Row 2: bloque social 8+4 — animaciones IG | publicaciones apiladas
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef } from 'react'

import AnimationCell    from '@/components/ui/AnimationCell'
import CarouselSlider   from '@/components/ui/CarouselSlider'
import UgcKeyVisualCell from '@/components/ui/UgcKeyVisualCell'
import SectionLabel     from '@/components/ui/SectionLabel'
import { CORTEFINO_COPY } from '@/lib/content'
import {
  cortefinoCarousels,
  cortefinoCarouselSliders,
  cortefinoStatics,
  getCortefinoStaticSrc,
} from '@/lib/cortefino-images'
import { useHorizontalScrollTrack } from '@/lib/useHorizontalScrollTrack'
import { animationVideos, CORTEFINO_IG_PROFILE } from '@/lib/videos'

const BENTO_STAGGER_MS = 80

export default function CorteFinoSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const animTrackRef = useRef<HTMLDivElement>(null)

  const { handleKeyDown: handleAnimTrackKeyDown } = useHorizontalScrollTrack(
    animTrackRef,
    {
      scrollableClass: 'cf2-ig-row--scrollable',
      draggingClass:   'cf2-ig-row--dragging',
      slideSelector:   '.cf2-ig-frame',
    },
  )

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const cells = section.querySelectorAll<HTMLElement>('.bento-cell')
    cells.forEach((cell, index) => {
      cell.style.setProperty('--bento-delay', `${index * BENTO_STAGGER_MS}ms`)
    })

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      cells.forEach((cell) => cell.classList.add('bento-cell--visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          section
            .querySelectorAll<HTMLElement>('.bento-cell')
            .forEach((cell) => cell.classList.add('bento-cell--visible'))
          observer.disconnect()
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="cortefino"
      className="section-pad-client"
      aria-label={CORTEFINO_COPY.ariaLabel}
    >
      <div className="container-editorial">

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <header className="client-header bento-cell">
          <SectionLabel
            index={CORTEFINO_COPY.sectionIndex}
            text={CORTEFINO_COPY.sectionLabel}
            lineFull
            className="client-header__label"
          />
          <h2 className="type-display-section text-petal">
            {CORTEFINO_COPY.headingMain}
            <br />
            <em className="type-hero-serif text-magenta">
              {CORTEFINO_COPY.headingAccent}
            </em>
          </h2>
          <p className="type-lead client-header__intro">
            {CORTEFINO_COPY.intro}
          </p>
        </header>

        <div className="cf2-stack">

          {/* ── Row 1: carruseles — ancho asimétrico, altura unificada ───── */}
          <div className="cf2-row cf2-row--carousels">
            {cortefinoCarouselSliders.map((slider, index) => (
              <div
                key={slider.title}
                className={[
                  'cf2-carousel-cell bento-cell',
                  index === 0 ? 'cf2-carousel-cell--lead' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                <CarouselSlider
                  {...slider}
                  igUrl={cortefinoCarousels[index]?.igUrl}
                />
              </div>
            ))}
          </div>

          {/* ── Row 2: spread social — animaciones (8) + publicaciones (4) ── */}
          <div className="cf2-social bento-cell">
            <div className="cf2-social__head">
              <p className="cf2-social__label" aria-hidden="true">
                {CORTEFINO_COPY.igStrip.label}
              </p>
              <a
                href={CORTEFINO_IG_PROFILE}
                target="_blank"
                rel="noopener noreferrer"
                className="cf2-social__handle"
                aria-label={CORTEFINO_COPY.igStrip.profileAriaLabel}
              >
                {CORTEFINO_COPY.igStrip.handle}
              </a>
            </div>

            <div className="cf2-social__anims">
              <p className="cf2-social__scroll-hint" aria-hidden="true">
                {CORTEFINO_COPY.igStrip.scrollHint}
              </p>
              <div
                ref={animTrackRef}
                className="cf2-ig-row"
                aria-label={CORTEFINO_COPY.igStrip.animationsAriaLabel}
                tabIndex={0}
                onKeyDown={handleAnimTrackKeyDown}
              >
                {animationVideos.map((anim) => (
                  <div key={anim.id} className="cf2-ig-frame">
                    <AnimationCell video={anim} autoplay />
                  </div>
                ))}
              </div>
            </div>

            <aside
              className="cf2-social__statics"
              aria-label="Publicaciones estáticas Cortefino"
            >
              {cortefinoStatics.map((piece) => (
                <div key={piece.id} className="cf2-static-cell">
                  <UgcKeyVisualCell
                    src={getCortefinoStaticSrc(piece)}
                    alt={piece.alt}
                    client={piece.client}
                    title={piece.title}
                    category={piece.category}
                    mediaVariant="landscape"
                    objectFit="cover"
                    href={CORTEFINO_IG_PROFILE}
                  />
                </div>
              ))}
            </aside>
          </div>

        </div>
      </div>
    </section>
  )
}
