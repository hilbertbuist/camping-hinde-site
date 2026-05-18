import Link from "next/link";

export function CtaStrip() {
  return (
    <section className="cta-strip" id="boeken">
      <div className="design-container cta-row">
        <div>
          <h3>Klaar voor je vakantie?</h3>
          <p style={{ marginTop: 10, color: "rgba(255,255,255,0.85)", maxWidth: 560 }}>
            Check de beschikbaarheid of bel ons gerust op 0321-317669. We nemen de tijd om mee te denken.
          </p>
        </div>
        <div className="actions">
          <Link href="/boeken" className="design-btn btn-paars">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
            Boek nu
          </Link>
          <a href="tel:0321317669" className="design-btn btn-outline">Bel ons</a>
        </div>
      </div>
    </section>
  );
}
