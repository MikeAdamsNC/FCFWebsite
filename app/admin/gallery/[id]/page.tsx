import Link from "next/link";
import { notFound } from "next/navigation";
import { getSite } from "@/lib/content";
import { TextField, SelectField } from "@/components/admin/Field";
import { ImageField } from "@/components/admin/ImageField";
import { SectionForm } from "@/components/admin/SectionForm";
import { saveGalleryAction } from "../actions";

export const metadata = { title: "Edit gallery photo" };

const CLS = [
  { value: "tall", label: "Tall (3:4)" },
  { value: "sq", label: "Square (1:1)" },
  { value: "wide", label: "Wide (4:3)" },
];

type Params = Promise<{ id: string }>;

export default async function EditGalleryPage({ params }: { params: Params }) {
  const { id } = await params;
  const isNew = id === "new";
  const { gallery } = await getSite();
  const index = isNew ? -1 : Number(id);
  const item = isNew ? null : gallery[index];
  if (!isNew && !item) notFound();
  const g = item ?? { image: "", cls: "sq" as const, label: "" };

  return (
    <>
      <div className="admin-header">
        <div>
          <div className="crumb"><Link href="/admin/gallery">Gallery</Link></div>
          <h1>{isNew ? "Add photo" : "Edit photo"}</h1>
        </div>
        <Link href="/admin/gallery" className="admin-btn subtle">Back</Link>
      </div>
      <SectionForm action={saveGalleryAction} submitLabel={isNew ? "Add" : "Save"}>
        {!isNew && <input type="hidden" name="__index" value={index} />}
        <div className="admin-section">
          <h2>Photo details</h2>
          <div className="admin-grid">
            <ImageField label="Image" name="image" defaultValue={g.image} full />
            <TextField label="Caption / label" name="label" defaultValue={g.label} />
            <SelectField label="Layout shape" name="cls" defaultValue={g.cls} options={CLS} help="Affects how the photo is sized in the masonry grid" />
          </div>
        </div>
      </SectionForm>
    </>
  );
}
