import { getSite } from "@/lib/content";
import { TextField, TextArea, SelectField } from "@/components/admin/Field";
import { SectionForm } from "@/components/admin/SectionForm";
import { saveHeroAction } from "./actions";

export const metadata = { title: "Hero" };

const TITLE_OPTIONS = [
  { value: "cluck", label: "Cluck" },
  { value: "ought", label: "Ought" },
  { value: "raised", label: "Raised" },
];
const HERO_VARIANTS = [
  { value: "polaroid", label: "Polaroid" },
  { value: "stack", label: "Stack" },
];

export default async function HeroPage() {
  const { hero } = await getSite();
  return (
    <>
      <div className="admin-header">
        <div>
          <div className="crumb">Home page</div>
          <h1>Hero section</h1>
        </div>
      </div>
      <SectionForm action={saveHeroAction}>
        <div className="admin-section">
          <h2>Headline</h2>
          <div className="admin-grid">
            <SelectField label="Title variant" name="hero.titleVariant" defaultValue={hero.titleVariant} options={TITLE_OPTIONS} help="Pre-set headlines defined in code" />
            <SelectField label="Hero visual" name="hero.heroVariant" defaultValue={hero.heroVariant} options={HERO_VARIANTS} />
            <TextField label="Eyebrow" name="hero.eyebrow" defaultValue={hero.eyebrow} full />
            <TextArea label="Subcopy" name="hero.subcopy" defaultValue={hero.subcopy} full rows={3} />
          </div>
        </div>

        <div className="admin-section">
          <h2>Hero meta tiles</h2>
          <p className="section-help">Three small label/value tiles shown next to the headline.</p>
          {hero.meta.map((row, i) => (
            <div key={i} className="admin-grid" style={{ marginBottom: 14 }}>
              <TextField label={`Tile ${i + 1} label`} name={`hero.meta.${i}.label`} defaultValue={row.label} />
              <TextField label={`Tile ${i + 1} value`} name={`hero.meta.${i}.value`} defaultValue={row.value} />
            </div>
          ))}
        </div>
      </SectionForm>
    </>
  );
}
