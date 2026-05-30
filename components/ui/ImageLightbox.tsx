'use client'

// ─────────────────────────────────────────────────────────────────────────────
// ImageLightbox.tsx — Modal nativo <dialog> para ver imágenes a tamaño completo
// Ratón, touch, Escape y backdrop. Respeta prefers-reduced-motion.
// ─────────────────────────────────────────────────────────────────────────────

import Image from 'next/image'
import { useCallback, useEffect, useRef } from 'react'

import { LIGHTBOX_COPY } from '@/lib/content'

export interface ImageLightboxProps {
  src: string
  alt: string
  caption?: string
  open: boolean
  onClose: () => void
}

export default function ImageLightbox({
  src,
  alt,
  caption,
  open,
  onClose,
}: ImageLightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  const close = useCallback(() => {
    onClose()
  }, [onClose])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open && !dialog.open) {
      dialog.showModal()
    } else if (!open && dialog.open) {
      dialog.close()
    }
  }, [open])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    const onCancel = (event: Event) => {
      event.preventDefault()
      close()
    }

    dialog.addEventListener('cancel', onCancel)
    return () => dialog.removeEventListener('cancel', onCancel)
  }, [close])

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        close()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, close])

  const handleDialogClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    const target = event.target
    if (!(target instanceof Element)) return
    if (
      target.closest('.image-lightbox__figure') ||
      target.closest('.image-lightbox__close')
    ) {
      return
    }
    close()
  }

  return (
    <dialog
      ref={dialogRef}
      className="image-lightbox"
      aria-label={`${LIGHTBOX_COPY.viewingPrefix} ${alt}`}
      onClick={handleDialogClick}
      onClose={close}
    >
      <div className="image-lightbox__panel">
        <button
          type="button"
          className="image-lightbox__close"
          onClick={close}
          aria-label={LIGHTBOX_COPY.closeLabel}
        >
          <span aria-hidden="true">{LIGHTBOX_COPY.closeSymbol}</span>
        </button>

        <figure className="image-lightbox__figure">
          <div className="image-lightbox__media">
            <Image
              src={src}
              alt={alt}
              width={1920}
              height={1440}
              unoptimized
              className="image-lightbox__img"
              sizes="100vw"
              priority={open}
            />
          </div>
          {caption ? (
            <figcaption className="image-lightbox__caption">{caption}</figcaption>
          ) : null}
        </figure>
      </div>
    </dialog>
  )
}
