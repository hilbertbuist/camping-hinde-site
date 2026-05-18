import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Boerderijdieren bij De Hinde · Pony's, kippen, geiten en konijnen",
  description:
    "Op De Hinde wonen pony's, geiten, kippen en konijnen waar je zelf bij mag. Eieren rapen, geiten voeren, het hoort bij vakantie op een echte boerderij.",
};

const dieren = [
  {
    name: "De geiten",
    image: "/images/photos/drie-jongens-uitlaten-van-geit-op-camping.jpg",
    alt: "Drie jongens laten een geit uit op de camping",
    text: "Onze geiten lopen vrij in een afgesloten weide. Ze houden van zacht brood (geen wit!) en zijn gek op aandacht. Vooral de oudste vinden het heerlijk om geaaid te worden. 's Ochtends is het voertijd, kom gerust kijken.",
  },
  {
    name: "De pony's",
    image: "/images/photos/kinderen-met-shetlandpony-voor-boerderij.jpg",
    alt: "Kinderen met een shetlandpony voor de boerderij",
    text: "Onze shetlandpony's zijn rustig, gewend aan veel handen, en gek op wortels. In het hoogseizoen mag je ze borstelen na overleg, en in de zomer organiseren we wekelijks een ponyrit-uurtje voor de kinderen.",
  },
  {
    name: "De kippen",
    image: "/images/photos/boer-en-jongens-met-kalfje-aan-touw.jpg",
    alt: "Op het erf bij de boerderij",
    text: "Onze kippen lopen vrij rond op het erf, dus pas op met je tentopening. Ze leggen het hele jaar door eieren. Eieren rapen mag elke ochtend, mandjes liggen klaar in het campingwinkeltje. Vers en vaak nog warm.",
  },
  {
    name: "De konijnen",
    image: "/images/photos/kind-voert-konijnen-in-knuffelschuur.jpg",
    alt: "Kind voert konijnen in de knuffelschuur",
    text: "Een paar grote konijnen in een ruime ren naast de speeltuin. Ze laten zich aaien door geduldige kinderen, en krijgen op De Hinde alle aandacht die ze verdienen.",
  },
];

const activiteiten = [
  {
    title: "Eieren rapen",
    text: "Elke ochtend, mandje gratis lenen in het campingwinkeltje.",
  },
  {
    title: "Geiten voeren",
    text: "Ochtends en avonds, zacht brood is welkom. Geen wit brood graag.",
  },
  {
    title: "Pony's borstelen",
    text: "Op aanvraag in het hoogseizoen, vraag het ons bij aankomst.",
  },
  {
    title: "Mee op koe-safari",
    text: "René rijdt regelmatig een rondje over het natuurgebied aan de overkant.",
  },
  {
    title: "Helpen in het campingwinkeltje",
    text: "Voor wie wil. Kinderen vinden het prachtig om mee te tellen.",
  },
];

export default function DierenPage() {
  return (
    <>
      {/* 1. Hero */}
      <section
        className="design-section"
        style={{ background: "var(--creme)" }}
      >
        <div className="design-container">
          <div style={{ maxWidth: "780px" }}>
            <div className="section-tag">Op de boerderij</div>
            <h1 className="section-h">De dieren waar je bij mag</h1>
            <p
              style={{
                marginTop: "24px",
                fontSize: "19px",
                lineHeight: 1.65,
                color: "var(--tekst-grijs)",
                maxWidth: "60ch",
              }}
            >
              Onze pony&apos;s, geiten, kippen en konijnen, en gasten die welkom
              zijn om bij te komen.
            </p>
            <p
              style={{
                marginTop: "24px",
                fontSize: "17px",
                lineHeight: 1.75,
                color: "var(--tekst)",
                maxWidth: "65ch",
              }}
            >
              Op De Hinde wonen vier soorten dieren waar je zelf bij mag, mits
              je rustig doet en de hekjes weer netjes dicht laat. Voor kinderen
              is het vaak het grootste avontuur van de vakantie, maar ook ouders
              staan vaak langer bij de geiten dan ze van plan waren.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Dier-kaartjes */}
      <section
        className="design-section"
        style={{ background: "var(--wit)", paddingTop: 0 }}
      >
        <div className="design-container">
          <div
            className="acco-grid"
            style={{ gridTemplateColumns: "repeat(2, 1fr)" }}
          >
            {dieren.map((d) => (
              <article key={d.name} className="acco-card">
                <div
                  className="acco-img"
                  style={{ backgroundImage: `url('${d.image}')` }}
                  role="img"
                  aria-label={d.alt}
                />
                <div className="acco-body">
                  <h3>{d.name}</h3>
                  <p>{d.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Aan de overkant — paars-donker full-bleed met foto */}
      <section className="exp design-section" style={{ padding: 0 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            alignItems: "stretch",
            minHeight: "480px",
          }}
        >
          <div
            style={{
              padding: "80px clamp(24px, 5vw, 72px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              position: "relative",
              zIndex: 2,
            }}
          >
            <div className="section-tag">Aan de overkant</div>
            <h2 className="section-h">Ons natuurgebied</h2>
            <p
              style={{
                marginTop: "24px",
                fontSize: "17px",
                lineHeight: 1.75,
                color: "rgba(255,255,255,.88)",
                maxWidth: "52ch",
              }}
            >
              Aan de overkant van de weg ligt een stuk land waar wij aan
              natuurbeheer doen, en waar onze kleinschalige veehouderij
              rondloopt. Een paar runderen die er in alle rust grazen, in hun
              eigen tempo. Op den duur worden ze gebruikt voor het vlees in ons
              campingwinkeltje. Korter kan een keten niet zijn.
            </p>
          </div>
          <div
            style={{
              backgroundImage:
                "url('/images/photos/koe-safari-met-tractor-langs-koeien.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              minHeight: "320px",
            }}
            role="img"
            aria-label="Koe-safari met de tractor langs de koeien in het natuurgebied"
          />
        </div>
      </section>

      {/* 4. Activiteitenblok */}
      <section
        className="design-section"
        style={{ background: "var(--creme)" }}
      >
        <div className="design-container">
          <div className="section-head-row">
            <div>
              <div className="section-tag">Wat je hier kan doen</div>
              <h2 className="section-h">Vijf manieren om mee te draaien</h2>
            </div>
            <p
              style={{
                color: "var(--tekst-grijs)",
                maxWidth: "420px",
                fontSize: "16px",
              }}
            >
              Klein avontuur, groot effect. Kinderen vinden het vaak het
              hoogtepunt van hun vakantie.
            </p>
          </div>

          <ol
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: "18px",
              maxWidth: "780px",
            }}
          >
            {activiteiten.map((a, i) => (
              <li
                key={a.title}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "22px",
                  background: "var(--wit)",
                  borderRadius: "18px",
                  padding: "22px 26px",
                  border: "1px solid var(--rand)",
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    width: "44px",
                    height: "44px",
                    borderRadius: "999px",
                    background: "var(--paars)",
                    color: "white",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--serif)",
                    fontStyle: "italic",
                    fontWeight: 600,
                    fontSize: "20px",
                  }}
                >
                  {i + 1}
                </span>
                <div>
                  <h3
                    style={{
                      fontFamily: "var(--serif)",
                      fontStyle: "italic",
                      fontWeight: 500,
                      fontSize: "22px",
                      color: "var(--paars)",
                      marginBottom: "4px",
                      lineHeight: 1.2,
                    }}
                  >
                    {a.title}
                  </h3>
                  <p
                    style={{
                      color: "var(--tekst)",
                      fontSize: "15px",
                      lineHeight: 1.6,
                    }}
                  >
                    {a.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5. CTA */}
      <section className="cta-strip">
        <div className="design-container cta-row">
          <h3>Boek je verblijf en kom de dieren ontmoeten</h3>
          <div className="actions">
            <Link href="/boeken" className="design-btn btn-paars">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
              Bekijk beschikbaarheid
            </Link>
            <Link href="/boerderij" className="design-btn btn-outline">
              Lees ons verhaal
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
