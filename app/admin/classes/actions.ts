"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { readSite, writeSite } from "@/lib/site-store";
import type { ClassEvent } from "@/lib/content-types";

type Result = { ok: true; message?: string } | { ok: false; error: string };

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function fromForm(form: FormData, fallbackId?: string): ClassEvent {
  const dateStr = String(form.get("date") || "").trim();
  let month = "";
  let day = 0;
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    const d = new Date(dateStr + "T12:00:00");
    month = MONTHS[d.getUTCMonth()];
    day = d.getUTCDate();
  }
  return {
    id: String(form.get("id") || "").trim() || fallbackId || `class-${Date.now()}`,
    date: dateStr,
    month,
    day,
    name: String(form.get("name") || "").trim(),
    time: String(form.get("time") || "").trim(),
    seats: String(form.get("seats") || "").trim(),
    price: Number(form.get("price")) || 0,
    desc: String(form.get("desc") || "").trim(),
  };
}

export async function saveClassAction(_prev: Result | undefined, form: FormData): Promise<Result> {
  const site = await readSite();
  const indexRaw = form.get("__index");
  const index = indexRaw === null || indexRaw === "" ? -1 : Number(indexRaw);
  const item = fromForm(form, index >= 0 ? site.classes[index]?.id : undefined);
  if (!item.name) return { ok: false, error: "Name is required" };
  if (!item.date) return { ok: false, error: "Date is required" };
  const list = [...site.classes];
  if (index >= 0 && index < list.length) list[index] = item;
  else list.push(item);
  list.sort((a, b) => a.date.localeCompare(b.date));
  await writeSite({ ...site, classes: list });
  revalidatePath("/", "layout");
  redirect("/admin/classes");
}

export async function deleteClassAction(index: number): Promise<Result> {
  const site = await readSite();
  if (index < 0 || index >= site.classes.length) return { ok: false, error: "Item not found" };
  const list = [...site.classes];
  list.splice(index, 1);
  await writeSite({ ...site, classes: list });
  revalidatePath("/", "layout");
  return { ok: true };
}

export async function moveClassAction(index: number, dir: -1 | 1): Promise<Result> {
  const site = await readSite();
  const list = [...site.classes];
  const target = index + dir;
  if (target < 0 || target >= list.length) return { ok: true };
  [list[index], list[target]] = [list[target], list[index]];
  await writeSite({ ...site, classes: list });
  revalidatePath("/", "layout");
  return { ok: true };
}
