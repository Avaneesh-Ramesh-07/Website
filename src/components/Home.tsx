import { content } from '../content'
import { useTypewriter } from '../hooks/useTypewriter'

export default function Home() {
  const { greeting, name, tagline, ctaPrimary, ctaSecondary, photo } = content.home
  const { displayed, done } = useTypewriter(tagline)

  return (
    <section id="home">
      <div className="home-bg" aria-hidden="true" />
      <div className="container">
        <div className="home-content">
          <div className="home-text">
            <p className="home-greeting">{greeting}</p>
            <h1 className="home-name">{name}</h1>
            <p className="home-tagline">
              {displayed}
              {!done && <span className="typewriter-cursor" aria-hidden="true" />}
            </p>
            <div className="home-ctas">
              <a href="#experience" className="btn btn-primary">{ctaPrimary}</a>
              <a href="#contact"    className="btn btn-outline">{ctaSecondary}</a>
            </div>
          </div>

          <div className="home-photo-wrap">
            {photo ? (
              <img src={photo} alt={name} />
            ) : (
              <div className="home-photo-placeholder" aria-hidden="true">
                {name.charAt(0)}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
