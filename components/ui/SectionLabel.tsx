// ─────────────────────────────────────────────────────────────────────────────
// components/ui/SectionLabel.tsx — Etiqueta de sección editorial
// Patrón: "01 · Sobre mí" + línea decorativa opcional
// Server Component
// ─────────────────────────────────────────────────────────────────────────────

interface SectionLabelProps {
  /** Número con cero padding — ej: "01", "02" */
  index: string
  /** Texto de la etiqueta — ej: "Proyectos", "Contacto" */
  text: string
  /** Línea horizontal decorativa al final */
  showLine?: boolean
  /** Línea hasta el borde del contenedor (sin max-width) */
  lineFull?: boolean
  className?: string
}

export default function SectionLabel({
  index,
  text,
  showLine = true,
  lineFull = false,
  className = '',
}: SectionLabelProps) {
  return (
    <p
      className={[
        'flex items-center gap-3.5',
        'font-mono text-[length:var(--text-label)] uppercase tracking-[0.28em] text-lavender',
        className,
      ].join(' ')}
    >
      <span className="type-nano text-lavender/35">{index}</span>
      <span aria-hidden="true" className="text-lavender/35">·</span>
      {text}
      {showLine && (
        <span
          className={[
            'h-px flex-1 bg-lavender/15',
            lineFull ? '' : 'max-w-[5rem]',
          ].join(' ')}
          aria-hidden="true"
        />
      )}
    </p>
  )
}
