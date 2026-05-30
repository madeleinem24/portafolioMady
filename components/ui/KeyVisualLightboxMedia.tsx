'use client'

// ─────────────────────────────────────────────────────────────────────────────
// KeyVisualLightboxMedia.tsx — Media de kv-cell con botón que abre ImageLightbox
// ─────────────────────────────────────────────────────────────────────────────

import Image from 'next/image'
import { useState } from 'react'

import ImageLightbox from '@/components/ui/ImageLightbox'
import { LIGHTBOX_COPY } from '@/lib/content'

export interface KeyVisualLightboxMediaProps {
  src: string
  alt: string
  title?: string
  imgWidth: number
  imgHeight: number
  objectFit: 'cover' | 'contain'
  isLandscape: boolean
}

export default function KeyVisualLightboxMedia({
  src,
  alt,
  title,
  imgWidth,
  imgHeight,
  objectFit,
  isLandscape,
}: KeyVisualLightboxMediaProps) {
  const [open, setOpen] = useState(false)
  const caption = title ?? alt
  const triggerLabel = `${LIGHTBOX_COPY.openLabel}: ${caption}`

  const imageNode = isLandscape ? (
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
  )

  return (
    <>
      {imageNode}
      <button
        type="button"
        className="kv-cell__lightbox-trigger"
        onClick={() => setOpen(true)}
        aria-label={triggerLabel}
        data-lightbox-trigger=""
      />
      <ImageLightbox
        src={src}
        alt={alt}
        caption={caption}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  )
}
