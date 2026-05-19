import { content } from '../content'

export default function Experience() {
  const { heading, jobs } = content.experience

  return (
    <section id="experience">
      <div className="container">
        <div className="section-title">
          <h2>{heading}</h2>
        </div>

        <div className="timeline">
          {jobs.map((job, i) => (
            <div key={i} className="timeline-item">
              <div className="timeline-dot" aria-hidden="true" />

              <div className="job-header">
                <div>
                  <div className="job-role">{job.role}</div>
                  <div className="job-company">{job.company}</div>
                </div>
                <div className="job-meta">
                  <div>{job.period}</div>
                  <div>{job.location}</div>
                </div>
              </div>

              <ul className="job-bullets">
                {job.bullets.map((bullet, j) => (
                  <li key={j}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
