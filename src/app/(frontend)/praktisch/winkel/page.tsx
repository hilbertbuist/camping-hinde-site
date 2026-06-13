import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Verse broodjes bestellen | Campingwinkel De Hinde Dronten",
  description:
    "Bestel verse broodjes voor de volgende ochtend en haal ze om 8:30 op in ons campingwinkeltje. Met streekproducten en op den duur ons eigen vlees.",
};

function IconBread() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 12a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v6H4z" />
      <path d="M8 12v6M12 12v6M16 12v6" />
    </svg>
  );
}
function IconEgg() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3c-4 0-7 6-7 11a7 7 0 0 0 14 0c0-5-3-11-7-11z" />
    </svg>
  );
}
function IconStreek() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 10h16l-2 10H6z" />
      <path d="M8 10V6a4 4 0 0 1 8 0v4" />
    </svg>
  );
}
function IconMeat() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M14 4a6 6 0 0 0-6 6v2l-3 3a3 3 0 0 0 4 4l3-3h2a6 6 0 0 0 0-12z" />
    </svg>
  );
}
function IconCart() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="9" cy="20" r="1.5" />
      <circle cx="17" cy="20" r="1.5" />
      <path d="M3 4h2l2.5 12h11l2-8H6.5" />
    </svg>
  );
}

const categories = [
  {
    icon: <IconBread />,
    title: "Brood",
    items: ["Witbrood, bruin, volkoren", "Croissants en harde broodjes", "Krenten- en suikerbrood (op verzoek)"],
  },
  {
    icon: <IconEgg />,
    title: "Eieren",
    items: ["Onze eigen scharreleieren (vaak nog warm)"],
  },
  {
    icon: <IconStreek />,
    title: "Streekproducten",
    items: ["Boerenkaas", "Jam en honing van de buren", "Stroopwafels", "Lokale bieren"],
  },
  {
    icon: <IconMeat />,
    title: "Onze eigen producten",
    items: ["Vlees van onze runderen (binnenkort)", "In pakketten of los"],
  },
  {
    icon: <IconCart />,
    title: "Klein boodschappen",
    items: ["Melk, koffie, suiker", "Frisdrank en water", "BBQ-pakketten in het hoogseizoen"],
  },
];

export default function WinkelPage() {
  return (
    <>
      {/* Hero */}
      <section className="design-section" style={{ background: "var(--creme)" }}>
        <div className="design-container">
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
            <div>
              <div className="section-tag">Verse broodjes & winkel</div>
              <h1 className="section-h mt-4">
                Vers brood, eigen eieren, en straks ons eigen vlees
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-tekst-grijs md:text-xl">
                Bestel een dag van tevoren, haal het op om half negen.
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-card">
              <Image
                src="/images/photos/boerderijwinkeltje-met-streekproducten-en-drankjes.jpg"
                alt="Het boerderijwinkeltje met streekproducten"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="design-section bg-wit">
        <div className="design-container">
          <div className="mx-auto max-w-3xl space-y-6 text-base leading-relaxed text-tekst-grijs md:text-lg">
            <p>
              Nooit meer worstelen met oud brood of eindeloos wachten op
              afbakbroodjes. Bestel je verse broodjes gewoon een dag van
              tevoren in ons campingwinkeltje, en haal ze de volgende ochtend
              op tussen 8:30 en 9:00 uur. Klaar voor ontbijt, terwijl het
              kampvuur nog na-rookt en de eieren nog warm zijn.
            </p>
            <p>
              Ons campingwinkeltje is meer dan alleen een broodjeshoek. Je
              vindt er streekproducten, melk en zuivel, eigen eieren, jam en
              honing van de buren. Op den duur ook ons eigen vlees, van de
              runderen die in het natuurgebied aan de overkant grazen.
            </p>
          </div>
        </div>
      </section>

      {/* Aanbod grid */}
      <section className="design-section" style={{ background: "var(--creme)" }}>
        <div className="design-container">
          <div className="section-head-row mb-12">
            <div>
              <div className="section-tag">Wat we hebben</div>
              <h2 className="section-h">Het aanbod</h2>
            </div>
          </div>
          <div className="acco-grid">
            {categories.map((c) => (
              <article key={c.title} className="acco-card">
                <div className="p-6">
                  <span className="prac-icon">{c.icon}</span>
                  <h3 className="mt-4 text-xl text-paars-primair">{c.title}</h3>
                  <ul className="mt-4 space-y-2 text-base text-tekst-grijs">
                    {c.items.map((i) => (
                      <li key={i} style={{ paddingLeft: "18px", position: "relative" }}>
                        <span style={{ position: "absolute", left: 0, top: "8px", width: "8px", height: "8px", borderRadius: "999px", background: "var(--oranje)", display: "block" }} />
                        {i}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Bestellen */}
      <section className="design-section bg-wit">
        <div className="design-container">
          <div className="mx-auto max-w-3xl rounded-card border border-rand-zacht bg-creme p-8 md:p-10">
            <div className="section-tag">Bestellen</div>
            <h2 className="section-h mt-4">Hoe het werkt</h2>
            <ul className="mt-6 space-y-3 text-base text-tekst-donker md:text-lg">
              <li>
                <strong className="text-paars-primair">Bestellen voor de volgende dag:</strong> tot 19:00 uur
              </li>
              <li>
                <strong className="text-paars-primair">Ophalen:</strong> tussen 8:30 en 9:00 uur in het winkeltje
              </li>
              <li>
                Het bestelformulier ligt bij aankomst in je accommodatie, of
                vraag het bij ons.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-strip">
        <div className="design-container">
          <div className="cta-row">
            <h3 className="text-2xl text-paars-primair md:text-3xl">
              Boek je verblijf en proef de boerderij
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
