import Link from "next/link";

type Card = { href: string; title: string; blurb: string };

const CARDS: Card[] = [
  { href: "/admin/brand", title: "Brand & contact", blurb: "Name, logo, phone, email, address, social links." },
  { href: "/admin/hours", title: "Hours & announce", blurb: "Open days, open hours, top-bar announcement." },
  { href: "/admin/map", title: "Map pin", blurb: "Drag the pin on an interactive map to set your location." },
  { href: "/admin/hero", title: "Home hero", blurb: "Headline variant, hero layout, subcopy, meta badges." },
  { href: "/admin/home", title: "Home story + CTA", blurb: "The story section, quote, and classes call-to-action." },
  { href: "/admin/products", title: "Products", blurb: "The farm store cut list (names, prices, photos)." },
  { href: "/admin/animals", title: "Animals", blurb: "Animal cards shown on Home and Animals pages." },
  { href: "/admin/classes", title: "Classes", blurb: "Workshops on the calendar." },
  { href: "/admin/stock", title: "Stock", blurb: "What\u2019s in the cooler right now." },
  { href: "/admin/gallery", title: "Gallery", blurb: "Photos + upload new ones." },
  { href: "/admin/pages", title: "Page copy", blurb: "Titles, ledes, and copy across every page." },
];

export default function AdminDashboard() {
  return (
    <div>
      <h1 style={{ fontSize: 36, marginBottom: 8 }}>What do you want to edit?</h1>
      <p style={{ color: "var(--umber-soft)", marginBottom: 32 }}>
        Every change saves back to the site. Edits go live in about a minute.
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 16,
        }}
      >
        {CARDS.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            style={{
              background: "var(--paper)",
              border: "1px solid var(--rule)",
              borderRadius: 6,
              padding: 20,
              display: "block",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <div style={{ fontFamily: "var(--serif)", fontSize: 22, marginBottom: 6 }}>
              {c.title}
            </div>
            <div style={{ color: "var(--umber-soft)", fontSize: 14 }}>{c.blurb}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
