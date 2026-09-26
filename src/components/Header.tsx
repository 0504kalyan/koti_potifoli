import { useEffect, useState } from 'react';
import { TbDownload, TbMenu2, TbX } from 'react-icons/tb';
import { profile } from '../data/resume';

/** Page sections in scroll order; each `id` matches a <section id> in the page. */
const sections = [
  { id: 'modules', label: 'Modules' },
  { id: 'processes', label: 'Processes' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

/** The id of the section currently in the middle of the viewport. */
function useActiveSection() {
  const [active, setActive] = useState('');

  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter((e): e is HTMLElement => e !== null);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);

  return active;
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className={`header ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <div className="container header__inner">
        <a href="#top" className="brand" onClick={close}>
          <span className="brand__mark">{profile.initials}</span>
          <span className="brand__text">
            <b>{profile.shortName}</b>
            <small>Workday FSCM Consultant</small>
          </span>
        </a>

        <nav className="nav" id="site-nav" aria-label="Sections">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`nav__link ${active === s.id ? 'is-active' : ''}`}
              aria-current={active === s.id ? 'true' : undefined}
              onClick={close}
            >
              {s.label}
            </a>
          ))}
          <a className="btn btn--primary btn--sm nav__cv" href={profile.resumeFile} download>
            <TbDownload aria-hidden="true" /> CV
          </a>
        </nav>

        <button
          className="menu-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <TbX size={24} /> : <TbMenu2 size={24} />}
        </button>
      </div>
    </header>
  );
}
