import { TbArrowRight, TbDownload } from 'react-icons/tb';
import { usePortfolio } from '../content/PortfolioContext';
import { CvDownload } from './CvDownload';
import { ProfilePhoto } from './ProfilePhoto';
import { ApprovalScreen, JournalScreen } from './WorkdayScreens';

export function Hero() {
  const { hero, modules, profile } = usePortfolio();
  const facts = [
    { value: `${profile.experience} yrs`, label: 'Workday Financials experience' },
    { value: String(modules.length), label: 'Financials modules' },
    { value: profile.currentClient, label: 'Current client' },
  ];

  return (
    <section className="hero" id="top">
      <div className="container hero__grid">
        <div className="hero__copy">
          <span className="eyebrow eyebrow--light">{profile.role}</span>
          <h1 className="hero__name">{profile.name}</h1>
          <p className="hero__lead">{hero.headline}</p>
          <div className="hero__actions">
            <a className="btn btn--accent" href="#contact">
              Get in touch <TbArrowRight aria-hidden="true" />
            </a>
            <CvDownload className="btn btn--outline-light">
              <TbDownload aria-hidden="true" /> Download CV
            </CvDownload>
          </div>
          <ul className="hero__facts">
            {facts.map((f) => (
              <li key={f.label}>
                <b>{f.value}</b>
                <span>{f.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="hero__visual">
          <ProfilePhoto src={profile.photo} className="hero__photo" />
          <ApprovalScreen className="hero__screen hero__screen--approval" />
          <JournalScreen className="hero__screen hero__screen--journal" />
        </div>
      </div>
    </section>
  );
}
