import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "De Stalloon huren in Dronten · Sfeervolle ruimte voor feestjes en groepen",
  description:
    "Verbouwde koeienstal als sfeervolle recreatieruimte voor feesten, familiereünies en verenigingsuitjes. Plek voor 50 personen, in Dronten. Verhuur per dag.",
};

const gelegenheden = [
  "Verjaardagen en jubilea",
  "Familiereünies",
  "Kleine bruiloften en partnerschapsfeesten",
  "Vergaderingen en workshops",
  "Verenigingsuitjes en clubavonden",
  "Babyborrels en gender reveals",
  "Yoga- of creatieve workshops",
  "Rouwbijeenkomsten en koffietafels",
];

const inDeStalloon = [
  "Plek voor 50 personen",
  "Keukenblok met bar",
  "Vaatwasser",
  "Koelkast met diepvries",
  "Magnetron",
  "Elektrische kookplaat (2-pits)",
  "Koffiezetapparaat",
  "Servies, kopjes en glazen voor 50",
  "Tafels en stoelen",
  "Eigen toilet",
  "Gratis WiFi",
  "Verwarmd",
];

const buiten = [
  "Eigen erf en parkeergelegenheid",
  "Stro-stro speelhoek (overdekt)",
  "Glijbaan, schommel en trampoline",
  "Sportveld",
  "Geitenweide en kleindieren-schuur",
];

const optioneel = [
  "Horeca gas-bbq: €25 per dag",
  "Schoonmaakkosten bbq: €12 per bbq",
  "Serveer- en bbq-tangen: €5 per set",
  "Vuurkorf + 1 kruiwagen hout: €17",
  "Extra kruiwagen hout: €12",
];

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
      style={{
        width: "18px",
        height: "18px",
        color: "var(--groen)",
        flexShrink: 0,
        marginTop: "4px",
      }}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function StalloonPage() {
  return (
    <>
      {/* 1. Hero */}
      <section
        className="design-section"
        style={{ background: "var(--creme)" }}
      >
        <div className="design-container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.1fr 1fr",
              gap: "60px",
              alignItems: "center",
            }}
          >
            <div>
              <div className="section-tag">De Stalloon</div>
              <h1 className="section-h">
                Een verbouwde koeienstal voor jouw feestje
              </h1>
              <p
                style={{
                  marginTop: "24px",
                  fontSize: "19px",
                  lineHeight: 1.65,
                  color: "var(--tekst-grijs)",
                  maxWidth: "55ch",
                }}
              >
                Waar opa&apos;s Groningse Blaarkoppen ooit stonden, geef jij nu
                het beste verjaardagsfeest van het jaar.
              </p>
            </div>
            <div
              style={{
                borderRadius: "22px",
                overflow: "hidden",
                aspectRatio: "4 / 3",
                boxShadow: "0 14px 30px rgba(0,0,0,.10)",
              }}
            >
              <img
                src="/images/photos/boerderijwinkeltje-met-streekproducten-en-drankjes.jpg"
                alt="Sfeerbeeld van De Stalloon"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Intro */}
      <section
        className="design-section"
        style={{ background: "var(--wit)", paddingTop: 0 }}
      >
        <div className="design-container">
          <div
            style={{
              maxWidth: "70ch",
              fontSize: "17px",
              lineHeight: 1.8,
              color: "var(--tekst)",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            <p>
              De Stalloon is onze omgebouwde koeienstal, met behoud van het
              originele hout en de oude balken. Vroeger stonden hier mijn
              opa&apos;s Groningse Blaarkoppen, nu is het een warme, landelijke
              recreatieruimte met een authentieke uitstraling. Geschikt voor
              gezelschappen tot vijftig personen, het hele jaar door
              beschikbaar, met alles erop en eraan.
            </p>
            <p>
              Of het nu gaat om een verjaardag, familiereünie, kleine bruiloft,
              vergadering, workshop of gewoon een gezellige zondag met de
              buurtvereniging: De Stalloon biedt de plek, jij vult hem in.
              Knus, karaktervol, en die dag helemaal van jou.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Waarvoor */}
      <section
        className="design-section"
        style={{ background: "var(--creme)" }}
      >
        <div className="design-container">
          <div className="section-head-row">
            <div>
              <div className="section-tag">Waarvoor</div>
              <h2 className="section-h">
                Waarvoor je De Stalloon kunt boeken
              </h2>
            </div>
            <p
              style={{
                color: "var(--tekst-grijs)",
                maxWidth: "420px",
                fontSize: "16px",
              }}
            >
              Een ruimte met karakter, die past bij wat jij wilt vieren. Klein
              of groot, plechtig of uitbundig.
            </p>
          </div>

          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "14px",
              maxWidth: "900px",
            }}
          >
            {gelegenheden.map((g) => (
              <li
                key={g}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "14px",
                  background: "var(--wit)",
                  borderRadius: "14px",
                  padding: "16px 20px",
                  border: "1px solid var(--rand)",
                  fontSize: "15px",
                  color: "var(--tekst)",
                }}
              >
                <Check />
                <span>{g}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. Wat zit er in? — 3 kolommen */}
      <section
        className="design-section"
        style={{ background: "var(--wit)" }}
      >
        <div className="design-container">
          <div style={{ marginBottom: "48px" }}>
            <div className="section-tag">Voorzieningen</div>
            <h2 className="section-h">Wat zit er in?</h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "28px",
            }}
          >
            {[
              { title: "In de Stalloon", items: inDeStalloon },
              { title: "Buiten", items: buiten },
              { title: "Optioneel te huren", items: optioneel },
            ].map((col) => (
              <div
                key={col.title}
                style={{
                  background: "var(--creme)",
                  borderRadius: "22px",
                  padding: "30px 28px",
                  border: "1px solid var(--rand)",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--serif)",
                    fontStyle: "italic",
                    fontWeight: 500,
                    fontSize: "24px",
                    color: "var(--paars)",
                    marginBottom: "18px",
                  }}
                >
                  {col.title}
                </h3>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  {col.items.map((it) => (
                    <li
                      key={it}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                        fontSize: "14px",
                        lineHeight: 1.55,
                        color: "var(--tekst)",
                      }}
                    >
                      <Check />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Beschikbaarheid + Tarieven */}
      <section
        className="design-section"
        style={{ background: "var(--creme)" }}
      >
        <div className="design-container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "32px",
            }}
          >
            <div
              style={{
                background: "var(--wit)",
                borderRadius: "22px",
                padding: "36px 32px",
                border: "1px solid var(--rand)",
              }}
            >
              <div className="section-tag">Beschikbaarheid</div>
              <h2
                className="section-h"
                style={{ fontSize: "clamp(28px, 3vw, 36px)" }}
              >
                Bijna het hele jaar door
              </h2>
              <p
                style={{
                  marginTop: "20px",
                  fontSize: "16px",
                  lineHeight: 1.7,
                  color: "var(--tekst)",
                }}
              >
                De Stalloon is het hele jaar door te huur, behalve in januari
                en februari. Tijdens de schoolvakanties is de ruimte
                gereserveerd voor onze campinggasten, dus dan niet beschikbaar
                voor verhuur.
              </p>
            </div>

            <div
              style={{
                background: "var(--wit)",
                borderRadius: "22px",
                padding: "36px 32px",
                border: "1px solid var(--rand)",
              }}
            >
              <div className="section-tag">Tarief</div>
              <h2
                className="section-h"
                style={{ fontSize: "clamp(28px, 3vw, 36px)" }}
              >
                €120 per dag
              </h2>
              <p
                style={{
                  marginTop: "20px",
                  fontSize: "16px",
                  lineHeight: 1.7,
                  color: "var(--tekst)",
                }}
              >
                Vanaf 12:00 uur. Daarbovenop komen servicekosten van €2 per
                persoon per dag.
              </p>
              <p
                style={{
                  marginTop: "12px",
                  fontSize: "14px",
                  color: "var(--tekst-grijs)",
                  lineHeight: 1.6,
                }}
              >
                Niet roken, geen huisdieren, schoon opleveren. Algemene
                voorwaarden In het Groen van toepassing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Sfeerblok / Quote */}
      <section className="exp design-section">
        <div className="design-container">
          <div style={{ maxWidth: "880px", margin: "0 auto", textAlign: "center" }}>
            <p
              className="rev-quote"
              style={{
                fontFamily: "var(--serif)",
                fontStyle: "italic",
                fontWeight: 500,
                fontSize: "clamp(22px, 2.4vw, 30px)",
                lineHeight: 1.4,
                color: "white",
                marginBottom: "20px",
                textWrap: "balance",
              }}
            >
              &quot;We hadden onze oma&apos;s 80e verjaardag in De Stalloon. De
              ruimte heeft echt karakter, de kinderen konden buiten spelen, en
              wij konden eindelijk weer alle generaties op één plek krijgen.&quot;
            </p>
            <div
              style={{
                fontFamily: "var(--hand)",
                fontSize: "22px",
                color: "var(--oranje)",
              }}
            >
              — familie Hendriks, mei 2025
            </div>
          </div>
        </div>
      </section>

      {/* 7. Aanvraagformulier */}
      <section
        className="design-section"
        style={{ background: "var(--wit)" }}
      >
        <div className="design-container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.1fr",
              gap: "60px",
              alignItems: "start",
            }}
          >
            <div>
              <div className="section-tag">Aanvraag</div>
              <h2 className="section-h">Stuur ons je aanvraag</h2>
              <p
                style={{
                  marginTop: "20px",
                  fontSize: "16px",
                  lineHeight: 1.7,
                  color: "var(--tekst)",
                  maxWidth: "44ch",
                }}
              >
                Eten en drinken regel je zelf, zo houd je het persoonlijk en
                past het bij jouw gelegenheid. We denken graag met je mee als
                je inspiratie nodig hebt: lokale catering, slager, bakker, het
                kan allemaal in de buurt.
              </p>
              <p
                style={{
                  marginTop: "16px",
                  fontSize: "14px",
                  color: "var(--tekst-grijs)",
                }}
              >
                We reageren meestal binnen een dag op je aanvraag.
              </p>
            </div>

            <form
              action="mailto:info@campingdehinde.nl"
              method="post"
              encType="text/plain"
              style={{
                background: "var(--creme)",
                borderRadius: "22px",
                padding: "32px",
                border: "1px solid var(--rand)",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "13px", fontWeight: 600, color: "var(--tekst-grijs)", letterSpacing: ".04em", textTransform: "uppercase" }}>
                Naam
                <input
                  type="text"
                  name="naam"
                  required
                  style={{
                    padding: "12px 14px",
                    borderRadius: "10px",
                    border: "1px solid var(--rand)",
                    background: "white",
                    fontFamily: "inherit",
                    fontSize: "15px",
                    color: "var(--tekst)",
                  }}
                />
              </label>
              <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "13px", fontWeight: 600, color: "var(--tekst-grijs)", letterSpacing: ".04em", textTransform: "uppercase" }}>
                E-mail
                <input
                  type="email"
                  name="email"
                  required
                  style={{
                    padding: "12px 14px",
                    borderRadius: "10px",
                    border: "1px solid var(--rand)",
                    background: "white",
                    fontFamily: "inherit",
                    fontSize: "15px",
                    color: "var(--tekst)",
                  }}
                />
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "13px", fontWeight: 600, color: "var(--tekst-grijs)", letterSpacing: ".04em", textTransform: "uppercase" }}>
                  Telefoon
                  <input
                    type="tel"
                    name="telefoon"
                    style={{
                      padding: "12px 14px",
                      borderRadius: "10px",
                      border: "1px solid var(--rand)",
                      background: "white",
                      fontFamily: "inherit",
                      fontSize: "15px",
                      color: "var(--tekst)",
                    }}
                  />
                </label>
                <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "13px", fontWeight: 600, color: "var(--tekst-grijs)", letterSpacing: ".04em", textTransform: "uppercase" }}>
                  Datum
                  <input
                    type="date"
                    name="datum"
                    style={{
                      padding: "12px 14px",
                      borderRadius: "10px",
                      border: "1px solid var(--rand)",
                      background: "white",
                      fontFamily: "inherit",
                      fontSize: "15px",
                      color: "var(--tekst)",
                    }}
                  />
                </label>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "13px", fontWeight: 600, color: "var(--tekst-grijs)", letterSpacing: ".04em", textTransform: "uppercase" }}>
                  Aantal personen
                  <input
                    type="number"
                    name="aantal"
                    min={1}
                    max={50}
                    style={{
                      padding: "12px 14px",
                      borderRadius: "10px",
                      border: "1px solid var(--rand)",
                      background: "white",
                      fontFamily: "inherit",
                      fontSize: "15px",
                      color: "var(--tekst)",
                    }}
                  />
                </label>
                <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "13px", fontWeight: 600, color: "var(--tekst-grijs)", letterSpacing: ".04em", textTransform: "uppercase" }}>
                  Type gelegenheid
                  <select
                    name="type"
                    style={{
                      padding: "12px 14px",
                      borderRadius: "10px",
                      border: "1px solid var(--rand)",
                      background: "white",
                      fontFamily: "inherit",
                      fontSize: "15px",
                      color: "var(--tekst)",
                    }}
                  >
                    <option>Verjaardag</option>
                    <option>Reünie</option>
                    <option>Bruiloft</option>
                    <option>Vergadering</option>
                    <option>Workshop</option>
                    <option>Anders</option>
                  </select>
                </label>
              </div>
              <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "13px", fontWeight: 600, color: "var(--tekst-grijs)", letterSpacing: ".04em", textTransform: "uppercase" }}>
                Vraag of opmerking
                <textarea
                  name="bericht"
                  rows={4}
                  style={{
                    padding: "12px 14px",
                    borderRadius: "10px",
                    border: "1px solid var(--rand)",
                    background: "white",
                    fontFamily: "inherit",
                    fontSize: "15px",
                    color: "var(--tekst)",
                    resize: "vertical",
                  }}
                />
              </label>
              <button
                type="submit"
                className="design-btn btn-paars"
                style={{ justifyContent: "center", marginTop: "6px" }}
              >
                Stuur aanvraag
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 8. CTA */}
      <section className="cta-strip">
        <div className="design-container cta-row">
          <h3>Liever even bellen of mailen?</h3>
          <div className="actions">
            <a
              href="mailto:info@campingdehinde.nl?subject=Aanvraag%20De%20Stalloon"
              className="design-btn btn-paars"
            >
              Stuur een aanvraag
            </a>
            <a href="tel:0321317669" className="design-btn btn-outline">
              Bel ons: 0321-317669
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
