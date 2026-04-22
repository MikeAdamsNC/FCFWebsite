import Link from "next/link";
import { Icon } from "@/components/Icon";
import { RichText } from "@/components/RichText";
import { ContactForm } from "@/components/ContactForm";
import { getSite } from "@/lib/content";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  const { pages, contact, hours } = getSite();
  const p = pages.contact;
  const hoursLine = `${hours.display[0]?.label.trim()} & ${hours.display[1]?.label.trim()}, ${hours.display[0]?.value.trim()}`;
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <div className="crumb">
            <Link href="/">Home</Link> <Icon name="chev_r" size={12} /> <span>Contact</span>
          </div>
          <RichText as="h1" html={p.title} />
          <p className="lede">{p.lede}</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="contact-grid">
            <div className="contact-info">
              <div className="row">
                <div className="icon">
                  <Icon name="phone" size={18} />
                </div>
                <div>
                  <b>Call or text</b>
                  <a
                    href={contact.phoneHref}
                    style={{ fontSize: 18, color: "var(--clay)" }}
                  >
                    {contact.phone}
                  </a>
                  <div className="sub" style={{ marginTop: 4 }}>
                    Best for time-sensitive questions
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="icon">
                  <Icon name="mail" size={18} />
                </div>
                <div>
                  <b>Email</b>
                  <a
                    href={`mailto:${contact.email}`}
                    style={{ fontSize: 16, color: "var(--clay)" }}
                  >
                    {contact.email}
                  </a>
                </div>
              </div>
              <div className="row">
                <div className="icon">
                  <Icon name="pin" size={18} />
                </div>
                <div>
                  <b>Visit</b>
                  <div>
                    {contact.address.street}
                    <br />
                    {contact.address.city}, {contact.address.state} {contact.address.zip}
                  </div>
                  <div className="sub" style={{ marginTop: 4 }}>
                    Farm store open {hoursLine}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="icon">
                  <Icon name="clock" size={18} />
                </div>
                <div>
                  <b>We&rsquo;re around</b>
                  <div>Dawn to dusk, every day.</div>
                  <div className="sub" style={{ marginTop: 4 }}>
                    Please call before stopping outside store hours.
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div
                style={{
                  background: "var(--cream)",
                  padding: 36,
                  borderRadius: 4,
                  border: "1px solid var(--rule)",
                }}
              >
                <h3 style={{ fontSize: 28, marginBottom: 20 }}>Send us a note</h3>
                <ContactForm email={contact.email} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
