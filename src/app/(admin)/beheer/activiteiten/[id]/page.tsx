import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin/auth";
import { getDoc, listDocs } from "@/lib/admin/data";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { ActivityForm, type ActivityFormValues } from "@/components/admin/ActivityForm";
import { updateActivity, deleteActivity } from "../actions";

export const dynamic = "force-dynamic";

type Media = { id: string; alt?: string; filename?: string };
type Activity = Omit<ActivityFormValues, "image"> & {
  id: string;
  image?: { id: string } | string | null;
};

export default async function BewerkActiviteitPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;

  const [doc, media] = await Promise.all([
    getDoc<Activity>("activities", id),
    listDocs<Media>("media", { sort: "-createdAt", limit: 200 }),
  ]);

  if (!doc) notFound();

  const mediaOptions = media.map((m) => ({
    id: String(m.id),
    label: m.alt || m.filename || String(m.id),
  }));

  const imageId =
    typeof doc.image === "object" && doc.image ? String(doc.image.id) : (doc.image ?? null);

  // date-only input expects YYYY-MM-DD
  const dateValue = doc.date ? String(doc.date).split("T")[0] : "";

  const initial: ActivityFormValues = {
    title: doc.title,
    description: doc.description,
    date: dateValue,
    startTime: doc.startTime,
    endTime: doc.endTime,
    location: doc.location,
    image: imageId,
    order: doc.order,
    active: doc.active,
  };

  async function action(formData: FormData) {
    "use server";
    return updateActivity(id, formData);
  }

  async function remove() {
    "use server";
    return deleteActivity(id);
  }

  return (
    <>
      <PageHeader title={doc.title ?? "Activiteit bewerken"} description="Bewerk deze activiteit" />
      <ActivityForm
        mode="edit"
        initial={initial}
        mediaOptions={mediaOptions}
        action={action}
        deleteAction={remove}
      />
    </>
  );
}
