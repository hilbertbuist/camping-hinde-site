import { NextResponse } from "next/server";
import { getMollie } from "@/lib/mollie";
import { payload } from "@/lib/payload";

export async function POST(request: Request) {
  try {
    const body = await request.formData();
    const id = body.get("id");
    if (!id || typeof id !== "string") {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const mollie = getMollie();
    if (!mollie) return NextResponse.json({ ok: true });

    const payment = await mollie.payments.get(id);
    const meta = (payment.metadata ?? {}) as { orderId?: string };
    const orderId: string | undefined = meta.orderId;

    if (orderId) {
      const p = await payload();
      const status =
        payment.status === "paid"
          ? "paid"
          : payment.status === "failed" || payment.status === "expired"
          ? "failed"
          : payment.status === "canceled"
          ? "cancelled"
          : "open";

      await p.update({
        collection: "orders",
        id: orderId,
        data: { paymentStatus: status },
      });
    }

    // Settle multiple orders for tab payment (settle param)
    const url = new URL(request.url);
    const settleBookingId = url.searchParams.get("settle");
    if (settleBookingId && payment.status === "paid") {
      const p = await payload();
      const open = await p.find({
        collection: "orders",
        where: {
          and: [
            { booking: { equals: settleBookingId } },
            { paymentStatus: { equals: "tab" } },
          ],
        },
        limit: 500,
      });
      await Promise.all(
        open.docs.map((o) =>
          p.update({
            collection: "orders",
            id: o.id,
            data: { paymentStatus: "paid" },
          })
        )
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[mollie-webhook]", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
