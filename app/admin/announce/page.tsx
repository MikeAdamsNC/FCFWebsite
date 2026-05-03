import { getSite } from "@/lib/content";
import { TextField, TextArea } from "@/components/admin/Field";
import { SectionForm } from "@/components/admin/SectionForm";
import { saveAnnounceAction } from "./actions";

export const metadata = { title: "Announce bar" };

export default async function AnnouncePage() {
  const { announce } = await getSite();
  return (
    <>
      <div className="admin-header">
        <div>
          <div className="crumb">Site</div>
          <h1>Announce bar</h1>
        </div>
      </div>
      <SectionForm action={saveAnnounceAction}>
        <div className="admin-section">
          <h2>Top-of-page announcement</h2>
          <p className="section-help">The thin bar that runs across the top of every page.</p>
          <div className="admin-grid">
            <TextArea label="Message" name="announce.message" defaultValue={announce.message} full rows={2} />
            <TextField label="Link URL" name="announce.link" defaultValue={announce.link} full />
            <TextField label="Link label" name="announce.linkLabel" defaultValue={announce.linkLabel} full help='e.g. "Shop online →"' />
          </div>
        </div>
      </SectionForm>
    </>
  );
}
