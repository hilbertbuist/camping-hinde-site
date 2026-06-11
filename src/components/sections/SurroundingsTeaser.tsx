import Link from "next/link";

export function SurroundingsTeaser() {
  return (
    <section className="omg design-section" id="omgeving">
      <div className="design-container omg-grid">
        <div>
          <div className="section-tag">Omgeving</div>
          <h2 className="section-h">5 minuten op de fiets en je staat met je voeten in het water</h2>
          <ul className="omg-list">
            <li>
              <span className="name">Drontermeer <small>op de fiets</small></span>
              <span className="dots"></span>
              <span className="dist">2 km</span>
            </li>
            <li>
              <span className="name">Bos van Roggebot <small>fietsen &amp; wandelen</small></span>
              <span className="dots"></span>
              <span className="dist">3 km</span>
            </li>
            <li>
              <span className="name">Veluwemeer <small>strand &amp; zwemmen</small></span>
              <span className="dots"></span>
              <span className="dist">4 km</span>
            </li>
            <li>
              <span className="name">Abbertbos &amp; Revebos <small>bos &amp; routes</small></span>
              <span className="dots"></span>
              <span className="dist">5 km</span>
            </li>
            <li>
              <span className="name">Elburg <small>vestingstadje</small></span>
              <span className="dots"></span>
              <span className="dist">8 km</span>
            </li>
            <li>
              <span className="name">Walibi Holland <small>pretpark</small></span>
              <span className="dots"></span>
              <span className="dist">12 km</span>
            </li>
            <li>
              <span className="name">Dolfinarium <small>Harderwijk</small></span>
              <span className="dots"></span>
              <span className="dist">18 km</span>
            </li>
          </ul>
          <Link href="/omgeving" className="design-btn btn-outline">
            Bekijk de omgeving
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
          </Link>
        </div>

        <div className="map-stack" style={{ background: "transparent" }}>
          {/* Echte kaart van het gebied rond De Hinde, gecentreerd op
              Stobbenweg 6 Dronten met Veluwemeer, Elburg en bossen zichtbaar */}
          <iframe
            title="Kaart van De Hinde en omgeving"
            src="https://www.openstreetmap.org/export/embed.html?bbox=5.72%2C52.46%2C5.96%2C52.58&amp;layer=mapnik"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              border: 0,
              borderRadius: 24,
            }}
          />
          {/* "Hier zijn wij"-pin overlay bovenop de kaart */}
          <div
            className="map-pin you"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -100%)",
              pointerEvents: "none",
            }}
          >
            <div className="pin"></div>
            <span>De Hinde</span>
          </div>
          {/* Link naar grote kaart voor wie meer wil zien */}
          <a
            href="https://www.openstreetmap.org/?mlat=52.5185&amp;mlon=5.8397#map=13/52.5185/5.8397"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              position: "absolute",
              right: 16,
              bottom: 16,
              background: "rgba(255,255,255,.92)",
              padding: "8px 14px",
              borderRadius: 999,
              fontSize: 13,
              fontWeight: 600,
              color: "var(--paars)",
              boxShadow: "0 4px 12px rgba(0,0,0,.15)",
              textDecoration: "none",
              zIndex: 4,
            }}
          >
            Open in kaart →
          </a>
        </div>
      </div>
    </section>
  );
}
