import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Plattegrond Boerderijcamping De Hinde | Indeling kampeerveld Dronten",
  description:
    "Bekijk de plattegrond van Boerderijcamping De Hinde met alle kampeerplekken, accommodaties en faciliteiten.",
};

const favorieten = [
  {
    name: "Plek 7",
    body: "In trek bij vroege vogels: hij vangt de eerste ochtendzon.",
  },
  {
    name: "Plek 14",
    body: "Het verst van de weg, voor wie écht stilte wil.",
  },
  {
    name: "Plek 19",
    body: "Het meest privé, schuin tegen de bossingel.",
  },
];

export default function PlattegrondPage() {
  return (
    <>
      {/* Hero */}
      <section className="design-section" style={{ background: "var(--creme)" }}>
        <div className="design-container">
          <div className="max-w-3xl">
            <div className="section-tag">Plattegrond</div>
            <h1 className="section-h mt-4">Zo ziet onze camping eruit</h1>
            <p className="mt-6 text-lg leading-relaxed text-tekst-grijs md:text-xl">
              Op de plattegrond zie je in één oogopslag waar de kampeerplekken
              liggen, waar de safaritenten staan, en waar je het sanitairgebouw
              en de speelplekken vindt.
            </p>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="design-section bg-wit">
        <div className="design-container">
          <div className="mx-auto max-w-3xl text-base leading-relaxed text-tekst-grijs md:text-lg">
            <p>
              Bij het boeken kun je een voorkeur opgeven voor een specifieke
              plek, dan reserveren we hem als hij vrij is.
            </p>
          </div>

          <div
            className="mt-12 rounded-card border border-rand-zacht bg-creme"
            style={{
              aspectRatio: "16/9",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              padding: "32px",
            }}
          >
            <div>
              <div
                style={{
                  color: "var(--paars-primair)",
                  fontFamily: "var(--serif)",
                  fontStyle: "italic",
                  fontSize: "1.5rem",
                }}
              >
                Plattegrond komt hier
              </div>
              <p className="mt-3 text-base leading-relaxed text-tekst-grijs">
                Bekijk de interactieve plattegrond op{" "}
                <Link href="/plattegrond" className="btn-link" style={{ display: "inline" }}>
                  /plattegrond
                </Link>
                .
              </p>
              <div className="mt-6">
                <Link href="/plattegrond" className="design-btn btn-outline">
                  Open interactieve plattegrond
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Favorieten */}
      <section className="design-section" style={{ background: "var(--creme)" }}>
        <div className="design-container">
          <div className="section-head-row mb-12">
            <div>
              <div className="section-tag">Onze favorieten</div>
              <h2 className="section-h">Drie plekken die altijd lukken</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {favorieten.map((f) => (
              <div key={f.name} className="rounded-card border border-rand-zacht bg-wit p-8">
                <div
                  style={{
                    fontFamily: "var(--hand)",
                    color: "var(--oranje)",
                    fontWeight: 700,
                    fontSize: "1.25rem",
                  }}
                >
                  {f.name}
                </div>
                <p className="mt-3 text-base leading-relaxed text-tekst-grijs">
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-strip">
        <div className="design-container">
          <div className="cta-row">
            <h3 className="text-2xl text-paars-primair md:text-3xl">
              Bekijk beschikbaarheid
            </h3>
            <div className="flex flex-wrap gap-3">
              <Link href="/boeken" className="design-btn btn-paars">
                Check beschikbaarheid
              </Link>
              <Link href="/plattegrond" className="design-btn btn-outline">
                Interactieve plattegrond
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
