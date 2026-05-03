import Link from "next/link";
import { notFound } from "next/navigation";
import { getSite } from "@/lib/content";
import { TextField, TextArea } from "@/components/admin/Field";
import { SectionForm } from "@/components/admin/SectionForm";
import { saveClassAction } from "../actions";

export const metadata = { title: "Edit class" };

type Params = Promise<{ id: string }>;

export default async function EditClassPage({ params }: { params: Params }) {
  const { id } = await params;
  const isNew = id === "new";
  const { classes } = await getSite();
  const index = isNew ? -1 : Number(id);
  const item = isNew ? null : classes[index];
  if (!isNew && !item) notFound();
  const c = item ?? { id: "", date: "", month: "", day: 0, name: "", time: "", seats: "", price: 0, desc: "" };

  return (
    <>
      <div className="admin-header">
        <div>
          <div className="crumb"><Link href="/admin/classes">Classes</Link></div>
          <h1>{isNew ? "New class" : `Edit ${c.name}`}</h1>
        </div>
        <Link href="/admin/classes" className="admin-btn subtle">Back</Link>
      </div>
      <SectionForm action={saveClassAction} submitLabel={isNew ? "Create" : "Save"}>
        {!isNew && <input type="hidden" name="__index" value={index} />}
        <div className="admin-section">
          <h2>Class details</h2>
          <p className="section-help">Month and day labels are computed automatically from the date.</p>
          <div className="admin-grid">
            <TextField label="Name" name="name" defaultValue={c.name} required />
            <TextField label="ID (slug)" name="id" defaultValue={c.id} help="Auto-generated if blank" />
            <TextField label="Date" name="date" defaultValue={c.date} type="date" required />
            <TextField label="Time" name="time" defaultValue={c.time} help='e.g. "10:00 AM – 1:00 PM"' />
            <TextField label="Seats / availability" name="seats" defaultValue={c.seats} help='e.g. "6 spots left"' />
            <TextField label="Price" name="price" defaultValue={c.price} type="number" />
            <TextArea label="Description" name="desc" defaultValue={c.desc} full rows={3} />
          </div>
        </div>
      </SectionForm>
    </>
  );
}
