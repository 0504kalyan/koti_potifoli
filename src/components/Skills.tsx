import type { CSSProperties } from 'react';
import { skills } from '../data/resume';
import { getSkillIcon } from './skillIcons';
import { SectionHeading } from './SectionHeading';

export function Skills() {
  return (
    <section className="section" id="skills">
      <div className="container">
        <SectionHeading eyebrow="Skills" title="Functional and technical competencies" />
        <div className="skill-grid">
          {skills.map((g) => (
            <div key={g.title} className="skill-group">
              <h3>{g.title}</h3>
              <ul>
                {g.items.map((i) => {
                  const { icon: Icon, color } = getSkillIcon(i);
                  return (
                    <li key={i} className="chip" style={{ '--tone': color } as CSSProperties}>
                      <Icon aria-hidden="true" />
                      {i}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
