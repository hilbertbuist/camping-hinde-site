import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  accommodations,
  getAccommodation,
} from "@/lib/content/accommodations";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return accommodations.map((a) => ({ slug: a.slug }));
}

const META: Record<string, { title: string; description: string }> = {
  safaritent: {
    title: "Safaritent huren in Dronten | Glamping bij Boerderijcamping De Hinde",
    description:
      "Glampen in een complete safaritent met houten details, eigen toilet, twee slaapcabines en complete keuken. Voor maximaal 6 personen, vanaf €95 per nacht.",
  },
  duolodge: {
    title: "Duolodge huren in Dronten | Kleine safaritent voor 2 personen | De Hinde",
    description:
      "Knusse safaritent voor twee personen bij De Hinde. Twee eenpersoonsbedden, eigen veranda, ideaal voor doorreizigers en stellen. Glamping vanaf €65 per nacht.",
  },
  hindehut: {
    title: "Hindehut huren in Dronten | Trekkershut bij Boerderijcamping De Hinde",
    description:
      "Knusse houten Hindehut naast het campingveld. Twee slaapvertrekken, eigen keukenblok, veranda met uitzicht op de bossingel. Voor maximaal 4 personen.",
  },
  hooiberghut: {
    title: "Hooiberghut huren | Slapen in een omgebouwde hooiberg op De Hinde",
    description:
      "Slapen in een echte hooiberg op de boerderij. Authentiek dakconstructie, eigen sanitair en houtkachel. Voor 4 personen, een unieke ervaring vlakbij het Veluwemeer.",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const m = META[slug];
  if (!m) return { title: "Accommodatie niet gevonden — De Hinde" };
  return { title: m.title, description: m.description };
}

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
    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 10 }}>
      {items.map((it) => (
        <li key={it} style={{ display: "flex", gap: 10, alignItems: "flex-start", color: "var(--tekst)" }}>
          <Check />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

function ArrowRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

export default async function AccommodationPage({ params }: Props) {
  const { slug } = await params;
  const a = getAccommodation(slug);
  if (!a) notFound();

  const heroTag =
    a.slug === "safaritent" ? "Safaritent" :
    a.slug === "duolodge" ? "Duolodge" :
    a.slug === "hindehut" ? "Hindehut" :
    "Hooiberghut";

  const heroH1 =
    a.slug === "safaritent" ? "Glamping zoals het hoort" :
    a.slug === "duolodge" ? "Klein, knus en compleet" :
    a.slug === "hindehut" ? "Een knus houten huisje aan het campingveld" :
    "Slapen onder een hooiberg-dak";

  const heroSub =
    a.slug === "safaritent" ? "Echt kamperen, maar dan met een echt bed, een keuken die werkt en een veranda waar je 's avonds blijft hangen." :
    a.slug === "duolodge" ? "Onze kleinere safaritent voor twee personen, ideaal voor doorreizigers of een romantische ontsnapping." :
    a.slug === "hindehut" ? "Compleet ingericht, twee slaapvertrekken, eigen keukenblok en veranda met uitzicht op de bossingel." :
    "Een ouderwetse plek met moderne luxe, voor wie iets bijzonders wil.";

  return (
    <>
      {/* Hero */}
      <section
        style={{
          position: "relative",
          minHeight: "62vh",
          display: "flex",
          alignItems: "flex-end",
          backgroundImage: `linear-gradient(180deg, rgba(61,20,72,0.30) 0%, rgba(61,20,72,0.65) 100%), url(${a.heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
        }}
      >
        <div className="design-container" style={{ paddingTop: 120, paddingBottom: 80 }}>
          <div className="section-tag" style={{ color: "var(--oranje)" }}>{heroTag}</div>
          <h1 className="section-h" style={{ color: "white" }}>{heroH1}</h1>
          <p style={{ marginTop: 18, maxWidth: 640, fontSize: 19, lineHeight: 1.5, color: "rgba(255,255,255,0.92)" }}>
            {heroSub}
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="design-section" style={{ background: "var(--creme)" }}>
        <div className="design-container" style={{ maxWidth: 880 }}>
          {a.description.split("\n\n").map((p, i) => (
            <p key={i} style={{ fontSize: 19, lineHeight: 1.75, color: "var(--tekst)", marginBottom: 18 }}>
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="design-section" style={{ background: "var(--wit)", paddingTop: 0 }}>
        <div className="design-container">
          <div style={{ marginBottom: 24 }}>
            <div className="section-tag">Beelden</div>
            <h2 className="section-h">Een kijkje in de {a.name}</h2>
          </div>
          <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
            {a.gallery.map((src, i) => (
              <div
                key={`${src}-${i}`}
                style={{
                  backgroundImage: `url(${src})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: 18,
                  aspectRatio: "4 / 3",
                  border: "1px solid var(--rand)",
                }}
                aria-label={`${a.name} foto ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Voorzieningen */}
      <section className="design-section" style={{ background: "var(--creme)" }}>
        <div className="design-container">
          <div style={{ marginBottom: 30 }}>
            <div className="section-tag">Voorzieningen</div>
            <h2 className="section-h">Wat is er aanwezig</h2>
          </div>
          <div style={{ display: "grid", gap: 36, gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
            {a.voorzieningenBinnen && a.voorzieningenBinnen.length > 0 && (
              <div>
                <h3 style={{ color: "var(--paars)", fontSize: 22, marginBottom: 14 }}>Binnen</h3>
                <CheckList items={a.voorzieningenBinnen} />
              </div>
            )}
            {a.voorzieningenBuiten && a.voorzieningenBuiten.length > 0 && (
              <div>
                <h3 style={{ color: "var(--paars)", fontSize: 22, marginBottom: 14 }}>Buiten</h3>
                <CheckList items={a.voorzieningenBuiten} />
              </div>
            )}
            {a.voorzieningenSanitair && a.voorzieningenSanitair.length > 0 && (
              <div>
                <h3 style={{ color: "var(--paars)", fontSize: 22, marginBottom: 14 }}>Sanitair</h3>
                <CheckList items={a.voorzieningenSanitair} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Tarieven */}
      {a.tarieven && a.tarieven.length > 0 && (
        <section className="design-section" style={{ background: "var(--wit)" }}>
          <div className="design-container">
            <div style={{ marginBottom: 24 }}>
              <div className="section-tag">Tarieven 2026</div>
              <h2 className="section-h">Prijzen per seizoen</h2>
            </div>
            <div
              style={{
                background: "var(--wit)",
                border: "1px solid var(--rand)",
                borderRadius: 20,
                overflow: "auto",
              }}
            >
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", minWidth: 520 }}>
                <thead style={{ background: "var(--creme)" }}>
                  <tr>
                    <th style={{ padding: "16px 24px", fontFamily: "var(--serif)", fontStyle: "italic", color: "var(--paars)" }}>Periode</th>
                    <th style={{ padding: "16px 24px", fontFamily: "var(--serif)", fontStyle: "italic", color: "var(--paars)" }}>Per nacht</th>
                    {a.tarieven.some((t) => t.perWeek) && (
                      <th style={{ padding: "16px 24px", fontFamily: "var(--serif)", fontStyle: "italic", color: "var(--paars)" }}>Per week</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {a.tarieven.map((t) => (
                    <tr key={t.periode} style={{ borderTop: "1px solid var(--rand)" }}>
                      <td style={{ padding: "14px 24px", color: "var(--tekst)" }}>{t.periode}</td>
                      <td style={{ padding: "14px 24px", color: "var(--tekst)" }}>{t.perNacht}</td>
                      {a.tarieven!.some((x) => x.perWeek) && (
                        <td style={{ padding: "14px 24px", color: "var(--tekst)" }}>{t.perWeek ?? "—"}</td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ marginTop: 36, display: "grid", gap: 32, gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
              {a.bijkomendeKosten && a.bijkomendeKosten.length > 0 && (
                <div>
                  <h3 style={{ color: "var(--paars)", fontSize: 22, marginBottom: 14 }}>Bijkomende kosten</h3>
                  <CheckList items={a.bijkomendeKosten} />
                </div>
              )}
              {a.optioneel && a.optioneel.length > 0 && (
                <div>
                  <h3 style={{ color: "var(--paars)", fontSize: 22, marginBottom: 14 }}>Optioneel</h3>
                  <CheckList items={a.optioneel} />
                </div>
              )}
              {a.inbegrepen && a.inbegrepen.length > 0 && (
                <div>
                  <h3 style={{ color: "var(--paars)", fontSize: 22, marginBottom: 14 }}>Standaard inbegrepen</h3>
                  <CheckList items={a.inbegrepen} />
                </div>
              )}
              {a.voorwaarden && a.voorwaarden.length > 0 && (
                <div>
                  <h3 style={{ color: "var(--paars)", fontSize: 22, marginBottom: 14 }}>Voorwaarden</h3>
                  <CheckList items={a.voorwaarden} />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Sfeer-blok */}
      {a.sfeer && (
        <section className="design-section" style={{ background: "var(--creme)" }}>
          <div className="design-container" style={{ maxWidth: 800, textAlign: "center" }}>
            <p
              style={{
                fontFamily: "var(--serif)",
                fontStyle: "italic",
                fontSize: 26,
                lineHeight: 1.5,
                color: "var(--paars)",
              }}
            >
              &ldquo;{a.sfeer}&rdquo;
            </p>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="design-section" style={{ background: "var(--paars-donker)", color: "white" }}>
        <div className="design-container" style={{ display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div className="section-tag" style={{ color: "var(--oranje)" }}>Boeken</div>
            <h2 className="section-h" style={{ color: "white" }}>Klaar om te boeken?</h2>
            <p style={{ marginTop: 12, maxWidth: 520, color: "rgba(255,255,255,0.85)", fontSize: 18 }}>
              Kies je data en zie direct of de {a.name} beschikbaar is.
            </p>
          </div>
          <Link href="/boeken" className="design-btn btn-groen">
            Check beschikbaarheid en prijs
            <ArrowRight />
          </Link>
        </div>
      </section>
    </>
  );
}
