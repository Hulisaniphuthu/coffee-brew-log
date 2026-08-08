# Deployment

**Live URL:** _not yet deployed — see note below_

## Why this isn't deployed yet

This project was built in a sandboxed dev environment that only has network
access to package registries (npm, GitHub, PyPI) — it can't reach
render.com or any other hosting provider, and has no access to any
deployment account credentials. Deploying has to happen from your own
machine/account. The steps below are exactly what to do — it should take
about 10–15 minutes.

## Recommended: Render.com (free tier)

Render works well here because it can run both a Node web service (the
API) and a static site (the React build) from the same GitHub repo, and it
reads config straight from environment variables.

### 1. Push this repo to GitHub

```bash
git add .
git commit -m "Final commit before deploy"
git push origin main
```

### 2. Deploy the backend (Web Service)

1. In the Render dashboard: **New → Web Service**, connect this GitHub repo.
2. **Root directory:** `backend`
3. **Build command:** `npm install`
4. **Start command:** `npm start`
5. Add environment variables (Render → Environment tab):
   - `PORT` → `10000` (Render sets its own `PORT`; Express already reads
     `process.env.PORT`, so this is usually auto-detected — check the
     Render logs on first deploy)
   - `DATABASE_PATH` → `./data/brews.sqlite`
   - `CLIENT_ORIGIN` → the frontend's Render URL (add this **after** step 3,
     once you know the frontend URL — e.g. `https://coffee-brew-log.onrender.com`)
6. Deploy. Note the backend's URL, e.g. `https://coffee-brew-log-api.onrender.com`.

> **Note on SQLite on Render's free tier:** Render's free-tier filesystem is
> ephemeral (it resets on redeploy/restart). SQLite works fine for demoing
> the app, but data won't persist long-term. For a persistent deployment,
> either add a Render Disk (paid) or swap `DATABASE_PATH`/dialect for a
> managed Postgres database — Sequelize makes this a config change, not a
> code change (see `backend/src/config/database.js`).

### 3. Deploy the frontend (Static Site)

1. **New → Static Site**, same repo.
2. **Root directory:** `frontend`
3. **Build command:** `npm install && npm run build`
4. **Publish directory:** `dist`
5. Add environment variable:
   - `VITE_API_URL` → the backend URL from step 2, plus `/api`
     (e.g. `https://coffee-brew-log-api.onrender.com/api`)
6. Deploy. This gives you the front-end URL to fill in above, and to use as
   `CLIENT_ORIGIN` back in the backend service's env vars.

### 4. Update this file

Once both are live, replace the placeholder at the top of this file with
the real front-end URL, e.g.:

```
**Live URL:** https://coffee-brew-log.onrender.com
```

## Troubleshooting notes

- If the front-end loads but brews never appear, check the browser
  console/network tab for CORS errors — `CLIENT_ORIGIN` on the backend must
  exactly match the frontend's deployed URL (including `https://`, no
  trailing slash).
- If the backend won't boot, check Render's logs for the port it expects —
  Render injects its own `PORT` env var at runtime, which `app.js` already
  reads via `process.env.PORT || 4000`.
- Free-tier Render services spin down after inactivity; the first request
  after idle time can take 30–60 seconds to respond.
