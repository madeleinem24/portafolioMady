// ─────────────────────────────────────────────────────────────────────────────
// app/page.tsx — Home Page
// Ensambla todas las secciones en el orden editorial del portfolio.
// Ritmo: .section-pad-* (en componentes) + .section-bg-a|b (aquí, alternos)
// Hero (void) → Marquee (lime) → About B → Services A → UGC B → Cortefino A → Tonimix B → Producciones A → Skills B → Contact A*
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from 'next'

import Hero           from '@/components/sections/Hero'
import InfiniteSlider from '@/components/sections/InfiniteSlider'
import Skills         from '@/components/sections/Skills'
import About          from '@/components/sections/About'
import Services       from '@/components/sections/Services'
import UgcCarousel         from '@/components/sections/UgcCarousel'
import CorteFinoSection    from '@/components/sections/CorteFinoSection'
import TonimixSection      from '@/components/sections/TonimixSection'
import ProduccionesSection from '@/components/sections/ProduccionesSection'
import Contact             from '@/components/sections/Contact'

export const metadata: Metadata = {
  title:       'Madeleine Morales — Diseñadora Gráfica',
  description: 'Portafolio de Madeleine Morales. Multimedia, diseño, producción audiovisual y contenido UGC. Creatividad con propósito, diseño con alma.',
}

export default function HomePage() {
  return (
    <div className="relative bg-void">
      {/* 1 — Hero: void propio · min-h-svh */}
      <Hero />

      {/* 2 — InfiniteSlider: lime propio · transición Hero → contenido */}
      <InfiniteSlider />

      {/* Ritmo editorial: A/B alterno desde About (Hero y Marquee son excepciones) */}
      <div className="section-bg-b">
        <About />
      </div>

      <div className="section-bg-a">
        <Services />
      </div>

      <div className="section-bg-b">
        <UgcCarousel />
      </div>

      {/* §05 — Cortefino: 5 TikToks en bento asimétrico de phones */}
      <div className="section-bg-a">
        <CorteFinoSection />
      </div>

      {/* §06 — Tonimix: key visuals + LinkedIn logro + merchandising */}
      <div className="section-bg-b">
        <TonimixSection />
      </div>

      {/* §07 — Producciones: videos 16:9 + fotografías editoriales */}
      <div className="section-bg-a">
        <ProduccionesSection />
      </div>

      <div className="section-bg-b">
        <Skills />
      </div>

      <div className="section-bg-a--contact">
        <Contact />
      </div>
    </div>
  )
}
