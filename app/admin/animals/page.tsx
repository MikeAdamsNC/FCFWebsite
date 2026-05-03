import Link from "next/link";
import { getSite } from "@/lib/content";
import { ListActions } from "@/components/admin/ListActions";
import { deleteAnimalAction, moveAnimalAction } from "./actions";

export const metadata = { title: "Animals" };

export default async function AnimalsListPage() {
  const { animals } = await getSite();
  return (
    <>
      <div className="admin-header">
        <div>
          <div className="crumb">Lists</div>
          <h1>Animals</h1>
        </div>
        <Link href="/admin/animals/new" className="admin-btn primary">+ New animal</Link>
      </div>
      {animals.length === 0 ? (
        <div className="admin-list"><div className="admin-list-empty">No animals yet.</div></div>
      ) : (
        <div className="admin-list">
          {animals.map((a, i) => (
            <div key={a.id + i} className="admin-list-row">
              <div className="thumb" style={a.image ? { backgroundImage: `url(${a.image})` } : undefined} />
              <div className="meta"><strong>{a.name}</strong><span>{a.count} · grid slot {a.cls}</span></div>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <Link href={`/admin/animals/${i}`} className="admin-btn subtle">Edit</Link>
                <ListActions
                  index={i}
                  total={animals.length}
                  onMove={moveAnimalAction}
                  onDelete={deleteAnimalAction}
                  deleteConfirm={`Delete "${a.name}"?`}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
