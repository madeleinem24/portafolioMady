export const CONTACT_FORM_LIMITS = {
  nameMin: 2,
  nameMax: 80,
  emailMax: 254,
  messageMin: 10,
  messageMax: 2000,
  cooldownMs: 60_000,
} as const

export const CONTACT_FORM_COOLDOWN_KEY = 'portfolio-contact-last-sent'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export interface ContactFormInput {
  name: string
  email: string
  message: string
  honeypot: string
}

export interface SanitizedContactPayload {
  name: string
  email: string
  message: string
}

export class ContactFormRejectedError extends Error {
  readonly reason: 'validation' | 'cooldown'

  constructor(message: string, reason: 'validation' | 'cooldown' = 'validation') {
    super(message)
    this.name = 'ContactFormRejectedError'
    this.reason = reason
  }
}

export function isHoneypotTriggered(honeypot: string): boolean {
  return honeypot.trim().length > 0
}

export function getCooldownRemainingMs(now = Date.now()): number {
  if (typeof window === 'undefined') return 0

  const raw = window.localStorage.getItem(CONTACT_FORM_COOLDOWN_KEY)
  if (!raw) return 0

  const lastSent = Number(raw)
  if (!Number.isFinite(lastSent)) return 0

  const elapsed = now - lastSent
  return Math.max(0, CONTACT_FORM_LIMITS.cooldownMs - elapsed)
}

export function getCooldownRemainingSeconds(now = Date.now()): number {
  return Math.ceil(getCooldownRemainingMs(now) / 1000)
}

export function markContactFormSent(now = Date.now()): void {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(CONTACT_FORM_COOLDOWN_KEY, String(now))
}

export function assertCooldownClear(now = Date.now()): void {
  const remainingMs = getCooldownRemainingMs(now)
  if (remainingMs <= 0) return

  const seconds = Math.ceil(remainingMs / 1000)
  throw new ContactFormRejectedError(
    `Espera ${seconds} segundos antes de enviar otro mensaje.`,
    'cooldown'
  )
}

export function validateAndSanitizeContactInput(
  input: ContactFormInput
): SanitizedContactPayload {
  const name = input.name.trim()
  const email = input.email.trim().toLowerCase()
  const message = input.message.trim()

  if (name.length < CONTACT_FORM_LIMITS.nameMin) {
    throw new ContactFormRejectedError('Escribe tu nombre (mínimo 2 caracteres).')
  }

  if (name.length > CONTACT_FORM_LIMITS.nameMax) {
    throw new ContactFormRejectedError('El nombre es demasiado largo.')
  }

  if (!email || !EMAIL_PATTERN.test(email) || email.length > CONTACT_FORM_LIMITS.emailMax) {
    throw new ContactFormRejectedError('Ingresa un correo válido.')
  }

  if (message.length < CONTACT_FORM_LIMITS.messageMin) {
    throw new ContactFormRejectedError('El mensaje es muy corto (mínimo 10 caracteres).')
  }

  if (message.length > CONTACT_FORM_LIMITS.messageMax) {
    throw new ContactFormRejectedError('El mensaje es demasiado largo.')
  }

  return { name, email, message }
}
