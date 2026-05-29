// ─────────────────────────────────────────────────────────────────────────────
// components/sections/About.tsx — Sección sobre Madeleine (paridad HTML v3 #about)
// Layout: foto IZQUIERDA ~45% · contenido DERECHA ~55% · lg:items-center
// Fondo: .section-bg-b en page.tsx · pills .tag lavender / .tag.green lime
// Server Component
// ─────────────────────────────────────────────────────────────────────────────

import Image from 'next/image'

import SectionLabel from '@/components/ui/SectionLabel'
import { ABOUT_COPY } from '@/lib/content'

export default function About() {
  return (
    <section
      id="about"
      className={[
        'relative overflow-hidden',
        'section-pad-about',
      ].join(' ')}
      aria-labelledby="about-heading"
    >
      <div className="container-editorial">

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.45fr)_minmax(0,0.55fr)] lg:gap-20 lg:items-center">

          {/* ── Columna izquierda: foto ──────────────────────────────────── */}
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-[3/4] w-full max-w-[22rem] mx-auto lg:mx-0 lg:max-w-none overflow-hidden bg-shadow">
              <Image
                src={ABOUT_COPY.photo.src}
                alt={ABOUT_COPY.photo.alt}
                fill
                unoptimized
                className="object-cover object-top [filter:saturate(0.8)]"
                sizes="(max-width: 1023px) 80vw, 45vw"
              />

              <div
                className={[
                  'absolute bottom-4 right-4 z-[1]',
                  'rotate-3',
                  'bg-lime text-void',
                  'font-display text-[length:var(--text-label)] font-bold uppercase tracking-[0.08em]',
                  'rounded-[2px] px-4 py-2.5',
                  'shadow-[0_8px_32px_oklch(0_0_0_/_0.3)]',
                  'select-none',
                ].join(' ')}
                aria-hidden="true"
              >
                {ABOUT_COPY.availabilityBadge}
              </div>
            </div>
          </div>

          {/* ── Columna derecha: contenido ─────────────────────────────── */}
          <div className="order-1 lg:order-2 flex flex-col gap-10">

            <div className="flex flex-col gap-6">
              <SectionLabel index="01" text={ABOUT_COPY.sectionLabel} lineFull />

              <h2
                id="about-heading"
                className={[
                  'font-display font-black text-canvas',
                  'text-[clamp(2rem,4vw,3.5rem)]',
                  'leading-[0.9] tracking-[-0.035em] uppercase',
                ].join(' ')}
              >
                {ABOUT_COPY.headingMain}
                <em
                  className={[
                    'font-serif italic font-normal text-lavender',
                    'text-[1.1em] tracking-[-0.02em]',
                    'normal-case block',
                  ].join(' ')}
                >
                  {ABOUT_COPY.headingAccent}
                </em>
              </h2>

              <p className="font-mono text-[length:var(--text-body-sm)] uppercase tracking-[0.15em] text-dusk">
                {ABOUT_COPY.subtitle}
              </p>
            </div>

            <div className="flex flex-col gap-4 max-w-[50ch]">
              {ABOUT_COPY.bio.map((p, i) => (
                <p key={i} className="type-lead">{p}</p>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <p className="type-nano text-petal/45">Redes</p>
              <div className="flex flex-wrap gap-2.5">
                {ABOUT_COPY.socialLinks.map((social) => (
                  <a
                    key={social.id}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={[
                      'about-pill',
                      'inline-flex items-center gap-2.5',
                      'hover:-translate-y-[1px]',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lavender focus-visible:ring-offset-2 focus-visible:ring-offset-void',
                    ].join(' ')}
                    aria-label={`Abrir ${social.label} de Madeleine (nueva pestaña)`}
                  >
                    {social.id === 'instagram'
                      ? <InstagramIcon />
                      : social.id === 'linkedin'
                        ? <LinkedInIcon />
                        : <WhatsAppIcon />}
                    <span>{social.label}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-2.5">
                <p className="type-nano text-lavender/45">Software</p>
                <div className="flex flex-wrap gap-2">
                  {ABOUT_COPY.softwareTags.map((tag) => (
                    <span key={tag} className="about-pill">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2.5">
                <p className="type-nano text-lime">Áreas</p>
                <div className="flex flex-wrap gap-2">
                  {ABOUT_COPY.areaTags.map((tag) => (
                    <span key={tag} className="about-pill about-pill--lime">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

function InstagramIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" className="text-lavender">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" className="text-lavender">
      <path
        fill="currentColor"
        d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.03-1.85-3.03-1.85 0-2.14 1.44-2.14 2.93v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.28 2.36 4.28 5.45v6.29ZM5.34 7.43A2.06 2.06 0 1 1 5.34 3.3a2.06 2.06 0 0 1 0 4.13Zm1.78 13.02H3.56V9h3.56v11.45Z"
      />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" className="text-lavender">
      <path
        fill="currentColor"
        d="M20.52 3.48A11.86 11.86 0 0 0 12.07 0C5.47 0 .1 5.37.1 11.97c0 2.11.55 4.17 1.6 5.99L0 24l6.22-1.64a11.95 11.95 0 0 0 5.84 1.49h.01c6.6 0 11.97-5.37 11.97-11.97 0-3.2-1.25-6.2-3.52-8.4ZM12.07 21.8h-.01a9.9 9.9 0 0 1-5.03-1.37l-.36-.21-3.69.97.99-3.6-.24-.37a9.9 9.9 0 0 1-1.53-5.25c0-5.45 4.43-9.88 9.88-9.88a9.8 9.8 0 0 1 7 2.91 9.8 9.8 0 0 1 2.89 6.97c0 5.45-4.43 9.88-9.88 9.88Zm5.42-7.4c-.3-.15-1.76-.87-2.03-.96-.27-.1-.47-.15-.66.15-.2.3-.76.96-.93 1.16-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.37-1.48a8.78 8.78 0 0 1-1.64-2.04c-.17-.3-.02-.46.13-.6.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.08-.15-.66-1.6-.91-2.18-.24-.58-.48-.5-.66-.51h-.56c-.2 0-.52.08-.8.37-.27.3-1.04 1.01-1.04 2.47 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.09 4.48.71.31 1.27.5 1.7.64.72.23 1.37.2 1.89.12.58-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.18-1.41-.08-.12-.27-.2-.57-.35Z"
      />
    </svg>
  )
}
