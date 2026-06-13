import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { site } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Privacyverklaring",
  description:
    "Privacyverklaring van Boerderijcamping De Hinde. Hoe wij omgaan met persoonsgegevens.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <section className="py-20 md:py-28 bg-wit">
      <Container size="narrow">
        <SectionTag variant="green">Juridisch</SectionTag>
        <h1 className="mt-6 font-serif text-5xl md:text-6xl leading-[1.1] text-tekst-donker">
          Privacyverklaring
        </h1>
        <div className="mt-10 space-y-6 text-tekst-donker leading-relaxed text-lg">
          <p>
            Onze privacyverklaring volgt. Heb je vragen over hoe wij omgaan met persoonsgegevens,
            mail dan{" "}
            <a
              href={`mailto:${site.contact.email}`}
              className="text-groen-donker underline underline-offset-4 hover:text-paars-donker"
            >
              {site.contact.email}
            </a>{" "}
            of bel{" "}
            <a
              href={`tel:${site.contact.telLink}`}
              className="text-groen-donker underline underline-offset-4 hover:text-paars-donker"
            >
              {site.contact.tel}
            </a>
            .
          </p>
          <p className="text-tekst-grijs">
            We werken aan een complete versie. Tot die tijd: we verzamelen alleen wat nodig is om
            jouw boeking en verblijf goed te regelen, en we delen niets met derden behalve onze
            boekingspartner.
          </p>
        </div>
      </Container>
    </section>
  );
}
