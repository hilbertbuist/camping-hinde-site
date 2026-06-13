import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Praktische informatie | Boerderijcamping De Hinde Dronten",
  description:
    "Alles wat je moet weten voor je verblijf bij De Hinde. Verse broodjes, WiFi, sanitair, openingstijden, plattegrond en huisregels.",
};

type Card = {
  title: string;
  body: string;
  href: string;
  icon: React.ReactNode;
};

function IconEuro() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M18 7a6 6 0 1 0 0 10" />
      <path d="M3 11h10" />
      <path d="M3 15h10" />
    </svg>
  );
}
function IconShower() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 4h6a4 4 0 0 1 4 4v2" />
      <path d="M14 10h6" />
      <path d="M8 16v2M12 16v3M16 16v2M10 20v1M14 21v1" />
    </svg>
  );
}
function IconBread() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 12a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v6H4z" />
      <path d="M8 12v6M12 12v6M16 12v6" />
    </svg>
  );
}
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
function IconMap() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M9 3 3 5v16l6-2 6 2 6-2V3l-6 2z" />
      <path d="M9 3v16M15 5v16" />
    </svg>
  );
}
function IconHelp() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 2-2.5 2-2.5 4" />
      <circle cx="12" cy="17" r="0.5" />
    </svg>
  );
}
function IconRules() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
      <path d="M14 3v6h6" />
      <path d="M8 13h8M8 17h6" />
    </svg>
  );
}
function IconClock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}
function ArrowRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden width="18" height="18">
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

const cards: Card[] = [
  {
    title: "Tarieven",
    body: "Eerlijke prijzen voor kamperen en accommodaties.",
    href: "/praktisch/tarieven",
    icon: <IconEuro />,
  },
  {
    title: "Faciliteiten",
    body: "Sanitair, watertappunten, wasruimte en meer.",
    href: "/praktisch/faciliteiten",
    icon: <IconShower />,
  },
  {
    title: "Verse broodjes & winkeltje",
    body: "Bestel voor 19:00, ophalen om half negen.",
    href: "/praktisch/winkel",
    icon: <IconBread />,
  },
  {
    title: "WiFi",
    body: "Gratis over het hele terrein, snel genoeg om te streamen.",
    href: "/praktisch/wifi",
    icon: <IconWifi />,
  },
  {
    title: "Plattegrond",
    body: "Zo zit de camping in elkaar.",
    href: "/praktisch/plattegrond",
    icon: <IconMap />,
  },
  {
    title: "Veelgestelde vragen",
    body: "De vragen die we het vaakst krijgen.",
    href: "/praktisch/faq",
    icon: <IconHelp />,
  },
  {
    title: "Huisregels & voorwaarden",
    body: "Een paar afspraken voor iedereen.",
    href: "/praktisch/huisregels",
    icon: <IconRules />,
  },
  {
    title: "Aankomst & vertrek",
    body: "Inchecken vanaf 15:00, vertrek voor 12:00.",
    href: "/praktisch/aankomst",
    icon: <IconClock />,
  },
];

const infoBlocks = [
  {
    title: "Aankomst en vertrek",
    body: "Aankomst vanaf 15:00 uur. Vertrek voor 12:00 uur. Eerder of later kan, boek dan een extra nacht.",
  },
  {
    title: "Receptie",
    body: "Geen vaste receptietijden, wij wonen ernaast. Bel of app gerust: 06-49535458.",
  },
  {
    title: "Camping geopend",
    body: "Camping: april t/m oktober. Stalloon: hele jaar (m.u.v. januari, februari en schoolvakanties).",
  },
];

export default function PraktischPage() {
  return (
    <>
      {/* Hero */}
      <section className="design-section" style={{ background: "var(--creme)" }}>
        <div className="design-container">
          <div className="max-w-3xl">
            <div className="section-tag">Praktisch</div>
            <h1 className="section-h mt-4">Goed om te weten</h1>
            <p className="mt-6 text-lg leading-relaxed text-tekst-grijs md:text-xl">
              Alles wat je vooraf en tijdens je verblijf wilt weten, op een
              rijtje.
            </p>
          </div>
        </div>
      </section>

      {/* Hub-kaarten */}
      <section className="design-section bg-wit">
        <div className="design-container">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((c) => (
              <Link
                key={c.title}
                href={c.href}
                className="prac-card card-lift"
                style={{ textDecoration: "none" }}
              >
                <span className="prac-icon">{c.icon}</span>
                <div>
                  <h4>{c.title}</h4>
                  <p>{c.body}</p>
                  <span
                    className="btn-link"
                    style={{ marginTop: "12px", display: "inline-flex", alignItems: "center", gap: "6px" }}
                  >
                    Bekijk <ArrowRight />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Korte info-blokken */}
      <section className="design-section" style={{ background: "var(--creme)" }}>
        <div className="design-container">
          <div className="section-head-row mb-12">
            <div>
              <div className="section-tag">In het kort</div>
              <h2 className="section-h">Het belangrijkste, snel</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {infoBlocks.map((b) => (
              <div
                key={b.title}
                className="rounded-card border border-rand-zacht bg-wit p-8"
              >
                <h3 className="text-xl text-paars-primair">{b.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-tekst-grijs">{b.body}</p>
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
                Check beschikbaarheid
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
