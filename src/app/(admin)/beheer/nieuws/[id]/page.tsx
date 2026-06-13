import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin/auth";
import { getDoc, listDocs } from "@/lib/admin/data";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { NewsForm, type NewsFormValues } from "@/components/admin/NewsForm";
import { updateNews, deleteNews } from "../actions";

export const dynamic = "force-dynamic";

type Media = { id: string; alt?: string; filename?: string };
type NewsItem = Omit<NewsFormValues, "image"> & {
  id: string;
  image?: { id: string } | string | null;
};

export default async function BewerkBerichtPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;

  const [doc, media] = await Promise.all([
    getDoc<NewsItem>("news", id),
    listDocs<Media>("media", { sort: "-createdAt", limit: 200 }),
  ]);

  if (!doc) notFound();

  const mediaOptions = media.map((m) => ({
    id: String(m.id),
    label: m.alt || m.filename || String(m.id),
  }));

  const imageId =
    typeof doc.image === "object" && doc.image ? String(doc.image.id) : (doc.image ?? null);

  const dateValue = doc.date ? String(doc.date).split("T")[0] : "";

  const initial: NewsFormValues = {
    title: doc.title,
    excerpt: doc.excerpt,
    body: doc.body,
    date: dateValue,
    image: imageId,
    published: doc.published,
    pinned: doc.pinned,
  };

  async function action(formData: FormData) {
    "use server";
    return updateNews(id, formData);
  }

  async function remove() {
    "use server";
    return deleteNews(id);
  }

  return (
    <>
      <PageHeader title={doc.title ?? "Bericht bewerken"} description="Bewerk dit nieuwsbericht" />
      <NewsForm
        mode="edit"
        initial={initial}
        mediaOptions={mediaOptions}
        action={action}
        deleteAction={remove}
      />
    </>
  );
}
