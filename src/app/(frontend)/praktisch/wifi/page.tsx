import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gratis WiFi op De Hinde | Goed internet op de camping in Dronten",
  description:
    "Gratis WiFi over het hele terrein van Boerderijcamping De Hinde. Snel genoeg om te streamen.",
};

function IconWifi() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M2 9a15 15 0 0 1 20 0" />
      <path d="M5 13a10 10 0 0 1 14 0" />
      <path d="M8 17a5 5 0 0 1 8 0" />
      <circle cx="12" cy="20" r="1" />
    </svg>
  );
}
function IconSpeed() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 18a9 9 0 1 1 18 0" />
      <path d="M12 18l4-6" />
    </svg>
  );
}
function IconFree() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

export default function WifiPage() {
  return (
    <>
      {/* Hero */}
      <section className="design-section" style={{ background: "var(--creme)" }}>
        <div className="design-container">
          <div className="max-w-3xl">
            <div className="section-tag">WiFi</div>
            <h1 className="section-h mt-4">Gratis WiFi over het hele terrein</h1>
            <p className="mt-6 text-lg leading-relaxed text-tekst-grijs md:text-xl">
              Want soms wil je gewoon Netflix kijken in de tent.
            </p>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="design-section bg-wit">
        <div className="design-container">
          <div className="mx-auto max-w-3xl space-y-6 text-base leading-relaxed text-tekst-grijs md:text-lg">
            <p>
              Over het hele terrein van De Hinde is gratis WiFi beschikbaar.
              Snel genoeg voor mailen, video-bellen, en zelfs streamen van
              series of films. De capaciteit hangt natuurlijk wel af van het
              totale gebruik op het veld, dus tijdens het hoogseizoen op een
              regenachtige avond kan het iets trager zijn.
            </p>
            <p>
              Geen wachtwoord nodig, gewoon verbinden met "Camping De Hinde"
              en je bent online.
            </p>
          </div>
        </div>
      </section>

      {/* Snelheid */}
      <section className="design-section" style={{ background: "var(--creme)" }}>
        <div className="design-container">
          <div className="section-head-row mb-12">
            <div>
              <div className="section-tag">Snelheid</div>
              <h2 className="section-h">Goed genoeg om te streamen</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="prac-card">
              <span className="prac-icon"><IconSpeed /></span>
              <div>
                <h4>50-100 Mbps</h4>
                <p>Gemiddelde downloadsnelheid op het terrein.</p>
              </div>
            </div>
            <div className="prac-card">
              <span className="prac-icon"><IconWifi /></span>
              <div>
                <h4>HD streamen</h4>
                <p>Voldoende voor Netflix, YouTube en video-bellen.</p>
              </div>
            </div>
            <div className="prac-card">
              <span className="prac-icon"><IconFree /></span>
              <div>
                <h4>Geen extra kosten</h4>
                <p>Gratis voor al onze gasten, geen wachtwoord nodig.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-strip">
        <div className="design-container">
          <div className="cta-row">
            <h3 className="text-2xl text-paars-primair md:text-3xl">
              Boek je verblijf
            </h3>
            <div className="flex flex-wrap gap-3">
              <Link href="/boeken" className="design-btn btn-paars">
                Check beschikbaarheid
              </Link>
              <Link href="/praktisch" className="design-btn btn-outline">
                Terug naar Praktisch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
