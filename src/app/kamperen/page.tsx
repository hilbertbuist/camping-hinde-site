import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kamperen bij de boer in Dronten | Boerderijcamping De Hinde Flevoland",
  description:
    "Kampeer op een ruime, door groen omgeven kampeerplek bij Boerderijcamping De Hinde. 19 plekken, eigen wateraansluiting, 6A stroom, sanitair met vloerverwarming. Vlakbij het Veluwemeer.",
  alternates: { canonical: "/kamperen" },
};

function Check() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ width: 18, height: 18, color: "var(--groen-donker)", flexShrink: 0, marginTop: 4 }}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 12 }}>
      {items.map((it) => (
        <li key={it} style={{ display: "flex", gap: 10, alignItems: "flex-start", color: "var(--tekst)" }}>
          <Check /> <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

export default function KamperenPage() {
  return (
    <>
      {/* Hero */}
      <section
        style={{
          position: "relative",
          minHeight: "62vh",
          display: "flex",
          alignItems: "flex-end",
          backgroundImage:
            "linear-gradient(180deg, rgba(61,20,72,0.30) 0%, rgba(61,20,72,0.65) 100%), url('/images/photos/kampeerveld-bij-zonsondergang-met-camper.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
        }}
      >
        <div className="design-container" style={{ paddingTop: 120, paddingBottom: 80 }}>
          <div className="section-tag" style={{ color: "var(--oranje)" }}>Kamperen op De Hinde</div>
          <h1 className="section-h" style={{ color: "white" }}>Je eigen plek op het grasveld</h1>
          <p style={{ marginTop: 20, maxWidth: 640, fontSize: 20, lineHeight: 1.5, color: "rgba(255,255,255,0.92)" }}>
            Negentien ruime plekken, door groen van elkaar gescheiden, met uitzicht op het land waar de geiten lopen.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="design-section" style={{ background: "var(--creme)" }}>
        <div className="design-container" style={{ maxWidth: 820 }}>
          <p style={{ fontSize: 19, lineHeight: 1.7, color: "var(--tekst)" }}>
            Voor velen is dit hoe kamperen begint. Een grasveld voor jou alleen, paaltje erin, tent erop, en de auto vlak ernaast. Onze plekken zijn ruim ingedeeld en allemaal door hagen en groen van elkaar gescheiden. Dat geeft je privacy, ook als de camping vol zit.
          </p>
          <p style={{ fontSize: 19, lineHeight: 1.7, color: "var(--tekst)", marginTop: 18 }}>
            We hebben plek voor tenten, vouwwagens, caravans en campers. Drie plekken zijn extra geschikt voor zware campers, de rest is op gras. Eigen wateraansluiting per plek, 6 ampère stroom standaard, op aanvraag uit te breiden naar 8 of 10A.
          </p>
        </div>
      </section>

      {/* Faciliteiten + foto */}
      <section className="design-section" style={{ background: "var(--wit)" }}>
        <div className="design-container" style={{ display: "grid", gap: 48, gridTemplateColumns: "1fr 1fr", alignItems: "center" }}>
          <div>
            <div className="section-tag">Op je plek</div>
            <h2 className="section-h">Faciliteiten waar je op kunt rekenen</h2>
            <div style={{ marginTop: 28 }}>
              <CheckList
                items={[
                  "Eigen wateraansluiting",
                  "6A stroom (uit te breiden naar 8 of 10A)",
                  "WiFi over het hele terrein",
                  "Door groen gescheiden van de buren",
                  "Eigen parkeerplek bij je tent",
                  "Geschikt voor 1 hond per plek (gratis)",
                ]}
              />
            </div>
          </div>
          <div
            style={{
              backgroundImage: "url('/images/photos/kampeerplekken-met-camper-en-caravan-tussen-bomen.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: 24,
              minHeight: 420,
            }}
          />
        </div>
      </section>

      {/* Sanitair */}
      <section className="design-section" style={{ background: "var(--creme)" }}>
        <div className="design-container" style={{ display: "grid", gap: 48, gridTemplateColumns: "1fr 1fr", alignItems: "center" }}>
          <div
            style={{
              backgroundImage: "url('/images/photos/ruime-kampeerplekken-met-camper-en-tent.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: 24,
              minHeight: 420,
              order: 2,
            }}
          />
          <div>
            <div className="section-tag">Sanitair</div>
            <h2 className="section-h">Sanitair met vloerverwarming</h2>
            <p style={{ fontSize: 18, lineHeight: 1.7, color: "var(--tekst)", marginTop: 18 }}>
              Het centrale sanitairgebouw ligt op loopafstand van elke plek, te bereiken over verharde paden. Alle ruimtes hebben vloerverwarming, ook in het voor- en naseizoen. De douches werken met een thermostaatkraan en een 5-minutenklok die je kan stilzetten als je je haar inzeept. Geen muntjes nodig, warm water inbegrepen.
            </p>
            <h3 style={{ color: "var(--paars)", marginTop: 26, fontSize: 22 }}>Wat je kunt verwachten</h3>
            <div style={{ marginTop: 16 }}>
              <CheckList
                items={[
                  "6 douches, waarvan 2 familiedouches met aankleedkussen",
                  "6 toiletten met toiletpapier",
                  "Stortplaats chemisch toilet",
                  "Babybadje op aanvraag",
                  "Wasmachine en droger (kleine vergoeding)",
                  "Buitenafwasplek met spoelbakken en groente/fruit-wasbak",
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Voor de kinderen */}
      <section className="design-section" style={{ background: "var(--wit)" }}>
        <div className="design-container">
          <div style={{ maxWidth: 720 }}>
            <div className="section-tag">Voor de kinderen</div>
            <h2 className="section-h">Spelen tot je erbij neervalt</h2>
            <p style={{ fontSize: 19, lineHeight: 1.7, color: "var(--tekst)", marginTop: 18 }}>
              Onze camping ligt op een ruim eigen erf, een veilige speelplek voor kinderen. Buiten de eigen plek is er volop te beleven:
            </p>
          </div>
          <div style={{ marginTop: 28, display: "grid", gap: 14, gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
            <CheckList
              items={[
                "Overdekte stro-stro speelhoek (ook bij regen lekker spelen)",
                "Singel pretpad voor de avontuurlijke kinderen",
                "Kleindieren-schuur en geitenweide om te knuffelen",
                "Skelters en traptrekkers om mee te crossen",
              ]}
            />
            <CheckList
              items={[
                "Glijbaan, schommel en trampoline",
                "Zandbak en een grote veldzandbak",
                "Sportveld voor voetbal, volleybal en andere balspelen",
                "Recreatieruimte met spelletjes en knutselspullen voor regenachtige dagen",
              ]}
            />
          </div>
        </div>
      </section>

      {/* Nog meer */}
      <section className="design-section" style={{ background: "var(--creme)", paddingTop: 0 }}>
        <div className="design-container">
          <div className="section-tag">En verder</div>
          <h2 className="section-h">Wat de camping nog meer biedt</h2>
          <div style={{ marginTop: 22, maxWidth: 620 }}>
            <CheckList
              items={[
                "Campingwinkeltje met streekproducten",
                "Verse broodjes te bestellen (zaterdag, zondag en vakantiedagen)",
                "Werkplaats voor klein onderhoud aan je fiets",
              ]}
            />
          </div>
        </div>
      </section>

      {/* Tarieven */}
      <section className="design-section" style={{ background: "var(--wit)" }}>
        <div className="design-container">
          <div style={{ maxWidth: 720 }}>
            <div className="section-tag">Tarieven 2026</div>
            <h2 className="section-h">Inclusief 2 personen</h2>
            <p style={{ fontSize: 18, lineHeight: 1.7, color: "var(--tekst-grijs)", marginTop: 14 }}>
              Inclusief 2 personen, water, milieuheffing en gebruik van alle voorzieningen.
            </p>
          </div>

          <div
            style={{
              marginTop: 36,
              background: "var(--wit)",
              border: "1px solid var(--rand)",
              borderRadius: 20,
              overflow: "hidden",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead style={{ background: "var(--creme)" }}>
                <tr>
                  <th style={{ padding: "16px 24px", fontFamily: "var(--serif)", fontStyle: "italic", color: "var(--paars)" }}>Periode</th>
                  <th style={{ padding: "16px 24px", fontFamily: "var(--serif)", fontStyle: "italic", color: "var(--paars)" }}>Per nacht</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderTop: "1px solid var(--rand)" }}>
                  <td style={{ padding: "14px 24px", color: "var(--tekst)" }}>Laagseizoen (apr-jun, sep-okt)</td>
                  <td style={{ padding: "14px 24px", color: "var(--tekst)" }}>vanaf €24</td>
                </tr>
                <tr style={{ borderTop: "1px solid var(--rand)" }}>
                  <td style={{ padding: "14px 24px", color: "var(--tekst)" }}>Middenseizoen (juni, augustus)</td>
                  <td style={{ padding: "14px 24px", color: "var(--tekst)" }}>vanaf €28</td>
                </tr>
                <tr style={{ borderTop: "1px solid var(--rand)" }}>
                  <td style={{ padding: "14px 24px", color: "var(--tekst)" }}>Hoogseizoen (juli)</td>
                  <td style={{ padding: "14px 24px", color: "var(--tekst)" }}>vanaf €32</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: 40, display: "grid", gap: 32, gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
            <div>
              <h3 style={{ color: "var(--paars)", fontSize: 22 }}>Bijkomende kosten</h3>
              <div style={{ marginTop: 14 }}>
                <CheckList
                  items={[
                    "Toeristenbelasting: €1,75 p.p.p.n.",
                    "Extra persoon: €4 p.p.p.n.",
                    "Kind 4-12 jaar: €2,50 p.p.p.n.",
                    "Hond: gratis (max. 1 per plek, aangelijnd)",
                    "Bezoek: €2 p.p.p.d.",
                    "Extra bijzettentje: €0,90 p.n.",
                    "Uitbreiding stroom 8A/10A: €2 per nacht",
                    "Waspoeder: €1,50 (op verzoek)",
                  ]}
                />
              </div>
            </div>
            <div>
              <h3 style={{ color: "var(--paars)", fontSize: 22 }}>Aankomst en vertrek</h3>
              <div style={{ marginTop: 14 }}>
                <CheckList
                  items={[
                    "Aankomst vanaf 15:00 uur",
                    "Vertrek voor 12:00 uur",
                    "Eerder/later? Boek een extra nacht",
                  ]}
                />
              </div>
              <h3 style={{ color: "var(--paars)", fontSize: 22, marginTop: 28 }}>Voorwaarden</h3>
              <div style={{ marginTop: 14 }}>
                <CheckList
                  items={[
                    "1 hond per plek (aangelijnd, geen overlast)",
                    "Algemene voorwaarden In het Groen van toepassing",
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="design-section" style={{ background: "var(--paars-donker)", color: "white" }}>
        <div className="design-container" style={{ display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div className="section-tag" style={{ color: "var(--oranje)" }}>Boeken</div>
            <h2 className="section-h" style={{ color: "white" }}>Klaar voor je vakantie?</h2>
          </div>
          <Link href="/boeken" className="design-btn btn-groen">
            Check beschikbaarheid
          </Link>
        </div>
      </section>
    </>
  );
}
