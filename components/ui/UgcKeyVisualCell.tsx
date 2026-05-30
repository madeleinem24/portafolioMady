// ─────────────────────────────────────────────────────────────────────────────
// components/ui/UgcKeyVisualCell.tsx — Celda de imagen editorial para Key Visuals,
// carruseles estáticos, MUPI, merch y piezas de campaña.
// Ratio flexible · overlay en hover · badge de categoría.
// Lightbox opcional vía KeyVisualLightboxMedia (client).
// ─────────────────────────────────────────────────────────────────────────────

import Image from 'next/image'

import KeyVisualLightboxMedia from '@/components/ui/KeyVisualLightboxMedia'

export interface UgcKeyVisualCellProps {
  /** URL relativa a /public o URL absoluta */
  src: string
  alt: string
  client?: string
  title?: string
  /** Etiqueta de categoría mostrada en badge inferior-derecho */
  category?: 'Key Visual' | 'Carousel' | 'Estático' | 'MUPI' | 'Merch' | string
  /** Para carruseles: número total de slides — muestra badge "N slides" */
  slideCount?: number
  /** Tamaño base para next/image (px) — controla srcset */
  imgWidth?: number
  imgHeight?: number
  /** object-fit de la imagen (default cover) */
  objectFit?: 'cover' | 'contain'
  /** URL opcional: enlace externo (p. ej. IG). Desactiva lightbox. */
  href?: string
  /** Abrir imagen en modal a tamaño completo (default: true si no hay href). */
  lightbox?: boolean
  /**
   * landscape — contenedor 21:9 con altura máxima (Corte Fino estáticos).
   * Usa next/image fill + object-cover dentro del aspect box.
   */
  mediaVariant?: 'default' | 'landscape'
  className?: string
}

export default function UgcKeyVisualCell({
  src,
  alt,
  client,
  title,
  category,
  slideCount,
  imgWidth  = 800,
  imgHeight = 600,
  objectFit = 'cover',
  href,
  lightbox,
  mediaVariant = 'default',
  className = '',
}: UgcKeyVisualCellProps) {
  const isLandscape = mediaVariant === 'landscape'
  const useLightbox = lightbox ?? !href
  const classes = [
    'kv-cell',
    isLandscape ? 'kv-cell--landscape' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <article className={classes} aria-label={title ?? alt}>
      {/* ── Imagen ──────────────────────────────────────────────────────────── */}
      <div className="kv-cell__media">
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="kv-cell__media-link"
            aria-label={`Ver en Instagram: ${title ?? alt}`}
          >
            {isLandscape ? (
              <Image
                src={src}
                alt={alt}
                fill
                unoptimized
                sizes="(max-width: 767px) 100vw, 50vw"
                className={`kv-cell__img kv-cell__img--${objectFit}`}
              />
            ) : (
              <Image
                src={src}
                alt={alt}
                width={imgWidth}
                height={imgHeight}
                unoptimized
                className={`kv-cell__img kv-cell__img--${objectFit}`}
              />
            )}
          </a>
        ) : useLightbox ? (
          <KeyVisualLightboxMedia
            src={src}
            alt={alt}
            title={title}
            imgWidth={imgWidth}
            imgHeight={imgHeight}
            objectFit={objectFit}
            isLandscape={isLandscape}
          />
        ) : (
          <>
            {isLandscape ? (
              <Image
                src={src}
                alt={alt}
                fill
                unoptimized
                sizes="(max-width: 767px) 100vw, 50vw"
                className={`kv-cell__img kv-cell__img--${objectFit}`}
              />
            ) : (
              <Image
                src={src}
                alt={alt}
                width={imgWidth}
                height={imgHeight}
                unoptimized
                className={`kv-cell__img kv-cell__img--${objectFit}`}
              />
            )}
          </>
        )}
      </div>

      {/* ── Overlay de hover ─────────────────────────────────────────────────── */}
      <div className="kv-cell__overlay" aria-hidden="true">
        {/* Slide count badge (carouseles) */}
        {slideCount != null && (
          <span className="kv-cell__slides-badge">
            <SlideIcon />
            {slideCount} slides
          </span>
        )}
      </div>

      {/* ── Meta inferior ────────────────────────────────────────────────────── */}
      {(title || client || category) && (
        <footer className="kv-cell__footer">
          <div className="kv-cell__footer-left">
            {client && (
              <span className="kv-cell__client">{client}</span>
            )}
            {title && (
              <p className="kv-cell__title">{title}</p>
            )}
          </div>
          {category && (
            <span className="kv-cell__category">{category}</span>
          )}
        </footer>
      )}
    </article>
  )
}

function SlideIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  )
}
