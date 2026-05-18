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

        <div className="map-stack" aria-hidden="true">
          <div className="mapbg" style={{ backgroundImage: "url('https://campingdehinde.nl/WP/wp-content/uploads/2016/04/Dronterstrand.jpg')" }}></div>
          <div className="map-pin you" style={{ top: "52%", left: "40%" }}>
            <div className="pin"></div>
            <span>De Hinde</span>
          </div>
          <div className="map-pin" style={{ top: "28%", left: "22%" }}>
            <div className="pin"></div>
            <span>Roggebot · 3 km</span>
          </div>
          <div className="map-pin" style={{ top: "38%", left: "68%" }}>
            <div className="pin"></div>
            <span>Veluwemeer · 4 km</span>
          </div>
          <div className="map-pin" style={{ top: "76%", left: "60%" }}>
            <div className="pin"></div>
            <span>Elburg · 8 km</span>
          </div>
        </div>
      </div>
    </section>
  );
}
