# Portfolio improvements

This version refines the existing React + Vite portfolio while keeping its dark purple visual identity and playful tone.

## What changed

- Clearer backend/Python positioning in the hero section.
- More specific About copy describing backend strengths.
- Skills grouped into backend, frontend, and data/infrastructure.
- More useful case-study notes for the projects.
- Clarified separate Flask and FastAPI student API projects.
- Rewrote the unfinished ambition and contact copy.
- Added a direct email link alongside copy-email functionality.
- Added keyboard focus styling and reduced-motion support.
- Added image lazy-loading for project screenshots.
- Improved page title, description, canonical URL, Open Graph, Twitter metadata, and Person structured data.
- Pinned the dependency versions to the versions recorded in the supplied lockfile.

## Run locally

1. Extract this ZIP.
2. Open the extracted `peace-udochi-portfolio` folder in VS Code.
3. Open the terminal in that folder.
4. Run:

   ```bash
   npm ci
   npm run dev
   ```

5. Open the local URL printed by Vite.
6. When happy with the changes, run `npm run build`.

## Deploy to Vercel

Push the updated project to the Git repository connected to your Vercel project. Vercel should use `npm run build` as the build command and `dist` as the output directory. You can also import the updated folder into a new GitHub repository and connect that repository to Vercel.

## Before publishing

- Verify that every live project URL still works and that each project description matches the features actually implemented.
- Confirm that the LinkedIn and GitHub URLs are correct.
- Check that `public/Peace-Udochi-CV.pdf` is the current CV.
- The Open Graph image currently uses the existing Manharrtan project screenshot. Replace it with a dedicated portfolio preview image if you have one.
- The `available/open` wording should reflect your actual job-search status.
