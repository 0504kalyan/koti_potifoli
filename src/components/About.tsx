import { TbBulb, TbSchool } from 'react-icons/tb';
import { coreConcepts, education, summary } from '../data/resume';
import { SectionHeading } from './SectionHeading';

export function About() {
  return (
    <section className="section section--tint" id="about">
      <div className="container about">
        <div className="about__text">
          <SectionHeading eyebrow="About me" title="A functional consultant who owns the details" />
          {summary.map((s) => (
            <p key={s}>{s}</p>
          ))}
        </div>

        <aside className="about__side">
          <div className="info-card">
            <h3>
              <TbSchool aria-hidden="true" /> Education
            </h3>
            <p className="info-card__main">{education.degree}</p>
            <p>
              {education.university}, {education.year}
              {education.score && ` (${education.score})`}
            </p>
          </div>
          <div className="info-card">
            <h3>
              <TbBulb aria-hidden="true" /> Core concepts
            </h3>
            <ul className="info-card__list">
              {coreConcepts.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}
