import "server-only";
import { readSite } from "./site-store";
import type { SiteContent } from "./content-types";

export * from "./content-types";

export async function getSite(): Promise<SiteContent> {
  return readSite();
}
