import { useState } from 'react'
import { content } from '../content'

const NAV_ITEMS = [
  { label: 'Home',          href: '#home' },
  { label: 'About Me',      href: '#about' },
  { label: 'Experience',    href: '#experience' },
  { label: 'Projects',      href: '#projects' },
  { label: 'Outside of CS', href: '#outside-cs' },
  { label: 'Contact Me',    href: '#contact' },
]

interface Props { activeSection: string }

export default function Nav({ activeSection }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <nav className="nav">
      <div className="container nav-inner">
        <a href="#home" className="nav-logo">{content.nav.logo}</a>

        <ul className={`nav-links${open ? ' open' : ''}`}>
          {NAV_ITEMS.map(({ label, href }) => {
            const id = href.slice(1)
            return (
              <li key={id}>
                <a
                  href={href}
                  className={activeSection === id ? 'active' : ''}
                  onClick={() => setOpen(false)}
                >
                  {label}
                </a>
              </li>
            )
          })}
        </ul>

        <button
          className="nav-hamburger"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  )
}
