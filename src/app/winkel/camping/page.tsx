"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Tent, ArrowRight, AlertCircle } from "lucide-react";
import { verifyBooking } from "./actions";

/**
 * Camping-gast login.
 * Op dit moment (zomer 2026, vóór uwbooking-sync) gebruiken we alleen
 * veldnummer/veldnaam + achternaam. Het boekingsnummer-veld is verborgen
 * tot er een synchronisatie met uwbooking is.
 */
export default function CampingLoginPage() {
  const router = useRouter();
  const [siteNumber, setSiteNumber] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  // Auto-redirect if already linked
  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("hinde:booking") : null;
    if (stored) {
      router.replace("/winkel/camping/menu");
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const fd = new FormData();
      fd.set("mode", "site");
      fd.set("siteNumber", siteNumber);
      fd.set("lastName", lastName);
      const res = await verifyBooking(fd);
      if (res.ok && res.booking) {
        localStorage.setItem("hinde:booking", JSON.stringify(res.booking));
        router.push("/winkel/camping/menu");
      } else {
        setError(res.error ?? "We konden je verblijf niet vinden.");
      }
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-5 py-10">
      <div className="w-full max-w-md">
        <div className="text-center">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-groen-gras/15 text-groen-donker">
            <Tent className="h-7 w-7" aria-hidden />
          </span>
          <h1 className="mt-5 text-3xl font-bold tracking-tight text-tekst-donker">
            Welkom op De Hinde
          </h1>
          <p className="mt-2 text-sm text-tekst-grijs">
            Vul je veldnummer of veldnaam in om te beginnen.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <Field
            label="Veldnummer of veldnaam"
            hint="Bijv. 7, Grutto, Safaritent 1 of Hindehut"
            value={siteNumber}
            onChange={setSiteNumber}
            required
            autoFocus
          />

          <Field
            label="Achternaam"
            hint="Zoals bekend bij je verblijf"
            value={lastName}
            onChange={setLastName}
            required
          />

          {error && (
            <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">
              <AlertCircle className="mt-0.5 h-4 w-4 flex-none" aria-hidden />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={pending}
            className="inline-flex w-full items-center justify-center gap-2 rounded-pill bg-groen-gras px-6 py-3.5 text-base font-semibold text-wit transition-colors hover:bg-groen-donker disabled:opacity-60"
          >
            {pending ? "Bezig..." : "Inloggen"}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-tekst-grijs">
            Niet gevonden? Loop even langs bij Dora of bel{" "}
            <a href="tel:0649535458" className="text-tekst-donker underline">
              06-49535458
            </a>
          </p>
        </div>

        <div className="mt-6 text-center">
          <Link href="/winkel" className="text-sm text-tekst-grijs hover:text-tekst-donker">
            ← Geen camper? Klik hier
          </Link>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  hint,
  value,
  onChange,
  required,
  autoFocus,
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  autoFocus?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-tekst-donker">{label}</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        autoFocus={autoFocus}
        className="block w-full rounded-xl border border-rand-zacht bg-wit px-4 py-3 text-base text-tekst-donker placeholder:text-tekst-grijs focus:border-groen-donker focus:outline-none focus:ring-2 focus:ring-groen-donker/20"
      />
      {hint && <span className="mt-1 block text-xs text-tekst-grijs">{hint}</span>}
    </label>
  );
}
