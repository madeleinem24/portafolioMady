'use client'

// ─────────────────────────────────────────────────────────────────────────────
// components/sections/ProduccionesSection.tsx — §07 PRODUCCIONES
// Layout: strip horizontal de 4 videos 16:9 (igual altura, 4 cols)
//         + tira de 3 fotografías personales con marco y label
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef } from 'react'

import UgcProductionCell from '@/components/ui/UgcProductionCell'
import UgcKeyVisualCell  from '@/components/ui/UgcKeyVisualCell'
import SectionLabel      from '@/components/ui/SectionLabel'
import { PRODUCCIONES_COPY } from '@/lib/content'
import { PRODUCCIONES_FOTOS } from '@/lib/producciones'
import { productionVideos } from '@/lib/videos'

export default function ProduccionesSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = sectionRef.current
    if (!root) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('bento-cell--visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' },
    )

    root.querySelectorAll<HTMLElement>('.bento-cell').forEach((cell) => {
      const col = parseInt(cell.dataset.col ?? '0', 10)
      cell.style.setProperty('--bento-delay', `${col * 80}ms`)
      observer.observe(cell)
    })

    return () => observer.disconnect()
  }, [])

  const excluded = new Set(PRODUCCIONES_COPY.excludedVideoIds)
  const prodVideos = productionVideos.filter((v) => !excluded.has(v.id))

  return (
    <section
      ref={sectionRef}
      id="producciones"
      className="section-pad-client"
      aria-label={PRODUCCIONES_COPY.ariaLabel}
    >
      <div className="container-editorial">

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <header className="client-header bento-cell" data-col="0">
          <SectionLabel
            index={PRODUCCIONES_COPY.sectionIndex}
            text={PRODUCCIONES_COPY.sectionLabel}
            lineFull
            className="mb-4"
          />
          <h2
            className={[
              'font-display font-black text-petal uppercase',
              'text-[clamp(2.25rem,5vw,4.5rem)] leading-[0.9] tracking-[-0.035em]',
            ].join(' ')}
          >
            {PRODUCCIONES_COPY.headingMain}
            <br />
            <em className="font-serif italic font-normal normal-case text-lavender text-[1.05em] tracking-[-0.02em]">
              {PRODUCCIONES_COPY.headingAccent}
            </em>
          </h2>
          <p className="mt-6 text-sm font-mono text-petal/50 max-w-[46ch] leading-relaxed">
            {PRODUCCIONES_COPY.intro}
          </p>
        </header>

        {/* ── Strip de 4 videos — horizontal, igual tamaño ─────────────── */}
        <div className="prod-strip" role="list" aria-label={PRODUCCIONES_COPY.videosAriaLabel}>
          {prodVideos.map((video, i) => (
            <div
              key={video.id}
              className="prod-strip__item bento-cell"
              data-col={String(i + 1)}
              role="listitem"
            >
              <UgcProductionCell video={video} />
            </div>
          ))}
        </div>

        {/* ── Fotografías personales ────────────────────────────────────── */}
        {PRODUCCIONES_FOTOS.length > 0 && (
          <div className="prod-personal">
            <p className="prod-personal__label" aria-hidden="true">
              {PRODUCCIONES_COPY.personalPhotosLabel}
            </p>
            <div className="prod-personal__grid" aria-label={PRODUCCIONES_COPY.personalPhotosAriaLabel}>
              {PRODUCCIONES_FOTOS.map((foto, i) => (
                <div
                  key={foto.src}
                  className="prod-personal__frame bento-cell"
                  data-col={String(i + 5)}
                >
                  <UgcKeyVisualCell
                    src={foto.src}
                    alt={foto.alt}
                    imgWidth={600}
                    imgHeight={800}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  )
}
