'use client'

import { FormEvent, useEffect, useState } from 'react'

import { isContactFormConfigured, sendContactEmail } from '@/lib/contact-form'
import {
  assertCooldownClear,
  CONTACT_FORM_LIMITS,
  ContactFormRejectedError,
  getCooldownRemainingSeconds,
  isHoneypotTriggered,
  markContactFormSent,
  validateAndSanitizeContactInput,
} from '@/lib/contact-form-guard'

interface ContactFormProps {
  recipientEmail: string
  ctaLabel: string
  defaultTemplate: string
}

interface ContactFormState {
  name: string
  email: string
  message: string
}

const INITIAL_STATUS = ''
const SUCCESS_MESSAGE = 'Mensaje enviado. Revisa tu bandeja de entrada en unos segundos.'

export default function ContactForm({
  recipientEmail,
  ctaLabel,
  defaultTemplate,
}: ContactFormProps) {
  const [form, setForm] = useState<ContactFormState>({
    name: '',
    email: '',
    message: defaultTemplate,
  })
  const [honeypot, setHoneypot] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [cooldownSeconds, setCooldownSeconds] = useState(0)
  const [statusMessage, setStatusMessage] = useState(INITIAL_STATUS)
  const [statusTone, setStatusTone] = useState<'idle' | 'success' | 'error'>('idle')

  useEffect(() => {
    const syncCooldown = () => {
      setCooldownSeconds(getCooldownRemainingSeconds())
    }

    syncCooldown()
    const intervalId = window.setInterval(syncCooldown, 1000)
    return () => window.clearInterval(intervalId)
  }, [])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSending(true)
    setStatusMessage(INITIAL_STATUS)
    setStatusTone('idle')

    try {
      if (isHoneypotTriggered(honeypot)) {
        setForm({ name: '', email: '', message: defaultTemplate })
        setStatusTone('success')
        setStatusMessage(SUCCESS_MESSAGE)
        return
      }

      assertCooldownClear()

      const payload = validateAndSanitizeContactInput({
        name: form.name,
        email: form.email,
        message: form.message,
        honeypot,
      })

      await sendContactEmail(payload, recipientEmail)

      markContactFormSent()
      setCooldownSeconds(getCooldownRemainingSeconds())

      setForm({
        name: '',
        email: '',
        message: defaultTemplate,
      })
      setStatusTone('success')
      setStatusMessage(SUCCESS_MESSAGE)
    } catch (error) {
      setStatusTone('error')

      if (error instanceof ContactFormRejectedError) {
        setStatusMessage(error.message)
      } else {
        setStatusMessage(
          isContactFormConfigured()
            ? 'No pudimos enviarlo. Intenta de nuevo o usa WhatsApp.'
            : 'El formulario aún no está configurado. Usa el correo o WhatsApp por ahora.'
        )
      }

      if (process.env.NODE_ENV === 'development' && error instanceof Error) {
        console.error(error.message)
      }
    } finally {
      setIsSending(false)
    }
  }

  const isSubmitDisabled = isSending || cooldownSeconds > 0
  const submitLabel = isSending
    ? 'Enviando...'
    : cooldownSeconds > 0
      ? `Espera ${cooldownSeconds}s`
      : ctaLabel

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-form-grid">
        <label className="contact-field">
          <span className="clabel type-nano uppercase tracking-[0.18em] text-lavender/45">
            Nombre
          </span>
          <input
            type="text"
            name="name"
            className="contact-input"
            value={form.name}
            onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
            autoComplete="name"
            maxLength={CONTACT_FORM_LIMITS.nameMax}
            required
          />
        </label>

        <label className="contact-field">
          <span className="clabel type-nano uppercase tracking-[0.18em] text-lavender/45">
            Correo
          </span>
          <input
            type="email"
            name="email"
            className="contact-input"
            value={form.email}
            onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
            autoComplete="email"
            maxLength={CONTACT_FORM_LIMITS.emailMax}
            required
          />
        </label>

        <label className="contact-field contact-field-full">
          <span className="clabel type-nano uppercase tracking-[0.18em] text-lavender/45">
            Mensaje
          </span>
          <textarea
            name="message"
            className="contact-textarea"
            value={form.message}
            onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
            rows={12}
            maxLength={CONTACT_FORM_LIMITS.messageMax}
            required
          />
        </label>
      </div>

      <input
        type="text"
        name="company"
        value={honeypot}
        onChange={(event) => setHoneypot(event.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="sr-only"
      />

      <div className="contact-actions">
        <button
          type="button"
          className="contact-template-btn"
          onClick={() => setForm((prev) => ({ ...prev, message: defaultTemplate }))}
        >
          Usar plantilla
        </button>

        <button type="submit" className="contact-cta" disabled={isSubmitDisabled}>
          {submitLabel}
        </button>
      </div>

      <p
        role="status"
        aria-live="polite"
        className={`contact-status contact-status--${statusTone}`}
      >
        {statusMessage}
      </p>
    </form>
  )
}
