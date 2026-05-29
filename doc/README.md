# Guía de prompts para el design system

Documentación para escribir instrucciones claras a Cursor (Agent / Composer) al trabajar UI en el portafolio de Madeleine Morales.

---

## Contenido de esta carpeta

| Archivo | Para qué sirve |
|---------|----------------|
| [README.md](./README.md) | Flujo de trabajo, jerarquía de archivos y skills, cómo armar cualquier prompt |
| [prompts.md](./prompts.md) | Plantillas listas para copiar por área del `MASTER.md` |
| [ejemplos.md](./ejemplos.md) | **Casos reales detallados** — prompt completo, corto, técnico y frases clave |
| [flujo-skills.md](./flujo-skills.md) | **Impeccable + ui-ux-pro-max + MASTER** — quién manda, flujos combinados, prompts |
| [referencia-tailwind.md](./referencia-tailwind.md) | Tabla rápida MASTER → `globals.css` → clases Tailwind v4 |

**Memoria de sesión (decisiones + estado en código):** carpeta [`../context-mode/`](../context-mode/) — no sustituye MASTER; complementa prompts largos.

---

## Cadena obligatoria (antes de pedir cambios)

```
design-system/MASTER.md     ← Reglas canónicas (§I–§VIII)
        ↓
app/globals.css (@theme)  ← Tokens CSS (--color-*, --spacing-*, --text-*)
        ↓
Tailwind v4               ← Utilidades: bg-void, py-32, font-display, text-petal…
        ↓
components/               ← Solo clases derivadas de tokens; sin hex ni arbitrary
```

**Archivos de apoyo**

| Archivo | Rol |
|---------|-----|
| `design-system/TOKENS.md` | Plantilla de `globals.css` y tipos — referencia al editar tokens |
| `design-system/DESIGN.md` | Resumen visual para Impeccable |
| `design-system/PRODUCT.md` | Contexto de marca y usuarios |
| `CLAUDE.md` | Contrato técnico del repo (stack, prohibiciones, estructura) |

---

## Jerarquía de skills (qué usar cuándo)

| Herramienta | Ubicación | Cuándo usarla |
|-------------|-----------|---------------|
| **MASTER.md** | `design-system/` | Siempre. Fuente de verdad del proyecto. |
| **Impeccable** | `.agents/skills/impeccable/` | Rediseñar, auditar, pulir UI **respetando** PRODUCT + DESIGN del proyecto. |
| **UI/UX Pro Max** | `.cursor/skills/ui-ux-pro-max/` | Patrones UX, benchmarks, checklist layout/spacing. **No** `--persist` (no regenerar MASTER). |

**Regla:** En este repo, `MASTER.md` gana sobre recomendaciones genéricas de ui-ux-pro-max.

**Flujos combinados (Impeccable + ui-ux-pro-max + doc):** → [flujo-skills.md](./flujo-skills.md)

---

## Cómo armar un prompt (5 pasos)

### 1. Elige el alcance

- **Un componente:** `components/sections/Hero.tsx`
- **Una sección del MASTER:** p. ej. espaciado → §IV
- **Todo el home:** `app/page.tsx` + todas las `sections/`
- **Solo auditoría:** checklist sin tocar código hasta tu OK

### 2. Elige la skill (opcional pero recomendado)

```
Usa la skill ui-ux-pro-max.
```
o
```
Usa impeccable (carga PRODUCT.md y DESIGN.md antes de editar).
```

### 3. Indica la sección del MASTER

Ejemplo: *"Lee MASTER.md §IV (espaciado) y §VII (anti-patrones)."*

Índice rápido:

| Sección MASTER | Tema |
|----------------|------|
| §I | Principios visuales, voz de marca |
| §II | Colores OKLCH |
| §III | Tipografía (Unbounded, Instrument Serif, Space Mono) |
| §IV | Espaciado modular y grid |
| §V | Movimiento (easing, duración) |
| §VI | Efectos (grain, outline text, sombras tintadas) |
| §VII | Anti-patrones prohibidos |
| §VIII | Referencia de custom properties |

### 4. Fija restricciones técnicas (siempre)

Copia este bloque al final de casi cualquier prompt:

```
Stack: Next.js 15 + Tailwind CSS v4 (App Router, SSG).

ANTES de editar:
1. Lee design-system/MASTER.md [§ indicar].
2. Cruza con app/globals.css (@theme) y design-system/TOKENS.md.

Aplicación: solo utilidades Tailwind desde tokens (bg-void, py-32, font-display…).
Prohibido: --persist de ui-ux-pro-max, hex en className, py-[73px], rounded-xl,
shadow-lg genéricos, style={{ color/padding }} salvo vars CSS calculadas en runtime.
No cambiar paleta ni tipografía base sin aprobación explícita.
```

### 5. Define el entregable

| Modo | Frase clave |
|------|-------------|
| Solo diagnóstico | *"Lista issues con archivo + línea; espera mi OK para implementar."* |
| Fix directo | *"Corrige en los componentes afectados."* |
| Propuesta | *"3 opciones con pros/contras; no codees hasta que elija."* |

---

## Plantilla universal (rellenar los `[...]`)

```
Usa la skill [ui-ux-pro-max | impeccable].

Tarea: [auditar | corregir | implementar | mejorar] [componente o área del sistema].
Enfoque MASTER: [§I | §II | §III | §IV | §V | §VI | §VII | §VIII — describir en una línea].

Alcance: [ruta del archivo o "todo el home"].

Criterios:
- [lista concreta de qué revisar o qué lograr]

Stack: Next.js 15 + Tailwind v4.
Lee MASTER.md [§X], app/globals.css (@theme), TOKENS.md.
Mapeo: tokens → clases Tailwind (ver doc/referencia-tailwind.md).
NO --persist. NO cambiar identidad visual base.

Entregable: [checklist | código | propuesta primero].
```

Más plantillas por área → [prompts.md](./prompts.md).  
Casos reales paso a paso → [ejemplos.md](./ejemplos.md).

---

## Ejemplo destacado: Hero con foto sobre el título

Composición editorial donde el retrato tapa el H1 al reducir el viewport.  
Documentación completa (4 formatos de prompt + stack z-index):

→ **[ejemplos.md §1 — Hero / foto encima del título](./ejemplos.md#1-hero--foto-encima-del-título)**  
→ **[ejemplos.md §2 — About / Sobre mí (paridad HTML)](./ejemplos.md#2-about--sobre-mí-paridad-html-v3)**  
→ **[ejemplos.md §4 — Work / Proyectos bento](./ejemplos.md#4-work--proyectos-paridad-html-v3)**  
→ **[ejemplos.md §5 — Skills + Colaboraciones (nuevas)](./ejemplos.md#5-skills--brands-colaboraciones-nuevas)**  
→ **[ejemplos.md §6 — Contact + footer](./ejemplos.md#6-contact--footer-paridad-html-v3)**  
→ **[ejemplos.md §7 — Carrusel 3D UGC TikTok](./ejemplos.md#7-carrusel-3d-ugc--marco-tiktok)**  
→ **[ejemplos.md §7b — Refinamiento plantilla + 3D](./ejemplos.md#7b-refinamiento--plantilla-tiktok--carrusel-3d-decisión-fijada)**  
→ **[ejemplos.md §7c — Estado implementado](./ejemplos.md#7c-estado-implementado--memoria-de-sesión)** · contexto → [`context-mode/ugc-tiktok-3d-carousel.md`](../context-mode/ugc-tiktok-3d-carousel.md)

---

## Breakpoints de prueba

Inclúyelos en prompts de layout o responsive:

```
375px (móvil), 768px (tablet), 1024px (desktop), 1440px (editorial max)
```

---

## Después de instalar o cambiar skills

1. Reinicia Cursor.
2. Verifica que exista `.cursor/skills/ui-ux-pro-max/`.
3. En Windows, si pide Python: `python .cursor/skills/ui-ux-pro-max/scripts/search.py --help`

---

## Checklist rápido pre-entrega (para el agente o para ti)

- [ ] ¿Usa tokens (`bg-void`, `py-32`) y no hex/arbitrary?
- [ ] ¿Respeta §VII (sin Poppins, sin #000/#fff, sin cards gemelas)?
- [ ] ¿Espaciado entre secciones ≥ ritmo del §IV.3?
- [ ] ¿Nav fijo no tapa contenido?
- [ ] ¿Hover sin layout shift?
- [ ] ¿`pnpm typecheck` y `pnpm lint` pasan?

---

## Testing E2E y regresión (browser real)

Esto fue lo que usamos para validar carruseles, autoplay de video y comportamiento en scroll.

### Cómo se llama cada cosa

- **E2E (End-to-End):** prueba de flujo real de usuario en navegador.
- **Regression test:** prueba para confirmar que algo que ya funcionaba no se rompió.
- **Visual/UX check automatizado:** validar layout uniforme, `object-fit`, estados `paused/currentTime`, etc.
- **Performance proxy:** métricas simples de jank (frames largos, remounts de nodos pesados) durante scroll.

### Herramienta usada en el proyecto

- Runner usado en estas sesiones: **Playwright Test** vía `pnpm dlx`.
- Contexto: también se exploró **Webwright** (framework de agentes browser), pero para validación local rápida y reproducible aquí usamos specs E2E de Playwright.

### Flujo recomendado (paso a paso)

1. **Levantar app local**
   - `npm run dev`
   - Verificar `http://localhost:3000`
2. **Crear spec temporal** en `scripts/*.spec.js`
   - Objetivo claro: autoplay, fit de imagen, transición, loop, etc.
3. **Ejecutar la prueba**
   - `pnpm dlx @playwright/test test "scripts/mi-spec.spec.js" --reporter=line --workers=1`
4. **Leer evidencia en consola**
   - Logs tipo `STATE`, `METRICS`, `LAYOUT`.
   - Validar criterios (ej. `paused:false`, `objectFit:"contain"`, anchos uniformes).
5. **Corregir código** y repetir hasta pasar.
6. **Borrar spec temporal** si fue solo de diagnóstico.

### Plantilla mínima de spec (patrón)

```js
const { test, expect } = require('@playwright/test')

test('nombre de la validación', async ({ page }) => {
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' })
  await page.locator('#cortefino').scrollIntoViewIfNeeded()
  await page.waitForTimeout(1200)

  const state = await page.evaluate(() => {
    const videos = Array.from(document.querySelectorAll('#cortefino .anim-cell__video'))
    return videos.map((v) => ({ paused: v.paused, t: v.currentTime }))
  })

  console.log('STATE', JSON.stringify(state))
  expect(state.length).toBeGreaterThan(0)
})
```

### Casos útiles para este repo

- **Autoplay viewport:** `paused === false` al entrar a `#cortefino`.
- **Loop de video:** mover `currentTime` al final y comprobar que vuelve a 0 y sigue reproduciendo.
- **No flicker por remount:** vigilar `addedVideos/removedVideos` en `MutationObserver`.
- **Uniformidad de carruseles:** medir `getBoundingClientRect().width/height` en `.cslider__viewport`.
- **Fit real de imagen:** `getComputedStyle(img).objectFit === 'contain'` cuando aplique.

### Troubleshooting rápido

- **No reproduce en tu navegador pero sí en test:** hacer hard reload (`Ctrl+F5`).
- **Errores de certificado al instalar herramientas:** usar `pnpm dlx` como alternativa temporal.
- **Resultados inconsistentes:** correr con `--workers=1` para evitar interferencias.

---

*Última actualización: 2026-05-15 · Proyecto: Madeleine Morales Portfolio*
