import type { Metadata } from "next";
import { FaqClient } from "./FaqClient";

export const metadata: Metadata = {
  title: "Veelgestelde vragen, antwoorden over boeken, verblijf en faciliteiten",
  description:
    "Antwoorden op de meestgestelde vragen over boeken, verblijf en faciliteiten op Boerderijcamping De Hinde.",
};

export default function FaqPage() {
  return <FaqClient />;
}
