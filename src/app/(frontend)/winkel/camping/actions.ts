"use server";

import type { Where } from "payload";
import { payload } from "@/lib/payload";

export type GuestSession = {
  bookingId: string;
  reference: string;
  guestName: string;
  campsiteNumber?: string;
  arrival: string;
  departure: string;
};

export type VerifyResult = {
  ok: boolean;
  error?: string;
  booking?: GuestSession;
};

export async function verifyBooking(formData: FormData): Promise<VerifyResult> {
  const mode = String(formData.get("mode") ?? "site");
  const bookingRef = String(formData.get("bookingRef") ?? "").trim();
  const siteNumber = String(formData.get("siteNumber") ?? "").trim();
  const lastName = String(formData.get("lastName") ?? "").trim();

  if (!lastName) {
    return { ok: false, error: "Vul je achternaam in." };
  }
  if (mode === "site" && !siteNumber) {
    return { ok: false, error: "Vul je plaatsnummer in." };
  }
  if (mode === "booking" && !bookingRef) {
    return { ok: false, error: "Vul je boekingsnummer in." };
  }

  try {
    const p = await payload();
    const conditions: Where[] =
      mode === "booking"
        ? [
            { reference: { equals: bookingRef } },
            { guestLastName: { like: lastName } },
            { status: { in: ["active", "upcoming"] } },
          ]
        : [
            { campsiteNumber: { equals: siteNumber } },
            { guestLastName: { like: lastName } },
            { status: { equals: "active" } },
          ];

    const result = await p.find({
      collection: "bookings",
      where: { and: conditions },
      limit: 1,
    });

    if (result.docs.length === 0) {
      return {
        ok: false,
        error:
          "Geen actieve boeking gevonden met deze gegevens. Controleer je achternaam en nummer, of vraag aan de receptie.",
      };
    }

    const b = result.docs[0];
    return {
      ok: true,
      booking: {
        bookingId: String(b.id),
        reference: b.reference,
        guestName: b.guestName,
        campsiteNumber: b.campsiteNumber ?? undefined,
        arrival: String(b.arrival),
        departure: String(b.departure),
      },
    };
  } catch {
    return {
      ok: false,
      error: "Er is iets misgegaan. Probeer het later opnieuw.",
    };
  }
}
