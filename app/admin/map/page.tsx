import { getSite } from "@/lib/content";
import { MapEditor } from "./MapEditor";

export const metadata = { title: "Map pin" };

export default function MapPage() {
  const site = getSite();
  return <MapEditor initial={site.map} />;
}
