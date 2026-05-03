import Link from "next/link";
import { getSite } from "@/lib/content";
import { ListActions } from "@/components/admin/ListActions";
import { deleteClassAction, moveClassAction } from "./actions";

export const metadata = { title: "Classes" };

export default async function ClassesListPage() {
  const { classes } = await getSite();
  return (
    <>
      <div className="admin-header">
        <div>
          <div className="crumb">Lists</div>
          <h1>Classes</h1>
        </div>
        <Link href="/admin/classes/new" className="admin-btn primary">+ New class</Link>
      </div>
      {classes.length === 0 ? (
        <div className="admin-list"><div className="admin-list-empty">No classes scheduled.</div></div>
      ) : (
        <div className="admin-list">
          {classes.map((c, i) => (
            <div key={c.id + i} className="admin-list-row">
              <div className="thumb" style={{ display: "grid", placeItems: "center", background: "var(--cream)" }}>
                <div style={{ textAlign: "center", lineHeight: 1.1 }}>
                  <div style={{ fontSize: 11, color: "var(--umber-soft)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{c.month}</div>
                  <div style={{ fontFamily: "var(--serif)", fontSize: 22 }}>{c.day}</div>
                </div>
              </div>
              <div className="meta">
                <strong>{c.name}</strong>
                <span>{c.date} · {c.time} · ${c.price}</span>
              </div>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <Link href={`/admin/classes/${i}`} className="admin-btn subtle">Edit</Link>
                <ListActions
                  index={i}
                  total={classes.length}
                  onMove={async (idx, dir) => moveClassAction(idx, dir)}
                  onDelete={async (idx) => deleteClassAction(idx)}
                  deleteConfirm={`Delete "${c.name}"?`}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
