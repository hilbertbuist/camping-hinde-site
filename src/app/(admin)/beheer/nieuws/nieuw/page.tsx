import { requireAdmin } from "@/lib/admin/auth";
import { listDocs } from "@/lib/admin/data";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { NewsForm } from "@/components/admin/NewsForm";
import { createNews } from "../actions";

export const dynamic = "force-dynamic";

type Media = { id: string; alt?: string; filename?: string };

export default async function NieuwBerichtPage() {
  await requireAdmin();
  const media = await listDocs<Media>("media", { sort: "-createdAt", limit: 200 });
  const mediaOptions = media.map((m) => ({
    id: String(m.id),
    label: m.alt || m.filename || String(m.id),
  }));

  async function action(formData: FormData) {
    "use server";
    return createNews(formData);
  }

  return (
    <>
      <PageHeader title="Nieuw bericht" description="Plaats een nieuwsbericht voor gasten" />
      <NewsForm mode="create" mediaOptions={mediaOptions} action={action} />
    </>
  );
}
