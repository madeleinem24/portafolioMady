// ─────────────────────────────────────────────────────────────────────────────
// lib/videos.ts — Videos Cloudinary (ADR-007)
// Fuente de verdad: videos/videos.manifest.json
// ─────────────────────────────────────────────────────────────────────────────

import {
  cloudinaryVideoDeliveryUrl,
  cloudinaryVideoPreviewFromDeliveryUrl,
  cloudinaryVideoPreviewUrl,
  cloudinaryVideoThumbnailUrl,
} from '@/lib/cloudinary'
import type { ProductionVideoData, UgcVideoData, UgcVideoPreview } from '@/lib/types'

/** Animación de marca — misma forma que UGC para preview + enlace completo */
export interface AnimationVideoData {
  id:             string
  slug:           string
  title:          string
  client?:        string
  igUrl?:         string
  publicId?:      string
  version?:       number
  cloudinaryUrl?: string
  preview:        UgcVideoPreview
  videoAlt:       string
}

// ── Producciones ─────────────────────────────────────────────────────────────
// @production-videos-start

export const productionVideos: ProductionVideoData[] = [
  {
    id:            'prod-escenario-cafe-miau',
    slug:          'escenario-cafe-miau',
    title:         'Escenario Café Miau',
    client:        '',
    publicId:      'Escenario_cafe_miau_720p_rhrtat',
    version:       1779994756,
    cloudinaryUrl: 'https://res.cloudinary.com/dlgsegjay/video/upload/v1779994756/Escenario_cafe_miau_720p_rhrtat.mp4',
    preview:       { start: 0, duration: 10 },
    videoAlt:      'Producción audiovisual: Escenario Café Miau',
  },
  {
    id:            'prod-examen-virus-minecraft',
    slug:          'examen-virus-minecraft',
    title:         'Examen 2 — Virus Minecraft',
    client:        '',
    publicId:      'Examen_2_virus_minecraft_720p_zq5qra',
    version:       1779994756,
    cloudinaryUrl: 'https://res.cloudinary.com/dlgsegjay/video/upload/v1779994756/Examen_2_virus_minecraft_720p_zq5qra.mp4',
    preview:       { start: 0, duration: 10 },
    videoAlt:      'Producción universitaria: Examen 2 Virus Minecraft',
  },
  {
    id:            'prod-teaser',
    slug:          'teaser',
    title:         'Teaser',
    client:        '',
    publicId:      'Teaser_720p_fjqjqn',
    version:       1779994756,
    cloudinaryUrl: 'https://res.cloudinary.com/dlgsegjay/video/upload/v1779994756/Teaser_720p_fjqjqn.mp4',
    preview:       { start: 0, duration: 10 },
    videoAlt:      'Teaser de producción audiovisual',
  },
  {
    id:            'prod-trazos-historia',
    slug:          'trazos-historia-guayaquil',
    title:         'Trazos de historia — Guayaquil',
    client:        '',
    publicId:      'Trazos_de_historia_Guayaquil_720p_bicqah',
    version:       1779994760,
    cloudinaryUrl: 'https://res.cloudinary.com/dlgsegjay/video/upload/v1779994760/Trazos_de_historia_Guayaquil_720p_bicqah.mp4',
    preview:       { start: 5, duration: 12 },
    videoAlt:      'Documental: Trazos de historia, arte en el corazón de Guayaquil',
  }
]

// @production-videos-end

// ── Animaciones Cortefino ───────────────────────────────────────────────────

/** Perfil IG del cliente — enlace en CorteFinoSection */
export const CORTEFINO_IG_PROFILE = 'https://www.instagram.com/cortefino.ecu/'

export const animationVideos: AnimationVideoData[] = [
  {
    id:            'anim-cortefino-picana',
    slug:          'cortefino-picana',
    title:         'Cortefino — Picaña',
    client:        'Cortefino',
    igUrl:         'https://www.instagram.com/p/DUEg57Sj8IY',
    publicId:      'picaña_1_g8zafi',
    version:       1780005337,
    cloudinaryUrl: 'https://res.cloudinary.com/dlgsegjay/video/upload/v1780005337/pica%C3%B1a_1_g8zafi.mp4',
    preview:       { start: 0, duration: 5 },
    videoAlt:      'Animación Cortefino — Picaña',
  },
  {
    id:            'anim-cortefino-carne-ecua',
    slug:          'cortefino-carne-ecua',
    title:         'Cortefino — Carne ecuatoriana',
    client:        'Cortefino',
    igUrl:         'https://www.instagram.com/p/DUGgaE_gL7g',
    publicId:      'carne_ecua_enbbeg',
    version:       1780005336,
    cloudinaryUrl: 'https://res.cloudinary.com/dlgsegjay/video/upload/v1780005336/carne_ecua_enbbeg.mp4',
    preview:       { start: 0, duration: 5 },
    videoAlt:      'Animación Cortefino — Carne ecuatoriana',
  },
  {
    id:            'anim-cortefino-feriado',
    slug:          'cortefino-anima-feriado',
    title:         'Cortefino — Feriado',
    client:        'Cortefino',
    igUrl:         'https://www.instagram.com/p/DU4Y5uADKRK',
    publicId:      'ANIMA_FERIADO_ft5gb5',
    version:       1780005335,
    cloudinaryUrl: 'https://res.cloudinary.com/dlgsegjay/video/upload/v1780005335/ANIMA_FERIADO_ft5gb5.mp4',
    preview:       { start: 0, duration: 5 },
    videoAlt:      'Animación Cortefino — Feriado',
  },
  {
    id:            'anim-cortefino-corte-fav',
    slug:          'cortefino-corte-fav-compos',
    title:         'Cortefino — Corte favorito',
    client:        'Cortefino',
    igUrl:         'https://www.instagram.com/p/DU_b0B2D_uF',
    publicId:      'corte_fav_compos_vh5j64',
    version:       1780005336,
    cloudinaryUrl: 'https://res.cloudinary.com/dlgsegjay/video/upload/v1780005336/corte_fav_compos_vh5j64.mp4',
    preview:       { start: 0, duration: 5 },
    videoAlt:      'Animación Cortefino — Corte favorito composición',
  },
  {
    id:            'anim-cortefino-semana2',
    slug:          'cortefino-semana2',
    title:         'Cortefino — Servicios de corte',
    client:        'Cortefino',
    igUrl:         'https://www.instagram.com/p/DT3tupcD6mB',
    publicId:      'Corte_fino_semana2_pvktah',
    version:       1780005336,
    cloudinaryUrl: 'https://res.cloudinary.com/dlgsegjay/video/upload/v1780005336/Corte_fino_semana2_pvktah.mp4',
    preview:       { start: 2, duration: 5 },
    videoAlt:      'Animación Cortefino — Semana 2',
  },
]

// ── UGC TikToks ──────────────────────────────────────────────────────────────

export const ugcVideos: UgcVideoData[] = [
  {
    id:            'ugc-cortefino-mitos-vacio',
    slug:          'cortefino-mitos-vacio',
    title:         'Cortefino — Mitos y verdades del vacío',
    client:        'Cortefino',
    tiktokUrl:     'https://www.instagram.com/p/DWr3UjHjxqd',
    publicId:      '_CORREGIDO__MITOS_YVERDADES_SOBRE_EL_VACIO_720p_hveum1',
    version:       1779994740,
    cloudinaryUrl: 'https://res.cloudinary.com/dlgsegjay/video/upload/v1779994740/_CORREGIDO__MITOS_YVERDADES_SOBRE_EL_VACIO_720p_hveum1.mp4',
    preview:       { start: 11, duration: 8 },
    videoAlt:      'Reel UGC Cortefino: mitos y verdades sobre el vacío',
    likeCount:     '',
    commentCount:  '',
    postedAgo:     '3h ago',
  },
  {
    id:            'ugc-cortefino-asmr',
    slug:          'cortefino-asmr-preparacion',
    title:         'Cortefino — ASMR preparación',
    client:        'Cortefino',
    tiktokUrl:     'https://www.instagram.com/p/DWkFDusD8mX',
    publicId:      'ASMR_PREPARACION_720p_frshsz',
    version:       1779994740,
    cloudinaryUrl: 'https://res.cloudinary.com/dlgsegjay/video/upload/v1779994740/ASMR_PREPARACION_720p_frshsz.mp4',
    preview:       { start: 0, duration: 5 },
    videoAlt:      'Reel UGC Cortefino: ASMR preparación de cortes',
    likeCount:     '',
    commentCount:  '',
    postedAgo:     '1d ago',
  },
  {
    id:            'ugc-cortefino-recomendaciones',
    slug:          'cortefino-recomendaciones-cortes',
    title:         'Cortefino — Recomendaciones de cortes',
    client:        'Cortefino',
    tiktokUrl:     'https://www.instagram.com/p/DV4sleKDOBo',
    publicId:      'recomendaciones_cortes_720p_dwgf0d',
    version:       1779994740,
    cloudinaryUrl: 'https://res.cloudinary.com/dlgsegjay/video/upload/v1779994740/recomendaciones_cortes_720p_dwgf0d.mp4',
    preview:       { start: 20, duration: 8 },
    videoAlt:      'Reel UGC Cortefino: recomendaciones de cortes de carne',
    likeCount:     '',
    commentCount:  '',
    postedAgo:     '2d ago',
  },
  {
    id:            'ugc-cortefino-tomahawk',
    slug:          'cortefino-tomahawk-ribeye',
    title:         'Cortefino — Tomahawk x Ribeye',
    client:        'Cortefino',
    tiktokUrl:     'https://www.instagram.com/p/DWMwMEHD3pX',
    publicId:      'tomahawkXribeye_2__720p_hjelz9',
    version:       1779994740,
    cloudinaryUrl: 'https://res.cloudinary.com/dlgsegjay/video/upload/v1779994740/tomahawkXribeye_2__720p_hjelz9.mp4',
    preview:       { start: 4, duration: 10 },
    videoAlt:      'Reel UGC Cortefino: comparativa Tomahawk y Ribeye',
    likeCount:     '',
    commentCount:  '',
    postedAgo:     '4d ago',
  },
  {
    id:            'ugc-cortefino-vino',
    slug:          'cortefino-vino-cortes',
    title:         'Cortefino — Vino y cortes',
    client:        'Cortefino',
    tiktokUrl:     'https://www.instagram.com/p/DYVCxxlRe8d',
    publicId:      'Vino_cortes_720p_svkywb',
    version:       1779994740,
    cloudinaryUrl: 'https://res.cloudinary.com/dlgsegjay/video/upload/v1779994740/Vino_cortes_720p_svkywb.mp4',
    preview:       { start: 10, duration: 8 },
    videoAlt:      'Reel UGC Cortefino: maridaje de vino y cortes de carne',
    likeCount:     '',
    commentCount:  '',
    postedAgo:     '6d ago',
  },
]

// ── Helpers ─────────────────────────────────────────────────────────────────

export function getUgcVideoOpenUrl(video: UgcVideoData): string | undefined {
  if (video.tiktokUrl) return video.tiktokUrl
  if (video.cloudinaryUrl) return video.cloudinaryUrl
  return cloudinaryVideoDeliveryUrl(video.publicId, { version: video.version })
}

export function getProductionVideoOpenUrl(video: ProductionVideoData): string | undefined {
  if (video.cloudinaryUrl) return video.cloudinaryUrl
  if (!video.publicId) return undefined
  return cloudinaryVideoDeliveryUrl(video.publicId, { version: video.version })
}

export function getAnimationVideoOpenUrl(video: AnimationVideoData): string | undefined {
  if (video.igUrl) return video.igUrl
  if (video.cloudinaryUrl) return video.cloudinaryUrl
  if (!video.publicId) return undefined
  return cloudinaryVideoDeliveryUrl(video.publicId, { version: video.version })
}

export function getProductionVideoUrl(video: ProductionVideoData): string | undefined {
  return getProductionVideoOpenUrl(video)
}

export function getProductionVideoPreviewUrl(video: ProductionVideoData): string | undefined {
  if (!video.publicId) return undefined
  if (!video.preview) return getProductionVideoUrl(video)
  return cloudinaryVideoPreviewUrl(video.publicId, {
    start:    video.preview.start,
    duration: video.preview.duration,
    version:  video.version,
    width:    640,
    height:   360,
  })
}

export function getProductionVideoPosterUrl(video: ProductionVideoData): string | undefined {
  if (!video.publicId) return undefined
  return cloudinaryVideoThumbnailUrl(video.publicId, {
    version: video.version,
    width:   1280,
    height:  720,
  })
}

export function getAnimationVideoPreviewUrl(video: AnimationVideoData): string | undefined {
  if (video.cloudinaryUrl && video.preview) {
    return cloudinaryVideoPreviewFromDeliveryUrl(video.cloudinaryUrl, {
      start:    video.preview.start,
      duration: video.preview.duration,
      width:    480,
      height:   480,
    })
  }
  if (!video.publicId) return undefined
  return cloudinaryVideoPreviewUrl(video.publicId, {
    start:    video.preview.start,
    duration: video.preview.duration,
    version:  video.version,
    width:    480,
    height:   480,
  })
}

export function getAnimationVideoPosterUrl(video: AnimationVideoData): string | undefined {
  // Priorizar cloudinaryUrl para derivar el thumbnail: evita encoding de
  // caracteres especiales (ej. ñ) en el publicId al construir la URL.
  if (video.cloudinaryUrl) {
    return video.cloudinaryUrl
      .replace('/video/upload/', '/video/upload/so_0,w_480,h_480,c_fill,q_auto,f_jpg/')
      .replace(/\.mp4$/i, '.jpg')
  }
  if (!video.publicId) return undefined
  return cloudinaryVideoThumbnailUrl(video.publicId, {
    version: video.version,
    width:   480,
    height:  480,
    start:   video.preview.start,
  })
}

export function getProductionVideoBySlug(slug: string): ProductionVideoData | undefined {
  return productionVideos.find((v) => v.slug === slug)
}

export function getProductionVideoById(id: string): ProductionVideoData | undefined {
  return productionVideos.find((v) => v.id === id)
}

export function getAnimationVideoBySlug(slug: string): AnimationVideoData | undefined {
  return animationVideos.find((v) => v.slug === slug)
}

export function getUgcVideoPreviewUrl(video: UgcVideoData): string {
  return cloudinaryVideoPreviewUrl(video.publicId, {
    start:    video.preview.start,
    duration: video.preview.duration,
    version:  video.version,
  })
}

export function getUgcVideoPosterUrl(video: UgcVideoData): string {
  return cloudinaryVideoThumbnailUrl(video.publicId, {
    version: video.version,
    width:   480,
    height:  854,
    start:   video.preview.start,
  })
}

export function getUgcVideoBySlug(slug: string): UgcVideoData | undefined {
  return ugcVideos.find((v) => v.slug === slug)
}

export function getUgcVideoById(id: string): UgcVideoData | undefined {
  return ugcVideos.find((v) => v.id === id)
}
