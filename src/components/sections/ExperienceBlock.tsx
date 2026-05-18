import Link from "next/link";

export function ExperienceBlock() {
  return (
    <section className="exp design-section">
      <div className="design-container exp-grid">
        <div className="exp-collage">
          <div
            className="ph big"
            style={{
              backgroundImage:
                "url('https://campingdehinde.nl/WP/wp-content/uploads/2017/11/Dierenverzorging.jpg')",
            }}
          />
          <div
            className="ph"
            style={{
              backgroundImage:
                "url('https://campingdehinde.nl/WP/wp-content/uploads/2017/01/IMG_4378-400x284.jpg')",
            }}
          />
          <div
            className="ph"
            style={{
              backgroundImage:
                "url('https://campingdehinde.nl/WP/wp-content/uploads/2017/01/IMG_4276-e1617438666264-400x284.jpg')",
            }}
          />
          <div className="circle-text" aria-hidden="true">
            <svg viewBox="0 0 200 200">
              <defs>
                <path id="circ" d="M 100, 100 m -78, 0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0" />
              </defs>
              <circle cx="100" cy="100" r="78" className="circle" />
              <text>
                <textPath href="#circ" startOffset="0">  · zonder animatieteam · onze grootste luxe · zonder animatieteam · onze grootste luxe</textPath>
              </text>
            </svg>
          </div>
          <div
            className="handnote"
            style={{
              position: "absolute",
              bottom: "8%",
              left: "6%",
              maxWidth: 220,
              background: "var(--wit)",
              color: "var(--paars)",
              padding: "14px 18px",
              borderRadius: 18,
              fontFamily: "var(--hand)",
              fontSize: 18,
              lineHeight: 1.25,
              transform: "rotate(-3deg)",
              boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
              zIndex: 3,
            }}
          >
            &ldquo;De kinderen wilden niet meer naar huis&rdquo;
            <div style={{ fontSize: 14, marginTop: 6, color: "var(--tekst-grijs)" }}>
              — familie Jansen, juli 2025
            </div>
          </div>
        </div>
        <div className="exp-text">
          <div className="section-tag">De Hinde beleving</div>
          <h2 className="section-h">Stel je voor: wakker worden tussen de geiten</h2>
          <p>
            Een kop koffie zetten, eieren rapen voor je ontbijt. De hele dag buiten zijn, met de kinderen helpen op de boerderij of mee op koe-safari met René over het natuurgebied aan de overkant. &apos;s Avonds om het kampvuur, sterren tellen tot je er een ziet vallen.
          </p>
          <p>
            Echte rust, echte ruimte, en een echt boerenleven om in mee te draaien.
          </p>
          <Link href="/boerderij/dieren" className="btn-link">
            Ontdek de beleving
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
