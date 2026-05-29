# Flujo conjunto: Impeccable + UI/UX Pro Max + MASTER

Cómo usar las tres capas del proyecto sin que se pisen entre sí.

---

## Las tres capas (quién manda)

```
┌─────────────────────────────────────────────────────────────┐
│  design-system/MASTER.md + app/globals.css                  │
│  LEY — tokens, anti-patrones, implementación Tailwind       │
└──────────────────────────────┬──────────────────────────────┘
                               │ siempre gana en conflictos
┌──────────────────────────────▼──────────────────────────────┐
│  Impeccable (.agents/skills/impeccable/)                    │
│  CEREBRO DE MARCA — PRODUCT.md, DESIGN.md, comandos craft/  │
│  polish/audit/layout… + leyes de diseño anti-slop           │
└──────────────────────────────┬──────────────────────────────┘
                               │ complementa, no reemplaza
┌──────────────────────────────▼──────────────────────────────┐
│  UI/UX Pro Max (.cursor/skills/ui-ux-pro-max/)              │
│  BIBLIOTECA — patrones UX, benchmarks, search.py, checklists│
└─────────────────────────────────────────────────────────────┘
```

| Pregunta | Respuesta |
|----------|-----------|
| ¿Quién define colores y espaciado? | **MASTER.md** → `globals.css` |
| ¿Quién define voz de marca y usuarios? | **PRODUCT.md** (Impeccable lo carga solo) |
| ¿Quién resume el look visual para agentes? | **DESIGN.md** (Impeccable) |
| ¿Quién trae patrones genéricos de industria? | **ui-ux-pro-max** — solo si encajan con MASTER |

**Regla de oro:** Si ui-ux-pro-max o Impeccable proponen algo que viola MASTER §VII → **descartar** la propuesta.

---

## Impeccable en este repo

### Contexto que carga automáticamente

El script `load-context.mjs` busca en `design-system/`:

- `design-system/PRODUCT.md` — obligatorio  
- `design-system/DESIGN.md` — recomendado  

No hace falta copiar archivos: ya están en la ruta correcta.

```bash
node .agents/skills/impeccable/scripts/load-context.mjs
```

### Register de este portafolio

Madeleine Morales = **brand** (portafolio / landing editorial).  
Impeccable cargará `reference/brand.md`, no `product.md`.

### Comandos útiles para este proyecto

| Comando | Cuándo usarlo en el portafolio |
|---------|--------------------------------|
| `polish Hero` | Pasada final: detalles, consistencia, calidad pre-ship |
| `layout Hero` | Espaciado, ritmo, jerarquía, colisiones |
| `audit Hero` | A11y, responsive, perf — checklist técnico |
| `critique Hero` | Review heurístico UX (sin tocar código aún) |
| `typeset Hero` | Jerarquía tipográfica §III |
| `animate ProjectCard` | Micro-interacciones §V |
| `bolder Services` | Sección que se siente plana |
| `adapt Contact` | Breakpoints y mobile |
| `craft [feature]` | Feature nueva de punta a punta (shape → build) |
| `shape [feature]` | Planificar antes de codear |
| `live` | Iterar variantes en el browser |

Invocación en Cursor (si está pinneado o por skill):

```
Usa impeccable polish Hero
```

o en lenguaje natural:

```
Usa la skill impeccable. Ejecuta load-context.mjs, register brand, luego polish en Hero.tsx siguiendo reference/polish.md.
```

---

## UI/UX Pro Max en este repo

| Usar para | No usar para |
|-----------|--------------|
| Checklist layout/spacing/responsive | Regenerar `MASTER.md` (`--persist`) |
| `search.py` con query de industria | Paletas o fuentes nuevas fuera de tokens |
| Patrones de landing/portfolio creativo | Sustituir PRODUCT.md / DESIGN.md |

```bash
python .cursor/skills/ui-ux-pro-max/scripts/search.py "portfolio creative editorial dark" --stack nextjs
```

---

## Flujos recomendados (paso a paso)

### A — Arreglar errores tontos (spacing, colisiones)

Orden ideal:

1. **ui-ux-pro-max** — checklist y patrones (qué buscar)  
2. **Implementar** — con tokens MASTER → Tailwind  
3. **impeccable layout** — pulir ritmo y jerarquía con marca  
4. **impeccable audit** — a11y + responsive final  

**Prompt combinado (copiar):**

```
Fase 1 — ui-ux-pro-max: checklist de spacing, overlaps, fixed nav, layout shift,
responsive 375–1440. NO --persist.

Fase 2 — Implementa fixes en [archivos] solo con tokens MASTER → Tailwind
(doc/referencia-tailwind.md).

Fase 3 — impeccable layout [target]:
- Ejecuta: node .agents/skills/impeccable/scripts/load-context.mjs
- Register: brand · Carga reference/brand.md + reference/layout.md
- Pulir ritmo y jerarquía sin violar MASTER §IV ni §VII

Fase 4 — impeccable audit [target]: a11y, focus, contraste, reduced-motion.

MASTER.md manda sobre cualquier sugerencia genérica.
```

---

### B — Composición visual grande (ej. Hero overlap)

Orden ideal:

1. **doc/ejemplos.md §1** o prompt de overlap — spec clara  
2. **Implementar** capas z-index en Hero + globals.css  
3. **impeccable polish** o **critique** — ¿se siente editorial o template?  
4. **ui-ux-pro-max** (opcional) — solo validar responsive checklist  

**Prompt combinado:**

```
Objetivo: Hero con foto sobre H1 (doc/ejemplos.md §1).

1) Implementa capas z-1/z-2/z-3 en Hero.tsx + .hero-* (MASTER §III–§VI).
2) impeccable critique Hero — register brand; ¿pasa el AI slop test?
3) impeccable polish Hero — detalles finales, copy, micro-spacing.
4) ui-ux-pro-max: valida responsive 375–1024 sin --persist.

PRODUCT.md + DESIGN.md + MASTER.md son ley. Tokens Tailwind únicamente.
```

---

### C — Rediseñar o endurecer una sección

1. **impeccable shape** `Services` — plan UX/UI  
2. Tu OK  
3. **impeccable craft** `Services` — implementación  
4. **ui-ux-pro-max** — benchmark opcional si necesitas referencias  
5. **impeccable polish** + **audit**  

---

### D — Solo pulir (ya funciona, falta brillo)

```
Usa impeccable polish [ProjectGrid | todo el home].

Antes: node .agents/skills/impeccable/scripts/load-context.mjs
Carga: reference/polish.md + brand.md
Restricción: MASTER.md §VII — cero anti-patrones. No cambiar estructura del grid asimétrico §IV.2.
Entregable: cambios mínimos de alto impacto.
```

Opcional después:

```
ui-ux-pro-max: pre-delivery checklist en los archivos tocados.
```

---

## Matriz rápida: qué skill para qué tarea

| Tarea | Primero | Después | Fuente de verdad |
|-------|---------|---------|-------------------|
| Espaciado / colisiones | ui-ux-pro-max | impeccable `layout` | MASTER §IV |
| Overlap hero / capas z | doc/ejemplos §1 | impeccable `polish` | MASTER §III, §VI |
| Tipografía débil | impeccable `typeset` | — | MASTER §III |
| Sección aburrida | impeccable `bolder` | — | PRODUCT anti-refs |
| Sección ruidosa | impeccable `quieter` | — | MASTER §I |
| A11y / Lighthouse | impeccable `audit` | — | MASTER + WCAG |
| Animaciones | impeccable `animate` | — | MASTER §V |
| Feature nueva | impeccable `shape` → `craft` | ui-ux-pro-max (ref) | MASTER + PRODUCT |
| Iterar en browser | impeccable `live` | — | DESIGN.md |

---

## Bloque de restricciones (pegar en prompts combinados)

```
Jerarquía de archivos:
1. design-system/MASTER.md + app/globals.css (@theme)
2. design-system/PRODUCT.md + DESIGN.md (vía impeccable load-context)
3. ui-ux-pro-max solo como referencia UX — NO --persist

Impeccable: register brand · node .agents/skills/impeccable/scripts/load-context.mjs
Stack: Next.js 15, Tailwind v4, SSG. Tokens únicamente (doc/referencia-tailwind.md).
```

---

## Errores comunes al combinar skills

| Error | Solución |
|-------|----------|
| ui-ux-pro-max regenera MASTER con `--persist` | Prohibir explícitamente en el prompt |
| Impeccable propone fuente nueva | Recordar: solo Unbounded / Instrument Serif / Space Mono |
| Impeccable ignora tokens | Añadir: *"Mapea toda decisión a clases existentes en globals.css"* |
| Dos skills se contradicen | *"MASTER.md gana"* |
| Impeccable no carga contexto | `IMPECCABLE_CONTEXT_DIR=design-system` o verificar PRODUCT.md en esa carpeta |
| Solo ui-ux-pro-max sin marca | Añadir impeccable para PRODUCT/DESIGN |

---

## Enlaces

- [README.md](./README.md) — Cómo armar cualquier prompt  
- [prompts.md](./prompts.md) — Plantillas por §MASTER  
- [ejemplos.md](./ejemplos.md) — Casos reales (Hero overlap…)  
- [referencia-tailwind.md](./referencia-tailwind.md) — Tokens → clases  

---

*Última actualización: 2026-05-15*
