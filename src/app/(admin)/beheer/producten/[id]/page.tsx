import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin/auth";
import { listDocs, getDoc } from "@/lib/admin/data";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { ProductForm, type ProductFormValues } from "@/components/admin/ProductForm";
import { updateProduct, deleteProduct } from "../actions";

export const dynamic = "force-dynamic";

type Category = { id: string; name?: string };
type Media = { id: string; alt?: string; filename?: string; url?: string; sizes?: { thumbnail?: { url?: string } } };
type Product = {
  id: string;
  name?: string;
  slug?: string;
  category?: { id: string } | string | null;
  description?: string;
  image?: { id: string } | string | null;
  price?: number;
  unit?: string;
  stock?: number;
  trackStock?: boolean;
  active?: boolean;
  supplier?: string;
};

function relId(value: { id: string } | string | null | undefined): string | null {
  if (!value) return null;
  return typeof value === "string" ? value : value.id;
}

export default async function BewerkProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;

  const [product, categories, media] = await Promise.all([
    getDoc<Product>("products", id, 0),
    listDocs<Category>("product-categories", { sort: "order" }),
    listDocs<Media>("media", { sort: "-createdAt", limit: 200 }),
  ]);

  if (!product) notFound();

  const categoryOptions = categories.map((c) => ({ id: c.id, label: c.name ?? c.id }));
  const mediaOptions = media.map((m) => ({
    id: m.id,
    label: m.alt || m.filename || m.id,
    url: m.sizes?.thumbnail?.url ?? m.url,
  }));

  const imageId = relId(product.image);
  const imageUrl = imageId
    ? mediaOptions.find((m) => String(m.id) === String(imageId))?.url ?? null
    : null;

  const initial: ProductFormValues = {
    name: product.name,
    slug: product.slug,
    category: relId(product.category),
    description: product.description,
    image: imageId,
    imageUrl,
    price: product.price,
    unit: product.unit,
    stock: product.stock,
    trackStock: product.trackStock,
    active: product.active,
    supplier: product.supplier,
  };

  async function action(formData: FormData) {
    "use server";
    return updateProduct(id, formData);
  }

  async function remove() {
    "use server";
    return deleteProduct(id);
  }

  return (
    <div>
      <PageHeader title="Product bewerken" description={product.name ?? ""} />
      <ProductForm
        mode="edit"
        initial={initial}
        categoryOptions={categoryOptions}
        mediaOptions={mediaOptions}
        action={action}
        deleteAction={remove}
      />
    </div>
  );
}
