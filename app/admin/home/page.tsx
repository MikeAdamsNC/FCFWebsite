import { getSite } from "@/lib/content";
import { HomeEditor } from "./HomeEditor";

export const metadata = { title: "Home story + CTA" };

export default function HomeEditPage() {
  const site = getSite();
  return (
    <HomeEditor
      initialStory={site.homeStory}
      initialQuote={site.homeQuote}
      initialCta={site.homeCta}
    />
  );
}
