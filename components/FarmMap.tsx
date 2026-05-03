import { getSite } from "@/lib/content";

export async function FarmMap() {
  const { brand, contact, map } = await getSite();
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const query = encodeURIComponent(
    `${brand.name}, ${contact.address.street}, ${contact.address.city}, ${contact.address.state} ${contact.address.zip}`,
  );
  const directionsUrl = map.directionsUrl;
  const src = apiKey
    ? `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${query}&zoom=${map.zoom}`
    : null;

  return (
    <div className="map-wrap">
      {src ? (
        <iframe
          src={src}
          title={`${brand.name} on Google Maps`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          style={{ width: "100%", height: "100%", border: 0, display: "block" }}
        />
      ) : (
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener"
          style={{
            display: "grid",
            placeItems: "center",
            width: "100%",
            height: "100%",
            color: "var(--umber-soft)",
            fontSize: 14,
            textDecoration: "none",
          }}
        >
          Open in Google Maps &rarr;
        </a>
      )}
    </div>
  );
}
