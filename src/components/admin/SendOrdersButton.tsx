"use client";

import { useState, useTransition } from "react";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import type { SendNowResult } from "@/app/(admin)/beheer/leveranciers/actions";

type Props = {
  action: () => Promise<SendNowResult>;
};

export function SendOrdersButton({ action }: Props) {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  function handleClick() {
    if (
      !confirm(
        "Bestelmails voor morgen nu versturen naar alle actieve leveranciers?",
      )
    )
      return;
    setMessage(null);
    setIsError(false);
    startTransition(async () => {
      try {
        const res = await action();
        if (!res.ok) {
          setIsError(true);
          setMessage(res.error ?? "Versturen mislukt.");
          return;
        }
        const summary = res.summary ?? [];
        const sent = summary.filter((s) => s.sent).length;
        const failed = summary.filter((s) => !s.sent);
        setIsError(failed.length > 0);
        setMessage(
          `Verstuurd naar ${sent} van ${summary.length} leverancier(s).` +
            (failed.length
              ? ` Mislukt: ${failed.map((f) => f.supplier).join(", ")}.`
              : ""),
        );
      } catch (err) {
        setIsError(true);
        setMessage(err instanceof Error ? err.message : "Versturen mislukt.");
      }
    });
  }

  return (
    <span style={{ display: "inline-flex", flexDirection: "column", gap: "0.4rem", alignItems: "flex-end" }}>
      <AdminButton type="button" variant="outline" onClick={handleClick} disabled={isPending}>
        {isPending ? "Versturen…" : "Bestellingen nu versturen"}
      </AdminButton>
      {message && (
        <span
          role="status"
          style={{ fontSize: "0.8rem", color: isError ? "#b3261e" : "var(--a-groen)" }}
        >
          {message}
        </span>
      )}
    </span>
  );
}

export default SendOrdersButton;
