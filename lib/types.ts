// ─────────────────────────────────────────────────────────────────────────────
// lib/types.ts — Tipos del dominio
// ADR-006: imágenes via URL directa (no Cloudinary publicId)
// ADR-007: Cloudinary solo para video
// ─────────────────────────────────────────────────────────────────────────────

/** Recorte del preview en card (segundos) */
export interface UgcVideoPreview {
  start:    number
  duration: number
}

/** Video de producción/post en Cloudinary — sin mockup TikTok */
export interface ProductionVideoData {
  id:       string
  slug:     string
  title:    string
  client?:  string
  /** Omitir hasta subir a Cloudinary; usar `python conversor_videos.py sync` */
  publicId?: string
  version?:  number
  /** URL de entrega completa — abrir en nueva pestaña */
  cloudinaryUrl?: string
  videoAlt: string
  /** Recorte opcional para preview en card (mismo formato que UGC) */
  preview?: UgcVideoPreview
}

/** Reel UGC en Cloudinary — ADR-007 */
export interface UgcVideoData {
  id:        string
  slug:      string
  title:     string
  client?:   string
  tiktokUrl: string
  publicId:  string
  version?:  number
  /** URL de entrega completa en Cloudinary — ver video sin recorte */
  cloudinaryUrl?: string
  preview:   UgcVideoPreview
  videoAlt:  string
  /** Contadores decorativos del mockup For You */
  likeCount?:    string | number
  commentCount?: string | number
  postedAgo?:    string
}

export interface ServiceData {
  id:           string
  title:        string
  description:  string
  deliverables: string[]
}

export interface StatData {
  value:   string
  suffix?: string
  label:   string
}

// ── Content types ─────────────────────────────────────────────────────────────

export interface HeroCta {
  label: string
  href:  string
}

export interface HeroCopy {
  tag:              string
  nameMain:         string
  nameAccent:       string
  descriptionLine1: string
  descriptionLine2: string
  cta: {
    primary: HeroCta
    ghost:   HeroCta
  }
  stats:       readonly StatData[]
  scrollLabel: string
}

export interface AboutCopy {
  sectionIndex:      string
  sectionLabel:      string
  headingMain:       string
  headingAccent:     string
  subtitle:          string
  bio:               readonly string[]
  availabilityBadge: string
  socialLinks:       readonly AboutSocialLink[]
  photo: {
    src: string
    alt: string
  }
  softwareTags: readonly string[]
  areaTags:     readonly string[]
  labels: {
    social:   string
    software: string
    areas:    string
  }
}

export interface AboutSocialLink {
  id:    'instagram' | 'linkedin' | 'whatsapp'
  label: string
  href:  string
}

export interface ServiceItem {
  id:    string
  num:   string
  icon:  string
  title: string
  desc:  string
  pills: readonly string[]
}

export interface ServicesCopy {
  headingMain:   string
  headingAccent: string
  lead:          string
}

export interface ContactItem {
  id:    string
  label: string
  value: string
  href?: string
  link:  boolean
}

export interface ContactFooter {
  copy:    string
  tagline: string
  madeIn:  string
}

export interface ContactCopy {
  sectionIndex:  string
  sectionLabel:  string
  headingGlitch: string
  headingAccent: string
  intro:         string
  cta:           string
  messageTemplate: string
  email:         string
  items:         readonly ContactItem[]
  footer:        ContactFooter
  labels: {
    email:    string
    social:   string
    madeWith: string
  }
}

export interface SkillChipData {
  icon: string
  name: string
  sub:  string
}

export interface SkillsSectionCopy {
  sectionIndex:  string
  sectionLabel:  string
  headingPrefix: string
  headingAccent: string
  headingLine2:  string
  ariaLabel:     string
  tracks: {
    software:    string
    disciplines: string
  }
}

export interface UgcSectionCopy {
  sectionIndex: string
  sectionLabel: string
  headingMain:  string
  headingAccent:string
  intro:        string
  ariaLabel:    string
  indexAriaLabel: string
  scrollHint:   string
  liveMsg: {
    prefix: string
    of:     string
  }
  nav: {
    prev:              string
    next:              string
    openTikTokSuffix:  string
    centerReelPrefix:  string
    prevFallback:      string
    nextFallback:      string
  }
}

export interface ProduccionesPhotoItem {
  src: string
  alt: string
}

export interface ProduccionesSectionCopy {
  sectionIndex:           string
  sectionLabel:           string
  headingMain:            string
  headingAccent:          string
  intro:                  string
  ariaLabel:              string
  videosAriaLabel:        string
  personalPhotosLabel:    string
  personalPhotosAriaLabel:string
  /** IDs de videos excluidos del strip (lógica de layout) */
  excludedVideoIds:       readonly string[]
}

export interface TonimixKeyVisualItem {
  src:       string
  alt:       string
  client:    string
  title:     string
  category:  string
  imgWidth:  number
  imgHeight: number
}

export interface TonimixMerchItem {
  src:   string
  alt:   string
  title: string
}

export interface TonimixSectionCopy {
  sectionIndex:  string
  sectionLabel:  string
  headingMain:   string
  headingAccent: string
  intro:         string
  ariaLabel:     string
  merchLabel:    string
  merchAriaLabel:string
}

export interface LinkedInAchievementCopy {
  ariaLabel:      string
  badge:          string
  badgeAriaLabel: string
  titleLine1:     string
  titleLine2:     string
  description:    string
  tags:           string
  cta:            string
  ctaAriaLabel:   string
  url:            string
}

// ── Cortefino UGC — imágenes en /public/ugc/cortefino (ADR-006) ───────────────

/** Slide individual de un carrusel Instagram/LinkedIn */
export interface CortefinoSlideData {
  id:          string
  /** Nombre de archivo en public/ugc/cortefino/{folder}/ */
  file:        string
  order:       number
  alt:         string
  caption:     string
  description: string
}

/** Carrusel estático — portada + slides */
export interface CortefinoCarouselData {
  id:          string
  slug:        string
  folder:      'carousel-1' | 'carousel-2' | 'carousel-3'
  title:       string
  description: string
  igUrl:       string
  client:      'Cortefino'
  category:    'Carousel'
  coverAlt:    string
  slides:      CortefinoSlideData[]
  /** Span en bento de CorteFinoSection */
  gridSpan:    'large' | 'medium' | 'small'
  tags:        string[]
}

/** Pieza estática suelta (feed, stories, etc.) */
export interface CortefinoStaticData {
  id:          string
  slug:        string
  folder:      'estaticos'
  file:        string
  title:       string
  alt:         string
  description: string
  client:      'Cortefino'
  category:    string
  tags:        string[]
}

export interface CortefinoSectionCopy {
  sectionIndex:  string
  sectionLabel:  string
  headingMain:   string
  headingAccent: string
  intro:         string
  ariaLabel:     string
  igStrip: {
    label:              string
    handle:             string
    profileAriaLabel:   string
    animationsAriaLabel:string
    scrollHint:         string
  }
}

/** Slide resuelto con URL pública — props de CarouselSlider */
export interface CortefinoCarouselSlideView {
  src: string
  alt: string
}

/** Props listas para CarouselSlider (carruseles interactivos §05) */
export interface CortefinoCarouselSliderData {
  title:    string
  client:   string
  category: string
  slides:   CortefinoCarouselSlideView[]
}
