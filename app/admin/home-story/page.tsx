import { getSite } from "@/lib/content";
import { TextField, TextArea } from "@/components/admin/Field";
import { ImageField } from "@/components/admin/ImageField";
import { SectionForm } from "@/components/admin/SectionForm";
import { saveHomeStoryAction } from "./actions";

export const metadata = { title: "Home page story" };

export default async function HomeStoryPage() {
  const { homeStory, homeQuote, homeCta } = await getSite();
  return (
    <>
      <div className="admin-header">
        <div>
          <div className="crumb">Home page</div>
          <h1>Story / quote / CTA</h1>
        </div>
      </div>
      <SectionForm action={saveHomeStoryAction}>
        <div className="admin-section">
          <h2>Our story</h2>
          <p className="section-help">
            Use <code>&lt;em&gt;</code> for italic emphasis. Body paragraphs are separated by blank lines.
          </p>
          <div className="admin-grid">
            <TextField label="Eyebrow" name="homeStory.eyebrow" defaultValue={homeStory.eyebrow} />
            <TextField label="Signature" name="homeStory.signature" defaultValue={homeStory.signature} />
            <TextField label="Heading (HTML allowed)" name="homeStory.heading" defaultValue={homeStory.heading} full />
            <TextArea label="Body (one paragraph per blank line)" name="homeStory.body" defaultValue={homeStory.body.join("\n\n")} full rows={8} />
            <ImageField label="Story photo" name="homeStory.image" defaultValue={homeStory.image} full />
          </div>
        </div>

        <div className="admin-section">
          <h2>Quote</h2>
          <div className="admin-grid">
            <TextArea label="Quote text" name="homeQuote.text" defaultValue={homeQuote.text} full rows={3} />
            <TextField label="Citation" name="homeQuote.cite" defaultValue={homeQuote.cite} full help='e.g. "— Meredith, Wilson NC"' />
          </div>
        </div>

        <div className="admin-section">
          <h2>Bottom CTA</h2>
          <div className="admin-grid">
            <TextField label="Eyebrow" name="homeCta.eyebrow" defaultValue={homeCta.eyebrow} />
            <TextField label="Heading (HTML allowed)" name="homeCta.heading" defaultValue={homeCta.heading} full />
            <TextArea label="Body" name="homeCta.body" defaultValue={homeCta.body} full rows={3} />
          </div>
        </div>
      </SectionForm>
    </>
  );
}
