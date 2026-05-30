import SectionLabel from '@/components/ui/SectionLabel'
import ContactForm from '@/components/ui/ContactForm'
import { ABOUT_COPY, CONTACT_COPY } from '@/lib/content'

// ─────────────────────────────────────────────────────────────────────────────
// components/sections/Contact.tsx — Contacto + footer (paridad HTML v3 #contact)
// Layout: .contact-top grid 2 cols — .contact-head | .contact-details
// Tipografía: .contact-heading en globals.css (clamp por breakpoint, sin colisión)
// Fondo: .section-bg-a--contact en page.tsx · grain global (GrainOverlay)
// SSG: datos estaticos + formulario cliente (envio externo).
// ─────────────────────────────────────────────────────────────────────────────

const CVAL_CLASS = [
  'font-display font-normal text-petal',
  'text-[clamp(14px,1.5vw,20px)] tracking-[-0.01em]',
  'inline-block pb-1 w-fit max-w-full',
  'border-b border-petal/15',
].join(' ')

const CVAL_LINK_CLASS = [
  CVAL_CLASS,
  'transition-[color,border-color] duration-[var(--duration-fast)] ease-[var(--ease-out-expo)]',
  'hover:text-lavender hover:border-lavender',
  'focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-lavender',
].join(' ')

export default function Contact() {
  const detailItems = CONTACT_COPY.items.filter((item) => item.id !== 'email')

  return (
    <section
      id="contact"
      className="relative overflow-hidden section-pad-contact"
      aria-labelledby="contact-heading"
    >
      <div className="contact-inner container-editorial">

        <div className="contact-top contact-enter-top">

          <div className="contact-head">
            <SectionLabel index={CONTACT_COPY.sectionIndex} text={CONTACT_COPY.sectionLabel} lineFull />

            <h2 id="contact-heading" className="contact-heading">
              <span className="contact-glitch">{CONTACT_COPY.headingGlitch}</span>
              <em className="contact-heading-accent">{CONTACT_COPY.headingAccent}</em>
            </h2>

            <p className="contact-intro type-lead">
              {CONTACT_COPY.intro}
            </p>

            <div className="contact-email-badge-wrap">
              <span className="contact-email-badge-label">{CONTACT_COPY.labels.email}</span>
              <a href={`mailto:${CONTACT_COPY.email}`} className="contact-email-badge">
                <MailIcon />
                {CONTACT_COPY.email}
              </a>
            </div>

            <div className="contact-social-wrap">
              <p className="type-nano text-petal/45">{CONTACT_COPY.labels.social}</p>
              <div className="contact-social-list">
                {ABOUT_COPY.socialLinks.map((social) => (
                  <a
                    key={social.id}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={[
                      'about-pill',
                      'contact-social-pill',
                      'inline-flex items-center gap-2.5',
                      'hover:-translate-y-[1px]',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lavender focus-visible:ring-offset-2 focus-visible:ring-offset-void',
                    ].join(' ')}
                    aria-label={`Abrir ${social.label} de Madeleine (nueva pestaña)`}
                  >
                    {social.id === 'instagram'
                      ? <InstagramIcon />
                      : social.id === 'linkedin'
                        ? <LinkedInIcon />
                        : <WhatsAppIcon />}
                    <span>{social.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="contact-details">
            {detailItems.map((item) => (
              <div key={item.id} className="contact-item">
                <span className="clabel type-nano uppercase tracking-[0.18em] text-lavender/45">
                  {item.label}
                </span>
                {item.link ? (
                  <a href={item.href} className={`cval ${CVAL_LINK_CLASS}`}>
                    {item.value}
                  </a>
                ) : (
                  <span className={`cval ${CVAL_CLASS}`}>{item.value}</span>
                )}
              </div>
            ))}

            <ContactForm
              recipientEmail={CONTACT_COPY.email}
              ctaLabel={CONTACT_COPY.cta}
              defaultTemplate={CONTACT_COPY.messageTemplate}
            />
          </div>
        </div>

        <footer className="contact-footer" role="contentinfo">
          <span className="type-nano tracking-[0.18em] text-petal/25">
            {CONTACT_COPY.footer.copy}
          </span>
          <span className="type-nano tracking-[0.15em] text-petal/25 md:text-center">
            {CONTACT_COPY.footer.tagline}
          </span>
          <span className="type-nano tracking-[0.15em] text-petal/25 md:text-right">
            {CONTACT_COPY.labels.madeWith}{' '}
            <span className="text-magenta" aria-hidden="true">
              ♥
            </span>
            <span className="sr-only"> amor </span>
            {CONTACT_COPY.footer.madeIn}
          </span>
        </footer>

      </div>
    </section>
  )
}

function MailIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="contact-email-badge__icon"
    >
      <path
        d="M3 6.5A1.5 1.5 0 0 1 4.5 5h15A1.5 1.5 0 0 1 21 6.5v11a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5v-11Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="m4.2 7.2 7.06 5.22a1.3 1.3 0 0 0 1.54 0L19.8 7.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" className="text-lavender">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" className="text-lavender">
      <path
        fill="currentColor"
        d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.03-1.85-3.03-1.85 0-2.14 1.44-2.14 2.93v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.28 2.36 4.28 5.45v6.29ZM5.34 7.43A2.06 2.06 0 1 1 5.34 3.3a2.06 2.06 0 0 1 0 4.13Zm1.78 13.02H3.56V9h3.56v11.45Z"
      />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" className="text-lavender">
      <path
        fill="currentColor"
        d="M20.52 3.48A11.86 11.86 0 0 0 12.07 0C5.47 0 .1 5.37.1 11.97c0 2.11.55 4.17 1.6 5.99L0 24l6.22-1.64a11.95 11.95 0 0 0 5.84 1.49h.01c6.6 0 11.97-5.37 11.97-11.97 0-3.2-1.25-6.2-3.52-8.4ZM12.07 21.8h-.01a9.9 9.9 0 0 1-5.03-1.37l-.36-.21-3.69.97.99-3.6-.24-.37a9.9 9.9 0 0 1-1.53-5.25c0-5.45 4.43-9.88 9.88-9.88a9.8 9.8 0 0 1 7 2.91 9.8 9.8 0 0 1 2.89 6.97c0 5.45-4.43 9.88-9.88 9.88Zm5.42-7.4c-.3-.15-1.76-.87-2.03-.96-.27-.1-.47-.15-.66.15-.2.3-.76.96-.93 1.16-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.37-1.48a8.78 8.78 0 0 1-1.64-2.04c-.17-.3-.02-.46.13-.6.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.08-.15-.66-1.6-.91-2.18-.24-.58-.48-.5-.66-.51h-.56c-.2 0-.52.08-.8.37-.27.3-1.04 1.01-1.04 2.47 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.09 4.48.71.31 1.27.5 1.7.64.72.23 1.37.2 1.89.12.58-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.18-1.41-.08-.12-.27-.2-.57-.35Z"
      />
    </svg>
  )
}
