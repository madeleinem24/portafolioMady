---
name: Madeleine Morales — Portfolio
description: Galería editorial de director de arte. Violeta-magenta, tipografía extrema, grid asimétrico.
colors:
  void: "oklch(0.148 0.069 328)"
  abyss: "oklch(0.257 0.101 299)"
  shadow: "oklch(0.360 0.092 320)"
  dusk: "oklch(0.499 0.082 347)"
  blush: "oklch(0.811 0.048 25)"
  petal: "oklch(0.934 0.030 50)"
  canvas: "oklch(0.984 0.009 45)"
  lavender: "oklch(0.722 0.177 306)"
  magenta: "oklch(0.710 0.246 341)"
  lime: "oklch(0.921 0.214 129)"
  gold: "oklch(0.887 0.180 97)"
  plum: "oklch(0.357 0.122 331)"
  violet: "oklch(0.271 0.091 314)"
  rose: "oklch(0.667 0.173 357)"
  orchid: "oklch(0.802 0.153 328)"
  iris: "oklch(0.541 0.087 280)"
typography:
  display:
    fontFamily: "var(--font-unbounded), system-ui, sans-serif"
    fontSize: "clamp(3.25rem, 7.5vw, 7.5rem)"
    fontWeight: 900
    lineHeight: 0.88
    letterSpacing: "-0.03em"
  display-section:
    fontFamily: "var(--font-unbounded), system-ui, sans-serif"
    fontSize: "clamp(3rem, 7vw, 7rem)"
    fontWeight: 900
    lineHeight: 0.9
    letterSpacing: "-0.035em"
  serif-accent:
    fontFamily: "var(--font-instrument-serif), Georgia, serif"
    fontStyle: italic
    fontWeight: 400
    letterSpacing: "-0.02em"
  body:
    fontFamily: "var(--font-space-mono), ui-monospace, monospace"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.75
  lead:
    fontFamily: "var(--font-space-mono), ui-monospace, monospace"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "var(--font-space-mono), ui-monospace, monospace"
    fontSize: "0.6875rem"
    fontWeight: 400
    letterSpacing: "0.2em"
  nano:
    fontFamily: "var(--font-space-mono), ui-monospace, monospace"
    fontSize: "0.5625rem"
    fontWeight: 400
    letterSpacing: "0.28em"
rounded:
  editorial: "2px"
spacing:
  section-sm: "8rem"
  section-md: "10rem"
  section-lg: "12rem"
  container-mobile: "4rem"
  container-tablet: "3rem"
  container-desktop: "5rem"
  grid-gap: "1.5rem"
components:
  button-primary:
    backgroundColor: "{colors.lavender}"
    textColor: "{colors.void}"
    typography: "{typography.label}"
    rounded: "{rounded.editorial}"
    padding: "14px 28px"
  button-primary-hover:
    backgroundColor: "{colors.lime}"
    textColor: "{colors.void}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.petal}"
    rounded: "{rounded.editorial}"
    padding: "14px 28px"
  section-label:
    typography: "{typography.label}"
    textColor: "{colors.lavender}"
---

# Design System: Madeleine Morales — Portfolio

> **Fuente canónica extendida:** `MASTER.md` (reglas completas, anti-patrones, efectos).  
> **Implementación en código:** `app/globals.css` (sincronizar con `TOKENS.md`).  
> **Contexto de producto:** `PRODUCT.md` (misma carpeta).  
> Si hay conflicto entre este resumen y `MASTER.md`, gana `MASTER.md`.

## Overview

**Creative North Star: "La doble página de revista"**

El portafolio no es un catálogo de servicios ni un template de agencia. Es una **galería editorial**: espacio generoso, jerarquía tipográfica extrema, grid asimétrico y acentos saturados sobre fondos violeta profundos. Cada sección comunica intención antes que utilidad.

**Estrategia cromática:** Committed / Full palette. Violeta-magenta del moodboard como atmósfera; acentos (`lavender`, `magenta`, `lime`, `gold`) con roles editoriales estrictos, nunca mezclados sin jerarquía.

**Tema:** Oscuro por defecto (`void` como canvas). Secciones claras (`canvas`) solo con transición editorial (marquee, divisor). Sin negro ni blanco puros.

**Key characteristics:**

- OKLCH exclusivo en implementación; hex solo como referencia en documentación
- Tres familias: Unbounded (display), Instrument Serif (acento italic), Space Mono (cuerpo y UI)
- Border radius máximo: `2px` (angular, editorial)
- Grids de proyectos asimétricos (nunca 3 columnas idénticas)
- Grain overlay obligatorio en fondos oscuros
- Animación CSS nativa; sin Framer Motion; `prefers-reduced-motion` obligatorio
- Zero estilos inline salvo valores calculados en runtime (`--scroll-progress`, posición del cursor)

**Ritmo vertical (home):** Hero → InfiniteSlider (marquee lime) → About → Work → Services → Contact.

## Colors

Paleta derivada del Moodboard.pdf y del legacy `madeleine_portfolio_v3_violet.html`. Contraste perceptual uniforme vía OKLCH.

### Primary (fondos y atmósfera)

| Token | OKLCH | Uso |
|-------|-------|-----|
| `void` | `oklch(0.148 0.069 328)` | Canvas principal, body |
| `abyss` | `oklch(0.257 0.101 299)` | Nav, drawers, secciones elevadas |
| `shadow` | `oklch(0.360 0.092 320)` | Cards, bordes, divisores |
| `dusk` | `oklch(0.499 0.082 347)` | Hover en fondos oscuros, outline text |
| `petal` | `oklch(0.934 0.030 50)` | Texto principal sobre void |
| `canvas` | `oklch(0.984 0.009 45)` | Fondos de sección clara |

**Regla:** No saltar más de dos pasos consecutivos en la escala de fondo. De `void` a `canvas` requiere elemento de transición.

### Secondary (acentos editoriales)

| Token | Rol | Límite por vista |
|-------|-----|------------------|
| `lavender` | UI cotidiana: links, hovers, focus, labels | Sin límite estricto |
| `magenta` | Impacto: CTAs secundarios, selección de texto | 1 momento fuerte por sección |
| `lime` | Disrupción: marquee strip | 1 por página |
| `gold` | Distinción: premios, badges editoriales | Uso puntual |

### Tertiary (moodboard)

`plum`, `violet`, `rose`, `orchid`, `iris`: profundidad cálida, datos, acentos secundarios en gradientes de proyecto.

### Contraste tipográfico

- Sobre `void`: texto principal `petal`; secundario `petal/55`; acentos `lavender`
- Sobre `canvas`: texto principal `abyss`; secundario `shadow`; acentos `plum` o `violet`
- Nunca `white` puro ni `black` puro en componentes

## Typography

### Familias (solo estas tres)

| Rol | Familia | Pesos | Uso |
|-----|---------|-------|-----|
| Display | Unbounded | 100–900 (variable) | Hero, títulos de sección, stats, logo |
| Serif | Instrument Serif | 400 + italic | `<em>` dentro de display, acentos editoriales |
| Mono | Space Mono | 400, 700 + italic | Body, nav, labels, ghost CTAs, tags |

Cargadas en `app/layout.tsx` vía `next/font/local`. **Prohibido** importar fuentes en otros archivos.

### Escala (clases `.type-*` en `globals.css`)

| Clase / token | Tamaño | Uso |
|---------------|--------|-----|
| `.type-hero` / `--text-hero` | `clamp(3.25rem, 7.5vw, 7.5rem)` | H1 hero |
| `.type-display` | `clamp(3rem, 7vw, 7rem)` | Titulares de sección |
| `.type-project-title` | `--text-title-xl` | Títulos de proyecto |
| `.type-stat` | `--text-title-xl` | Números hero |
| `.type-body` / `.type-lead` | 1rem / 0.9375rem | Prosa; max-width 50–65ch |
| `.type-label` / `.type-label-sans` | 11px | Etiquetas, nav logo |
| `.type-nano` | 9px | Índices de sección, footer meta |
| `.type-outline` | stroke 1.5px `dusk` | Técnica firma en hero |

**Reglas:** Jerarquía mínima 3 pasos entre mayor y menor por sección. Tracking y uppercase en labels. Instrument Serif solo en acentos italic, nunca como body.

## Elevation

Sistema **plano con profundidad atmosférica**, no Material shadows.

- **Capas:** grain overlay (z 9990) → scroll bar (9000) → cursor (9998–9999) → contenido
- **Elevación de superficie:** tonos `abyss` / `shadow` + bordes `lavender/10`, no `box-shadow` genérico
- **Hover en cards:** `translateY(-6px)` + sombra tintada OKLCH (`shadow` al 30%), no `shadow-lg` de Tailwind
- **Glass (nav scrolled):** `bg-void/90` + `backdrop-blur-md` + `border-petal/6` (raro, funcional)
- **Gradientes signature:** mesh hero, `--gradient-progress`, `--gradient-photo-mask` (ver MASTER §II.5)

## Components

Patrones implementados. No hay `<Card>` genérico; cada pieza es específica del portafolio.

| Componente | Ubicación | Notas |
|------------|-----------|-------|
| `SectionLabel` | `components/ui/` | `01 · Texto` + línea decorativa |
| `ProjectCard` | `components/ui/` | Full-bleed, gradiente o imagen, badge flecha `rounded-[2px]` |
| `Hero` | `sections/` | Outline text, orbs, stagger `.hero-enter-*` |
| `InfiniteSlider` | `sections/` | Marquee lime rotado -1.5°, pausa en hover/focus |
| `ProjectGrid` | `sections/` | Grid 12-col asimétrico: 7+5 / 5+5 / 4+4+4 |
| `Navbar` | `layout/` | Scroll-aware blur; hamburger mobile ≥44px |
| `CustomCursor` | `layout/` | Solo `pointer: fine`; oculto con reduced motion |
| `ScrollProgressBar` | `layout/` | `--scroll-progress` vía JS |
| `GrainOverlay` | `layout.tsx` + `.grain-overlay` | Textura SVG animada |

**CTAs:** `rounded-[2px]`. Primary: `lavender` → hover `lime`. Ghost: borde `petal/25` → hover `lavender`.

**Focus:** `outline-lavender` o `outline-canvas`, offset 3–4px. Nunca eliminar sin reemplazo.

**Contenedor:** `.container-editorial` max-width 1440px; padding según breakpoint (ver `globals.css`).

### Sidecar (motion y estados no-Stitch)

```yaml
motion:
  easing-default: "cubic-bezier(0.16, 1, 0.3, 1)"  # ease-out-expo
  duration-hover: 200ms
  duration-transition: 300ms
  duration-reveal: 800ms
  duration-dramatic: 1200ms
  reduced-motion: "0.01ms + animation-iteration-count 1 en @media prefers-reduced-motion"
focus:
  ring: "2px solid var(--color-lavender)"
  offset: "3px"
```

## Do's and Don'ts

### Do

- Leer `MASTER.md` antes de cualquier UI
- Usar tokens Tailwind: `bg-void`, `text-petal`, `text-lavender`, etc.
- Usar clases `.type-*` para tipografía
- Grids asimétricos en proyectos
- `prefers-reduced-motion` en toda animación nueva
- `next/image` con `unoptimized` en SSG
- Espaciado de sección ≥ `--spacing-32` (128px)

### Don't

- Hex en `className` (`text-[#C084FC]`) o inline de color
- `rounded-xl`, `rounded-full` (excepto cursor ring documentado en MASTER §VI.3)
- Poppins, Inter, Montserrat, DM Sans
- Degradado púrpura-azul genérico
- Grids uniformes de cards idénticas
- `transition: all` o easing bounce/elastic
- Más de dos acentos compitiendo en un mismo componente
- Estilos inline excepto `--scroll-progress` y posición del custom cursor

---

*Generado desde `MASTER.md` v1.1.0 y `app/globals.css`. Última sincronización: 2026-05-15.*
