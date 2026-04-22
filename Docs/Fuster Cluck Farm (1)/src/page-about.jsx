function AboutPage() {
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <div className="crumb"><a href="#/home">Home</a> <Icon name="chev_r" size={12}/> <span>About</span></div>
          <h1>A small <em>family farm</em> with a funny name.</h1>
          <p className="lede">
            Yes, the name is a pun. Yes, our neighbors made us explain it. We kept it anyway.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="grid-2">
            <div style={{aspectRatio:"4/5"}}><Ph src={P.portraitField} pos="center 55%"/></div>
            <div>
              <div className="eyebrow" style={{marginBottom: 16}}>Our story</div>
              <h2 style={{fontSize: 44, lineHeight: 1, marginBottom: 24}}>Fifteen years of<br/><em>learning the hard way.</em></h2>
              <p style={{color:"var(--umber-soft)", fontSize: 17, lineHeight: 1.7}}>
                We started with a dozen chickens in the backyard in 2010. We wanted eggs we could trust,
                and one thing led to another. We built coops. We read every book. We made every mistake.
              </p>
              <p style={{color:"var(--umber-soft)", fontSize: 17, lineHeight: 1.7, marginTop: 16}}>
                Today we raise pasture chicken, pork, and lamb on a piece of land in Kenly.
                We bake sourdough on Friday. We milk Jerseys for a pet-milk herdshare. We teach classes
                to anyone who wants to learn what we wish someone had taught us early.
              </p>
              <p style={{color:"var(--umber-soft)", fontSize: 17, lineHeight: 1.7, marginTop: 16}}>
                We are not a big operation. We don't want to be. What we want is to raise good food
                for families who care where theirs comes from — and to know those families by name.
              </p>
            </div>
          </div>

          <div style={{marginTop: 120, textAlign: "center"}}>
            <div className="ornament" style={{justifyContent:"center", marginBottom: 32}}>what we believe</div>
            <div className="grid-3" style={{maxWidth: 1080, margin: "0 auto"}}>
              <div>
                <h3 style={{fontSize: 28, marginBottom: 12}}><em>Small is the point.</em></h3>
                <p style={{color:"var(--umber-soft)"}}>Every scale decision we make favors the animal, the soil, and the customer over growth.</p>
              </div>
              <div>
                <h3 style={{fontSize: 28, marginBottom: 12}}><em>Direct is honest.</em></h3>
                <p style={{color:"var(--umber-soft)"}}>Selling straight to the family who eats it keeps us accountable in a way wholesale never does.</p>
              </div>
              <div>
                <h3 style={{fontSize: 28, marginBottom: 12}}><em>Teach what we know.</em></h3>
                <p style={{color:"var(--umber-soft)"}}>We'd rather more people did this themselves than keep any of it secret.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

Object.assign(window, { AboutPage });
