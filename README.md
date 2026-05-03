# Fuster Cluck Farm

Production site for Fuster Cluck Farm. Built from the React prototype in `Docs/`.

- **Framework**: Next.js 16 (App Router) + TypeScript
- **Output**: Server (Node) — `output: "standalone"` in `next.config.js`
- **Hosting target**: Google Cloud Run (containerized)
- **Content**: Editable copy lives in [`content/site.json`](content/site.json)
- **Map**: Leaflet + OpenStreetMap (no API key)
- **Contact form**: [Formsubmit.co](https://formsubmit.co/) — no backend needed (will move to a real API route once the admin section lands)

## Editing the site

Every piece of editable text and image path lives in [`content/site.json`](content/site.json) — products, animals, classes, stock, hours, gallery, page copy, map pin, etc.

Images live in `public/uploads/` (admin uploads will go here) or `public/assets/photos/` (prototype photos). Reference them in `site.json` with paths like `/uploads/yourfile.jpg`.

## Getting started locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build & run a production container locally

```bash
docker build -t fcf-web .
docker run --rm -p 8080:8080 fcf-web
```

Then open [http://localhost:8080](http://localhost:8080).

## Deploy to Google Cloud Run

One-time setup (set these to match your GCP project):

```bash
PROJECT_ID=your-gcp-project-id
REGION=us-east1
SERVICE=fcf-web

gcloud config set project "$PROJECT_ID"
gcloud services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com
```

Build & deploy from source (Cloud Build picks up the `Dockerfile`):

```bash
gcloud run deploy "$SERVICE" \
  --source . \
  --region "$REGION" \
  --allow-unauthenticated \
  --port 8080
```

For a custom domain, map it in the Cloud Run console (Domain Mappings) or with `gcloud run domain-mappings create`.

## Tech notes

- **Standalone output** — `next build` emits `.next/standalone/server.js`, which the Dockerfile copies into a slim runtime image. No dev dependencies in the final layer.
- **Leaflet map** is a client-only island via `next/dynamic` with `ssr: false`.
- **Classes calendar** (`components/ClassesCalendar.tsx`) is a client component reading the classes list from the static JSON.
- **Contact form** POSTs to Formsubmit.co. First submission triggers a confirmation email — click it to activate.
- **Prototype files** live in `Docs/` for reference.
