// ─────────────────────────────────────────────────────────────────────────────
// lib/cloudinary.ts — Helpers de URL (CLAUDE.md §6.2)
// NUNCA construir URLs de Cloudinary manualmente. Siempre usar estas funciones.
// ─────────────────────────────────────────────────────────────────────────────

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

if (!CLOUD_NAME && process.env.NODE_ENV === 'production') {
  console.warn(
    '[cloudinary] NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME no está definido. ' +
    'Las imágenes no cargarán en producción.'
  )
}

type ImageFormat = 'auto' | 'webp' | 'avif'
type ImageQuality = 'auto' | 'auto:best' | 'auto:eco' | number
type CropMode = 'fill' | 'fit' | 'scale' | 'thumb' | 'crop'
type GravityMode = 'auto' | 'face' | 'center' | 'north' | 'south'

interface CloudinaryImageOptions {
  width?: number
  height?: number
  quality?: ImageQuality
  format?: ImageFormat
  crop?: CropMode
  gravity?: GravityMode
}

interface CloudinaryVideoOptions {
  quality?: ImageQuality
  format?: 'auto' | 'mp4' | 'webm'
}

export interface CloudinaryVideoPreviewOptions {
  /** Segundo de inicio (`so_`). Default: 0 */
  start?: number
  /** Duración en segundos (`du_`). Default: 5 */
  duration?: number
  width?: number
  height?: number
  crop?: CropMode
  gravity?: GravityMode
  quality?: ImageQuality
  format?: 'mp4' | 'webm' | 'auto'
  /** Sin pista de audio (`ac_none`). Default: true — ideal para autoplay en cards */
  stripAudio?: boolean
  /**
   * Versión del asset (ej. 1778922833 o 'v1778922833').
   * Opcional; omitir usa siempre la última versión subida.
   */
  version?: string | number
}

/**
 * Genera una URL de imagen de Cloudinary con transformaciones optimizadas.
 *
 * @param publicId - Cloudinary public ID (ej: 'madeleine-portfolio/hero/portrait')
 * @param options  - Transformaciones a aplicar
 * @returns URL completa de Cloudinary
 */
export function cloudinaryUrl(
  publicId: string,
  options: CloudinaryImageOptions = {}
): string {
  const {
    width,
    height,
    quality = 'auto',
    format = 'auto',
    crop = 'fill',
    gravity = 'auto',
  } = options

  const transforms: string[] = [
    `f_${format}`,
    `q_${quality}`,
    `c_${crop}`,
    `g_${gravity}`,
    width  ? `w_${width}`  : '',
    height ? `h_${height}` : '',
  ].filter(Boolean)

  return `https://res.cloudinary.com/${CLOUD_NAME ?? 'PLACEHOLDER'}/image/upload/${transforms.join(',')}/${publicId}`
}

/**
 * Genera una URL de video de Cloudinary.
 *
 * @param publicId - Cloudinary public ID del video
 * @param options  - Transformaciones opcionales
 * @returns URL completa del video en Cloudinary
 */
export function cloudinaryVideoUrl(
  publicId: string,
  options: CloudinaryVideoOptions = {}
): string {
  const { quality = 'auto', format = 'auto' } = options
  const id = normalizeVideoPublicId(publicId)
  return `https://res.cloudinary.com/${CLOUD_NAME ?? 'PLACEHOLDER'}/video/upload/f_${format},q_${quality}/${id}`
}

/**
 * URL de entrega del asset tal cual está en Cloudinary (sin transformaciones).
 * Usar para videos de producción/post completos.
 */
export function cloudinaryVideoDeliveryUrl(
  publicId: string,
  options: { version?: string | number } = {}
): string {
  const id = normalizeVideoPublicId(publicId)
  const versionSegment =
    options.version != null
      ? `v${String(options.version).replace(/^v/, '')}/`
      : ''
  return `https://res.cloudinary.com/${CLOUD_NAME ?? 'PLACEHOLDER'}/video/upload/${versionSegment}${id}.mp4`
}

/**
 * URL de delivery para preview corto (Reels/TikTok en cards).
 * Recorta con `so_` + `du_`, redimensiona 9:16 y comprime para web.
 *
 * @example
 * cloudinaryVideoPreviewUrl('qjuapuzdlaknodw4wf5p', { version: 1778921545 })
 * cloudinaryVideoPreviewUrl('iffss3qf0zdezk63z6v2', { start: 2, duration: 5, version: 1778922833 })
 */
export function cloudinaryVideoPreviewUrl(
  publicId: string,
  options: CloudinaryVideoPreviewOptions = {}
): string {
  const {
    start = 0,
    duration = 5,
    width = 480,
    height = 854,
    crop = 'fill',
    gravity = 'center',
    quality = 'auto:eco',
    format = 'mp4',
    stripAudio = true,
    version,
  } = options

  const id = normalizeVideoPublicId(publicId)

  const transforms = [
    `so_${start}`,
    `du_${duration}`,
    `w_${width}`,
    `h_${height}`,
    `c_${crop}`,
    `g_${gravity}`,
    `q_${quality}`,
    `f_${format}`,
    'vc_h264',
    stripAudio && 'ac_none',
  ].filter(Boolean) as string[]

  const versionSegment = version != null
    ? `v${String(version).replace(/^v/, '')}/`
    : ''

  return `https://res.cloudinary.com/${CLOUD_NAME ?? 'PLACEHOLDER'}/video/upload/${transforms.join(',')}/${versionSegment}${id}.mp4`
}

/**
 * URL de thumbnail estático del primer frame del video (o segundo `so`).
 * Usa entrega de imagen desde un asset de video.
 * Ideal como `poster` en <video preload="none"> para evitar carga anticipada.
 *
 * @example
 * cloudinaryVideoThumbnailUrl('ASMR_PREPARACION_720p_frshsz', { version: 1779994740 })
 */
export function cloudinaryVideoThumbnailUrl(
  publicId: string,
  options: { version?: string | number; width?: number; height?: number; start?: number } = {}
): string {
  const { version, width = 480, height = 854, start = 0 } = options
  const id = normalizeVideoPublicId(publicId)
  const versionSegment = version != null
    ? `v${String(version).replace(/^v/, '')}/`
    : ''
  return `https://res.cloudinary.com/${CLOUD_NAME ?? 'PLACEHOLDER'}/video/upload/so_${start},w_${width},h_${height},c_fill,q_auto,f_jpg/${versionSegment}${id}.jpg`
}

/**
 * Recorta un clip corto desde una URL de delivery existente (sin rearmar publicId).
 * Útil cuando el publicId tiene caracteres especiales (ej. ñ) ya codificados en la URL.
 */
export function cloudinaryVideoPreviewFromDeliveryUrl(
  deliveryUrl: string,
  options: Pick<CloudinaryVideoPreviewOptions, 'start' | 'duration' | 'width' | 'height'> = {}
): string {
  const {
    start = 0,
    duration = 5,
    width = 480,
    height = 854,
  } = options

  const transforms = [
    `so_${start}`,
    `du_${duration}`,
    `w_${width}`,
    `h_${height}`,
    'c_fill',
    'g_center',
    'q_auto:eco',
    'f_mp4',
    'vc_h264',
    'ac_none',
  ].join(',')

  return deliveryUrl.replace('/video/upload/', `/video/upload/${transforms}/`)
}

function normalizeVideoPublicId(publicId: string): string {
  return publicId.replace(/\.mp4$/i, '')
}
