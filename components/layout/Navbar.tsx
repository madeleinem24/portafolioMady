'use client'
// ─────────────────────────────────────────────────────────────────────────────
// components/layout/Navbar.tsx — Navegación principal
// Client Component: necesita estado de scroll y menú mobile.
// Scroll-aware: transparente arriba → blur/scrim al scrollear.
// Mobile-first: hamburger en <md, links inline en ≥md.
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { href: '#about',    label: 'Sobre mí'  },
  { href: '#services', label: 'Servicios' },
  { href: '#ugc',      label: 'Trabajo'   },
  { href: '#skills',   label: 'Skills'    },
  { href: '#contact',  label: 'Contacto'  },
] as const

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Cierra el menú al redimensionar a desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Escape cierra menú; bloquea scroll del body mientras está abierto
  useEffect(() => {
    if (!menuOpen) return

    document.body.style.overflow = 'hidden'

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  return (
    <header
      role="banner"
      className={[
        'fixed top-0 left-0 right-0 z-50',
        'transition-[background,border-color,backdrop-filter]',
        'duration-[var(--duration-base)] ease-[var(--ease-out-expo)]',
        scrolled
          ? 'bg-void/90 backdrop-blur-md border-b border-petal/6'
          : 'bg-gradient-to-b from-void/85 to-transparent',
      ].join(' ')}
    >
      {/* ── Barra principal ──────────────────────────────────────────────── */}
      <div className="nav-shell">

        {/* Logo */}
        <a
          href="#hero"
          className={[
            'type-label-sans text-canvas hover:text-lavender',
            'transition-colors duration-[var(--duration-fast)] ease-[var(--ease-out-expo)]',
            'focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-lavender',
          ].join(' ')}
          aria-label="Volver al inicio, Madeleine Morales"
        >
          M<span className="text-lavender" aria-hidden="true">.</span>Morales
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:block" aria-label="Navegación principal">
          <ul className="nav-links-list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="nav-link focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-lavender"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Hamburger (mobile) */}
        <button
          type="button"
          className={[
            'md:hidden flex flex-col items-center justify-center gap-1.5',
            'min-h-11 min-w-11 -mr-1',
            'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lavender',
          ].join(' ')}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span
            className={[
              'block h-px w-6 bg-petal origin-center',
              'transition-transform duration-[var(--duration-base)] ease-[var(--ease-out-expo)]',
              menuOpen ? 'translate-y-[7px] rotate-45' : '',
            ].join(' ')}
            aria-hidden="true"
          />
          <span
            className={[
              'block h-px w-6 bg-petal',
              'transition-opacity duration-[var(--duration-fast)]',
              menuOpen ? 'opacity-0' : 'opacity-100',
            ].join(' ')}
            aria-hidden="true"
          />
          <span
            className={[
              'block h-px w-6 bg-petal origin-center',
              'transition-transform duration-[var(--duration-base)] ease-[var(--ease-out-expo)]',
              menuOpen ? '-translate-y-[7px] -rotate-45' : '',
            ].join(' ')}
            aria-hidden="true"
          />
        </button>
      </div>

      {/* ── Menú mobile desplegable ──────────────────────────────────────── */}
      <nav
        id="mobile-menu"
        aria-label="Navegación móvil"
        className={[
          'md:hidden overflow-hidden',
          'transition-[max-height,opacity] duration-[var(--duration-base)] ease-[var(--ease-out-expo)]',
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pointer-events-none',
        ].join(' ')}
        aria-hidden={!menuOpen}
      >
        <ul
          className={[
            'flex flex-col gap-0 list-none pl-0',
            'border-t border-petal/6 bg-abyss/95 backdrop-blur-md',
            'px-6 py-6',
          ].join(' ')}
        >
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={[
                  'block py-3',
                  'font-mono text-[length:var(--text-label)] uppercase tracking-[0.12em]',
                  'text-petal/65 hover:text-lavender',
                  'border-b border-petal/4 last:border-0',
                  'transition-colors duration-[var(--duration-fast)] ease-[var(--ease-out-expo)]',
                  'focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-lavender',
                ].join(' ')}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
