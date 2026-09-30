// The content model of content/portfolio.json. content/schema.json describes the same shape for the
// admin app; keep the two in step when adding a field.

export interface BaseItem {
  id: string;
  displayOrder: number;
  isVisible: boolean;
  status: 'active' | 'archived' | 'deleted';
}

export interface Module extends BaseItem {
  name: string;
  code: string;
  text: string;
}

export interface ProcessFlow extends BaseItem {
  name: string;
  caption: string;
  steps: { title: string; items: string[] }[];
}

export interface WorkArea extends BaseItem {
  name: string;
  tagline: string;
  description: string;
  responsibilities: string[];
  tech: string[];
  /** Colour of the card's icon and tags. */
  accent: string;
}

export interface Job extends BaseItem {
  company: string;
  role: string;
  period: string;
  isCurrent: boolean;
  /** Shown as a fact box when `project.name` is set. */
  project: { name: string; client: string; role: string; teamSize: number | null };
  highlights: string[];
}

export interface SkillGroup extends BaseItem {
  title: string;
  items: string[];
}

export interface PortfolioContent {
  schemaVersion: number;
  seo: { title: string; description: string };
  profile: {
    name: string;
    shortName: string;
    initials: string;
    role: string;
    headerTagline: string;
    email: string;
    phone: string;
    linkedin: string;
    location: string;
    experience: string;
    currentClient: string;
    photo: string;
    /** On: the CV links serve the CV the build generates from this content (resume/generate.ts). */
    resumeAuto: boolean;
    /** The uploaded CV, used when resumeAuto is off. With resumeAltUrl set, visitors choose between the two formats (e.g. PDF or Word). */
    resumeUrl: string;
    resumeAltUrl: string;
  };
  hero: { headline: string };
  about: { summary: string[]; coreConcepts: string[] };
  education: { degree: string; university: string; year: string; score: string };
  contact: { intro: string };
  modules: Module[];
  processFlows: ProcessFlow[];
  workAreas: WorkArea[];
  experience: Job[];
  skillGroups: SkillGroup[];
}
