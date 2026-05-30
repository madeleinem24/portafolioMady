'use client'

import { useCallback, useEffect, useRef } from 'react'

export interface HorizontalScrollTrackOptions {
  /** Clase cuando scrollWidth > clientWidth */
  scrollableClass: string
  /** Clase mientras arrastra */
  draggingClass: string
  /** Si se define, se aplica cuando NO hay overflow (omitir en tiras que siempre deben alinear al inicio) */
  centeredClass?: string
  /** Margen en px para detectar overflow (subpíxeles) */
  overflowThreshold?: number
  /** Selector del slide para paso de teclado (default: primer hijo) */
  slideSelector?: string
}

export interface HorizontalScrollTrackResult {
  handleKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void
  hasOverflow: boolean
}

/**
 * Scroll horizontal editorial: wheel → scrollLeft, drag grab, flechas.
 * Mismo comportamiento que Producciones · fotografías personales.
 */
export function useHorizontalScrollTrack(
  trackRef: React.RefObject<HTMLDivElement | null>,
  options: HorizontalScrollTrackOptions,
): HorizontalScrollTrackResult {
  const {
    scrollableClass,
    draggingClass,
    centeredClass,
    overflowThreshold = 2,
    slideSelector,
  } = options

  const hasOverflowRef = useRef(false)
  const dragRef = useRef({ active: false, startX: 0, scrollLeft: 0 })

  const syncOverflow = useCallback(() => {
    const track = trackRef.current
    if (!track) return

    const scrollable =
      track.scrollWidth - track.clientWidth > overflowThreshold
    hasOverflowRef.current = scrollable
    track.classList.toggle(scrollableClass, scrollable)
    if (centeredClass) {
      track.classList.toggle(centeredClass, !scrollable)
    }
  }, [trackRef, scrollableClass, centeredClass, overflowThreshold])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    syncOverflow()

    const resizeObserver = new ResizeObserver(syncOverflow)
    resizeObserver.observe(track)
    track.querySelectorAll<HTMLElement>(':scope > *').forEach((child) => {
      resizeObserver.observe(child)
    })

    const onWheel = (event: WheelEvent) => {
      if (!hasOverflowRef.current || event.deltaY === 0) return
      event.preventDefault()
      track.scrollLeft += event.deltaY
    }

    const onPointerDown = (event: PointerEvent) => {
      if (!hasOverflowRef.current || event.button !== 0) return
      dragRef.current = {
        active: true,
        startX: event.clientX,
        scrollLeft: track.scrollLeft,
      }
      track.classList.add(draggingClass)
      track.setPointerCapture(event.pointerId)
    }

    const onPointerMove = (event: PointerEvent) => {
      if (!dragRef.current.active) return
      track.scrollLeft =
        dragRef.current.scrollLeft - (event.clientX - dragRef.current.startX)
    }

    const endDrag = (event: PointerEvent) => {
      if (!dragRef.current.active) return
      dragRef.current.active = false
      track.classList.remove(draggingClass)
      track.releasePointerCapture(event.pointerId)
    }

    track.addEventListener('wheel', onWheel, { passive: false })
    track.addEventListener('pointerdown', onPointerDown)
    track.addEventListener('pointermove', onPointerMove)
    track.addEventListener('pointerup', endDrag)
    track.addEventListener('pointercancel', endDrag)

    return () => {
      resizeObserver.disconnect()
      track.removeEventListener('wheel', onWheel)
      track.removeEventListener('pointerdown', onPointerDown)
      track.removeEventListener('pointermove', onPointerMove)
      track.removeEventListener('pointerup', endDrag)
      track.removeEventListener('pointercancel', endDrag)
    }
  }, [trackRef, syncOverflow, draggingClass])

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const track = trackRef.current
    if (!track || !hasOverflowRef.current) return

    const slide = slideSelector
      ? track.querySelector<HTMLElement>(slideSelector)
      : track.firstElementChild
    const step =
      slide instanceof HTMLElement
        ? slide.offsetWidth + parseFloat(getComputedStyle(track).gap || '0')
        : track.clientWidth * 0.35
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (event.key === 'ArrowRight') {
      event.preventDefault()
      track.scrollBy({ left: step, behavior: smooth ? 'smooth' : 'auto' })
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      track.scrollBy({ left: -step, behavior: smooth ? 'smooth' : 'auto' })
    }
  }

  return {
    handleKeyDown,
    hasOverflow: hasOverflowRef.current,
  }
}
