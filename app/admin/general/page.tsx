import { getSite } from "@/lib/content";
import { TextField, TextArea } from "@/components/admin/Field";
import { ImageField } from "@/components/admin/ImageField";
import { SectionForm } from "@/components/admin/SectionForm";
import { saveGeneralAction } from "./actions";

export const metadata = { title: "General settings" };

export default async function GeneralPage() {
  const { brand, contact, social, shopLinks, map } = await getSite();
  return (
    <>
      <div className="admin-header">
        <div>
          <div className="crumb">Site</div>
          <h1>General settings</h1>
        </div>
      </div>
      <SectionForm action={saveGeneralAction}>
        <div className="admin-section">
          <h2>Brand</h2>
          <p className="section-help">Name, taglines, and the logo used throughout the site.</p>
          <div className="admin-grid">
            <TextField label="Name" name="brand.name" defaultValue={brand.name} />
            <TextField label="Established" name="brand.established" defaultValue={brand.established} />
            <TextArea label="Tagline" name="brand.tagline" defaultValue={brand.tagline} full />
            <TextField label="Short tagline" name="brand.shortTagline" defaultValue={brand.shortTagline} full />
            <ImageField label="Logo" name="brand.logoUrl" defaultValue={brand.logoUrl} full />
          </div>
        </div>

        <div className="admin-section">
          <h2>Contact</h2>
          <div className="admin-grid">
            <TextField label="Phone (display)" name="contact.phone" defaultValue={contact.phone} />
            <TextField label="Phone (tel: link)" name="contact.phoneHref" defaultValue={contact.phoneHref} help="e.g. tel:19196321433" />
            <TextField label="Email" name="contact.email" defaultValue={contact.email} type="email" full />
            <TextField label="Street" name="contact.address.street" defaultValue={contact.address.street} full />
            <TextField label="City" name="contact.address.city" defaultValue={contact.address.city} />
            <TextField label="State" name="contact.address.state" defaultValue={contact.address.state} />
            <TextField label="ZIP" name="contact.address.zip" defaultValue={contact.address.zip} />
          </div>
        </div>

        <div className="admin-section">
          <h2>Social & shop</h2>
          <div className="admin-grid">
            <TextField label="Facebook URL" name="social.facebook" defaultValue={social.facebook} full />
            <TextField label="Instagram URL" name="social.instagram" defaultValue={social.instagram} full />
            <TextField label="Online shop URL (Barn2Door)" name="shopLinks.barn2door" defaultValue={shopLinks.barn2door} full />
          </div>
        </div>

        <div className="admin-section">
          <h2>Map / location</h2>
          <p className="section-help">Coordinates and zoom for the embedded farm-store map.</p>
          <div className="admin-grid">
            <TextField label="Latitude" name="map.lat" defaultValue={map.lat} type="number" />
            <TextField label="Longitude" name="map.lng" defaultValue={map.lng} type="number" />
            <TextField label="Zoom" name="map.zoom" defaultValue={map.zoom} type="number" />
            <TextField label="Pin label" name="map.pinLabel" defaultValue={map.pinLabel} />
            <TextField label="Directions URL" name="map.directionsUrl" defaultValue={map.directionsUrl} full help="Opens when visitors click 'Directions'" />
          </div>
        </div>
      </SectionForm>
    </>
  );
}
