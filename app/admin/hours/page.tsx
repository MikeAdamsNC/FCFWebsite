import { getSite } from "@/lib/content";
import { TextField } from "@/components/admin/Field";
import { SectionForm } from "@/components/admin/SectionForm";
import { saveHoursAction } from "./actions";

export const metadata = { title: "Hours" };

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default async function HoursPage() {
  const { hours } = await getSite();
  return (
    <>
      <div className="admin-header">
        <div>
          <div className="crumb">Site</div>
          <h1>Hours</h1>
        </div>
      </div>
      <SectionForm action={saveHoursAction}>
        <div className="admin-section">
          <h2>Open days & times</h2>
          <p className="section-help">
            Used by the open/closed status pill and to compute next opening time.
          </p>
          <div className="admin-grid">
            <div className="admin-field full">
              <label>Open days</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                {DAYS.map((label, i) => (
                  <label key={i} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, fontFamily: "var(--sans)", textTransform: "none", letterSpacing: 0 }}>
                    <input
                      type="checkbox"
                      name="hours.days"
                      value={i}
                      defaultChecked={hours.days.includes(i)}
                    />
                    {label}
                  </label>
                ))}
              </div>
            </div>
            <TextField label="Open hour (24h)" name="hours.open" defaultValue={hours.open} type="number" help="e.g. 10 = 10 AM" />
            <TextField label="Close hour (24h)" name="hours.close" defaultValue={hours.close} type="number" help="e.g. 14 = 2 PM" />
          </div>
        </div>

        <div className="admin-section">
          <h2>Display rows</h2>
          <p className="section-help">
            Shown in the hours card on the home and farm-store pages. Keep label-value pairs aligned with the days you marked above.
          </p>
          {hours.display.map((row, i) => (
            <div key={i} className="admin-grid" style={{ marginBottom: 14 }}>
              <TextField label={`Row ${i + 1} label`} name={`hours.display.${i}.label`} defaultValue={row.label} />
              <TextField label={`Row ${i + 1} value`} name={`hours.display.${i}.value`} defaultValue={row.value} />
            </div>
          ))}
        </div>
      </SectionForm>
    </>
  );
}
