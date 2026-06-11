import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Huisregels | Boerderijcamping De Hinde Dronten",
  description:
    "Onze huisregels voor een fijne vakantie bij Boerderijcamping De Hinde. Korte en duidelijke regels voor iedereen.",
};

function IconClock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}
function IconMoon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 13A9 9 0 1 1 11 3a7 7 0 0 0 10 10z" />
    </svg>
  );
}
function IconDog() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 8l-1 6h3l2 6h3l-1-5h4l-1 5h3l2-6h3l-1-6-3 3h-3l-2-2-2 2H8z" />
    </svg>
  );
}
function IconFire() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3s4 4 4 8a4 4 0 0 1-8 0c0-2 1-3 2-4 0 2 2 2 2 4 1-2 0-5 0-8z" />
    </svg>
  );
}
function IconNoSmoke() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="13" width="18" height="4" rx="1" />
      <path d="M16 13V9" />
      <path d="M4 4l16 16" />
    </svg>
  );
}
function IconCar() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 14l2-6h14l2 6v5H3z" />
      <circle cx="7" cy="17" r="1.5" />
      <circle cx="17" cy="17" r="1.5" />
    </svg>
  );
}
function IconAnimal() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="14" r="5" />
      <circle cx="7" cy="8" r="1.5" />
      <circle cx="17" cy="8" r="1.5" />
      <circle cx="5" cy="13" r="1.5" />
      <circle cx="19" cy="13" r="1.5" />
    </svg>
  );
}
function IconTrash() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" />
    </svg>
  );
}

const rules: { icon: React.ReactNode; title: string; items: string[] }[] = [
  {
    icon: <IconClock />,
    title: "Aankomst en vertrek",
    items: [
      "Aankomst vanaf 15:00 uur, vertrek voor 12:00 uur",
      "Eerder of later kan, boek dan een extra nacht",
    ],
  },
  {
    icon: <IconMoon />,
    title: "Rust",
    items: [
      "Tussen 22:00 en 8:00 uur is het stil",
      "Geen luide muziek, generators of feestjes",
      "Op de plek geen muziek waar de buren last van hebben",
    ],
  },
  {
    icon: <IconDog />,
    title: "Honden",
    items: [
      "Op het kampeerveld 1 hond per plek toegestaan",
      "Aangelijnd op het terrein, niet op andere plekken laten lopen",
      "Je ruimt zelf de hondenpoep op (zakjes bij de receptie)",
      "Niet toegestaan in de safaritenten, hutten of De Stalloon",
    ],
  },
  {
    icon: <IconFire />,
    title: "Vuur",
    items: [
      "Open vuur alleen in een vuurkorf",
      "Geen vuur direct op het gras, gebruik een schaal",
      "'s Nachts altijd een blusmiddel bij de hand",
      "Bij droogte/code rood geldt mogelijk een vuurverbod",
    ],
  },
  {
    icon: <IconNoSmoke />,
    title: "Roken",
    items: [
      "Niet roken in de safaritenten, hutten en De Stalloon",
      "Op het kampeerveld wel, peuken in de afvalbak",
    ],
  },
  {
    icon: <IconCar />,
    title: "Auto",
    items: [
      "Eigen auto op je eigen plek",
      "Max. 5 km/u op het terrein",
      "Bezoekers parkeren op de bezoekersparkeerplaats",
    ],
  },
  {
    icon: <IconAnimal />,
    title: "De dieren",
    items: [
      "Geiten, pony's, kippen en konijnen mogen aangeraakt worden, met respect",
      "Geen wit brood voeren, dat is slecht voor ze",
      "Hekjes weer netjes dichtdoen",
    ],
  },
  {
    icon: <IconTrash />,
    title: "Afval",
    items: [
      "Restafval in de containers bij de uitgang",
      "We scheiden papier, plastic en glas",
      "Containers staan duidelijk aangegeven",
    ],
  },
];

export default function HuisregelsPage() {
  return (
    <>
      {/* Hero */}
      <section className="design-section" style={{ background: "var(--creme)" }}>
        <div className="design-container">
          <div className="max-w-3xl">
            <div className="section-tag">Huisregels</div>
            <h1 className="section-h mt-4">Een paar afspraken voor iedereen</h1>
            <p className="mt-6 text-lg leading-relaxed text-tekst-grijs md:text-xl">
              Niet veel, wel duidelijk.
            </p>
          </div>
        </div>
      </section>

      {/* Body intro */}
      <section className="design-section bg-wit">
        <div className="design-container">
          <div className="mx-auto max-w-3xl text-base leading-relaxed text-tekst-grijs md:text-lg">
            <p>
              We houden van een ongedwongen sfeer. Daarom zijn deze afspraken
              kort en duidelijk, zodat iedereen er prettig kan verblijven.
            </p>
          </div>

          {/* Regels grid */}
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {rules.map((r) => (
              <div key={r.title} className="prac-card">
                <span className="prac-icon">{r.icon}</span>
                <div>
                  <h4>{r.title}</h4>
                  <ul className="space-y-1 text-base text-tekst-grijs">
                    {r.items.map((i) => (
                      <li key={i} style={{ paddingLeft: "16px", position: "relative" }}>
                        <span style={{ position: "absolute", left: 0, top: "8px", width: "6px", height: "6px", borderRadius: "999px", background: "var(--oranje)", display: "block" }} />
                        {i}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Algemene voorwaarden */}
      <section className="design-section" style={{ background: "var(--creme)" }}>
        <div className="design-container">
          <div className="mx-auto max-w-3xl rounded-card border border-rand-zacht bg-wit p-8 md:p-10">
            <div className="section-tag">Algemene voorwaarden</div>
            <h2 className="section-h mt-4">Voor de zekerheid</h2>
            <p className="mt-6 text-base leading-relaxed text-tekst-grijs">
              Bij al onze reserveringen zijn de algemene voorwaarden, inclusief
              annuleringsvoorwaarden, van In het Groen van
              toepassing.
            </p>
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
