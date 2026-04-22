import { getSite } from "@/lib/content";
import { HoursEditor } from "./HoursEditor";

export const metadata = { title: "Hours & announce" };

export default function HoursPage() {
  const site = getSite();
  return <HoursEditor initialHours={site.hours} initialAnnounce={site.announce} />;
}
