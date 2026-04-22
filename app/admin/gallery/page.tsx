import { getSite } from "@/lib/content";
import { GalleryEditor } from "./GalleryEditor";

export const metadata = { title: "Gallery" };

export default function AdminGalleryPage() {
  return <GalleryEditor initial={getSite().gallery} />;
}
