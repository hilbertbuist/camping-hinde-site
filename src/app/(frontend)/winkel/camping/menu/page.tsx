"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShoppingBag,
  Croissant,
  Receipt,
  CalendarDays,
  Newspaper,
  LogOut,
  ChevronRight,
} from "lucide-react";
import type { GuestSession } from "../actions";
import { fetchOpRekeningEnabled } from "@/app/(frontend)/winkel/settings-actions";

export default function CamperMenuPage() {
  const router = useRouter();
  const [booking, setBooking] = useState<GuestSession | null>(null);
  const [opRekening, setOpRekening] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem("hinde:booking");
    if (!raw) {
      router.replace("/winkel/camping");
      return;
    }
    try {
      setBooking(JSON.parse(raw) as GuestSession);
    } catch {
      localStorage.removeItem("hinde:booking");
      router.replace("/winkel/camping");
    }
    fetchOpRekeningEnabled().then(setOpRekening).catch(() => setOpRekening(false));
  }, [router]);

  const logout = () => {
    localStorage.removeItem("hinde:booking");
    router.replace("/winkel/camping");
  };

  if (!booking) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-tekst-grijs">Laden...</p>
      </div>
    );
  }

  return (
    <div className="px-5 py-10">
      <div className="mx-auto max-w-md">
        {/* Greeting card */}
        <div className="rounded-card bg-paars-donker p-6 text-wit shadow-lg">
          <p
            className="text-wit/85"
            style={{ fontFamily: "var(--hand)", fontSize: "1.4rem", color: "var(--oranje)" }}
          >
            Hallo,
          </p>
          <h1
            className="mt-0.5"
            style={{
              fontFamily: "var(--serif)",
              fontStyle: "italic",
              fontWeight: 500,
              fontSize: "1.75rem",
              color: "white",
            }}
          >
            {booking.guestName}
          </h1>
          <p className="mt-2 text-sm text-wit/85">
            {booking.campsiteNumber
              ? `Plek ${booking.campsiteNumber}`
              : `Boeking ${booking.reference}`}
          </p>
        </div>

        {/* Menu */}
        <div className="mt-6 space-y-3">
          <MenuLink
            href="/winkel/camping/shop"
            icon={ShoppingBag}
            title="Naar het winkeltje"
            subtitle="Streekproducten, bier, zuivel, vlees"
          />
          <MenuLink
            href="/winkel/camping/broodjes"
            icon={Croissant}
            title="Broodjes voor morgen"
            subtitle="Bestellen voor 20:00, bezorgen om 8:30"
            accent="oranje"
          />
          <MenuLink
            href="/winkel/camping/activiteiten"
            icon={CalendarDays}
            title="Activiteiten"
            subtitle="Het animatieprogramma van de camping"
            accent="groen"
          />
          <MenuLink
            href="/winkel/camping/nieuws"
            icon={Newspaper}
            title="Nieuws & mededelingen"
            subtitle="Het laatste nieuws van De Hinde"
            accent="oranje"
          />
          {opRekening && (
            <MenuLink
              href="/winkel/camping/rekening"
              icon={Receipt}
              title="Mijn rekening"
              subtitle="Open posten en zelf afrekenen"
              accent="paars"
            />
          )}
        </div>

        {/* Logout */}
        <div className="mt-10 text-center">
          <button
            onClick={logout}
            className="inline-flex items-center gap-1.5 text-sm text-tekst-grijs hover:text-tekst-donker"
          >
            <LogOut className="h-3.5 w-3.5" aria-hidden />
            Uitloggen
          </button>
        </div>
      </div>
    </div>
  );
}

function MenuLink({
  href,
  icon: Icon,
  title,
  subtitle,
  accent = "groen",
}: {
  href: string;
  icon: typeof ShoppingBag;
  title: string;
  subtitle: string;
  accent?: "groen" | "oranje" | "paars";
}) {
  const accentClasses: Record<string, string> = {
    groen: "bg-groen-gras/15 text-groen-donker",
    oranje: "bg-oranje-warm/15 text-oranje-warm",
    paars: "bg-paars-primair/10 text-paars-donker",
  };
  return (
    <Link
      href={href}
      className="group flex items-center gap-4 rounded-card border border-rand-zacht bg-wit p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      <span
        className={`flex h-12 w-12 flex-none items-center justify-center rounded-full ${accentClasses[accent]}`}
      >
        <Icon className="h-6 w-6" aria-hidden />
      </span>
      <div className="flex-1">
        <h2
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontWeight: 500,
            fontSize: "1.15rem",
            color: "var(--paars)",
          }}
        >
          {title}
        </h2>
        <p className="mt-0.5 text-xs text-tekst-grijs">{subtitle}</p>
      </div>
      <ChevronRight className="h-5 w-5 flex-none text-tekst-grijs transition-transform group-hover:translate-x-1" />
    </Link>
  );
}
