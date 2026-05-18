import type { Metadata } from "next";
import { OmgevingClient } from "./OmgevingClient";

export const metadata: Metadata = {
  title: "De omgeving, water, bos, steden en attracties rondom De Hinde",
  description:
    "Vier minuten naar het Veluwemeer, vijf minuten naar het bos. Hanzesteden, attractieparken en de mooiste fietsroutes binnen handbereik.",
};

export default function OmgevingPage() {
  return <OmgevingClient />;
}
