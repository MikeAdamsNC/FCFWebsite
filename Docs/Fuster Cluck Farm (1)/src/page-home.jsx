const TITLE_VARIANTS = {
  ought:    { render: () => <>Food raised<br/>the way it <em>ought</em><br/>to be raised.</>, label: "Food raised the way it ought" },
  honest:   { render: () => <>Honest food,<br/>from a <em>small</em><br/>family farm.</>, label: "Honest food, from a small family farm" },
  direct:   { render: () => <>Real food,<br/><em>raised</em> right,<br/>sold direct.</>, label: "Real food, raised right" },
  pasture:  { render: () => <><em>Pasture</em> raised.<br/>Farm direct.<br/>Kenly, NC.</>, label: "Pasture raised. Farm direct." },
  cluck:    { render: () => <>Give a<br/><em>cluck</em> about<br/>what you eat.</>, label: "Give a cluck about what you eat" },
  ought_1l: { render: () => <>Food raised the way<br/>it <em>ought to be</em> raised.</>, label: "Food raised — 2 lines" },
};

const HERO_VARIANTS = {
  stack: { label: "Stacked photos + badge" },
  full:  { label: "Single full photo" },
  triptych: { label: "Triptych grid" },
  polaroid: { label: "Polaroid scatter" },
};

function HeroVisual({ variant }) {
  if (variant === "full") {
    return (
      <div className="hero-img-full">
        <Ph src={P.chickensWide} pos="center 45%"/>
        <div className="caption">The flock, out on pasture</div>
      </div>
    );
  }
  if (variant === "triptych") {
    return (
      <div className="hero-triptych">
        <div><Ph src={P.chickens} pos="60% 40%"/></div>
        <div><Ph src={P.piglets}/></div>
        <div><Ph src={P.eggs}/></div>
      </div>
    );
  }
  if (variant === "polaroid") {
    return (
      <div className="hero-polaroid-stack">
        <div className="hero-polaroid hero-polaroid-1">
          <div className="ph-inner"><Ph src={P.chickens} pos="60% 40%"/></div>
          <div className="cap">the flock</div>
        </div>
        <div className="hero-polaroid hero-polaroid-2">
          <div className="ph-inner"><Ph src={P.piglets}/></div>
          <div className="cap">piglets, spring '26</div>
        </div>
        <div className="hero-polaroid hero-polaroid-3">
          <div className="ph-inner"><Ph src={P.eggs}/></div>
          <div className="cap">today's eggs</div>
        </div>
      </div>
    );
  }
  // default: stack
  return (
    <div className="hero-img-stack">
      <div className="hero-badge">Farm<br/>Direct<br/>&nbsp;· since 2010 ·</div>
      <div className="hero-img hero-img-main"><Ph src={P.chickens} pos="60% 40%"/></div>
      <div className="hero-img hero-img-sm"><Ph src={P.piglets}/></div>
    </div>
  );
}

function HomePage() {
  const { add, items } = useContext(CartCtx);
  const open = isOpenNow();
  const tweaks = useTweaks();
  const title = TITLE_VARIANTS[tweaks.titleVariant] || TITLE_VARIANTS.ought;
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="wrap">
          <div className="hero-grid">
            <div>
              <div className="eyebrow" style={{marginBottom: 28}}>Kenly, NC · Est. 2010</div>
              <h1>{title.render()}</h1>
              <p className="hero-sub">
                We're Jim and Carol, and we run a small family farm an hour east of Raleigh.
                Pasture chicken and pork, eggs from hens that live outside, sourdough baked on Friday —
                all of it brought up slow and sold direct.
              </p>
              <div className="hero-ctas">
                <a href="https://app.barn2door.com/fustercluckfarm/all" target="_blank" rel="noopener" className="btn btn-primary">
                  Shop Online <Icon name="arrow" size={15}/>
                </a>
                <a href="#/farm-store" className="btn btn-outline">Visit the Farm Store</a>
              </div>
              <div className="hero-meta">
                <div><strong>Farm Store</strong>Fri & Sat · 10 – 2</div>
                <div><strong>Delivery</strong>Right to your door</div>
                <div><strong>Since</strong>2010</div>
              </div>
            </div>

            <HeroVisual variant={tweaks.heroVariant}/>
          </div>
        </div>
      </section>

      {/* HOURS / OPEN NOW */}
      <section className="hours-band">
        <div className="wrap">
          <div className="hours-card">
            <div className="hours-status">
              <span className={"dot " + (open ? "open" : "")}/>
              <span>{open ? "Open now" : "Closed"}</span>
              <span style={{color:"var(--umber-soft)", fontFamily:"var(--sans)", fontSize:14, marginLeft:8}}>
                · {nextOpening()}
              </span>
            </div>
            <div className="hours-sched">
              <div><b>FRIDAY</b>10 AM – 2 PM</div>
              <div><b>SATURDAY</b>10 AM – 2 PM</div>
              <div><b>SUN–THU</b>Online orders only</div>
              <div><b>ADDRESS</b>3614 Glendale Rd, Kenly NC</div>
            </div>
            <a href="#/farm-store" className="btn btn-outline btn-sm">Farm store details <Icon name="arrow" size={13}/></a>
          </div>
        </div>
      </section>

      {/* PRODUCTS section removed — online store is Barn2Door */}

      {/* STORY */}
      <section className="story">
        <div className="wrap">
          <div className="story-grid">
            <div style={{position:"relative"}}>
              <div className="story-tape"/>
              <div className="story-img"><Ph src={P.portrait} pos="center 30%"/></div>
            </div>
            <div>
              <div className="eyebrow" style={{color:"var(--wheat)", marginBottom: 24}}>Our story</div>
              <h2>We raise good food<br/>and <em>honest animals.</em></h2>
              <div className="story-body" style={{marginTop: 32}}>
                <p>
                  It started with a handful of laying hens and a coop we built from scrap lumber.
                  Fifteen years later we're still a small farm — by choice — because that's the only way
                  we know how to do this well.
                </p>
                <p>
                  Our chickens live on pasture. Our pigs root through the woods. The sourdough comes out of
                  our own oven. Nothing here is on a conveyor belt, and nothing here is pretending.
                </p>
                <div className="story-sig">— Jim & Carol</div>
              </div>
              <a href="#/about" className="btn btn-outline" style={{marginTop: 16, borderColor: "var(--cream)", color: "var(--cream)"}}>
                Read more about us <Icon name="arrow" size={15}/>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ANIMALS TEASE */}
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <span className="section-num">02 / Animals</span>
            <h2>Meet <em>the crew.</em></h2>
            <a href="#/animals" className="section-link">All the critters →</a>
          </div>
          <div className="animals">
            {ANIMALS.map(a => (
              <a key={a.id} href="#/animals" className={"animal-card " + a.cls}>
                <Ph src={a.imgUrl}/>
                <div className="overlay">
                  <h3>{a.name}</h3>
                  <div className="count">{a.count}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section style={{borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)", background: "var(--cream)"}}>
        <div className="wrap">
          <div className="quote">
            <div className="ornament">a kind word</div>
            <blockquote style={{marginTop: 24}}>
              "The chicken actually tastes like chicken. I didn't know what I was missing
              until I started buying from Jim and Carol."
            </blockquote>
            <cite>— Meredith, Wilson NC</cite>
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="cta-strip">
        <div className="wrap">
          <div className="cta-strip-grid">
            <div>
              <div className="eyebrow" style={{color:"var(--wheat)", marginBottom: 18}}>Classes</div>
              <h2>Learn it with <em>your own hands.</em></h2>
              <p>From sourdough to backyard chickens — we host small workshops on the farm most weekends. Come get dirt under your fingernails.</p>
            </div>
            <div style={{display:"flex", gap:12, justifyContent:"flex-end"}}>
              <a href="#/classes" className="btn" style={{background:"var(--paper)", color:"var(--ink)"}}>See upcoming classes <Icon name="arrow" size={15}/></a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ProductCard({ p, inCart, onAdd }) {
  return (
    <div className="product-card">
      <div className="product-img">
        {p.tag && <span className="chip">{p.tag}</span>}
        <Ph src={p.imgUrl}/>
      </div>
      <div className="product-body">
        <div className="product-cut">{p.cut}</div>
        <div className="product-name">{p.name}</div>
        <div className="product-foot">
          <div className="price">${p.price.toFixed(2)}<span className="per">/ {p.unit}</span></div>
          <button className={"add-btn " + (inCart ? "in-cart" : "")} onClick={onAdd}>
            {inCart ? <><Icon name="check" size={12}/> Added</> : <><Icon name="plus" size={12}/> Add</>}
          </button>
        </div>
      </div>
    </div>
  );
}

function ShopPage() {
  const { add, items } = useContext(CartCtx);
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <div className="crumb"><a href="#/home">Home</a> <Icon name="chev_r" size={12}/> <span>Shop</span></div>
          <h1>Shop <em>everything</em></h1>
          <p className="lede">Quick-add what you need below, then finish checkout on Barn2Door. We'll bring it to your door or have it ready for pickup at the farm store.</p>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div className="products">
            {PRODUCTS.map(p => (
              <ProductCard key={p.id} p={p} inCart={!!items[p.id]} onAdd={() => add(p.id, p.name)}/>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

Object.assign(window, { HomePage, ShopPage, ProductCard, TITLE_VARIANTS, HERO_VARIANTS });
