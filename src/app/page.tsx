import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { UspStrip } from "@/components/sections/UspStrip";
import { WelcomeBlock } from "@/components/sections/WelcomeBlock";
import { AccommodationCards } from "@/components/sections/AccommodationCards";
import { ExperienceBlock } from "@/components/sections/ExperienceBlock";
import { ActivityCards } from "@/components/sections/ActivityCards";
import { SurroundingsTeaser } from "@/components/sections/SurroundingsTeaser";
import { Reviews } from "@/components/sections/Reviews";
import { PracticalBlock } from "@/components/sections/PracticalBlock";
import { CtaStrip } from "@/components/sections/CtaStrip";

export const metadata: Metadata = {
  title: "Boerderijcamping De Hinde Dronten | Kamperen op de boerderij in Flevoland",
  description:
    "Kleinschalige boerderijcamping in Dronten, vlakbij het Veluwemeer. 19 kampeerplekken, 3 safaritenten, een Hindehut en Hooiberghut. Drie generaties boerenleven, eindeloos rust.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    title: "Boerderijcamping De Hinde",
    description:
      "Kleinschalige boerderijcamping in Dronten. Twintig kampeerplekken, safaritent, Hindehut en Hooiberghut.",
    siteName: "Boerderijcamping De Hinde",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <UspStrip />
      <WelcomeBlock />
      <AccommodationCards />
      <ExperienceBlock />
      <ActivityCards />
      <SurroundingsTeaser />
      <Reviews />
      <PracticalBlock />
      <CtaStrip />
    </>
  );
}
