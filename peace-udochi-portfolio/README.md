# Peace Udochi — Portfolio

React + Vite portfolio built like a running backend system:

- **Hero:** a live architecture diagram. Visitors send requests (`GET /peace`, `GET /peace/cv`…) and watch a packet travel through Nginx → Django/Go → PostgreSQL/S3, then see the response.
- **Projects:** an API explorer. Each project is a route, viewable as a page or as raw JSON.
- **History:** a `git log` where the operations branch merges into engineering.
- **Hire:** a `POST /peace/hire` form that shows the request body live, then opens the visitor's email app.

Fonts (Bricolage Grotesque, JetBrains Mono) are bundled through npm, so there are no external requests.

## Editing content

Almost everything you'll want to change is in **`src/data.js`**:

- `projects`: main project cards. Fill in `repo` with each GitHub link to show a "Code" button, and add a `learned` sentence to show "What I learned" in the case study.
- `history`: the git log. `lane` is `eng` or `ops`; rows with `kind: 'merge'`, `'branch'` or `'root'` draw the graph curves.
- `stack`: shown in the `GET /peace/stack` response and in `requirements.txt`.
- `profile`: name, email, links and CV path.

The responses for the hero requests are in `ROUTES` near the top of `src/main.jsx`.

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
