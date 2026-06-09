const EMAILJS_SEND_URL = 'https://api.emailjs.com/api/v1.0/email/send'

export interface ContactFormPayload {
  name: string
  email: string
  message: string
}

export interface ContactFormConfig {
  serviceId: string
  templateId: string
  publicKey: string
}

export function getContactFormConfig(): ContactFormConfig {
  return {
    serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? '',
    templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? '',
    publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? '',
  }
}

export function isContactFormConfigured(config: ContactFormConfig = getContactFormConfig()): boolean {
  return Boolean(config.serviceId && config.templateId && config.publicKey)
}

export async function sendContactEmail(
  payload: ContactFormPayload,
  recipientEmail: string,
  config: ContactFormConfig = getContactFormConfig()
): Promise<void> {
  if (!isContactFormConfigured(config)) {
    throw new Error('El formulario de contacto no está configurado.')
  }

  const response = await fetch(EMAILJS_SEND_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      lib_version: '4.4.1',
      user_id: config.publicKey,
      service_id: config.serviceId,
      template_id: config.templateId,
      template_params: {
        from_name: payload.name,
        from_email: payload.email,
        reply_to: payload.email,
        to_email: recipientEmail,
        message: payload.message,
        subject: `Nuevo mensaje del portafolio - ${payload.name}`,
      },
    }),
  })

  if (!response.ok) {
    throw new Error('No se pudo enviar el mensaje.')
  }
}
