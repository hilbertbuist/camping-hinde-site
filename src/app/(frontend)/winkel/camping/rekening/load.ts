"use server";

import { payload } from "@/lib/payload";

export async function fetchOpenTab(bookingId: string) {
  try {
    const p = await payload();
    const result = await p.find({
      collection: "orders",
      where: {
        and: [
          { booking: { equals: Number(bookingId) } },
          { paymentStatus: { equals: "tab" } },
        ],
      },
      limit: 200,
      sort: "-createdAt",
    });
    return result.docs.map((o) => {
      const items = o.type === "bread" ? o.breadItems ?? [] : o.shopItems ?? [];
      const summary = items
        .map((i: { name: string; quantity: number }) => `${i.quantity}× ${i.name}`)
        .join(", ");
      return {
        id: String(o.id),
        type: o.type,
        total: o.total,
        createdAt: String(o.createdAt),
        itemSummary: summary,
      };
    });
  } catch {
    return [];
  }
}
