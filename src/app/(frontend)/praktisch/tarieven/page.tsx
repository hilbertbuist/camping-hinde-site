import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tarieven 2026 | Boerderijcamping De Hinde Dronten",
  description:
    "Onze tarieven voor kampeerplekken, safaritent, Duolodge, Hindehut en Hooiberghut. Geen verborgen kosten, toeristenbelasting apart vermeld.",
};

type Row = { period: string; perNacht: string; perWeek?: string };

type Tariff = {
  title: string;
  rows: Row[];
  extras: string[];
};

const tariffs: Tariff[] = [
  {
    title: "Kampeerplek",
    rows: [
      { period: "Laagseizoen (apr-jun, sep-okt)", perNacht: "vanaf €24" },
      { period: "Middenseizoen (juni, augustus)", perNacht: "vanaf €28" },
      { period: "Hoogseizoen (juli)", perNacht: "vanaf €32" },
    ],
    extras: [
      "Inclusief 2 personen, water, milieuheffing, gebruik van alle voorzieningen",
      "Toeristenbelasting: €1,75 p.p.p.n.",
      "Extra persoon: €4 p.p.p.n.",
      "Kind 4-12 jaar: €2,50 p.p.p.n.",
      "Hond: gratis (max. 1 per plek, aangelijnd)",
      "Bezoek: €2 p.p.p.d.",
      "Extra bijzettentje: €0,90 p.n.",
      "Uitbreiding stroom 8A/10A: €2 per nacht",
    ],
  },
  {
    title: "Safaritent",
    rows: [
      { period: "Laagseizoen (apr-jun, sep-okt)", perNacht: "vanaf €95", perWeek: "vanaf €595" },
      { period: "Middenseizoen (juni, augustus)", perNacht: "vanaf €115", perWeek: "vanaf €725" },
      { period: "Hoogseizoen (juli)", perNacht: "vanaf €145", perWeek: "vanaf €925" },
    ],
    extras: [
      "Per persoon (incl. toeristenbelasting): €3,70 p.p.p.d.",
      "Linnenpakket (verplicht): €10 p.p.",
      "Optioneel handdoekenpakket: €4 p.p.",
      "Kinderpakket (stoel + bedje): €10 p.k.p.n.",
      "Gas, water, elektra, eindschoonmaak en WiFi inbegrepen",
      "Niet roken, geen huisdieren",
    ],
  },
  {
    title: "Duolodge",
    rows: [
      { period: "Laagseizoen", perNacht: "vanaf €65" },
      { period: "Middenseizoen", perNacht: "vanaf €75" },
      { period: "Hoogseizoen", perNacht: "vanaf €85" },
    ],
    extras: [
      "Linnenpakket (verplicht): €10 p.p.",
      "Toeristenbelasting: €1,75 p.p.p.n.",
      "Niet roken, geen huisdieren",
    ],
  },
  {
    title: "Hindehut & Hooiberghut",
    rows: [
      { period: "Laagseizoen", perNacht: "vanaf €75", perWeek: "vanaf €475" },
      { period: "Middenseizoen", perNacht: "vanaf €95", perWeek: "vanaf €595" },
      { period: "Hoogseizoen", perNacht: "vanaf €115", perWeek: "vanaf €725" },
    ],
    extras: [
      "Hooiberghut: tarief +€10 per nacht t.o.v. Hindehut (eigen sanitair en houtkachel)",
      "Linnenpakket (verplicht): €10 p.p.",
      "Toeristenbelasting: €1,75 p.p.p.n.",
      "Optioneel handdoekenpakket: €4 p.p.",
      "Hout voor de kachel (Hooiberghut): €17 per kruiwagen",
      "Gas, water, elektra, eindschoonmaak en WiFi inbegrepen",
    ],
  },
];

export default function TarievenPage() {
  return (
    <>
      {/* Hero */}
      <section className="design-section" style={{ background: "var(--creme)" }}>
        <div className="design-container">
          <div className="max-w-3xl">
            <div className="section-tag">Tarieven 2026</div>
            <h1 className="section-h mt-4">Eerlijke prijzen, duidelijke afspraken</h1>
            <p className="mt-6 text-lg leading-relaxed text-tekst-grijs md:text-xl">
              Geen verborgen kosten. Toeristenbelasting is een gemeentelijke
              heffing en staat apart vermeld.
            </p>
          </div>
        </div>
      </section>

      {/* Tariff sections */}
      <section className="design-section bg-wit">
        <div className="design-container">
          <div className="space-y-16">
            {tariffs.map((t) => (
              <div key={t.title}>
                <h2 className="section-h">{t.title}</h2>
                <div className="mt-6 overflow-hidden rounded-card border border-rand-zacht bg-wit">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-creme">
                        <tr className="text-xs uppercase tracking-wider text-tekst-donker">
                          <th className="px-5 py-4 font-semibold">Periode</th>
                          <th className="px-5 py-4 font-semibold">Per nacht</th>
                          {t.rows.some((r) => r.perWeek) && (
                            <th className="px-5 py-4 font-semibold">Per week</th>
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {t.rows.map((r) => (
                          <tr
                            key={r.period}
                            className="border-t border-rand-zacht text-tekst-donker"
                          >
                            <td className="px-5 py-4 font-medium">{r.period}</td>
                            <td className="px-5 py-4 whitespace-nowrap text-paars-primair font-medium">
                              {r.perNacht}
                            </td>
                            {t.rows.some((rr) => rr.perWeek) && (
                              <td className="px-5 py-4 whitespace-nowrap text-paars-primair font-medium">
                                {r.perWeek ?? "—"}
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <ul className="mt-6 grid grid-cols-1 gap-2 text-base text-tekst-grijs md:grid-cols-2">
                  {t.extras.map((e) => (
                    <li key={e} style={{ paddingLeft: "18px", position: "relative" }}>
                      <span style={{ position: "absolute", left: 0, top: "8px", width: "8px", height: "8px", borderRadius: "999px", background: "var(--oranje)", display: "block" }} />
                      {e}
                    </li>
                  ))}
                </ul>
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
              Klaar om te boeken?
            </h3>
            <div className="flex flex-wrap gap-3">
              <Link href="/boeken" className="design-btn btn-paars">
                Direct boeken
              </Link>
              <Link href="/contact" className="design-btn btn-outline">
                Stel je vraag
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
