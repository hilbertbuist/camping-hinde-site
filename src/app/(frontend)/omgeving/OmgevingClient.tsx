"use client";

import Image from "next/image";
import Link from "next/link";

const PHOTO = "/images/photos";

type Loc = { name: string; distance: string; body: string; image: string };

const water: Loc[] = [
  {
    name: "Veluwemeer & Drontermeer",
    distance: "4 km / 2 km",
    body: "Twee meren op fietsafstand. Strandjes, jachthavens, kitesurf-spots en mooie wandelpaden langs de oever. Vanaf de camping fiets je in een kwartier naar het water.",
    image: `${PHOTO}/familietenten-op-ruim-grasveld.jpg`,
  },
  {
    name: "Strand Reve-Abbert",
    distance: "5 km",
    body: "Klein zandstrand aan het Drontermeer met ondiep water, ideaal voor kinderen. Een rustige plek waar de hele dag picknicken goed bevalt.",
    image: `${PHOTO}/panorama-camping-met-spelende-kinderen-en-tenten.jpg`,
  },
];

const natuur: Loc[] = [
  {
    name: "Bos van Roggebot",
    distance: "3 km",
    body: "Boswachterij met fiets- en wandelroutes. Speeltuin Roggebotstaete voor de allerkleinsten.",
    image: `${PHOTO}/jongen-plukt-gras-in-zonnig-weiland.jpg`,
  },
  {
    name: "Abbertbos & Revebos",
    distance: "5 km",
    body: "Grotere bosgebieden met uitgestippelde wandelroutes en mountainbike-paden. Veel ruimte voor de hond.",
    image: `${PHOTO}/bordje-de-buizerd-tussen-grassen.jpg`,
  },
];

const kinderen: Loc[] = [
  {
    name: "Walibi Holland",
    distance: "12 km",
    body: "Een van de grootste pretparken van Nederland, met de Goliath, Lost Gravity en alle andere achtbanen. Een halfuurtje rijden.",
    image: `${PHOTO}/speeltuin-met-trampolines-en-klimtoren.jpg`,
  },
  {
    name: "Dolfinarium Harderwijk",
    distance: "18 km",
    body: "De klassieker. Dolfijnen, walrussen, zeeleeuwen, en een hele dag vermaak.",
    image: `${PHOTO}/jongen-op-skelter-op-camping.jpg`,
  },
  {
    name: "Apenheul Apeldoorn",
    distance: "35 km",
    body: "Apen die over je heen lopen, voor de iets grotere kinderen een prachtige ervaring.",
    image: `${PHOTO}/kinderen-met-shetlandpony-voor-boerderij.jpg`,
  },
];

const steden: Loc[] = [
  {
    name: "Elburg",
    distance: "8 km",
    body: "Vestingstadje aan het Veluwemeer met smalle straatjes, een visserijmuseum, en een gezellige markt op donderdag.",
    image: `${PHOTO}/familie-portret-in-tulpenveld-bij-zonsondergang.jpg`,
  },
  {
    name: "Dronten",
    distance: "4 km",
    body: "Ons dorp, modern en met alle voorzieningen. Boodschappen, terrassen, een bioscoop.",
    image: `${PHOTO}/roze-tulpen-close-up-met-zonnestralen.jpg`,
  },
  {
    name: "Kampen",
    distance: "15 km",
    body: "Hanzestad aan de IJssel, met gevelpanden, kerken en de Stadspoort. Mooi voor een halve dag.",
    image: `${PHOTO}/roze-tulpenveld-bij-zonsondergang.jpg`,
  },
];

const routes = [
  { name: "Bossen-rondje", spec: "12 km · 2 uur", body: "Een rondje door Bos van Roggebot en Revebos. Mooi voor een ochtend." },
  { name: "Veluwemeer-tour", spec: "28 km · hele dag", body: "Langs het water, met picknickstops en uitzicht op de Veluwe." },
  { name: "Vestingsteden-rit", spec: "45 km · sportieve dag", body: "Via Elburg en Kampen, voor wie van afstand houdt." },
];

function PinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function LocationCard({ loc }: { loc: Loc }) {
  return (
    <article className="overflow-hidden rounded-card bg-wit shadow-sm ring-1 ring-rand-zacht card-lift">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={loc.image}
          alt={loc.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
        <span
          className="absolute right-4 top-4 rounded-pill bg-wit/95 px-3 py-1 text-base"
          style={{ fontFamily: "var(--hand)", color: "var(--oranje)", fontWeight: 700 }}
        >
          {loc.distance}
        </span>
      </div>
      <div className="p-6">
        <h3 className="text-xl text-paars-primair">{loc.name}</h3>
        <p className="mt-3 text-sm leading-relaxed text-tekst-grijs">{loc.body}</p>
      </div>
    </article>
  );
}

function Category({ tag, title, items }: { tag: string; title: string; items: Loc[] }) {
  return (
    <section className="design-section bg-wit">
      <div className="design-container">
        <div className="section-head-row mb-12">
          <div>
            <div className="section-tag">{tag}</div>
            <h2 className="section-h">{title}</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((i) => (
            <LocationCard key={i.name} loc={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function OmgevingClient() {
  return (
    <>
      {/* Hero */}
      <section className="design-section" style={{ background: "var(--creme)" }}>
        <div className="design-container">
          <div className="max-w-3xl">
            <div className="section-tag">Omgeving</div>
            <h1 className="section-h mt-4">
              Vlakbij water, bossen en uitjes voor elke dag
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-tekst-grijs md:text-xl">
              De Hinde ligt midden in Flevoland, tussen Kampen en Elburg, op
              fietsafstand van het Veluwemeer en de Veluwse bossen.
            </p>
            <p className="mt-6 text-base leading-relaxed text-tekst-grijs">
              Onze camping grenst aan een gebied vol mogelijkheden. Fietsen
              langs het Drontermeer, wandelen door het Abbertbos, Revebos of
              Roggebotsebos, een dagje strand of zwembad, of de Veluwe op met
              de auto. Voor de kinderen zijn er attracties op fietsafstand,
              voor de rust-zoekers heel veel groen.
            </p>
          </div>
        </div>
      </section>

      <Category tag="Water & strand" title="Aan het water" items={water} />

      <section className="design-section" style={{ background: "var(--creme)" }}>
        <div className="design-container">
          <div className="section-head-row mb-12">
            <div>
              <div className="section-tag">Natuur & bossen</div>
              <h2 className="section-h">Groen om je heen</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {natuur.map((i) => (
              <LocationCard key={i.name} loc={i} />
            ))}
          </div>
        </div>
      </section>

      <Category tag="Voor de kinderen" title="Een dagje uit" items={kinderen} />

      <section className="design-section" style={{ background: "var(--creme)" }}>
        <div className="design-container">
          <div className="section-head-row mb-12">
            <div>
              <div className="section-tag">Steden & cultuur</div>
              <h2 className="section-h">Hanzesteden en vestingstadjes</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {steden.map((i) => (
              <LocationCard key={i.name} loc={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Markten & evenementen */}
      <section className="design-section bg-wit">
        <div className="design-container">
          <div className="mx-auto max-w-3xl rounded-card border border-rand-zacht bg-creme p-8 md:p-10">
            <div className="section-tag">Markten & evenementen</div>
            <h2 className="section-h mt-4">Wat er deze week speelt</h2>
            <p className="mt-6 text-base leading-relaxed text-tekst-grijs">
              Op donderdag een gezellige markt in Elburg. Op zaterdag de
              boerenmarkt in Kampen. In Dronten regelmatig kleine evenementen,
              vraag bij aankomst gerust waar deze week iets te doen is.
            </p>
          </div>
        </div>
      </section>

      {/* Fiets- en wandelroutes */}
      <section className="design-section" style={{ background: "var(--creme)" }}>
        <div className="design-container">
          <div className="section-head-row mb-12">
            <div>
              <div className="section-tag">Fietsen & wandelen</div>
              <h2 className="section-h">Onze favoriete routes</h2>
            </div>
            <p className="max-w-md text-base leading-relaxed text-tekst-grijs">
              We hebben een paar lievelingsroutes uitgeschreven die je gratis
              bij de receptie kunt ophalen. Vraag er gerust naar.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {routes.map((r) => (
              <div key={r.name} className="prac-card">
                <span className="prac-icon">
                  <PinIcon />
                </span>
                <div>
                  <h4>{r.name}</h4>
                  <p style={{ fontFamily: "var(--hand)", color: "var(--oranje)", fontWeight: 700 }}>{r.spec}</p>
                  <p>{r.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plattegrond placeholder */}
      <section className="design-section bg-wit">
        <div className="design-container">
          <div className="section-head-row mb-12">
            <div>
              <div className="section-tag">Vind je weg</div>
              <h2 className="section-h">De omgeving op de kaart</h2>
            </div>
          </div>
          <div
            className="rounded-card border border-rand-zacht bg-creme"
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
              <div style={{ color: "var(--paars-primair)", fontFamily: "var(--serif)", fontStyle: "italic", fontSize: "1.5rem" }}>
                Google Maps embed komt hier
              </div>
              <p className="mt-3 text-base leading-relaxed text-tekst-grijs">
                Met De Hinde plus alle genoemde locaties als pinnetjes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-strip">
        <div className="design-container">
          <div className="cta-row">
            <h3 className="text-2xl text-paars-primair md:text-3xl">
              Boek je vakantie bij De Hinde
            </h3>
            <div className="flex flex-wrap gap-3">
              <Link href="/boeken" className="design-btn btn-paars">
                Check beschikbaarheid
              </Link>
              <Link href="/verblijf" className="design-btn btn-outline">
                Onze accommodaties
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
