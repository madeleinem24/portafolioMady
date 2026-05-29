# TOKENS.md — Referencia Completa de CSS Tokens
> Este archivo preserva la plantilla completa de `app/globals.css`.  
> Sincronizar con `MASTER.md §VIII` ante cualquier cambio de paleta.

---

## `app/globals.css` — Plantilla completa

```css
@import "tailwindcss";

@theme {
  /* ── COLORES — OKLCH ──────────────────────────────────── */
  --color-void:         oklch(0.148 0.069 328);
  --color-abyss:        oklch(0.257 0.101 299);
  --color-shadow:       oklch(0.360 0.092 320);
  --color-dusk:         oklch(0.499 0.082 347);
  --color-blush:        oklch(0.811 0.048 25);
  --color-petal:        oklch(0.934 0.030 50);
  --color-canvas:       oklch(0.984 0.009 45);

  --color-lavender:     oklch(0.722 0.177 306);
  --color-magenta:      oklch(0.710 0.246 341);
  --color-lime:         oklch(0.921 0.214 129);
  --color-gold:         oklch(0.887 0.180 97);

  --color-plum:         oklch(0.357 0.122 331);
  --color-violet:       oklch(0.271 0.091 314);
  --color-rose:         oklch(0.667 0.173 357);
  --color-orchid:       oklch(0.802 0.153 328);
  --color-iris:         oklch(0.541 0.087 280);

  /* ── FUENTES — paridad HTML v3 (MASTER.md §III.1) ───── */
  --font-serif:         var(--font-instrument-serif), Georgia, serif;
  --font-sans:          var(--font-space-mono), ui-monospace, monospace;
  --font-display:       var(--font-unbounded), system-ui, sans-serif;
  --font-mono:          var(--font-space-mono), 'Courier New', monospace;

  /* ── ESCALA TIPOGRÁFICA (resumen — ver globals.css completo) ─ */
  --text-nano:          0.5625rem;   /* 9px */

  /* ── ESPACIADO ────────────────────────────────────────── */
  --spacing-0:          0.125rem;
  --spacing-1:          0.25rem;
  --spacing-2:          0.5rem;
  --spacing-3:          0.75rem;
  --spacing-4:          1rem;
  --spacing-5:          1.25rem;
  --spacing-6:          1.5rem;
  --spacing-8:          2rem;
  --spacing-10:         2.5rem;
  --spacing-12:         3rem;
  --spacing-16:         4rem;
  --spacing-20:         5rem;
  --spacing-24:         6rem;
  --spacing-32:         8rem;
  --spacing-40:         10rem;
  --spacing-48:         12rem;
  --spacing-64:         16rem;

  /* ── EASING ───────────────────────────────────────────── */
  --ease-out-expo:      cubic-bezier(0.16, 1, 0.3, 1);
  --ease-out-quart:     cubic-bezier(0.25, 1, 0.5, 1);
  --ease-reveal:        cubic-bezier(0.22, 1, 0.36, 1);

  /* ── DURACIÓN ─────────────────────────────────────────── */
  --duration-fast:      200ms;
  --duration-base:      300ms;
  --duration-slow:      500ms;
  --duration-reveal:    800ms;
  --duration-dramatic:  1200ms;
}

/* Variables CSS nativas */
:root {
  --grain-opacity: 0.045;
  --transition:    cubic-bezier(0.16, 1, 0.3, 1);
}

/* Reset mínimo */
*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  background-color: var(--color-void);
  color:            var(--color-petal);
  font-family:      var(--font-sans);
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
  cursor: auto;
}
*::selection {
  background: var(--color-magenta);
  color:      var(--color-canvas);
}

/* Accesibilidad */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration:       0.01ms !important;
    animation-iteration-count: 1    !important;
    transition-duration:      0.01ms !important;
  }
}
```

---

## `next.config.ts` — Plantilla completa

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,       // SSG: next/image no optimiza en build time
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      // Agregar aquí el hostname de la API de imágenes de la diseñadora
      // { protocol: 'https', hostname: 'api.ejemplo.com', pathname: '/**' },
    ],
  },
  // Descomentar en producción si el repo no está en raíz de GH Pages:
  // basePath: '/madeleine-portfolio',
}

export default nextConfig
```

---

## `lib/types.ts` — Tipos de dominio completos

```typescript
export interface ProjectData {
  id:          string
  slug:        string
  title:       string
  category:    'branding' | 'editorial' | 'packaging' | 'digital' | 'motion'
  year:        number
  description: string
  tags:        string[]
  imageUrl:    string          // URL directa — NO publicId de Cloudinary
  imageAlt:    string
  videoPublicId?: string       // Cloudinary publicId si hay video de proceso
  aspectRatio: '16/9' | '4/3' | '3/4' | '1/1'
  featured:    boolean
  gridSpan:    'large' | 'medium' | 'small'
}

export interface ServiceData {
  id:           string
  title:        string
  description:  string
  deliverables: string[]
}
```
