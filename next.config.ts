import type { NextConfig } from 'next'

import { basePath as ghPagesBasePath } from './site.config'

// ─────────────────────────────────────────────────────────────────────────────
// ADR-001: output: 'export' — Static Site Generation para GitHub Pages.
// next/image requiere unoptimized: true en modo export.
// La optimización de imágenes la delega completamente a Cloudinary.
// ─────────────────────────────────────────────────────────────────────────────

/** En dev sin subruta; en build → /portafolioMady (site.config.ts). */
const basePath = process.env.NODE_ENV === 'production' ? ghPagesBasePath : ''

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },

  // ── Images ──────────────────────────────────────────────────────────────────
  images: {
    // unoptimized: obligatorio en static export (next/image no tiene servidor)
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },

}

export default nextConfig
