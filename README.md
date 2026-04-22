# Fuster Cluck Farm

Production site for [fustercluckfarm.com](https://fustercluckfarm.com) (or your chosen domain). Built from the React prototype in `Docs/`.

- **Framework**: Next.js 16 (App Router) + TypeScript
- **Hosting**: Cloudflare Pages (free, commercial-OK)
- **Content**: `content/site.json` in this repo — every admin save commits back here
- **Images**: `public/uploads/` in this repo — admin uploads commit back here
- **Admin**: `/admin` — single shared password, session cookie
- **Map**: Leaflet + OpenStreetMap (no API key needed)

## Getting started

```bash
npm install
cp .env.local.example .env.local   # fill in the four vars
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the site, [http://localhost:3000/admin](http://localhost:3000/admin) for the admin.

**Required env vars** (see `.env.local.example`):

| Var | What it is |
|---|---|
| `ADMIN_PASSWORD` | The shared password editors type at `/admin/login`. |
| `AUTH_SECRET` | 32+ byte random hex. Signs the admin session cookie. Generate with `openssl rand -hex 32`. |
| `GITHUB_REPO` | `owner/name` of this repo. Admin commits land here. |
| `GITHUB_TOKEN` | [Fine-grained PAT](https://github.com/settings/personal-access-tokens/new) with **Contents: write** on this repo only. |
| `GITHUB_BRANCH` | (optional) Defaults to `main`. |

Without `ADMIN_PASSWORD` + `AUTH_SECRET`, `/admin` returns a "not configured" 500 by design.

## Content model

Single source of truth: [`content/site.json`](content/site.json). Every editable field lives here. When admin clicks "Save," the Pages Function commits a new `site.json` (or uploads a file to `public/uploads/`) via the GitHub Contents API. Cloudflare Pages sees the push and redeploys; edits go live in ~45 seconds.

| Admin section | Edits |
|---|---|
| Brand & contact | Farm name, tagline, logo, phone, email, address, social URLs |
| Hours & announce | Open days, hours, display schedule, top-bar announcement |
| Map pin | Interactive Leaflet picker — drag the pin, or type lat/lng |
| Home hero | Headline variant, hero layout, eyebrow, subcopy, meta badges |
| Home story + CTA | Story section paragraphs + signature, quote, classes CTA |
| Products | Name, cut, price, unit, badge, image |
| Animals | Name, caption, grid slot, image |
| Classes | Date, name, time, seats, price, description |
| Stock | Item name, status (in/low/out), label |
| Gallery | Photos + shape (tall/sq/wide) |
| Page copy | Titles, ledes, and body copy across every page |

All text fields accept `<em>...</em>` for italic emphasis.

## Deploying to Cloudflare Pages

1. **Push to GitHub.**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   gh repo create fuster-cluck-farm --private --source=. --remote=origin --push
   ```

2. **Create the Pages project.** In Cloudflare dashboard: _Workers & Pages → Create → Pages → Connect to Git_. Pick the repo. Set:
   - **Framework preset**: Next.js
   - **Build command**: `npx @cloudflare/next-on-pages@1`
   - **Build output**: `.vercel/output/static`
   - **Root directory**: `/`

3. **Set env vars** (_Project settings → Environment variables_, for **Production** and optionally **Preview**):
   - `ADMIN_PASSWORD`
   - `AUTH_SECRET`
   - `GITHUB_REPO`
   - `GITHUB_TOKEN`
   - `GITHUB_BRANCH` (optional, default `main`)

4. **Add `@cloudflare/next-on-pages` and Node compat flag.** Run locally once:
   ```bash
   npm install --save-dev @cloudflare/next-on-pages
   ```
   In the Cloudflare Pages project settings under **Functions → Compatibility flags**, add `nodejs_compat` for both Production and Preview.

5. **Custom domain.** Register at [Cloudflare Registrar](https://dash.cloudflare.com/?to=/:account/registrar) (~$10.44/yr for `.com` at cost), then _Pages → Custom domains → Add_. DNS + SSL configure themselves.

## Verification checklist

After each deploy:

- [ ] Every public page (`/`, `/about`, `/animals`, `/classes`, `/contact`, `/farm-store`, `/gallery`) returns 200 and matches the prototype layout.
- [ ] `/farm-store` shows a real pan/zoomable map centered on your pin.
- [ ] `/contact` form submits — you receive the email (check spam first time, Formsubmit sends a confirmation).
- [ ] `/admin` redirects unauth users to `/admin/login`. Logging in with `ADMIN_PASSWORD` lands on the dashboard.
- [ ] Editing a product name + saving produces a `admin: update products` commit in GitHub, and the live site shows the change after the redeploy finishes.
- [ ] Uploading a new gallery image produces an `admin: upload ...` commit and the image appears on `/gallery`.
- [ ] Dragging the pin in `/admin/map`, saving, then refreshing `/farm-store` shows the pin in the new location.

## Notes

- **Edits take ~45-60 s to go live.** Every save triggers a Cloudflare rebuild.
- **Contact form** submits to [Formsubmit.co](https://formsubmit.co/) (no account, no backend). First submission triggers a confirmation email — click it to activate.
- **Leaflet + OSM** is used instead of Google Maps — no API key, free tiles. If you ever want to swap to Google Maps, only `components/FarmMap.tsx` and `components/admin/MapPicker.tsx` need to change.
- **Prototype files** live in `Docs/` for reference — untouched by the build.
- **Revoking a co-editor**: change `ADMIN_PASSWORD` in Cloudflare env vars and redeploy. The next request from an old cookie still validates until the HMAC-signed cookie expires (30 days); to force logout everyone, also rotate `AUTH_SECRET`.
