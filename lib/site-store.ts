import "server-only";
import { db } from "./firestore";
import seed from "@/content/site.json";
import type { SiteContent } from "./content-types";

const DOC = "site/main";

let memo: SiteContent | null = null;
let memoAt = 0;
const MEMO_TTL_MS = 5_000;

export async function readSite(): Promise<SiteContent> {
  const now = Date.now();
  if (memo && now - memoAt < MEMO_TTL_MS) return memo;
  const snap = await db().doc(DOC).get();
  if (!snap.exists) {
    const initial = seed as unknown as SiteContent;
    await db().doc(DOC).set(initial);
    memo = initial;
    memoAt = now;
    return initial;
  }
  const data = snap.data() as SiteContent;
  memo = data;
  memoAt = now;
  return data;
}

export async function writeSite(next: SiteContent): Promise<void> {
  await db().doc(DOC).set(next);
  memo = next;
  memoAt = Date.now();
}

export function invalidateMemo(): void {
  memo = null;
  memoAt = 0;
}
