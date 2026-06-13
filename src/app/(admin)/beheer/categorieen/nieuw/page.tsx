import { requireAdmin } from "@/lib/admin/auth";
import { listDocs } from "@/lib/admin/data";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { CategoryForm } from "@/components/admin/CategoryForm";
import { createCategory } from "../actions";

export const dynamic = "force-dynamic";

type Media = { id: string; alt?: string; filename?: string; url?: string; sizes?: { thumbnail?: { url?: string } } };

export default async function NieuweCategoriePage() {
  await requireAdmin();

  const media = await listDocs<Media>("media", { sort: "-createdAt", limit: 200 });
  const mediaOptions = media.map((m) => ({
    id: m.id,
    label: m.alt || m.filename || m.id,
    url: m.sizes?.thumbnail?.url ?? m.url,
  }));

  async function action(formData: FormData) {
    "use server";
    return createCategory(formData);
  }

  return (
    <div>
      <PageHeader title="Nieuwe categorie" description="Voeg een categorie toe aan je winkel" />
      <CategoryForm mode="create" mediaOptions={mediaOptions} action={action} />
    </div>
  );
}
