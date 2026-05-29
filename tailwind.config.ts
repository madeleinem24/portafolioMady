// ─────────────────────────────────────────────────────────────────────────────
// Tailwind CSS v4 — Configuración mínima
//
// En Tailwind v4 la fuente de verdad de tokens está en globals.css via @theme.
// Este archivo solo existe para compatibilidad con herramientas que lo esperan
// (editors, plugins de terceros) y para extensiones específicas del proyecto.
//
// NUNCA duplicar tokens aquí. Siempre editar design-system/MASTER.md primero,
// luego reflejar el cambio en app/globals.css > @theme.
// ─────────────────────────────────────────────────────────────────────────────

import type { Config } from 'tailwindcss'

const config: Config = {
  // Tailwind v4 detecta contenido automáticamente, pero siendo explícitos:
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],

  // En v4 el theme se define en CSS via @theme (globals.css).
  // Aquí solo se documentan los tokens para referencia; no reemplazan al CSS.
  theme: {
    extend: {
      // ── Fuentes (variables CSS inyectadas por next/font en layout.tsx) ──────
      fontFamily: {
        serif:   ['var(--font-serif)',   'Georgia', 'serif'],
        sans:    ['var(--font-sans)',    'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'sans-serif'],
        mono:    ['var(--font-mono)',    'Courier New', 'monospace'],
      },

      // ── Colores OKLCH (del MASTER.md §II) ───────────────────────────────────
      // Referenciados como CSS variables para que funcionen con opacity modifier
      // ej: bg-void/50, text-lavender/80
      colors: {
        // Escala de fondo
        void:    'oklch(0.148 0.069 328)',
        abyss:   'oklch(0.257 0.101 299)',
        shadow:  'oklch(0.360 0.092 320)',
        dusk:    'oklch(0.499 0.082 347)',
        blush:   'oklch(0.811 0.048 25)',
        petal:   'oklch(0.934 0.030 50)',
        canvas:  'oklch(0.984 0.009 45)',

        // Acentos
        lavender: 'oklch(0.722 0.177 306)',
        magenta:  'oklch(0.710 0.246 341)',
        lime:     'oklch(0.921 0.214 129)',
        gold:     'oklch(0.887 0.180 97)',

        // Moodboard
        plum:    'oklch(0.357 0.122 331)',
        violet:  'oklch(0.271 0.091 314)',
        rose:    'oklch(0.667 0.173 357)',
        orchid:  'oklch(0.802 0.153 328)',
        iris:    'oklch(0.541 0.087 280)',
      },

      // ── Espaciado (del MASTER.md §IV — escala 4px base) ──────────────────
      spacing: {
        '0':  '0.125rem',  //   2px
        '1':  '0.25rem',   //   4px
        '2':  '0.5rem',    //   8px
        '3':  '0.75rem',   //  12px
        '4':  '1rem',      //  16px
        '5':  '1.25rem',   //  20px
        '6':  '1.5rem',    //  24px
        '8':  '2rem',      //  32px
        '10': '2.5rem',    //  40px
        '12': '3rem',      //  48px
        '16': '4rem',      //  64px
        '20': '5rem',      //  80px
        '24': '6rem',      //  96px
        '32': '8rem',      // 128px
        '40': '10rem',     // 160px
        '48': '12rem',     // 192px
        '64': '16rem',     // 256px
      },

      // ── Easing ────────────────────────────────────────────────────────────
      transitionTimingFunction: {
        'out-expo':  'cubic-bezier(0.16, 1, 0.3, 1)',
        'out-quart': 'cubic-bezier(0.25, 1, 0.5, 1)',
        'reveal':    'cubic-bezier(0.22, 1, 0.36, 1)',
      },

      // ── Duración ──────────────────────────────────────────────────────────
      transitionDuration: {
        'instant':  '80ms',
        'fast':     '200ms',
        'base':     '300ms',
        'slow':     '500ms',
        'reveal':   '800ms',
        'dramatic': '1200ms',
      },
    },
  },
  plugins: [],
}

export default config
