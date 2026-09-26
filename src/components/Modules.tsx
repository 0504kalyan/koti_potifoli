import type { CSSProperties } from 'react';
import { modules } from '../data/resume';
import { getSkillIcon } from './skillIcons';
import { SectionHeading } from './SectionHeading';

export function Modules() {
  return (
    <section className="section" id="modules">
      <div className="container">
        <SectionHeading
          eyebrow="Workday Financials"
          title="Modules I configure and support"
          intro="Hands-on across the core Financials suite, for implementation work and day-to-day production support."
        />
        <div className="module-grid">
          {modules.map((m) => {
            const { icon: Icon, color } = getSkillIcon(m.name);
            return (
              <article key={m.name} className="module" style={{ '--tone': color } as CSSProperties}>
                <div className="module__top">
                  <span className="module__icon">
                    <Icon aria-hidden="true" />
                  </span>
                  <span className="module__code">{m.code}</span>
                </div>
                <h3>{m.name}</h3>
                <p>{m.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
