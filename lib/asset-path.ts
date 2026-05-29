// ─────────────────────────────────────────────────────────────────────────────
// lib/asset-path.ts — Rutas de /public con basePath de GitHub Pages
// Next static export no siempre prefija basePath en <Image src="/...">.
// ─────────────────────────────────────────────────────────────────────────────

import { basePath as ghPagesBasePath } from '@/site.config'

/** Prefijo inyectado en build (next.config env). Vacío en dev. */
export const assetPrefix = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

/**
 * Ruta pública absoluta para assets en /public.
 * @example assetPath('/images/hero-portrait.webp') → '/portafolioMady/images/hero-portrait.webp'
 */
export function assetPath(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${assetPrefix}${normalized}`
}

/** Base path de producción (para tests o documentación). */
export const productionBasePath = ghPagesBasePath
