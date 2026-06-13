import { NextResponse } from "next/server";
import { sendSupplierOrders } from "@/lib/bread-orders";

export const dynamic = "force-dynamic";

/**
 * Cron-endpoint (Vercel Cron compatibel) dat de broodjesbestellingen voor
 * MORGEN (de bezorgdag) per leverancier mailt.
 *
 * Beveiliging: vereist het geheim uit `process.env.CRON_SECRET`, via
 *   - header  Authorization: Bearer <secret>   (zoals Vercel Cron stuurt), of
 *   - query   ?key=<secret>
 *
 * Cron-pad: /api/cron/bread-orders — laat dit lopen op de verstuurtijd van de
 * leverancier (bv. dagelijks vroeg in de ochtend).
 */
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;

  if (!secret) {
    return NextResponse.json(
      { ok: false, error: "CRON_SECRET niet geconfigureerd." },
      { status: 500 },
    );
  }

  const authHeader = req.headers.get("authorization") ?? "";
  const bearer = authHeader.replace(/^Bearer\s+/i, "").trim();
  const url = new URL(req.url);
  const key = url.searchParams.get("key") ?? "";

  if (bearer !== secret && key !== secret) {
    return NextResponse.json({ ok: false, error: "Niet gemachtigd." }, { status: 401 });
  }

  // "Morgen" = de bezorgdag.
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  try {
    const summary = await sendSupplierOrders(tomorrow);
    return NextResponse.json({
      ok: true,
      date: tomorrow.toISOString().slice(0, 10),
      summary,
    });
  } catch (err) {
    console.error("[cron/bread-orders] fout:", err);
    return NextResponse.json(
      {
        ok: false,
        error: err instanceof Error ? err.message : "Versturen mislukt.",
      },
      { status: 500 },
    );
  }
}
