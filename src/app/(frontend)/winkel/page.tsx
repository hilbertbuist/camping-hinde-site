"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { Tent, ShoppingBag, Download } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function WinkelHomePage() {
  // Try to register service worker on load (PWA install)
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        /* silent — feature is enhancement only */
      });
    }
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-5 py-10">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center">
          <Image
            src="/logo.png"
            alt="Boerderijcamping De Hinde"
            width={220}
            height={134}
            priority
            className="mx-auto h-24 w-auto"
          />
        </div>

        {/* Welcome */}
        <div className="mt-8 text-center">
          <span className="section-tag" style={{ justifyContent: "center" }}>
            Fijn dat je er bent
          </span>
          <h1
            className="mt-1 leading-tight text-tekst-donker"
            style={{
              fontFamily: "var(--serif)",
              fontStyle: "italic",
              fontWeight: 500,
              fontSize: "clamp(2rem, 8vw, 2.5rem)",
              color: "var(--paars)",
            }}
          >
            Welkom in onze winkel
          </h1>
          <p className="mt-3 text-base leading-relaxed text-tekst-grijs">
            Wat brengt je hier?
          </p>
        </div>

        {/* Two big choice cards */}
        <div className="mt-10 space-y-4">
          <Link
            href="/winkel/camping"
            className="group block overflow-hidden rounded-card border-2 border-rand-zacht bg-wit p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-groen-gras hover:shadow-lg"
          >
            <div className="flex items-start gap-4">
              <span className="flex h-14 w-14 flex-none items-center justify-center rounded-full bg-groen-gras/15 text-groen-donker transition-colors group-hover:bg-groen-gras group-hover:text-wit">
                <Tent className="h-7 w-7" aria-hidden />
              </span>
              <div className="flex-1">
                <h2
                  className="text-tekst-donker"
                  style={{
                    fontFamily: "var(--serif)",
                    fontStyle: "italic",
                    fontWeight: 500,
                    fontSize: "1.35rem",
                    color: "var(--paars)",
                  }}
                >
                  Ik logeer hier
                </h2>
                <p className="mt-1 text-sm text-tekst-grijs">
                  Inloggen met je boekingsnummer of plaatsnummer. Winkelen,
                  broodjes bestellen en op rekening zetten.
                </p>
              </div>
            </div>
          </Link>

          <Link
            href="/winkel/passant"
            className="group block overflow-hidden rounded-card border-2 border-rand-zacht bg-wit p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-oranje-warm hover:shadow-lg"
          >
            <div className="flex items-start gap-4">
              <span className="flex h-14 w-14 flex-none items-center justify-center rounded-full bg-oranje-warm/15 text-oranje-warm transition-colors group-hover:bg-oranje-warm group-hover:text-wit">
                <ShoppingBag className="h-7 w-7" aria-hidden />
              </span>
              <div className="flex-1">
                <h2
                  className="text-tekst-donker"
                  style={{
                    fontFamily: "var(--serif)",
                    fontStyle: "italic",
                    fontWeight: 500,
                    fontSize: "1.35rem",
                    color: "var(--paars)",
                  }}
                >
                  Ik ben passant
                </h2>
                <p className="mt-1 text-sm text-tekst-grijs">
                  Even een streekproduct halen? Direct doorlopen, scannen,
                  afrekenen via iDEAL of Apple Pay.
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Install hint */}
        <div className="mt-10 rounded-card border border-rand-zacht bg-wit/60 p-4 text-center">
          <div className="flex items-center justify-center gap-2 text-tekst-grijs">
            <Download className="h-4 w-4" aria-hidden />
            <span className="text-xs font-medium uppercase tracking-wider">
              Installeer als app
            </span>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-tekst-grijs">
            Tik op het deel-icoon van je browser en kies &ldquo;Zet op
            beginscherm&rdquo;. Dan heb je De Hinde-winkel altijd binnen handbereik.
          </p>
        </div>

        {/* Back link */}
        <div className="mt-8 text-center">
          <Button href="/" variant="ghost" size="sm" className="!text-tekst-grijs">
            ← Terug naar de website
          </Button>
        </div>
      </div>
    </div>
  );
}
