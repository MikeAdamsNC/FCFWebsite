"use server";

import { revalidatePath } from "next/cache";
import { readSite, writeSite } from "@/lib/site-store";

type Result = { ok: true; message?: string } | { ok: false; error: string };

const s = (form: FormData, key: string) => String(form.get(key) ?? "").trim();
const n = (form: FormData, key: string) => {
  const v = Number(form.get(key));
  return Number.isFinite(v) ? v : 0;
};

export async function saveGeneralAction(_prev: Result | undefined, form: FormData): Promise<Result> {
  const site = await readSite();
  const next = {
    ...site,
    brand: {
      ...site.brand,
      name: s(form, "brand.name"),
      tagline: s(form, "brand.tagline"),
      shortTagline: s(form, "brand.shortTagline"),
      logoUrl: s(form, "brand.logoUrl"),
      established: s(form, "brand.established"),
    },
    contact: {
      ...site.contact,
      phone: s(form, "contact.phone"),
      phoneHref: s(form, "contact.phoneHref"),
      email: s(form, "contact.email"),
      address: {
        street: s(form, "contact.address.street"),
        city: s(form, "contact.address.city"),
        state: s(form, "contact.address.state"),
        zip: s(form, "contact.address.zip"),
      },
    },
    social: {
      facebook: s(form, "social.facebook"),
      instagram: s(form, "social.instagram"),
    },
    shopLinks: {
      barn2door: s(form, "shopLinks.barn2door"),
    },
    map: {
      ...site.map,
      lat: n(form, "map.lat"),
      lng: n(form, "map.lng"),
      zoom: n(form, "map.zoom"),
      pinLabel: s(form, "map.pinLabel"),
      directionsUrl: s(form, "map.directionsUrl"),
    },
  };
  await writeSite(next);
  revalidatePath("/", "layout");
  return { ok: true };
}
