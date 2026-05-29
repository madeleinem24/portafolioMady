// ─────────────────────────────────────────────────────────────────────────────
// lib/skills.ts — Chips de herramientas y disciplinas (HTML v3 #skills)
// ADR-005: datos en TypeScript
// ─────────────────────────────────────────────────────────────────────────────

import type { SkillChipData } from '@/lib/types'

export const SOFTWARE_SKILLS: SkillChipData[] = [
  { icon: '🎨', name: 'Photoshop',     sub: 'Retoque & Composición' },
  { icon: '✒️', name: 'Illustrator',   sub: 'Vectores & Branding' },
  { icon: '📐', name: 'InDesign',      sub: 'Diseño Editorial' },
  { icon: '🎬', name: 'Premiere Pro',  sub: 'Edición de Video' },
  { icon: '⚡', name: 'After Effects', sub: 'Motion Graphics' },
  { icon: '🖌️', name: 'Figma',         sub: 'UI & Prototipos' },
  { icon: '📷', name: 'Lightroom',     sub: 'Edición Fotográfica' },
  { icon: '🎵', name: 'CapCut',        sub: 'UGC & Social' },
  { icon: '🟣', name: 'Canva Pro',     sub: 'Diseño Rápido' },
]

export const DISCIPLINE_SKILLS: SkillChipData[] = [
  { icon: '🎭', name: 'Animación 2D',  sub: 'Frame by Frame' },
  { icon: '📸', name: 'Fotografía',    sub: 'Producto & Lifestyle' },
  { icon: '📱', name: 'TikTok / Reels', sub: 'UGC Auténtico' },
  { icon: '🏷️', name: 'Branding',      sub: 'Identidad Visual' },
  { icon: '📝', name: 'Copywriting',   sub: 'Guión & Copy' },
  { icon: '🖥️', name: 'Producción AV', sub: 'Set & Postprod.' },
  { icon: '🌐', name: 'Social Media',  sub: 'Estrategia & Feed' },
  { icon: '🎯', name: 'Dir. de Arte',  sub: 'Concepto & Mood' },
]
