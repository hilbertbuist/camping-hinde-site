import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, MapPin, Check, ArrowRight } from "lucide-react";
import { BookingWidget } from "@/components/layout/BookingWidget";
import { site } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Boeken",
  description:
    "Boek direct online bij Boerderijcamping De Hinde. Bel, mail of plan persoonlijk je verblijf in onze safaritent, Hindehut, Hooiberghut of op een kampeerplek.",
  alternates: { canonical: "/boeken" },
};

export default function BoekenPage() {
  return (
    <>
      {/* Hero */}
      <section className="design-section bg-creme">
        <div className="design-container">
          <div className="max-w-3xl">
            <span className="section-tag" style={{ color: "var(--groen-donker, var(--groen))" }}>
              Boeken
            </span>
            <h1 className="section-h">Boek direct online</h1>
            <p className="mt-6 text-lg leading-relaxed" style={{ color: "var(--tekst-grijs)" }}>
              Onze online boekingsmodule is in voorbereiding. Voor nu mag je ons gerust direct
              bellen of mailen, we plannen jouw verblijf graag persoonlijk in.
            </p>
          </div>

          {/* Booking widget */}
          <div className="mt-10">
            <BookingWidget variant="hero" />
          </div>
        </div>
      </section>

      {/* Placeholder iframe area */}
      <section className="bg-wit pb-20">
        <div className="design-container">
          {/* TODO: vervang dit blok door de Booking Experts iframe-integratie */}
          <div
            className="rounded-card flex items-center justify-center text-center bg-creme"
            style={{
              border: "2px dashed var(--rand)",
              minHeight: "600px",
              padding: "40px",
            }}
          >
            <div className="max-w-lg">
              <span className="section-tag">Binnenkort</span>
              <h2 className="section-h" style={{ fontSize: "32px" }}>
                Hier verschijnt straks de boekingsmodule van Booking Experts.
              </h2>
              <p className="mt-5 leading-relaxed" style={{ color: "var(--tekst-grijs)" }}>
                Tot die tijd kun je ons direct bellen of mailen, dan boeken we jouw verblijf
                persoonlijk in.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Drie manieren om te boeken */}
      <section className="design-section bg-wit">
        <div className="design-container">
          <div className="section-head-row">
            <div>
              <span className="section-tag">Drie manieren</span>
              <h2 className="section-h">Drie manieren om te boeken</h2>
            </div>
            <p className="section-intro text-[17px] leading-relaxed" style={{ color: "var(--tekst-grijs)" }}>
              Bellen werkt het snelst en je hebt meteen antwoord. Mailen mag altijd, en
              langskomen op het erf is welkom.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Bel direct */}
            <div className="rounded-card bg-creme p-8">
              <div
                className="flex h-14 w-14 items-center justify-center rounded-full"
                style={{ background: "var(--paars)", color: "white" }}
              >
                <Phone className="h-6 w-6" />
              </div>
              <h3 className="section-h mt-5" style={{ fontSize: "26px" }}>
                Bel direct
              </h3>
              <p className="mt-3 leading-relaxed" style={{ color: "var(--tekst-grijs)" }}>
                Bel René of Dora op {site.contact.tel} of mobiel {site.contact.telAlt}.
              </p>
              <a href={`tel:${site.contact.telLink}`} className="btn-link mt-5">
                Nu bellen
                <ArrowRight />
              </a>
            </div>

            {/* Mail */}
            <div className="rounded-card bg-creme p-8">
              <div
                className="flex h-14 w-14 items-center justify-center rounded-full"
                style={{ background: "var(--paars)", color: "white" }}
              >
                <Mail className="h-6 w-6" />
              </div>
              <h3 className="section-h mt-5" style={{ fontSize: "26px" }}>
                Stuur een mail
              </h3>
              <p className="mt-3 leading-relaxed" style={{ color: "var(--tekst-grijs)" }}>
                Mail naar {site.contact.email} en we reageren binnen 1-2 dagen.
              </p>
              <a href={`mailto:${site.contact.email}`} className="btn-link mt-5">
                Mail openen
                <ArrowRight />
              </a>
            </div>

            {/* Kom langs */}
            <div className="rounded-card bg-creme p-8">
              <div
                className="flex h-14 w-14 items-center justify-center rounded-full"
                style={{ background: "var(--paars)", color: "white" }}
              >
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="section-h mt-5" style={{ fontSize: "26px" }}>
                Kom langs
              </h3>
              <p className="mt-3 leading-relaxed" style={{ color: "var(--tekst-grijs)" }}>
                Persoonlijke afspraak op het erf. Je vindt ons aan {site.address.street}.
              </p>
              <Link href="/contact" className="btn-link mt-5">
                Naar contact
                <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Annulering & voorwaarden */}
      <section className="design-section bg-creme">
        <div className="design-container">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] items-start">
            <div>
              <span className="section-tag">Goed om te weten</span>
              <h2 className="section-h">Annulering & voorwaarden</h2>
              <p className="mt-6 text-[17px] leading-relaxed" style={{ color: "var(--tekst-grijs)" }}>
                We werken met de Recron-voorwaarden. Een korte samenvatting van wat dat voor jou
                betekent.
              </p>
            </div>

            <div className="rounded-card bg-wit p-8">
              <ul className="space-y-4">
                {[
                  "Kosteloos annuleren tot 30 dagen voor aankomst.",
                  "Tussen 30 en 14 dagen voor aankomst: 50% van de verblijfssom.",
                  "Binnen 14 dagen voor aankomst: 90% van de verblijfssom.",
                  "We raden een annuleringsverzekering aan voor onverwachte zaken.",
                  "Bij ziekte of overlijden: bel ons, we vinden een redelijke oplossing.",
                ].map((line) => (
                  <li key={line} className="flex items-start gap-3">
                    <span
                      className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full mt-0.5"
                      style={{ background: "var(--groen)", color: "white" }}
                    >
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    <span className="leading-relaxed" style={{ color: "var(--tekst)" }}>
                      {line}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
