export function PracticalBlock() {
  return (
    <section className="prac" id="praktisch">
      <div className="design-container">
        <div className="section-head-row" style={{ marginBottom: "36px" }}>
          <div>
            <div className="section-tag">Goed om te weten</div>
            <h2 className="section-h" style={{ fontSize: "clamp(28px, 3.2vw, 40px)" }}>Praktische dingetjes vooraf</h2>
          </div>
        </div>
        <div className="prac-grid">
          <div className="prac-card">
            <div className="prac-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
            </div>
            <div>
              <h4>Open van april tot oktober</h4>
              <p>De Stalloon (recreatieruimte) is het hele jaar door beschikbaar voor groepen.</p>
            </div>
          </div>
          <div className="prac-card">
            <div className="prac-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2l1 5h10l1-5"/><path d="M5 7c-1 4-1 8-1 13h16c0-5 0-9-1-13"/></svg>
            </div>
            <div>
              <h4>Verse broodjes &amp; streekproducten</h4>
              <p>Bestellen voor 19:00, ophalen om 8:30 in ons campingwinkeltje. Met streekproducten en op den duur ons eigen vlees.</p>
            </div>
          </div>
          <div className="prac-card">
            <div className="prac-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12.55a11 11 0 0 1 14 0"/><path d="M2 8.82a15 15 0 0 1 20 0"/><path d="M8 16a6 6 0 0 1 8 0"/><circle cx="12" cy="20" r="1"/></svg>
            </div>
            <div>
              <h4>Gratis WiFi over het hele terrein</h4>
              <p>Ook geschikt voor streamen, voor als het toch een keer regent.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
