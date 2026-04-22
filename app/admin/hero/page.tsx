import { getSite } from "@/lib/content";
import { HeroEditor } from "./HeroEditor";

export const metadata = { title: "Home hero" };

export default function HeroPage() {
  const site = getSite();
  return <HeroEditor initial={site.hero} />;
}
