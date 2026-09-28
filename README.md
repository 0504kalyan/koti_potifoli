# Koteswara Rao Doppalapudi — Portfolio

Single-page React + Vite + TypeScript site for a Workday Finance / FSCM Functional Consultant, with content from the resume; the downloadable CV is `public/Resume-Koteswara-Rao-Doppalapudi.pdf`.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run preview  # serve the build
```

## Edit content

See **[CONTENT-GUIDE.md](CONTENT-GUIDE.md)** for how to update every section.

All text lives in `src/data/resume.ts`. The profile photo is `public/profile.png`, set by `profile.photo`.

## Sections

One page, in this order (each is a component in `src/components/`):

| Section      | Component        | What it shows |
|--------------|------------------|---------------|
| `#top`       | `Hero`           | Name, role, headline, key facts, photo with sample Workday screens (accounting journal, business process) |
| `#modules`   | `Modules`        | The six Workday Financials modules |
| `#processes` | `Processes`      | Tabbed end-to-end flows: Procure-to-Pay, Record-to-Report, Order-to-Cash, Asset Lifecycle |
| `#expertise` | `Expertise`      | Work areas with responsibilities |
| `#experience`| `Experience`     | Employment timeline with the client project |
| `#skills`    | `Skills`         | Competency groups |
| `#about`     | `About`          | Summary, education, core concepts |
| `#contact`   | `Contact`        | Email, phone, LinkedIn, CV download |

Below 960px the navigation collapses into a menu button.
