import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Photo } from "@/components/Photo";
import { HoursStatus } from "@/components/HoursStatus";
import { RichText } from "@/components/RichText";
import { FarmMap } from "@/components/FarmMap";
import { getSite } from "@/lib/content";

export const metadata = { title: "Farm Store" };

export default function FarmStorePage() {
  const { pages, hours, stock, contact, map } = getSite();
  const p = pages.farmStore;
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <div className="crumb">
            <Link href="/">Home</Link> <Icon name="chev_r" size={12} /> <span>Farm Store</span>
          </div>
          <RichText as="h1" html={p.title} />
          <p className="lede">{p.lede}</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 48 }}>
        <div className="wrap">
          <div className="grid-2" style={{ alignItems: "stretch" }}>
            <div>
              <div
                style={{
                  aspectRatio: "4/3",
                  borderRadius: 4,
                  overflow: "hidden",
                  marginBottom: 24,
                }}
              >
                <Photo src={p.heroImage} />
              </div>
              <div
                className="hours-card"
                style={{ padding: 28, display: "flex", flexDirection: "column", gap: 16 }}
              >
                <HoursStatus />
                <hr className="rule" />
                <div className="hours-sched" style={{ flexDirection: "column", gap: 12 }}>
                  {hours.display.map((row) => (
                    <div key={row.label}>
                      <b>{row.label}</b>
                      {row.value}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <RichText
                as="h2"
                html={p.coolerHeading}
                style={{ fontSize: 36, marginBottom: 20 }}
              />
              <p style={{ color: "var(--umber-soft)", marginBottom: 28 }}>{p.coolerSub}</p>
              <div className="stock" style={{ gridTemplateColumns: "1fr" }}>
                {stock.map((s, i) => (
                  <div key={i} className="stock-row">
                    <span className="name">{s.name}</span>
                    <span className={"tag " + s.state}>{s.tag}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ marginTop: 96 }}>
            <div className="section-head" style={{ paddingBottom: 24, marginBottom: 32 }}>
              <span className="section-num">{p.mapSectionNum}</span>
              <RichText as="h2" html={p.mapHeading} style={{ fontSize: 40 }} />
              <a href={map.directionsUrl} target="_blank" rel="noopener" className="section-link">
                Open in Maps &rarr;
              </a>
            </div>
            <FarmMap />
            <div style={{ marginTop: 24, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a
                href={map.directionsUrl}
                target="_blank"
                rel="noopener"
                className="btn btn-primary"
              >
                Directions <Icon name="arrow" size={15} />
              </a>
              <a href={contact.phoneHref} className="btn btn-outline">
                <Icon name="phone" size={15} /> {contact.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
