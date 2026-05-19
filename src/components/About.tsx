import { content } from '../content'

export default function About() {
  const { heading, paragraphs, skills, skillsLabel } = content.about

  return (
    <section id="about">
      <div className="container">
        <div className="section-title">
          <h2>{heading}</h2>
        </div>

        <div className="about-grid">
          <div className="about-text">
            {paragraphs.map((text, i) => (
              <p key={i}>{text}</p>
            ))}
          </div>

          <div className="about-skills">
            <h3>{skillsLabel}</h3>
            <div className="skills-grid">
              {skills.map((skill) => (
                <div key={skill} className="skill-badge">{skill}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
