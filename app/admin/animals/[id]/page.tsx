import Link from "next/link";
import { notFound } from "next/navigation";
import { getSite } from "@/lib/content";
import { TextField, SelectField } from "@/components/admin/Field";
import { ImageField } from "@/components/admin/ImageField";
import { SectionForm } from "@/components/admin/SectionForm";
import { saveAnimalAction } from "../actions";

export const metadata = { title: "Edit animal" };

const CLS = [
  { value: "a1", label: "a1 (large feature)" },
  { value: "a2", label: "a2" },
  { value: "a3", label: "a3" },
  { value: "a4", label: "a4" },
  { value: "a5", label: "a5" },
  { value: "a6", label: "a6 (small)" },
];

type Params = Promise<{ id: string }>;

export default async function EditAnimalPage({ params }: { params: Params }) {
  const { id } = await params;
  const isNew = id === "new";
  const { animals } = await getSite();
  const index = isNew ? -1 : Number(id);
  const item = isNew ? null : animals[index];
  if (!isNew && !item) notFound();
  const a = item ?? { id: "", name: "", count: "", cls: "a1" as const, image: "" };

  return (
    <>
      <div className="admin-header">
        <div>
          <div className="crumb"><Link href="/admin/animals">Animals</Link></div>
          <h1>{isNew ? "New animal" : `Edit ${a.name}`}</h1>
        </div>
        <Link href="/admin/animals" className="admin-btn subtle">Back</Link>
      </div>
      <SectionForm action={saveAnimalAction} submitLabel={isNew ? "Create" : "Save"}>
        {!isNew && <input type="hidden" name="__index" value={index} />}
        <div className="admin-section">
          <h2>Animal details</h2>
          <div className="admin-grid">
            <TextField label="Name" name="name" defaultValue={a.name} required />
            <TextField label="ID (slug)" name="id" defaultValue={a.id} help="Auto-generated from name if blank" />
            <TextField label="Count / description" name="count" defaultValue={a.count} full help='e.g. "200+ laying hens"' />
            <SelectField label="Grid slot" name="cls" defaultValue={a.cls} options={CLS} help="Position in the animals grid layout" />
            <ImageField label="Photo" name="image" defaultValue={a.image} full />
          </div>
        </div>
      </SectionForm>
    </>
  );
}
