// ─────────────────────────────────────────────────────────────────────────────
// lib/content.ts — Fuente única de verdad para todo el texto del sitio
// Editar aquí para cambiar cualquier copy sin tocar componentes.
// ─────────────────────────────────────────────────────────────────────────────

import { assetPath } from '@/lib/asset-path'
import type {
  HeroCopy,
  AboutCopy,
  ServiceItem,
  ServicesCopy,
  ContactCopy,
  SkillsSectionCopy,
  UgcSectionCopy,
  ProduccionesSectionCopy,
  TonimixSectionCopy,
  LinkedInAchievementCopy,
  CortefinoSectionCopy,
} from '@/lib/types'

// ── Hero ─────────────────────────────────────────────────────────────────────

export const HERO_COPY: HeroCopy = {
  tag:              'Diseñadora Gráfica & Creadora UGC',
  namePrefix:       'Made',
  nameOutline:      'lein',
  nameSerif:        'e',
  nameSuffix:       'Morales',
  descriptionLine1: 'Multimedia · Diseño · Producción Audiovisual · Contenido UGC.',
  descriptionLine2: 'Creatividad con propósito, diseño con alma.',
  cta: {
    primary: { label: 'Ver trabajo →', href: '#ugc' },
    ghost:   { label: 'Trabajemos juntos', href: '#contact' },
  },
  stats: [
    //{ value: '5', suffix: '+', label: 'Marcas' },
    { value: '2',  suffix: '+', label: 'Años exp.' },
  ],
  scrollLabel: 'Scroll',
}

// ── Slider / Marquee ──────────────────────────────────────────────────────────

export const SLIDER_ITEMS = [
  'Diseño Editorial',
  'Contenido UGC',
  'Identidad Visual',
  'Animación',
  'Fotografía',
  'Dirección de Arte',
  'Social Media',
  'Producción Audiovisual',
] as const

// ── About ─────────────────────────────────────────────────────────────────────

export const ABOUT_COPY: AboutCopy = {
  sectionIndex:     '01',
  sectionLabel:     'Sobre mí',
  headingMain:      'Creativa de',
  headingAccent:    'corazón.',
  subtitle:         'Multimedia & Producción Audiovisual · Guayaquil, EC',
  bio: [
    'Soy estudiante de Multimedia y Producción Audiovisual con experiencia real en diseño gráfico, contenido UGC y producción de campañas. Me apasiona crear cosas que conecten: visualmente, emocionalmente, estratégicamente.',
    'Mis proyectos incluyen animaciones, edición audiovisual, fotografía y campañas completas. En el mundo laboral, creo contenido que convierte y diseños que comunican.',
  ],
  availabilityBadge: '+ Disponible',
  socialLinks: [
    {
      id:    'instagram',
      label: 'Instagram',
      href:  'https://www.instagram.com/p/DUEg57Sj8IY',
    },
    {
      id:    'linkedin',
      label: 'LinkedIn',
      href:  'https://www.linkedin.com/in/madeleine-morales-diaz-773333117/',
    },
    {
      id:    'whatsapp',
      label: 'WhatsApp',
      href:  'https://web.whatsapp.com/send?phone=593992708407&text=Hola%20Madeleine%2C%20vi%20tu%20portafolio%20y%20quiero%20trabajar%20contigo.',
    },
  ],
  photo: {
    src: assetPath('/images/about-me.webp'),
    alt: 'Madeleine Morales, diseñadora gráfica, Guayaquil',
  },
  softwareTags: [
    'Photoshop', 'Illustrator', 'After Effects',
    'Premiere Pro', 'InDesign', 'Figma', 'Lightroom',
  ],
  areaTags: [
    'Diseño Gráfico', 'Contenido UGC', 'Fotografía',
    'Animación 2D', 'Edición de video', 'Branding', 'Social Media',
  ],
  labels: {
    social:   'Redes',
    software: 'Software',
    areas:    'Áreas',
  },
}

// ── Services ──────────────────────────────────────────────────────────────────

export const SERVICES_COPY: ServicesCopy = {
  headingMain:   'Lo que',
  headingAccent: 'hago.',
  lead:          'Servicios diseñados para marcas que quieren comunicar diferente y conectar con su audiencia.',
}

export const SERVICES: ServiceItem[] = [
  {
    id:    's01',
    num:   '01',
    icon:  '🎨',
    title: 'Diseño Gráfico & Branding',
    desc:  'Identidades visuales, sistemas de diseño, piezas editoriales y todo lo que hace que una marca se vea profesional y memorable.',
    pills: ['Identidad', 'Tipografía', 'Editorial'],
  },
  {
    id:    's02',
    num:   '02',
    icon:  '📱',
    title: 'Contenido UGC & Video',
    desc:  'Videos auténticos para TikTok, Reels y Shorts. Reviews, demos, tutoriales, unboxings — contenido que genera confianza y ventas.',
    pills: ['TikTok', 'Reels', 'Shorts'],
  },
  {
    id:    's03',
    num:   '03',
    icon:  '✨',
    title: 'Animación & Motion',
    desc:  'Animaciones 2D, motion graphics y efectos visuales para contenido que detiene el scroll y comunica con movimiento.',
    pills: ['2D Anim.', 'Motion', 'After FX'],
  },
  {
    id:    's04',
    num:   '04',
    icon:  '📸',
    title: 'Fotografía de Producto',
    desc:  'Fotografía lifestyle y de producto para catálogos, redes sociales y campañas de marketing digital.',
    pills: ['Lifestyle', 'Producto', 'UGC Photo'],
  },
  {
    id:    's05',
    num:   '05',
    icon:  '🎬',
    title: 'Producción Audiovisual',
    desc:  'Producción completa: guión, grabación, edición y postproducción para piezas audiovisuales con impacto real.',
    pills: ['Edición', 'Post', 'Guión'],
  },
  {
    id:    's06',
    num:   '06',
    icon:  '📊',
    title: 'Social Media & Estrategia',
    desc:  'Gestión de redes, diseño de feed, estrategia de contenido y creación de piezas para mantener marcas activas y relevantes.',
    pills: ['Feed', 'Stories', 'Estrategia'],
  },
]

// ── Contact ───────────────────────────────────────────────────────────────────

const CONTACT_EMAIL = 'mademd24@gmail.com'

// ── Skills ────────────────────────────────────────────────────────────────────

export const SKILLS_COPY: SkillsSectionCopy = {
  sectionIndex:  '08',
  sectionLabel:  'Herramientas',
  headingPrefix: 'Mi ',
  headingAccent: 'arsenal',
  headingLine2:  'creativo.',
  ariaLabel:     'Herramientas y disciplinas creativas',
  tracks: {
    software:    'Software de diseño',
    disciplines: 'Disciplinas creativas',
  },
}

// ── UGC Carousel ──────────────────────────────────────────────────────────────

export const UGC_COPY: UgcSectionCopy = {
  sectionIndex:   '04',
  sectionLabel:   'Reels UGC',
  headingMain:    'Contenido',
  headingAccent:  'en movimiento.',
  intro:          'Previews auténticos para TikTok. Desliza o usa las flechas; toca el teléfono para abrir en la app.',
  ariaLabel:      'Reels UGC',
  indexAriaLabel: 'Índice de reels',
  scrollHint:     'Desliza hasta esta sección para activar previews',
  liveMsg: {
    prefix: 'Reel',
    of:     'de',
  },
  nav: {
    prev:             'Reel anterior',
    next:             'Reel siguiente',
    openTikTokSuffix: '. Abrir en TikTok',
    centerReelPrefix: 'Centrar reel: ',
    prevFallback:     'Reel anterior',
    nextFallback:     'Reel siguiente',
  },
}

// ── Cortefino ─────────────────────────────────────────────────────────────────

export const CORTEFINO_COPY: CortefinoSectionCopy = {
  sectionIndex:  '05',
  sectionLabel:  'Cortefino',
  headingMain:   'Diseño /',
  headingAccent: 'en detalle.',
  intro:         'Carruseles interactivos, piezas estáticas y animaciones de marca producidas para Cortefino.',
  ariaLabel:     'Cliente: Cortefino — diseño gráfico',
  igStrip: {
    label:               'Contenido IG',
    handle:              '@cortefino.ec',
    profileAriaLabel:    'Ver perfil de Cortefino en Instagram',
    animationsAriaLabel: 'Animaciones de marca para Instagram — Cortefino',
  },
}

// ── Tonimix ───────────────────────────────────────────────────────────────────

export const TONIMIX_COPY: TonimixSectionCopy = {
  sectionIndex:  '06',
  sectionLabel:  'Tonimix',
  headingMain:   'Identidad',
  headingAccent: 'de marca.',
  intro:         'Dirección de arte, key visuals, MUPI y merchandising para Tonimix. Campaña retrodigital reconocida en la escena creativa ecuatoriana.',
  ariaLabel:     'Cliente: Tonimix — identidad de marca',
  merchLabel:    'Merchandising',
  merchAriaLabel:'Línea de merchandising Tonimix',
}

export const LINKEDIN_ACHIEVEMENT_COPY: LinkedInAchievementCopy = {
  ariaLabel:      'Logro destacado: reconocimiento RetroDigital Ecuador',
  badge:          'Logro destacado',
  badgeAriaLabel: 'Logro destacado',
  titleLine1:     'RetoDigital',
  titleLine2:     'Ecuador',
  description:    'Dirección de arte y diseño de campaña para Tonimix reconocidos en la escena creativa nacional.',
  tags:           '#retodigital #ecuador #design #effie #tonicorp',
  cta:            'Ver publicación',
  ctaAriaLabel:   'Ver publicación de logro RetroDigital en LinkedIn (abre en nueva pestaña)',
  url:            'https://www.linkedin.com/posts/madeleine-morales-diaz-773333117_retrodigital-ecuador-design-activity-7424223803481690112-eE4-',
}

// ── Producciones ──────────────────────────────────────────────────────────────

export const PRODUCCIONES_COPY: ProduccionesSectionCopy = {
  sectionIndex:            '07',
  sectionLabel:            'Producciones',
  headingMain:             'Narrativas',
  headingAccent:           'audiovisuales.',
  intro:                   'Producciones universitarias y cortometrajes. Desde escenografía experimental hasta documentales sobre la identidad cultural de Guayaquil.',
  ariaLabel:               'Producciones audiovisuales y fotografías',
  videosAriaLabel:         'Videos de producción',
  personalPhotosLabel:     '/ Fotografías personales',
  personalPhotosAriaLabel: 'Fotografías personales de producción',
  excludedVideoIds:        ['prod-pony-nebula'],
}

// ── Marquee ─────────────────────────────────────────────────────────────────────

export const SLIDER_ARIA_LABEL = 'Disciplinas de diseño'

// ── Contact ───────────────────────────────────────────────────────────────────

export const CONTACT_COPY: ContactCopy = {
  sectionIndex:  '09',
  sectionLabel:  'Contacto',
  headingGlitch: 'Hablemos',
  headingAccent: 'juntos.',
  intro:         '¿Tienes un proyecto en mente? Me encantaría escucharte. Cuéntame qué necesitas y lo hacemos realidad – con diseño, con intención, con creatividad.',
  cta:           'Escríbeme ahora →',
  messageTemplate:
    'Hola Madeleine,\n\nQuiero trabajar contigo en:\n\nObjetivo del proyecto:\n\nTiempo estimado:\n\nMi correo o WhatsApp para respuesta:\n\nGracias.',
  email:         CONTACT_EMAIL,
  items: [
    {
      id:    'email',
      label: 'Email',
      value: CONTACT_EMAIL,
      href:  `mailto:${CONTACT_EMAIL}`,
      link:  true,
    },
  ],
  footer: {
    copy:     '© 2026 Madeleine Morales Diaz',
    tagline:  'Diseño · UGC · Audiovisual',
    madeIn:   'en Guayaquil',
  },
  labels: {
    email:    'Email',
    social:   'Redes',
    madeWith: 'Hecho con',
  },
}
