import { getSite } from "@/lib/content";
import { AnimalsEditor } from "./AnimalsEditor";

export const metadata = { title: "Animals" };

export default function AdminAnimalsPage() {
  return <AnimalsEditor initial={getSite().animals} />;
}
