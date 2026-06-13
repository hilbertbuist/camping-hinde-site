import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin/auth";
import { getDoc } from "@/lib/admin/data";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { SupplierForm, type SupplierFormValues } from "@/components/admin/SupplierForm";
import { updateSupplier, deleteSupplier } from "../actions";

export const dynamic = "force-dynamic";

type Supplier = SupplierFormValues & { id: string };

export default async function BewerkLeverancierPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;

  const doc = await getDoc<Supplier>("suppliers", id);
  if (!doc) notFound();

  const initial: SupplierFormValues = {
    name: doc.name,
    email: doc.email,
    mailTime: doc.mailTime,
    orderDeadline: doc.orderDeadline,
    ccOwner: doc.ccOwner,
    active: doc.active,
    notes: doc.notes,
  };

  async function action(formData: FormData) {
    "use server";
    return updateSupplier(id, formData);
  }

  async function remove() {
    "use server";
    return deleteSupplier(id);
  }

  return (
    <>
      <PageHeader title={doc.name ?? "Leverancier bewerken"} description="Bewerk deze leverancier" />
      <SupplierForm mode="edit" initial={initial} action={action} deleteAction={remove} />
    </>
  );
}
