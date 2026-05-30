'use client'

// ─────────────────────────────────────────────────────────────────────────────
// components/sections/ProduccionesSection.tsx — §07 PRODUCCIONES
// Layout: strip horizontal de 4 videos 16:9 (igual altura, 4 cols)
//         + tira horizontal de fotografías personales con marco tipo impresión
// ─────────────────────────────────────────────────────────────────────────────

import { useCallback, useEffect, useRef } from 'react'

import UgcProductionCell from '@/components/ui/UgcProductionCell'
import UgcKeyVisualCell  from '@/components/ui/UgcKeyVisualCell'
import SectionLabel      from '@/components/ui/SectionLabel'
import { PRODUCCIONES_COPY } from '@/lib/content'
import { PRODUCCIONES_FOTOS } from '@/lib/producciones'
import { productionVideos } from '@/lib/videos'

export default function ProduccionesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const hasOverflowRef = useRef(false)
  const dragRef = useRef({ active: false, startX: 0, scrollLeft: 0 })

  const syncTrackOverflow = useCallback(() => {
    const track = trackRef.current
    if (!track) return

    const scrollable = track.scrollWidth > track.clientWidth
    hasOverflowRef.current = scrollable
    track.classList.toggle('prod-personal__track--scrollable', scrollable)
    track.classList.toggle('prod-personal__track--centered', !scrollable)
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    syncTrackOverflow()

    const resizeObserver = new ResizeObserver(syncTrackOverflow)
    resizeObserver.observe(track)

    const onWheel = (event: WheelEvent) => {
      if (!hasOverflowRef.current || event.deltaY === 0) return
      event.preventDefault()
      track.scrollLeft += event.deltaY
    }

    const onPointerDown = (event: PointerEvent) => {
      if (!hasOverflowRef.current || event.button !== 0) return
      dragRef.current = {
        active: true,
        startX: event.clientX,
        scrollLeft: track.scrollLeft,
      }
      track.classList.add('prod-personal__track--dragging')
      track.setPointerCapture(event.pointerId)
    }

    const onPointerMove = (event: PointerEvent) => {
      if (!dragRef.current.active) return
      track.scrollLeft = dragRef.current.scrollLeft - (event.clientX - dragRef.current.startX)
    }

    const endDrag = (event: PointerEvent) => {
      if (!dragRef.current.active) return
      dragRef.current.active = false
      track.classList.remove('prod-personal__track--dragging')
      track.releasePointerCapture(event.pointerId)
    }

    track.addEventListener('wheel', onWheel, { passive: false })
    track.addEventListener('pointerdown', onPointerDown)
    track.addEventListener('pointermove', onPointerMove)
    track.addEventListener('pointerup', endDrag)
    track.addEventListener('pointercancel', endDrag)

    return () => {
      resizeObserver.disconnect()
      track.removeEventListener('wheel', onWheel)
      track.removeEventListener('pointerdown', onPointerDown)
      track.removeEventListener('pointermove', onPointerMove)
      track.removeEventListener('pointerup', endDrag)
      track.removeEventListener('pointercancel', endDrag)
    }
  }, [syncTrackOverflow])

  const handleTrackKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const track = trackRef.current
    if (!track || !hasOverflowRef.current) return

    const step = track.clientWidth * 0.35
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (event.key === 'ArrowRight') {
      event.preventDefault()
      track.scrollBy({ left: step, behavior: smooth ? 'smooth' : 'auto' })
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      track.scrollBy({ left: -step, behavior: smooth ? 'smooth' : 'auto' })
    }
  }

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
            <div
              ref={trackRef}
              className="prod-personal__track"
              aria-label={PRODUCCIONES_COPY.personalPhotosAriaLabel}
              tabIndex={0}
              onKeyDown={handleTrackKeyDown}
            >
              {PRODUCCIONES_FOTOS.map((foto, i) => (
                <div
                  key={foto.src}
                  className="prod-personal__frame editorial-print-frame bento-cell"
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
