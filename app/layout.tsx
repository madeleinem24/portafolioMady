// ─────────────────────────────────────────────────────────────────────────────
// app/layout.tsx — Root Layout
// 1. Inyecta las 3 familias tipográficas del HTML v3 (MASTER.md §III.1)
// 2. Navbar + CustomCursor + GrainOverlay + ScrollProgressBar (chrome global)
// 3. Metadata base y Open Graph
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import Script from 'next/script'

import { siteUrl } from '@/site.config'
import Navbar           from '@/components/layout/Navbar'
import CustomCursor     from '@/components/layout/CustomCursor'
import ScrollProgressBar from '@/components/layout/ScrollProgressBar'

import './globals.css'

// ── FUENTES — self-hosted (ADR: CI sin acceso a fonts.googleapis.com) ─────────
// Solo importar fuentes aquí. PROHIBIDO en cualquier otro archivo (CLAUDE.md §7).

const instrumentSerif = localFont({
  src: [
    { path: './fonts/instrument-serif-latin.woff2',        weight: '400', style: 'normal' },
    { path: './fonts/instrument-serif-italic-latin.woff2', weight: '400', style: 'italic' },
  ],
  variable: '--font-instrument-serif',
  display:  'swap',
})

const spaceMono = localFont({
  src: [
    { path: './fonts/space-mono-latin-400.woff2',        weight: '400', style: 'normal' },
    { path: './fonts/space-mono-latin-700.woff2',        weight: '700', style: 'normal' },
    { path: './fonts/space-mono-latin-400-italic.woff2', weight: '400', style: 'italic' },
  ],
  variable: '--font-space-mono',
  display:  'swap',
})

const unbounded = localFont({
  src:      './fonts/unbounded-latin.woff2',
  variable: '--font-unbounded',
  weight:   '100 900',   // variable-weight range — cubre font-black (900)
  display:  'swap',
})

// ── METADATA ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:  'Madeleine Morales — Diseñadora Gráfica',
    template: '%s — Madeleine Morales',
  },
  description:
    'Portafolio de Madeleine Morales, diseñadora gráfica graduada de la UCG. Branding, editorial, packaging y diseño digital de alto nivel.',
  keywords: ['diseñadora gráfica', 'portafolio', 'branding', 'editorial', 'packaging', 'UCG', 'Madeleine Morales'],
  authors:  [{ name: 'Madeleine Morales' }],
  creator:  'Madeleine Morales',
  openGraph: {
    type:        'website',
    locale:      'es_EC',
    siteName:    'Madeleine Morales — Portfolio',
    title:       'Madeleine Morales — Diseñadora Gráfica',
    description: 'Portafolio de alto nivel con estética de director de arte. Branding, editorial, packaging.',
  },
  twitter: {
    card:        'summary_large_image',
    title:       'Madeleine Morales — Diseñadora Gráfica',
    description: 'Portafolio de alto nivel con estética de director de arte.',
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  width:            'device-width',
  initialScale:     1,
  themeColor:       '#190019',
}

// ── ROOT LAYOUT ───────────────────────────────────────────────────────────────

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={[
        instrumentSerif.variable,
        spaceMono.variable,
        unbounded.variable,
      ].join(' ')}
    >
      <body suppressHydrationWarning>
        <a href="#main-content" className="skip-link">
          Saltar al contenido
        </a>

        {/* Elimina atributos inyectados por extensiones (Bitdefender, etc.) */}
        <Script
          id="strip-extension-attrs"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: `(function(){function s(r){try{if(!r||!r.querySelectorAll)return;r.querySelectorAll('[bis_skin_checked]').forEach(function(e){e.removeAttribute('bis_skin_checked')})}catch(e){}}function b(){s(document);var r=document.documentElement;if(!r)return;var o=new MutationObserver(function(rs){for(var i=0;i<rs.length;i++){var r=rs[i];if(r.type==='attributes'&&r.target&&r.target.removeAttribute)r.target.removeAttribute('bis_skin_checked');if(r.type==='childList'&&r.addedNodes)r.addedNodes.forEach(function(n){if(n&&n.nodeType===1)s(n)})}});o.observe(r,{subtree:true,childList:true,attributes:true,attributeFilter:['bis_skin_checked']});window.setTimeout(function(){try{o.disconnect()}catch(e){}},10000)}if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',b)}else{b()}})()` }}
        />

        {/* ── Grain Overlay (MASTER.md §VI.1) — textura fija animada ──── */}
        <div className="grain-overlay" aria-hidden="true" role="presentation" />

        {/* ── Chrome global ───────────────────────────────────────────── */}
        <CustomCursor />
        <ScrollProgressBar />
        <Navbar />

        {/* ── Contenido de página ─────────────────────────────────────── */}
        <main id="main-content">{children}</main>
      </body>
    </html>
  )
}
