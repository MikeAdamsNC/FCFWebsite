import Link from "next/link";
import { getSite } from "@/lib/content";
import { ListActions } from "@/components/admin/ListActions";
import { deleteGalleryAction, moveGalleryAction } from "./actions";

export const metadata = { title: "Gallery" };

export default async function GalleryListPage() {
  const { gallery } = await getSite();
  return (
    <>
      <div className="admin-header">
        <div>
          <div className="crumb">Lists</div>
          <h1>Gallery</h1>
        </div>
        <Link href="/admin/gallery/new" className="admin-btn primary">+ Add photo</Link>
      </div>
      {gallery.length === 0 ? (
        <div className="admin-list"><div className="admin-list-empty">No gallery photos yet.</div></div>
      ) : (
        <div className="admin-list">
          {gallery.map((g, i) => (
            <div key={i} className="admin-list-row">
              <div className="thumb" style={g.image ? { backgroundImage: `url(${g.image})` } : undefined} />
              <div className="meta"><strong>{g.label || `Photo ${i + 1}`}</strong><span>{g.cls} layout</span></div>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <Link href={`/admin/gallery/${i}`} className="admin-btn subtle">Edit</Link>
                <ListActions
                  index={i}
                  total={gallery.length}
                  onMove={moveGalleryAction}
                  onDelete={deleteGalleryAction}
                  deleteConfirm="Delete this photo?"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
