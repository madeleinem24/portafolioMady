# CLAUDE.md — Brújula Técnica del Proyecto
## Madeleine Morales · Portfolio Web Profesional
**Última revisión:** 2026-05-15 | **Estado:** 🟢 Activo

> **Contrato de sesión:** Leer `design-system/MASTER.md` antes de escribir cualquier línea de UI. Sin excepción.

---

## 1. Resumen Ejecutivo

**Cliente:** Madeleine Morales — Diseñadora Gráfica, UCG  
**Objetivo:** Portafolio de alto nivel con estética de "Director de Arte".  
**Audiencia:** Reclutadores senior, directores creativos, clientes de diseño.  
**Tono:** Editorial, espacioso, sofisticado. Una galería, no un catálogo.

**Métricas de éxito:** Lighthouse Performance ≥ 90 · Accessibility ≥ 95 · FCP < 1.5s · Zero estilos inline.

---

## 2. Stack Tecnológico

| Capa             | Tecnología                  | Versión  | Notas                                        |
|------------------|-----------------------------|----------|----------------------------------------------|
| Framework        | Next.js (App Router)        | `^15.x`  | `output: 'export'` — SSG                     |
| Lenguaje         | TypeScript                  | `^5.x`   | Strict mode activado                         |
| Estilos          | Tailwind CSS                | `^4.x`   | Tokens OKLCH del MASTER.md                   |
| Fuentes          | `next/font/google`          | —        | Self-hosted automático, sin FOUT             |
| Imágenes         | `next/image` con URL directa| —        | URL provista por la diseñadora / API propia  |
| Video            | Cloudinary Video Player     | —        | `cloudinaryVideoUrl` — ver skill `cloudinary`|
| Deploy           | GitHub Pages                | —        | Rama `gh-pages`, CI/CD automático            |
| Package Manager  | `pnpm`                      | `^9.x`   | Más rápido, compatible con CI                |
| Linting          | ESLint + Prettier           | —        | Config base Next.js                          |
| Animaciones      | CSS nativo + `@keyframes`   | —        | Sin Framer Motion (~45KB menos)              |

---

## 3. Estructura del Proyecto

```
madeleine-portfolio/
├── app/
│   ├── layout.tsx            ← Root layout: fuentes, grain, cursor, metadata
│   ├── page.tsx              ← Home: ensambla secciones
│   ├── globals.css           ← Tokens OKLCH (plantilla en design-system/TOKENS.md)
│   └── favicon.ico
│
├── components/
│   ├── layout/
│   │   ├── Nav.tsx                 [client] ← Navegación fija con blur/scrim
│   │   ├── GrainOverlay.tsx        [client] ← Textura de ruido fija
│   │   ├── ScrollProgressBar.tsx   [client]
│   │   └── CustomCursor.tsx        [client]
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── MarqueeStrip.tsx
│   │   ├── ProjectGrid.tsx
│   │   ├── About.tsx
│   │   ├── Services.tsx
│   │   └── Contact.tsx
│   └── ui/
│       ├── ProjectCard.tsx
│       ├── SectionLabel.tsx        ← Pattern: "/ 01 — WORK"
│       ├── OutlineText.tsx         ← Técnica firma, MASTER.md §III.5
│       └── VideoPlayer.tsx         ← Wrapper video Cloudinary [client]
│
├── design-system/
│   ├── MASTER.md             ← ⚠️ LEER ANTES DE CUALQUIER UI
│   └── TOKENS.md             ← Plantilla completa de globals.css y types.ts
│
├── lib/
│   ├── cloudinary.ts         ← Solo cloudinaryVideoUrl (no imágenes)
│   ├── projects.ts           ← Data type-safe de proyectos
│   └── types.ts              ← ProjectData, ServiceData (plantilla en TOKENS.md)
│
├── CLAUDE.md
├── next.config.ts            ← Plantilla completa en design-system/TOKENS.md
└── .env.local                ← NO commitear
```

**Reglas de estructura:**
- Un componente = un archivo. No exportar múltiples componentes por archivo.
- `sections/` → Server Components por defecto.
- `layout/` y `ui/` con DOM events → agregar `'use client'`.

---

## 4. Comandos

```bash
pnpm install          # Instalar dependencias
pnpm dev              # Dev con Turbopack → localhost:3000
pnpm typecheck        # tsc --noEmit (verificar tipos sin compilar)
pnpm lint             # ESLint
pnpm lint:fix         # ESLint --fix
pnpm format           # Prettier --write
pnpm build            # Export estático → /out
pnpm preview          # Serve /out en :3001 (simula GH Pages)
pnpm analyze          # ANALYZE=true next build
pnpm deploy           # pnpm build && gh-pages -d out
```

CI/CD: `.github/workflows/deploy.yml` se dispara automáticamente en push a `main`.

---

## 5. Tailwind CSS + OKLCH

El bloque `@theme` completo (colores, fuentes, espaciado, easing) vive en `app/globals.css`.  
**Plantilla de referencia:** `design-system/TOKENS.md`.  
Mantener sincronizado con `design-system/MASTER.md §VIII`.

**`next.config.ts` — puntos clave:**
- `output: 'export'` + `trailingSlash: true` → GitHub Pages
- `images.unoptimized: true` → no hay server en SSG
- `remotePatterns` → incluir hostname de la API de imágenes de la diseñadora + `res.cloudinary.com`
- Descomentar `basePath` en producción si el repo no está en raíz

**Uso de tokens en componentes:**

```tsx
// ✅ Tailwind con tokens del sistema de diseño
<h1 className="font-display font-black tracking-[-0.03em] text-petal">
<section className="bg-void py-48 px-16">

// ✅ style solo para valores calculados dinámicamente en JS
<div style={{ '--progress': `${scrollPercent}%` } as React.CSSProperties}>

// ❌ PROHIBIDO
<h1 style={{ color: '#C084FC' }}>       // inline hardcodeado
<section className="py-[73px]">         // arbitrario sin token
<p className="font-['Poppins']">        // fuente no declarada
className="text-[#C084FC] bg-[#190019]" // hex en className → usar text-lavender bg-void
```

---

## 6. Estrategia de Media

### Imágenes — URL directa

Las imágenes **no** pasan por Cloudinary. Se cargan con `next/image` usando la URL original provista por la diseñadora o su API.

```tsx
import Image from 'next/image'

// ProjectData.imageUrl es una URL completa (https://...)
<Image
  src={project.imageUrl}
  alt={project.imageAlt}
  width={800}
  height={600}
  unoptimized   // obligatorio en SSG
  className="w-full h-full object-cover"
/>
```

Si la calidad no es suficiente con URL directa → evaluar Cloudinary fetch (ADR-006).

### Videos — Cloudinary

Solo los videos de proceso/showcase van a Cloudinary. Ver skill `cloudinary` para:
- `cloudinaryVideoUrl()` helper
- `VideoPlayer.tsx` componente
- Estructura de carpetas en Cloudinary

```tsx
// Uso básico
<VideoPlayer publicId="madeleine-portfolio/projects/slug/process-video" />
```

**Variable de entorno:**

```bash
# .env.local (NO commitear)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=tu_cloud_name

# .env.example (SÍ commitear)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
```

---

## 7. Convenciones de Código

### Nomenclatura

| Tipo             | Patrón          | Ejemplo                    |
|------------------|-----------------|----------------------------|
| Componentes      | PascalCase      | `ProjectCard.tsx`          |
| Hooks            | `use` + camelCase | `useScrollProgress.ts`   |
| Utilities        | camelCase       | `cloudinaryVideoUrl`       |
| Types/Interfaces | PascalCase      | `ProjectData`              |
| Constantes       | SCREAMING_SNAKE | `MAX_PROJECTS`             |
| Data files       | camelCase       | `projects.ts`              |

### Patrón de componente

```tsx
// Server Component por defecto.
// Agregar 'use client' solo si usa: useState/useEffect/useRef, DOM events, APIs browser.

interface ComponentProps {
  // props tipadas explícitamente — nunca `any`
}

export default function ComponentName({ prop }: ComponentProps) {
  return (
    <section id="id" className="...tokens del sistema...">
      {/* ── Descripción de bloque ──────────────────────── */}
      <div aria-hidden="true" /> {/* decorativo → aria-hidden */}
    </section>
  )
}
```

Tipos completos de `ProjectData` y `ServiceData` → `design-system/TOKENS.md`.

### Prohibiciones absolutas

```
❌ style={{ color: '...', padding: '...' }}    → usar clases Tailwind con tokens
❌ font-['Inter'] / font-['Poppins']           → solo fuentes declaradas en layout.tsx
❌ text-[#C084FC] / bg-[#190019]              → usar text-lavender / bg-void
❌ rounded-xl / rounded-2xl / rounded-full    → usar rounded-[2px] o sin rounded
❌ shadow-lg / shadow-xl / shadow-2xl         → CSS custom con color tintado
❌ import { Inter } from 'next/font/google'   → importar fuentes solo en layout.tsx
❌ const data: any = fetchProjects()          → tipado explícito siempre
```

---

## 8. Reglas de Oro — Anti-Slop

> Violarlas produce "AI Slop". El enemigo declarado de este proyecto.

**REGLA 0 — Protocolo de consulta:** Antes de cualquier UI → (1) abrir MASTER.md, (2) verificar tokens de color §II, (3) estilo tipográfico §III.3, (4) espaciado §IV, (5) anti-patrones §VII. Solo entonces, codear. Si no hay token para el caso de uso, documentar la brecha en MASTER.md antes de proceder.

**REGLA 1 — Zero Inline Styles:** Excepción ÚNICA → valores calculados en JS runtime:
```tsx
<div style={{ '--scroll-progress': `${progress}%` } as React.CSSProperties} />
<div style={{ transform: `translateX(${offsetPx}px)` }} />
```

**REGLA 2 — Grid Asimétrico:** El grid de proyectos nunca tendrá columnas uniformes. Patrón para 6 proyectos: `[8+4] / [6+6] / [4+8]` cols en 12-col grid.

**REGLA 3 — Jerarquía Tipográfica Extrema:** Diferencia mínima de 3 pasos en la escala tipográfica entre texto mayor y menor en cada sección.

**REGLA 4 — El Espacio Es el Diseño:** Padding mínimo en secciones: `--space-32` (128px). Sección llena → quitar elementos, no reducir espacio.

**REGLA 5 — Sin Componentes Genéricos:** No existe `<Card>`, `<Badge>`, `<Button>` genérico. Existen `<ProjectCard>`, `<SectionLabel>`, `<StatBlock>`.

**REGLA 6 — Señales de Alarma:**
```
🚨 El diseño parece un template de Framer/Webflow
🚨 Más de 3 border-radius > 0 en una sección
🚨 Degradado púrpura-azul en cualquier elemento
🚨 Poppins / Montserrat / Inter / Raleway en uso
🚨 Fondo #000000 o #FFFFFF en cualquier elemento
🚨 Dos cards iguales juntas en el grid
🚨 Espaciado entre secciones < 96px en desktop
```

---

## 9. Flujo de Trabajo — Loop Discipline

**Loop obligatorio por cada feature:**

1. **SCOPE** — Definir exactamente qué se construye. ("Voy a construir `Hero.tsx` con foto, título y stats" — no "voy a hacer el portfolio completo")
2. **REVIEW** — Proponer el cambio en lenguaje natural antes de codear. Esperar confirmación.
3. **IMPLEMENT** — Escribir código usando solo tokens del MASTER.md. Un componente a la vez.
4. **VERIFY** — Revisar contra MASTER.md §VII. Zero inline styles, tokens correctos, TS completo, a11y básica.
5. **NEXT SCOPE** — Repetir.

**Orden recomendado de construcción:**

```
Fase 1 — Fundamentos:   next.config.ts · globals.css · layout.tsx
                         lib/types.ts · lib/cloudinary.ts · lib/projects.ts
Fase 2 — Chrome:         GrainOverlay · CustomCursor · ScrollProgressBar · Nav
Fase 3 — Hero+Marquee:   Hero.tsx · MarqueeStrip.tsx
Fase 4 — Work:           ProjectCard.tsx · ProjectGrid.tsx
Fase 5 — Secundarias:    About · Services · Contact
Fase 6 — Polish:         Metadata/OG · favicon · CI/CD · Deploy GH Pages
```

**Checklist pre-commit:**

```
□ pnpm typecheck  → 0 errores TypeScript
□ pnpm lint       → 0 warnings ESLint
□ pnpm build      → build exitoso sin errores
□ grep "style="   → solo excepciones documentadas
□ Cero hex hardcodeados en componentes
□ Fuentes declaradas solo en layout.tsx
□ Todos los img con alt descriptivo
□ Landmark roles en todas las secciones (main, section, nav, footer)
```

---

## 10. Estado de Componentes

> Actualizar al completar cada componente.

| Componente               | Estado       | Notas                                          |
|--------------------------|--------------|------------------------------------------------|
| `GrainOverlay.tsx`       | ✅ Completo  | —                                              |
| `CustomCursor.tsx`       | ✅ Completo  | —                                              |
| `ScrollProgressBar.tsx`  | ✅ Completo  | —                                              |
| `Navbar.tsx`             | ✅ Completo  | —                                              |
| `Hero.tsx`               | ✅ Completo  | —                                              |
| `InfiniteSlider.tsx`     | ✅ Completo  | Rotado -1.5deg · ✦ sep · lime/void             |
| `ProjectCard.tsx`        | ✅ Completo  | Full-bleed gradient · arrow badge · info overlay|
| `ProjectGrid.tsx`        | ✅ Completo  | 6 proyectos · col 7+5/5+5/4+4+4               |
| `About.tsx`              | ✅ Completo  | Foto izq · tags software/áreas · pill flotante |
| `Services.tsx`           | ✅ Completo  | 6 servicios · grid 3-col gap-border · emojis   |
| `Contact.tsx`            | ✅ Completo  | 2 columnas · headline + items + CTA             |
| `UgcCarousel.tsx`        | ✅ Completo  | 3D prev\|active\|next · §context-mode/ugc-tiktok-3d-carousel.md |
| `TikTokFrame.tsx`        | ✅ Completo  | Mockup For You solo en slide activo            |
| `UgcSlidePreview.tsx`    | ✅ Completo  | Laterales 9:16 sin chrome TikTok               |
| `VideoPlayer.tsx`        | ⬜ Pendiente | Cloudinary video wrapper (proyectos, no UGC)   |
| `SectionLabel.tsx`       | ✅ Completo  | Pattern: "/ 01 — WORK"                        |
| `OutlineText.tsx`        | ⬜ Pendiente | MASTER.md §III.5                               |

**Leyenda:** ⬜ Pendiente · 🔄 En progreso · ✅ Completo · ⚠️ Necesita revisión

---

## 11. Variables de Entorno

```bash
# .env.local (NO commitear — agregar a .gitignore)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=tu_cloud_name   # solo si hay videos

# Futuro — formulario de contacto con backend:
# RESEND_API_KEY=re_xxxx
# CONTACT_EMAIL=madeleine@ejemplo.com
```

```bash
# .env.example (SÍ commitear)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
```

GitHub Actions Secret requerido si hay videos: `CLOUDINARY_CLOUD_NAME`

---

## 12. Decisiones de Arquitectura (ADRs)

| #   | Decisión                          | Razón principal                                    | Consecuencia clave                                     |
|-----|-----------------------------------|----------------------------------------------------|--------------------------------------------------------|
| 001 | SSG (`output: 'export'`)          | GitHub Pages solo sirve estáticos                  | `next/image` necesita `unoptimized: true`              |
| 002 | Tailwind v4 + `@theme`            | Tokens del MASTER.md como clases directas          | `globals.css` debe sincronizarse con MASTER.md         |
| 003 | CSS `@keyframes` sin Framer Motion| ~45KB menos en bundle, mejor LCP                   | Animaciones complejas requieren más CSS manual         |
| 004 | `pnpm`                            | ~2× velocidad, compatible con CI/CD                | No se genera `package-lock.json`                       |
| 005 | Data en TypeScript, no CMS        | Sitio estático, cambios infrecuentes               | Cada update de contenido requiere re-deploy            |
| 006 | Imágenes via URL directa          | La diseñadora provee sus propias URLs              | Sin optimización automática; evaluar Cloudinary fetch si falla |
| 007 | Cloudinary solo para video        | Videos de proceso necesitan CDN, imágenes no       | `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` solo si hay videos |

---

*Memoria técnica persistente. Toda decisión que no esté aquí no existe para el siguiente contexto de IA.  
Plantillas de código extendidas: `design-system/TOKENS.md` · Skill de video: `cloudinary`*
