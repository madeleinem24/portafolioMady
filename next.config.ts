import type { NextConfig } from 'next'

// ─────────────────────────────────────────────────────────────────────────────
// ADR-001: output: 'export' — Static Site Generation para GitHub Pages.
// next/image requiere unoptimized: true en modo export.
// La optimización de imágenes la delega completamente a Cloudinary.
// ─────────────────────────────────────────────────────────────────────────────

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,

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

  // ── GitHub Pages basePath ───────────────────────────────────────────────────
  // Descomentar cuando el repo tenga nombre (ej: "madeleine-portfolio"):
  // basePath: '/madeleine-portfolio',
  // assetPrefix: '/madeleine-portfolio',
}

export default nextConfig
