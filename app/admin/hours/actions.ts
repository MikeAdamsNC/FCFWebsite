"use server";

import { revalidatePath } from "next/cache";
import { readSite, writeSite } from "@/lib/site-store";

type Result = { ok: true; message?: string } | { ok: false; error: string };

export async function saveHoursAction(_prev: Result | undefined, form: FormData): Promise<Result> {
  const site = await readSite();
  const days = form.getAll("hours.days").map((v) => Number(v)).filter((v) => Number.isFinite(v));
  const display: { label: string; value: string }[] = [];
  for (let i = 0; i < site.hours.display.length; i++) {
    display.push({
      label: String(form.get(`hours.display.${i}.label`) || "").trim(),
      value: String(form.get(`hours.display.${i}.value`) || "").trim(),
    });
  }
  await writeSite({
    ...site,
    hours: {
      days,
      open: Number(form.get("hours.open")) || 0,
      close: Number(form.get("hours.close")) || 0,
      display,
    },
  });
  revalidatePath("/", "layout");
  return { ok: true };
}
