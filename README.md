# Peace Udochi — Portfolio

Dark, editorial portfolio for a software engineer, built with React + Vite and prerendered to static HTML at build time. No UI libraries; fonts (Archivo, Geist) are self-hosted through npm.

## Sections

- **Profile card** (sticky on desktop): photo, name, title, email (copyable), GitHub, LinkedIn, CV and a "Let's work together" button.
- **Hero:** oversized two-tone "Software Engineer" heading, intro and project facts.
- **Selected projects:** large previews, descriptions, technologies, live and GitHub links, plus smaller builds.
- **Experience:** timeline from the CV, earlier career and education.
- **Tools & technologies:** monogram tiles (no brand logos) and a list of other tools.
- **About** and **Contact** (working form plus email, LinkedIn and GitHub).
- A floating dock navigation highlights the section on screen.

## Editing content

Everything lives in **`src/data.js`**: profile, intro, projects, experience, education and tools.

- **Add a project (e.g. Campus Haven):** put a screenshot in `public/work/` (phone screenshots work best at 900 × 1200), then copy a project block in `src/data.js` and fill in the real details.
- **GitHub links:** paste a repo URL into a project's `repo` field and a "GitHub" link appears.
- **Photo:** `public/me/`. The originals are cropped and compressed only; the photo isn't otherwise edited.

## Contact form

The form posts to [FormSubmit](https://formsubmit.co) (no account or API key needed). **The first time someone submits it, FormSubmit emails you an activation link — click it once and messages start arriving.** After activating, you can replace the address in `site.formEndpoint` (`src/data.js`) with the random alias FormSubmit gives you, so your address isn't in the page source. If sending fails, visitors are shown your email address instead.

## SEO and AI discoverability

- `npm run build` prerenders the whole page, so names, projects, skills and experience are in the initial HTML. React then hydrates it.
- `scripts/prerender.mjs` also injects JSON-LD (`Person`, `WebSite`, `ProfilePage` and an `ItemList` of projects) generated from `src/data.js`, and updates the sitemap's `<lastmod>`.
- Title, description, canonical, Open Graph and X/Twitter tags are in `index.html`. The sharing image is `public/og.jpg`.
- `public/robots.txt` allows search engines and AI search crawlers (OAI-SearchBot, ChatGPT-User, PerplexityBot, Perplexity-User, Claude-SearchBot, Claude-User). Model-training crawlers (GPTBot, ClaudeBot, Google-Extended) are also allowed; change their lines to `Disallow: /` to opt out of training without affecting search. Allowing a crawler doesn't guarantee indexing.
- **Google Search Console:** add the site as a URL-prefix property, choose "HTML tag", paste only the `content` value into `site.googleSiteVerification` in `src/data.js`, push, then click Verify. Then submit `/sitemap.xml`.

If the domain changes, update it in `src/data.js`, `index.html`, `public/robots.txt` and `public/sitemap.xml`.

## Run locally

```bash
npm install
npm run dev
```

## Build and deploy

```bash
npm run build     # vite build → SSR bundle → prerender into dist/
npm run preview
```

Vercel reads `vercel.json` (Vite, `npm run build`, output `dist`). No environment variables are needed. Keep browser-only code (`window`, `document`) inside `useEffect` or event handlers so prerendering keeps working.
