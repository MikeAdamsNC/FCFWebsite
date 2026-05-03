import Link from "next/link";
import { getSite } from "@/lib/content";
import { ListActions } from "@/components/admin/ListActions";
import { deleteProductAction, moveProductAction } from "./actions";

export const metadata = { title: "Products" };

export default async function ProductsListPage() {
  const { products } = await getSite();
  return (
    <>
      <div className="admin-header">
        <div>
          <div className="crumb">Lists</div>
          <h1>Products</h1>
        </div>
        <Link href="/admin/products/new" className="admin-btn primary">
          + New product
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="admin-list">
          <div className="admin-list-empty">No products yet. Add the first one.</div>
        </div>
      ) : (
        <div className="admin-list">
          {products.map((p, i) => (
            <div key={p.id + i} className="admin-list-row">
              <div className="thumb" style={p.image ? { backgroundImage: `url(${p.image})` } : undefined} />
              <div className="meta">
                <strong>{p.name}</strong>
                <span>
                  {p.cut} · ${p.price.toFixed(2)} / {p.unit}
                  {p.tag ? ` · ${p.tag}` : ""}
                </span>
              </div>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <Link href={`/admin/products/${i}`} className="admin-btn subtle">
                  Edit
                </Link>
                <ListActions
                  index={i}
                  total={products.length}
                  onMove={async (idx, dir) => moveProductAction(idx, dir)}
                  onDelete={async (idx) => deleteProductAction(idx)}
                  deleteConfirm={`Delete "${p.name}"?`}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
