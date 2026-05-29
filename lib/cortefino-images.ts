// ─────────────────────────────────────────────────────────────────────────────
// lib/cortefino-images.ts — Metadata de carruseles y estáticos Cortefino
// Assets: public/ugc/cortefino/ (ADR-006 — URL directa, sin Cloudinary)
// ─────────────────────────────────────────────────────────────────────────────

import type {
  CortefinoCarouselData,
  CortefinoCarouselSliderData,
  CortefinoSectionCopy,
  CortefinoSlideData,
  CortefinoStaticData,
} from '@/lib/types'

/** Raíz pública de assets Cortefino */
export const CORTEFINO_IMAGE_BASE = '/ugc/cortefino'

export function cortefinoImagePath(
  folder: CortefinoCarouselData['folder'] | CortefinoStaticData['folder'],
  file: string,
): string {
  return `${CORTEFINO_IMAGE_BASE}/${folder}/${file}`
}

function slide(
  carouselSlug: string,
  file: string,
  order: number,
  alt = '',
): CortefinoSlideData {
  return {
    id:          `cf-${carouselSlug}-${file.replace(/\.[^.]+$/, '')}`,
    file,
    order,
    alt,
    caption:     '',
    description: '',
  }
}

// ── Copy de sección ───────────────────────────────────────────────────────────

export const cortefinoSectionCopy: CortefinoSectionCopy = {
  sectionLabel:  'Cortefino',
  headingMain:   'Diseño /',
  headingAccent: 'en detalle.',
  intro:         'Carruseles interactivos, piezas estáticas y animaciones de marca producidas para Cortefino.',
}

// ── Carruseles ────────────────────────────────────────────────────────────────

export const cortefinoCarousels: CortefinoCarouselData[] = [
  {
    id:          'cf-carousel-01',
    slug:        'carousel-serie-01',
    folder:      'carousel-1',
    title:       'Serie 01',
    description: 'La calidad no es un lujo. Es una decisión estratégica.',
    igUrl:       'https://www.instagram.com/p/DT0qYbGD2df',
    client:      'Cortefino',
    category:    'Carousel',
    coverAlt:    'Carousel Cortefino — portada serie 1',
    gridSpan:    'medium',
    tags:        ['#elmejorcorte'],
    slides: [
      slide('c1', 'portada.webp', 1, 'Cortefino serie 01 — portada'),
      slide('c1', 'slide2.webp',  2, 'Cortefino serie 01 — slide 2'),
      slide('c1', 'slide3.webp',  3, 'Cortefino serie 01 — slide 3'),
      slide('c1', 'slide4.webp',  4, 'Cortefino serie 01 — slide 4'),
    ],
  },
  {
    id:          'cf-carousel-02',
    slug:        'carousel-serie-02',
    folder:      'carousel-2',
    title:       'Serie 02',
    description: 'El matambre no es solo un corte más… es técnica, textura y punto exacto 🥩🔥',
    igUrl:       'https://www.instagram.com/p/DVUj9cQDGRu',
    client:      'Cortefino',
    category:    'Carousel',
    coverAlt:    'Carousel Cortefino — portada serie 2',
    gridSpan:    'medium',
    tags:        [],
    slides: [
      slide('c2', 'portada.webp', 1, 'Cortefino serie 02 — portada'),
      slide('c2', 'slide2.webp',  2, 'Cortefino serie 02 — slide 2'),
      slide('c2', 'slide3.webp',  3, 'Cortefino serie 02 — slide 3'),
      slide('c2', 'slide4.webp',  4, 'Cortefino serie 02 — slide 4'),
      slide('c2', 'slide5.webp',  5, 'Cortefino serie 02 — slide 5'),
      slide('c2', 'slide6.webp',  6, 'Cortefino serie 02 — slide 6'),
    ],
  },
  {
    id:          'cf-carousel-03',
    slug:        'carousel-serie-03',
    folder:      'carousel-3',
    title:       'Serie 03',
    description: 'No es casualidad que el vino y la carne sean la combinación clásica 🍷🥩',
    igUrl:       'https://www.instagram.com/p/DVRzkGYD2zX',
    client:      'Cortefino',
    category:    'Carousel',
    coverAlt:    'Carousel Cortefino — portada serie 3',
    gridSpan:    'medium',
    tags:        [],
    slides: [
      slide('c3', 'portada.webp', 1, 'Cortefino serie 03 — portada'),
      slide('c3', 'slide2.webp',  2, 'Cortefino serie 03 — slide 2'),
      slide('c3', 'slide3.webp',  3, 'Cortefino serie 03 — slide 3'),
      slide('c3', 'slide4.webp',  4, 'Cortefino serie 03 — slide 4'),
    ],
  },
]

// ── Carruseles interactivos (CarouselSlider) ────────────────────────────────
// Props derivadas de cortefinoCarousels — editar metadata arriba, no duplicar URLs.

export function toCarouselSliderProps(
  carousel: CortefinoCarouselData,
): CortefinoCarouselSliderData {
  return {
    title:    carousel.title,
    client:   carousel.client,
    category: carousel.category,
    slides:   [...carousel.slides]
      .sort((a, b) => a.order - b.order)
      .map((s) => ({
        src: cortefinoImagePath(carousel.folder, s.file),
        alt: s.alt,
      })),
  }
}

/** Serie 01 — carousel-1 · 4 slides */
export const cortefinoCarousel1 = toCarouselSliderProps(cortefinoCarousels[0]!)

/** Serie 02 — carousel-2 · 6 slides */
export const cortefinoCarousel2 = toCarouselSliderProps(cortefinoCarousels[1]!)

/** Serie 03 — carousel-3 · 4 slides */
export const cortefinoCarousel3 = toCarouselSliderProps(cortefinoCarousels[2]!)

/** Las 3 series en orden de grid (5fr + 4fr + 3fr) */
export const cortefinoCarouselSliders: CortefinoCarouselSliderData[] = [
  cortefinoCarousel1,
  cortefinoCarousel2,
  cortefinoCarousel3,
]

// ── Estáticos ─────────────────────────────────────────────────────────────────

export const cortefinoStatics: CortefinoStaticData[] = [
  {
    id:          'cf-estatico-01',
    slug:        'estatico-01',
    folder:      'estaticos',
    file:        'estatico-1.webp',
    title:       'Publicación 01',
    alt:         'Pieza estática Cortefino — composición 1',
    description: '',
    client:      'Cortefino',
    category:    'Publicación',
    tags:        [],
  },
  {
    id:          'cf-estatico-02',
    slug:        'estatico-02',
    folder:      'estaticos',
    file:        'estatico-2.webp',
    title:       'Publicación 02',
    alt:         'Pieza estática Cortefino — composición 2',
    description: '',
    client:      'Cortefino',
    category:    'Publicación',
    tags:        [],
  },
]

// ── Helpers ───────────────────────────────────────────────────────────────────

export function getCortefinoCarouselCoverSrc(carousel: CortefinoCarouselData): string {
  const cover = carousel.slides.find((s) => s.order === 1)
  return cortefinoImagePath(carousel.folder, cover?.file ?? 'portada.webp')
}

export function getCortefinoSlideSrc(
  carousel: CortefinoCarouselData,
  slideData: CortefinoSlideData,
): string {
  return cortefinoImagePath(carousel.folder, slideData.file)
}

export function getCortefinoStaticSrc(piece: CortefinoStaticData): string {
  return cortefinoImagePath(piece.folder, piece.file)
}

export function getCortefinoCarouselBySlug(slug: string): CortefinoCarouselData | undefined {
  return cortefinoCarousels.find((c) => c.slug === slug)
}

export function getCortefinoCarouselById(id: string): CortefinoCarouselData | undefined {
  return cortefinoCarousels.find((c) => c.id === id)
}

export function getCortefinoStaticBySlug(slug: string): CortefinoStaticData | undefined {
  return cortefinoStatics.find((s) => s.slug === slug)
}

/** Slides ordenados (excluye portada si se pasa coverOnly=false) */
export function getCortefinoCarouselSlides(
  carousel: CortefinoCarouselData,
  options: { includeCover?: boolean } = {},
): CortefinoSlideData[] {
  const { includeCover = true } = options
  return carousel.slides
    .filter((s) => includeCover || s.order > 1)
    .sort((a, b) => a.order - b.order)
}

/** Props listas para UgcKeyVisualCell desde un carrusel */
export function toKeyVisualCarouselProps(carousel: CortefinoCarouselData) {
  return {
    src:        getCortefinoCarouselCoverSrc(carousel),
    alt:        carousel.coverAlt,
    client:     carousel.client,
    title:      carousel.title,
    category:   carousel.category,
    slideCount: carousel.slides.length,
  }
}

export function toKeyVisualStaticProps(piece: CortefinoStaticData) {
  return {
    src:      getCortefinoStaticSrc(piece),
    alt:      piece.alt,
    client:   piece.client,
    title:    piece.title,
    category: piece.category,
  }
}
