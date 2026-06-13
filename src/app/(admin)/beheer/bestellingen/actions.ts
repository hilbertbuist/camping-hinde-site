"use server";

import { revalidatePath } from "next/cache";
import { updateDoc } from "@/lib/admin/data";

const VALID_STATUSES = ["open", "paid", "tab", "failed", "cancelled"] as const;
type PaymentStatus = (typeof VALID_STATUSES)[number];

export async function setPaymentStatus(id: string, status: string) {
  if (!VALID_STATUSES.includes(status as PaymentStatus)) {
    throw new Error(`Ongeldige betaalstatus: ${status}`);
  }
  await updateDoc("orders", id, { paymentStatus: status });
  revalidatePath("/beheer/bestellingen");
  revalidatePath(`/beheer/bestellingen/${id}`);
}
