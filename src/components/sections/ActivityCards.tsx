export function ActivityCards() {
  return (
    <section className="activities design-section">
      <div className="design-container">
        <div className="section-head-row">
          <div>
            <div className="section-tag">Wat doe je hier?</div>
            <h2 className="section-h">Geen draaiboek, wel een hoop te beleven</h2>
          </div>
        </div>
        <div className="act-grid">
          <article className="act-card var-1">
            <div className="act-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="13" rx="6" ry="8"/><path d="M9 19c0 1.5 1.5 2 3 2s3-.5 3-2"/></svg>
            </div>
            <h3>Eieren rapen voor het ontbijt</h3>
            <p>De kippen leggen het hele jaar door. Mandje pakken, hokje in, en kijken wie er warm is.</p>
          </article>
          <article className="act-card var-2">
            <div className="act-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="18" r="3"/><circle cx="18" cy="18" r="3"/><path d="M3 14V8a2 2 0 0 1 2-2h7l3 4h4a2 2 0 0 1 2 2v6"/><path d="M9 14V8"/></svg>
            </div>
            <h3>Op koe-safari met de boer</h3>
            <p>René rijdt regelmatig een rondje over het natuurgebied. Spring achterop, je ziet meer dan je denkt.</p>
          </article>
          <article className="act-card var-3">
            <div className="act-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2c1 3-1 5-1 8 0 2 1 3 1 3s-3-1-3-4"/><path d="M9 13c-3 0-5 3-5 5 0 3 3 4 8 4s8-1 8-4c0-2-2-5-5-5"/><path d="M14 9c0 1.5 1 3 1 4"/></svg>
            </div>
            <h3>Kampvuur als de zon zakt</h3>
            <p>Een eigen vuurplek per accommodatie. Marshmallows niet vergeten.</p>
          </article>
        </div>
      </div>
    </section>
  );
}
