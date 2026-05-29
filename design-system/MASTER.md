# DESIGN SYSTEM MASTER
## Madeleine Morales — Portfolio
**Generado por:** UI UX Pro Max × Impeccable  
**Estilo:** `Creative / Portfolio` — Brand Mode  
**Versión:** 1.1.0  
**Última revisión:** 2026-05-15

**Carpeta `design-system/`**

| Archivo | Rol |
|---------|-----|
| `MASTER.md` | Fuente canónica (este documento) |
| `TOKENS.md` | Plantillas de `globals.css`, `next.config`, tipos |
| `DESIGN.md` | Resumen visual para Impeccable / agentes |
| `PRODUCT.md` | Contexto estratégico (marca, usuarios, anti-referencias) |

---

> **Principio rector:** Este sistema no existe para hacer componentes bonitos.  
> Existe para construir una *experiencia de director de arte* — donde cada decisión  
> de espacio, color y tipo comunica intención antes que utilidad.

---

## ÍNDICE

1. [Principios Visuales](#i-principios-visuales)
2. [Paleta de Colores — OKLCH](#ii-paleta-de-colores--oklch)
3. [Tipografía — Herencia HTML v3 (Google Fonts)](#iii-tipografía--herencia-html-v3-google-fonts)
4. [Espaciado Modular](#iv-espaciado-modular)
5. [Tokens de Movimiento](#v-tokens-de-movimiento)
6. [Efectos y Texturas](#vi-efectos-y-texturas)
7. [Anti-Patrones Prohibidos](#vii-anti-patrones-prohibidos)
8. [CSS Custom Properties — Referencia Rápida](#viii-css-custom-properties--referencia-rápida)

---

## I. PRINCIPIOS VISUALES

### 1.1 — Brand Voice Visual

El portafolio de Madeleine no es un catálogo. Es una **galería editorial**.  
Cada sección se lee como una doble página de revista de arte contemporáneo.

| Atributo       | Expresión en diseño                                    |
|----------------|--------------------------------------------------------|
| **Sofisticada** | Espacio blanco generoso, fuentes con carácter propio  |
| **Audaz**       | Acentos de color saturados contra fondos oscuros       |
| **Editorial**   | Grids asimétricos, jerarquía tipográfica extrema       |
| **Sensorial**   | Textura de grano, transiciones con personalidad        |
| **Precisa**     | Alineaciones intencionadas, ni un píxel de accidente  |

### 1.2 — Filosofía de Color

Se usa **OKLCH** de forma exclusiva para garantizar:
- Contraste perceptualmente uniforme entre pasos de la escala.
- Colores vibrantes que no se "lavan" al cruzar contextos de pantalla.
- Transiciones CSS `oklch()` suaves sin giros de matiz inesperados.

**Regla absoluta:** Lightness mínima en fondos = `0.14`. No hay negro puro.  
**Regla absoluta:** Lightness máxima en blancos = `0.985`. No hay blanco puro.

### 1.3 — Filosofía Tipográfica

**Tres familias** extraídas del `madeleine_portfolio_v3_violet.html` (enlace Google Fonts en el legacy).  
Sin DM Sans ni otras familias ajenas: la voz del sitio es **display geométrica + serif editorial + mono técnica**.

```
DISPLAY  →  Unbounded — títulos hero, marca, CTAs primarios, números
SERIF    →  Instrument Serif — acentos en cursiva dentro de display
MONO     →  Space Mono — body por defecto, navegación, etiquetas, ghost CTAs
```

El HTML original usa **Space Mono** como `font-family` del `body`; todo bloque de lectura hereda esa precisión técnica salvo donde se asigne explícitamente Unbounded o Instrument Serif.

---

## II. PALETA DE COLORES — OKLCH

> Derivada del análisis directo del **Moodboard.pdf** (familia violeta-magenta)  
> y del historial cromático del `madeleine_portfolio_v3_violet.html`.

### 2.1 — Escala de Fondo (Background Scale)

Esta escala construye la profundidad atmosférica del sitio.  
Va de casi-negro (con alma) hasta casi-blanco (con calidez).

| Token                    | OKLCH                         | Hex ref.  | Uso                                      |
|--------------------------|-------------------------------|-----------|------------------------------------------|
| `--color-void`           | `oklch(0.148 0.069 328)`      | `#190019` | Canvas principal, body background        |
| `--color-abyss`          | `oklch(0.257 0.101 299)`      | `#2B124C` | Superficies elevadas (navs, drawers)     |
| `--color-shadow`         | `oklch(0.360 0.092 320)`      | `#522B5B` | Cards, bordes sutiles, divisores         |
| `--color-dusk`           | `oklch(0.499 0.082 347)`      | `#854F6C` | States hover en fondos oscuros           |
| `--color-blush`          | `oklch(0.811 0.048 25)`       | `#DFB6B2` | Texto secundario sobre fondo claro       |
| `--color-petal`          | `oklch(0.934 0.030 50)`       | `#FBE4D8` | Texto de cuerpo principal (sobre void)   |
| `--color-canvas`         | `oklch(0.984 0.009 45)`       | `#FFF8F5` | Fondo de secciones claras (light mode)   |

**Regla de uso:** Los fondos nunca mezclan más de dos pasos consecutivos de la escala.  
Saltar de `void` a `canvas` directamente requiere un elemento de transición (marquee, divisor).

### 2.2 — Acentos (Accent Palette)

Cuatro acentos extraídos del moodboard. Cada uno tiene un rol editorial definido.  
**Nunca se usan dos acentos juntos a menos que exista una jerarquía clara.**

| Token                    | OKLCH                         | Hex ref.  | Rol editorial                             |
|--------------------------|-------------------------------|-----------|-------------------------------------------|
| `--color-lavender`       | `oklch(0.722 0.177 306)`      | `#C084FC` | Acento primario — links, hovers, focus    |
| `--color-magenta`        | `oklch(0.710 0.246 341)`      | `#FF4ECD` | Acento de impacto — CTAs, highlights      |
| `--color-lime`           | `oklch(0.921 0.214 129)`      | `#B9FF4B` | Acento disruptivo — marquees, alertas     |
| `--color-gold`           | `oklch(0.887 0.180 97)`       | `#FBD919` | Acento editorial — premios, distinciones  |

**Jerarquía de acentos:**
```
lavender  →  uso cotidiano (UI, interacciones)
magenta   →  momentos de impacto (1 por sección máximo)
lime      →  disrupción intencional (marquee strip, 1 por página)
gold      →  distinción editorial (badges, awards)
```

### 2.3 — Paleta del Moodboard (Colores Secundarios)

Extraídos directamente del análisis de imágenes del `Moodboard.pdf`.

| Token                    | OKLCH                         | Hex ref.  | Inspiración                              |
|--------------------------|-------------------------------|-----------|------------------------------------------|
| `--color-plum`           | `oklch(0.357 0.122 331)`      | `#5E1D59` | Profundidad cálida del moodboard          |
| `--color-violet`         | `oklch(0.271 0.091 314)`      | `#361545` | Complemento de `--color-abyss`           |
| `--color-rose`           | `oklch(0.667 0.173 357)`      | `#E35F96` | Rosa editorial (entre blush y magenta)   |
| `--color-orchid`         | `oklch(0.802 0.153 328)`      | `#F399F0` | Tono suave de lavanda saturada           |
| `--color-iris`           | `oklch(0.541 0.087 280)`      | `#6569A1` | Azul índigo apagado, data/código         |

### 2.4 — Mixins de Transparencia

Para overlays, glassmorphism editorial y gradientes de máscara.

```css
/* Overlay oscuro sobre imágenes */
background: oklch(0.148 0.069 328 / 0.75);

/* Scrim de navegación */
background: linear-gradient(
  to bottom,
  oklch(0.148 0.069 328 / 0.88) 0%,
  oklch(0.148 0.069 328 / 0) 100%
);

/* Surface glass (sobre --color-abyss) */
background: oklch(0.257 0.101 299 / 0.60);
backdrop-filter: blur(12px) saturate(1.4);
border: 1px solid oklch(0.722 0.177 306 / 0.15);
```

### 2.5 — Gradientes Signature

Gradientes propios del portafolio. **No sustituibles por degradados genéricos.**

```css
/* Mesh hero — fondo principal */
--gradient-hero:
  radial-gradient(ellipse 80% 70% at 70% 30%,
    oklch(0.360 0.092 320 / 0.55) 0%, transparent 60%),
  radial-gradient(ellipse 60% 60% at 20% 80%,
    oklch(0.257 0.101 299 / 0.80) 0%, transparent 55%),
  radial-gradient(ellipse 50% 40% at 90% 90%,
    oklch(0.710 0.246 341 / 0.20) 0%, transparent 50%),
  var(--color-void);

/* Barra de progreso — scroll indicator */
--gradient-progress:
  linear-gradient(90deg,
    var(--color-magenta),
    var(--color-lavender),
    var(--color-lime));

/* Fade editorial — mask para fotos */
--gradient-photo-mask:
  linear-gradient(to top,
    transparent 0%,
    oklch(0 0 0) 15%,
    oklch(0 0 0) 85%,
    transparent 100%);
```

---

## III. TIPOGRAFÍA — Herencia HTML v3 (Google Fonts)

### 3.1 — Enlace y familias (fuente de verdad del legacy)

El archivo `madeleine_portfolio_v3_violet.html` carga exactamente:

```html
<link href="https://fonts.googleapis.com/css2?family=Unbounded:wght@300;400;700;900&family=Instrument+Serif:ital@0;1&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
```

| Rol editorial | Familia | Pesos / estilos en el HTML |
|----------------|---------|----------------------------|
| Display / marca / números grandes | **Unbounded** | 300, 400, 700, 900 |
| Acento serif en cursiva (p. ej. letra *e* del hero) | **Instrument Serif** | 400 normal + italic |
| Cuerpo `body`, navegación, etiquetas, ghost buttons | **Space Mono** | 400/700 + italic 400 |

**No** forman parte del sistema: DM Sans, Inter, Poppins, Montserrat u otras familias genéricas.

### 3.2 — Implementación en Next.js

- **Recomendado en red abierta:** `next/font/google` con las mismas tres familias y el subset `latin`.
- **Recomendado en CI / redes con inspección TLS:** `next/font/local` con `.woff2` equivalentes (mismos nombres de familia) en `app/fonts/`, como en el repositorio actual.

Variables CSS (`app/layout.tsx` → clases en `<html>`):

| Variable | Fuente |
|----------|--------|
| `--font-instrument-serif` | Instrument Serif |
| `--font-space-mono` | Space Mono |
| `--font-unbounded` | Unbounded |

En `app/globals.css` / `@theme`:

- `--font-serif` → Instrument Serif  
- `--font-mono` y **`--font-sans`** → Space Mono (el HTML usa mono en el `body`; `--font-sans` queda alineado a esa decisión para utilidades Tailwind `font-sans`).  
- `--font-display` → Unbounded  

### 3.3 — Escala tipográfica (fluid + tokens)

El **H1 del hero** replica el `clamp` del HTML v3: `font-size: clamp(52px, 7.5vw, 120px)`.

| Token | Valor | Uso |
|-------|--------|-----|
| `--text-hero` | `clamp(3.25rem, 7.5vw, 7.5rem)` | H1 hero (52px → 120px) |
| `--text-display` | `clamp(3rem, 7vw, 7rem)` | Titulares de sección |
| `--text-title-xl` … `--text-title-sm` | (sin cambio) | Jerarquía interior |
| `--text-body-lg` | `1.125rem` | Párrafos amplios (md+) |
| `--text-body-md` | `1rem` | Cuerpo estándar |
| `--text-body-sm` | `0.875rem` | Captions |
| `--text-label` | `0.6875rem` (11px) | Nav, botones display |
| `--text-micro` | `0.625rem` (10px) | Microcopy, stats label |

**Hero — referencia directa del HTML:** `.hero-desc` usa **15px** (`0.9375rem`) y `line-height: 1.7`. En implementación Tailwind: base `text-[0.9375rem]`, opcional `md:text-[length:var(--text-body-lg)]` para respirar en desktop.

### 3.4 — Escala responsiva (mobile-first, Tailwind)

Los breakpoints del proyecto coinciden con **Tailwind v4 por defecto**:

| Token | min-width | Uso |
|-------|-----------|-----|
| *(default)* | 0 | Estilos base: tipografía más compacta, paddings laterales reducidos, foto hero centrada bajo el texto si hace falta evitar solapes. |
| `sm` | 40rem (640px) | Refinamiento de márgenes y gaps; marquee / filas densas. |
| `md` | 48rem (768px) | Tablet: nav en fila estable, columnas 2→1 reversibles, tipo lead puede subir a `--text-body-lg`. |
| `lg` | 64rem (1024px) | Desktop: replicar proporciones del HTML (foto `right: 8%`, `width: 420px`, alturas `90%`). |
| `xl` | 80rem (1280px) | Máximo aire editorial; `max-width` de contenedores alineados a 1440px del sistema. |

**Reglas**

1. **Siempre** escribir estilos en orden mobile-first: clase base → `sm:` → `md:` → `lg:` → `xl:`.  
2. Tamaños de fuente: combinar tokens `--text-*` con utilidades responsivas (`text-[length:var(--text-label)] md:text-…`) cuando el HTML legacy usaba px fijos.  
3. Márgenes y paddings de sección: usar `--spacing-*` con prefijos (`px-6 md:px-8 lg:px-12`) en lugar de valores mágicos sueltos.

### 3.5 — Estilos tipográficos named (`globals.css`)

Los bloques `.type-*` siguen siendo la referencia; actualizaciones clave respecto al HTML:

- `.type-body` y `.type-lead` usan **`var(--font-sans)`**, hoy mapeado a **Space Mono** (paridad con el `body` del HTML).  
- `.type-label-sans` (logo compacto) usa **`var(--font-display)`** + peso 700, como `.nav-logo` en el legacy.

### 3.6 — Reglas de contraste tipográfico

```
SOBRE --color-void (fondo oscuro):
  ✓ Texto principal     →  --color-petal        (oklch 0.93)
  ✓ Texto secundario    →  --color-petal / 0.55 (oklch 0.93 / 55%)
  ✓ Etiquetas           →  --color-petal / 0.40
  ✓ Acentos             →  --color-lavender
  ✗ NUNCA               →  --color-canvas ni white puro

SOBRE --color-canvas (fondo claro):
  ✓ Texto principal     →  --color-abyss        (oklch 0.26)
  ✓ Texto secundario    →  --color-shadow       (oklch 0.36)
  ✓ Etiquetas           →  --color-dusk         (oklch 0.50)
  ✓ Acentos             →  --color-plum o --color-violet
  ✗ NUNCA               →  --color-void directo (demasiado contraste)
```

### 3.7 — Outline Text (técnica firma)

Para títulos con efecto de texto transparente (outline only):

```css
.type-outline {
  -webkit-text-stroke: 1.5px var(--color-dusk);
  color: transparent;
}
.type-outline:hover {
  color: var(--color-lavender);
  -webkit-text-stroke: 0;
}
```

---

## IV. ESPACIADO MODULAR

### 4.1 — Base y Escala

**Base:** `4px` (`--space-1`)  
**Método:** Escala de potencias de 2 con valores intermedios clave.  
**Filosofía:** El espacio es el respiro del diseño. Errar hacia *más* espacio siempre.

| Token              | Valor rem    | px   | Uso principal                                  |
|--------------------|--------------|------|------------------------------------------------|
| `--space-0`        | `0.125rem`   | 2px  | Micro ajustes, bordes, offsets ópticos         |
| `--space-1`        | `0.25rem`    | 4px  | Gap entre icono y label, padding interno mínimo|
| `--space-2`        | `0.5rem`     | 8px  | Padding de etiquetas, gap entre tags           |
| `--space-3`        | `0.75rem`    | 12px | Padding de botones pequeños                    |
| `--space-4`        | `1rem`       | 16px | Base unit — gap entre elementos inline         |
| `--space-5`        | `1.25rem`    | 20px | Gap entre stats, separadores internos          |
| `--space-6`        | `1.5rem`     | 24px | Padding de nav, gap estándar de flex layouts   |
| `--space-8`        | `2rem`       | 32px | Margin entre párrafos, padding de cards        |
| `--space-10`       | `2.5rem`     | 40px | Gap entre elementos de contenido               |
| `--space-12`       | `3rem`       | 48px | Separación entre bloque y CTA                  |
| `--space-16`       | `4rem`       | 64px | Padding horizontal en mobile                   |
| `--space-20`       | `5rem`       | 80px | Padding bottom del hero content                |
| `--space-24`       | `6rem`       | 96px | Separación entre secciones pequeñas            |
| `--space-32`       | `8rem`       | 128px| Separación entre secciones medianas            |
| `--space-40`       | `10rem`      | 160px| Padding top de secciones con sticky nav        |
| `--space-48`       | `12rem`      | 192px| Separación entre secciones principales         |
| `--space-64`       | `16rem`      | 256px| Espacio editorial máximo (hero bottom padding) |

### 4.2 — Grid System

```css
/* Container editorial */
.container {
  width: 100%;
  max-width: 1440px;
  margin-inline: auto;
  padding-inline: var(--space-16);  /* 64px default */
}

@media (min-width: 768px) {
  .container { padding-inline: var(--space-12); }  /* 48px */
}
@media (min-width: 1200px) {
  .container { padding-inline: var(--space-20); }  /* 80px */
}

/* Grid de proyectos — asimétrico, editorial */
.project-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--space-6);              /* 24px */
}

/* Columnas: featured 8/4, standard 6/6, tight 4/4/4 */
.col-featured-lg { grid-column: span 8; }
.col-featured-sm { grid-column: span 4; }
.col-half        { grid-column: span 6; }
.col-third       { grid-column: span 4; }
.col-full        { grid-column: span 12; }

/* Responsive: apila en mobile */
@media (max-width: 767px) {
  .col-featured-lg,
  .col-featured-sm,
  .col-half,
  .col-third      { grid-column: span 12; }
}
```

### 4.3 — Ritmo Vertical (Sección a Sección)

```
Hero                        →  min-height: 100svh
  ↓  Marquee strip          →  padding: --space-4 0
  ↓  Sección "Work"         →  padding-block: --space-48 (192px)
  ↓  Sección "About"        →  padding-block: --space-32 (128px)
  ↓  Sección "Services"     →  padding-block: --space-48 (192px)
  ↓  Sección "Contact"      →  padding-block: --space-32 (128px)
  ↓  Footer                 →  padding-block: --space-24 (96px)
```

**Regla de sesión:** Nunca dos secciones con el mismo `padding-block`.  
La variación de ritmo crea tensión editorial.

---

## V. TOKENS DE MOVIMIENTO

### 5.1 — Curvas de Easing

```css
/* Easing principal — "spring suave" */
--ease-out-expo:   cubic-bezier(0.16, 1, 0.3, 1);

/* Entrada dramática */
--ease-out-quart:  cubic-bezier(0.25, 1, 0.5, 1);

/* Microinteracciones rápidas */
--ease-in-out:     cubic-bezier(0.4, 0, 0.2, 1);

/* Reveal de texto */
--ease-reveal:     cubic-bezier(0.22, 1, 0.36, 1);
```

### 5.2 — Duraciones

```css
--duration-instant:  80ms;    /* Hover de color */
--duration-fast:     200ms;   /* Microinteracciones */
--duration-base:     300ms;   /* Transiciones estándar */
--duration-slow:     500ms;   /* Entradas de elementos */
--duration-reveal:   800ms;   /* Fade-up de secciones */
--duration-dramatic: 1200ms;  /* Hero entrance, page transitions */
```

### 5.3 — Animaciones Named

```css
/* Fade Up — entrada estándar de contenido */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(1.875rem); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Fade In — simple, sin desplazamiento */
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* Scale Reveal — para imágenes y cards */
@keyframes scaleReveal {
  from { opacity: 0; transform: scale(0.96); }
  to   { opacity: 1; transform: scale(1); }
}

/* Marquee — strip horizontal infinito */
@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

/* Grain Shift — textura de ruido animada */
@keyframes grainShift {
  0%   { background-position: 0 0; }
  20%  { background-position: -40px -20px; }
  40%  { background-position: 20px -60px; }
  60%  { background-position: -60px 20px; }
  80%  { background-position: 40px 60px; }
  100% { background-position: -20px -40px; }
}

/* Float — orbs del hero */
@keyframes float {
  0%, 100% { transform: translateY(0) scale(1); }
  50%       { transform: translateY(-1.875rem) scale(1.05); }
}

/* Scroll Pulse — línea de scroll cue */
@keyframes scrollPulse {
  0%, 100% { opacity: 0.4; transform: scaleY(1); }
  50%       { opacity: 1; transform: scaleY(1.2); }
}

/* Spin — decoraciones estáticas (estrellas, ornamentos) */
@keyframes spin {
  to { transform: rotate(360deg); }
}
```

### 5.4 — Stagger de Entrada (Patrón Hero)

```css
/* Patrón de delays escalonados para entradas de hero */
.hero-tag     { animation: fadeUp var(--duration-reveal) var(--ease-out-expo) 0.2s both; }
.hero-title   { animation: fadeUp var(--duration-reveal) var(--ease-out-expo) 0.4s both; }
.hero-desc    { animation: fadeUp var(--duration-reveal) var(--ease-out-expo) 0.6s both; }
.hero-actions { animation: fadeUp var(--duration-reveal) var(--ease-out-expo) 0.8s both; }
.hero-stats   { animation: fadeUp var(--duration-reveal) var(--ease-out-expo) 1.0s both; }
.scroll-cue   { animation: fadeUp var(--duration-reveal) var(--ease-out-expo) 1.2s both; }
```

---

## VI. EFECTOS Y TEXTURAS

### 6.1 — Grain Overlay (Textura Obligatoria)

Todo fondo oscuro lleva grain. Sin grain, el diseño pierde profundidad.

```css
/* Elemento fijo #grain en el root del layout */
.grain-overlay {
  position: fixed;
  inset: 0;
  z-index: 9990;
  pointer-events: none;
  opacity: 0.045;                       /* Sutil: perceptible, no dominante */
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 180px 180px;
  animation: grainShift 0.6s steps(1) infinite;
}

/* En secciones claras: reducir aún más */
.section-light .grain-overlay { opacity: 0.025; }
```

### 6.2 — Orbs del Hero

```css
/* Orb base */
.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.35;
  animation: float 8s var(--ease-in-out) infinite;
  pointer-events: none;
}

/* Orb 1 — Violeta principal */
.orb-violet {
  width: 31.25rem; height: 31.25rem;   /* 500px */
  background: radial-gradient(circle,
    oklch(0.360 0.092 320),
    transparent 70%);
  top: -6.25rem; right: 10%;
}

/* Orb 2 — Magenta pop */
.orb-magenta {
  width: 18.75rem; height: 18.75rem;   /* 300px */
  background: radial-gradient(circle,
    var(--color-magenta),
    transparent 70%);
  bottom: 20%; left: 5%;
  animation-delay: -3s;
}

/* Orb 3 — Lime sutil */
.orb-lime {
  width: 12.5rem; height: 12.5rem;     /* 200px */
  background: radial-gradient(circle,
    var(--color-lime),
    transparent 70%);
  top: 40%; right: 30%;
  opacity: 0.15;
  animation-delay: -5s;
}
```

### 6.3 — Cursor Personalizado

```css
/* cursor: none en body, siempre */
#cur-ring {
  position: fixed;
  width: 2.25rem; height: 2.25rem;    /* 36px */
  border: 1px solid var(--color-lavender);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9998;
  transform: translate(-50%, -50%);
  transition:
    width var(--duration-base) var(--ease-out-expo),
    height var(--duration-base) var(--ease-out-expo),
    border-color var(--duration-fast),
    background var(--duration-fast),
    opacity var(--duration-fast);
  mix-blend-mode: screen;
}

#cur-dot {
  position: fixed;
  width: 0.375rem; height: 0.375rem;  /* 6px */
  background: var(--color-magenta);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
}

/* Estado hover sobre interactivos */
#cur-ring.is-hovering {
  width: 5rem; height: 5rem;          /* 80px */
  background: oklch(0.722 0.177 306 / 0.07);
  border-color: var(--color-magenta);
}
```

### 6.4 — Scroll Progress Bar

```css
#scroll-bar {
  position: fixed;
  top: 0; left: 0;
  height: 2px;
  background: var(--gradient-progress);
  width: 0%;                          /* Actualizado por JS */
  z-index: 9000;
  transition: width 80ms linear;
}
```

### 6.5 — Photo Mask (Fade Fotográfico)

```css
.photo-mask {
  mask-image: var(--gradient-photo-mask);
  -webkit-mask-image: var(--gradient-photo-mask);
}
```

---

## VII. ANTI-PATRONES PROHIBIDOS

> Esta sección es tan importante como las anteriores.  
> El "AI Slop" se previene siendo explícito sobre lo que NO se hace.

### 7.1 — Color

```
✗  background: linear-gradient(135deg, #7B2FBE, #4F46E5)
   → El degradado púrpura-azul genérico. Cliché de portafolios 2023.

✗  color: #000000  /  background: #000000
   → Negro puro. Sin alma, sin profundidad. Usar --color-void.

✗  color: #FFFFFF  /  background: #FFFFFF
   → Blanco puro. Frío y sin contexto. Usar --color-canvas.

✗  Más de dos acentos en un mismo componente
   → Caos cromático. Un acento + neutral.

✗  box-shadow: 0 4px 6px rgba(0,0,0,0.1)
   → Sombra genérica de Bootstrap/Tailwind. Usar oklch con color tintado.
```

### 7.2 — Tipografía

```
✗  font-family: 'Poppins', sans-serif
   → La fuente más usada de portafolios genéricos de IA.

✗  font-family: 'Montserrat', sans-serif
   → Ídem. Trillada en el nicho de diseño.

✗  font-size: 14px; font-weight: 600; letter-spacing: 0;
   → Etiqueta sin personalidad. Siempre agregar tracking y case.

✗  Más de 4 tamaños tipográficos en una sección
   → Ruido visual. Una sección = máximo 3 estilos.

✗  h1 + p inmediatamente sin espacio visual
   → El espacio es parte del diseño. Mínimo --space-8 entre heading y body.
```

### 7.3 — Layout

```
✗  Cards con rounded-2xl y shadow-lg anidadas dentro de otras cards
   → El "toldo de IA". Componentes genéricos sin intención editorial.

✗  Grid uniforme de 3 columnas iguales para proyectos
   → Catálogo de e-commerce, no galería de artista.
   → Usar grids asimétricos: 8+4, 7+5, alternando.

✗  Botones con border-radius > 4px en este sistema
   → El diseño es angular y editoral. Máximo: border-radius: 2px.

✗  Padding < --space-12 en secciones principales
   → Secciones apretadas se leen como landing pages baratas.

✗  Más de 60 caracteres por línea en cuerpo de texto sin max-width
   → La legibilidad cae. max-width: 65ch en bloques de prosa.
```

### 7.4 — Animación

```
✗  transition: all 0.3s ease
   → "all" es impreciso y costoso. Especificar propiedades.

✗  animation: bounce 1s infinite
   → Movimiento infantil en un portafolio de diseñadora.

✗  transform: scale(1.1) en hover de cards grandes
   → Demasiado agresivo. Usar scale(1.02) o translateY(-4px).

✗  Animaciones sin prefers-reduced-motion
   → Accesibilidad no negociable. Siempre envolver en media query.
```

---

## VIII. CSS CUSTOM PROPERTIES — REFERENCIA RÁPIDA

Bloque CSS listo para copiar en `globals.css` o `tailwind.config.ts`.

```css
:root {
  /* ── COLORES DE FONDO ──────────────────────────────────── */
  --color-void:         oklch(0.148 0.069 328);
  --color-abyss:        oklch(0.257 0.101 299);
  --color-shadow:       oklch(0.360 0.092 320);
  --color-dusk:         oklch(0.499 0.082 347);
  --color-blush:        oklch(0.811 0.048 25);
  --color-petal:        oklch(0.934 0.030 50);
  --color-canvas:       oklch(0.984 0.009 45);

  /* ── ACENTOS ───────────────────────────────────────────── */
  --color-lavender:     oklch(0.722 0.177 306);
  --color-magenta:      oklch(0.710 0.246 341);
  --color-lime:         oklch(0.921 0.214 129);
  --color-gold:         oklch(0.887 0.180 97);

  /* ── COLORES DEL MOODBOARD ─────────────────────────────── */
  --color-plum:         oklch(0.357 0.122 331);
  --color-violet:       oklch(0.271 0.091 314);
  --color-rose:         oklch(0.667 0.173 357);
  --color-orchid:       oklch(0.802 0.153 328);
  --color-iris:         oklch(0.541 0.087 280);

  /* ── FUENTES (HTML v3: Instrument Serif, Space Mono, Unbounded) ── */
  --font-serif:         'Instrument Serif', Georgia, serif;
  --font-sans:          'Space Mono', ui-monospace, monospace;
  --font-display:       'Unbounded', system-ui, sans-serif;
  --font-mono:          'Space Mono', 'Courier New', monospace;

  /* ── ESCALA TIPOGRÁFICA ────────────────────────────────── */
  --text-hero:          clamp(3.25rem, 7.5vw, 7.5rem);
  --text-display:       clamp(3rem, 7vw, 7rem);
  --text-title-xl:      clamp(2.25rem, 4.5vw, 4.5rem);
  --text-title-lg:      clamp(1.75rem, 3vw, 3rem);
  --text-title-md:      clamp(1.375rem, 2.2vw, 2rem);
  --text-title-sm:      clamp(1.125rem, 1.6vw, 1.5rem);
  --text-body-lg:       1.125rem;
  --text-body-md:       1rem;
  --text-body-sm:       0.875rem;
  --text-label:         0.6875rem;
  --text-micro:         0.625rem;

  /* ── ESPACIADO ─────────────────────────────────────────── */
  --space-0:            0.125rem;      /*   2px */
  --space-1:            0.25rem;       /*   4px */
  --space-2:            0.5rem;        /*   8px */
  --space-3:            0.75rem;       /*  12px */
  --space-4:            1rem;          /*  16px */
  --space-5:            1.25rem;       /*  20px */
  --space-6:            1.5rem;        /*  24px */
  --space-8:            2rem;          /*  32px */
  --space-10:           2.5rem;        /*  40px */
  --space-12:           3rem;          /*  48px */
  --space-16:           4rem;          /*  64px */
  --space-20:           5rem;          /*  80px */
  --space-24:           6rem;          /*  96px */
  --space-32:           8rem;          /* 128px */
  --space-40:           10rem;         /* 160px */
  --space-48:           12rem;         /* 192px */
  --space-64:           16rem;         /* 256px */

  /* ── EASING ────────────────────────────────────────────── */
  --ease-out-expo:      cubic-bezier(0.16, 1, 0.3, 1);
  --ease-out-quart:     cubic-bezier(0.25, 1, 0.5, 1);
  --ease-in-out:        cubic-bezier(0.4, 0, 0.2, 1);
  --ease-reveal:        cubic-bezier(0.22, 1, 0.36, 1);

  /* ── DURACIONES ────────────────────────────────────────── */
  --duration-instant:   80ms;
  --duration-fast:      200ms;
  --duration-base:      300ms;
  --duration-slow:      500ms;
  --duration-reveal:    800ms;
  --duration-dramatic:  1200ms;

  /* ── GRADIENTES SIGNATURE ──────────────────────────────── */
  --gradient-progress:
    linear-gradient(90deg,
      var(--color-magenta),
      var(--color-lavender),
      var(--color-lime));

  --gradient-photo-mask:
    linear-gradient(to top,
      transparent 0%,
      black 15%,
      black 85%,
      transparent 100%);

  /* ── GRAIN ─────────────────────────────────────────────── */
  --grain-opacity:      0.045;
  --grain-size:         180px;
}

/* ── ACCESIBILIDAD — Motion Reduce ─────────────────────── */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Extensión para Tailwind CSS v4

```css
/* En tailwind.config.css o el @theme block */
@theme {
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

  --font-serif:         'Instrument Serif', Georgia, serif;
  --font-sans:          'Space Mono', ui-monospace, monospace;
  --font-display:       'Unbounded', system-ui, sans-serif;
  --font-mono:          'Space Mono', 'Courier New', monospace;
}
```

---

## NOTAS DE IMPLEMENTACIÓN

### Para el equipo (o para la IA en sesiones futuras)

**Al construir cualquier componente:**

1. Verificar que usa tokens de este sistema, no valores hardcoded.
2. El primer valor que definas en un componente es el `padding` — debe ser mínimo `--space-8`.
3. Todo texto que no sea display explícito usa **`--font-sans`** (Space Mono, como el `body` del HTML) o **`--font-serif`** (Instrument Serif) según el rol; nunca una cuarta familia.
4. Los colores de fondo deben estar en la Background Scale. Los acentos son para texto e íconos.
5. Antes de agregar una animación, preguntarse: *¿comunica algo o solo es ruido?*

**Señales de que algo está mal:**

- Si el componente se parece a un template de Framer → volver a los anti-patrones.
- Si el padding se siente "suficiente" → duplícalo.
- Si el tipo se ve "normal" → incrementa el contraste de tamaños.
- Si los colores se ven "modernos y vibrantes" de forma genérica → probablemente es el gradiente púrpura-azul.

---

*Sistema generado con los datos del `Moodboard.pdf` (análisis de 6 imágenes, familia cromática violeta-magenta-chartreuse) y el heritage del `madeleine_portfolio_v3_violet.html` (v3). Las conversiones OKLCH fueron calculadas con el algoritmo Oklab de Björn Ottosson, con precisión de 4 decimales.*
