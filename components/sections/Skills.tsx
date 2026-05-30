'use client'
// ─────────────────────────────────────────────────────────────────────────────
// components/sections/Skills.tsx — Herramientas (HTML v3 #skills)
// Dos marquees: software + disciplinas · loop ×2 · skillsRoll 28s · pause hover/focus
// ─────────────────────────────────────────────────────────────────────────────

import { useRef } from 'react'

import SectionLabel from '@/components/ui/SectionLabel'
import { SKILLS_COPY } from '@/lib/content'
import { DISCIPLINE_SKILLS, SOFTWARE_SKILLS } from '@/lib/skills'
import type { SkillChipData } from '@/lib/types'

function SkillChip({ icon, name, sub }: SkillChipData) {
  return (
    <div className="skill-chip" aria-hidden="true">
      <span className="skill-chip-icon" aria-hidden="true">{icon}</span>
      <div>
        <div className="skill-chip-name">{name}</div>
        <div className="skill-chip-sub">{sub}</div>
      </div>
    </div>
  )
}

interface SkillsTrackProps {
  items:       SkillChipData[]
  reverse?:    boolean
  className?:  string
  ariaLabel:   string
}

function SkillsTrack({ items, reverse = false, className = '', ariaLabel }: SkillsTrackProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const track = [...items, ...items]

  const pause  = () => { trackRef.current?.classList.add('is-paused') }
  const resume = () => { trackRef.current?.classList.remove('is-paused') }

  return (
    <div
      className={['skills-track-outer', className].filter(Boolean).join(' ')}
      role="region"
      aria-label={ariaLabel}
      tabIndex={0}
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocus={pause}
      onBlur={resume}
    >
      <div
        ref={trackRef}
        className={['skills-track', reverse ? 'skills-track--reverse' : ''].filter(Boolean).join(' ')}
        aria-hidden="true"
      >
        {track.map((chip, i) => (
          <SkillChip key={`${chip.name}-${i}`} {...chip} />
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative overflow-hidden section-pad-skills"
      aria-labelledby="skills-heading"
    >
      <div className="container-editorial">
        <div className="skills-head skills-enter-head">
          <SectionLabel
            index={SKILLS_COPY.sectionIndex}
            text={SKILLS_COPY.sectionLabel}
            lineFull
            className="mb-4"
          />

          <h2
            id="skills-heading"
            className={[
              'font-display font-black text-canvas',
              'text-[clamp(2.25rem,5vw,4.5rem)]',
              'leading-[0.9] tracking-[-0.035em] uppercase',
            ].join(' ')}
          >
            {SKILLS_COPY.headingPrefix}
            <em
              className={[
                'font-serif italic font-normal',
                'text-magenta normal-case',
                'text-[1.05em] tracking-[-0.02em]',
              ].join(' ')}
            >
              {SKILLS_COPY.headingAccent}
            </em>
            <br />
            {SKILLS_COPY.headingLine2}
          </h2>
        </div>
      </div>

      <SkillsTrack
        items={SOFTWARE_SKILLS}
        ariaLabel={SKILLS_COPY.tracks.software}
        className="mt-10 md:mt-12"
      />

      <SkillsTrack
        items={DISCIPLINE_SKILLS}
        reverse
        ariaLabel={SKILLS_COPY.tracks.disciplines}
        className="skills-track-outer--disciplines"
      />
    </section>
  )
}
