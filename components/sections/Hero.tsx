// ─────────────────────────────────────────────────────────────────────────────
// components/sections/Hero.tsx — Hero principal (sin nav — Navbar.tsx)
// Composición editorial por capas — z-index en .hero-* (globals.css)
// Tipografía: MASTER.md §III — Unbounded 900, Instrument Serif italic, Space Mono
// Server Component (ADR-003) — sin estado
// ─────────────────────────────────────────────────────────────────────────────

import HeroPhoto from '@/components/ui/HeroPhoto'
import { HERO_COPY } from '@/lib/content'

export default function Hero() {
  return (
    <section
      id="hero"
      className="hero-section bg-void"
      aria-label="Presentación de Madeleine Morales"
    >
      {/* z-0 — fondo */}
      <div className="hero-bg-mesh" aria-hidden="true" />
      <div className="orb orb-violet" aria-hidden="true" />
      <div className="orb orb-magenta" aria-hidden="true" />
      <div className="orb orb-lime" aria-hidden="true" />
      <svg
        className="hero-star hero-star-lg motion-safe:animate-[spin_20s_linear_infinite] max-md:hidden"
        viewBox="0 0 100 100"
        aria-hidden="true"
        focusable="false"
      >
        <polygon points="50,0 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35" />
      </svg>
      <svg
        className="hero-star hero-star-md motion-safe:animate-[spin_15s_linear_infinite_reverse] max-lg:hidden"
        viewBox="0 0 100 100"
        aria-hidden="true"
        focusable="false"
      >
        <polygon points="50,0 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35" />
      </svg>
      <svg
        className="hero-star hero-star-sm motion-safe:animate-[spin_25s_linear_infinite]"
        viewBox="0 0 100 100"
        aria-hidden="true"
        focusable="false"
      >
        <polygon points="50,0 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35" />
      </svg>

      {/* z-1 — retrato atrás del titular (fade-in al cargar) */}
      <div className="hero-photo-wrap" aria-hidden="true">
        <HeroPhoto />
      </div>

      {/* z-2 — tag + H1 delante del retrato */}
      <div className="hero-headline">
        <p className="hero-enter-tag hero-tag">
          <span className="hero-tag-line" aria-hidden="true" />
          {HERO_COPY.tag}
        </p>

        <h1
          className="type-hero hero-enter-title hero-title"
          aria-label="Madeleine Morales"
        >
          <span className="sr-only">Madeleine Morales</span>
          <span aria-hidden="true">
            <span className="hero-name-line-first">
              {HERO_COPY.namePrefix}
              <span className="hero-name-accent">
                {HERO_COPY.nameOutline}
                {HERO_COPY.nameSerif}
              </span>
            </span>
            <br />
            {HERO_COPY.nameSuffix}
          </span>
        </h1>
      </div>

      {/* z-3 — UI legible delante de todo */}
      <div className="hero-foreground">
        <p className="hero-enter-desc hero-desc">
          {HERO_COPY.descriptionLine1}
          <br />
          {HERO_COPY.descriptionLine2}
        </p>

        <div className="hero-enter-actions hero-actions">
          <a
            href={HERO_COPY.cta.primary.href}
            className="type-label-sans btn-hero-primary"
          >
            {HERO_COPY.cta.primary.label}
          </a>
          <a
            href={HERO_COPY.cta.ghost.href}
            className="type-label btn-hero-ghost"
          >
            {HERO_COPY.cta.ghost.label}
          </a>
        </div>
      </div>

      <div
        className="hero-enter-stats hero-stats"
        aria-label="Estadísticas profesionales"
      >
        {HERO_COPY.stats.map((stat) => (
          <div key={stat.label} className="hero-stat-item">
            <span className="hero-stat-value" aria-label={`${stat.value}${stat.suffix}`}>
              {stat.value}
              <span className="text-lavender" aria-hidden="true">{stat.suffix}</span>
            </span>
            <span className="hero-stat-label">{stat.label}</span>
          </div>
        ))}
      </div>

      <div className="hero-enter-scroll hero-scroll-cue" aria-hidden="true">
        <span className="hero-scroll-label">
          {HERO_COPY.scrollLabel}
        </span>
        <div className="hero-scroll-line motion-safe:animate-[scrollPulse_2s_var(--ease-in-out)_infinite]" />
      </div>
    </section>
  )
}
