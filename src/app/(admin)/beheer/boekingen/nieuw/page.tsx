import { requireAdmin } from "@/lib/admin/auth";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { BookingForm } from "@/components/admin/BookingForm";
import { createBooking } from "../actions";

export default async function NieuweBoekingPage() {
  await requireAdmin();

  async function action(formData: FormData) {
    "use server";
    return createBooking(formData);
  }

  return (
    <>
      <PageHeader title="Nieuwe boeking" description="Voer een gast handmatig in" />
      <BookingForm mode="create" action={action} />
    </>
  );
}
