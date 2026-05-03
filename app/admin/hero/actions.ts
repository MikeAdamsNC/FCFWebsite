"use server";

import { revalidatePath } from "next/cache";
import { readSite, writeSite } from "@/lib/site-store";

type Result = { ok: true; message?: string } | { ok: false; error: string };

export async function saveHeroAction(_prev: Result | undefined, form: FormData): Promise<Result> {
  const site = await readSite();
  const meta: { label: string; value: string }[] = [];
  for (let i = 0; i < site.hero.meta.length; i++) {
    meta.push({
      label: String(form.get(`hero.meta.${i}.label`) || "").trim(),
      value: String(form.get(`hero.meta.${i}.value`) || "").trim(),
    });
  }
  await writeSite({
    ...site,
    hero: {
      titleVariant: String(form.get("hero.titleVariant") || "cluck"),
      heroVariant: String(form.get("hero.heroVariant") || "polaroid"),
      eyebrow: String(form.get("hero.eyebrow") || "").trim(),
      subcopy: String(form.get("hero.subcopy") || "").trim(),
      meta,
    },
  });
  revalidatePath("/", "layout");
  return { ok: true };
}
