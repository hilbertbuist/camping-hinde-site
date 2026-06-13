import type { Metadata } from "next";
import Link from "next/link";
import { accommodations } from "@/lib/content/accommodations";

export const metadata: Metadata = {
  title: "Accommodaties huren | Safaritent, Hut of Lodge bij De Hinde Dronten",
  description:
    "Vier soorten verhuuraccommodaties bij Boerderijcamping De Hinde: drie safaritenten, een Duolodge voor twee, de Hindehut en de Hooiberghut. Voor elk wat anders.",
  alternates: { canonical: "/verblijf" },
};

function ArrowRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

const compareRows: { label: string; values: [string, string, string, string] }[] = [
  { label: "Personen", values: ["tot 6", "2", "tot 4", "tot 4"] },
  { label: "Eigen toilet", values: ["ja", "nee", "nee", "ja"] },
  { label: "Keuken", values: ["volledig", "klein", "volledig", "volledig"] },
  { label: "Veranda", values: ["ja", "ja", "ja", "ja"] },
  { label: "Houtkachel", values: ["nee", "nee", "nee", "ja"] },
  { label: "Linnen verplicht", values: ["ja", "ja", "ja", "ja"] },
  { label: "Huisdieren", values: ["nee", "nee", "nee", "nee"] },
  { label: "Vanaf prijs/nacht", values: ["€95", "€65", "€75", "€85"] },
];

export default function VerblijfPage() {
  return (
    <>
      {/* 1. Hero */}
      <section className="design-section" style={{ background: "var(--creme)" }}>
        <div className="design-container">
          <div className="section-head-row">
            <div>
              <div className="section-tag">Accommodaties</div>
              <h1 className="section-h">Vier manieren om bij ons te slapen</h1>
            </div>
            <p style={{ color: "var(--tekst-grijs)", maxWidth: 520, fontSize: 19, lineHeight: 1.6 }}>
              Van een complete safaritent tot een knus houten huisje, voor stellen of voor het hele gezin.
            </p>
          </div>
          <p style={{ marginTop: 28, maxWidth: 820, fontSize: 18, lineHeight: 1.7, color: "var(--tekst)" }}>
            Op De Hinde houden we het overzichtelijk. Naast onze kampeerplekken hebben we twee grote safaritenten, een kleinere Duolodge voor twee personen, en twee houten hutten met elk hun eigen sfeer. Ruimte voor iedereen, en voor elk type vakantieganger zijn eigen plek met het juiste uitzicht.
          </p>
        </div>
      </section>

      {/* 2. Comparison table */}
      <section className="design-section" style={{ background: "var(--wit)", paddingTop: 0 }}>
        <div className="design-container">
          <div style={{ marginBottom: 28 }}>
            <div className="section-tag">Vergelijken</div>
            <h2 className="section-h">Welke past bij jou?</h2>
          </div>
          <div
            style={{
              background: "var(--wit)",
              border: "1px solid var(--rand)",
              borderRadius: 20,
              overflow: "auto",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", minWidth: 720 }}>
              <thead style={{ background: "var(--creme)" }}>
                <tr>
                  <th style={{ padding: "16px 20px", color: "var(--tekst-grijs)", fontSize: 12, letterSpacing: 1, textTransform: "uppercase" }}></th>
                  {accommodations.map((a) => (
                    <th
                      key={a.slug}
                      style={{
                        padding: "16px 20px",
                        fontFamily: "var(--serif)",
                        fontStyle: "italic",
                        color: "var(--paars)",
                        fontSize: 20,
                      }}
                    >
                      <Link href={`/verblijf/${a.slug}`}>{a.name}</Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row) => (
                  <tr key={row.label} style={{ borderTop: "1px solid var(--rand)" }}>
                    <td style={{ padding: "14px 20px", color: "var(--tekst-grijs)", fontWeight: 600 }}>
                      {row.label}
                    </td>
                    {row.values.map((v, i) => (
                      <td key={i} style={{ padding: "14px 20px", color: "var(--tekst)" }}>
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 3. Accommodation cards */}
      <section className="design-section" style={{ background: "var(--creme)", paddingTop: 0 }}>
        <div className="design-container">
          <div className="acco-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
            {accommodations.map((a) => (
              <article key={a.slug} className="acco-card">
                <div
                  className="acco-img"
                  style={{ backgroundImage: `url(${a.heroImage})` }}
                >
                  {a.badge ? (
                    <div
                      className={`acco-badge${a.badgeStyle === "popular" ? " acco-wiggle" : ""}`}
                    >
                      {a.badge}
                    </div>
                  ) : null}
                </div>
                <div className="acco-body">
                  <h3>{a.name}</h3>
                  <p>{a.shortDescription}</p>
                  <div className="acco-foot">
                    <div className="acco-price">
                      vanaf <strong>€{a.priceFrom}</strong> {a.priceUnit}
                    </div>
                    <Link href={`/verblijf/${a.slug}`} className="btn-link">
                      Bekijk {a.shortName}
                      <ArrowRight />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CTA */}
      <section className="design-section" style={{ background: "var(--paars-donker)", color: "white" }}>
        <div className="design-container" style={{ display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div className="section-tag" style={{ color: "var(--oranje)" }}>Klaar om te boeken?</div>
            <h2 className="section-h" style={{ color: "white" }}>Kies je plek op De Hinde</h2>
          </div>
          <Link href="/boeken" className="design-btn btn-groen">
            Boek nu
            <ArrowRight />
          </Link>
        </div>
      </section>
    </>
  );
}
