import type { Metadata } from "next";

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
  return <div className="min-h-screen bg-creme">{children}</div>;
}
