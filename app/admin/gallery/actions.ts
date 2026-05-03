"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { readSite, writeSite } from "@/lib/site-store";
import type { GalleryItem } from "@/lib/content-types";

type Result = { ok: true; message?: string } | { ok: false; error: string };

const VALID_CLS: GalleryItem["cls"][] = ["tall", "sq", "wide"];

function fromForm(form: FormData): GalleryItem {
  const clsRaw = String(form.get("cls") || "sq") as GalleryItem["cls"];
  return {
    image: String(form.get("image") || "").trim(),
    cls: VALID_CLS.includes(clsRaw) ? clsRaw : "sq",
    label: String(form.get("label") || "").trim(),
  };
}

export async function saveGalleryAction(_prev: Result | undefined, form: FormData): Promise<Result> {
  const site = await readSite();
  const indexRaw = form.get("__index");
  const index = indexRaw === null || indexRaw === "" ? -1 : Number(indexRaw);
  const item = fromForm(form);
  if (!item.image) return { ok: false, error: "Image is required" };
  const list = [...site.gallery];
  if (index >= 0 && index < list.length) list[index] = item;
  else list.push(item);
  await writeSite({ ...site, gallery: list });
  revalidatePath("/", "layout");
  redirect("/admin/gallery");
}

export async function deleteGalleryAction(index: number): Promise<Result> {
  const site = await readSite();
  if (index < 0 || index >= site.gallery.length) return { ok: false, error: "Item not found" };
  const list = [...site.gallery];
  list.splice(index, 1);
  await writeSite({ ...site, gallery: list });
  revalidatePath("/", "layout");
  return { ok: true };
}

export async function moveGalleryAction(index: number, dir: -1 | 1): Promise<Result> {
  const site = await readSite();
  const list = [...site.gallery];
  const target = index + dir;
  if (target < 0 || target >= list.length) return { ok: true };
  [list[index], list[target]] = [list[target], list[index]];
  await writeSite({ ...site, gallery: list });
  revalidatePath("/", "layout");
  return { ok: true };
}
