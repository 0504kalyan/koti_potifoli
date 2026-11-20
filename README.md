# Koteswara Rao Doppalapudi — Portfolio

React 18 + Vite + TypeScript one-page portfolio for a Workday FSCM Functional Consultant.

Content is managed from the separate **Portfolio Admin** app (its own repository and Vercel project), which also manages Pavan's portfolio. This repository has no admin code, no API and no secrets, and there is no database: all content lives in [`content/portfolio.json`](content/portfolio.json), and the admin edits it by committing to this repository, which redeploys the site. How to add, update and delete content: [CONTENT-GUIDE.md](CONTENT-GUIDE.md).

## What connects this site to the admin

| Path | What it is |
|---|---|
| `content/portfolio.json` | **The single source of truth** for all content: profile, hero, modules, processes, expertise, experience, skills, about, education, contact, SEO. Written by the admin; don't hand-edit it. |
| `content/schema.json` | Describes that content for the admin: sections, fields, labels, hints, validation rules and the admin menu. The admin builds its forms from it. |
| `preview.html`, `src/preview.tsx` | Renders the page with unsaved content sent from the admin (its Preview button), scrolled to the section being edited. Accepts messages only from `VITE_ADMIN_ORIGIN`. |
| `/version.json` | Emitted at build time (`vite.config.ts`): the content file's Git blob SHA, so the admin can show when a save is live. |
| `src/content/` | Types and `usePortfolio()`: the only place components get content from. |

## Admin account isolation

The Admin authenticates each account against its server-side portfolio permissions. A Koti-only account is routed directly to this portfolio; an account with access to multiple portfolios must select Koti before editing. Every save, restore, upload and version-history request is scoped to the selected portfolio and its schema. For Koti, that means commits go to `0504kalyan/koti_potifoli`, updating this site's `content/portfolio.json` and triggering this site's deployment; Pavan's content and deployment are separate.

**Adding a new field:** add it to `content/schema.json` (so the admin shows and keeps it) and `src/content/types.ts`, then use it in a component. Fields that aren't in the schema are dropped when the admin saves.

## Local development

```bash
npm install
npm run dev      # http://localhost:5173 (use `npm run dev -- --port 5175` next to Pavan's portfolio)
npm run build    # type-check + production build into dist/
```

To edit content locally, run the Portfolio Admin alongside it with `CONTENT_STORE=local` (see its README).

## Deploying

This site's repository is `0504kalyan/koti_potifoli`. Deploy it as a Vercel project (framework **Vite**; `vercel.json` sets the build) connected to that repository, so each save from the admin redeploys it within 1–2 minutes. Add the environment variable **`VITE_ADMIN_ORIGIN`** = the Portfolio Admin URL (not a secret; it enables the admin's Preview).

## Design pieces that live in code

Section headings and labels (each file in `src/components/`), the menu (`Header.tsx`), colours and fonts (`src/styles.css`, `index.html`), the tab icon (`public/favicon.svg`), skill and module icons (`src/components/skillIcons.tsx`, matched by name), Expertise card icons (`src/components/Expertise.tsx`, matched by work-area ID) and the illustrative Workday screens in the hero (`src/components/WorkdayScreens.tsx`, sample data only).
