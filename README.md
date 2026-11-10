# Peace Udochi — Portfolio

Minimal, editorial portfolio built with React + Vite. No UI libraries; fonts (Geist, Geist Mono) are self-hosted through npm.

## What's on the page

- **Hero:** oversized name (letters thicken as the cursor passes), identity, intro and current status, plus a live Lagos clock in the header.
- **Selected work:** a typographic index (hover shows a floating preview), then a large image gallery. Every project opens a full project view with the problem, what was built, the stack and links. Project views have shareable links like `/#fooddash`.
- **About:** statement, story, capabilities and experience.
- **Contact:** email, LinkedIn, GitHub and CV.

## Editing content

Everything lives in **`src/data.js`**: profile, projects, smaller builds, experience and capabilities.

**To add a project (e.g. Campus Haven):**
1. Put a screenshot in `public/work/`. A tall phone screenshot works best at 900 × 1200 (`shape: 'phone'`); a desktop screenshot can be any wide size (`shape: 'wide'`).
2. Copy one of the project blocks in `src/data.js` and fill in the real details.

Add GitHub links to each project's `repo` field to show a "Source code" button.

## Run locally

```bash
npm install
npm run dev
```

## Deploy

Vercel, framework preset **Vite**, build command `npm run build`, output `dist`. No environment variables are needed. `vite` is in `dependencies` on purpose, so production installs work.

SEO: meta tags, an Open Graph image (`public/og.jpg`), JSON-LD, `robots.txt` and `sitemap.xml` all use `https://my-portfolio-seven-lovat-26.vercel.app`. Update them if the domain changes.
