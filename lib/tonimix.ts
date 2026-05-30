// ─────────────────────────────────────────────────────────────────────────────
// lib/tonimix.ts — Assets y metadata de Tonimix (§06)
// Texto de sección: lib/content.ts → TONIMIX_COPY
// ─────────────────────────────────────────────────────────────────────────────

import { assetPath } from '@/lib/asset-path'
import type { TonimixKeyVisualItem, TonimixMerchItem } from '@/lib/types'

export const TONIMIX_KEY_VISUALS = {
  primary: {
    src:       assetPath('/ugc/tonimix/key-visual-1.webp'),
    alt:       'Key Visual Tonimix — campaña RetroDigital Ecuador, dirección de arte',
    client:    'Tonimix',
    title:     'Key Visual 01',
    category:  'Key Visual',
    imgWidth:  1200,
    imgHeight: 800,
  },
  mupi: {
    src:       assetPath('/ugc/tonimix/mupi.webp'),
    alt:       'MUPI publicitario Tonimix — vía pública Guayaquil',
    client:    'Tonimix',
    title:     'MUPI',
    category:  'MUPI',
    imgWidth:  600,
    imgHeight: 900,
  },
  secondary: {
    src:       assetPath('/ugc/tonimix/key-visual-2.webp'),
    alt:       'Key Visual Tonimix 2 — composición editorial productos fondo azul',
    client:    'Tonimix',
    title:     'Key Visual 02',
    category:  'Key Visual',
    imgWidth:  1000,
    imgHeight: 700,
  },
} as const satisfies Record<string, TonimixKeyVisualItem>

export const TONIMIX_MERCH: readonly TonimixMerchItem[] = [
  { src: assetPath('/ugc/tonimix/merch/gorra.webp'),    alt: 'Gorra Tonimix — diseño retrodigital', title: 'Gorra' },
  { src: assetPath('/ugc/tonimix/merch/hoodie.webp'),   alt: 'Hoodie Chill Tonimix',                title: 'Hoodie' },
  { src: assetPath('/ugc/tonimix/merch/tote-bag.webp'), alt: 'Tote bag Tonimix',                    title: 'Tote bag' },
  { src: assetPath('/ugc/tonimix/merch/camiseta.webp'), alt: 'Camiseta ToniChill Tonimix',          title: 'Camiseta' },
]

export const TONIMIX_MERCH_CATEGORY = 'Merch'
