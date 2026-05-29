// ─────────────────────────────────────────────────────────────────────────────
// components/sections/TonimixSection.tsx — §06 TONIMIX
// Key Visuals, MUPI, LinkedIn logro y merchandising.
// Server Component — sin interactividad directa.
// ─────────────────────────────────────────────────────────────────────────────

import LinkedInAchievementCard from '@/components/ui/LinkedInAchievementCard'
import SectionLabel            from '@/components/ui/SectionLabel'
import UgcKeyVisualCell        from '@/components/ui/UgcKeyVisualCell'

const MERCH = [
  { src: '/ugc/tonimix/merch/gorra.webp',    alt: 'Gorra Tonimix — diseño retrodigital',   title: 'Gorra' },
  { src: '/ugc/tonimix/merch/hoodie.webp',   alt: 'Hoodie Chill Tonimix',                   title: 'Hoodie' },
  { src: '/ugc/tonimix/merch/tote-bag.webp', alt: 'Tote bag Tonimix',                        title: 'Tote bag' },
  { src: '/ugc/tonimix/merch/camiseta.webp', alt: 'Camiseta ToniChill Tonimix',              title: 'Camiseta' },
]

export default function TonimixSection() {
  return (
    <section
      id="tonimix"
      className="section-pad-client"
      aria-label="Cliente: Tonimix — identidad de marca"
    >
      <div className="container-editorial">

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <header className="client-header">
          <SectionLabel index="06" text="Tonimix" lineFull className="mb-4" />
          <h2
            className={[
              'font-display font-black text-petal uppercase',
              'text-[clamp(2.25rem,5vw,4.5rem)] leading-[0.9] tracking-[-0.035em]',
            ].join(' ')}
          >
            Identidad
            <br />
            <em className="font-serif italic font-normal normal-case text-gold text-[1.05em] tracking-[-0.02em]">
              de marca.
            </em>
          </h2>
          <p className="mt-6 text-sm font-mono text-petal/50 max-w-[46ch] leading-relaxed">
            Dirección de arte, key visuals, MUPI y merchandising para Tonimix.
            Campaña retrodigital reconocida en la escena creativa ecuatoriana.
          </p>
        </header>

        {/* ── Grid de marca ─────────────────────────────────────────────── */}
        <div className="toni-grid">

          {/* ═══ FILA 1: KV1 grande + MUPI retrato ═══════════════════════ */}
          <div className="toni-row toni-row--hero">
            <div className="toni-kv toni-kv--primary">
              <UgcKeyVisualCell
                src="/ugc/tonimix/key-visual-1.webp"
                alt="Key Visual Tonimix — campaña RetroDigital Ecuador, dirección de arte"
                client="Tonimix"
                title="Key Visual 01"
                category="Key Visual"
                imgWidth={1200}
                imgHeight={800}
              />
            </div>
            <div className="toni-mupi">
              <UgcKeyVisualCell
                src="/ugc/tonimix/mupi.webp"
                alt="MUPI publicitario Tonimix — vía pública Guayaquil"
                client="Tonimix"
                title="MUPI"
                category="MUPI"
                imgWidth={600}
                imgHeight={900}
              />
            </div>
          </div>

          {/* ═══ FILA 2: LinkedIn achievement + KV2 ══════════════════════ */}
          <div className="toni-row toni-row--mid">
            <LinkedInAchievementCard />
            <div className="toni-kv toni-kv--secondary">
              <UgcKeyVisualCell
                src="/ugc/tonimix/key-visual-2.webp"
                alt="Key Visual Tonimix 2 — composición editorial productos fondo azul"
                client="Tonimix"
                title="Key Visual 02"
                category="Key Visual"
                imgWidth={1000}
                imgHeight={700}
              />
            </div>
          </div>

          {/* ═══ FILA 3: Merchandising ════════════════════════════════════ */}
          <div className="toni-merch-strip" aria-label="Línea de merchandising Tonimix">
            <p className="toni-merch-label" aria-hidden="true">Merchandising</p>
            <div className="toni-merch-grid">
              {MERCH.map((item) => (
                <div key={item.src} className="toni-merch-item">
                  <UgcKeyVisualCell
                    src={item.src}
                    alt={item.alt}
                    title={item.title}
                    category="Merch"
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
