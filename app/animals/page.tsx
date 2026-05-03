import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Photo } from "@/components/Photo";
import { RichText } from "@/components/RichText";
import { getSite } from "@/lib/content";

export const metadata = { title: "Animals" };

export default async function AnimalsPage() {
  const { animals, pages } = await getSite();
  const p = pages.animals;
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <div className="crumb">
            <Link href="/">Home</Link> <Icon name="chev_r" size={12} /> <span>Animals</span>
          </div>
          <RichText as="h1" html={p.title} />
          <p className="lede">{p.lede}</p>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div className="animals">
            {animals.map((a) => (
              <div key={a.id} className={"animal-card " + a.cls}>
                <Photo src={a.image} />
                <div className="overlay">
                  <h3>{a.name}</h3>
                  <div className="count">{a.count}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid-3" style={{ marginTop: 80 }}>
            {p.sections.map((s, i) => (
              <div key={i}>
                <div className="eyebrow" style={{ marginBottom: 14 }}>
                  {s.eyebrow}
                </div>
                <RichText
                  as="h3"
                  html={s.heading}
                  style={{ fontSize: 26, marginBottom: 14 }}
                />
                <p style={{ color: "var(--umber-soft)" }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
