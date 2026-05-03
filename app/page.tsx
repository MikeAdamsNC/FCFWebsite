import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Photo } from "@/components/Photo";
import { HoursBand } from "@/components/HoursBand";
import { HeroVisual, TITLE_VARIANTS, type HeroVariant, type TitleVariant } from "@/components/Hero";
import { RichText } from "@/components/RichText";
import { getSite } from "@/lib/content";

export default async function HomePage() {
  const site = await getSite();
  const { hero, homeStory, homeQuote, homeCta, shopLinks, animals, contact, hours } = site;
  const titleKey = (hero.titleVariant as TitleVariant) in TITLE_VARIANTS
    ? (hero.titleVariant as TitleVariant)
    : "ought";
  const title = TITLE_VARIANTS[titleKey];

  return (
    <>
      <section className="hero">
        <div className="wrap">
          <div className="hero-grid">
            <div>
              <div className="eyebrow" style={{ marginBottom: 28 }}>
                {hero.eyebrow}
              </div>
              <h1>{title.render()}</h1>
              <p className="hero-sub">{hero.subcopy}</p>
              <div className="hero-ctas">
                <a
                  href={shopLinks.barn2door}
                  target="_blank"
                  rel="noopener"
                  className="btn btn-primary"
                >
                  Shop Online <Icon name="arrow" size={15} />
                </a>
                <Link href="/farm-store" className="btn btn-outline">
                  Visit the Farm Store
                </Link>
              </div>
              <div className="hero-meta">
                {hero.meta.map((m) => (
                  <div key={m.label}>
                    <strong>{m.label}</strong>
                    {m.value}
                  </div>
                ))}
              </div>
            </div>
            <HeroVisual variant={hero.heroVariant as HeroVariant} />
          </div>
        </div>
      </section>

      <HoursBand hours={hours} contactAddress={contact.address} />

      <section className="story">
        <div className="wrap">
          <div className="story-grid">
            <div style={{ position: "relative" }}>
              <div className="story-tape" />
              <div className="story-img">
                <Photo src={homeStory.image} pos="center 30%" />
              </div>
            </div>
            <div>
              <div className="eyebrow" style={{ color: "var(--wheat)", marginBottom: 24 }}>
                {homeStory.eyebrow}
              </div>
              <RichText as="h2" html={homeStory.heading} />
              <div className="story-body" style={{ marginTop: 32 }}>
                {homeStory.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                <div className="story-sig">{homeStory.signature}</div>
              </div>
              <Link
                href="/about"
                className="btn btn-outline"
                style={{ marginTop: 16, borderColor: "var(--cream)", color: "var(--cream)" }}
              >
                Read more about us <Icon name="arrow" size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <span className="section-num">02 / Animals</span>
            <h2>
              Meet <em>the crew.</em>
            </h2>
            <Link href="/animals" className="section-link">
              All the critters &rarr;
            </Link>
          </div>
          <div className="animals">
            {animals.map((a) => (
              <Link key={a.id} href="/animals" className={"animal-card " + a.cls}>
                <Photo src={a.image} />
                <div className="overlay">
                  <h3>{a.name}</h3>
                  <div className="count">{a.count}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        style={{
          borderTop: "1px solid var(--rule)",
          borderBottom: "1px solid var(--rule)",
          background: "var(--cream)",
        }}
      >
        <div className="wrap">
          <div className="quote">
            <div className="ornament">a kind word</div>
            <blockquote style={{ marginTop: 24 }}>&ldquo;{homeQuote.text}&rdquo;</blockquote>
            <cite>{homeQuote.cite}</cite>
          </div>
        </div>
      </section>

      <section className="cta-strip">
        <div className="wrap">
          <div className="cta-strip-grid">
            <div>
              <div className="eyebrow" style={{ color: "var(--wheat)", marginBottom: 18 }}>
                {homeCta.eyebrow}
              </div>
              <RichText as="h2" html={homeCta.heading} />
              <p>{homeCta.body}</p>
            </div>
            <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
              <Link
                href="/classes"
                className="btn"
                style={{ background: "var(--paper)", color: "var(--ink)" }}
              >
                See upcoming classes <Icon name="arrow" size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
