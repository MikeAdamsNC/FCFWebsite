import { getSite } from "@/lib/content";
import { StockEditor } from "./StockEditor";

export const metadata = { title: "Stock" };

export default function AdminStockPage() {
  return <StockEditor initial={getSite().stock} />;
}
