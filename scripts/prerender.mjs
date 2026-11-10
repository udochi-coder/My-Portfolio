// Build-time prerendering.
// After `vite build` (client) and `vite build --ssr` (server bundle), this
// renders <App /> to HTML, writes it into dist/index.html together with the
// JSON-LD structured data, then refreshes the sitemap's <lastmod>.
// Search engines and AI tools get the full content in the initial HTML;
// React hydrates it in the browser.

import { readFile, writeFile, rm } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const serverDir = path.join(root, 'dist-server');

const { render, jsonLd, extraHead } = await import(pathToFileURL(path.join(serverDir, 'entry-server.js')).href);

const htmlPath = path.join(dist, 'index.html');
let html = await readFile(htmlPath, 'utf8');

const marker = '<div id="root"></div>';
if (!html.includes(marker)) throw new Error(`prerender: ${marker} not found in dist/index.html`);

const appHtml = render();
if (!appHtml || appHtml.length < 2000) throw new Error('prerender: rendered HTML is unexpectedly small');

const ld = jsonLd().replace(/</g, '\\u003c');
JSON.parse(jsonLd()); // fail the build if the structured data is invalid JSON

// Build marker: lets anyone check which commit is actually live
// (view source, or open /version.json). Vercel provides the commit SHA.
const commit = (process.env.VERCEL_GIT_COMMIT_SHA || 'local').slice(0, 7);
const builtAt = new Date().toISOString();

html = html
  .replace(marker, `<div id="root">${appHtml}</div>`)
  .replace('</head>', `    ${extraHead()}\n    <meta name="build-version" content="${commit} ${builtAt}" />\n    <script type="application/ld+json">${ld}</script>\n  </head>`);

await writeFile(htmlPath, html);
await writeFile(path.join(dist, 'version.json'), JSON.stringify({ commit, builtAt, prerendered: true }, null, 2) + '\n');

// keep sitemap lastmod current
const sitemapPath = path.join(dist, 'sitemap.xml');
const today = new Date().toISOString().slice(0, 10);
const sitemap = await readFile(sitemapPath, 'utf8');
await writeFile(sitemapPath, sitemap.replace(/<lastmod>[^<]*<\/lastmod>/, `<lastmod>${today}</lastmod>`));

await rm(serverDir, { recursive: true, force: true });
console.log(`prerender: wrote ${(appHtml.length / 1024).toFixed(1)} kB of page HTML and structured data into dist/index.html`);
