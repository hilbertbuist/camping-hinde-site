import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin/auth";
import { listDocs, getDoc } from "@/lib/admin/data";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { CategoryForm, type CategoryFormValues } from "@/components/admin/CategoryForm";
import { updateCategory, deleteCategory } from "../actions";

export const dynamic = "force-dynamic";

type Media = { id: string; alt?: string; filename?: string };
type Category = {
  id: string;
  name?: string;
  slug?: string;
  description?: string;
  icon?: string;
  color?: string;
  image?: { id: string } | string | null;
  order?: number;
  active?: boolean;
};

function relId(value: { id: string } | string | null | undefined): string | null {
  if (!value) return null;
  return typeof value === "string" ? value : value.id;
}

export default async function BewerkCategoriePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;

  const [category, media] = await Promise.all([
    getDoc<Category>("product-categories", id, 0),
    listDocs<Media>("media", { sort: "-createdAt", limit: 200 }),
  ]);

  if (!category) notFound();

  const mediaOptions = media.map((m) => ({ id: m.id, label: m.alt || m.filename || m.id }));

  const initial: CategoryFormValues = {
    name: category.name,
    slug: category.slug,
    description: category.description,
    icon: category.icon,
    color: category.color,
    image: relId(category.image),
    order: category.order,
    active: category.active,
  };

  async function action(formData: FormData) {
    "use server";
    await updateCategory(id, formData);
  }

  async function remove() {
    "use server";
    await deleteCategory(id);
  }

  return (
    <div>
      <PageHeader title="Categorie bewerken" description={category.name ?? ""} />
      <CategoryForm
        mode="edit"
        initial={initial}
        mediaOptions={mediaOptions}
        action={action}
        deleteAction={remove}
      />
    </div>
  );
}
