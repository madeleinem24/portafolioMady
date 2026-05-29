'use client'

import { useEffect } from 'react'

/**
 * Actualiza `--scroll-progress` en el documento para `.scroll-progress-bar`
 * (globals.css). Valor calculado en runtime: excepción permitida (CLAUDE.md).
 */
export default function ScrollProgressBar() {
  useEffect(() => {
    const root = document.documentElement

    const update = () => {
      const scrollTop = root.scrollTop
      const scrollable = root.scrollHeight - root.clientHeight
      const ratio = scrollable > 0 ? scrollTop / scrollable : 0
      root.style.setProperty('--scroll-progress', `${Math.min(100, Math.max(0, ratio * 100))}%`)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      root.style.removeProperty('--scroll-progress')
    }
  }, [])

  return (
    <div
      id="scroll-bar"
      className="scroll-progress-bar"
      aria-hidden="true"
      role="presentation"
    />
  )
}
