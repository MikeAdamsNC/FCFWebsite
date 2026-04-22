function AnimalsPage() {
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <div className="crumb"><a href="#/home">Home</a> <Icon name="chev_r" size={12}/> <span>Animals</span></div>
          <h1>Meet <em>the critters.</em></h1>
          <p className="lede">
            Everybody on this farm has a job — even the dogs. Here's who you'll find if you come visit.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div className="animals">
            {ANIMALS.map(a => (
              <div key={a.id} className={"animal-card " + a.cls}>
                <Ph src={a.imgUrl}/>
                <div className="overlay">
                  <h3>{a.name}</h3>
                  <div className="count">{a.count}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid-3" style={{marginTop: 80}}>
            <div>
              <div className="eyebrow" style={{marginBottom: 14}}>How we raise them</div>
              <h3 style={{fontSize: 26, marginBottom: 14}}><em>Pasture first.</em></h3>
              <p style={{color:"var(--umber-soft)"}}>The birds and pigs move to fresh grass on a rotation. That's better for the animals, better for the soil, and better for what ends up on your plate.</p>
            </div>
            <div>
              <div className="eyebrow" style={{marginBottom: 14}}>Feed</div>
              <h3 style={{fontSize: 26, marginBottom: 14}}><em>No junk.</em></h3>
              <p style={{color:"var(--umber-soft)"}}>Non-GMO grain supplement to what they forage. No antibiotics, no hormones, no weird shortcuts.</p>
            </div>
            <div>
              <div className="eyebrow" style={{marginBottom: 14}}>Processing</div>
              <h3 style={{fontSize: 26, marginBottom: 14}}><em>Small batch.</em></h3>
              <p style={{color:"var(--umber-soft)"}}>Poultry processed on-farm in small batches. Pork and lamb handled by a local USDA butcher we trust.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

Object.assign(window, { AnimalsPage });
