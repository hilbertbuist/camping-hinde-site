import { requireAdmin } from "@/lib/admin/auth";
import { listDocs } from "@/lib/admin/data";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { BreadForm } from "@/components/admin/BreadForm";
import { createBread } from "../actions";

type Media = { id: string; alt?: string; filename?: string };

export default async function NieuwBroodjePage() {
  await requireAdmin();
  const media = await listDocs<Media>("media", { sort: "-createdAt", limit: 200 });
  const mediaOptions = media.map((m) => ({
    id: String(m.id),
    label: m.alt || m.filename || String(m.id),
  }));

  return (
    <>
      <PageHeader title="Nieuw broodje" description="Voeg een item toe aan het bestelmenu" />
      <BreadForm mode="create" mediaOptions={mediaOptions} action={createBread} />
    </>
  );
}
