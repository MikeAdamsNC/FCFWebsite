import Link from "next/link";
import { notFound } from "next/navigation";
import { getSite } from "@/lib/content";
import { TextField } from "@/components/admin/Field";
import { ImageField } from "@/components/admin/ImageField";
import { SectionForm } from "@/components/admin/SectionForm";
import { saveProductAction } from "../actions";

export const metadata = { title: "Edit product" };

type Params = Promise<{ id: string }>;

export default async function EditProductPage({ params }: { params: Params }) {
  const { id } = await params;
  const isNew = id === "new";
  const { products } = await getSite();
  const index = isNew ? -1 : Number(id);
  const item = isNew ? null : products[index];
  if (!isNew && !item) notFound();
  const p = item ?? { id: "", name: "", cut: "Pasture Raised", price: 0, unit: "lb", tag: "", image: "" };

  return (
    <>
      <div className="admin-header">
        <div>
          <div className="crumb"><Link href="/admin/products">Products</Link></div>
          <h1>{isNew ? "New product" : `Edit ${p.name}`}</h1>
        </div>
        <Link href="/admin/products" className="admin-btn subtle">Back</Link>
      </div>
      <SectionForm action={saveProductAction} submitLabel={isNew ? "Create" : "Save"}>
        {!isNew && <input type="hidden" name="__index" value={index} />}
        <div className="admin-section">
          <h2>Product details</h2>
          <div className="admin-grid">
            <TextField label="Name" name="name" defaultValue={p.name} required />
            <TextField label="ID (slug)" name="id" defaultValue={p.id} help="Auto-generated from name if blank" />
            <TextField label="Cut / type" name="cut" defaultValue={p.cut} />
            <TextField label="Tag" name="tag" defaultValue={p.tag ?? ""} help='e.g. "Best Seller" — leave blank for none' />
            <TextField label="Price" name="price" defaultValue={p.price} type="number" />
            <TextField label="Unit" name="unit" defaultValue={p.unit} help='e.g. "lb", "ea", "dozen"' />
            <ImageField label="Photo" name="image" defaultValue={p.image} full />
          </div>
        </div>
      </SectionForm>
    </>
  );
}
