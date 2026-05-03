import { getSite } from "@/lib/content";
import { StockEditor } from "./editor";

export const metadata = { title: "Stock status" };

export default async function StockPage() {
  const { stock } = await getSite();
  return (
    <>
      <div className="admin-header">
        <div>
          <div className="crumb">Lists</div>
          <h1>Stock status</h1>
        </div>
      </div>
      <StockEditor initial={stock} />
    </>
  );
}
