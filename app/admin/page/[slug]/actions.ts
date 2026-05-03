"use server";

import { revalidatePath } from "next/cache";
import { readSite, writeSite } from "@/lib/site-store";
import type { SiteContent } from "@/lib/content-types";

type Result = { ok: true; message?: string } | { ok: false; error: string };

const s = (form: FormData, key: string) => String(form.get(key) ?? "").trim();

const SLUG_TO_KEY: Record<string, keyof SiteContent["pages"]> = {
  animals: "animals",
  about: "about",
  classes: "classes",
  "farm-store": "farmStore",
  contact: "contact",
  gallery: "gallery",
};

export async function savePageAction(_prev: Result | undefined, form: FormData): Promise<Result> {
  const slug = String(form.get("__slug") || "");
  const key = SLUG_TO_KEY[slug];
  if (!key) return { ok: false, error: "Unknown page" };

  const site = await readSite();
  const pages = { ...site.pages } as SiteContent["pages"];

  if (key === "animals") {
    const sections: { eyebrow: string; heading: string; body: string }[] = [];
    for (let i = 0; ; i++) {
      const e = form.get(`sections.${i}.eyebrow`);
      if (e === null) break;
      sections.push({
        eyebrow: s(form, `sections.${i}.eyebrow`),
        heading: s(form, `sections.${i}.heading`),
        body: s(form, `sections.${i}.body`),
      });
    }
    pages.animals = { title: s(form, "title"), lede: s(form, "lede"), sections };
  } else if (key === "about") {
    const beliefs: { heading: string; body: string }[] = [];
    for (let i = 0; ; i++) {
      const h = form.get(`beliefs.${i}.heading`);
      if (h === null) break;
      beliefs.push({
        heading: s(form, `beliefs.${i}.heading`),
        body: s(form, `beliefs.${i}.body`),
      });
    }
    const body = s(form, "body").split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
    pages.about = {
      title: s(form, "title"),
      lede: s(form, "lede"),
      eyebrow: s(form, "eyebrow"),
      heading: s(form, "heading"),
      body,
      portrait: s(form, "portrait"),
      beliefs,
    };
  } else if (key === "farmStore") {
    pages.farmStore = {
      title: s(form, "title"),
      lede: s(form, "lede"),
      coolerHeading: s(form, "coolerHeading"),
      coolerSub: s(form, "coolerSub"),
      heroImage: s(form, "heroImage"),
      mapHeading: s(form, "mapHeading"),
      mapSectionNum: s(form, "mapSectionNum"),
    };
  } else if (key === "classes" || key === "contact" || key === "gallery") {
    pages[key] = { title: s(form, "title"), lede: s(form, "lede") };
  }

  await writeSite({ ...site, pages });
  revalidatePath("/", "layout");
  return { ok: true };
}
