# Cortefino — assets en `/public/ugc/cortefino`

Metadata TypeScript: `lib/cortefino-images.ts`

## Estructura

```
public/ugc/cortefino/
├── carousel-1/     → cortefinoCarousels[0]  (4 slides)
│   ├── portada.png
│   ├── slide2.png
│   ├── slide3.png
│   └── slide4.png
├── carousel-2/     → cortefinoCarousels[1]  (6 slides)
│   ├── portada.png
│   └── slide2–6.png
├── carousel-3/     → cortefinoCarousels[2]  (4 slides)
│   ├── portada.png
│   └── slide2–4.png
└── estaticos/      → cortefinoStatics
    ├── estatico-1.png
    └── estatico-2.png
```

Origen de masters: `ugc_mady/corte fino/carousel-*` y `estaticos/` (copiados/renombrados al deploy).

## Campos editables en `lib/cortefino-images.ts`

| Campo | Uso |
|-------|-----|
| `title` | Título en celda del grid |
| `description` | Copy largo (modal / detalle futuro) |
| `coverAlt` / `alt` | Accesibilidad |
| `caption` / `description` (slide) | Texto por slide |
| `tags` | Filtros o labels futuros |

## Helpers

```typescript
import {
  cortefinoCarousels,
  cortefinoStatics,
  getCortefinoCarouselCoverSrc,
  toKeyVisualCarouselProps,
} from '@/lib/cortefino-images'
```
