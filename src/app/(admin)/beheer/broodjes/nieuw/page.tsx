import { requireAdmin } from "@/lib/admin/auth";
import { listDocs } from "@/lib/admin/data";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { BreadForm } from "@/components/admin/BreadForm";
import { createBread } from "../actions";

type Media = { id: string; alt?: string; filename?: string; url?: string; sizes?: { thumbnail?: { url?: string } } };

export default async function NieuwBroodjePage() {
  await requireAdmin();
  const media = await listDocs<Media>("media", { sort: "-createdAt", limit: 200 });
  const mediaOptions = media.map((m) => ({
    id: String(m.id),
    label: m.alt || m.filename || String(m.id),
    url: m.sizes?.thumbnail?.url ?? m.url,
  }));

  async function action(formData: FormData) {
    "use server";
    return createBread(formData);
  }

  return (
    <>
      <PageHeader title="Nieuw broodje" description="Voeg een item toe aan het bestelmenu" />
      <BreadForm mode="create" mediaOptions={mediaOptions} action={action} />
    </>
  );
}
