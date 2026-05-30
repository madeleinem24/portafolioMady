# Skill global `design-prompt-spec`

Documentación de la **metodología de prompts en 4 partes** y de la skill personal creada para reutilizarla en proyectos de diseño (Madeleine y otros clientes).

**No confundir con:** [ejemplos.md](./ejemplos.md) — ahí viven los **casos reales del portafolio** (§1 Hero, §8 fotografías personales, etc.). Este archivo documenta **cómo se elaboran** esos prompts y la skill que automatiza el proceso.

**Origen:** Sesión 2026-05-29 — el flujo de `doc/ejemplos.md` (prompt completo · versión corta · detalles técnicos · frases clave) demostró ser repetible y portable. Se formalizó como skill global instalada en el sistema del usuario.

---

## Índice

1. [Problema que resuelve](#1-problema-que-resuelve)
2. [Qué va en la skill vs qué queda por proyecto](#2-qué-va-en-la-skill-vs-qué-queda-por-proyecto)
3. [Dónde está instalada](#3-dónde-está-instalada)
4. [Estructura de archivos](#4-estructura-de-archivos)
5. [Las cuatro partes (metodología)](#5-las-cuatro-partes-metodología)
6. [Qué copiar en Cursor](#6-qué-copiar-en-cursor)
7. [Workflow de la skill (6 pasos)](#7-workflow-de-la-skill-6-pasos)
8. [Cómo invocarla](#8-cómo-invocarla)
9. [Bootstrap en proyecto nuevo](#9-bootstrap-en-proyecto-nuevo)
10. [Relación con otras herramientas](#10-relación-con-otras-herramientas)
11. [Refinar con skill-creator](#11-refinar-con-skill-creator)
12. [Test cases (evals)](#12-test-cases-evals)
13. [Anti-patrones al promptear](#13-anti-patrones-al-promptear)
14. [Follow-ups de regresión](#14-follow-ups-de-regresión)
15. [Cadena documental del ecosistema](#15-cadena-documental-del-ecosistema)

---

## 1. Problema que resuelve

Al pedirle al agente un cambio visual con una captura adjunta, suele pasar una de estas cosas:

- Prompt vago → el agente improvisa tokens, layout o archivos incorrectos
- Demasiado contexto mezclado → pegas snippets técnicos que confunden al agente
- Sin memoria → cada sesión hay que re-explicar z-index, scroll, marcos…
- Sin documentación → el caso no queda registrado para la siguiente sesión

**Solución:** Estandarizar cada caso en **4 partes** (como `doc/ejemplos.md`) y tener una **skill global** que el agente consulte para generar esas 4 partes de forma consistente en cualquier repo de diseño.

---

## 2. Qué va en la skill vs qué queda por proyecto

| Capa | Ubicación | Contenido |
|------|-----------|-----------|
| **Skill global** | `~/.cursor/skills/design-prompt-spec/` y `~/.agents/skills/design-prompt-spec/` | *Cómo* elaborar prompts: workflow, plantilla, frases clave genéricas, ejemplo canónico |
| **Por proyecto** | `doc/ejemplos.md`, `design-system/MASTER.md`, `doc/README.md` | *Qué* promptear: casos reales, tokens, archivos concretos, estado implementado (§Nc) |
| **Memoria de sesión** | `context-mode/` (opcional) | Decisiones y pendientes de un feature complejo (ej. UGC §7c) |

La skill **no reemplaza** `doc/ejemplos.md`. Enseña el método; cada repo acumula sus ejemplos.

---

## 3. Dónde está instalada

Skill personal — disponible en **todos** los proyectos de Cursor del usuario:

```
C:\Users\odmor\.cursor\skills\design-prompt-spec\
C:\Users\odmor\.agents\skills\design-prompt-spec\   ← copia espejo (descubrimiento Cursor)
```

**Nombre:** `design-prompt-spec`  
**Fecha de creación:** 2026-05-29  
**Basada en:** Metodología probada en `portafolioMady/doc/ejemplos.md` (especialmente §8 fotografías personales).

Tras instalar o modificar skills personales, reiniciar Cursor o abrir chat nuevo.

---

## 4. Estructura de archivos

```
design-prompt-spec/
├── SKILL.md                              ← instrucciones principales (<500 líneas)
├── references/
│   ├── template-four-parts.md            ← plantilla §N para doc/ejemplos.md
│   ├── trigger-phrases.md                ← frases que activan comportamiento correcto
│   └── example-personal-photos.md        ← ejemplo canónico (§8 Madeleine)
└── evals/
    └── evals.json                        ← 3 test cases para skill-creator
```

### Descripción del frontmatter (triggering)

```yaml
name: design-prompt-spec
description: >
  Elabora prompts detallados para implementar UI en Cursor o Claude a partir de
  referencias visuales, mockups, capturas o HTML legacy. Produce cuatro partes:
  prompt completo (listo para pegar), versión corta, detalles técnicos y frases
  clave. Usar cuando el usuario pida ayuda para promptear, armar el prompt,
  documentar un caso en doc/ejemplos.md, convertir una captura en spec para el
  agente, preparar paridad visual con design system, o diga "prompt completo",
  "versión corta", "frases clave", "doc/ejemplos", "qué copio en Cursor".
```

---

## 5. Las cuatro partes (metodología)

Cada caso visual se documenta con **cuatro bloques**:

| # | Parte | Para quién | Contenido |
|---|-------|------------|-----------|
| 1 | **Prompt completo** | Usuario → pega en Cursor | Objetivo, archivos, comportamiento, restricciones, entregable. Copy-paste ready. |
| 2 | **Versión corta** | Misma sesión, contexto ya cargado | 3–6 líneas con lo esencial |
| 3 | **Detalles técnicos** | Usuario + agente (auditoría) | Problema habitual, solución, tablas HTML→token, snippets CSS/JS, errores a evitar |
| 4 | **Frases clave** | Refinar prompts | Tabla concepto → frase que activa el comportamiento correcto |

**Opcional tras implementar:** §Nc *Estado implementado* — memoria de qué quedó en código (ver §8c en [ejemplos.md](./ejemplos.md)).

Plantilla vacía → `references/template-four-parts.md` en la skill.

---

## 6. Qué copiar en Cursor

Regla de oro acordada en la sesión:

| Bloque | ¿Pegar en el chat del agente? |
|--------|------------------------------|
| **Prompt completo** | **Sí** — es el prompt |
| **Versión corta** | Solo si ya hay contexto en la misma sesión |
| **Detalles técnicos / wheel / snippets** | **No** — referencia para auditar o corregir regresiones |
| **Frases clave** | No hace falta pegarlas; el prompt completo ya las incorpora |

**Checklist al pegar:**

1. Adjuntar la **captura de referencia**
2. Pegar el **Prompt completo**
3. (Opcional) Añadir al inicio: `Referencia visual adjunta — [qué replicar en una línea].`

**Follow-up** (solo si algo falla): pegar un prompt corto específico — ver [§14](#14-follow-ups-de-regresión).

---

## 7. Workflow de la skill (6 pasos)

La skill instruye al agente a seguir este orden:

### Paso 1 — Capturar intent

| Campo | Ejemplo |
|-------|---------|
| Objetivo visual | "Fila horizontal de fotos con marco tipo impresión" |
| Referencia | Captura, HTML legacy, Figma |
| Alcance | Un componente, sección, auditoría sin código |
| Comportamiento clave | Scroll oculto, overlap z-index, grid bento… |

### Paso 2 — Descubrir contexto del repo

```
design-system/MASTER.md     → reglas canónicas
design-system/DESIGN.md     → resumen visual (si existe)
app/globals.css (@theme)    → tokens CSS reales
doc/ejemplos.md             → casos previos (§N)
components/sections/*.tsx   → componente destino
lib/*.ts                    → datos tipados
CLAUDE.md                   → stack y prohibiciones
```

### Paso 3 — Checklist de detalles

Marcar en el prompt los que apliquen:

- Referencia visual adjunta
- Archivos exactos a editar
- Secciones MASTER a leer
- Layout (grid, flex, z-index, aspect-ratio)
- Interacción (scroll, wheel, drag, hover)
- Breakpoints: 375, 768, 1024, 1280, 1440
- Datos (`lib/`, `content.ts`)
- Restricciones del proyecto
- Skills opcionales (impeccable, ui-ux-pro-max **sin** `--persist`)
- Entregable explícito

### Paso 4 — Escribir las cuatro partes

Usar plantilla de `references/template-four-parts.md`. Incluir siempre la tabla **Qué copiar en Cursor**.

### Paso 5 — Entregar al usuario

Orden de respuesta:

1. Resumen en 2–3 frases
2. Tabla "Qué copiar en Cursor"
3. **Prompt completo** (destacado)
4. Versión corta
5. Detalles técnicos
6. Frases clave + archivos implicados
7. Variantes opcionales (ajuste fino, regresión, follow-up)

### Paso 6 — Documentar en el repo (si se pide)

- Nuevo §N en `doc/ejemplos.md`
- Enlace en `doc/README.md`
- §Nc tras implementar

---

## 8. Cómo invocarla

### En Madeleine (este repo)

```
Usa design-prompt-spec.

Adjunto captura — quiero [objetivo visual].
Armame el prompt para Cursor y documéntalo en doc/ejemplos.md §N.
```

### Solo el prompt (sin documentar en doc/)

```
Usa design-prompt-spec — armame el prompt completo para [caso]. Adjunto referencia.
```

### Proyecto nuevo sin doc/

```
Usa design-prompt-spec — bootstrap doc/ y primer §1 para [caso].
```

### Retomar caso ya documentado

```
Usa design-prompt-spec. Lee doc/ejemplos.md §8c y armame prompt de auditoría.
```

---

## 9. Bootstrap en proyecto nuevo

Estructura mínima recomendada al arrancar un portafolio o landing de cliente:

```
proyecto/
├── design-system/
│   └── MASTER.md           ← reglas canónicas (crear o importar)
├── doc/
│   ├── README.md           ← flujo de prompts + índice
│   ├── prompts.md          ← plantillas por sección del MASTER
│   ├── ejemplos.md         ← casos reales (crece: §1, §2…)
│   └── skill-design-prompt-spec.md  ← opcional: copia o enlace a esta doc
├── CLAUDE.md               ← stack, prohibiciones
└── .cursor/skills/         ← solo skills específicas del repo (opcional)
```

**Primer caso** → §1 en `doc/ejemplos.md` con las 4 partes. La skill global vive fuera del repo.

---

## 10. Relación con otras herramientas

| Herramienta | Rol | Cuándo combinar con design-prompt-spec |
|-------------|-----|--------------------------------------|
| **design-prompt-spec** | Elaborar el prompt/spec | Siempre que haya captura + intención visual |
| **doc/ejemplos.md** | Casos reales del proyecto | Destino de la documentación §N |
| **MASTER.md** | Fuente de verdad visual | Referenciar en el Prompt completo |
| **ui-ux-pro-max** | Patrones UX/layout | Mencionar en prompt: `NO --persist` |
| **Impeccable** | Pulir UI respetando marca | Fase 2 tras paridad HTML: `layout → polish` |
| **skill-creator** | Crear/refinar skills | Mejorar `design-prompt-spec` con evals |

Ver también: [flujo-skills.md](./flujo-skills.md).

---

## 11. Refinar con skill-creator

Ubicación en este repo: `.claude/skills/skill-creator/SKILL.md`

Flujo recomendado (opcional, cuando la skill esté estable):

```
1. "Quiero refinar design-prompt-spec con skill-creator"
2. Usar evals/evals.json de la skill como test cases
3. Comparar output con casos reales de doc/ejemplos.md
4. Iterar description del frontmatter (triggering)
5. Empaquetar: python -m scripts.package_skill ... → .skill instalable
```

**Evals formales** son útiles después del bootstrap inicial — no bloquean el uso diario.

---

## 12. Test cases (evals)

Archivo: `evals/evals.json` en la skill.

| ID | Prompt de prueba | Output esperado |
|----|------------------|-----------------|
| 1 | Hero con foto sobre H1 + MASTER.md | 4 partes + tabla qué copiar + z-index |
| 2 | Tira horizontal fotos + scroll oculto + wheel | Prompt completo pegable; detalles separados |
| 3 | Documentar §9 grid bento auditoría | Borrador doc/ejemplos.md §9 completo |

---

## 13. Anti-patrones al promptear

Evitar al elaborar specs (la skill los recuerda al agente):

- Prompt vago sin archivos ni entregable
- Mezclar "qué hacer" con "cómo está roto hoy" en el bloque pegable
- Copiar estética de referencia (fondo gris, fuentes) ignorando design system
- Olvidar `prefers-reduced-motion` en scroll/animación
- Lorem ipsum o copy inventado sin datos reales
- `--persist` en ui-ux-pro-max (regenera MASTER)
- Pegar snippets wheel/z-index al chat cuando el prompt completo ya los incluye

---

## 14. Follow-ups de regresión

Prompts cortos para pegar **solo cuando algo falla** tras implementar:

**Scroll / wheel no funciona:**

```
El scroll con rueda no funciona en .prod-personal__track.
Implementa wheel listener con { passive: false }, scrollLeft += deltaY
solo si scrollWidth > clientWidth. Ver doc/ejemplos.md §8.
```

**Regresión de layout:**

```
Audita [componente]: debe ser [estructura esperada], no [estructura rota].
Ver doc/ejemplos.md §N. Fixes mínimos, no reestructurar.
```

**Solo ajuste de tamaño (comportamiento OK):**

```
En globals.css ajusta clamp de .prod-personal__frame.
No cambies wheel ni estructura del track. MASTER §IV. Valida 375 y 1280px.
```

---

## 15. Cadena documental del ecosistema

```
                    ┌─────────────────────────────┐
                    │  design-prompt-spec (skill) │
                    │  CÓMO elaborar prompts      │
                    └──────────────┬──────────────┘
                                   │ genera
                                   ▼
┌──────────────┐    ┌──────────────────────────────┐    ┌─────────────────┐
│ doc/README   │───▶│ doc/ejemplos.md §N           │───▶│ Agente Cursor   │
│ flujo general│    │ QUÉ promptear (casos reales) │    │ implementa UI   │
└──────────────┘    └──────────────┬───────────────┘    └─────────────────┘
                                   │ tras codear
                                   ▼
                    ┌──────────────────────────────┐
                    │ doc/ejemplos.md §Nc          │
                    │ estado implementado          │
                    └──────────────────────────────┘
                                   │
                    ┌──────────────┴───────────────┐
                    │ context-mode/ (opcional)     │
                    │ features complejos (UGC §7c)   │
                    └──────────────────────────────┘
```

**Este archivo** (`skill-design-prompt-spec.md`) documenta la skill y la metodología — no casos individuales.

**Casos del portafolio Madeleine:** [ejemplos.md](./ejemplos.md).

---

## Caso origen que validó la metodología

El primer caso documentado con este flujo en Madeleine fue **§8 — Fotografías personales** (tira horizontal, marco canvas, scroll oculto, wheel + drag). Ver:

- Implementación: `ProduccionesSection.tsx`, `.prod-personal__track` en `globals.css`
- Prompt y 4 partes: [ejemplos.md §8](./ejemplos.md#8-fotografías-personales--tira-horizontal-con-marco)
- Estado en código: [ejemplos.md §8c](./ejemplos.md#8c-estado-implementado--memoria-de-sesión)
- Ejemplo canónico en la skill: `references/example-personal-photos.md`

---

*Última actualización: 2026-05-29 · Skill: design-prompt-spec · Proyecto origen: Madeleine Morales Portfolio*
