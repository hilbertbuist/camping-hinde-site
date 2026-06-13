import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin/auth";
import { getDoc } from "@/lib/admin/data";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { BookingForm, type BookingFormValues } from "@/components/admin/BookingForm";
import { updateBooking, deleteBooking } from "../actions";

type Booking = BookingFormValues & { id: string };

export default async function BewerkBoekingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const doc = await getDoc<Booking>("bookings", id, 0);
  if (!doc) notFound();

  const initial: BookingFormValues = {
    reference: doc.reference,
    guestName: doc.guestName,
    guestLastName: doc.guestLastName,
    email: doc.email,
    phone: doc.phone,
    campsiteNumber: doc.campsiteNumber,
    arrival: doc.arrival,
    departure: doc.departure,
    guests: doc.guests,
    status: doc.status,
    notes: doc.notes,
  };

  const updateAction = updateBooking.bind(null, id);
  const deleteAction = deleteBooking.bind(null, id);

  return (
    <>
      <PageHeader
        title={[doc.guestName, doc.guestLastName].filter(Boolean).join(" ") || "Boeking bewerken"}
        description="Bewerk deze boeking"
      />
      <BookingForm
        mode="edit"
        initial={initial}
        action={updateAction}
        deleteAction={deleteAction}
      />
    </>
  );
}
