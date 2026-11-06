# FranTech Portfolio

React + Vite + Tailwind frontend (project root) and Express + MongoDB API (`server/`) in one repo.

## Run locally
```bash
npm run install:all                  # installs frontend + server deps
cp server/.env.example server/.env   # fill in MONGODB_URI, JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD
npm run dev                          # API on :5000, site on :5173 (Vite proxies /api)
```
Admin panel: `/admin`. The admin account is created/synced from `server/.env` on startup.
After first login click **Import verified content** to load the built-in projects into MongoDB.

## Deploy
- **Frontend → Vercel**: root directory = repo root. Set `VITE_API_URL` to your API origin.
- **Backend → Render**: root directory = `server`, build `npm install`, start `npm start`.
  Set all `server/.env.example` variables; `CLIENT_URL` = your Vercel URL(s), comma-separated.
- Health check: `GET /api/health`.

## Live workspace (floating windows)
`src/components/FloatingWindows.jsx` + `src/data/appWindows.js`. Edit titles, descriptions, URLs, accent colours and window layout in the data file.
Set `embed: false` on a project if its site blocks iframes; it will show the static preview card instead.
