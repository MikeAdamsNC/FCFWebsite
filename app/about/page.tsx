import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Photo } from "@/components/Photo";
import { RichText } from "@/components/RichText";
import { getSite } from "@/lib/content";

export const metadata = { title: "About" };

export default function AboutPage() {
  const { pages } = getSite();
  const p = pages.about;
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <div className="crumb">
            <Link href="/">Home</Link> <Icon name="chev_r" size={12} /> <span>About</span>
          </div>
          <RichText as="h1" html={p.title} />
          <p className="lede">{p.lede}</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="grid-2">
            <div style={{ aspectRatio: "4/5" }}>
              <Photo src={p.portrait} pos="center 55%" />
            </div>
            <div>
              <div className="eyebrow" style={{ marginBottom: 16 }}>
                {p.eyebrow}
              </div>
              <RichText
                as="h2"
                html={p.heading}
                style={{ fontSize: 44, lineHeight: 1, marginBottom: 24 }}
              />
              {p.body.map((line, i) => (
                <p
                  key={i}
                  style={{
                    color: "var(--umber-soft)",
                    fontSize: 17,
                    lineHeight: 1.7,
                    marginTop: i === 0 ? 0 : 16,
                  }}
                >
                  {line}
                </p>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 120, textAlign: "center" }}>
            <div
              className="ornament"
              style={{ justifyContent: "center", marginBottom: 32 }}
            >
              what we believe
            </div>
            <div className="grid-3" style={{ maxWidth: 1080, margin: "0 auto" }}>
              {p.beliefs.map((b, i) => (
                <div key={i}>
                  <RichText
                    as="h3"
                    html={b.heading}
                    style={{ fontSize: 28, marginBottom: 12 }}
                  />
                  <p style={{ color: "var(--umber-soft)" }}>{b.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
