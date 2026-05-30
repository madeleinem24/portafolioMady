// ─────────────────────────────────────────────────────────────────────────────
// components/sections/TonimixSection.tsx — §06 TONIMIX
// Key Visuals, MUPI, LinkedIn logro y merchandising.
// Server Component — sin interactividad directa.
// ─────────────────────────────────────────────────────────────────────────────

import LinkedInAchievementCard from '@/components/ui/LinkedInAchievementCard'
import SectionLabel            from '@/components/ui/SectionLabel'
import UgcKeyVisualCell        from '@/components/ui/UgcKeyVisualCell'
import { TONIMIX_COPY }        from '@/lib/content'
import {
  TONIMIX_KEY_VISUALS,
  TONIMIX_MERCH,
  TONIMIX_MERCH_CATEGORY,
} from '@/lib/tonimix'

export default function TonimixSection() {
  const { primary, mupi, secondary } = TONIMIX_KEY_VISUALS

  return (
    <section
      id="tonimix"
      className="section-pad-client"
      aria-label={TONIMIX_COPY.ariaLabel}
    >
      <div className="container-editorial">

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <header className="client-header">
          <SectionLabel
            index={TONIMIX_COPY.sectionIndex}
            text={TONIMIX_COPY.sectionLabel}
            lineFull
            className="mb-4"
          />
          <h2
            className={[
              'font-display font-black text-petal uppercase',
              'text-[clamp(2.25rem,5vw,4.5rem)] leading-[0.9] tracking-[-0.035em]',
            ].join(' ')}
          >
            {TONIMIX_COPY.headingMain}
            <br />
            <em className="font-serif italic font-normal normal-case text-gold text-[1.05em] tracking-[-0.02em]">
              {TONIMIX_COPY.headingAccent}
            </em>
          </h2>
          <p className="mt-6 text-sm font-mono text-petal/50 max-w-[46ch] leading-relaxed">
            {TONIMIX_COPY.intro}
          </p>
        </header>

        {/* ── Grid de marca ─────────────────────────────────────────────── */}
        <div className="toni-grid">

          {/* ═══ FILA 1: KV1 grande + MUPI retrato ═══════════════════════ */}
          <div className="toni-row toni-row--hero">
            <div className="toni-kv toni-kv--primary">
              <UgcKeyVisualCell {...primary} />
            </div>
            <div className="toni-mupi">
              <UgcKeyVisualCell {...mupi} />
            </div>
          </div>

          {/* ═══ FILA 2: LinkedIn achievement + KV2 ══════════════════════ */}
          <div className="toni-row toni-row--mid">
            <LinkedInAchievementCard />
            <div className="toni-kv toni-kv--secondary">
              <UgcKeyVisualCell {...secondary} />
            </div>
          </div>

          {/* ═══ FILA 3: Merchandising ════════════════════════════════════ */}
          <div className="toni-merch-strip" aria-label={TONIMIX_COPY.merchAriaLabel}>
            <p className="toni-merch-label" aria-hidden="true">
              {TONIMIX_COPY.merchLabel}
            </p>
            <div className="toni-merch-grid">
              {TONIMIX_MERCH.map((item) => (
                <div key={item.src} className="toni-merch-item editorial-print-frame">
                  <UgcKeyVisualCell
                    src={item.src}
                    alt={item.alt}
                    title={item.title}
                    category={TONIMIX_MERCH_CATEGORY}
                    objectFit="contain"
                    imgWidth={400}
                    imgHeight={400}
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
