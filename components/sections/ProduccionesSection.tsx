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
import { assetPath } from '@/lib/asset-path'
import { productionVideos } from '@/lib/videos'

const FOTOS = [
  { src: assetPath('/ugc/fotografias/dsc1038.webp'), alt: 'Fotografía editorial — producción audiovisual' },
  { src: assetPath('/ugc/fotografias/dsc0546.webp'), alt: 'Fotografía de producción — Madeleine Morales' },
  { src: assetPath('/ugc/fotografias/dsc1048.webp'), alt: 'Fotografía editorial — sesión de producción' },
]

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

  const prodVideos = productionVideos.filter((v) => v.id !== 'prod-pony-nebula')

  return (
    <section
      ref={sectionRef}
      id="producciones"
      className="section-pad-client"
      aria-label="Producciones audiovisuales y fotografías"
    >
      <div className="container-editorial">

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <header className="client-header bento-cell" data-col="0">
          <SectionLabel index="07" text="Producciones" lineFull className="mb-4" />
          <h2
            className={[
              'font-display font-black text-petal uppercase',
              'text-[clamp(2.25rem,5vw,4.5rem)] leading-[0.9] tracking-[-0.035em]',
            ].join(' ')}
          >
            Narrativas
            <br />
            <em className="font-serif italic font-normal normal-case text-lavender text-[1.05em] tracking-[-0.02em]">
              audiovisuales.
            </em>
          </h2>
          <p className="mt-6 text-sm font-mono text-petal/50 max-w-[46ch] leading-relaxed">
            Producciones universitarias y cortometrajes. Desde escenografía
            experimental hasta documentales sobre la identidad cultural de
            Guayaquil.
          </p>
        </header>

        {/* ── Strip de 4 videos — horizontal, igual tamaño ─────────────── */}
        <div className="prod-strip" role="list" aria-label="Videos de producción">
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
        {FOTOS.length > 0 && (
          <div className="prod-personal">
            <p className="prod-personal__label" aria-hidden="true">
              / Fotografías personales
            </p>
            <div className="prod-personal__grid" aria-label="Fotografías personales de producción">
              {FOTOS.map((foto, i) => (
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
