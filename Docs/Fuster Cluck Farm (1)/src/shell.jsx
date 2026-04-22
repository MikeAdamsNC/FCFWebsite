// App shell: nav, footer, announce bar, cart context, router
const RouterCtx = createContext({ path: "home", go: () => {} });
const CartCtx = createContext(null);

function useHashRoute() {
  const [path, setPath] = useState(() => (location.hash.replace("#/", "") || "home"));
  useEffect(() => {
    const on = () => {
      setPath(location.hash.replace("#/", "") || "home");
      window.scrollTo({ top: 0 });
    };
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  const go = (p) => { location.hash = "#/" + p; };
  return { path, go };
}

function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem("fcf_cart") || "{}"); } catch { return {}; }
  });
  const [toast, setToast] = useState(null);
  useEffect(() => { localStorage.setItem("fcf_cart", JSON.stringify(items)); }, [items]);
  const add = (id, name) => {
    setItems(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    setToast(`Added ${name} to cart`);
    clearTimeout(add._t);
    add._t = setTimeout(() => setToast(null), 1800);
  };
  const remove = (id) => setItems(prev => { const n = { ...prev }; delete n[id]; return n; });
  const count = Object.values(items).reduce((a, b) => a + b, 0);
  return (
    <CartCtx.Provider value={{ items, add, remove, count }}>
      {children}
      {toast && <div className="toast"><Icon name="check" size={14}/> {toast}</div>}
      {count > 0 && (
        <a href="https://app.barn2door.com/fustercluckfarm/all" target="_blank" rel="noopener" className="cart-fab">
          <Icon name="cart" size={16}/> Checkout on Barn2Door
          <span className="cart-count">{count}</span>
        </a>
      )}
    </CartCtx.Provider>
  );
}

function Announce() {
  return (
    <div className="announce">
      <div className="inner">
        <span className="marquee">Free delivery on orders $100+ in Johnston County · Next pickup Fri Apr 24</span>
        <a href="https://app.barn2door.com/fustercluckfarm/all" target="_blank" rel="noopener">Shop online →</a>
      </div>
    </div>
  );
}

function Nav() {
  const { path } = useContext(RouterCtx);
  const [open, setOpen] = useState(false);
  useEffect(() => { setOpen(false); }, [path]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  const links = [
    ["home", "Home"], ["animals", "Animals"], ["classes", "Classes"],
    ["farm-store", "Farm Store"], ["about", "About"],
    ["gallery", "Gallery"], ["contact", "Contact"],
  ];
  return (
    <div className="nav">
      <div className="nav-row">
        <div className="nav-links">
          {links.slice(0, 3).map(([k, l]) => (
            <a key={k} href={"#/" + k} className={path === k ? "active" : ""}>{l}</a>
          ))}
        </div>
        <a href="#/home" className="brand">
          <img src={LOGO_URL} alt="Fuster Cluck Farm" className="brand-logo"/>
          <span className="brand-name">Fuster Cluck Farm</span>
        </a>
        <div className="nav-cta">
          {links.slice(3).map(([k, l]) => (
            <a key={k} href={"#/" + k} style={{ fontSize: 13.5, fontWeight: 500, marginRight: 18 }} className={path === k ? "active" : ""}>{l}</a>
          ))}
          <a href="https://app.barn2door.com/fustercluckfarm/all" target="_blank" rel="noopener" className="btn btn-primary btn-sm shop-btn-desktop">Shop</a>
          <button className="nav-burger" onClick={() => setOpen(true)} aria-label="Open menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
      {open && (
        <div className="mobile-menu">
          <div className="mobile-menu-head">
            <a href="#/home" className="brand" onClick={() => setOpen(false)}>
              <img src={LOGO_URL} alt="" className="brand-logo"/>
              <span className="brand-name">Fuster Cluck Farm</span>
            </a>
            <button className="nav-close" onClick={() => setOpen(false)} aria-label="Close">
              <Icon name="x" size={22}/>
            </button>
          </div>
          <div className="mobile-menu-links">
            {links.map(([k, l]) => (
              <a key={k} href={"#/" + k} className={path === k ? "active" : ""} onClick={() => setOpen(false)}>
                {l}<Icon name="chev_r" size={16}/>
              </a>
            ))}
          </div>
          <div className="mobile-menu-foot">
            <a href="https://app.barn2door.com/fustercluckfarm/all" target="_blank" rel="noopener" className="btn btn-primary">
              Shop Online <Icon name="arrow" size={15}/>
            </a>
            <div style={{marginTop: 20, fontSize: 13, color: "var(--umber-soft)", lineHeight: 1.7}}>
              3614 Glendale Rd, Kenly NC<br/>
              <a href="tel:19196321433" style={{color:"var(--umber)", textDecoration:"underline"}}>919-632-1433</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <img src={LOGO_URL} alt="Fuster Cluck Farm" style={{height: 72, marginBottom: 16, filter:"brightness(0) invert(1)"}}/>
            <div className="brand-xl">Fuster Cluck<br/><em style={{fontStyle:"italic", color:"var(--wheat)"}}>Farm.</em></div>
            <p className="tagline">A small family farm in Eastern North Carolina, raising pasture chicken, pork, and lamb the way it ought to be raised.</p>
            <div style={{display:"flex", gap: 10, marginTop: 24}}>
              <a href="https://www.facebook.com/profile.php?id=100051136304459" target="_blank" rel="noopener" style={{width:38,height:38,borderRadius:"50%",border:"1px solid #333",display:"grid",placeItems:"center"}}><Icon name="fb" size={16}/></a>
              <a href="https://www.instagram.com/fuster_cluck_farm/" target="_blank" rel="noopener" style={{width:38,height:38,borderRadius:"50%",border:"1px solid #333",display:"grid",placeItems:"center"}}><Icon name="ig" size={16}/></a>
            </div>
          </div>
          <div>
            <h4>Visit</h4>
            <div style={{fontSize:14,lineHeight:1.7}}>
              3614 Glendale Road<br/>Kenly, NC 27542<br/><br/>
              <b style={{color:"var(--cream)"}}>Farm Store</b><br/>Fri & Sat · 10 AM – 2 PM
            </div>
          </div>
          <div>
            <h4>Shop</h4>
            <a href="https://app.barn2door.com/fustercluckfarm/all" target="_blank" rel="noopener">Online Store</a>
            <a href="#/farm-store">Farm Store</a>
            <a href="https://app.barn2door.com/fustercluckfarm/all" target="_blank" rel="noopener">All Products</a>
            <a href="#/classes">Classes</a>
          </div>
          <div>
            <h4>Get In Touch</h4>
            <a href="tel:19196321433">919-632-1433</a>
            <a href="mailto:fustercluckfarmnc@gmail.com">Email us</a>
            <a href="#/contact">Contact form</a>
            <a href="#/about">Our story</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Fuster Cluck Farm · Kenly, NC</span>
          <span>Raised right. Sold right.</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { RouterCtx, CartCtx, useHashRoute, CartProvider, Announce, Nav, Footer });
