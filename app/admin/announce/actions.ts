"use server";

import { revalidatePath } from "next/cache";
import { readSite, writeSite } from "@/lib/site-store";

type Result = { ok: true; message?: string } | { ok: false; error: string };

export async function saveAnnounceAction(_prev: Result | undefined, form: FormData): Promise<Result> {
  const site = await readSite();
  await writeSite({
    ...site,
    announce: {
      message: String(form.get("announce.message") || "").trim(),
      link: String(form.get("announce.link") || "").trim(),
      linkLabel: String(form.get("announce.linkLabel") || "").trim(),
    },
  });
  revalidatePath("/", "layout");
  return { ok: true };
}
