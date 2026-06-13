import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Contact | Boerderijcamping De Hinde Dronten | Bel of app ons",
  description:
    "Contact opnemen met Boerderijcamping De Hinde in Dronten. Bel 0321-317669, app 06-49535458 of mail info@campingdehinde.nl.",
  alternates: { canonical: "/contact" },
};

export default function ContactLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
