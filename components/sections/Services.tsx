// ─────────────────────────────────────────────────────────────────────────────
// components/sections/Services.tsx — Servicios de diseño (6 tarjetas)
// Paridad HTML v3 #services — .services-head + .services-grid / .svc-card
// Sin SectionLabel (el HTML v3 no lo incluye)
// Reveal: scroll-driven fadeUp en globals.css · prefers-reduced-motion: sin animación
// Server Component
// ─────────────────────────────────────────────────────────────────────────────

import { SERVICES, SERVICES_COPY } from '@/lib/content'

export default function Services() {
  return (
    <section
      id="services"
      className="relative overflow-hidden section-pad-services"
      aria-labelledby="services-heading"
    >
      <div className="container-editorial">

        <div className="services-head services-enter-head flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2
            id="services-heading"
            className={[
              'font-display font-black text-canvas',
              'text-[clamp(2.25rem,5vw,4.5rem)]',
              'leading-[0.9] tracking-[-0.035em] uppercase',
            ].join(' ')}
          >
            {SERVICES_COPY.headingMain}
            <br />
            <em
              className={[
                'font-serif italic font-normal',
                'text-magenta normal-case',
                'text-[1.05em] tracking-[-0.02em]',
              ].join(' ')}
            >
              {SERVICES_COPY.headingAccent}
            </em>
          </h2>

          <p className="type-lead max-w-[28ch] md:text-right">
            {SERVICES_COPY.lead}
          </p>
        </div>

        <div
          className="services-grid services-enter-grid"
          role="list"
          aria-label="Servicios de diseño"
        >
          {SERVICES.map((svc) => (
            <article
              key={svc.id}
              role="listitem"
              className="svc-card group"
              aria-label={`Servicio: ${svc.title}`}
            >
              <span className="svc-num" aria-hidden="true">
                {svc.num}
              </span>

              <div className="svc-body">
                <span className="svc-icon" aria-hidden="true">
                  {svc.icon}
                </span>

                <h3 className="svc-name">{svc.title}</h3>

                <p className="svc-desc">{svc.desc}</p>

                <div className="svc-pills">
                  {svc.pills.map((pill) => (
                    <span key={pill} className="svc-pill">
                      {pill}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  )
}
