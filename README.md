# Fuster Cluck Farm

Production site for Fuster Cluck Farm. Built from the React prototype in `Docs/`.

- **Framework**: Next.js 16 (App Router) + TypeScript
- **Output**: Static HTML (`next build` → `out/`)
- **Hosting**: GitHub Pages (free, unlimited bandwidth, commercial-OK, custom domain + free SSL)
- **Content**: All editable copy lives in [`content/site.json`](content/site.json)
- **Map**: Leaflet + OpenStreetMap (no API key)
- **Contact form**: [Formsubmit.co](https://formsubmit.co/) — no backend needed

## Editing the site

Every piece of editable text and image path lives in [`content/site.json`](content/site.json) — products, animals, classes, stock, hours, gallery, page copy, map pin, etc.

To edit:

1. Open the file in GitHub's web editor (`.` key on the repo page) or pull locally.
2. Change the JSON values. Wrap words in `<em>...</em>` for italic emphasis where supported.
3. Commit to `main`. GitHub Actions rebuilds and redeploys in ~2 minutes.

Images live in `public/uploads/` (admin uploads go here) or `public/assets/photos/` (prototype photos). Upload by drag-dropping files into the GitHub web UI at that path, then point a `site.json` image field at `/uploads/yourfile.jpg`.

## Getting started locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

Automatic. Any push to `main` triggers `.github/workflows/deploy.yml`:

1. Checkout + install + `next build` (static export to `out/`).
2. Upload `out/` as a Pages artifact.
3. Deploy to GitHub Pages.

First-time setup (one-time):

1. In the repo's **Settings → Pages**, set **Source** to **GitHub Actions**.
2. Push anything to `main`. The workflow runs and publishes to `https://<user>.github.io/<repo>/`.
3. For a custom domain: add `CNAME` file to `public/` with the domain, point DNS `CNAME` record at `<user>.github.io`, and enable **Enforce HTTPS** in Pages settings.

## Tech notes

- **Static export** — no server, no API routes, no env vars at runtime. Everything is HTML + client JS + assets.
- **Leaflet map** is a client-only island via `next/dynamic` with `ssr: false`.
- **Classes calendar** (`components/ClassesCalendar.tsx`) is a client component reading the classes list from the static JSON.
- **Contact form** POSTs to Formsubmit.co. First submission you send triggers a confirmation email — click it to activate.
- **Prototype files** live in `Docs/` for reference.
