'use client'
// ─────────────────────────────────────────────────────────────────────────────
// components/sections/InfiniteSlider.tsx — Marquee strip rotado (HTML v3)
// .marquee-strip → overflow-hidden bg-lime section-marquee + rotate(-1.5deg)
// .marquee-inner → inline-flex · animation: mq 18s linear infinite
// TRACK = [...ITEMS, ...ITEMS] — loop seamless (8 ítems + ✦ × 2)
// Pausa en hover/focus · prefers-reduced-motion en globals.css
// ─────────────────────────────────────────────────────────────────────────────

import { useRef } from 'react'

import { SLIDER_ARIA_LABEL, SLIDER_ITEMS } from '@/lib/content'

const TRACK = [...SLIDER_ITEMS, ...SLIDER_ITEMS]

export default function InfiniteSlider() {
  const trackRef = useRef<HTMLDivElement>(null)

  const pause  = () => { trackRef.current?.classList.add('is-paused') }
  const resume = () => { trackRef.current?.classList.remove('is-paused') }

  return (
    <div
      className="marquee-strip overflow-hidden bg-lime section-marquee"
      role="region"
      aria-label={SLIDER_ARIA_LABEL}
      tabIndex={0}
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocus={pause}
      onBlur={resume}
    >
      <div ref={trackRef} className="marquee-inner" aria-hidden="true">
        {TRACK.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center font-display text-sm font-bold uppercase tracking-[0.05em] text-void"
          >
            <span className="px-6">{item}</span>
            <span className="sep" aria-hidden="true">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
