import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { InteractiveMap } from "@/components/map/InteractiveMap";

export const metadata: Metadata = {
  title: "Plattegrond — De Hinde",
  description:
    "Interactieve plattegrond van Boerderijcamping De Hinde. Bekijk waar de safaritenten staan, vind de faciliteiten, ontmoet de dieren.",
};

export default function PlattegrondPage() {
  return (
    <div className="bg-creme py-20 sm:py-28">
      <Container>
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <SectionTag variant="green">De camping</SectionTag>
          <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight text-tekst-donker sm:text-5xl md:text-[3.25rem]">
            Vind je plek op{" "}
            <em className="italic font-bold text-groen-donker">De Hinde</em>
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-tekst-grijs">
            Klik op de gekleurde stipjes voor info over de accommodaties,
            faciliteiten, speelplekken en dieren. Op desktop kun je inzoomen met
            de knoppen of <kbd className="rounded bg-rand-zacht px-1.5 py-0.5 text-xs">Ctrl</kbd> +
            scrollwiel. Op je telefoon: dubbeltikken om in te zoomen.
          </p>
        </div>
      </Container>

      <Container>
        <InteractiveMap />
      </Container>

      <Container>
        <div className="mx-auto mt-12 max-w-2xl text-center text-sm text-tekst-grijs">
          <p>
            De velden zijn vernoemd naar weidevogels en gewassen die je hier op
            het land vindt. Drie scharrelkippen, twee geiten en vier pony&apos;s
            verwelkomen je.
          </p>
        </div>
      </Container>
    </div>
  );
}
