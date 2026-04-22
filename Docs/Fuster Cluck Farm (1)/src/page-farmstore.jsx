function FarmStorePage() {
  const open = isOpenNow();
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <div className="crumb"><a href="#/home">Home</a> <Icon name="chev_r" size={12}/> <span>Farm Store</span></div>
          <h1>The <em>Farm Store.</em></h1>
          <p className="lede">
            Come pick out your cuts in person. The cooler's full on Friday morning and we restock as best we can through Saturday.
          </p>
        </div>
      </section>

      <section className="section" style={{paddingTop: 48}}>
        <div className="wrap">
          <div className="grid-2" style={{alignItems:"stretch"}}>
            <div>
              <div style={{aspectRatio:"4/3", borderRadius: 4, overflow:"hidden", marginBottom: 24}}>
                <Ph src={P.farmSign}/>
              </div>
              <div className="hours-card" style={{padding: 28, display:"flex", flexDirection:"column", gap: 16}}>
                <div className="hours-status">
                  <span className={"dot " + (open ? "open" : "")}/>
                  <span>{open ? "Open now" : "Closed"}</span>
                </div>
                <div style={{fontSize: 14, color: "var(--umber-soft)"}}>{nextOpening()}</div>
                <hr className="rule"/>
                <div className="hours-sched" style={{flexDirection:"column", gap: 12}}>
                  <div><b>FRIDAY</b>10 AM – 2 PM</div>
                  <div><b>SATURDAY</b>10 AM – 2 PM</div>
                  <div><b>SUN – THURSDAY</b>Closed · online orders welcome</div>
                </div>
              </div>
            </div>

            <div>
              <h2 style={{fontSize: 36, marginBottom: 20}}>What's in <em>the cooler.</em></h2>
              <p style={{color:"var(--umber-soft)", marginBottom: 28}}>
                Updated Friday morning. Call ahead — <a href="tel:19196321433" style={{textDecoration:"underline"}}>919-632-1433</a> — if you want us to set something aside.
              </p>
              <div className="stock" style={{gridTemplateColumns:"1fr"}}>
                {STOCK.map((s, i) => (
                  <div key={i} className="stock-row">
                    <span className="name">{s.name}</span>
                    <span className={"tag " + s.state}>{s.tag}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Map */}
          <div style={{marginTop: 96}}>
            <div className="section-head" style={{paddingBottom: 24, marginBottom: 32}}>
              <span className="section-num">Find us</span>
              <h2 style={{fontSize: 40}}>3614 Glendale Road, <em>Kenly NC.</em></h2>
              <a href="https://maps.google.com/?q=3614+Glendale+Rd+Kenly+NC+27542" target="_blank" rel="noopener" className="section-link">Open in Maps →</a>
            </div>
            <div className="map-wrap">
              <svg viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" style={{width:"100%", height:"100%", position:"absolute", inset:0}}>
                <rect width="800" height="450" fill="#f5efe2"/>
                {/* roads */}
                <path d="M -20 340 Q 200 330, 400 280 T 820 180" stroke="#d8cdb4" strokeWidth="22" fill="none" strokeLinecap="round"/>
                <path d="M 120 -20 Q 160 160, 260 280 T 360 520" stroke="#d8cdb4" strokeWidth="14" fill="none" strokeLinecap="round"/>
                <path d="M 500 -20 Q 520 120, 560 260 T 620 500" stroke="#e0d6be" strokeWidth="10" fill="none" strokeLinecap="round"/>
                {/* fields */}
                <path d="M 380 230 L 620 210 L 640 340 L 400 360 Z" fill="#e4ddc9" opacity="0.8"/>
                <path d="M 100 80 L 320 60 L 340 180 L 120 200 Z" fill="#dfd8c2" opacity="0.7"/>
                {/* trees */}
                {[[130,260],[180,280],[230,270],[550,120],[600,140],[650,110],[700,330],[740,350]].map(([x,y],i) => (
                  <circle key={i} cx={x} cy={y} r="14" fill="#b8c19d" opacity="0.6"/>
                ))}
                {/* street labels */}
                <text x="200" y="355" fontFamily="Public Sans" fontSize="11" fill="#8c7f63" letterSpacing="2">GLENDALE RD</text>
                <text x="140" y="150" fontFamily="Public Sans" fontSize="10" fill="#8c7f63" letterSpacing="2" transform="rotate(-65 140 150)">ROCKY BRANCH</text>
                <text x="60" y="40" fontFamily="Libre Caslon Text" fontStyle="italic" fontSize="13" fill="#8c7f63">Kenly, NC</text>
                <text x="720" y="430" fontFamily="Public Sans" fontSize="9" fill="#8c7f63" letterSpacing="2" textAnchor="end">I-95 →</text>
              </svg>
              <div className="map-pin">
                <div className="label">Fuster Cluck Farm</div>
                <div className="needle"/>
              </div>
            </div>
            <div style={{marginTop: 24, display:"flex", gap: 12, flexWrap:"wrap"}}>
              <a href="https://maps.google.com/?q=3614+Glendale+Rd+Kenly+NC+27542" target="_blank" rel="noopener" className="btn btn-primary">Directions <Icon name="arrow" size={15}/></a>
              <a href="tel:19196321433" className="btn btn-outline"><Icon name="phone" size={15}/> 919-632-1433</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

Object.assign(window, { FarmStorePage });
