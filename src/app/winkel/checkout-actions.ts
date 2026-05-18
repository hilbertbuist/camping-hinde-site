"use server";

import { headers } from "next/headers";
import { payload } from "@/lib/payload";
import { getMollie, isMollieConfigured } from "@/lib/mollie";

export type CreateOrderResult = {
  ok: boolean;
  error?: string;
  orderId?: string;
  redirectUrl?: string;
};

type CartItemInput = {
  productId: string;
  name: string;
  price: number;
  unit: string;
  quantity: number;
};

type BreadItemInput = {
  itemId: string;
  name: string;
  price: number;
  quantity: number;
};

export async function createShopOrder(
  formData: FormData
): Promise<CreateOrderResult> {
  const mode = String(formData.get("mode") ?? "passant") as "passant" | "camper";
  const paymentMethod = String(formData.get("paymentMethod") ?? "mollie") as
    | "mollie"
    | "tab";
  const itemsRaw = String(formData.get("items") ?? "[]");
  const bookingId = String(formData.get("bookingId") ?? "") || undefined;
  const guestEmail = String(formData.get("guestEmail") ?? "") || undefined;

  let items: CartItemInput[] = [];
  try {
    items = JSON.parse(itemsRaw);
  } catch {
    return { ok: false, error: "Ongeldig mandje." };
  }
  if (items.length === 0) {
    return { ok: false, error: "Mandje is leeg." };
  }
  if (paymentMethod === "tab" && (mode !== "camper" || !bookingId)) {
    return {
      ok: false,
      error: "Op rekening kan alleen als je als camper bent ingelogd.",
    };
  }

  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);

  try {
    const p = await payload();

    const order = await p.create({
      collection: "orders",
      data: {
        type: "shop",
        guestType: mode === "camper" ? "camper" : "passant",
        booking: bookingId ? Number(bookingId) : undefined,
        shopItems: items.map((i) => ({
          product: Number(i.productId),
          quantity: i.quantity,
          priceAtPurchase: i.price,
          name: i.name,
        })),
        total,
        paymentMethod,
        paymentStatus: paymentMethod === "tab" ? "tab" : "open",
        guestEmail,
      },
    });

    if (paymentMethod === "tab") {
      return { ok: true, orderId: String(order.id) };
    }

    // Mollie payment
    if (!isMollieConfigured()) {
      // Dev mode: skip Mollie, mark as paid directly
      await p.update({
        collection: "orders",
        id: order.id,
        data: { paymentStatus: "paid" },
      });
      return { ok: true, orderId: String(order.id) };
    }

    const mollie = getMollie();
    if (!mollie) {
      return { ok: false, error: "Betaalprovider niet beschikbaar." };
    }

    const headersList = await headers();
    const host = headersList.get("host") ?? "localhost:3000";
    const proto = host.includes("localhost") ? "http" : "https";
    const baseUrl = `${proto}://${host}`;

    const payment = await mollie.payments.create({
      amount: { currency: "EUR", value: total.toFixed(2) },
      description: `Bestelling De Hinde #${order.id}`,
      redirectUrl: `${baseUrl}/winkel/bedankt?id=${order.id}`,
      webhookUrl: `${baseUrl}/api/mollie-webhook`,
      metadata: { orderId: String(order.id) },
    });

    await p.update({
      collection: "orders",
      id: order.id,
      data: {
        molliePaymentId: payment.id,
        molliePaymentUrl: payment.getCheckoutUrl() ?? undefined,
      },
    });

    return {
      ok: true,
      orderId: String(order.id),
      redirectUrl: payment.getCheckoutUrl() ?? undefined,
    };
  } catch (err) {
    console.error("[checkout]", err);
    return { ok: false, error: "Er ging iets mis bij het verwerken." };
  }
}

export async function createBreadOrder(
  formData: FormData
): Promise<CreateOrderResult> {
  const paymentMethod = String(formData.get("paymentMethod") ?? "mollie") as
    | "mollie"
    | "tab";
  const itemsRaw = String(formData.get("items") ?? "[]");
  const bookingId = String(formData.get("bookingId") ?? "");
  const deliveryDate = String(formData.get("deliveryDate") ?? "");

  if (!bookingId) {
    return {
      ok: false,
      error: "Broodjes bestellen kan alleen als ingelogde camper.",
    };
  }
  if (!deliveryDate) {
    return { ok: false, error: "Bezorgdatum ontbreekt." };
  }

  let items: BreadItemInput[] = [];
  try {
    items = JSON.parse(itemsRaw);
  } catch {
    return { ok: false, error: "Ongeldige bestelling." };
  }
  if (items.length === 0) {
    return { ok: false, error: "Selecteer minstens één broodje." };
  }

  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);

  try {
    const p = await payload();
    const order = await p.create({
      collection: "orders",
      data: {
        type: "bread",
        guestType: "camper",
        booking: Number(bookingId),
        breadItems: items.map((i) => ({
          item: Number(i.itemId),
          quantity: i.quantity,
          priceAtPurchase: i.price,
          name: i.name,
        })),
        deliveryDate,
        total,
        paymentMethod,
        paymentStatus: paymentMethod === "tab" ? "tab" : "open",
      },
    });

    if (paymentMethod === "tab") {
      return { ok: true, orderId: String(order.id) };
    }

    if (!isMollieConfigured()) {
      await p.update({
        collection: "orders",
        id: order.id,
        data: { paymentStatus: "paid" },
      });
      return { ok: true, orderId: String(order.id) };
    }

    const mollie = getMollie();
    if (!mollie) {
      return { ok: false, error: "Betaalprovider niet beschikbaar." };
    }
    const headersList = await headers();
    const host = headersList.get("host") ?? "localhost:3000";
    const proto = host.includes("localhost") ? "http" : "https";
    const baseUrl = `${proto}://${host}`;

    const payment = await mollie.payments.create({
      amount: { currency: "EUR", value: total.toFixed(2) },
      description: `Broodjes morgen — De Hinde #${order.id}`,
      redirectUrl: `${baseUrl}/winkel/bedankt?id=${order.id}`,
      webhookUrl: `${baseUrl}/api/mollie-webhook`,
      metadata: { orderId: String(order.id) },
    });

    await p.update({
      collection: "orders",
      id: order.id,
      data: {
        molliePaymentId: payment.id,
        molliePaymentUrl: payment.getCheckoutUrl() ?? undefined,
      },
    });

    return {
      ok: true,
      orderId: String(order.id),
      redirectUrl: payment.getCheckoutUrl() ?? undefined,
    };
  } catch (err) {
    console.error("[bread checkout]", err);
    return { ok: false, error: "Er ging iets mis bij het verwerken." };
  }
}

export async function payOpenTab(formData: FormData): Promise<CreateOrderResult> {
  const bookingId = String(formData.get("bookingId") ?? "");
  if (!bookingId) {
    return { ok: false, error: "Geen boeking gekoppeld." };
  }

  try {
    const p = await payload();
    const open = await p.find({
      collection: "orders",
      where: {
        and: [
          { booking: { equals: Number(bookingId) } },
          { paymentStatus: { equals: "tab" } },
        ],
      },
      limit: 200,
    });

    if (open.docs.length === 0) {
      return { ok: false, error: "Er staat niets open." };
    }

    const total = open.docs.reduce((sum, o) => sum + o.total, 0);

    if (!isMollieConfigured()) {
      await Promise.all(
        open.docs.map((o) =>
          p.update({
            collection: "orders",
            id: o.id,
            data: { paymentStatus: "paid" },
          })
        )
      );
      return { ok: true };
    }

    const mollie = getMollie();
    if (!mollie) {
      return { ok: false, error: "Betaalprovider niet beschikbaar." };
    }
    const headersList = await headers();
    const host = headersList.get("host") ?? "localhost:3000";
    const proto = host.includes("localhost") ? "http" : "https";
    const baseUrl = `${proto}://${host}`;

    const payment = await mollie.payments.create({
      amount: { currency: "EUR", value: total.toFixed(2) },
      description: `Rekening afrekenen — De Hinde`,
      redirectUrl: `${baseUrl}/winkel/camping/menu`,
      webhookUrl: `${baseUrl}/api/mollie-webhook?settle=${bookingId}`,
      metadata: { bookingId, orderIds: open.docs.map((o) => String(o.id)).join(",") },
    });

    return {
      ok: true,
      redirectUrl: payment.getCheckoutUrl() ?? undefined,
    };
  } catch (err) {
    console.error("[pay tab]", err);
    return { ok: false, error: "Er ging iets mis." };
  }
}
