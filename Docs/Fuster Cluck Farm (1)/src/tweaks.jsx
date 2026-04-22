// Tweaks context + panel, toggled via host "Tweaks" toolbar
const TweakCtx = createContext({ titleVariant: "ought", heroVariant: "stack" });

function useTweaks() { return useContext(TweakCtx); }

function TweakProvider({ children }) {
  const [state, setState] = useState(() => ({ ...(window.__tweaks || {}) }));
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onMsg = (e) => {
      const d = e.data || {};
      if (d.type === "__activate_edit_mode") setOpen(true);
      if (d.type === "__deactivate_edit_mode") setOpen(false);
    };
    window.addEventListener("message", onMsg);
    // announce availability
    try { window.parent.postMessage({ type: "__edit_mode_available" }, "*"); } catch {}
    return () => window.removeEventListener("message", onMsg);
  }, []);

  const set = (key, value) => {
    setState(prev => {
      const next = { ...prev, [key]: value };
      window.__tweaks = next;
      try { window.parent.postMessage({ type: "__edit_mode_set_keys", edits: { [key]: value } }, "*"); } catch {}
      return next;
    });
  };

  return (
    <TweakCtx.Provider value={state}>
      {children}
      {open && <TweakPanel state={state} set={set} onClose={() => setOpen(false)}/>}
    </TweakCtx.Provider>
  );
}

function TweakPanel({ state, set, onClose }) {
  return (
    <div className="tweaks-panel">
      <div className="tweaks-head">
        <span>Tweaks</span>
        <button onClick={onClose} aria-label="Close"><Icon name="x" size={14}/></button>
      </div>
      <div className="tweaks-body">
        <div className="tweaks-section">
          <span className="tweaks-label">Headline</span>
          <div className="tweaks-opts">
            {Object.entries(TITLE_VARIANTS).map(([k, v]) => (
              <button
                key={k}
                className={"tweaks-opt " + (state.titleVariant === k ? "active" : "")}
                onClick={() => set("titleVariant", k)}
              >
                <span className="dot-indicator"/>
                <span>{v.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="tweaks-section">
          <span className="tweaks-label">Hero image</span>
          <div className="tweaks-opts">
            {Object.entries(HERO_VARIANTS).map(([k, v]) => (
              <button
                key={k}
                className={"tweaks-opt " + (state.heroVariant === k ? "active" : "")}
                onClick={() => set("heroVariant", k)}
              >
                <span className="dot-indicator"/>
                <span>{v.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { TweakCtx, TweakProvider, useTweaks });
