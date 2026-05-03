import "server-only";
import { Storage } from "@google-cloud/storage";

declare global {
  var __storage: Storage | undefined;
}

function client(): Storage {
  if (!globalThis.__storage) {
    globalThis.__storage = new Storage({ projectId: process.env.GCP_PROJECT });
  }
  return globalThis.__storage;
}

const BUCKET = process.env.GCS_UPLOADS_BUCKET || "";

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9.]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

export async function uploadImage(
  buffer: Buffer,
  originalName: string,
  contentType: string,
): Promise<{ url: string; path: string }> {
  if (!BUCKET) throw new Error("GCS_UPLOADS_BUCKET not configured");
  const ts = Date.now();
  const ext = (originalName.split(".").pop() || "bin").toLowerCase();
  const base = slugify(originalName.replace(/\.[^.]+$/, ""));
  const path = `uploads/${ts}-${base || "image"}.${ext}`;
  const file = client().bucket(BUCKET).file(path);
  await file.save(buffer, {
    contentType,
    resumable: false,
    metadata: { cacheControl: "public, max-age=31536000, immutable" },
  });
  return {
    path,
    url: `https://storage.googleapis.com/${BUCKET}/${path}`,
  };
}

export function isUploadUrl(url: string): boolean {
  return url.startsWith(`https://storage.googleapis.com/${BUCKET}/`);
}
