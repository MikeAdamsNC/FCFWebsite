"use server";

import { revalidatePath } from "next/cache";
import { readSite, writeSite } from "@/lib/site-store";
import type { StockItem } from "@/lib/content-types";

type Result = { ok: true; message?: string } | { ok: false; error: string };

const VALID: StockItem["state"][] = ["in", "low", "out"];

export async function saveStockAction(_prev: Result | undefined, form: FormData): Promise<Result> {
  const raw = String(form.get("payload") || "[]");
  let items: unknown;
  try {
    items = JSON.parse(raw);
  } catch {
    return { ok: false, error: "Could not parse stock list" };
  }
  if (!Array.isArray(items)) return { ok: false, error: "Stock must be a list" };
  const stock: StockItem[] = items
    .map((it) => {
      const o = it as Record<string, unknown>;
      const state = (typeof o.state === "string" ? o.state : "in") as StockItem["state"];
      return {
        name: typeof o.name === "string" ? o.name.trim() : "",
        state: VALID.includes(state) ? state : "in",
        tag: typeof o.tag === "string" ? o.tag.trim() : "",
      };
    })
    .filter((s) => s.name);
  const site = await readSite();
  await writeSite({ ...site, stock });
  revalidatePath("/", "layout");
  return { ok: true };
}
