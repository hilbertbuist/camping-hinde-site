import { requireAdmin } from "@/lib/admin/auth";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { SupplierForm } from "@/components/admin/SupplierForm";
import { createSupplier } from "../actions";

export const dynamic = "force-dynamic";

export default async function NieuweLeverancierPage() {
  await requireAdmin();

  async function action(formData: FormData) {
    "use server";
    return createSupplier(formData);
  }

  return (
    <>
      <PageHeader title="Nieuwe leverancier" description="Voeg een leverancier toe" />
      <SupplierForm mode="create" action={action} />
    </>
  );
}
