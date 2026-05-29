# Plantillas de prompts por área del design system

Copia, pega y reemplaza `[...]`.  
Guía general → [README.md](./README.md) · Tokens → [referencia-tailwind.md](./referencia-tailwind.md)

---

## Bloque de restricciones (pegar al final de cualquier prompt)

```
Stack: Next.js 15 + Tailwind CSS v4.

Lee design-system/MASTER.md [§ indicar abajo], app/globals.css (@theme), TOKENS.md.
Aplica cambios solo con clases Tailwind desde tokens (doc/referencia-tailwind.md).
NO uses --persist en ui-ux-pro-max. NO regeneres MASTER.md.
Prohibido: hex en className, arbitrary values (py-[73px]), rounded-xl, shadow-lg,
fuentes no declaradas en layout.tsx, inline styles salvo vars CSS en runtime.
Entregable: [diagnóstico primero | corrección directa].
```

---

## §I — Principios y voz visual

**Auditar alineación con la marca**

```
Usa ui-ux-pro-max.

Audita [Hero.tsx | toda la home] contra MASTER.md §I (principios visuales) y
design-system/PRODUCT.md. ¿La sección se siente galería editorial o catálogo genérico?
Lista desviaciones (jerarquía, densidad, tono) sin cambiar código aún.

[Bloque restricciones]
```

**Endurecer carácter editorial**

```
Usa impeccable.

Refuerza la voz visual §I en [componente]: más jerarquía tipográfica extrema,
más espacio intencional, acentos audaces contra void — sin romper tokens existentes.

Carga PRODUCT.md y DESIGN.md antes de proponer.
[Bloque restricciones]
```

---

## §II — Colores OKLCH

**Auditar uso de color**

```
Usa ui-ux-pro-max.

Revisa [archivo] contra MASTER.md §II: solo tokens OKLCH vía Tailwind (bg-void,
text-petal, text-lavender…). Detecta hex, colores fuera de paleta o contraste insuficiente.

[Bloque restricciones]
```

**Ajustar acentos en un componente**

```
En [ProjectCard.tsx], ajusta acentos según §II.2 (lavender/magenta/lime/gold).
Mantén fondos void/abyss. Solo clases tokenizadas. No introduzcas colores nuevos.

[Bloque restricciones]
```

---

## §III — Tipografía

**Auditar jerarquía tipográfica**

```
Usa ui-ux-pro-max.

Audita tipografía en [sección] vs MASTER.md §III: familias correctas (font-display,
font-serif, font-sans), escala mínima 3 pasos entre mayor y menor, tracking de display.

[Bloque restricciones]
```

**Corregir escala en hero o títulos**

```
Corrige jerarquía tipográfica en Hero.tsx según §III: text-hero, font-display font-black,
Instrument Serif solo en acentos itálicos. Sin nuevas familias Google.

[Bloque restricciones]
```

---

## §IV — Espaciado y grid

**Polish pass (errores tontos)** — el más usado

```
Usa la skill ui-ux-pro-max.

Pasada de corrección de UI en [alcance: Hero | ProjectGrid | home completa]:
- espaciado inconsistente (padding/margin/gap) → tokens --spacing-* / py-32, gap-6…
- colisiones (nav fijo, overlays, z-index)
- contenido tapado por fixed
- layout shift en hover
- responsive: 375, 768, 1024, 1440

Enfoque MASTER: §IV y §VII.
Mapeo tokens → Tailwind: doc/referencia-tailwind.md.

[Bloque restricciones — Entregable: corrección directa]
```

**Grid asimétrico de proyectos**

```
Revisa ProjectGrid.tsx + ProjectCard.tsx contra MASTER.md §IV.2:
grid 12 columnas, patrón 7+5 / 6+6 / 4+4+4, sin dos cards idénticas adyacentes.
Mobile: stack col-span-12. gap-6 entre cards.

[Bloque restricciones]
```

**Ritmo vertical entre secciones**

```
Audita ritmo vertical (§IV.3) en app/page.tsx y todas las sections:
padding-block entre secciones según escala; no dos secciones con el mismo py-*;
mínimo editorial py-32 en secciones principales.

[Bloque restricciones — Entregable: checklist + fixes]
```

---

## §V — Movimiento y animación

**Revisar transiciones**

```
Usa ui-ux-pro-max.

Audita animaciones en [Navbar | Hero | ProjectCard] vs MASTER.md §V:
duraciones (--duration-fast/base/slow), easing, sin layout shift en hover,
respeta prefers-reduced-motion. CSS @keyframes nativo, sin Framer Motion.

[Bloque restricciones]
```

**Suavizar micro-interacciones**

```
Mejora hover/focus en ProjectCard según §V: transiciones 200–300ms, feedback claro,
cursor-pointer, sin scale que mueva el layout.

[Bloque restricciones]
```

---

## §VI — Efectos y texturas

**Grain, outline, sombras**

```
Revisa efectos en [layout chrome | Hero] vs MASTER.md §VI:
grain overlay, OutlineText, sombras tintadas (no shadow-lg genérico).
Decorativos con aria-hidden donde aplique.

[Bloque restricciones]
```

---

## §VII — Anti-patrones

**Auditoría anti-slop**

```
Usa ui-ux-pro-max.

Escanea [carpeta components/] contra MASTER.md §VII y CLAUDE.md reglas de oro:
inline styles, hex, rounded-xl, fuentes prohibidas, cards gemelas, gradientes
púrpura-azul cliché, espaciado < 96px entre secciones en desktop.

Devuelve tabla: archivo | violación | fix con token.

[Bloque restricciones — Entregable: diagnóstico primero]
```

---

## §VIII — Tokens / globals.css

**Sincronizar token nuevo**

```
Necesito token para [caso de uso]. Propón entrada en MASTER.md §VIII,
cambio en app/globals.css @theme y clase Tailwind resultante.
Actualiza TOKENS.md si aplica. No edites componentes hasta mi OK.

[Bloque restricciones]
```

---

## Por componente del portafolio

| Componente | Enfoque MASTER sugerido |
|------------|-------------------------|
| `Hero.tsx` | §I, §III, §IV, §VI |
| `InfiniteSlider.tsx` / Marquee | §II (lime/void), §V |
| `ProjectGrid.tsx` / `ProjectCard.tsx` | §IV.2, §II, §V |
| `About.tsx` | §III, §IV |
| `Services.tsx` | §IV, §II |
| `Contact.tsx` | §III, §IV |
| `Navbar.tsx` | §IV (nav fijo), §V, §VII |
| `GrainOverlay`, `CustomCursor` | §VI |

**Ejemplo Hero completo**

```
Usa ui-ux-pro-max + criterios impeccable (PRODUCT/DESIGN).

Audita y corrige Hero.tsx: §I voz editorial, §III tipografía, §IV espaciado,
§VI efectos. Tokens Tailwind únicamente. Responsive 375–1440.

[Bloque restricciones]
```

**Hero — foto superpuesta al H1 (overlap editorial)**  
→ Ver [ejemplos.md §1](./ejemplos.md#1-hero--foto-encima-del-título): prompt completo, versión corta, detalles técnicos y frases clave.

---

## Combinar skills

**UI/UX Pro Max + MASTER (referencia, no reemplazo)**

```
ui-ux-pro-max: ejecuta search.py con query "[portfolio creative dark editorial]"
--stack nextjs para patrones UX. Aplica recomendaciones SOLO si mapean a tokens
existentes en MASTER.md. No --persist.

[Bloque restricciones]
```

**Impeccable para rediseño serio**

```
Usa impeccable shape en [componente].
Carga PRODUCT.md y DESIGN.md. MASTER.md §[X] es ley.
Propón dirección visual; confirma antes de codear.

[Bloque restricciones]
```

---

## Modos de entregable (elige uno)

```
Entregable: solo checklist (archivo, línea, problema, fix propuesto). Espera mi OK.
```

```
Entregable: implementa fixes en los archivos listados.
```

```
Entregable: 3 opciones A/B/C con trade-offs; sin código hasta que elija.
```

---

## Script ui-ux-pro-max (Windows)

Si el agente no corre el script solo, añade:

```
Ejecuta antes de codear:
python .cursor/skills/ui-ux-pro-max/scripts/search.py "[query]" --stack nextjs
```

Ejemplos de `query`:

| Objetivo | query |
|----------|--------|
| Layout / spacing | `portfolio layout spacing fixed navbar responsive` |
| Tipografía | `creative portfolio editorial typography dark` |
| Landing patterns | `portfolio creative director art gallery` |
| Accesibilidad | `accessibility contrast focus states forms` |

---

*Plantillas alineadas con MASTER.md v1.1.0 · 2026-05-15*
