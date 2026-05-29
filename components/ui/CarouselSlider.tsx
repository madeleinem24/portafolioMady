'use client'

// ─────────────────────────────────────────────────────────────────────────────
// components/ui/CarouselSlider.tsx — Carrusel interactivo de slides estáticos
//
// Navegación:
//   - Flechas prev/next (click + keyboard ← →)
//   - Dots / bullets (click por slide)
//   - Drag/swipe pointer (desktop y touch) — estilo Instagram
//
// Aspect ratio uniforme controlado por CSS (cf2-row--carousels).
// Respeta prefers-reduced-motion: desactiva transiciones y drag.
// ─────────────────────────────────────────────────────────────────────────────

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'

export interface CarouselSlide {
  src: string
  alt: string
}

interface CarouselSliderProps {
  slides:    CarouselSlide[]
  title?:    string
  client?:   string
  category?: string
  /** URL de la publicación en Instagram — si se provee, el footer muestra un link */
  igUrl?:    string
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

export default function CarouselSlider({
  slides,
  title,
  client,
  category,
  igUrl,
  className = '',
}: CarouselSliderProps) {
  const [current, setCurrent] = useState(0)
  const prefersReduced = usePrefersReducedMotion()
  const total = slides.length

  // ── Drag state ─────────────────────────────────────────────────────────────
  const viewportRef   = useRef<HTMLDivElement>(null)
  const isDraggingRef = useRef(false)
  const dragStartXRef = useRef(0)
  const [dragOffset, setDragOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  // ── Navigation ─────────────────────────────────────────────────────────────
  const prev = useCallback(
    () => setCurrent((i) => (i - 1 + total) % total),
    [total],
  )
  const next = useCallback(
    () => setCurrent((i) => (i + 1) % total),
    [total],
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  { e.preventDefault(); prev() }
      if (e.key === 'ArrowRight') { e.preventDefault(); next() }
    },
    [prev, next],
  )

  // ── Pointer drag ────────────────────────────────────────────────────────────
  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (prefersReduced || total <= 1) return
      isDraggingRef.current = true
      dragStartXRef.current = e.clientX
      setIsDragging(true)
      e.currentTarget.setPointerCapture(e.pointerId)
    },
    [prefersReduced, total],
  )

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDraggingRef.current) return
      // Resistencia visual: amortiguar drag evita saltos bruscos al deslizar.
      const raw   = e.clientX - dragStartXRef.current
      const eased = raw * 0.6
      const width = viewportRef.current?.offsetWidth ?? 1
      // Clamp drag entre -1.2 y +1.2 anchos de viewport (previene separar demasiado)
      const clamped = Math.max(-width * 1.2, Math.min(width * 1.2, eased))
      setDragOffset(clamped)
    },
    [],
  )

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDraggingRef.current) return
      const delta     = e.clientX - dragStartXRef.current
      const threshold = (viewportRef.current?.offsetWidth ?? 200) * 0.18

      isDraggingRef.current = false
      setIsDragging(false)
      setDragOffset(0)

      if (delta < -threshold) next()
      else if (delta > threshold) prev()
    },
    [next, prev],
  )

  // Cleanup en caso de que el pointer salga de la ventana
  const handlePointerCancel = useCallback(() => {
    isDraggingRef.current = false
    setIsDragging(false)
    setDragOffset(0)
  }, [])

  // ── Track — transform vía CSS vars (excepción JS runtime) + easing en globals.css
  const trackStyle = {
    '--cslider-index': String(current),
    '--cslider-drag':  `${dragOffset}px`,
  } as React.CSSProperties

  const trackClasses = [
    'cslider__track',
    isDragging ? 'cslider__track--dragging' : '',
    prefersReduced ? 'cslider__track--reduced' : '',
  ]
    .filter(Boolean)
    .join(' ')

  const classes = ['cslider', className].filter(Boolean).join(' ')

  return (
    <article
      className={classes}
      aria-label={title ? `Carrusel: ${title}` : 'Carrusel de diseño'}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* ── Visor ───────────────────────────────────────────────────────── */}
      <div
        ref={viewportRef}
        className={['cslider__viewport', isDragging ? 'is-dragging' : ''].filter(Boolean).join(' ')}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
      >
        {/* Anuncio a11y: aria-live anuncia el slide activo */}
        <span className="sr-only" aria-live="polite" aria-atomic="true">
          Slide {current + 1} de {total}
        </span>

        <div className={trackClasses} style={trackStyle}>
          {slides.map((slide, i) => {
            const isActive = i === current
            const isAdjacent =
              Math.abs(i - current) === 1 ||
              (current === 0 && i === total - 1) ||
              (current === total - 1 && i === 0)
            const shouldLoadImage = isActive || isAdjacent

            return (
              <div
                key={i}
                className="cslider__slide"
                aria-hidden={!isActive}
                data-active={isActive ? 'true' : undefined}
              >
                {shouldLoadImage ? (
                  <Image
                    src={slide.src}
                    alt={slide.alt || `Slide ${i + 1} de ${total}`}
                    fill
                    unoptimized
                    draggable={false}
                    loading={isActive ? 'eager' : 'lazy'}
                    className="cslider__img"
                    sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
                  />
                ) : (
                  <div className="cslider__img cslider__img--placeholder" aria-hidden="true" />
                )}
              </div>
            )
          })}
        </div>

        {/* Prev / Next */}
        {total > 1 && (
          <>
            <button
              type="button"
              className="cslider__arrow cslider__arrow--prev"
              onClick={prev}
              aria-label={`Slide anterior (${current === 0 ? total : current} de ${total})`}
            >
              <ChevronLeft />
            </button>
            <button
              type="button"
              className="cslider__arrow cslider__arrow--next"
              onClick={next}
              aria-label={`Siguiente slide (${current + 2 > total ? 1 : current + 2} de ${total})`}
            >
              <ChevronRight />
            </button>
          </>
        )}
      </div>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="cslider__footer">
        <div className="cslider__footer-left">
          {client && <span className="cslider__client">{client}</span>}
          {title  && (
            igUrl
              ? <a
                  href={igUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cslider__title cslider__title--link"
                  aria-label={`Ver ${title} en Instagram`}
                >
                  {title}
                  <IgArrow />
                </a>
              : <p className="cslider__title">{title}</p>
          )}
        </div>

        <div className="cslider__footer-right">
          {category && <span className="cslider__category">{category}</span>}

          {total > 4 && (
            <span className="cslider__counter" aria-hidden="true">
              {current + 1}&thinsp;/&thinsp;{total}
            </span>
          )}

          {total > 1 && (
            <div
              className="cslider__dots"
              role="tablist"
              aria-label={`${total} slides`}
            >
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`Ir al slide ${i + 1}`}
                  className={[
                    'cslider__dot',
                    i === current ? 'cslider__dot--active' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => setCurrent(i)}
                />
              ))}
            </div>
          )}
        </div>
      </footer>
    </article>
  )
}

// ── Icons ─────────────────────────────────────────────────────────────────────

function ChevronLeft() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}

function IgArrow() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  )
}
