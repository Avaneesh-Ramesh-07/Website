import { content } from '../content'
import TiltCard from './TiltCard'

export default function OutsideCS() {
  const { heading, subheading, items } = content.outsideCS

  return (
    <section id="outside-cs">
      <div className="container">
        <div className="section-title">
          <h2>{heading}</h2>
        </div>

        {subheading && <p className="other-subheading">{subheading}</p>}

        <div className="cards-grid">
          {items.map((item, i) => (
            <TiltCard key={i}>
              <h3 className="card-title">{item.title}</h3>
              <p className="card-desc">{item.description}</p>

              {item.tags.length > 0 && (
                <div className="card-tags">
                  {item.tags.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              )}

              {item.links.filter(l => l.href).length > 0 && (
                <div className="card-links">
                  {item.links.filter(l => l.href).map((l, j) => (
                    <a
                      key={j}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline card-link"
                    >
                      {l.label}
                    </a>
                  ))}
                </div>
              )}
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}
