"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

const locales = [
  { code: "nl", label: "NL" },
  { code: "de", label: "DE" },
  { code: "en", label: "EN" },
] as const;

export function LanguageSwitcher() {
  const current = useLocale();
  const router = useRouter();
  const [, startTransition] = useTransition();

  const handleSwitch = (code: string) => {
    document.cookie = `NEXT_LOCALE=${code}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    startTransition(() => router.refresh());
  };

  return (
    <div className="flex items-center gap-1 text-xs font-medium" role="group" aria-label="Taal kiezen">
      {locales.map((loc, i) => (
        <span key={loc.code} className="flex items-center gap-1">
          <button
            onClick={() => handleSwitch(loc.code)}
            className={`uppercase tracking-wider transition-colors ${
              current === loc.code ? "text-groen-donker font-bold" : "text-wit/70 hover:text-wit"
            }`}
            aria-current={current === loc.code ? "true" : undefined}
          >
            {loc.label}
          </button>
          {i < locales.length - 1 && <span className="text-rand-zacht" aria-hidden>·</span>}
        </span>
      ))}
    </div>
  );
}
