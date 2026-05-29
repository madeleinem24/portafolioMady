'use client'

import { FormEvent, useState } from 'react'

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
      const payload = new FormData()
      payload.append('name', form.name)
      payload.append('email', form.email)
      payload.append('message', form.message)
      payload.append('_subject', `Nuevo mensaje del portafolio - ${form.name}`)
      payload.append('_captcha', 'false')
      payload.append('_template', 'table')
      payload.append('_replyto', form.email)

      const response = await fetch(
        `https://formsubmit.co/ajax/${encodeURIComponent(recipientEmail)}`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
          },
          body: payload,
        }
      )

      if (!response.ok) {
        throw new Error('No se pudo enviar el mensaje.')
      }

      setForm((prev) => ({
        ...prev,
        name: '',
        email: '',
        message: defaultTemplate,
      }))
      setStatusTone('success')
      setStatusMessage('Mensaje enviado. Revisa tu Gmail en unos segundos.')
    } catch {
      setStatusTone('error')
      setStatusMessage('No pudimos enviarlo. Intenta de nuevo o usa WhatsApp.')
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
