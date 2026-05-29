# Ejemplos de prompts detallados (casos reales)

Casos concretos del portafolio con **cuatro partes** cada uno:

1. **Prompt completo** — listo para pegar en Cursor  
2. **Versión corta** — si ya conoces el contexto  
3. **Detalles técnicos** — qué tocar en el código y por qué  
4. **Frases clave** — palabras que activan el comportamiento correcto  

Guía general → [README.md](./README.md) · Plantillas por §MASTER → [prompts.md](./prompts.md) · Impeccable + skills → [flujo-skills.md](./flujo-skills.md)

---

## Índice de ejemplos

| # | Caso | Componente |
|---|------|------------|
| 1 | [Foto del hero superpuesta al H1](#1-hero--foto-encima-del-título) | `Hero.tsx` + `.hero-*` |
| 2 | [About / Sobre mí como referencia HTML](#2-about--sobre-mí-paridad-html-v3) | `About.tsx` + `.section-pad-about` |
| 3 | [Marquee / duplicar franja lime](#3-marquee--franja-infinita-html-v3) | `InfiniteSlider.tsx` + `@keyframes marquee` |
| 4 | [Work / Proyectos bento grid](#4-work--proyectos-paridad-html-v3) | `ProjectGrid.tsx` + `ProjectCard.tsx` + `lib/projects.ts` |
| 5 | [Skills + Brands (nuevas secciones)](#5-skills--brands-colaboraciones-nuevas) | `Skills.tsx` · `Brands.tsx` · `lib/skills.ts` · `lib/brands.ts` |
| 6 | [Contact + footer](#6-contact--footer-paridad-html-v3) | `Contact.tsx` + `.section-bg-a--contact` |
| 7 | [Carrusel 3D UGC estilo TikTok](#7-carrusel-3d-ugc--marco-tiktok) | `UgcCarousel.tsx` · `TikTokFrame.tsx` · `lib/videos.ts` |
| 7b | [Refinamiento plantilla + 3D (decisión)](#7b-refinamiento--plantilla-tiktok--carrusel-3d-decisión-fijada) | Prompt refactor |
| 7c | [Estado implementado (memoria)](#7c-estado-implementado--memoria-de-sesión) | `UgcSlidePreview.tsx` · `context-mode/` |

---

## Plantilla para nuevos ejemplos

Cuando documentes otro caso, copia esta estructura:

```markdown
## N. Título del caso

**Objetivo visual:** [una línea]
**Referencia:** [captura / HTML legacy / MASTER §X]

### Prompt completo
\`\`\`
...
\`\`\`

### Versión corta
\`\`\`
...
\`\`\`

### Detalles técnicos
...

### Frases clave
| Concepto | Frase |
...

### Archivos implicados
- ...
```

---

## 1. Hero — Foto encima del título

**Objetivo visual:** Composición editorial donde el retrato tapa el centro del nombre (“lein” / hombros sobre las letras), el tag y el H1 quedan **detrás** de la foto, y descripción + CTAs + stats **delante**. Al reducir el viewport (tablet / anchos intermedios), la foto **crece** y ocupa el alto del hero — no queda pequeña ni despegada del título.

**Referencia:** Captura de `madeleine_portfolio_v3_violet.html` / mock editorial con overlap intencional.

**Estado en repo (implementación de referencia):**  
`Hero.tsx` ya separa capas: `.hero-headline` (z-1), `.hero-photo-wrap` (z-2), `.hero-foreground` + `.hero-stats` (z-3). Ver comentario en `app/globals.css` líneas ~318–324.

---

### Prompt completo

```
Usa ui-ux-pro-max (solo patrones UX/layout; NO --persist).

Objetivo: Hero con composición editorial como la referencia adjunta —
la foto del retrato se superpone ENCIMA del H1 y del tag (cabeza/hombro
tapan letras del medio), mientras descripción, CTAs y stats permanecen
legibles delante. La foto debe crecer y ocupar el espacio vertical
disponible al reducir el viewport (tablet / anchos intermedios), no
quedar diminuta ni desconectada del título.

Archivos: components/sections/Hero.tsx + clases .hero-* en app/globals.css.
Lee MASTER.md §III (tipografía hero), §IV (espaciado), §VI (máscara foto),
§VII (anti-patrones). Cruza con doc/referencia-tailwind.md.

Comportamiento por capas (z-index explícito en .hero-section):
- z-0: .hero-bg-mesh, orbs, estrellas
- z-1: tag + H1 (.hero-headline) — DETRÁS de la foto
- z-2: .hero-photo-wrap — ENCIMA del título (retrato tapa "lein" / centro del nombre)
- z-3: .hero-desc, .hero-actions, .hero-stats, .hero-scroll-cue — legibles, sin quedar bajo la foto

Layout:
- Mantener min-height: 100svh en .hero-section.
- Usar isolation: isolate en .hero-section para stacking context limpio.
- Foto: position absolute, anclada abajo-centro en mobile; en 768–1023px
  aumentar --hero-photo-width / --hero-photo-height (clamp o min()) hasta
  ~85–92svh de alto útil.
- Conservar mask-image / --gradient-photo-mask en la parte superior de la foto.
- H1 en 3 líneas (Made / lein+e / Morales); overlap en línea central es intencional.
- Stats abajo-derecha; foreground abajo-izquierda — padding-bottom suficiente
  para que la foto no tape CTAs.

Responsive a validar: 375, 640, 768, 1024, 1280, 1440px.
En lg+ (1024) foto puede ir a la derecha (right: 8%) manteniendo overlap en intermedios.

Restricciones:
- Solo tokens Tailwind / @theme (sin hex, sin py-[73px]).
- No inline styles salvo vars calculadas en runtime.
- No cambiar copy ni paleta. Server Component, next/image unoptimized.
- prefers-reduced-motion: conservar .hero-enter-*.

Entregable:
1) Explica el stack z-index elegido.
2) Implementa: separar .hero-headline y .hero-foreground si aún están en un solo .hero-copy.
3) Confirma overlap visible en 768–1024px.
```

**Tip:** Adjunta la captura de referencia y añade al inicio:

```
Referencia visual adjunta — replicar jerarquía de capas y proporción foto/texto.
```

---

### Versión corta

```
Hero: foto ENCIMA del H1/tag (z-2 sobre z-1), copy y stats DELANTE (z-3).
Foto grande que llene el alto al reducir viewport (768–1024). Referencia adjunta.
Editar Hero.tsx + .hero-* en globals.css. MASTER §III–§IV–§VI.
Separar .hero-headline y .hero-foreground si todo sigue en .hero-copy.
Tokens Tailwind únicamente. NO --persist.
```

---

### Detalles técnicos

#### Problema habitual (antes del fix)

En un solo bloque `.hero-copy` con `z-index: 2`, **todo** el texto quedaba delante de la foto:

```css
/* ❌ Antes — la foto nunca tapa el H1 */
.hero-copy       { z-index: 2; }
.hero-photo-wrap { z-index: 1; }
```

#### Solución — tres capas en el DOM

| Capa | Clase | z-index | Contenido |
|------|-------|---------|-----------|
| Fondo | `.hero-bg-mesh`, orbs, stars | 0 | Decoración |
| Titular | `.hero-headline` | 1 | `.hero-tag`, `.hero-title` |
| Retrato | `.hero-photo-wrap` | 2 | `next/image` con máscara superior |
| Foreground | `.hero-foreground`, `.hero-stats` | 3 | desc, CTAs, stats, scroll |

Estructura esperada en `Hero.tsx`:

```
.hero-section
  ├── .hero-bg-mesh, orbs, stars     (z-0)
  ├── .hero-headline                  (z-1) ← tag + h1
  ├── .hero-photo-wrap                (z-2) ← foto
  ├── .hero-foreground                (z-3) ← desc + actions
  ├── .hero-stats                     (z-3)
  └── .hero-scroll-cue                (z-3)
```

#### CSS clave (`app/globals.css`)

```css
.hero-section {
  isolation: isolate;  /* stacking context único */
}

.hero-headline   { z-index: 1; align-self: start; padding-bottom: grande; }
.hero-photo-wrap { z-index: 2; bottom: 0; mask-image: var(--gradient-photo-mask); }
.hero-foreground { z-index: 3; align-self: end; }
.hero-stats      { z-index: 3; position: absolute; bottom: …; right: …; }
```

Variables útiles para escalar la foto sin arbitrary values:

```css
:root {
  --hero-photo-width:  min(26.25rem, 92vw);
  --hero-photo-height: min(78svh, 40rem);
}
/* Subir en @media (min-width: 768px) y (min-width: 1024px) */
```

#### Breakpoints a probar

| Ancho | Qué verificar |
|-------|----------------|
| 375px | Foto centrada abajo, tapa centro del nombre, CTAs legibles |
| 768px | Foto más alta (`--hero-photo-height` sube) |
| 1024px | Foto puede desplazarse a `right: 8%`, overlap sigue |
| 1440px | Aire editorial, sin scroll horizontal |

#### Errores que el agente debe evitar

- Volver a unificar tag + h1 + desc en un solo contenedor con un solo z-index  
- `scale()` en hover de la foto que mueva el layout  
- Reducir `padding-bottom` del headline y que la foto tape el CTA  
- Imagen sin máscara superior → corte duro contra `bg-void`  

---

### Frases clave

| Concepto | Frase para el prompt |
|----------|---------------------|
| Foto sobre letras | *"retrato con z-index mayor que .hero-title / .hero-headline"* |
| Título detrás | *"tag + H1 en capa z-1, detrás del retrato"* |
| Copy legible | *"desc + actions + stats en z-3, delante de la foto"* |
| Tamaño al reducir | *"768–1024px: --hero-photo-height hasta ~90svh con clamp/min()"* |
| No tapar CTA | *"padding-bottom en .hero-headline y .hero-foreground para reservar zona inferior"* |
| Máscara | *"mantener --gradient-photo-mask en la parte superior de la foto"* |
| Separar DOM | *"no usar un solo .hero-copy; dividir headline y foreground"* |
| Stacking | *"isolation: isolate en .hero-section"* |

---

### Archivos implicados

| Archivo | Qué cambia |
|---------|------------|
| `components/sections/Hero.tsx` | Estructura DOM por capas + comentarios z-index |
| `app/globals.css` | `.hero-headline`, `.hero-foreground`, `.hero-photo-wrap`, variables `--hero-photo-*` |
| `design-system/MASTER.md` | §III tipografía hero, §IV padding, §VI máscara |
| `public/images/hero-portrait.JPG` | Retrato con fondo que permita mask (o PNG con transparencia) |

---

### Con Impeccable después del overlap

```
Fase 1: Implementa overlap Hero (este doc §1).
Fase 2: impeccable polish Hero — load-context.mjs, register brand, reference/polish.md.
        MASTER §VII manda. Solo detalles finos, no reestructurar capas z-index.
```

Más flujos combinados → [flujo-skills.md](./flujo-skills.md#b--composición-visual-grande-ej-hero-overlap).

### Variantes del mismo caso

**Solo ajustar tamaño de foto (overlap ya funciona):**

```
En globals.css sube --hero-photo-width y --hero-photo-height en @media 768–1023px
para que la foto ocupe ~90svh. No cambies z-index ni estructura DOM.
MASTER §IV. Valida 375 y 1024px.
```

**Regresión — overlap desapareció tras un refactor:**

```
Audita z-index del Hero: .hero-headline debe ser 1, .hero-photo-wrap 2,
.hero-foreground 3. Si .hero-copy unificó capas, vuelve a separar como doc/ejemplos.md §1.
```

---

## 2. About — Sobre mí (paridad HTML v3)

**Objetivo visual:** Sección `#about` como la captura de referencia: foto vertical izquierda (~45%), copy derecha (~55%), gradiente radial a la derecha, badge lime "+ DISPONIBLE", pills Software (lavender) y Áreas (lime), tipografía "CREATIVA DE" + *corazón.* en serif.

**Referencia:** Captura adjunta + HTML legacy:

```css
.section { padding: 130px 48px; position: relative; overflow: hidden; }
#about {
  background: radial-gradient(ellipse 60% 70% at 100% 50%, rgba(82, 43, 91, 0.5) 0%, transparent 65%), var(--dark);
}
```

**Nota:** El marquee lime superior es `InfiniteSlider.tsx`, no forma parte de `#about`.

---

### Qué detalles incluir siempre (checklist)

| # | Detalle | Valor / referencia |
|---|---------|-------------------|
| 1 | **Referencia visual** | Adjuntar captura |
| 2 | **Archivos** | `About.tsx`, `globals.css` (`.section-pad-about`, `.container-editorial`) |
| 3 | **Padding vertical** | HTML `130px` → token `--spacing-32` (128px) o clase `.section-pad-about` |
| 4 | **Padding horizontal** | HTML `48px` → `--spacing-12` vía `.container-editorial` (md+) |
| 5 | **Fondo** | Gradiente radial + base `bg-void` o `var(--color-abyss)` — color `shadow` OKLCH al 50% |
| 6 | **Grid** | `45% / 55%` en `lg+`, stack en mobile (texto arriba, foto abajo o según diseño) |
| 7 | **SectionLabel** | `01 · Sobre mí` — `SectionLabel` con `lineFull` |
| 8 | **H2** | Unbounded 900 uppercase "CREATIVA DE" + Instrument Serif italic lavender "corazón." |
| 9 | **Subtítulo** | Mono, uppercase, tracking amplio, `text-dusk` |
| 10 | **Body** | `type-lead`, max ~50ch, dos párrafos |
| 11 | **Pills Software** | borde `border-lavender/30`, texto lavender |
| 12 | **Pills Áreas** | borde `border-lime/35`, texto lime |
| 13 | **Label "Áreas"** | acento lime (no lavender) |
| 14 | **Badge foto** | `bg-lime text-void`, rotación ~3°, esquina inferior derecha |
| 15 | **Foto** | `aspect-[3/4]`, `rounded-[2px]`, borde lavender sutil, gradiente overlay |
| 16 | **Ritmo con secciones vecinas** | Tras marquee → aire superior; antes Work → no igualar `padding-block` con Work (MASTER §IV.3) |
| 17 | **Restricciones** | MASTER §III–§IV, tokens Tailwind, NO hex, NO `--persist` |

---

### Prompt completo

```
Referencia visual adjunta — replicar sección #about del HTML v3.

Usa ui-ux-pro-max (patrones layout; NO --persist) + impeccable polish About al final.

Objetivo: components/sections/About.tsx debe verse como la captura:
- Layout 2 columnas desktop: foto izquierda ~45%, contenido derecha ~55%
- Alineación vertical centrada entre columnas (lg:items-center)
- Fondo #about del HTML:
  radial-gradient(ellipse 60% 70% at 100% 50%, oklch(0.360 0.092 320 / 0.5), transparent 65%)
  + base var(--color-void) o --color-abyss según MASTER §II
- Espaciado sección (respetar arriba y abajo):
  · HTML legacy: padding 130px 48px
  · Vertical: usar .section-pad-about en globals.css (MASTER §IV.3) — equivalente ~128–160px
    con tokens --spacing-32 / --spacing-40 / --spacing-48, NO py-[130px]
  · Horizontal: .container-editorial (--spacing-12 = 48px en md+)
  · No reducir padding para “que quepa” — el espacio editorial es intencional

Contenido (ya en About.tsx — no cambiar copy salvo typo):
- SectionLabel index="01" text="Sobre mí"
- H2: "CREATIVA DE" + em "corazón." (font-display + font-serif text-lavender)
- Subtítulo mono uppercase Guayaquil
- Párrafos type-lead
- Tags Software (lavender) y Áreas (lime); label "Áreas" en color lime
- Badge "+ Disponible" sobre foto (lime, rotate-3)

Lee MASTER.md §III, §IV, §VI · app/globals.css · doc/referencia-tailwind.md.
El marquee lime NO es parte de About (InfiniteSlider.tsx).

Responsive: 375, 768, 1024, 1440. Mobile: orden legible (label/título antes de foto).

Entregable:
1) Diff en About.tsx + ajustes .section-pad-about si el ritmo vertical no coincide con la captura
2) Tabla HTML legacy → token/clase Tailwind usada
3) impeccable polish About: solo detalles finos tras implementar
```

---

### Versión corta

```
About.tsx como captura adjunta. Paridad HTML #about: gradiente radial derecha,
.section-pad-about (≈130px vertical con tokens), container-editorial (48px horizontal).
Grid 45/55, badge lime, pills lavender/lime. MASTER §III–§IV. Sin py-[130px]. NO --persist.
```

---

### Detalles técnicos — HTML → tokens

| HTML legacy | Token / implementación actual |
|-------------|-------------------------------|
| `padding: 130px 48px` | `.section-pad-about` + `.container-editorial` |
| `130px` vertical | `--spacing-32` (128px) — diferencia 2px aceptable; o `pt-32 pb-32` simétrico si pides paridad estricta |
| `48px` horizontal | `--spacing-12` en `.container-editorial` @media 768px |
| `rgba(82, 43, 91, 0.5)` | `oklch(0.360 0.092 320 / 0.5)` = color `shadow` |
| `var(--dark)` | `var(--color-void)` o `bg-abyss` (verificar contraste con captura) |
| `position: relative; overflow: hidden` | ya en `#about` |

**Ritmo vertical (MASTER §IV.3):** About usa padding distinto a Work/Services. Si hace falta más aire arriba tras el marquee, sube `padding-top` en `.section-pad-about` (p. ej. `--spacing-48`), no bajes el de Work.

**Archivos:**

| Archivo | Rol |
|---------|-----|
| `components/sections/About.tsx` | Layout, copy, tags, imagen |
| `app/globals.css` | `.section-pad-about`, `.container-editorial` |
| `components/ui/SectionLabel.tsx` | Etiqueta `01 · Sobre mí` |

---

### Frases clave

| Concepto | Frase |
|----------|--------|
| Padding vertical | *"respeta .section-pad-about / tokens --spacing-32+, equivalente a 130px del HTML"* |
| Padding horizontal | *"48px vía container-editorial, no px arbitrario"* |
| Gradiente | *"ellipse 60% 70% at 100% 50%, shadow al 50%, base void/abyss"* |
| Columnas | *"grid 0.45fr / 0.55fr en lg, gap-20, items-center"* |
| Badge | *"lime bg-lime text-void, bottom-right de la foto, rotate-3"* |
| Pills | *"Software lavender, Áreas lime — label Áreas en lime"* |
| Marquee | *"no incluir marquee en About — es InfiniteSlider"* |
| Espaciado sagrado | *"no reducir padding-block — MASTER §IV filosofía del espacio"* |

---

### Con Impeccable

```
Tras alinear About con la captura:
impeccable layout About → load-context.mjs, brand, reference/layout.md
impeccable polish About → detalles finos sin cambiar grid 45/55
```

Ver [flujo-skills.md](./flujo-skills.md).

---

## 3. Marquee — franja infinita (HTML v3)

**Objetivo:** Replicar `.marquee-strip` + `.marquee-inner` del HTML con scroll infinito `18s linear infinite`, textos y separador `✦`, fondo lime / texto void.

**Estado actual:** `components/sections/InfiniteSlider.tsx` ya implementa esto (client component, loop `ITEMS × 2`, `@keyframes marquee` en `globals.css`). Objetivo habitual: **solo paridad HTML** (una franja entre Hero y About). La variante “dos franjas en page.tsx” es opcional y no es el caso por defecto.

---

### Qué detalles incluir

| # | Detalle | Valor |
|---|---------|--------|
| 1 | **Intención** | ¿Paridad HTML en un solo componente **o** dos `<Marquee />` en `page.tsx`? |
| 2 | **Items** | Lista exacta del HTML (8 ítems × 2 en el track) |
| 3 | **Separador** | `<span class="sep">✦</span>` → `text-void/40` |
| 4 | **Animación** | `mq 18s linear infinite` → `@keyframes marquee` + `translateX(-50%)` |
| 5 | **Loop sin salto** | Contenido duplicado 2× en el track (obligatorio) |
| 6 | **Visual** | `bg-lime`, `font-display`, uppercase, `rotate(-1.5deg) scaleX(1.05)` |
| 7 | **A11y** | `prefers-reduced-motion`: pausar / sin animación; pausa en hover/focus |
| 8 | **Padding** | `.section-marquee` → `--spacing-4` |
| 9 | **Sin Framer Motion** | Solo CSS `@keyframes` (ADR-003) |
| 10 | **Ubicación** | Por defecto: entre Hero y About (`page.tsx`) |

---

### Prompt completo — paridad HTML (un marquee)

```
Objetivo: InfiniteSlider.tsx debe ser paridad 1:1 del HTML v3:

.marquee-strip → overflow-hidden bg-lime section-marquee + rotate(-1.5deg)
  .marquee-inner → .marquee-track inline-flex w-max + animate 18s
    TRACK = [...ITEMS, ...ITEMS]  (loop seamless, 8 ítems + ✦ × 2)
</div>

Animación HTML:
  .marquee-inner { animation: mq 18s linear infinite; }
Implementación existente en globals.css:
  @keyframes marquee { from translateX(0); to translateX(-50%); }
  NO crear keyframe "mq" duplicado — reutilizar @keyframes marquee.

Estilos:
- Fondo bg-lime, texto font-display font-bold uppercase text-void
- Rotación editorial: rotate(-1.5deg) scaleX(1.05) en el strip (HTML v3)
- Separador ✦ entre ítems (class sep → aria-hidden)
- padding .section-marquee (--spacing-4)

Items (orden exacto):
Diseño Editorial · Contenido UGC · Identidad Visual · Animación ·
Fotografía · Dirección de Arte · Social Media · Producción Audiovisual

Accesibilidad:
- role="region" aria-label="Disciplinas de diseño"
- hover/focus pausa animación (.marquee-track.is-paused)
- motion-reduce: translate-x-0, sin animación

Archivos: InfiniteSlider.tsx, app/globals.css (@keyframes marquee, .section-marquee).
MASTER §V (movimiento), §II (lime/void). Sin Framer Motion. 'use client' obligatorio.

Entregable: diff + confirmar loop sin corte visible a 18s.
```

---

### Prompt completo — duplicar (dos franjas en la home)

```
Duplicar el marquee lime del HTML v3: misma franja dos veces en la home.

1) Extrae componente reutilizable MarqueeStrip.tsx (o exporta desde InfiniteSlider)
   con la misma lógica: ITEMS × 2, animate marquee 18s, pause hover/focus.

2) Insertar en app/page.tsx:
   - Marquee 1: entre Hero y About (posición actual)
   - Marquee 2: [elegir: entre About y Work | después de Services]
   Misma apariencia (lime, rotate -1.5deg, ✦). Opcional: segunda franja
   rotate(1.5deg) invertida para ritmo editorial — solo si encaja con MASTER.

3) Animación: reutilizar @keyframes marquee en globals.css — una sola definición.
4) .section-marquee en cada instancia. No duplicar keyframes.

HTML referencia (contenido del track):
[pegar lista de spans del marquee-inner]

MASTER §IV.3: el padding de secciones adyacentes no debe ser idéntico.
NO --persist ui-ux-pro-max.
```

---

### Versión corta

```
Marquee HTML v3 en InfiniteSlider: marquee-strip/inner, items×2, ✦,
@keyframes marquee 18s linear infinite, bg-lime text-void, rotate -1.5deg,
pause hover + prefers-reduced-motion. globals.css + 'use client'.
```

```
Duplicar marquee: componente reutilizable, dos <MarqueeStrip /> en page.tsx
(Hero→M1→About→M2→Work). Misma animación 18s, un solo @keyframes marquee.
```

---

### Detalles técnicos — HTML → proyecto

| HTML | Proyecto actual |
|------|-----------------|
| `.marquee-strip` | `div` con `overflow-hidden bg-lime section-marquee` + transform rotate |
| `.marquee-inner` | `.marquee-track.flex.w-max` |
| `animation: mq 18s` | `motion-safe:animate-[marquee_18s_linear_infinite]` |
| `@keyframes mq` | `@keyframes marquee` (translateX -50%) |
| Contenido 2× en DOM | `const TRACK = [...ITEMS, ...ITEMS]` |
| `.sep` | `span` con `✦` y `text-void/40` |

**Por qué `-50%`:** el track tiene el doble de ancho; al llegar a -50% el segundo bloque coincide con el primero → loop infinito sin salto.

**Duplicar ≠ duplicar keyframes:** dos franjas en la página comparten el mismo `@keyframes marquee`.

---

### Frases clave

| Concepto | Frase |
|----------|--------|
| Loop | *"duplicar array ITEMS 2× para seamless loop translateX(-50%)"* |
| Duración | *"18s linear infinite — paridad HTML mq"* |
| Reduced motion | *"motion-reduce: sin animación, motion-safe: animate marquee"* |
| Pausa | *"is-paused en hover/focus del strip"* |
| Dos franjas | *"componente reutilizable, dos instancias en page.tsx, un solo keyframe"* |
| Prohibido | *"sin Framer Motion, sin animation inline en style"* |

---

## 4. Work — Proyectos (paridad HTML v3)

**Objetivo:** Sección `#work` con grid bento asimétrico 6 cards, tipografía "TRABAJO" + *seleccionado.* en lime, cards con gradiente, label de fondo, badge ↗, pill Univ.

**Estado actual:** `ProjectGrid.tsx` + `ProjectCard.tsx` + `lib/projects.ts`. Grid 7+5 / 5 / 4+4+4 ya implementado — prompt para **paridad HTML + datos** y pulido Impeccable.

---

### Checklist de detalles

| # | Detalle |
|---|---------|
| 1 | Captura + HTML `#work` |
| 2 | `id="work"` · `.section-pad-work` · `.section-bg-a` · `.container-editorial` |
| 3 | Label: `03 · Proyectos` (HTML `data-n="03"`) |
| 4 | H2: TRABAJO + *seleccionado.* (em **lime**, Instrument Serif) |
| 5 | Grid `.projects`: 12 cols, gap-4, patrón bento |
| 6 | 6× `.proj` con estructura interna del HTML |
| 7 | Datos en `lib/projects.ts` = textos del HTML (orden 1–6) |
| 8 | Animación `rev in` / `rev d1 in` opcional (fadeUp + stagger) |
| 9 | CTA final opcional (no está en HTML — mantener o quitar explícito) |

---

### Prompt completo (con Impeccable al final)

```
Referencia visual adjunta + HTML #work abajo.

Objetivo: paridad 1:1 sección Proyectos (HTML v3) en:
- components/sections/ProjectGrid.tsx
- components/ui/ProjectCard.tsx
- lib/projects.ts (6 proyectos, orden y copy del HTML)

Ya existe implementación — auditar y corregir gaps vs captura/HTML.

── Estructura ──
<section id="work" class="section">
  → id="work", section-pad-work, section-bg-a, overflow-hidden
  <div class="work-inner"> → .container-editorial
    <div class="work-head">
      <div class="section-label" data-n="03">Proyectos</div>
      → SectionLabel index="03" text="Proyectos"
      <h2>Trabajo<br><em>seleccionado.</em></h2>
      → font-display 900 uppercase text-canvas
      → em font-serif italic text-lime "seleccionado."
    </div>
    <div class="projects"> → grid grid-cols-12 gap-4
      6× .proj → ProjectCard

── Grid asimétrico (MASTER §IV.2 / HTML v3) ──
P1: col-span-7 row-span-2 (grande izquierda)
P2: col-span-5 (arriba derecha)
P3: col-span-5 (abajo derecha)
P4–P6: col-span-4 cada uno (fila inferior)
Mobile: col-span-12 stack

── Anatomía de cada .proj (ProjectCard) ──
.proj-bg        → bgGradient radial OKLCH (o imageUrl si hay asset)
.proj-type-bg   → bgLabel gigante centrado, opacity ~5% (Brand, UGC, Anim…)
.proj-uni       → pill "Univ." top-left, lime — solo cards 1, 3, 5
.proj-badge     → ↗ top-right, rota -45°, hover → 0 + lavender
.proj-info      → overlay inferior con gradient fade void
  .proj-cat     → type-nano text-lavender, tags unidos con ·
  .proj-title   → font-display bold uppercase text-canvas

── Datos exactos (lib/projects.ts, orden 1→6) ──
01 Brand · Identidad Visual · Branding · Campaña de Identidad Editorial · isUni
02 UGC · Contenido UGC · Video · Fashion Haul Campaign
03 Anim · Animación 2D · Motion · Proyecto Animación Universitaria · isUni
04 Foto · Fotografía · Producto · Product Lifestyle Shoot
05 Social · Campaña · Social Media · Campaña Universitaria Integrada · isUni
06 Edit · Edición Audiovisual · Video Production & Post

Gradientes: radial suave por card (tokens OKLCH §II), glow editorial.
bgLabel: Brand, UGC, Anim, Foto, Social, Edit (mayúsculas en UI).

Espaciado: HTML .section padding 130px 48px → section-pad-work + container-editorial.
No reducir padding. gap-4 entre cards.

Hover: translateY sutil + sombra tintada + scale bg (ya en ProjectCard — mantener).

Animación (opcional rev/in):
fadeUp en .work-head y .projects con stagger; prefers-reduced-motion off.

Decisión: [mantener | quitar] CTA "¿Tienes un proyecto en mente?" (no está en HTML).

Restricciones:
MASTER.md §II–§IV, §VII. bgGradient solo via projects.ts (OKLCH strings).
Prohibido hex en className, rounded-xl, cards idénticas fuera del patrón bento.
Server Components. NO --persist ui-ux-pro-max.

── Fase Impeccable (después de paridad HTML) ──
1) node .agents/skills/impeccable/scripts/load-context.mjs — register brand
2) impeccable layout ProjectGrid — ritmo, gaps, jerarquía vs captura
3) impeccable polish ProjectGrid + ProjectCard — detalles finos, hover, contraste
4) impeccable critique — ¿pasa AI slop test? ¿grid se siente editorial?

MASTER.md y PRODUCT.md mandan sobre sugerencias genéricas.

Entregable:
- Checklist HTML → archivo/clase
- projects.ts alineado al HTML
- Diff visual vs captura
- Validar 375, 768, 1024, 1440px
```

---

### Versión corta

```
#work paridad HTML + captura: ProjectGrid, ProjectCard, projects.ts.
Label 03 Proyectos · H2 Trabajo + em seleccionado. lime · grid bento 7/5/5/4/4/4.
6 proj con bg, type-bg, univ, badge ↗, cat, title (copy HTML).
section-pad-work · tokens OKLCH. Luego impeccable layout + polish.
```

---

### Frases clave

| Concepto | Frase |
|----------|--------|
| Grid | *"bento 12-col: P1 col-7 row-span-2, P2/P3 col-5, P4–6 col-4"* |
| Título | *"seleccionado. en text-lime + font-serif italic"* |
| Type bg | *"proj-type-bg text-canvas/5 clamp grande centrado"* |
| Datos | *"lib/projects.ts orden y strings iguales al HTML"* |
| Univ | *"isUni true en proyectos 1, 3, 5"* |
| Impeccable | *"layout → polish → critique tras paridad HTML"* |

---

## 5. Skills + Brands / Colaboraciones (nuevas)

**Estado:** No existen en el repo — crear desde cero.  
**Ubicación en home:** después de `ProjectGrid` (#work), antes de `Contact`.  
**Numeración:** Skills = `04` · Brands = `05` (Contact pasaría a `06` si usas labels en todas).

**Referencias de código existente:**
- Marquee loop → `InfiniteSlider.tsx` + `@keyframes marquee`
- Grid gap-border → `Services.tsx` (`.services-grid` / `.svc-card`)

---

### Checklist compartido

| # | Detalle |
|---|---------|
| 1 | Captura + HTML `#skills` y `#brands` |
| 2 | `lib/skills.ts` + `lib/brands.ts` (datos tipados, ADR-005) |
| 3 | `components/sections/Skills.tsx` + `Brands.tsx` |
| 4 | Estilos en `globals.css` (`.skill-chip`, `.brand-cell`, keyframes si hace falta) |
| 5 | Registrar en `app/page.tsx` dentro del ritmo `section-bg-a` / `section-bg-b` |
| 6 | MASTER §III–§IV, tokens, sin hex, sin Framer Motion |
| 7 | Impeccable al final: layout → polish |

---

### Prompt completo — Skills + Brands (una sesión)

```
Referencia visual adjunta + HTML #skills y #brands abajo.

Crear DOS secciones nuevas con paridad HTML v3. No existen aún en el repo.

── Archivos a crear ──
- lib/skills.ts          → SkillChipData[] (software + disciplinas)
- lib/brands.ts          → BrandCellData[] (6 categorías)
- components/sections/Skills.tsx   ('use client' — marquees)
- components/sections/Brands.tsx   (Server Component)
- app/globals.css        → .skill-chip, .skills-track*, .brand-cell, .brands-grid
- app/page.tsx           → importar e insertar después de ProjectGrid, antes de Contact

══════════════════════════════════════
SECCIÓN 1 — #skills (Herramientas)
══════════════════════════════════════

Cabecera (.skills-head):
- SectionLabel index="04" text="Herramientas" lineFull
- h2: "Mi " + em "arsenal" + br + "creativo."
  → MI / CREATIVO.: font-display 900 uppercase text-canvas
  → em arsenal: font-serif italic text-magenta (no lime)
- padding sección: .section-pad-skills (tokens §IV, ≈130px vertical)

Dos filas marquee (.skills-track-outer > .skills-track):

FILA 1 — software (9 chips × 2 duplicados = loop):
Photoshop, Illustrator, InDesign, Premiere Pro, After Effects,
Figma, Lightroom, CapCut, Canva Pro
(cada chip: icon emoji, .skill-chip-name, .skill-chip-sub — copy exacto del HTML)

FILA 2 — disciplinas (8 chips × 2), margin-top: --spacing-4 (16px):
Animación 2D, Fotografía, TikTok/Reels, Branding, Copywriting,
Producción AV, Social Media, Dir. de Arte

Animación:
- Reutilizar patrón InfiniteSlider: inline-flex w-max, contenido ×2,
  @keyframes marquee 18s linear infinite (o 25s si la fila es más larga)
- Fila 2 opcional: dirección inversa (keyframes marquee-reverse o animation-direction: reverse)
- .skills-track-outer { overflow: hidden }
- pause hover/focus (.is-paused), prefers-reduced-motion: sin movimiento
- Sin inline style margin-top — usar mt-4 en segunda outer

.skill-chip visual (captura):
- fondo void/shadow, border sutil lavender/10, rounded-[2px]
- flex row: icon + columna name/sub
- .skill-chip-name: font-display bold text-canvas
- .skill-chip-sub: font-mono text-micro text-lavender/45 o dusk

══════════════════════════════════════
SECCIÓN 2 — #brands (Colaboraciones)
══════════════════════════════════════

.brands-inner → .container-editorial
.brands-head:
- SectionLabel index="05" text="Colaboraciones"
- h2: "Marcas con" + br + "las que " + em "brillé."
  → em brillé.: font-serif italic text-magenta

.brands-grid → grid 3×2 desktop (como Services gap-border):
- grid-cols-1 md:grid-cols-2 lg:grid-cols-3, gap-px, bg-lavender/10, border
- 6× .brand-cell con:
  .brand-n (01–06) — type-nano text-lavender/35
  .brand-name — font-display bold uppercase text-canvas
  .brand-desc — type-lead text-micro leading-relaxed text-petal/60

Datos (orden HTML):
01 Moda & Fashion · 02 Belleza & Cosmética · 03 Lifestyle & Hogar
04 Food & Gastronomía · 05 Tech & Aplicaciones · 06 Institucional & B2B
(descripciones exactas del HTML)

Fondo: .section-pad-brands + .section-bg-a o b según alternancia en page.tsx
(Work es bg-b → Skills puede ser bg-a → Brands bg-b → Contact bg-a)

Animación opcional: rev in / rev d1 in → fadeUp scroll en head + grid

Restricciones globales:
MASTER.md §III–§VII · doc/referencia-tailwind.md
Un componente = un archivo. Tipos en lib/types.ts si aplica.
NO --persist ui-ux-pro-max.

── Fase Impeccable ──
1) load-context.mjs — brand
2) impeccable layout Skills + Brands — ritmo entre secciones, grid alineado a captura
3) impeccable polish Skills + Brands — chips, tipografía em, contraste desc
4) Validar 375, 768, 1024, 1440px

Entregable: archivos nuevos + page.tsx + checklist HTML→componente.
```

---

### Versión corta

```
Crear Skills.tsx + Brands.tsx (HTML adjunto). lib/skills.ts + lib/brands.ts.
Skills: 2 marquees skill-chip, fila software + fila disciplinas, loop ×2, 18s.
Brands: grid 3×2 gap-border, 6 brand-cell, em brillé. magenta.
Labels 04/05. Insertar en page.tsx post-Work pre-Contact.
MASTER tokens. Luego impeccable layout + polish.
```

---

### Frases clave

| Sección | Frase |
|---------|--------|
| Skills | *"dos skills-track-outer, chips duplicados 2×, mismo patrón que InfiniteSlider"* |
| Skills | *"fila 2 mt-4, opcional animación reverse"* |
| Skills | *"arsenal en em text-magenta Instrument Serif"* |
| Brands | *"brands-grid como Services: gap-px bg-lavender/10"* |
| Brands | *"brillé. en em magenta"* |
| Orden | *"page.tsx: …ProjectGrid → Skills → Brands → Contact"* |
| Datos | *"lib/skills.ts y lib/brands.ts — copy exacto HTML"* |

---

## 6. Contact + footer (paridad HTML v3)

**Estado:** `components/sections/Contact.tsx` ya existe con copy y estructura alineados.  
**Fondo:** `section-bg-a--contact` en `page.tsx` (gradientes magenta + void).  
**Grain:** textura global vía `GrainOverlay` en `layout.tsx` — no duplicar en Contact.

---

### Checklist

| # | Detalle |
|---|---------|
| 1 | Captura + HTML `#contact` |
| 2 | `id="contact"` · `.section-pad-contact` · `.contact-inner` → `container-editorial` |
| 3 | Label `06 · Contacto` — `SectionLabel` |
| 4 | H2 `Hablemos` + em `juntos.` (serif italic — magenta o lavender según captura) |
| 5 | Párrafo intro (copy exacto, guiones — no em dash prohibido en copy nuevo) |
| 6 | `.contact-top` grid 2 cols desktop |
| 7 | 4× `.contact-item`: Email, WhatsApp, Ubicación, Disponibilidad |
| 8 | Links `mailto:` y `tel:+593992708407` |
| 9 | `.contact-cta` lavender → hover magenta, texto void/canvas |
| 10 | `<footer>` 3 spans — copyright, servicios, Guayaquil |
| 11 | Animación `rev in` → `.contact-enter-top` (fadeUp scroll en globals.css) |
| 12 | Opcional captura: efecto glitch en "HABLEMOS" — solo si está en HTML legacy |

---

### Prompt completo

```
Referencia visual adjunta + HTML #contact abajo.

Objetivo: paridad 1:1 Contacto + footer en components/sections/Contact.tsx.
El componente YA EXISTE — auditar y corregir gaps vs captura/HTML.

── Estructura ──
<section id="contact">
  .contact-inner → .container-editorial.section-pad-contact
  .contact-top.rev.in → .contact-enter-top
    grid 2 cols md: items-center, gap tokens §IV

  .contact-head (izquierda):
    SectionLabel index="06" text="Contacto"
    h2: Hablemos + br + em "juntos."
      → font-display 900 uppercase text-canvas clamp grande
      → em: font-serif italic text-magenta (o text-lavender si captura lo pide)
      → opcional: efecto glitch/offset en "HABLEMOS" solo si captura/HTML lo muestra
    p intro: copy exacto HTML (¿Tienes un proyecto… creatividad.)
      → type-lead text-petal/70 max-w ~44ch

  .contact-details (derecha):
    .contact-item × 4:
      .clabel → type-nano uppercase tracking text-lavender/45
      valores:
        Email → mailto:madeleine.moralesdiaz@gmail.com
        WhatsApp → tel:+593992708407  (+593) 99 270 8407
        Ubicación → Guayaquil, Ecuador (span.cval)
        Disponibilidad → Proyectos freelance ✓ (span.cval)
      .cval / links → font-display, border-b border-petal/15, hover lavender

    .contact-cta → mailto mismo email
      bg-lavender text-void uppercase
      "Escríbeme ahora →"
      hover: bg-magenta, gap mayor, -translate-y sutil
      rounded-[2px] — NO rounded-xl

  footer (dentro de section):
    3 spans en fila (stack mobile):
    © 2026 Madeleine Morales Diaz
    Diseño · UGC · Audiovisual
    Hecho con ♥ en Guayaquil
    border-t border-lavender/10, type-nano petal/25–30

── Fondo (page.tsx, no en Contact.tsx) ──
.section-bg-a--contact: radial gradients void + magenta (ya en globals.css)
Grain: GrainOverlay global — no añadir textura extra aquí

── Animación ──
HTML rev in → .contact-enter-top + fadeUp view() en globals.css
prefers-reduced-motion: sin animación forzada

── Restricciones ──
MASTER §III–§VII · tokens Tailwind · Server Component
Sin formulario backend (SSG mailto/tel solo)
NO --persist ui-ux-pro-max

── Impeccable ──
load-context.mjs → impeccable layout Contact → impeccable polish Contact
Verificar jerarquía H2 vs details, contraste clabel/cval, CTA accesible

Entregable: checklist HTML→clase, diff mínimo, 375–1440px.
```

---

### Versión corta

```
#contact paridad HTML + captura. Contact.tsx ya existe — auditar gaps.
06 Contacto · Hablemos + em juntos. · grid 2 cols · 4 items + CTA lavender.
footer 3 líneas. section-bg-a--contact en page.tsx. contact-enter-top fadeUp.
impeccable layout + polish. MASTER tokens.
```

---

### Frases clave

| Concepto | Frase |
|----------|--------|
| Ya existe | *"refinar Contact.tsx, no crear duplicado"* |
| Links | *"mailto y tel reales del HTML, focus-visible lavender"* |
| CTA | *"contact-cta bg-lavender text-void, hover magenta"* |
| Footer | *"role=contentinfo, 3 spans, border-t lavender/10"* |
| Fondo | *"gradiente en section-bg-a--contact, grain es global"* |
| Glitch | *"solo si captura muestra offset en HABLEMOS — CSS pseudo, no imagen"* |
| Impeccable | *"polish contraste clabel/cval y tamaño H2"* |

---

### Gaps habituales vs captura

| Captura | Código actual | Acción en prompt |
|---------|---------------|------------------|
| `juntos.` lavender claro | `text-magenta` | Especificar color en prompt |
| Glitch en HABLEMOS | no implementado | Pedir explícitamente si se quiere |
| `—` en intro | `–` (en dash) | Unificar a `—` solo si PRODUCT lo permite |
| Botón top derecho | `CustomCursor` / scroll cue | No es parte de `#contact` |

---

## 7. Carrusel 3D UGC — marco TikTok

**Referencia visual:** Carrusel horizontal 3D (centro grande, laterales con `rotateY` y escala menor).  
**NO copiar** el marco Instagram de la captura — solo la **mecánica 3D** y el layout de profundidad.

**Objetivo:** Mostrar reels UGC (`lib/videos.ts`) dentro de un **marco TikTok** (9:16) integrado al portafolio editorial.

**Skills:** ui-ux-pro-max (patrones) + `design-system/DESIGN.md` + `MASTER.md` + Impeccable.

---

### Prompt completo (copiar)

```
Referencia visual adjunta: carrusel 3D horizontal (centro activo grande, laterales
rotados en Y y más pequeños). NO replicar UI de Instagram de la referencia.

Objetivo: componente carrusel UGC con marco TikTok para el portafolio Madeleine Morales.

── Fase 0 — Contexto (obligatorio) ──
1) Lee design-system/DESIGN.md y design-system/MASTER.md §V (motion), §VII.
2) ui-ux-pro-max: ejecuta search.py
   "3d carousel mobile ugc portfolio dark" --stack nextjs
   (solo patrones UX; NO --persist; no regenerar MASTER)
3) Impeccable:
   node .agents/skills/impeccable/scripts/load-context.mjs
   register: brand · carga reference/brand.md
   Al final: impeccable layout + polish en el componente

── Archivos a crear ──
- components/ui/TikTokFrame.tsx      — chrome UI TikTok (decorativo + a11y)
- components/sections/UgcCarousel.tsx — 'use client', lógica 3D + navegación
- app/globals.css                    — .ugc-carousel*, perspective, reduced-motion
- Integrar en app/page.tsx (sugerido: después de Services o dentro de sección UGC dedicada)
- Datos: lib/videos.ts (ugcVideos[]) + getUgcVideoPreviewUrl()

── Mecánica del carrusel (como la referencia) ──
- Contenedor con perspective (ej. perspective: 1200px)
- 3 slides visibles: prev | active | next (más si hay datos, pero 3 en foco)
- Slide activo: scale(1), rotateY(0), z-index mayor, opacidad 1
- Laterales: scale(~0.85), rotateY(±25–35deg), opacidad ~0.6, blur opcional leve
- Transición: transform + opacity, duration-base / ease-out-expo (DESIGN.md)
- Navegación: flechas teclado ←/→, botones prev/next, swipe en touch
- Indicador superior: 01 … N (estilo editorial mono, no círculo azul genérico de Canva)
  → usar tokens: type-nano text-lavender, activo text-lime o bg-lavender/20
- Sombra bajo cards: sombra tintada OKLCH (shadow 30%), no shadow-lg Tailwind

── Marco TikTok (NO Instagram) ──
Aspect ratio 9:16, rounded-[2px] (MASTER — no rounded-xl tipo app store).

Chrome mínimo reconocible TikTok (decorativo, aria-hidden en iconos):
- Borde/frame oscuro void/abyss
- Columna derecha: avatar + iconos verticales (corazón, comentario, bookmark, compartir)
  → SVG simples o caracteres, color petal/70, NO logos oficiales pixel-perfect
- Abajo izquierda: @handle o client, caption 1–2 líneas (Space Mono, text-micro)
- Línea “sonido” / música: type-nano text-petal/45 (placeholder si no hay dato)
- Barra de progreso inferior: segmentos finos (lavender/30, activo lavender)

Contenido del frame:
- <video> o preview Cloudinary (getUgcVideoPreviewUrl) autoplay muted loop playsInline
- poster si falla · alt desde videoAlt
- Clic en card activa → abre tiktokUrl en nueva pestaña (rel noopener)
- prefers-reduced-motion: carrusel plano sin rotateY (solo scroll horizontal o fade)

── Estilo portafolio (DESIGN.md) ──
- Fondo sección: bg-void o section-bg-a, coherente con alternancia page.tsx
- SectionLabel ej. "UGC" o "02b" según numeración acordada
- Título opcional: "Contenido que *convierte.*" (Unbounded + em Instrument Serif magenta)
- Tokens únicamente: bg-void, text-petal, text-lavender, border-lavender/10
- Sin hex, sin Framer Motion, sin glassmorphism decorativo
- Máximo 1 acento fuerte (lime o magenta) en la sección

── Tipos y datos ──
interface ya en lib/types.ts: UgcVideoData
Extender videos en lib/videos.ts si hace falta caption, handle, musicLabel

── Accesibilidad ──
- role="region" aria-label="Reels UGC"
- aria-live="polite" al cambiar slide
- Focus visible en controles
- Pausar video cuando slide no está activo (ahorro batería)
- reduced-motion: desactivar 3D y autoplay agresivo

── Entregable ──
1) Componentes + CSS + entrada en page.tsx
2) Tabla: referencia visual → decisión técnica
3) Checklist DESIGN.md Do/Don't
4) impeccable polish UgcCarousel

NO clonar template Canva/DIYP. Debe sentirse pieza del portafolio editorial, no app genérica.
```

---

### Versión corta

```
Carrusel 3D UGC (ref adjunta, solo mecánica 3D). Marco TikTok 9:16, NO Instagram.
UgcCarousel.tsx + TikTokFrame.tsx · lib/videos.ts Cloudinary previews.
DESIGN.md + MASTER §V. perspective + rotateY slides. ui-ux-pro-max search sin --persist.
Impeccable load-context → layout → polish. Tokens OKLCH. Sin Framer Motion.
```

---

### Frases clave

| Concepto | Frase |
|----------|--------|
| Referencia | *"solo profundidad 3D de la captura, chrome TikTok no Instagram"* |
| Video | *"getUgcVideoPreviewUrl, muted loop, pause si slide inactivo"* |
| Clic | *"card activa abre tiktokUrl nueva pestaña"* |
| Motion | *"ease-out-expo, reduced-motion: sin rotateY"* |
| Estilo | *"rounded-[2px], sombra tintada shadow/30%, tokens DESIGN.md"* |
| Skills | *"ui-ux-pro-max patrones + impeccable brand + DESIGN.md"* |

---

### Dónde ubicarlo en la home

| Opción | Ubicación |
|--------|-----------|
| A (recomendada) | Nueva sección `UgcShowcase` después de **Services**, antes de **Work** |
| B | Dentro de **Services** como bloque destacado |
| C | Página aparte `/ugc` (solo si el usuario lo pide) |

Indica en el prompt cuál opción prefieres.

---

## 7b. Refinamiento — plantilla TikTok + carrusel 3D (decisión fijada)

**Estado:** ✅ Implementado 2026-05-15 · Memoria viva → [`context-mode/ugc-tiktok-3d-carousel.md`](../context-mode/ugc-tiktok-3d-carousel.md)

**Decisión del cliente:** Mantener **3 slides en 3D** (prev | **active** | next).  
Solo el slide **central** lleva el mockup completo de la plantilla TikTok.  
Los laterales son previews reducidos (video en marco oscuro simple, sin UI For You completa).

**Referencias:** plantilla TikTok adjunta (UI negra, gradiente cyan→magenta) + captura del resultado actual a **no** repetir.

---

### Prompt completo — refactor (copiar)

```
Adjunto: (1) plantilla TikTok For You — FUENTE DE VERDAD del mockup,
(2) resultado actual morado/lavender — NO repetir ese chrome.

Refactor UgcCarousel.tsx + TikTokFrame.tsx + globals.css.

── DECISIÓN FIJA: carrusel 3D con teléfono al centro ──
- Siempre 3 slides visibles: prev | ACTIVE | next
- perspective ~1200px, ease-out-expo, swipe + flechas + tabs 01/02
- Slide ACTIVE (centro):
  · TikTokFrame COMPLETO según plantilla (UI negra For You)
  · scale(1), rotateY(0), z-index max, sombra fuerte
  · video autoplay muted solo en active · tap → tiktokUrl
- Slides PREV / NEXT (laterales):
  · Misma proporción 9:16 pero MARCO SIMPLE: solo video + borde void/negro,
    SIN tabs Following|For you, SIN nav inferior, SIN rail de iconos completo
  · scale(0.82–0.88), rotateY(±28–32deg), opacity 0.55–0.65, blur(1px) opcional
  · click en lateral → centra ese slide (no abre TikTok)
  · video pausado / poster frame
- NO eliminar mecánica 3D — es requisito del diseño

── Fondo en capas ──
1) Base portafolio: section-pad-ugc + void (o section-bg del wrapper en page.tsx)
2) Capa .ugc-tiktok-atmosphere (absolute inset-0, z-0, pointer-events-none):
   gradiente diagonal plantilla — teal/cyan arriba-izq → magenta abajo-der
   OKLCH en globals.css (--tiktok-atm-cyan, --tiktok-atm-magenta), opacidad ~0.9
3) Contenido (header + carrusel) en z-1+

Header sección: DESIGN.md (SectionLabel, Unbounded, em lime "en movimiento.")
Mockup central: colores PLANTILLA (blanco, negro UI, corazón rosa, + cyan/magenta en botón post)

── TikTokFrame (solo slide --active) ──
Paridad plantilla pantalla derecha:
- Marco teléfono negro rounded-[2px], notch opcional decorativo
- Top: "Following | For you"
- Rail derecha: avatar+, heart rosa + count, comment + count, share, music disc
- Bottom: @handle, caption, See translation, Original sound
- Progress bar blanca + nav inferior simplificado (aria-hidden decorativo)
- Video Cloudinary object-cover

Exportar variant: <TikTokFrame variant="full" /> vs variant="preview" para laterales
(o componente UgcSlidePreview separado)

── Carrusel UI ──
- Flechas ← →: blancas/minimal, sin cajas moradas cuadradas
- Indicador 01 02 arriba del stage (editorial lime/lavender) — OK mantener
- Stage min-height para que laterales no recorten

── Skills ──
DESIGN.md + MASTER §VII · ui-ux-pro-max search sin --persist
Impeccable: load-context → polish UgcCarousel

── Prohibido ──
lavender en chrome TikTok · fondo morado plano sin atmósfera · un solo slide sin 3D
Instagram UI · hex · Framer Motion

Entregable: diff 3 archivos + nota "full UI solo en .ugc-slide--active"
```

---

### Versión corta

```
Refactor UGC: 3D prev|ACTIVE|next. Solo centro = plantilla TikTok For You completa.
Laterales = preview oscuro 9:16 sin UI. Fondo capa gradiente cyan→magenta sobre void.
Quitar chrome lavender. Flechas minimal. impeccable polish.
```

---

### Frases clave (3D + plantilla)

| Concepto | Frase |
|----------|--------|
| Centro | *"TikTokFrame variant=full solo en .ugc-slide--active"* |
| Laterales | *"preview minimal: video + borde negro, sin UI For You, rotateY ±30deg"* |
| 3D | *"mantener prev/active/next — no colapsar a un solo teléfono"* |
| Fondo | *".ugc-tiktok-atmosphere sobre void, colores plantilla OKLCH"* |
| Interacción | *"tap lateral centra; tap activo abre tiktokUrl"* |

---

## 7c. Estado implementado — memoria de sesión

**Objetivo de esta sección:** Registrar qué quedó en código tras el hilo §7 → §7b, para retomar sin releer el chat.

**Context Mode (fuente viva):** [`context-mode/ugc-tiktok-3d-carousel.md`](../context-mode/ugc-tiktok-3d-carousel.md)

---

### Qué se construyó

| Pieza | Archivo | Notas |
|-------|---------|-------|
| Carrusel 3D | `components/sections/UgcCarousel.tsx` | prev \| active \| next · swipe · flechas · tabs · `#ugc` |
| Mockup For You | `components/ui/TikTokFrame.tsx` | Solo slide `.ugc-slide--active` |
| Preview lateral | `components/ui/UgcSlidePreview.tsx` | Video 9:16, marco oscuro, sin chrome TikTok |
| Datos | `lib/videos.ts` | 4 reels Cortefino · previews Cloudinary |
| Estilos | `app/globals.css` | `.ugc-carousel*`, `.ugc-slide--*`, `.ugc-tiktok-atmosphere`, `.tiktok-phone*` |
| Home | `app/page.tsx` | Tras Services, wrapper `section-bg-b` |

### CSS 3D (valores actuales)

```css
.ugc-carousel__stage { perspective: 1400px; }
.ugc-slide--prev  { transform: scale(0.85) rotateY(30deg);  opacity: 0.6; }
.ugc-slide--next  { transform: scale(0.85) rotateY(-30deg); opacity: 0.6; }
.ugc-slide--active { transform: scale(1) rotateY(0deg); opacity: 1; z-index: 3; }
```

Transición: `--duration-slow` + `--ease-out-expo`.

### Prompt corto para auditar / pulir (sin reimplementar)

```
Lee context-mode/ugc-tiktok-3d-carousel.md y doc/ejemplos.md §7c.

Audita #ugc en localhost: mantener 3D prev|active|next; mockup For You solo en centro;
laterales UgcSlidePreview; atmósfera cyan→magenta. Sin volver a opción “un solo teléfono”.
Impeccable load-context → polish. MASTER §VII. Entregable: checklist + fixes mínimos.
```

### Pendientes conocidos

- `tiktokUrl` vacío en reels 03 y 04 (`lib/videos.ts`)
- Teclado ←/→ requiere foco en la sección
- Opcional: pausar video en laterales cuando no están activos

---

*Última actualización: 2026-05-15*
