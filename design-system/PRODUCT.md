# Product

> Contexto estratégico para agentes (Impeccable, Cursor, etc.).  
> Lo visual detallado vive en **`DESIGN.md`** y **`MASTER.md`** (esta carpeta).

---

## Register

brand

---

## Users

### Quién visita el sitio

| Segmento | Contexto | Qué busca |
|----------|----------|-----------|
| Reclutadores / HR creativo | Revisión rápida entre candidatos, a menudo en desktop | Calidad visual, variedad de disciplinas, señal de madurez |
| Directores creativos / CD | Evaluación de criterio y dirección de arte | Coherencia editorial, proyectos destacados, voz propia |
| Clientes potenciales (marcas, agencias) | Referido o búsqueda en redes | Servicios claros, contacto directo, prueba de estilo UGC/branding |

### Job to be done

> *[TODO: Completar en 1–2 frases con Madeleine]*  
> Ejemplo: "Decidir en menos de 3 minutos si quiero contactarla para un proyecto de branding o UGC."

### Contexto de uso

- **Dispositivo principal esperado:** [TODO: mobile / desktop / mixto]
- **Momento:** [TODO: ej. revisión nocturna en oficina, scroll en Instagram desde link en bio]
- **Idioma:** Español (Ecuador). ¿Versión EN? [TODO: sí / no / futuro]

---

## Product Purpose

### Qué es

Portafolio web estático de **Madeleine Morales**, diseñadora gráfica (UCG), con estética de **director de arte**: galería editorial, no catálogo de plantillas.

### Por qué existe

Mostrar trabajo seleccionado, servicios y personalidad creativa a reclutadores y clientes de alto nivel, con rendimiento y accesibilidad de producción.

### Éxito se ve como

| Métrica | Objetivo documentado |
|---------|----------------------|
| Lighthouse Performance | ≥ 90 |
| Accessibility | ≥ 95 |
| FCP | < 1.5s |
| Conversión | [TODO: definir — ej. clics a email, formulario, Instagram] |

### Alcance actual (v1)

- Home de una página: Hero, Marquee, About, Work, Services, Contact
- Sin CMS: contenido en `lib/projects.ts`
- Deploy: GitHub Pages (SSG `output: 'export'`)
- Videos de proceso: Cloudinary (opcional, ADR-007)

### Fuera de alcance (v1)

- [TODO: confirmar] Blog, casos de estudio multipágina, panel admin, formulario con backend
- [TODO: confirmar] Tienda, booking, multi-idioma

---

## Brand Personality

### En tres palabras

> *[TODO: Validar con Madeleine — borrador inferido del MASTER]*  
> **Sofisticada · Audaz · Editorial**

### Voz y tono

| Atributo | Expresión |
|----------|-----------|
| Sofisticada | Espacio blanco generoso, tipografía con carácter |
| Audaz | Acentos saturados (lavender, magenta, lime) sobre void |
| Editorial | Grids asimétricos, jerarquía extrema, grain, marquee |
| Sensorial | Textura, motion con personalidad (sin bounce) |
| Precisa | Alineación intencionada; cero “accidente” visual |

### Emociones que debe evocar

Confianza creativa, criterio de dirección de arte, energía contemporánea (UGC, motion, social), calidez humana (petal, blush en la paleta).

### Referencias que nos gustan

> *[TODO: 2–4 URLs con qué aspecto específico admiran]*

| Referencia | Qué tomar | Qué NO copiar |
|------------|-----------|---------------|
| [TODO: sitio o estudio] | [TODO] | [TODO] |
| Moodboard.pdf (proyecto) | Familia violeta-magenta, contraste cálido | — |
| `madeleine_portfolio_v3_violet.html` | Tipografía triple, hero outline, marquee lime | Layout legacy si ya no aplica |

---

## Anti-references

Lo que este producto **no** debe parecer:

### Visual (detalle en DESIGN.md §Do's and Don'ts)

- Template Framer / Webflow / portafolio “AI slop” genérico
- Degradado púrpura-azul cliché (`#7B2FBE` → `#4F46E5`)
- Cards `rounded-2xl` + `shadow-lg` anidadas
- Grid uniforme de 3 proyectos iguales
- Poppins, Inter, Montserrat, Raleway
- Negro `#000` o blanco `#FFF` puros
- Hero-metric SaaS (número gigante + label + stats genéricos)
- Glassmorphism decorativo por defecto
- Bordes laterales gruesos de color en cards (side-stripe)
- Texto con gradiente (`background-clip: text`)

### Estratégico / de marca

- Catálogo de servicios corporativo sin personalidad
- Copy genérico de agencia (“soluciones innovadoras”)
- Tono frío o solo “corporate minimal” sin voz UGC/multimedia

### Sitios o estilos a evitar explícitamente

> *[TODO: URLs o nombres que Madeleine rechaza]*

1. [TODO]
2. [TODO]

---

## Design Principles

Principios **estratégicos** (no reglas CSS; esas están en MASTER/DESIGN):

1. **El espacio es el diseño.** Preferir quitar elementos antes que reducir padding editorial.
2. **Galería, no catálogo.** Cada proyecto tiene peso visual distinto; el grid es asimétrico a propósito.
3. **Una voz tipográfica triple.** Display + serif accent + mono técnica; no añadir familias por moda.
4. **Show, don't tell.** El trabajo y la estética convencen antes que párrafos largos.
5. **Accesibilidad como calidad, no como checklist.** Focus visible, reduced motion, contraste OKLCH desde el inicio.
6. **Rendimiento es parte de la marca.** Sitio ligero (sin Framer Motion) = respeto al tiempo del reclutador.

---

## Accessibility & Inclusion

| Requisito | Estado |
|-----------|--------|
| WCAG objetivo | AA mínimo; aspirar AAA donde sea viable |
| `prefers-reduced-motion` | Implementado en `globals.css` |
| Skip link | `#main-content` en `layout.tsx` |
| Focus visible | En links, botones, cards (`focus-visible` / `focus-within`) |
| Alt en imágenes | Obligatorio en `ProjectData.imageAlt` |
| Custom cursor | Desactivado en touch y reduced motion |
| Contraste | Tokens OKLCH con reglas MASTER §III.6 |

### Necesidades conocidas de usuarios

> *[TODO: daltonismo, baja visión, solo teclado, etc. si aplica]*

### Copy inclusivo

> *[TODO: preferencias de lenguaje — género, español EC vs neutral]*

---

## Información de producto (boilerplate)

Rellena lo que falte. Borra secciones que no apliquen.

### Sobre la diseñadora

| Campo | Valor |
|-------|-------|
| Nombre | Madeleine Morales |
| Título / rol | Diseñadora Gráfica & Creadora UGC |
| Formación | [TODO: confirmar titulación exacta UCG / Multimedia] |
| Ubicación | Guayaquil, EC |
| Disponibilidad | [TODO: freelance / remoto / presencial / fechas] |
| Años de experiencia (público) | [TODO: validar "5+" del hero] |
| Marcas / proyectos (cifra pública) | [TODO: validar "30+" del hero] |

### Contacto oficial

| Canal | Valor actual en código | Confirmar |
|-------|------------------------|-----------|
| Email | `madeleine@diseño.ec` | [TODO] |
| Instagram | `@madeleinemorales` | [TODO] |
| LinkedIn | `in/madeleinemorales` | [TODO] |
| Otros | [TODO: Behance, TikTok, WhatsApp] | |

### Servicios prioritarios (orden comercial)

> *[TODO: ordenar por lo que más quiere vender hoy]*

1. [TODO]
2. [TODO]
3. [TODO]

### Proyectos estrella

> *[TODO: slugs o títulos de 3–6 piezas que siempre deben aparecer primero]*

- [TODO]
- [TODO]

### Palabras clave SEO / discovery

`diseñadora gráfica`, `portafolio`, `branding`, `editorial`, `packaging`, `UGC`, `Guayaquil`, `UCG`, [TODO: más]

### Competidores / comparables

> *[TODO: otras diseñadoras o estudios con los que la comparan — para diferenciarse, no copiar]*

---

## Decisiones ya tomadas (no re-debatir sin ADR)

| Tema | Decisión |
|------|----------|
| Hosting | GitHub Pages, SSG |
| Imágenes | URL directa, no Cloudinary para fotos |
| Video | Solo Cloudinary |
| Animación | CSS `@keyframes`, sin Framer Motion |
| Fuente de diseño | `design-system/MASTER.md` |
| Package manager | pnpm |

---

*Plantilla generada 2026-05-15. Completar secciones `[TODO]` con Madeleine Morales.*
