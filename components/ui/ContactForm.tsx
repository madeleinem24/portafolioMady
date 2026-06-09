'use client'

import { FormEvent, useState } from 'react'

import { isContactFormConfigured, sendContactEmail } from '@/lib/contact-form'

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
  const [isSending, setIsSending] = useState(false)
  const [statusMessage, setStatusMessage] = useState(INITIAL_STATUS)
  const [statusTone, setStatusTone] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSending(true)
    setStatusMessage(INITIAL_STATUS)
    setStatusTone('idle')

    try {
      await sendContactEmail(
        {
          name: form.name,
          email: form.email,
          message: form.message,
        },
        recipientEmail
      )

      setForm((prev) => ({
        ...prev,
        name: '',
        email: '',
        message: defaultTemplate,
      }))
      setStatusTone('success')
      setStatusMessage('Mensaje enviado. Revisa tu bandeja de entrada en unos segundos.')
    } catch (error) {
      setStatusTone('error')
      setStatusMessage(
        isContactFormConfigured()
          ? 'No pudimos enviarlo. Intenta de nuevo o usa WhatsApp.'
          : 'El formulario aún no está configurado. Usa el correo o WhatsApp por ahora.'
      )
      if (process.env.NODE_ENV === 'development' && error instanceof Error) {
        console.error(error.message)
      }
    } finally {
      setIsSending(false)
    }
  }

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
            rows={7}
            required
          />
        </label>
      </div>

      <input
        type="text"
        name="_honey"
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

        <button type="submit" className="contact-cta" disabled={isSending}>
          {isSending ? 'Enviando...' : ctaLabel}
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
