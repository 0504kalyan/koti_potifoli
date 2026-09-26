import type { IconType } from 'react-icons';
import { TbBrandLinkedin, TbDownload, TbMail, TbMapPin, TbPhone } from 'react-icons/tb';
import { contactIntro, profile } from '../data/resume';
import { SectionHeading } from './SectionHeading';

type Item = { key: string; label: string; value: string; href?: string; external?: boolean; Icon: IconType };

/** Contact methods; any with an empty value in `profile` is left out. */
export const contactItems: Item[] = [
  { key: 'email', label: 'Email', value: profile.email, href: `mailto:${profile.email}`, Icon: TbMail },
  { key: 'phone', label: 'Phone', value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}`, Icon: TbPhone },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    value: profile.linkedin.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, ''),
    href: profile.linkedin,
    external: true,
    Icon: TbBrandLinkedin,
  },
  { key: 'location', label: 'Location', value: profile.location, Icon: TbMapPin },
].filter((i) => i.value);

export function Contact() {
  return (
    <section className="section contact" id="contact">
      <div className="container contact__grid">
        <div>
          <SectionHeading eyebrow="Contact" title="Let's talk Workday Finance" intro={contactIntro} light />
          <a className="btn btn--accent" href={profile.resumeFile} download>
            <TbDownload aria-hidden="true" /> Download CV
          </a>
        </div>
        <ul className="contact__list">
          {contactItems.map(({ key, label, value, href, external, Icon }) => {
            const body = (
              <>
                <span className="contact__icon">
                  <Icon aria-hidden="true" />
                </span>
                <span>
                  <small>{label}</small>
                  <b>{value}</b>
                </span>
              </>
            );
            return (
              <li key={key}>
                {href ? (
                  <a className="contact__item" href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                    {body}
                  </a>
                ) : (
                  <div className="contact__item">{body}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
