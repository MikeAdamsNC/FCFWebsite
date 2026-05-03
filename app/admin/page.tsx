import Link from "next/link";
import { getSite } from "@/lib/content";

export default async function AdminDashboard() {
  const site = await getSite();
  const counts = {
    products: site.products.length,
    animals: site.animals.length,
    classes: site.classes.length,
    gallery: site.gallery.length,
    stock: site.stock.length,
  };
  return (
    <>
      <div className="admin-header">
        <div>
          <div className="crumb">Admin</div>
          <h1>Dashboard</h1>
        </div>
        <Link href="/" className="admin-btn subtle" target="_blank">
          View site →
        </Link>
      </div>

      <div className="admin-section">
        <h2>Welcome</h2>
        <p className="section-help">
          Edit any part of the site from here. Changes go live immediately on save — no rebuild needed.
        </p>
        <div className="admin-grid" style={{ marginTop: 16 }}>
          {Object.entries(counts).map(([k, n]) => (
            <Link
              key={k}
              href={`/admin/${k}`}
              className="admin-field"
              style={{
                border: "1px solid var(--rule)",
                borderRadius: 4,
                padding: "14px 16px",
                textDecoration: "none",
                color: "var(--ink)",
              }}
            >
              <span style={{ fontFamily: "var(--sans)", fontSize: 12, color: "var(--umber-soft)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                {k}
              </span>
              <strong style={{ fontFamily: "var(--serif)", fontSize: 28 }}>{n}</strong>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
