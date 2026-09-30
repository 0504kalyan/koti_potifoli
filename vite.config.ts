import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { renderJob, resumeJobs } from './resume/generate';

const root = __dirname;
const contentFile = path.join(root, 'content/portfolio.json');
const escapeHtml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Writes the published SEO title and description into index.html, so crawlers see them without JS. */
function seoFromContent(): Plugin {
  return {
    name: 'portfolio-seo',
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        if (!ctx.filename.endsWith('index.html')) return html;
        const { seo } = JSON.parse(readFileSync(contentFile, 'utf8'));
        if (!seo?.title) return html;
        return html
          .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(seo.title)}</title>`)
          .replace(/(<meta name="description" content=")[^"]*(")/, `$1${escapeHtml(seo.description ?? '')}$2`);
      },
    },
  };
}

/**
 * /version.json: the Git blob SHA of the content this build contains. The admin portal compares it
 * with the SHA it just committed to show when a saved change is live.
 */
function contentVersion(): Plugin {
  const version = () => {
    const bytes = readFileSync(contentFile);
    const contentSha = createHash('sha1').update(`blob ${bytes.length}\0`).update(bytes).digest('hex');
    return JSON.stringify({ contentSha, builtAt: new Date().toISOString() });
  };
  return {
    name: 'portfolio-content-version',
    configureServer(server) {
      server.middlewares.use('/version.json', (_req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Cache-Control', 'no-store');
        res.end(version());
      });
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'version.json', source: version() });
    },
  };
}

/**
 * Automatic CV (profile.resumeAuto): /Resume-<Name>.pdf and .docx built from the content. Because
 * they are rebuilt on every deploy, a save in the admin updates the CV too. In dev they're generated
 * on request from the current file. SITE_URL (or Vercel's production URL) is the "Portfolio:" link.
 */
function resumes(): Plugin {
  const productionUrl = () =>
    (process.env.SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '') || 'https://koti-potifoli.vercel.app').replace(/\/+$/, '');
  const jobs = (siteUrl: string) => resumeJobs(JSON.parse(readFileSync(contentFile, 'utf8')), { siteUrl });
  const TYPES = { pdf: 'application/pdf', docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' } as const;
  return {
    name: 'portfolio-resumes',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const m = decodeURIComponent((req.url ?? '').split('?')[0]).match(/^(\/Resume-[^/]+)\.(pdf|docx)$/);
        if (!m) return next();
        try {
          const job = jobs(`http://${req.headers.host}`).find((j) => j.path === m[1]);
          if (!job) return next();
          const ext = m[2] as 'pdf' | 'docx';
          const body = await renderJob(job, ext);
          res.setHeader('Content-Type', TYPES[ext]);
          res.setHeader('Cache-Control', 'no-store');
          res.end(body);
        } catch (err) {
          next(err);
        }
      });
    },
    async generateBundle() {
      for (const job of jobs(productionUrl())) {
        for (const ext of ['pdf', 'docx'] as const) {
          this.emitFile({ type: 'asset', fileName: `${job.path.slice(1)}.${ext}`, source: await renderJob(job, ext) });
        }
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), seoFromContent(), contentVersion(), resumes()],
  build: {
    rollupOptions: {
      input: {
        main: path.join(root, 'index.html'),
        preview: path.join(root, 'preview.html'),
      },
    },
  },
});
