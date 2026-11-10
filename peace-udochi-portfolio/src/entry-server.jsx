import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App.jsx';
import { site, profile, projects, moreWork, experience, education, tools, alsoUse } from './data.js';

// Used only at build time by scripts/prerender.mjs.
export function render() {
  return renderToString(<App />);
}

const abs = (path) => new URL(path, site.url).href;

/* Schema.org structured data, generated from the same content as the page. */
export function jsonLd() {
  const personId = `${site.url}/#person`;
  const websiteId = `${site.url}/#website`;
  const graph = [
    {
      '@type': 'Person',
      '@id': personId,
      name: profile.name,
      jobTitle: `${profile.title}, ${profile.specialty}`,
      description: `${profile.intro} ${profile.introMore}`,
      url: `${site.url}/`,
      image: abs(profile.photo.square),
      email: `mailto:${profile.email}`,
      address: { '@type': 'PostalAddress', addressLocality: 'Lagos', addressCountry: 'NG' },
      sameAs: [profile.github, profile.linkedin],
      knowsAbout: [...tools.map((t) => t.name), ...alsoUse],
      worksFor: { '@type': 'Organization', name: experience[0].org },
      hasOccupation: { '@type': 'Occupation', name: profile.title, skills: tools.map((t) => t.name).join(', ') },
      alumniOf: education.map((e) => ({ '@type': 'EducationalOrganization', name: e.school }))
    },
    {
      '@type': 'WebSite',
      '@id': websiteId,
      url: `${site.url}/`,
      name: `${profile.name} — ${profile.title}`,
      inLanguage: 'en',
      publisher: { '@id': personId },
      about: { '@id': personId }
    },
    {
      '@type': 'ProfilePage',
      '@id': `${site.url}/#profilepage`,
      url: `${site.url}/`,
      name: `${profile.name} | ${profile.title} — ${profile.specialty}`,
      isPartOf: { '@id': websiteId },
      mainEntity: { '@id': personId }
    },
    {
      '@type': 'ItemList',
      '@id': `${site.url}/#projects`,
      name: `Projects by ${profile.name}`,
      itemListElement: [
        ...projects.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'SoftwareApplication',
            name: p.title,
            description: p.summary,
            applicationCategory: 'WebApplication',
            operatingSystem: 'Web',
            ...(p.cover ? { image: abs(p.cover) } : {}),
            ...(p.live ? { url: p.live } : {}),
            ...(p.repo ? { codeRepository: p.repo } : {}),
            keywords: p.stack.join(', '),
            author: { '@id': personId },
            dateCreated: p.year
          }
        })),
        ...moreWork.map((w, i) => ({
          '@type': 'ListItem',
          position: projects.length + i + 1,
          item: {
            '@type': 'SoftwareSourceCode',
            name: w.title,
            description: w.text,
            programmingLanguage: w.stack.join(', '),
            ...(w.live ? { url: w.live } : {}),
            author: { '@id': personId }
          }
        }))
      ]
    }
  ];
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
}

export function extraHead() {
  return site.googleSiteVerification
    ? `<meta name="google-site-verification" content="${site.googleSiteVerification}" />`
    : '';
}
