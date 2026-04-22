import { getSite } from "@/lib/content";
import { ClassesEditor } from "./ClassesEditor";

export const metadata = { title: "Classes" };

export default function AdminClassesPage() {
  return <ClassesEditor initial={getSite().classes} />;
}
