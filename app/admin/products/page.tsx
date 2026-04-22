import { getSite } from "@/lib/content";
import { ProductsEditor } from "./ProductsEditor";

export const metadata = { title: "Products" };

export default function ProductsPage() {
  return <ProductsEditor initial={getSite().products} />;
}
