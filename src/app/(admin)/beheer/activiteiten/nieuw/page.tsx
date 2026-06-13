import { requireAdmin } from "@/lib/admin/auth";
import { listDocs } from "@/lib/admin/data";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { ActivityForm } from "@/components/admin/ActivityForm";
import { createActivity } from "../actions";

export const dynamic = "force-dynamic";

type Media = { id: string; alt?: string; filename?: string };

export default async function NieuweActiviteitPage() {
  await requireAdmin();
  const media = await listDocs<Media>("media", { sort: "-createdAt", limit: 200 });
  const mediaOptions = media.map((m) => ({
    id: String(m.id),
    label: m.alt || m.filename || String(m.id),
  }));

  async function action(formData: FormData) {
    "use server";
    return createActivity(formData);
  }

  return (
    <>
      <PageHeader title="Nieuwe activiteit" description="Voeg een activiteit toe aan het programma" />
      <ActivityForm mode="create" mediaOptions={mediaOptions} action={action} />
    </>
  );
}
