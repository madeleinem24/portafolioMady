// ─────────────────────────────────────────────────────────────────────────────
// site.config.ts — URL pública en GitHub Pages (repo: madeleinem24/portafolioMady)
// Si renombrás el repo a madeleinem24.github.io, pon repo: '' y basePath queda ''.
// ─────────────────────────────────────────────────────────────────────────────

export const githubPages = {
  user: 'madeleinem24',
  repo: 'portafolioMady',
} as const

/** Subruta en GitHub Pages (vacío si el repo es username.github.io). */
export const basePath = githubPages.repo ? `/${githubPages.repo}` : ''

export const siteUrl = `https://${githubPages.user}.github.io${basePath}`
