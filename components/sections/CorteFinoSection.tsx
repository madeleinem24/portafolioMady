'use client'

// ─────────────────────────────────────────────────────────────────────────────
// sections/CorteFinoSection.tsx — §05 Diseño gráfico para Cortefino
//
// Layout:
//   Header
//   Row 1: 3 carruseles interactivos uniformes con drag tipo IG
//   Row 2: IG strip — 5 animaciones, tira horizontal con scroll (como prod-personal)
//   Row 3: 2 piezas estáticas (1fr + 1fr, altura acotada)
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
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          section.querySelectorAll<HTMLElement>('.bento-cell').forEach((cell, i) => {
            setTimeout(() => cell.classList.add('bento-cell--visible'), i * 80)
          })
          observer.disconnect()
        })
      },
      { threshold: 0.08 },
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
        <header className="client-header bento-cell" data-col="0">
          <SectionLabel
            index={CORTEFINO_COPY.sectionIndex}
            text={CORTEFINO_COPY.sectionLabel}
            lineFull
            className="mb-4"
          />
          <h2
            className={[
              'font-display font-black text-petal uppercase',
              'text-[clamp(2.25rem,5vw,4.5rem)] leading-[0.9] tracking-[-0.035em]',
            ].join(' ')}
          >
            {CORTEFINO_COPY.headingMain}
            <br />
            <em className="font-serif italic font-normal normal-case text-magenta text-[1.05em] tracking-[-0.02em]">
              {CORTEFINO_COPY.headingAccent}
            </em>
          </h2>
          <p className="mt-6 text-sm font-mono text-petal/50 max-w-[46ch] leading-relaxed">
            {CORTEFINO_COPY.intro}
          </p>
        </header>

        {/* ── Row 1: 3 carruseles ─────────────────────────────────────────── */}
        <div className="cf2-row cf2-row--carousels">
          {cortefinoCarouselSliders.map((slider, i) => (
            <div
              key={slider.title}
              className="cf2-carousel-cell bento-cell"
              data-col={String(i)}
            >
              <CarouselSlider
                {...slider}
                igUrl={cortefinoCarousels[i]?.igUrl}
              />
            </div>
          ))}
        </div>

        {/* ── Row 2: IG strip — 5 animaciones, scroll horizontal ──────────── */}
        <div className="cf2-ig-strip">
          <div className="cf2-ig-strip__head">
            <p className="cf2-ig-strip__label" aria-hidden="true">
              {CORTEFINO_COPY.igStrip.label}
            </p>
            <a
              href={CORTEFINO_IG_PROFILE}
              target="_blank"
              rel="noopener noreferrer"
              className="cf2-ig-strip__handle"
              aria-label={CORTEFINO_COPY.igStrip.profileAriaLabel}
            >
              {CORTEFINO_COPY.igStrip.handle}
            </a>
          </div>
          <p className="cf2-ig-strip__scroll-hint" aria-hidden="true">
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

        {/* ── Row 3: 2 piezas estáticas ───────────────────────────────────── */}
        <div className="cf2-row cf2-row--statics">
          {cortefinoStatics.map((piece, i) => (
            <div key={piece.id} className="bento-cell" data-col={String(i + 8)}>
              <UgcKeyVisualCell
                src={getCortefinoStaticSrc(piece)}
                alt={piece.alt}
                client={piece.client}
                title={piece.title}
                category={piece.category}
                mediaVariant="landscape"
                objectFit="contain"
                href={CORTEFINO_IG_PROFILE}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
