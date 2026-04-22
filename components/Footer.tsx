import Link from "next/link";
import { Icon } from "./Icon";
import { getSite } from "@/lib/content";

export function Footer() {
  const { brand, contact, social, shopLinks, hours } = getSite();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <img
              src={brand.logoUrl}
              alt={brand.name}
              style={{ height: 72, marginBottom: 16, filter: "brightness(0) invert(1)" }}
            />
            <div className="brand-xl">
              {brand.name.split(" ").slice(0, -1).join(" ")}
              <br />
              <em style={{ fontStyle: "italic", color: "var(--wheat)" }}>
                {brand.name.split(" ").slice(-1)[0]}.
              </em>
            </div>
            <p className="tagline">{brand.tagline}</p>
            <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
              {social.facebook && (
                <a
                  href={social.facebook}
                  target="_blank"
                  rel="noopener"
                  aria-label="Facebook"
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    border: "1px solid #333",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  <Icon name="fb" size={16} />
                </a>
              )}
              {social.instagram && (
                <a
                  href={social.instagram}
                  target="_blank"
                  rel="noopener"
                  aria-label="Instagram"
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    border: "1px solid #333",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  <Icon name="ig" size={16} />
                </a>
              )}
            </div>
          </div>
          <div>
            <h4>Visit</h4>
            <div style={{ fontSize: 14, lineHeight: 1.7 }}>
              {contact.address.street}
              <br />
              {contact.address.city}, {contact.address.state} {contact.address.zip}
              <br />
              <br />
              <b style={{ color: "var(--cream)" }}>Farm Store</b>
              <br />
              {hours.display[0]?.label} & {hours.display[1]?.label} &middot; {hours.display[0]?.value}
            </div>
          </div>
          <div>
            <h4>Shop</h4>
            <a href={shopLinks.barn2door} target="_blank" rel="noopener">
              Online Store
            </a>
            <Link href="/farm-store">Farm Store</Link>
            <a href={shopLinks.barn2door} target="_blank" rel="noopener">
              All Products
            </a>
            <Link href="/classes">Classes</Link>
          </div>
          <div>
            <h4>Get In Touch</h4>
            <a href={contact.phoneHref}>{contact.phone}</a>
            <a href={`mailto:${contact.email}`}>Email us</a>
            <Link href="/contact">Contact form</Link>
            <Link href="/about">Our story</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            &copy; {currentYear} {brand.name} &middot; {contact.address.city}, {contact.address.state}
          </span>
          <span>{brand.shortTagline}</span>
        </div>
      </div>
    </footer>
  );
}
