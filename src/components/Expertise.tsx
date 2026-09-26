import { useState, type CSSProperties } from 'react';
import type { IconType } from 'react-icons';
import {
  TbBook2,
  TbBriefcase,
  TbBuildingWarehouse,
  TbChevronDown,
  TbDatabaseImport,
  TbFileDollar,
  TbHierarchy2,
  TbReportAnalytics,
  TbShieldLock,
  TbShoppingCart,
} from 'react-icons/tb';
import { profile, workAreas, type WorkArea } from '../data/resume';
import { SectionHeading } from './SectionHeading';

/** Work area slug → icon. Unknown slugs get a briefcase. */
const icons: Record<string, IconType> = {
  'general-ledger': TbBook2,
  'procure-to-pay': TbShoppingCart,
  'accounts-receivable': TbFileDollar,
  'fixed-assets': TbBuildingWarehouse,
  'worktags-organizations': TbHierarchy2,
  'security-business-processes': TbShieldLock,
  'eib-data-migration': TbDatabaseImport,
  'reporting-support': TbReportAnalytics,
};

const PREVIEW = 3;

function AreaCard({ area }: Readonly<{ area: WorkArea }>) {
  const [open, setOpen] = useState(false);
  const Icon = icons[area.slug] ?? TbBriefcase;
  const shown = open ? area.responsibilities : area.responsibilities.slice(0, PREVIEW);
  const hidden = area.responsibilities.length - PREVIEW;

  return (
    <article className="area" id={area.slug} style={{ '--tone': area.accent } as CSSProperties}>
      <header className="area__head">
        <span className="area__icon">
          <Icon aria-hidden="true" />
        </span>
        <div>
          <h3>{area.name}</h3>
          <p>{area.tagline}</p>
        </div>
      </header>
      <p className="area__desc">{area.description}</p>
      <ul className="area__list">
        {shown.map((r) => (
          <li key={r}>{r}</li>
        ))}
      </ul>
      {hidden > 0 && (
        <button className="link-btn" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          {open ? 'Show less' : `Show ${hidden} more`}
          <TbChevronDown className={open ? 'is-flipped' : ''} aria-hidden="true" />
        </button>
      )}
      <div className="area__tags">
        {area.tech.map((t) => (
          <span key={t} className="worktag">
            {t}
          </span>
        ))}
      </div>
    </article>
  );
}

export function Expertise() {
  return (
    <section className="section" id="expertise">
      <div className="container">
        <SectionHeading
          eyebrow="Areas of expertise"
          title="What I deliver in a Workday tenant"
          intro={`Configuration, data and support work from my ${profile.currentClient} engagement, grouped by area.`}
        />
        <div className="area-grid">
          {workAreas.map((a) => (
            <AreaCard key={a.slug} area={a} />
          ))}
        </div>
      </div>
    </section>
  );
}
