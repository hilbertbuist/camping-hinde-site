import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";

export const metadata: Metadata = {
  title: "Cookieverklaring",
  description: "Cookiebeleid van Boerderijcamping De Hinde.",
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  return (
    <section className="py-20 md:py-28 bg-wit">
      <Container size="narrow">
        <SectionTag variant="green">Juridisch</SectionTag>
        <h1 className="mt-6 font-serif text-5xl md:text-6xl leading-[1.1] text-tekst-donker">
          Cookieverklaring
        </h1>
        <div className="mt-10 space-y-6 text-tekst-donker leading-relaxed text-lg">
          <p>
            Wij plaatsen alleen functionele cookies. Statistiek en marketing-cookies plaatsen wij
            pas na jouw toestemming via de cookiebanner.
          </p>
          <p className="text-tekst-grijs">
            Een uitgebreid overzicht van alle cookies en hun bewaartermijnen volgt. Heb je hier
            vragen over, dan horen we dat graag.
          </p>
        </div>
      </Container>
    </section>
  );
}
