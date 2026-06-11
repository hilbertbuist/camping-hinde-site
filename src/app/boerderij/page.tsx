import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Over De Hinde · Drie generaties boer in Dronten",
  description:
    "René en Dora vertellen het verhaal van Boerderijcamping De Hinde. Drie generaties op dezelfde grond, akkerbouw, natuurbeheer en sinds 2010 ook camping.",
};

const photos = [
  {
    src: "/images/photos/rene-en-dora-eigenaren-bij-de-hinde-bord.jpg",
    alt: "René en Dora bij het bord van De Hinde",
  },
  {
    src: "/images/photos/boer-rene-met-blije-jongen-op-rode-tractor.jpg",
    alt: "Boer René met blije jongen op rode tractor",
  },
  {
    src: "/images/photos/koe-safari-met-tractor-langs-koeien.jpg",
    alt: "Koe-safari met de tractor langs de koeien",
  },
  {
    src: "/images/photos/boerderijwinkeltje-met-streekproducten-en-drankjes.jpg",
    alt: "Boerderijwinkeltje met streekproducten",
  },
  {
    src: "/images/photos/kinderen-met-shetlandpony-voor-boerderij.jpg",
    alt: "Kinderen met shetlandpony voor de boerderij",
  },
  {
    src: "/images/photos/panorama-camping-met-spelende-kinderen-en-tenten.jpg",
    alt: "Panorama van de camping met spelende kinderen en tenten",
  },
];

export default function BoerderijPage() {
  return (
    <>
      {/* 1. Hero */}
      <section
        className="design-section"
        style={{ background: "var(--creme)" }}
      >
        <div className="design-container">
          <div style={{ maxWidth: "780px" }}>
            <div className="section-tag">Ons verhaal</div>
            <h1 className="section-h">Drie generaties op dezelfde grond</h1>
            <p
              style={{
                marginTop: "24px",
                fontSize: "19px",
                lineHeight: 1.65,
                color: "var(--tekst-grijs)",
                maxWidth: "60ch",
              }}
            >
              Hoe een akkerbouwbedrijf in Dronten een boerderijcamping werd, en
              waarom we daar nog elke dag blij mee zijn.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Hoofdtekst */}
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
              gap: "28px",
            }}
          >
            <p>
              <strong>Het begon met opa.</strong> In de jaren zestig kwam mijn
              opa naar Dronten, toen Flevoland nog vers uit het water was. Hij
              begon hier met aardappels, granen en uien. Een schuur, een paar
              koeien voor de melk, en de zekerheid dat alles wat je in deze
              nieuwe grond stak, ook iets zou opleveren.
            </p>
            <p>
              <strong>Mijn vader nam over.</strong> In de jaren tachtig
              schaalde het bedrijf op zoals dat in Flevoland gebruikelijk werd.
              Het was een gemengd bedrijf: akkerbouw plus zo&apos;n vijfendertig
              melkkoeien, voornamelijk Groningse Blaarkoppen, met daarbij het
              jongvee. De Stalloon (waar je nu feestjes kunt vieren) was toen
              gewoon de koeienstal.
            </p>
            <p>
              <strong>In 2010 waren wij aan de beurt.</strong> Dora en ik
              hadden plannen die net iets anders waren dan die van mijn vader.
              We wilden de boerderij voortzetten, maar er ook iets meer mee
              doen. Iets delen. Zo kwam de camping erbij. Eerst tien plekken,
              daarna meer, nu negentien plus drie safaritenten en twee hutten.
            </p>
            <p>
              <strong>De boerderij van nu.</strong> Naast de akkerbouw doen we
              sinds een paar jaar aan natuurbeheer aan de overkant van de weg.
              Een stuk land waar onze kleinschalige veehouderij rondloopt, in
              een natuurgebied dat wij beheren. De dieren grazen er in alle
              rust, in hun eigen tempo. Op den duur worden ze gebruikt voor
              vlees in ons campingwinkeltje. Korter kan een keten niet zijn.
            </p>
            <p>
              <strong>Wat we hier doen, doen we met ons drieën.</strong> René,
              Dora, en in het hoogseizoen vaak nog familie of een hulp uit het
              dorp. Alles draait om persoonlijk contact, een telefoonnummer dat
              altijd opgenomen wordt, en gasten die vaak terugkomen omdat ze
              het hier net zo voelen als wij.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Quote-blok (paars-donker, full-bleed) */}
      <section className="exp design-section">
        <div className="design-container">
          <div style={{ maxWidth: "880px", margin: "0 auto", textAlign: "center" }}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
              style={{
                width: "44px",
                height: "44px",
                color: "var(--oranje)",
                marginBottom: "20px",
              }}
            >
              <path d="M3 21c0-5 3-9 8-9M13 21c0-5 3-9 8-9M3 12V7a2 2 0 0 1 2-2h4v7H3zM13 12V7a2 2 0 0 1 2-2h4v7h-6z" />
            </svg>
            <p
              style={{
                fontFamily: "var(--serif)",
                fontStyle: "italic",
                fontWeight: 500,
                fontSize: "clamp(26px, 3vw, 36px)",
                lineHeight: 1.3,
                color: "white",
                marginBottom: "24px",
                textWrap: "balance",
              }}
            >
              &quot;We zeggen weleens: het is geen camping met een boerderij
              ernaast, het is een boerderij met een camping op een hoekje. Dat
              verschil voel je.&quot;
            </p>
            <div
              style={{
                fontFamily: "var(--hand)",
                fontSize: "22px",
                color: "var(--oranje)",
              }}
            >
              — René Buist
            </div>
          </div>
        </div>
      </section>

      {/* 4. Foto-strook */}
      <section
        className="design-section"
        style={{ background: "var(--wit)" }}
      >
        <div className="design-container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "18px",
            }}
          >
            {photos.map((p) => (
              <div
                key={p.src}
                style={{
                  borderRadius: "18px",
                  overflow: "hidden",
                  aspectRatio: "4 / 3",
                  boxShadow: "0 4px 14px rgba(0,0,0,.06)",
                }}
              >
                <img
                  src={p.src}
                  alt={p.alt}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Aangesloten bij */}
      <section
        className="design-section"
        style={{ background: "var(--creme)", paddingTop: "60px", paddingBottom: "60px" }}
      >
        <div className="design-container" style={{ textAlign: "center" }}>
          <div className="section-tag" style={{ justifyContent: "center" }}>
            Aangesloten bij
          </div>
          <div
            style={{
              marginTop: "24px",
              display: "flex",
              gap: "14px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href="https://www.inhetgroen.nl"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "white",
                padding: "10px 16px",
                borderRadius: 10,
                display: "inline-block",
                boxShadow: "0 4px 12px rgba(0,0,0,.06)",
              }}
              aria-label="In het Groen — onze vakorganisatie"
            >
              <img
                src="/in-het-groen-logo.png"
                alt="In het Groen"
                style={{ display: "block", height: 40, width: "auto" }}
              />
            </a>
            <a
              href="https://www.vodatent.com"
              target="_blank"
              rel="noopener noreferrer"
              className="partner-tag"
              style={{
                color: "var(--paars)",
                borderColor: "rgba(94,75,138,.25)",
                background: "white",
                textDecoration: "none",
              }}
            >
              Vodatent
            </a>
          </div>
        </div>
      </section>

      {/* 6. CTA-strip */}
      <section className="cta-strip">
        <div className="design-container cta-row">
          <h3>Kom het zelf zien</h3>
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
              Boek je verblijf
            </Link>
            <Link href="/boerderij/dieren" className="design-btn btn-outline">
              Bekijk de dieren
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
