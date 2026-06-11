import Link from "next/link";

export function WelcomeBlock() {
  return (
    <section className="welcome" id="welkom">
      <div className="container welcome-grid">
        <div className="welcome-text">
          <div className="section-tag">Welkom op De Hinde</div>
          <h2 className="section-h">Hier loopt een kip nog gewoon op je pad</h2>
          <p>
            Wij zijn René en Dora, derde generatie boer op deze plek aan de rand van Dronten. Naast ons akkerbouwbedrijf van 34 hectare doen we sinds een paar jaar aan natuurbeheer aan de overkant van de weg, waar onze kleinschalige veehouderij in alle rust rondloopt. Sinds 2010 hebben we hier ook een boerderijcamping. Negentien kampeerplekken, drie safaritenten en twee knusse hutten. Een hoop ruimte en nog meer rust.
          </p>
          <p>
            Wat je hier vindt: een speelhoek in het stro waar kinderen uren zoek raken, een glijbaan en trampoline op het sportveld, koe-safari met de boer, en avonden bij het kampvuur waar je naar de sterren kijkt en denkt: dit was nodig.
          </p>
          <Link href="/boerderij" className="design-btn btn-paars">
            Lees ons verhaal
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </Link>
          <div className="signature">— groet, René &amp; Dora</div>
        </div>

        <div className="welcome-collage">
          {/* p1 — grote portrait links: kampeerveld met gezin */}
          <div
            className="ph p1"
            style={{
              backgroundImage:
                "url('/images/photos/kampeerveld-gezin.jpg')",
            }}
          />
          {/* p2 — wide landscape rechtsboven: René & Dora (beiden zichtbaar) */}
          <div
            className="ph p2"
            style={{
              backgroundImage:
                "url('/images/photos/rene-en-dora-buist.jpg')",
              backgroundPosition: "center center",
            }}
          />
          {/* p3 — vierkant midden: geit verzorgen */}
          <div
            className="ph p3"
            style={{
              backgroundImage:
                "url('/images/photos/geit-verzorgen.jpg')",
            }}
          />
          {/* p4 — landscape onder: speeltijd */}
          <div
            className="ph p4"
            style={{
              backgroundImage:
                "url('/images/photos/speeltijd.jpg')",
            }}
          />
          {/* p5 — smalle portrait rechts: skelter */}
          <div
            className="ph p5"
            style={{
              backgroundImage:
                "url('/images/photos/skelter.jpg')",
            }}
          />
          <div className="collage-stamp">
            Sinds<br />2010<br />op De Hinde
          </div>
        </div>
      </div>
    </section>
  );
}
