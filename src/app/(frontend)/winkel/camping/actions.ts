"use server";

import type { Where } from "payload";
import { payload } from "@/lib/payload";

export type GuestSession = {
  bookingId: string;
  reference: string;
  guestName: string;
  campsiteNumber?: string;
  arrival?: string;
  departure?: string;
  /** true wanneer een echte boeking is gevonden; false bij zelf-ingevulde gegevens */
  linked?: boolean;
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
    return { ok: false, error: "Vul je plaatsnummer of veldnaam in." };
  }
  if (mode === "booking" && !bookingRef) {
    return { ok: false, error: "Vul je boekingsnummer in." };
  }

  // Zelf-ingevulde sessie: gebruikt wanneer er (nog) geen gekoppelde boeking is.
  // Zo kunnen gasten deze zomer al broodjes/winkel gebruiken zónder dat de
  // boekingsmodule gevuld of gesynchroniseerd is.
  const selfSession: GuestSession = {
    bookingId: "",
    reference: mode === "booking" ? bookingRef : `Veld ${siteNumber}`,
    guestName: lastName,
    campsiteNumber: mode === "site" ? siteNumber : undefined,
    linked: false,
  };

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

    // Geen koppeling met de boekingsmodule: laat de gast tóch door met de
    // ingevulde gegevens (veldnummer/veldnaam + achternaam).
    if (result.docs.length === 0) {
      return { ok: true, booking: selfSession };
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
        linked: true,
      },
    };
  } catch {
    // Ook bij een storing in de boekingslookup mag de gast verder met de app.
    return { ok: true, booking: selfSession };
  }
}
