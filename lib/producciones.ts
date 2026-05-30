// ─────────────────────────────────────────────────────────────────────────────
// lib/producciones.ts — Fotografías personales de Producciones (§07)
// Texto de sección: lib/content.ts → PRODUCCIONES_COPY
// ─────────────────────────────────────────────────────────────────────────────

import { assetPath } from '@/lib/asset-path'
import type { ProduccionesPhotoItem } from '@/lib/types'

export const PRODUCCIONES_FOTOS: readonly ProduccionesPhotoItem[] = [
  { src: assetPath('/ugc/fotografias/dsc1038.webp'), alt: 'Fotografía editorial — producción audiovisual' },
  { src: assetPath('/ugc/fotografias/dsc0546.webp'), alt: 'Fotografía de producción — Madeleine Morales' },
  { src: assetPath('/ugc/fotografias/dsc1048.webp'), alt: 'Fotografía editorial — sesión de producción' },
  { src: assetPath('/ugc/fotografias/dsc0716.webp'), alt: 'Fotografía editorial — flamenco en acuático' },
  { src: assetPath('/ugc/fotografias/dsc0994.webp'), alt: 'Fotografía editorial — pan artesanal' },
]
