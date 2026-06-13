import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Winkel — De Hinde",
  description:
    "Lokale streekproducten en broodjes van Boerderijcamping De Hinde. Zelfscan en betalen via de app.",
  manifest: "/manifest.json",
  themeColor: "#5A1F6B",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "De Hinde Winkel",
  },
};

export default function WinkelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-creme">
      {/* Klein logo bovenin, op elke app-pagina */}
      <div className="flex justify-center border-b border-rand-zacht bg-wit/80 px-5 py-2.5 backdrop-blur">
        <Link href="/winkel" aria-label="De Hinde winkel">
          <Image
            src="/logo.png"
            alt="Boerderijcamping De Hinde"
            width={1181}
            height={721}
            priority
            style={{ height: 30, width: "auto" }}
          />
        </Link>
      </div>
      {children}
    </div>
  );
}
