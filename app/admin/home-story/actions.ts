"use server";

import { revalidatePath } from "next/cache";
import { readSite, writeSite } from "@/lib/site-store";

type Result = { ok: true; message?: string } | { ok: false; error: string };

export async function saveHomeStoryAction(_prev: Result | undefined, form: FormData): Promise<Result> {
  const site = await readSite();
  const body = String(form.get("homeStory.body") || "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
  await writeSite({
    ...site,
    homeStory: {
      eyebrow: String(form.get("homeStory.eyebrow") || "").trim(),
      heading: String(form.get("homeStory.heading") || "").trim(),
      body,
      signature: String(form.get("homeStory.signature") || "").trim(),
      image: String(form.get("homeStory.image") || "").trim(),
    },
    homeQuote: {
      text: String(form.get("homeQuote.text") || "").trim(),
      cite: String(form.get("homeQuote.cite") || "").trim(),
    },
    homeCta: {
      eyebrow: String(form.get("homeCta.eyebrow") || "").trim(),
      heading: String(form.get("homeCta.heading") || "").trim(),
      body: String(form.get("homeCta.body") || "").trim(),
    },
  });
  revalidatePath("/", "layout");
  return { ok: true };
}
