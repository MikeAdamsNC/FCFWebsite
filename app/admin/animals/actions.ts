"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { readSite, writeSite } from "@/lib/site-store";
import type { Animal, AnimalCls } from "@/lib/content-types";

type Result = { ok: true; message?: string } | { ok: false; error: string };

const slug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60) || `animal-${Date.now()}`;

const VALID_CLS: AnimalCls[] = ["a1", "a2", "a3", "a4", "a5", "a6"];

function fromForm(form: FormData, fallbackId?: string): Animal {
  const name = String(form.get("name") || "").trim();
  const clsRaw = String(form.get("cls") || "a1") as AnimalCls;
  return {
    id: String(form.get("id") || "").trim() || fallbackId || slug(name),
    name,
    count: String(form.get("count") || "").trim(),
    cls: VALID_CLS.includes(clsRaw) ? clsRaw : "a1",
    image: String(form.get("image") || "").trim(),
  };
}

export async function saveAnimalAction(_prev: Result | undefined, form: FormData): Promise<Result> {
  const site = await readSite();
  const indexRaw = form.get("__index");
  const index = indexRaw === null || indexRaw === "" ? -1 : Number(indexRaw);
  const item = fromForm(form, index >= 0 ? site.animals[index]?.id : undefined);
  if (!item.name) return { ok: false, error: "Name is required" };
  const list = [...site.animals];
  if (index >= 0 && index < list.length) list[index] = item;
  else list.push(item);
  await writeSite({ ...site, animals: list });
  revalidatePath("/", "layout");
  redirect("/admin/animals");
}

export async function deleteAnimalAction(index: number): Promise<Result> {
  const site = await readSite();
  if (index < 0 || index >= site.animals.length) return { ok: false, error: "Item not found" };
  const list = [...site.animals];
  list.splice(index, 1);
  await writeSite({ ...site, animals: list });
  revalidatePath("/", "layout");
  return { ok: true };
}

export async function moveAnimalAction(index: number, dir: -1 | 1): Promise<Result> {
  const site = await readSite();
  const list = [...site.animals];
  const target = index + dir;
  if (target < 0 || target >= list.length) return { ok: true };
  [list[index], list[target]] = [list[target], list[index]];
  await writeSite({ ...site, animals: list });
  revalidatePath("/", "layout");
  return { ok: true };
}
