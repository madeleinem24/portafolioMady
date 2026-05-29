// ─────────────────────────────────────────────────────────────────────────────
// videos/videos.ts — Catálogo maestro de video (local + Cloudinary)
// Sincronizar desde manifiesto: python videos/conversor_videos.py sync
// ─────────────────────────────────────────────────────────────────────────────

import {
  cloudinaryVideoDeliveryUrl,
  cloudinaryVideoPreviewUrl,
} from '@/lib/cloudinary'
import type { ProductionVideoData, UgcVideoData, UgcVideoPreview } from '@/lib/types'

/** Clasificación editorial del asset */
export type VideoKind = 'tiktok' | 'reel' | 'production' | 'animation'

/** Entrada unificada — campos vacíos se completan antes de publicar */
export interface CatalogVideo {
  id:            string
  slug:          string
  kind:          VideoKind
  /** Grupo para batch en conversor_videos.py (ej. cortefino-tiktok) */
  group:         string
  /** Ruta relativa al repo; vacío si solo existe en Cloudinary */
  sourcePath?:   string
  title:         string
  client?:       string
  tiktokUrl:     string
  publicId?:     string
  version?:      number
  /** URL de entrega completa — abrir video sin recorte en nueva pestaña */
  cloudinaryUrl?: string
  preview:       UgcVideoPreview
  videoAlt:      string
  likeCount?:    string | number
  commentCount?: string | number
  postedAgo?:    string
}

// @catalog-start
export const videoCatalog: CatalogVideo[] = [
  {
    id:            "ugc-cortefino-mitos-vacio",
    slug:          "cortefino-mitos-vacio",
    kind:          "tiktok",
    group:         "cortefino-tiktok",
    sourcePath:    "ugc_mady/corte fino/contenido de tik tok/_CORREGIDO _MITOS YVERDADES SOBRE EL VACIO.mp4",
    title:         "Cortefino — Mitos y verdades del vacío",
    client:        "Cortefino",
    tiktokUrl:     "",
    publicId:      "_CORREGIDO__MITOS_YVERDADES_SOBRE_EL_VACIO_720p_hveum1",
    version:       1779994740,
    cloudinaryUrl: "https://res.cloudinary.com/dlgsegjay/video/upload/v1779994740/_CORREGIDO__MITOS_YVERDADES_SOBRE_EL_VACIO_720p_hveum1.mp4",
    preview:       { start: 0, duration: 5 },
    videoAlt:      "",
  },
  {
    id:            "ugc-cortefino-asmr",
    slug:          "cortefino-asmr-preparacion",
    kind:          "tiktok",
    group:         "cortefino-tiktok",
    sourcePath:    "ugc_mady/corte fino/contenido de tik tok/ASMR PREPARACION.mp4",
    title:         "Cortefino — ASMR preparación",
    client:        "Cortefino",
    tiktokUrl:     "",
    publicId:      "ASMR_PREPARACION_720p_frshsz",
    version:       1779994740,
    cloudinaryUrl: "https://res.cloudinary.com/dlgsegjay/video/upload/v1779994740/ASMR_PREPARACION_720p_frshsz.mp4",
    preview:       { start: 0, duration: 5 },
    videoAlt:      "",
  },
  {
    id:            "ugc-cortefino-recomendaciones",
    slug:          "cortefino-recomendaciones-cortes",
    kind:          "tiktok",
    group:         "cortefino-tiktok",
    sourcePath:    "ugc_mady/corte fino/contenido de tik tok/recomendaciones_cortes.mp4",
    title:         "Cortefino — Recomendaciones de cortes",
    client:        "Cortefino",
    tiktokUrl:     "",
    publicId:      "recomendaciones_cortes_720p_dwgf0d",
    version:       1779994740,
    cloudinaryUrl: "https://res.cloudinary.com/dlgsegjay/video/upload/v1779994740/recomendaciones_cortes_720p_dwgf0d.mp4",
    preview:       { start: 0, duration: 5 },
    videoAlt:      "",
  },
  {
    id:            "ugc-cortefino-tomahawk",
    slug:          "cortefino-tomahawk-ribeye",
    kind:          "tiktok",
    group:         "cortefino-tiktok",
    sourcePath:    "ugc_mady/corte fino/contenido de tik tok/tomahawkXribeye(2).mp4",
    title:         "Cortefino — Tomahawk x Ribeye",
    client:        "Cortefino",
    tiktokUrl:     "",
    publicId:      "tomahawkXribeye_2__720p_hjelz9",
    version:       1779994740,
    cloudinaryUrl: "https://res.cloudinary.com/dlgsegjay/video/upload/v1779994740/tomahawkXribeye_2__720p_hjelz9.mp4",
    preview:       { start: 0, duration: 5 },
    videoAlt:      "",
  },
  {
    id:            "ugc-cortefino-vino",
    slug:          "cortefino-vino-cortes",
    kind:          "tiktok",
    group:         "cortefino-tiktok",
    sourcePath:    "ugc_mady/corte fino/contenido de tik tok/Vino_cortes.mp4",
    title:         "Cortefino — Vino y cortes",
    client:        "Cortefino",
    tiktokUrl:     "",
    publicId:      "Vino_cortes_720p_svkywb",
    version:       1779994740,
    cloudinaryUrl: "https://res.cloudinary.com/dlgsegjay/video/upload/v1779994740/Vino_cortes_720p_svkywb.mp4",
    preview:       { start: 0, duration: 5 },
    videoAlt:      "",
  },
  {
    id:            "anim-cortefino-picana",
    slug:          "cortefino-picana",
    kind:          "animation",
    group:         "cortefino-animaciones",
    sourcePath:    "ugc_mady/corte fino/animaciones/picaña_1.mp4",
    title:         "Cortefino — Picaña",
    client:        "Cortefino",
    tiktokUrl:     "https://www.instagram.com/p/DUEg57Sj8IY",
    publicId:      "picaña_1_g8zafi",
    version:       1780005337,
    cloudinaryUrl: "https://res.cloudinary.com/dlgsegjay/video/upload/v1780005337/pica%C3%B1a_1_g8zafi.mp4",
    preview:       { start: 0, duration: 5 },
    videoAlt:      "",
  },
  {
    id:            "anim-cortefino-carne-ecua",
    slug:          "cortefino-carne-ecua",
    kind:          "animation",
    group:         "cortefino-animaciones",
    sourcePath:    "ugc_mady/corte fino/animaciones/carne_ecua.mp4",
    title:         "Cortefino — Carne ecuatoriana",
    client:        "Cortefino",
    tiktokUrl:     "https://www.instagram.com/p/DUGgaE_gL7g",
    publicId:      "carne_ecua_enbbeg",
    version:       1780005336,
    cloudinaryUrl: "https://res.cloudinary.com/dlgsegjay/video/upload/v1780005336/carne_ecua_enbbeg.mp4",
    preview:       { start: 0, duration: 5 },
    videoAlt:      "",
  },
  {
    id:            "anim-cortefino-feriado",
    slug:          "cortefino-anima-feriado",
    kind:          "animation",
    group:         "cortefino-animaciones",
    sourcePath:    "ugc_mady/corte fino/animaciones/ANIMA_FERIADO.mp4",
    title:         "Cortefino — Animación feriado",
    client:        "Cortefino",
    tiktokUrl:     "https://www.instagram.com/p/DU4Y5uADKRK",
    publicId:      "ANIMA_FERIADO_ft5gb5",
    version:       1780005335,
    cloudinaryUrl: "https://res.cloudinary.com/dlgsegjay/video/upload/v1780005335/ANIMA_FERIADO_ft5gb5.mp4",
    preview:       { start: 0, duration: 5 },
    videoAlt:      "",
  },
  {
    id:            "anim-cortefino-corte-fav",
    slug:          "cortefino-corte-fav-compos",
    kind:          "animation",
    group:         "cortefino-animaciones",
    sourcePath:    "ugc_mady/corte fino/animaciones/corte_fav_compos.mp4",
    title:         "Cortefino — Corte favorito composición",
    client:        "Cortefino",
    tiktokUrl:     "https://www.instagram.com/p/DU_b0B2D_uF",
    publicId:      "corte_fav_compos_vh5j64",
    version:       1780005336,
    cloudinaryUrl: "https://res.cloudinary.com/dlgsegjay/video/upload/v1780005336/corte_fav_compos_vh5j64.mp4",
    preview:       { start: 0, duration: 5 },
    videoAlt:      "",
  },
  {
    id:            "anim-cortefino-semana2",
    slug:          "cortefino-semana2",
    kind:          "animation",
    group:         "cortefino-animaciones",
    sourcePath:    "ugc_mady/corte fino/animaciones/Corte_fino_semana2.mp4",
    title:         "Cortefino — Semana 2",
    client:        "Cortefino",
    tiktokUrl:     "https://www.instagram.com/p/DT3tupcD6mB",
    publicId:      "Corte_fino_semana2_pvktah",
    version:       1780005336,
    cloudinaryUrl: "https://res.cloudinary.com/dlgsegjay/video/upload/v1780005336/Corte_fino_semana2_pvktah.mp4",
    preview:       { start: 0, duration: 5 },
    videoAlt:      "",
  },
  {
    id:            "prod-escenario-cafe-miau",
    slug:          "escenario-cafe-miau",
    kind:          "production",
    group:         "mady-producciones",
    sourcePath:    "ugc_mady/producciones/Escenario_cafe_miau (1).mp4",
    title:         "Escenario Café Miau",
    tiktokUrl:     "",
    publicId:      "Escenario_cafe_miau_720p_rhrtat",
    version:       1779994756,
    cloudinaryUrl: "https://res.cloudinary.com/dlgsegjay/video/upload/v1779994756/Escenario_cafe_miau_720p_rhrtat.mp4",
    preview:       { start: 0, duration: 5 },
    videoAlt:      "",
  },
  {
    id:            "prod-examen-virus-minecraft",
    slug:          "examen-virus-minecraft",
    kind:          "production",
    group:         "mady-producciones",
    sourcePath:    "ugc_mady/producciones/Examen_2_virus_minecraft.mp4",
    title:         "Examen 2 — Virus Minecraft",
    tiktokUrl:     "",
    publicId:      "Examen_2_virus_minecraft_720p_zq5qra",
    version:       1779994756,
    cloudinaryUrl: "https://res.cloudinary.com/dlgsegjay/video/upload/v1779994756/Examen_2_virus_minecraft_720p_zq5qra.mp4",
    preview:       { start: 0, duration: 5 },
    videoAlt:      "",
  },
  {
    id:            "prod-teaser",
    slug:          "teaser",
    kind:          "production",
    group:         "mady-producciones",
    sourcePath:    "ugc_mady/producciones/Teaser (1).mp4",
    title:         "Teaser",
    tiktokUrl:     "",
    publicId:      "Teaser_720p_fjqjqn",
    version:       1779994756,
    cloudinaryUrl: "https://res.cloudinary.com/dlgsegjay/video/upload/v1779994756/Teaser_720p_fjqjqn.mp4",
    preview:       { start: 0, duration: 5 },
    videoAlt:      "",
  },
  {
    id:            "prod-trazos-historia",
    slug:          "trazos-historia-guayaquil",
    kind:          "production",
    group:         "mady-producciones",
    sourcePath:    "ugc_mady/producciones/Trazos de historia - arte en el corazón de Guayaquil (1).mov",
    title:         "Trazos de historia — Guayaquil",
    tiktokUrl:     "",
    publicId:      "Trazos_de_historia_Guayaquil_720p_bicqah",
    version:       1779994760,
    cloudinaryUrl: "https://res.cloudinary.com/dlgsegjay/video/upload/v1779994760/Trazos_de_historia_Guayaquil_720p_bicqah.mp4",
    preview:       { start: 0, duration: 5 },
    videoAlt:      "",
  },
]
// @catalog-end

// ── Derivados por clasificación ───────────────────────────────────────────────

export const tiktokVideos = videoCatalog.filter((v) => v.kind === 'tiktok')
export const reelVideos = videoCatalog.filter((v) => v.kind === 'reel')
export const productionCatalog = videoCatalog.filter((v) => v.kind === 'production')
export const animationVideos = videoCatalog.filter((v) => v.kind === 'animation')

/** Carousel TikTok del sitio — solo entradas con publicId en Cloudinary */
export const ugcVideos: UgcVideoData[] = tiktokVideos
  .filter((v): v is CatalogVideo & { publicId: string } => Boolean(v.publicId))
  .map(toUgcVideoData)

/** Producción/post para proyectos — kind production */
export const productionVideos: ProductionVideoData[] = productionCatalog.map(
  toProductionVideoData,
)

// ── Helpers ───────────────────────────────────────────────────────────────────

function toUgcVideoData(v: CatalogVideo & { publicId: string }): UgcVideoData {
  return {
    id:            v.id,
    slug:          v.slug,
    title:         v.title,
    client:        v.client,
    tiktokUrl:     v.tiktokUrl,
    publicId:      v.publicId,
    version:       v.version,
    cloudinaryUrl: v.cloudinaryUrl,
    preview:       v.preview,
    videoAlt:      v.videoAlt,
    likeCount:     v.likeCount,
    commentCount:  v.commentCount,
    postedAgo:     v.postedAgo,
  }
}

function toProductionVideoData(v: CatalogVideo): ProductionVideoData {
  return {
    id:            v.id,
    slug:          v.slug,
    title:         v.title,
    client:        v.client,
    publicId:      v.publicId,
    version:       v.version,
    cloudinaryUrl: v.cloudinaryUrl,
    videoAlt:      v.videoAlt,
    preview:       v.preview,
  }
}

export function getCatalogVideoBySlug(slug: string): CatalogVideo | undefined {
  return videoCatalog.find((v) => v.slug === slug)
}

export function getCatalogVideoByKey(key: string): CatalogVideo | undefined {
  return videoCatalog.find((v) => v.id.includes(key) || v.slug === key)
}

export function getProductionVideoUrl(video: ProductionVideoData): string | undefined {
  if (!video.publicId) return undefined
  return cloudinaryVideoDeliveryUrl(video.publicId, { version: video.version })
}

export function getProductionVideoPreviewUrl(
  video: ProductionVideoData,
): string | undefined {
  if (!video.publicId) return undefined
  if (!video.preview) return getProductionVideoUrl(video)
  return cloudinaryVideoPreviewUrl(video.publicId, {
    start:    video.preview.start,
    duration: video.preview.duration,
    version:  video.version,
  })
}

export function getProductionVideoBySlug(slug: string): ProductionVideoData | undefined {
  return productionVideos.find((v) => v.slug === slug)
}

export function getUgcVideoPreviewUrl(video: UgcVideoData): string {
  return cloudinaryVideoPreviewUrl(video.publicId, {
    start:    video.preview.start,
    duration: video.preview.duration,
    version:  video.version,
  })
}

export function getUgcVideoBySlug(slug: string): UgcVideoData | undefined {
  return ugcVideos.find((v) => v.slug === slug)
}

export function getUgcVideoById(id: string): UgcVideoData | undefined {
  return ugcVideos.find((v) => v.id === id)
}
