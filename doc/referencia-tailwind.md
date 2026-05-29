# Referencia rápida: MASTER → Tailwind v4

Los tokens se definen en `app/globals.css` dentro de `@theme`.  
Tailwind v4 expone cada `--color-*` como `bg-*`, `text-*`, `border-*`, etc.

> Fuente canónica: `design-system/MASTER.md` §VIII · Plantilla: `design-system/TOKENS.md`

---

## Colores de fondo

| Token CSS | Clase Tailwind (ejemplos) | Uso |
|-----------|---------------------------|-----|
| `--color-void` | `bg-void`, `text-void` | Fondo principal |
| `--color-abyss` | `bg-abyss` | Capas profundas |
| `--color-shadow` | `bg-shadow` | Cards, bloques |
| `--color-dusk` | `bg-dusk`, `border-dusk` | Bordes, separadores |
| `--color-blush` | `bg-blush`, `text-blush` | Tonos cálidos |
| `--color-petal` | `bg-petal`, `text-petal` | Texto claro sobre oscuro |
| `--color-canvas` | `bg-canvas`, `text-canvas` | Superficies casi blancas (no #fff) |

## Acentos

| Token | Clase | Uso |
|-------|-------|-----|
| `--color-lavender` | `text-lavender`, `bg-lavender` | Acento primario |
| `--color-magenta` | `text-magenta` | Impacto |
| `--color-lime` | `text-lime`, `bg-lime` | Disruptivo (marquee, highlights) |
| `--color-gold` | `text-gold` | Editorial |

## Moodboard

| Token | Clase |
|-------|-------|
| `--color-plum` | `bg-plum`, `text-plum` |
| `--color-violet` | `bg-violet` |
| `--color-rose` | `text-rose` |
| `--color-orchid` | `text-orchid` |
| `--color-iris` | `text-iris` |

**Prohibido:** `text-[#C084FC]`, `bg-[#190019]` → usar `text-lavender`, `bg-void`.

---

## Tipografía

| Rol MASTER | Variable layout | Clase Tailwind |
|------------|-----------------|----------------|
| Display | `--font-unbounded` | `font-display` |
| Serif acento | `--font-instrument-serif` | `font-serif` |
| Body / UI | `--font-space-mono` | `font-sans`, `font-mono` |

### Escala de tamaño (`--text-*`)

| Token | Clase típica | Uso |
|-------|--------------|-----|
| `--text-hero` | `text-hero` | H1 hero |
| `--text-display` | `text-display` | Títulos de sección |
| `--text-title-xl` … `--text-title-sm` | `text-title-xl`, etc. | Subtítulos |
| `--text-body-lg` … `--text-body-sm` | `text-body-md`, etc. | Párrafos |
| `--text-label` | `text-label` | Etiquetas `/ 01 — WORK` |
| `--text-micro`, `--text-nano` | `text-micro`, `text-nano` | Meta, footer |

**Peso / tracking:** seguir MASTER §III (p. ej. `font-black tracking-[-0.03em]` en display).

**Prohibido:** `font-['Poppins']`, `font-['Inter']`.

---

## Espaciado (`--spacing-*` → `p-*`, `m-*`, `gap-*`)

| Token | px | Clase Tailwind |
|-------|-----|----------------|
| `--spacing-4` | 16 | `p-4`, `gap-4`, `mt-4` |
| `--spacing-6` | 24 | `p-6`, `gap-6` |
| `--spacing-8` | 32 | `p-8` |
| `--spacing-12` | 48 | `py-12`, `px-12` |
| `--spacing-16` | 64 | `px-16` (container mobile) |
| `--spacing-24` | 96 | `py-24` |
| `--spacing-32` | 128 | `py-32` (secciones) |
| `--spacing-40` | 160 | `pt-40` (compensar nav) |
| `--spacing-48` | 192 | `py-48` |
| `--spacing-64` | 256 | `pb-64` (hero editorial) |

**Prohibido:** `py-[128px]`, `gap-[17px]` → usar escala del token más cercano.

---

## Movimiento

| Token | Uso en Tailwind / CSS |
|-------|------------------------|
| `--ease-out-expo` | `ease-out-expo` (si está en theme) o `transition` del globals |
| `--duration-fast` | `duration-fast` (~200ms) |
| `--duration-base` | `duration-base` (~300ms) |
| `--duration-reveal` | animaciones de entrada |

Respetar `prefers-reduced-motion` (MASTER §V).

---

## Grid de proyectos (§IV.2)

En componentes, expresar con utilidades Tailwind, no columnas uniformes:

```
Fila 1: col-span-7 + col-span-5   (≈ 8+4 en 12 cols)
Fila 2: col-span-6 + col-span-6
Fila 3: col-span-4 × 3
```

Mobile: todo `col-span-12`.

---

## Excepciones permitidas a `style={}`

Solo valores calculados en runtime:

```tsx
style={{ '--scroll-progress': `${progress}%` } as React.CSSProperties}
style={{ transform: `translateX(${offset}px)` }}
```

Todo lo demás → clases con tokens.
