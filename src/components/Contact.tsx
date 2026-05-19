import { useState, type FormEvent } from 'react'
import { content } from '../content'

type Status = 'idle' | 'success' | 'error'

export default function Contact() {
  const { heading, intro, email, socials, formLabels } = content.contact
  const [status, setStatus] = useState<Status>('idle')

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name    = data.get('name') as string
    const userEmail = data.get('email') as string
    const message = data.get('message') as string

    // Opens the user's mail client pre-filled. Replace with a real
    // form service (e.g. Formspree, EmailJS) when you're ready.
    const mailto =
      `mailto:${email}` +
      `?subject=${encodeURIComponent(`Message from ${name}`)}` +
      `&body=${encodeURIComponent(`From: ${name} (${userEmail})\n\n${message}`)}`

    try {
      window.location.href = mailto
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  const activeSocials = socials.filter((s) => s.href)

  return (
    <section id="contact">
      <div className="container">
        <div className="section-title">
          <h2>{heading}</h2>
        </div>

        <div className="contact-grid">
          {/* Left column — info */}
          <div>
            <p className="contact-intro">{intro}</p>

            <div className="contact-detail">
              <span>✉</span>
              <a href={`mailto:${email}`}>{email}</a>
            </div>

            {activeSocials.length > 0 && (
              <div className="contact-socials">
                {activeSocials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Right column — form */}
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="form-field">
              <label htmlFor="cf-name">{formLabels.name}</label>
              <input
                id="cf-name"
                name="name"
                type="text"
                placeholder="Jane Smith"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="cf-email">{formLabels.email}</label>
              <input
                id="cf-email"
                name="email"
                type="email"
                placeholder="jane@example.com"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="cf-message">{formLabels.message}</label>
              <textarea
                id="cf-message"
                name="message"
                placeholder="Hey, I'd love to chat about…"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              {formLabels.submit}
            </button>

            {status === 'success' && (
              <p className="form-status success">
                Your mail client should open with the message pre-filled.
              </p>
            )}
            {status === 'error' && (
              <p className="form-status error">
                Something went wrong — please email directly at {email}.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
