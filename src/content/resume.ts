// Generated CVs: when profile.resumeAuto is on, the build writes the CV (PDF and Word) from the
// portfolio's own content (see resume/generate.ts), so edits made in the admin appear in the CV on
// the next deploy. This module names those files; the site and the build both use it.
import type { PortfolioContent } from './types';

/** "Koteswara Rao Doppalapudi" → "/Resume-Koteswara-Rao-Doppalapudi" (site path, no extension). */
export function resumePath(name: string): string {
  const person = name
    .normalize('NFKD')
    .split(/\s+/)
    .map((w) => w.replace(/[^A-Za-z0-9]/g, ''))
    .filter(Boolean)
    .join('-');
  return `/Resume-${person || 'CV'}`;
}

/** Points the CV links at the generated files when the profile uses automatic CVs. */
export function withGeneratedResume(content: PortfolioContent): PortfolioContent {
  if (!content.profile.resumeAuto) return content;
  const base = resumePath(content.profile.name);
  return { ...content, profile: { ...content.profile, resumeUrl: `${base}.pdf`, resumeAltUrl: `${base}.docx` } };
}
