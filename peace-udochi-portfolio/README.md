# Peace Udochi — Portfolio

React + Vite portfolio. Live projects, experience, stack and contact, in a dark purple/pink style.

## Editing content

Almost everything you'll want to change is in **`src/data.js`**:

- `projects`: main project cards. Fill in `repo` with each GitHub link to show a "Code" button, and add a `learned` sentence to show "What I learned" in the case study.
- `otherWork`: smaller builds.
- `experience`, `earlierCareer`, `education`, `stack`: the other sections.
- `profile`: name, email, links, CV path and availability line.

Screenshots go in `public/images/`, and the CV is `public/Peace-Udochi-CV.pdf`.

After deploying, set your real domain in the `og:image` / `og:url` tags in `index.html` so link previews work.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy (Vercel)

Import the GitHub repo in Vercel, framework preset **Vite**, build command `npm run build`, output `dist`. No environment variables needed.
