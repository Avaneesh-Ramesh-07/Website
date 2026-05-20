import { content } from '../content'
import TiltCard from './TiltCard'

export default function Projects() {
  const { heading, categories } = content.projects

  return (
    <section id="projects">
      <div className="container">
        <div className="section-title">
          <h2>{heading}</h2>
        </div>

        {categories.map((cat) => (
          <div key={cat.label} className="project-category">
            <h3 className="project-category-label">{cat.label}</h3>

            {cat.items.length === 0 ? (
              <p className="project-category-empty">Coming soon.</p>
            ) : (
              <div className="cards-grid">
                {cat.items.map((item, i) => (
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
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
