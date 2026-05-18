"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CookieBanner } from "./CookieBanner";

/**
 * Renders Header, Footer en CookieBanner alleen op de website-pagina's.
 * Op /winkel (PWA) en /admin (Payload) worden ze verborgen voor app-feel.
 */
export function ChromeShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "";
  const isApp = pathname.startsWith("/winkel") || pathname.startsWith("/admin");

  if (isApp) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <CookieBanner />
    </>
  );
}
