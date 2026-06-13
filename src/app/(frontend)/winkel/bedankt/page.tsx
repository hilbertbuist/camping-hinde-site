"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, ReceiptText } from "lucide-react";

export default function ThankYouPage() {
  const params = useSearchParams();
  const id = params.get("id") ?? "";
  const method = params.get("method") ?? "mollie";

  return (
    <div className="flex min-h-screen items-center justify-center px-5 py-10">
      <div className="w-full max-w-md rounded-card bg-wit p-8 text-center shadow-lg">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-groen-gras/15">
          <CheckCircle2 className="h-9 w-9 text-groen-donker" aria-hidden />
        </div>
        <h1
          className="mt-5"
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontWeight: 500,
            fontSize: "1.65rem",
            color: "var(--paars)",
          }}
        >
          {method === "tab" ? "Op je rekening gezet" : "Bedankt en eet smakelijk"}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-tekst-grijs">
          {method === "tab"
            ? "Het wordt opgenomen op je rekening. Je kunt het zelf afrekenen via Mijn rekening of bij het uitchecken."
            : "Je bestelling is geregistreerd. Een bonnetje verschijnt straks bij je e-mail (indien ingevuld)."}
        </p>
        {id && (
          <p className="mt-4 text-xs text-tekst-grijs">
            <ReceiptText className="mr-1 inline h-3.5 w-3.5" aria-hidden />
            Bestelling #{id}
          </p>
        )}
        <div className="mt-8 flex flex-col gap-2">
          <Link href="/winkel" className="design-btn btn-groen w-full">
            Naar de winkel
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center text-sm text-tekst-grijs hover:text-tekst-donker"
          >
            Terug naar de website
          </Link>
        </div>
      </div>
    </div>
  );
}
