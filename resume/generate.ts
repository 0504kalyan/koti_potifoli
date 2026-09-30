// Builds the CV (Word and PDF) from portfolio content. Runs at build time (vite.config.ts), so every
// save in the admin rebuilds the CV with the site. Both formats render the same list of blocks, so
// they always match, and every size and bullet comes from one set of styles below.
import {
  AlignmentType,
  BorderStyle,
  Document,
  ExternalHyperlink,
  LevelFormat,
  Packer,
  Paragraph,
  ShadingType,
  TabStopType,
  TextRun,
} from 'docx';
import PDFDocument from 'pdfkit';
import { resumePath } from '../src/content/resume.js';
import type { BaseItem, PortfolioContent } from '../src/content/types.js';

/* ---------- The CV as blocks ---------- */

type Run = { text: string; bold?: boolean; url?: string };
type Block =
  | { kind: 'header'; name: string; title: string; address: string; contacts: { label: string; text: string; url?: string }[] }
  | { kind: 'section'; title: string }
  | { kind: 'para'; runs: Run[]; justify?: boolean }
  | { kind: 'label'; label: string; text: string }
  | { kind: 'job'; left: Run[]; right: string }
  | { kind: 'subhead'; text: string }
  | { kind: 'bullet'; runs: Run[] };

const bare = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/+$/, '');

/** Active, visible items in display order: what the site shows. */
const live = <T extends BaseItem>(items: T[] = []) =>
  items.filter((i) => i.status === 'active' && i.isVisible).sort((a, b) => a.displayOrder - b.displayOrder);
const texts = (list: string[] = []) => list.map((s) => s.trim()).filter(Boolean);

export function resumeBlocks(c: PortfolioContent, portfolioUrl: string): Block[] {
  const { profile } = c;
  const blocks: Block[] = [];
  const contacts: { label: string; text: string; url?: string }[] = [];
  if (profile.email) contacts.push({ label: 'E-mail', text: profile.email, url: `mailto:${profile.email}` });
  if (profile.phone) contacts.push({ label: 'Mobile', text: profile.phone });
  if (profile.linkedin) contacts.push({ label: 'LinkedIn', text: bare(profile.linkedin), url: profile.linkedin });
  contacts.push({ label: 'Portfolio', text: bare(portfolioUrl), url: portfolioUrl });
  blocks.push({ kind: 'header', name: profile.name, title: profile.role, address: profile.location, contacts });

  const summary = texts(c.about?.summary);
  if (summary.length) {
    blocks.push({ kind: 'section', title: 'Professional Summary' });
    for (const p of summary) blocks.push({ kind: 'para', runs: [{ text: p }], justify: true });
  }
  const skills = live(c.skillGroups).filter((g) => texts(g.items).length);
  if (skills.length) {
    blocks.push({ kind: 'section', title: 'Technical Skills' });
    for (const g of skills) blocks.push({ kind: 'label', label: g.title, text: texts(g.items).join(', ') });
  }
  const concepts = texts(c.about?.coreConcepts);
  if (concepts.length) {
    blocks.push({ kind: 'section', title: 'Core Expertise' });
    for (const t of concepts) blocks.push({ kind: 'bullet', runs: [{ text: t }] });
  }
  const jobs = live(c.experience);
  const areas = live(c.workAreas).filter((a) => texts(a.responsibilities).length);
  const pushAreas = () => {
    for (const a of areas) {
      blocks.push({ kind: 'subhead', text: a.name });
      for (const r of texts(a.responsibilities)) blocks.push({ kind: 'bullet', runs: [{ text: r }] });
    }
  };
  if (jobs.length || areas.length) {
    blocks.push({ kind: 'section', title: 'Professional Experience' });
    jobs.forEach((job, i) => {
      const left: Run[] = [{ text: job.role, bold: true }];
      if (job.company) left.push({ text: ` | ${job.company}` });
      blocks.push({ kind: 'job', left, right: job.period });
      const p = job.project;
      if (p?.name) {
        const facts = [`Project: ${p.name}`];
        if (p.client) facts.push(`Client: ${p.client}`);
        if (p.role) facts.push(`Role: ${p.role}`);
        if (p.teamSize) facts.push(`Team Size: ${p.teamSize}`);
        blocks.push({ kind: 'para', runs: [{ text: facts.join(' | ') }] });
      }
      if (texts(job.highlights).length) {
        blocks.push({ kind: 'subhead', text: 'Responsibilities:' });
        for (const h of texts(job.highlights)) blocks.push({ kind: 'bullet', runs: [{ text: h }] });
      }
      // The expertise areas describe the current work, so they sit under the first (latest) job.
      if (i === 0) pushAreas();
    });
    if (!jobs.length) pushAreas();
  }
  const e = c.education;
  if (e?.degree) {
    blocks.push({ kind: 'section', title: 'Education' });
    blocks.push({ kind: 'job', left: [{ text: e.degree, bold: true }, ...(e.university ? [{ text: ` – ${e.university}` }] : [])], right: e.year });
    if (e.score) blocks.push({ kind: 'para', runs: [{ text: e.score }] });
  }
  return blocks;
}

/* ---------- Styles (both formats) ---------- */

const PT = { name: 20, title: 12, body: 11, bar: 10 };
const COLOR = { text: '1A1A1A', muted: '555555', bar: '7F7F7F', barText: 'FFFFFF', link: '0000FF', rule: '333333' };
const A4 = { w: 595.28, h: 841.89 };
const MARGIN = { top: 50, bottom: 56, left: 56, right: 56 };
const SERIF = 'Times New Roman';
const SANS = 'Arial';

/* ---------- Word ---------- */

const tw = (pt: number) => Math.round(pt * 20); // twips

export async function buildDocx(blocks: Block[], meta: { title: string; author: string }): Promise<Buffer> {
  const run = (r: Run, size = PT.body, font = SERIF) => {
    const t = new TextRun({ text: r.text, bold: r.bold, font, size: size * 2, color: r.url ? COLOR.link : COLOR.text, underline: r.url ? {} : undefined });
    return r.url ? new ExternalHyperlink({ link: r.url, children: [t] }) : t;
  };
  const after = (pt: number) => ({ after: tw(pt), line: 264 });
  const paras: Paragraph[] = [];
  for (const b of blocks) {
    switch (b.kind) {
      case 'header':
        paras.push(
          new Paragraph({
            border: { top: { style: BorderStyle.SINGLE, size: 24, color: COLOR.rule, space: 8 } },
            spacing: { after: tw(2) },
            children: [new TextRun({ text: b.name, bold: true, font: SANS, size: PT.name * 2, color: COLOR.text, underline: {} })],
          }),
        );
        if (b.title) paras.push(new Paragraph({ spacing: { after: tw(4) }, children: [new TextRun({ text: b.title, font: SANS, size: PT.title * 2, color: COLOR.muted })] }));
        if (b.address) paras.push(new Paragraph({ spacing: after(1), children: [run({ text: b.address })] }));
        for (const c of b.contacts) {
          paras.push(new Paragraph({ spacing: after(1), children: [new TextRun({ text: `${c.label}: `, font: SANS, size: PT.body * 2, color: COLOR.text }), run({ text: c.text, url: c.url })] }));
        }
        break;
      case 'section':
        paras.push(
          new Paragraph({
            shading: { type: ShadingType.CLEAR, fill: COLOR.bar, color: 'auto' },
            spacing: { before: tw(12), after: tw(6) },
            keepNext: true,
            children: [new TextRun({ text: b.title.toUpperCase(), bold: true, font: SANS, size: PT.bar * 2, color: COLOR.barText, characterSpacing: 20 })],
          }),
        );
        break;
      case 'para':
        paras.push(new Paragraph({ alignment: b.justify ? AlignmentType.JUSTIFIED : AlignmentType.LEFT, spacing: after(4), children: b.runs.map((r) => run(r)) }));
        break;
      case 'label':
        paras.push(new Paragraph({ alignment: AlignmentType.JUSTIFIED, spacing: after(3), children: [run({ text: b.label, bold: true }), run({ text: `: ${b.text}` })] }));
        break;
      case 'job':
        paras.push(
          new Paragraph({
            tabStops: [{ type: TabStopType.RIGHT, position: tw(A4.w - MARGIN.left - MARGIN.right) }],
            spacing: after(3),
            children: [...b.left.map((r) => run(r)), run({ text: `\t${b.right}`, bold: true })],
          }),
        );
        break;
      case 'subhead':
        paras.push(new Paragraph({ spacing: { before: tw(2), after: tw(2) }, keepNext: true, children: [run({ text: b.text, bold: true })] }));
        break;
      case 'bullet':
        paras.push(new Paragraph({ numbering: { reference: 'bullets', level: 0 }, alignment: AlignmentType.JUSTIFIED, spacing: after(2), children: b.runs.map((r) => run(r)) }));
        break;
    }
  }
  const doc = new Document({
    title: meta.title,
    creator: meta.author,
    styles: { default: { document: { run: { font: SERIF, size: PT.body * 2, color: COLOR.text } } } },
    numbering: {
      config: [
        {
          reference: 'bullets',
          levels: [
            {
              level: 0,
              format: LevelFormat.BULLET,
              text: '•',
              alignment: AlignmentType.LEFT,
              // Same size and font as the text, for every bullet in the document.
              style: { paragraph: { indent: { left: tw(18), hanging: tw(12) } }, run: { font: SERIF, size: PT.body * 2 } },
            },
          ],
        },
      ],
    },
    sections: [
      {
        properties: { page: { size: { width: tw(A4.w), height: tw(A4.h) }, margin: { top: tw(MARGIN.top), bottom: tw(MARGIN.bottom), left: tw(MARGIN.left), right: tw(MARGIN.right) } } },
        children: paras,
      },
    ],
  });
  return Packer.toBuffer(doc);
}

/* ---------- PDF ---------- */

// The PDF's built-in fonts only cover Windows-1252; replace the few characters outside it.
const WIN1252_EXTRA = '€‚ƒ„…†‡ˆ‰Š‹ŒŽ‘’“”•–—˜™š›œžŸ';
const pdfText = (s: string) =>
  [...s.normalize('NFC')]
    .map((ch) => (ch.charCodeAt(0) < 256 || WIN1252_EXTRA.includes(ch) ? ch : ch === '→' ? '->' : ch === '≥' ? '>=' : ch === '≤' ? '<=' : '?'))
    .join('');

export function buildPdf(blocks: Block[], meta: { title: string; author: string }): Promise<Buffer> {
  const doc = new PDFDocument({ size: 'A4', margins: MARGIN, info: { Title: meta.title, Author: meta.author }, autoFirstPage: true });
  const chunks: Buffer[] = [];
  doc.on('data', (c: Buffer) => chunks.push(c));
  const width = A4.w - MARGIN.left - MARGIN.right;
  const F = { serif: 'Times-Roman', serifBold: 'Times-Bold', sans: 'Helvetica', sansBold: 'Helvetica-Bold' };
  const hex = (c: string) => `#${c}`;
  const bottom = () => doc.page.height - MARGIN.bottom;
  /** Start a new page unless `pt` more points fit (keeps headings with what follows). */
  const ensure = (pt: number) => {
    if (doc.y + pt > bottom()) doc.addPage();
  };
  const gap = (pt: number) => {
    doc.y += pt;
  };

  /** Mixed bold/link runs as one wrapped paragraph starting at x. */
  const runs = (list: Run[], x: number, w: number, o: { size?: number; justify?: boolean; sans?: boolean } = {}) => {
    const size = o.size ?? PT.body;
    const align = o.justify ? 'justify' : 'left';
    list.forEach((r, i) => {
      const font = o.sans ? (r.bold ? F.sansBold : F.sans) : r.bold ? F.serifBold : F.serif;
      doc.font(font).fontSize(size).fillColor(hex(r.url ? COLOR.link : COLOR.text));
      const opts = { continued: i < list.length - 1, link: r.url ?? null, underline: Boolean(r.url), lineGap: 1.5, align } as const;
      if (i === 0) doc.text(pdfText(r.text), x, doc.y, { ...opts, width: w });
      else doc.text(pdfText(r.text), opts);
    });
  };

  for (const b of blocks) {
    switch (b.kind) {
      case 'header': {
        doc.rect(MARGIN.left, MARGIN.top - 12, width, 3).fill(hex(COLOR.rule));
        doc.y = MARGIN.top;
        doc.font(F.sansBold).fontSize(PT.name).fillColor(hex(COLOR.text)).text(pdfText(b.name), MARGIN.left, doc.y, { underline: true });
        gap(2);
        if (b.title) {
          doc.font(F.sans).fontSize(PT.title).fillColor(hex(COLOR.muted)).text(pdfText(b.title), MARGIN.left, doc.y);
          gap(4);
        }
        if (b.address) runs([{ text: b.address }], MARGIN.left, width);
        for (const c of b.contacts) {
          doc.font(F.sans).fontSize(PT.body).fillColor(hex(COLOR.text)).text(`${c.label}: `, MARGIN.left, doc.y, { continued: true });
          doc.font(F.serif).fillColor(hex(c.url ? COLOR.link : COLOR.text)).text(pdfText(c.text), { link: c.url ?? null, underline: Boolean(c.url) });
        }
        break;
      }
      case 'section': {
        gap(10);
        ensure(21 + 40);
        const y = doc.y;
        doc.rect(MARGIN.left, y, width, 15).fill(hex(COLOR.bar));
        doc.font(F.sansBold).fontSize(PT.bar).fillColor(hex(COLOR.barText)).text(b.title.toUpperCase(), MARGIN.left + 5, y + 3, { characterSpacing: 1, lineBreak: false });
        doc.y = y + 15 + 6;
        break;
      }
      case 'para':
        runs(b.runs, MARGIN.left, width, { justify: b.justify });
        gap(4);
        break;
      case 'label':
        runs([{ text: b.label, bold: true }, { text: `: ${b.text}` }], MARGIN.left, width, { justify: true });
        gap(3);
        break;
      case 'job': {
        ensure(16);
        const y = doc.y;
        doc.font(F.serifBold).fontSize(PT.body).fillColor(hex(COLOR.text)).text(pdfText(b.right), MARGIN.left, y, { width, align: 'right', lineBreak: false });
        doc.y = y;
        const rightW = doc.widthOfString(pdfText(b.right)) + 12;
        runs(b.left, MARGIN.left, width - rightW);
        gap(3);
        break;
      }
      case 'subhead':
        gap(2);
        ensure(30);
        runs([{ text: b.text, bold: true }], MARGIN.left, width);
        gap(2);
        break;
      case 'bullet': {
        ensure(14);
        const y = doc.y;
        doc.font(F.serif).fontSize(PT.body).fillColor(hex(COLOR.text)).text('•', MARGIN.left + 6, y, { lineBreak: false });
        doc.y = y;
        runs(b.runs, MARGIN.left + 18, width - 18, { justify: true });
        gap(2);
        break;
      }
    }
  }
  doc.end();
  return new Promise((resolve, reject) => {
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);
  });
}

/* ---------- Which CVs to build ---------- */

export interface ResumeJob {
  /** Site path without extension, e.g. /Resume-Koteswara-Rao-Doppalapudi. */
  path: string;
  blocks: Block[];
  meta: { title: string; author: string };
}

/** The site's CV, or nothing when automatic CVs are off. */
export function resumeJobs(content: PortfolioContent, o: { siteUrl: string }): ResumeJob[] {
  if (!content.profile?.resumeAuto) return [];
  const { name, role } = content.profile;
  return [{ path: resumePath(name), blocks: resumeBlocks(content, `${o.siteUrl}/`), meta: { title: `${name} — ${role} — CV`, author: name } }];
}

export async function renderJob(job: ResumeJob, ext: 'pdf' | 'docx'): Promise<Buffer> {
  return ext === 'pdf' ? buildPdf(job.blocks, job.meta) : buildDocx(job.blocks, job.meta);
}
