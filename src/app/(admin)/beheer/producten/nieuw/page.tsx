import { requireAdmin } from "@/lib/admin/auth";
import { listDocs } from "@/lib/admin/data";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { ProductForm } from "@/components/admin/ProductForm";
import { createProduct } from "../actions";

export const dynamic = "force-dynamic";

type Category = { id: string; name?: string };
type Media = { id: string; alt?: string; filename?: string };

export default async function NieuwProductPage() {
  await requireAdmin();

  const [categories, media] = await Promise.all([
    listDocs<Category>("product-categories", { sort: "order" }),
    listDocs<Media>("media", { sort: "-createdAt", limit: 200 }),
  ]);

  const categoryOptions = categories.map((c) => ({ id: c.id, label: c.name ?? c.id }));
  const mediaOptions = media.map((m) => ({ id: m.id, label: m.alt || m.filename || m.id }));

  async function action(formData: FormData) {
    "use server";
    await createProduct(formData);
  }

  return (
    <div>
      <PageHeader title="Nieuw product" description="Voeg een product toe aan je winkel" />
      <ProductForm
        mode="create"
        categoryOptions={categoryOptions}
        mediaOptions={mediaOptions}
        action={action}
      />
    </div>
  );
}
