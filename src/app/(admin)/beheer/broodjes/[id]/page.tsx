import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin/auth";
import { getDoc, listDocs } from "@/lib/admin/data";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { BreadForm, type BreadFormValues } from "@/components/admin/BreadForm";
import { updateBread, deleteBread } from "../actions";

type Media = { id: string; alt?: string; filename?: string };
type BreadItem = Omit<BreadFormValues, "image"> & {
  id: string;
  image?: { id: string } | string | null;
};

export default async function BewerkBroodjePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;

  const [doc, media] = await Promise.all([
    getDoc<BreadItem>("bread-items", id),
    listDocs<Media>("media", { sort: "-createdAt", limit: 200 }),
  ]);

  if (!doc) notFound();

  const mediaOptions = media.map((m) => ({
    id: String(m.id),
    label: m.alt || m.filename || String(m.id),
  }));

  const imageId =
    typeof doc.image === "object" && doc.image ? String(doc.image.id) : (doc.image ?? null);

  const initial: BreadFormValues = {
    name: doc.name,
    description: doc.description,
    price: doc.price,
    image: imageId,
    category: doc.category,
    order: doc.order,
    active: doc.active,
  };

  const updateAction = updateBread.bind(null, id);
  const deleteAction = deleteBread.bind(null, id);

  return (
    <>
      <PageHeader title={doc.name ?? "Broodje bewerken"} description="Bewerk dit broodje" />
      <BreadForm
        mode="edit"
        initial={initial}
        mediaOptions={mediaOptions}
        action={updateAction}
        deleteAction={deleteAction}
      />
    </>
  );
}
