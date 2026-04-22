import { getSite } from "@/lib/content";
import { PagesEditor } from "./PagesEditor";

export const metadata = { title: "Page copy" };

export default function AdminPagesPage() {
  return <PagesEditor initial={getSite().pages} />;
}
