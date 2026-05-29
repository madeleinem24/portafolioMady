// ─────────────────────────────────────────────────────────────────────────────
// components/ui/LinkedInAchievementCard.tsx — Logro destacado RetroDigital
// Server component. Muestra imágenes de la publicación + CTA a LinkedIn.
// Paleta: gold (distinción editorial) + abyss background.
// ─────────────────────────────────────────────────────────────────────────────

import Image from 'next/image'

const LINKEDIN_URL =
  'https://www.linkedin.com/posts/madeleine-morales-diaz-773333117_retrodigital-ecuador-design-activity-7424223803481690112-eE4-'

export default function LinkedInAchievementCard() {
  return (
    <article
      className="linkedin-card"
      aria-label="Logro destacado: reconocimiento RetroDigital Ecuador"
    >
      {/* ── Cabecera ──────────────────────────────────────────────── */}
      <header className="linkedin-card__head">
        <span className="linkedin-card__badge" aria-label="Logro destacado">
          <AwardStar />
          Logro destacado
        </span>
        <LinkedInLogo />
      </header>

      {/* ── Fotos ─────────────────────────────────────────────────── */}
      <div className="linkedin-card__photos" aria-hidden="true">
        <div className="linkedin-card__photo">
          <Image
            src="/ugc/tonimix/linkedin-1.webp"
            alt=""
            fill
            unoptimized
            className="object-cover"
          />
        </div>
        <div className="linkedin-card__photo">
          <Image
            src="/ugc/tonimix/linkedin-2.webp"
            alt=""
            fill
            unoptimized
            className="object-cover"
          />
        </div>
      </div>

      {/* ── Contenido ─────────────────────────────────────────────── */}
      <div className="linkedin-card__body">
        <h3 className="linkedin-card__title">
          RetoDigital<br />Ecuador
        </h3>
        <p className="linkedin-card__desc">
          Dirección de arte y diseño de campaña para Tonimix reconocidos en
          la escena creativa nacional.{' '}
          <span className="linkedin-card__tags">#retodigital #ecuador #design #effie #tonicorp</span>
        </p>
      </div>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <a
        href={LINKEDIN_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="linkedin-card__cta"
        aria-label="Ver publicación de logro RetroDigital en LinkedIn (abre en nueva pestaña)"
      >
        Ver publicación <span aria-hidden="true">→</span>
      </a>
    </article>
  )
}

function AwardStar() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="linkedin-card__star"
    >
      <path
        fill="currentColor"
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
      />
    </svg>
  )
}

function LinkedInLogo() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="linkedin-card__logo"
    >
      <path
        fill="currentColor"
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      />
    </svg>
  )
}
