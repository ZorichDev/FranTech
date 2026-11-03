# FranTech Portfolio

FRANTECH is a React/Vite portfolio frontend paired with an Express/Mongoose API.

## Project layout

- `FranTech-main/` is the public React website and admin interface.
- `server/` is the Express API, MongoDB models, authentication, contact inbox and analytics.
- `scripts/dev.js` starts both packages from the repository root.

## Local development

Install dependencies once in each package:

```bash
cd server
npm install
cd ../FranTech-main
npm install
cd ..
```

Configure `server/.env` with `MONGODB_URI`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `PORT=5000`, and `CLIENT_URL=http://localhost:5173`. `GMAIL_USER` and `GMAIL_APP_PASSWORD` are optional; messages are still saved in MongoDB when email delivery is not configured.

The configured admin email and password are synchronized to the MongoDB admin account when the backend starts. A password change takes effect after a successful restart with MongoDB available.

Start both applications from the repository root:

```bash
npm run dev
```

Open the Vite URL printed in the terminal. The Vite proxy forwards `/api` requests to `http://localhost:5000`. The admin CMS is at `/admin`; it uses the existing seeded administrator account and has no public registration page.

After the first administrator sign-in, choose **Import verified content** on the overview to copy checked-in project/profile content into MongoDB. Existing projects are preserved and not duplicated by title. Admin edits are stored in MongoDB; static content is only the initial frontend fallback before the CMS is initialized.

## Production deployment

Deploy `server/` as a Node service with its server environment variables. Set `CLIENT_URL` to the public frontend origin. Deploy `FranTech-main/` as the Vite site and configure `VITE_API_URL` to the deployed API origin; this variable is public and must never contain a secret. The backend must allow the frontend origin, and the MongoDB Atlas network access list must allow the backend service.

The Vercel frontend rewrite serves the single-page app only; it does not host the API. Set `VITE_API_URL` in the Vercel project settings to the separately deployed backend origin and redeploy the frontend.

Frontend checks:

```bash
cd FranTech-main
npm run build
```

Backend syntax checks can be run with `node --check` on the changed files from `server/`. Database-backed integration tests require a reachable MongoDB instance and valid admin credentials.