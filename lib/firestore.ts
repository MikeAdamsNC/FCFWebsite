import "server-only";
import { Firestore } from "@google-cloud/firestore";

declare global {
  var __firestore: Firestore | undefined;
}

export function db(): Firestore {
  if (!globalThis.__firestore) {
    globalThis.__firestore = new Firestore({
      projectId: process.env.GCP_PROJECT,
      ignoreUndefinedProperties: true,
    });
  }
  return globalThis.__firestore;
}
