"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { readSite, writeSite } from "@/lib/site-store";
import type { Product } from "@/lib/content-types";

type Result = { ok: true; message?: string } | { ok: false; error: string };

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60) || `item-${Date.now()}`;

function fromForm(form: FormData, fallbackId?: string): Product {
  const name = String(form.get("name") || "").trim();
  return {
    id: (String(form.get("id") || "").trim() || fallbackId || slug(name)),
    name,
    cut: String(form.get("cut") || "").trim(),
    price: Number(form.get("price")) || 0,
    unit: String(form.get("unit") || "").trim(),
    tag: (String(form.get("tag") || "").trim() || null) as string | null,
    image: String(form.get("image") || "").trim(),
  };
}

export async function saveProductAction(prev: Result | undefined, form: FormData): Promise<Result> {
  const site = await readSite();
  const indexRaw = form.get("__index");
  const index = indexRaw === null || indexRaw === "" ? -1 : Number(indexRaw);
  const item = fromForm(form, index >= 0 ? site.products[index]?.id : undefined);
  if (!item.name) return { ok: false, error: "Name is required" };
  const list = [...site.products];
  if (index >= 0 && index < list.length) list[index] = item;
  else list.push(item);
  await writeSite({ ...site, products: list });
  revalidatePath("/", "layout");
  redirect("/admin/products");
}

export async function deleteProductAction(index: number): Promise<Result> {
  const site = await readSite();
  if (index < 0 || index >= site.products.length) return { ok: false, error: "Item not found" };
  const list = [...site.products];
  list.splice(index, 1);
  await writeSite({ ...site, products: list });
  revalidatePath("/", "layout");
  return { ok: true };
}

export async function moveProductAction(index: number, dir: -1 | 1): Promise<Result> {
  const site = await readSite();
  const list = [...site.products];
  const target = index + dir;
  if (target < 0 || target >= list.length) return { ok: true };
  [list[index], list[target]] = [list[target], list[index]];
  await writeSite({ ...site, products: list });
  revalidatePath("/", "layout");
  return { ok: true };
}
