import Link from "next/link";
import { notFound } from "next/navigation";
import { getSite } from "@/lib/content";
import { TextField, TextArea } from "@/components/admin/Field";
import { ImageField } from "@/components/admin/ImageField";
import { SectionForm } from "@/components/admin/SectionForm";
import { savePageAction } from "./actions";

export const metadata = { title: "Edit page" };

const PAGE_LABELS: Record<string, string> = {
  animals: "Animals page",
  about: "About page",
  classes: "Classes page",
  "farm-store": "Farm Store page",
  contact: "Contact page",
  gallery: "Gallery page",
};

type Params = Promise<{ slug: string }>;

export default async function PageEditor({ params }: { params: Params }) {
  const { slug } = await params;
  if (!(slug in PAGE_LABELS)) notFound();
  const site = await getSite();
  const key = slug === "farm-store" ? "farmStore" : (slug as keyof typeof site.pages);
  const data = site.pages[key as keyof typeof site.pages];
  if (!data) notFound();

  return (
    <>
      <div className="admin-header">
        <div>
          <div className="crumb">Other pages</div>
          <h1>{PAGE_LABELS[slug]}</h1>
        </div>
        <Link href={`/${slug === "farm-store" ? "farm-store" : slug}`} className="admin-btn subtle" target="_blank">
          View →
        </Link>
      </div>
      <SectionForm action={savePageAction}>
        <input type="hidden" name="__slug" value={slug} />
        {renderEditor(slug, data)}
      </SectionForm>
    </>
  );
}

type AnyPageData = Record<string, unknown>;

function renderEditor(slug: string, data: AnyPageData) {
  if (slug === "animals") {
    const d = data as { title: string; lede: string; sections: { eyebrow: string; heading: string; body: string }[] };
    return (
      <>
        <div className="admin-section">
          <h2>Header</h2>
          <div className="admin-grid">
            <TextField label="Title (HTML allowed)" name="title" defaultValue={d.title} full />
            <TextArea label="Lede" name="lede" defaultValue={d.lede} full rows={3} />
          </div>
        </div>
        {d.sections.map((s, i) => (
          <div key={i} className="admin-section">
            <h2>Section {i + 1}</h2>
            <div className="admin-grid">
              <TextField label="Eyebrow" name={`sections.${i}.eyebrow`} defaultValue={s.eyebrow} />
              <TextField label="Heading (HTML allowed)" name={`sections.${i}.heading`} defaultValue={s.heading} />
              <TextArea label="Body" name={`sections.${i}.body`} defaultValue={s.body} full rows={4} />
            </div>
          </div>
        ))}
      </>
    );
  }
  if (slug === "about") {
    const d = data as {
      title: string;
      lede: string;
      eyebrow: string;
      heading: string;
      body: string[];
      portrait: string;
      beliefs: { heading: string; body: string }[];
    };
    return (
      <>
        <div className="admin-section">
          <h2>Hero</h2>
          <div className="admin-grid">
            <TextField label="Title (HTML allowed)" name="title" defaultValue={d.title} full />
            <TextArea label="Lede" name="lede" defaultValue={d.lede} full rows={3} />
          </div>
        </div>
        <div className="admin-section">
          <h2>Story</h2>
          <div className="admin-grid">
            <TextField label="Eyebrow" name="eyebrow" defaultValue={d.eyebrow} />
            <TextField label="Heading (HTML allowed)" name="heading" defaultValue={d.heading} />
            <TextArea label="Body (one paragraph per blank line)" name="body" defaultValue={d.body.join("\n\n")} full rows={10} />
            <ImageField label="Portrait" name="portrait" defaultValue={d.portrait} full />
          </div>
        </div>
        {d.beliefs.map((b, i) => (
          <div key={i} className="admin-section">
            <h2>Belief {i + 1}</h2>
            <div className="admin-grid">
              <TextField label="Heading (HTML allowed)" name={`beliefs.${i}.heading`} defaultValue={b.heading} full />
              <TextArea label="Body" name={`beliefs.${i}.body`} defaultValue={b.body} full rows={3} />
            </div>
          </div>
        ))}
      </>
    );
  }
  if (slug === "farm-store") {
    const d = data as {
      title: string;
      lede: string;
      coolerHeading: string;
      coolerSub: string;
      heroImage: string;
      mapHeading: string;
      mapSectionNum: string;
    };
    return (
      <div className="admin-section">
        <h2>Farm Store page</h2>
        <div className="admin-grid">
          <TextField label="Title (HTML allowed)" name="title" defaultValue={d.title} full />
          <TextArea label="Lede" name="lede" defaultValue={d.lede} full rows={3} />
          <ImageField label="Hero image" name="heroImage" defaultValue={d.heroImage} full />
          <TextField label="Cooler heading (HTML allowed)" name="coolerHeading" defaultValue={d.coolerHeading} full />
          <TextArea label="Cooler subhead" name="coolerSub" defaultValue={d.coolerSub} full rows={2} />
          <TextField label="Map section eyebrow" name="mapSectionNum" defaultValue={d.mapSectionNum} />
          <TextField label="Map heading (HTML allowed)" name="mapHeading" defaultValue={d.mapHeading} full />
        </div>
      </div>
    );
  }
  // classes / contact / gallery — title + lede
  const d = data as { title: string; lede: string };
  return (
    <div className="admin-section">
      <h2>Page header</h2>
      <div className="admin-grid">
        <TextField label="Title (HTML allowed)" name="title" defaultValue={d.title} full />
        <TextArea label="Lede" name="lede" defaultValue={d.lede} full rows={3} />
      </div>
    </div>
  );
}
