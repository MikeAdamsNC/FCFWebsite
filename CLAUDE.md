# Working in this repo

## Hosting

- **Production**: Cloud Run service `fcf-web` in GCP project `fcf-website-prod`, region `us-east1`. Live at https://fcf-web-212881521255.us-east1.run.app.
- **Datastore**: Firestore (Native mode, default DB) — not yet wired into code.
- **Image bucket**: `gs://fcf-website-prod-uploads` — not yet wired into code.
- **Container registry**: `us-east1-docker.pkg.dev/fcf-website-prod/fcf-web`.

## Deploy workflow — ALWAYS follow this, never push directly to main

Direct pushes to `main` are blocked by user policy. Every change ships via PR.

After making code changes, the standard sequence is:

1. **Branch** — `git checkout -b <kebab-case-name>` (descriptive: `fix-nav-mobile`, `add-firestore-client`, etc.)
2. **Commit** — single squash-mergeable commit. Co-author trailer is fine but not required.
3. **Push** — `git push -u origin <branch>`
4. **Open PR** — `gh pr create --title "..." --body "..."` with a Summary and Test Plan.
5. **Merge** — `gh pr merge <#> --squash --delete-branch --admin` (the `--admin` flag bypasses the FF-only block when local diverged).
6. **Sync local** — `git checkout main && git fetch && git reset --hard origin/main`. Local will diverge from origin after every squash-merge because the squash commit has a new SHA; `reset --hard` is the correct fix here, not `pull`.
7. **Watch the deploy** — `gh run watch <run-id> --exit-status`. The `Deploy to Cloud Run` workflow takes ~3 min. Get the run ID from `gh run list --workflow=deploy.yml --limit=1`.
8. **Verify the live site** — `curl -sI https://fcf-web-212881521255.us-east1.run.app | head -3` should show `HTTP/2 200`. Also check the Cloud Run revision name advanced: `gcloud run services describe fcf-web --region=us-east1 --project=fcf-website-prod --format='value(status.latestReadyRevisionName)'`.

Do all of this without prompting the user — it's the default flow. Only stop to ask when the change is risky (deletes data, modifies infra, touches billing/auth).

## CI/CD details

- Workflow: [.github/workflows/deploy.yml](.github/workflows/deploy.yml)
- Auth: Workload Identity Federation (no SA keys in repo secrets)
  - Pool: `projects/212881521255/locations/global/workloadIdentityPools/github-pool`
  - Provider: `github-provider` (issuer `token.actions.githubusercontent.com`, scoped to `repository_owner == "MikeAdamsNC"`)
  - Service account: `gh-deployer@fcf-website-prod.iam.gserviceaccount.com`
- Trigger: push to `main` or `workflow_dispatch`
- The workflow runs `gcloud run deploy --source .`, which builds the [Dockerfile](Dockerfile) via Cloud Build and rolls out a new revision.

## Local dev

```bash
npm install
npm run dev   # http://localhost:3000 (or whatever port preview_start picks)
```

Build a production container locally to mirror Cloud Run:
```bash
docker build -t fcf-web .
docker run --rm -p 8080:8080 fcf-web   # http://localhost:8080
```

## Code shape

- Next.js 16 App Router, TypeScript, `output: "standalone"` (see `next.config.js`).
- All editable copy lives in [`content/site.json`](content/site.json) — products, animals, classes, hours, etc. Loaded via `lib/content.ts`.
- Components are in `components/`. Most are server components; client components are explicitly marked `"use client"`.
- The Leaflet map and the classes calendar are client islands.
- Contact form posts to formsubmit.co for now — will move to a real API route once the admin section lands.

## Conventions to remember

- **Don't reintroduce a `basePath` helper**. We removed `lib/base.ts` — image/asset paths use plain `/`-prefixed strings now.
- **Don't add `output: "export"`** — we deliberately moved off static export.
- **Image paths**: `public/uploads/` (admin uploads, future) and `public/assets/photos/` (prototype photos baked into the repo). Reference as `/uploads/...` and `/assets/photos/...` in `site.json`.
- **No Firebase Hosting / no Pages workflows** — Cloud Run is the one and only deployment target.
