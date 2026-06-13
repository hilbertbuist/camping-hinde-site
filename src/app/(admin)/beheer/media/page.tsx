import { requireAdmin } from "@/lib/admin/auth";
import { listDocs } from "@/lib/admin/data";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { MediaLibrary, type MediaItem } from "@/components/admin/MediaLibrary";

export const dynamic = "force-dynamic";

export default async function MediaPage() {
  await requireAdmin();

  const items = await listDocs<MediaItem>("media", { sort: "-createdAt", limit: 200 });

  return (
    <>
      <PageHeader
        title="Mediabibliotheek"
        description="Foto's uploaden en hergebruiken. Worden automatisch bijgesneden en geoptimaliseerd."
      />
      <MediaLibrary items={items} />
    </>
  );
}
