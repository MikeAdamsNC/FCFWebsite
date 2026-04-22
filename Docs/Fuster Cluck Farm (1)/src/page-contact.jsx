function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <div className="crumb"><a href="#/home">Home</a> <Icon name="chev_r" size={12}/> <span>Contact</span></div>
          <h1>Drop us <em>a line.</em></h1>
          <p className="lede">
            Fastest way is a text. We'll get back to you between the morning chores and the evening feed — usually within a day.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="contact-grid">
            <div className="contact-info">
              <div className="row">
                <div className="icon"><Icon name="phone" size={18}/></div>
                <div>
                  <b>Call or text</b>
                  <a href="tel:19196321433" style={{fontSize:18, color:"var(--clay)"}}>919-632-1433</a>
                  <div className="sub" style={{marginTop:4}}>Best for time-sensitive questions</div>
                </div>
              </div>
              <div className="row">
                <div className="icon"><Icon name="mail" size={18}/></div>
                <div>
                  <b>Email</b>
                  <a href="mailto:fustercluckfarmnc@gmail.com" style={{fontSize:16, color:"var(--clay)"}}>fustercluckfarmnc@gmail.com</a>
                </div>
              </div>
              <div className="row">
                <div className="icon"><Icon name="pin" size={18}/></div>
                <div>
                  <b>Visit</b>
                  <div>3614 Glendale Road<br/>Kenly, NC 27542</div>
                  <div className="sub" style={{marginTop:4}}>Farm store open Fri & Sat, 10–2</div>
                </div>
              </div>
              <div className="row">
                <div className="icon"><Icon name="clock" size={18}/></div>
                <div>
                  <b>We're around</b>
                  <div>Dawn to dusk, every day.</div>
                  <div className="sub" style={{marginTop:4}}>Please call before stopping outside store hours.</div>
                </div>
              </div>
            </div>

            <div>
              <div style={{background: "var(--cream)", padding: 36, borderRadius: 4, border: "1px solid var(--rule)"}}>
                <h3 style={{fontSize: 28, marginBottom: 20}}>Send us a note</h3>
                {sent ? (
                  <div style={{padding: 40, textAlign:"center"}}>
                    <div style={{width: 56, height: 56, borderRadius:"50%", background:"var(--moss)", color:"var(--paper)", display:"grid", placeItems:"center", margin:"0 auto 20px"}}>
                      <Icon name="check" size={24}/>
                    </div>
                    <div className="serif" style={{fontSize: 22, marginBottom: 8}}>Got it. Thanks.</div>
                    <div style={{color:"var(--umber-soft)", fontSize: 14}}>We'll write back soon.</div>
                  </div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                    <div className="form-field">
                      <label>Your name</label>
                      <input type="text" required placeholder="Jim Smith"/>
                    </div>
                    <div className="form-field">
                      <label>Email</label>
                      <input type="email" required placeholder="you@example.com"/>
                    </div>
                    <div className="form-field">
                      <label>What's it about?</label>
                      <select defaultValue="">
                        <option value="" disabled>Pick one</option>
                        <option>Ordering / pickup</option>
                        <option>Farm store visit</option>
                        <option>Classes & workshops</option>
                        <option>Wholesale / chefs</option>
                        <option>Something else</option>
                      </select>
                    </div>
                    <div className="form-field">
                      <label>Message</label>
                      <textarea required placeholder="Tell us what you're thinking about..."/>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{width:"100%", justifyContent:"center"}}>
                      Send it <Icon name="arrow" size={15}/>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

Object.assign(window, { ContactPage });
