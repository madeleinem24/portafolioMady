# Context: Carrusel UGC TikTok 3D

**Última actualización:** 2026-05-15  
**Estado:** ✅ Implementado (refactor 3D + plantilla For You en centro)  
**Prompts detallados:** `doc/ejemplos.md` §7, §7b, §7c

---

## Resumen ejecutivo

Sección `#ugc` en home: reels UGC de `lib/videos.ts` en carrusel **3D** con tres slides visibles.  
Solo el slide **activo** muestra el mockup TikTok For You completo; los laterales son preview minimal (video 9:16, marco oscuro, sin chrome For You).  
Fondo editorial del portafolio + capa atmosférica **cyan → magenta** detrás del stage (excepción documentada de gradiente plantilla).

---

## Historial del hilo (decisiones)

| Fase | Qué pasó | Decisión |
|------|----------|----------|
| 1 | Primera implementación carrusel 3D genérico | Mecánica 3D OK; chrome morado/lavender **no** gustó |
| 2 | Usuario adjuntó plantilla TikTok For You oscura | UI negra, iconos blancos, corazón rosa, gradiente cyan→magenta |
| 3 | Implementación intermedia “un solo teléfono” | **Rechazada** — se perdió el 3D |
| 4 | Refinamiento acordado (§7b) | **Fijado:** 3 slides 3D; mockup completo **solo en centro** |
| 5 | Agente refactor (2026-05-15) | Restaurado prev\|active\|next + `UgcSlidePreview` |

---

## Arquitectura actual

### Componentes

| Archivo | Rol |
|---------|-----|
| `components/sections/UgcCarousel.tsx` | `'use client'` · track 3D · swipe · flechas · tabs 01/02 · aria-live |
| `components/ui/TikTokFrame.tsx` | Mockup For You **solo slide activo** (notch, tabs, rail, caption, nav, progress) |
| `components/ui/UgcSlidePreview.tsx` | Laterales: video Cloudinary muted/loop, marco `border-radius: 2px`, sin UI TikTok |
| `lib/videos.ts` | `ugcVideos[]` + `getUgcVideoPreviewUrl()` |
| `lib/types.ts` | `UgcVideoData` (+ `likeCount`, `commentCount`, `postedAgo` decorativos) |

### CSS (`app/globals.css`)

| Clase | Propósito |
|-------|-----------|
| `.ugc-tiktok-atmosphere` | Gradiente diagonal cyan/magenta, `z-0`, `pointer-events: none` |
| `.ugc-carousel` + `__stage` + `__track` | `perspective: 1400px`, `preserve-3d` |
| `.ugc-slide--prev` / `--active` / `--next` | `scale(0.85) rotateY(±30deg) opacity 0.6` vs activo `scale(1)` |
| `.ugc-slide-preview` | Marco lateral 9:16 editorial |
| `.tiktok-phone*` | Chrome For You del centro (intacto) |
| `@media (prefers-reduced-motion: reduce)` | Sin 3D; laterales opacidad ~0.88 |
| `@media (max-width: 639px) + reduced-motion` | Oculta prev/next (solo activo en móvil) |

### Tokens de atmósfera (globals.css `@theme`)

- `--tiktok-atmosphere-cyan`
- `--tiktok-atmosphere-magenta`
- `--tiktok-atmosphere-gradient`
- `--tiktok-atmosphere-opacity` (~0.9)
- `--tiktok-heart` (corazón rail)

**Nota:** Gradiente atmósfera es excepción a “sin degradados decorativos” — solo en `#ugc`, documentado aquí y en §7c de `doc/ejemplos.md`.

---

## Comportamiento de interacción

| Acción | Efecto |
|--------|--------|
| Clic slide **activo** | `window.open(tiktokUrl)` si URL existe |
| Clic slide **lateral** | `goTo(prevIndex \| nextIndex)` — centra, no abre TikTok |
| Flechas ← → | Navegan reels |
| Tabs 01…N | Salto directo |
| Swipe | Umbral ~48px |
| Teclado ← → | Solo si foco dentro de `#ugc` (`section.contains(activeElement)`) |
| Video play | `shouldPlay = !reduced \|\| hasInteracted` — en reduced-motion pide interacción primero |

### Casos borde

- `total < 2`: clase `ugc-carousel--single`, un solo `TikTokFrame`, sin laterales.
- Reels sin `tiktokUrl` (ej. ugc-03, ugc-04): clic activo no abre nada útil hasta completar URL en `lib/videos.ts`.

---

## Ubicación en home (`app/page.tsx`)

Orden actual:

```
Hero → InfiniteSlider → About (bg-b) → Services (bg-a) → UGC (bg-b) → Work (bg-a) → Skills (bg-b) → Brands (bg-a) → Contact
```

Header sección: `SectionLabel` **04 — Reels UGC** · título “Contenido / *en movimiento.*” (em lime).

---

## Qué NO repetir (anti-patrones de esta feature)

- Un solo teléfono centrado sin laterales 3D
- Chrome TikTok en color **lavender** del portafolio (mockup = negro/blanco/rosa plantilla)
- Fondo morado plano sin capa `.ugc-tiktok-atmosphere`
- UI tipo Instagram
- `rounded-xl` en marcos (usar `2px` editorial en preview; teléfono activo con `rounded-[28px]` solo en shell `.tiktok-phone`)

---

## Pendientes / mejoras opcionales

- [ ] Completar `tiktokUrl` en reels 03 y 04 (`lib/videos.ts`)
- [ ] Pausar video en slides laterales cuando `shouldPlay` (hoy comparten flag con activo — valorar `shouldPlay={false}` en `UgcSlidePreview` laterales)
- [ ] `TikTokFrame variant="full" \| "preview"` unificado (hoy preview es componente aparte — OK)
- [ ] Pulir Impeccable: `node .agents/skills/impeccable/scripts/load-context.mjs` + polish visual fino
- [ ] Ajustar escala/ángulo 3D si cliente pide más dramático (`rotateY`, `--ugc-slide-base`)
- [ ] ESLint config determinista (`pnpm lint` interactivo sin `eslint.config`)

---

## Verificación

```bash
pnpm dev          # localhost:3000 → scroll #ugc
pnpm exec tsc --noEmit
```

Breakpoints: 375 · 768 · 1024 · 1440 + `prefers-reduced-motion`.

---

## Referencias cruzadas

- Prompts: `doc/ejemplos.md` §7, §7b, §7c
- Skill video: `.claude/skills/cloudinary/SKILL.md`
- ADR imágenes vs video: `CLAUDE.md` ADR-006, ADR-007
