'use client'
// ─────────────────────────────────────────────────────────────────────────────
// components/layout/CustomCursor.tsx — Cursor personalizado (MASTER.md §VI.3)
// Solo activo en dispositivos pointer: fine (mouse / trackpad).
// En touch (coarse) → no se monta, cursor nativo del sistema.
// Usa .cursor-ring + .cursor-dot de globals.css.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Solo en dispositivos con puntero preciso (ratón/trackpad)
    if (!window.matchMedia('(pointer: fine)').matches) return
    // Respeta preferencia de movimiento reducido (WCAG 2.3.3)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ring = ringRef.current
    const dot  = dotRef.current
    if (!ring || !dot) return

    // Ocultar cursor nativo
    document.body.style.cursor = 'none'

    // Posición del ring con requestAnimationFrame para máxima fluidez
    let mouseX  = -200
    let mouseY  = -200
    let rafId   = 0

    const loop = () => {
      ring.style.left = `${mouseX}px`
      ring.style.top  = `${mouseY}px`
      rafId = requestAnimationFrame(loop)
    }
    rafId = requestAnimationFrame(loop)

    // El dot sigue el cursor directamente (sin lag)
    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.left = `${mouseX}px`
      dot.style.top  = `${mouseY}px`
    }

    // Estado hover — interactivos agrandan el ring
    const onEnter = () => ring.classList.add('is-hovering')
    const onLeave = () => ring.classList.remove('is-hovering')

    const bindInteractives = () => {
      document
        .querySelectorAll<HTMLElement>('a, button, [role="button"], label[for]')
        .forEach((el) => {
          el.addEventListener('mouseenter', onEnter)
          el.addEventListener('mouseleave', onLeave)
        })
    }
    bindInteractives()

    // Re-bind cuando el DOM cambie (SPA navigation, hydration)
    const observer = new MutationObserver(bindInteractives)
    observer.observe(document.body, { childList: true, subtree: true })

    window.addEventListener('mousemove', onMove)

    // Ocultar al salir de la ventana
    const onLeaveDoc = () => {
      ring.style.opacity = '0'
      dot.style.opacity  = '0'
    }
    const onEnterDoc = () => {
      ring.style.opacity = ''
      dot.style.opacity  = ''
    }
    document.addEventListener('mouseleave', onLeaveDoc)
    document.addEventListener('mouseenter', onEnterDoc)

    return () => {
      cancelAnimationFrame(rafId)
      document.body.style.cursor = ''
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeaveDoc)
      document.removeEventListener('mouseenter', onEnterDoc)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef}  className="cursor-dot"  aria-hidden="true" />
    </>
  )
}
