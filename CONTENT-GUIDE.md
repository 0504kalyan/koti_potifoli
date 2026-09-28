# Portfolio Content Guide

How to change what your portfolio says. The site is **one page** that scrolls through these sections, in order:

Hero (top) → Modules → Processes → Expertise → Experience → Skills → About → Contact → Footer

**Short version:** almost all text lives in one file, `src/data/resume.ts`. Change a value there, save, and the site updates. Other files are only needed for fixed labels, colours, fonts, icons and images.

---

## 1. Before you start

Open a terminal **in the project folder** (the folder name has a space, so keep the quotes):

```powershell
cd "D:\Mine\Portfolio\koti portfolio"
npm run dev
```

Open http://localhost:5173 and leave it running. Every time you save a file, the page refreshes by itself.

> If you see `Could not read package.json`, you're in the wrong folder. Run the `cd` line above first.

---

## 2. Where everything lives

| What you want to change | File |
|---|---|
| All content: profile, headline, modules, processes, skills, expertise, jobs, education, summary | `src/data/resume.ts` |
| Skill and module icons | `src/components/skillIcons.tsx` |
| Expertise card icons | `src/components/Expertise.tsx` |
| Sample Workday screens in the hero | `src/components/WorkdayScreens.tsx` |
| Section headings and small labels | the section's file in `src/components/` (see [section 8](#8-section-headings-and-labels)) |
| Menu labels | `src/components/Header.tsx` |
| Colours and fonts | `src/styles.css` (top) and `index.html` |
| Browser tab title, search description, tab icon | `index.html`, `public/favicon.svg` |
| Profile photo and CV file | `public/profile.png`, `public/Resume-Koteswara-Rao-Doppalapudi.pdf` |

---

## 3. Editing rules for `resume.ts` (read once)

The file is plain lists of text. Keep the punctuation around what you change and it will work.

- **Text goes inside quotes:** `'like this'`.
- **Apostrophes:** if the text contains `'` (for example `I'm`), wrap it in double quotes: `"I'm open to..."`.
- **Commas:** every item in a list ends with a comma. A missing comma is the most common mistake.
- **Lists use square brackets:** `['GL', 'AP', 'AR']`.
- **Blocks use curly braces:** `{ name: '...', text: '...' },`. To add one, copy an existing block including its braces and trailing comma, then edit it.
- **Order matters:** things show on the site in the same order they appear in the file.

If the page goes blank or shows an error after saving, look at the terminal. It names the line with the problem, which is usually a missing comma or quote. Undo your last change (`Ctrl+Z`) and try again.

To check everything is valid before publishing:

```powershell
npm run build
```

`✓ built` means you're good.

---

## 4. Profile (`profile` in `resume.ts`)

| Field | Where it shows |
|---|---|
| `name` | Hero heading, footer, copyright line, photo alt text |
| `shortName` | Header, next to the logo (`'Koteswara Rao'`) |
| `initials` | The two letters in the logo mark (header and footer) |
| `role` | Small label above your name in the hero, and under your name in the footer |
| `email`, `phone` | Contact section and footer icons (clickable) |
| `linkedin` | Contact section and footer icon; the full `https://...` address |
| `location` | Contact section only (no link), e.g. `'Hyderabad, India'` |
| `experience` | Hero fact `3.3 yrs` (just the number, as text: `'3.4'`) |
| `currentClient` | Hero fact "Current client" |
| `resumeFile` | Every "Download CV" / "CV" button |
| `photo` | Hero photo |

**Empty values are hidden.** Set `email`, `phone`, `linkedin` or `location` to `''` and that item disappears from the Contact section and the footer.

The header subtitle "Workday FSCM Consultant" is fixed text in `src/components/Header.tsx` (look for `<small>`).

When your experience changes, also update the number in the first `summary` paragraph.

---

## 5. Section by section (`resume.ts`)

### Hero
- `hero.headline`: the paragraph under your name.
- The three facts under it come from `profile.experience`, the number of `modules`, and `profile.currentClient`. Their labels ("Workday Financials experience", …) are in `src/components/Hero.tsx`.

### Modules (`modules`)
Six tiles. Each has:
- `name`: the tile title. **It must match a name in `skillIcons.tsx`** (case doesn't matter) to get its own icon and colour. The six current ones already do.
- `code`: the short badge, e.g. `'GL'`.
- `text`: one line of description.

### Processes (`processFlows`)
The tabbed section. Each block is one tab:
- `key`: a short unique id with no spaces (`'p2p'`). Not shown.
- `name`: the tab label.
- `caption`: the sentence next to the title.
- `steps`: the numbered boxes, each `{ title: '...', items: ['...', '...'] }`. Items show with a tick.

The first tab in the list is the one that opens first.

### Expertise (`workAreas`)
One card per area:
- `slug`: unique id, lowercase with dashes (`'fixed-assets'`). It also picks the icon (see below).
- `name`, `tagline`: card title and subtitle.
- `description`: the paragraph.
- `responsibilities`: bullet list. The first 3 show; the rest appear behind "Show N more".
- `tech`: the tags at the bottom of the card.
- `accent`: the card's icon and tag colour, as a hex code such as `'#1d4ed8'`.

**Icons:** `src/components/Expertise.tsx` has a list near the top, `const icons = { 'general-ledger': TbBook2, ... }`. A new slug that isn't in that list gets a briefcase. To give it its own icon, add a line with your slug and an icon name (browse icons at https://react-icons.github.io/react-icons/icons/tb/), and add the icon name to the `import { ... } from 'react-icons/tb'` list at the top of the file.

### Experience (`experience`)
One block per job, newest first:
- `company`, `role`, `period` (e.g. `'June 2023 - Present'`).
- `current: true` on your current job only (green date pill). Remove it from the old job when you move on.
- `project` (optional): `{ name, client, role, teamSize }`, shown as a small fact box. Delete the whole `project: {...},` line if a job has none. `teamSize` is a number without quotes.
- `highlights`: the ticked bullet list.

### Skills (`skills`)
Groups, each `{ title: '...', items: ['...', ...] }`. Add a skill by adding it to a group's `items`.

**Skill icons** come from `src/components/skillIcons.tsx`:
- The `byName` list maps an exact skill name (lowercase) to an icon and colour, e.g. `'unit testing': { icon: TbTestPipe, color: GREEN },`.
- A new skill not in that list still gets a sensible icon from keywords in its name ("report", "security", "EIB", "test", "support", "config"…), or a default code icon.
- To give it a specific icon: add a line to `byName` (name in lowercase), and if the icon is new, add it to the `import { ... } from 'react-icons/tb'` list at the top. Colours available: `PURPLE`, `BLUE`, `GREEN`, `YELLOW`, `RED`, `CYAN`, `ORANGE`.

The same file supplies the Modules tile icons, which is why module names must match.

### About (`summary`, `education`, `coreConcepts`)
- `summary`: one text per paragraph.
- `education`: `degree`, `university`, `year`, and an optional `score` (e.g. `score: '8.2 CGPA',`) shown in brackets after the year. Leave it out to hide it.
- `coreConcepts`: the bullet list in the "Core concepts" card.

### Contact (`contactIntro`)
- `contactIntro`: the sentence under "Let's talk Workday Finance". The contact list itself comes from `profile`.

---

## 6. Sample Workday screens (hero)

The two small "screens" over your photo (an Accounting Journal and a Business Process approval chain) are **illustrative sample data**, not real client data. Edit them in `src/components/WorkdayScreens.tsx`:

- `JournalScreen`: the `lines` list (account, worktags, debit, credit) and the totals in the `Balanced` row. Keep debits and credits equal.
- `ApprovalScreen`: the `steps` list.

Don't put real client figures here.

---

## 7. Photo and CV

### Photo
Replace `public/profile.png` with your new photo **using the same file name**. A portrait (taller than wide) with a plain background works best. To use a different name or format, put the file in `public/` and set `profile.photo`, e.g. `photo: '/me.jpg',`. Set `photo: ''` to hide the photo.

### CV
The site serves the PDF `public/Resume-Koteswara-Rao-Doppalapudi.pdf` (a PDF opens in any browser). To update it, edit the Word resume, save it as PDF (**File → Save As → PDF**), and replace that file **using the same name**; every download button picks it up. To use a different file name, put it in `public/` and set `resumeFile`, e.g. `resumeFile: '/Koteswara-Rao-Doppalapudi-CV.pdf',`. Delete the old file from `public/`: anything in that folder can be downloaded.

**Privacy reminder:** your CV contains your phone number and email address. Anyone who visits the site can download it.

---

## 8. Section headings and labels

Each section's heading is set in its own file in `src/components/`. Change only the text in quotes.

| Section | File | Current eyebrow / title |
|---|---|---|
| Modules | `Modules.tsx` | "Workday Financials" / "Modules I configure and support" (+ `intro`) |
| Processes | `Processes.tsx` | "End-to-end processes" / "How finance flows through the tenant" (+ `intro`) |
| Expertise | `Expertise.tsx` | "Areas of expertise" / "What I deliver in a Workday tenant" (+ `intro`) |
| Experience | `Experience.tsx` | "Experience" / "Where I have delivered" |
| Skills | `Skills.tsx` | "Skills" / "Functional and technical competencies" |
| About | `About.tsx` | "About me" / "A functional consultant who owns the details" |
| Contact | `Contact.tsx` | "Contact" / "Let's talk Workday Finance" |

Look for `<SectionHeading eyebrow="..." title="..." intro="..." />`. The `eyebrow` is the small label above the title; `intro` is optional.

Button labels ("Get in touch", "Download CV") are in `Hero.tsx` and `Contact.tsx`.

**Menu labels:** in `src/components/Header.tsx`, the `sections` list near the top. Change the `label` text only; the `id` must stay as it is because it points at the section. Removing a line removes it from the menu (the section itself stays on the page).

---

## 9. Look and feel

### Colours
At the top of `src/styles.css`, inside `:root { ... }`. The main ones:

| Token | Used for |
|---|---|
| `--navy`, `--navy-2` | Hero, contact and footer background |
| `--accent`, `--accent-hover` | Gold buttons and highlights |
| `--brand` | Blue links and accents |
| `--bg`, `--surface`, `--tint` | Page, card and alternate-section backgrounds |
| `--ink`, `--text`, `--muted` | Headings, body text, secondary text |
| `--line` | Borders |

Also update `theme-color` in `index.html` (the mobile browser bar colour) if you change `--navy`.

### Fonts
Two steps:
1. In `index.html`, change the Google Fonts `<link href="https://fonts.googleapis.com/css2?family=Inter...&family=Manrope...">` to your fonts (copy the link from fonts.google.com).
2. In `src/styles.css`, change the first name in `--font-body` (body text, now Inter) and `--font-head` (headings, now Manrope).

### Tab icon, title and description
- **Tab icon:** replace `public/favicon.svg` (an SVG, same name).
- **Browser tab title:** `<title>` in `index.html`.
- **Search-engine description:** `<meta name="description" content="...">` in `index.html`.

---

## 10. Quick checklist: common updates

| I want to… | Do this |
|---|---|
| Update my years of experience | `profile.experience` **and** the first `summary` paragraph |
| Change phone, email or LinkedIn | `profile.phone` / `email` / `linkedin` (`''` hides it) |
| Show where I'm based | `profile.location`, e.g. `'Hyderabad, India'` |
| Change client | `profile.currentClient`, the job's `project.client`, and any text that names Unity 3D (`summary`; the Expertise intro follows `currentClient` automatically) |
| Add a new job | Add it at the top of `experience`, move `current: true` to it, give the old job an end date |
| Add a work area | Copy a `workAreas` block, give it a unique `slug`, pick an `accent`, optionally add its icon in `Expertise.tsx` |
| Add a process tab | Copy a `processFlows` block with a unique `key` |
| Add a skill | Add it to a group's `items`; optionally add an icon in `skillIcons.tsx` |
| Replace my CV or photo | Overwrite the file in `public/` with the same name |

---

## 11. Publishing your changes

Before you publish:

- [ ] `npm run dev` shows every section correctly, including on a narrow window (the menu becomes a button below 960px).
- [ ] Contact links work: email opens mail, phone dials, LinkedIn opens your profile.
- [ ] "Download CV" downloads the latest CV, and you're fine with its phone and email being public.
- [ ] The photo shows, and the sample screens contain no real client data.
- [ ] Tab title and description in `index.html` are up to date.
- [ ] `npm run build` ends with `✓ built`.

```powershell
cd "D:\Mine\Portfolio\koti portfolio"
npm run build
```

This creates the finished site in the `dist` folder. Upload the **contents** of `dist` to your host (Netlify, Vercel, GitHub Pages, Azure Static Web Apps, etc.). The site is a single page, so no special routing settings are needed.

After each content change, run `npm run build` again and upload the new `dist`.
