import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.jsx';

const root = document.getElementById('root');

// The production build ships fully prerendered HTML (see scripts/prerender.mjs),
// so React attaches to the existing markup. In `npm run dev` the root is empty
// and React renders from scratch.
if (root.hasChildNodes()) {
  hydrateRoot(root, <App />);
} else {
  createRoot(root).render(<App />);
}
