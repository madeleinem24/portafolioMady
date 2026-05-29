#!/usr/bin/env node
/**
 * Comprime videos de produccion/ para subida a Cloudinary.
 * Requiere FFmpeg en PATH (winget install Gyan.FFmpeg).
 *
 * Uso:
 *   pnpm compress-video
 *   pnpm compress-video --preset web
 *   pnpm compress-video --preset 720p
 *   pnpm compress-video --preset all
 *   pnpm compress-video produccion/mi-reel.mp4 --preset web
 */

import { spawnSync } from 'node:child_process'
import { existsSync, readdirSync, statSync } from 'node:fs'
import { basename, dirname, extname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const DEFAULT_DIR = join(ROOT, 'produccion')

const PRESETS = {
  web: {
    suffix: '_web',
    args: [
      '-c:v',
      'libx264',
      '-preset',
      'slow',
      '-crf',
      '24',
      '-vf',
      'scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2',
      '-c:a',
      'aac',
      '-b:a',
      '128k',
    ],
  },
  '720p': {
    suffix: '_720p',
    args: [
      '-c:v',
      'libx264',
      '-preset',
      'slow',
      '-crf',
      '26',
      '-vf',
      'scale=720:1280:force_original_aspect_ratio=decrease,pad=720:1280:(ow-iw)/2:(oh-ih)/2',
      '-c:a',
      'aac',
      '-b:a',
      '96k',
    ],
  },
  small: {
    suffix: '_small',
    args: [
      '-c:v',
      'libx264',
      '-preset',
      'slow',
      '-crf',
      '28',
      '-c:a',
      'aac',
      '-b:a',
      '96k',
    ],
  },
}

const OUTPUT_SUFFIXES = Object.values(PRESETS).map((p) => p.suffix)

function parseArgs(argv) {
  const files = []
  let preset = 'web'

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]
    if (arg === '--preset' || arg === '-p') {
      preset = argv[++i] ?? 'web'
      continue
    }
    if (arg === '--help' || arg === '-h') {
      return { help: true }
    }
    if (!arg.startsWith('-')) {
      files.push(resolve(arg))
    }
  }

  return { files, preset, help: false }
}

function printHelp() {
  console.log(`
Comprime videos para Cloudinary (FFmpeg requerido).

Uso:
  pnpm compress-video [archivo.mp4] [--preset <nombre>]

Presets:
  web     → 1080p vertical, CRF 24 (~15–25 MB / 30s)  [default]
  720p    → 720p vertical, CRF 26 (~5–12 MB / 30s)
  small   → misma resolución, CRF 28 (máxima compresión)
  all     → genera web + 720p + small

Sin archivo: procesa todos los .mp4 en produccion/ (excluye salidas _web, _720p, _small).
`)
}

function hasFfmpeg() {
  const r = spawnSync('ffmpeg', ['-version'], { encoding: 'utf8', shell: true })
  return r.status === 0
}

function isSourceFile(name) {
  if (!name.toLowerCase().endsWith('.mp4')) return false
  return !OUTPUT_SUFFIXES.some((suffix) => name.includes(suffix))
}

function collectSources(paths) {
  if (paths.length > 0) {
    return paths.filter((p) => {
      if (!existsSync(p)) {
        console.error(`No existe: ${p}`)
        return false
      }
      return true
    })
  }

  if (!existsSync(DEFAULT_DIR)) {
    console.error(`Carpeta no encontrada: ${DEFAULT_DIR}`)
    return []
  }

  return readdirSync(DEFAULT_DIR)
    .filter(isSourceFile)
    .map((f) => join(DEFAULT_DIR, f))
}

function outputPath(input, preset) {
  const dir = dirname(input)
  const base = basename(input, extname(input))
  return join(dir, `${base}${PRESETS[preset].suffix}.mp4`)
}

function formatMb(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`
}

function compressOne(input, preset) {
  const out = outputPath(input, preset)
  const { args } = PRESETS[preset]

  console.log(`\n▶ ${basename(input)} → ${basename(out)} [${preset}]`)

  const ffmpegArgs = ['-y', '-i', input, ...args, '-movflags', '+faststart', out]
  const result = spawnSync('ffmpeg', ffmpegArgs, {
    stdio: 'inherit',
    shell: true,
  })

  if (result.status !== 0) {
    console.error(`Error al comprimir con preset "${preset}"`)
    return false
  }

  const before = statSync(input).size
  const after = statSync(out).size
  const pct = ((1 - after / before) * 100).toFixed(0)
  console.log(`✓ ${formatMb(before)} → ${formatMb(after)} (−${pct}%)`)
  return true
}

function resolvePresets(preset) {
  if (preset === 'all') return ['web', '720p', 'small']
  if (preset in PRESETS) return [preset]
  console.error(`Preset desconocido: "${preset}". Usa: web | 720p | small | all`)
  process.exit(1)
}

const { files, preset, help } = parseArgs(process.argv.slice(2))

if (help) {
  printHelp()
  process.exit(0)
}

if (!hasFfmpeg()) {
  console.error('FFmpeg no está en PATH. Instálalo con: winget install Gyan.FFmpeg')
  process.exit(1)
}

const sources = collectSources(files)
if (sources.length === 0) {
  console.error('No hay videos fuente para comprimir.')
  process.exit(1)
}

const presets = resolvePresets(preset)
let ok = true

for (const input of sources) {
  for (const p of presets) {
    if (!compressOne(input, p)) ok = false
  }
}

process.exit(ok ? 0 : 1)
