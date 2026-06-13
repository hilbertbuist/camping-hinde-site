import "server-only";
import { payload } from "@/lib/payload";

/**
 * Server-only data helpers for the custom admin dashboard.
 * Thin wrappers over the Payload Local API. All read helpers fail gracefully
 * (return [] / null) so a single bad query never crashes a dashboard page.
 */

export async function listDocs<T = any>(
  collection: string,
  opts?: { where?: any; sort?: string; limit?: number; depth?: number },
): Promise<T[]> {
  try {
    const p = await payload();
    const result = await p.find({
      collection: collection as any,
      where: opts?.where,
      sort: opts?.sort,
      limit: opts?.limit ?? 100,
      depth: opts?.depth ?? 1,
    });
    return result.docs as T[];
  } catch (err) {
    console.error(`[admin/data] listDocs("${collection}") failed:`, err);
    return [];
  }
}

export async function getDoc<T = any>(
  collection: string,
  id: string,
  depth?: number,
): Promise<T | null> {
  try {
    const p = await payload();
    const doc = await p.findByID({
      collection: collection as any,
      id,
      depth: depth ?? 1,
    });
    return (doc as T) ?? null;
  } catch (err) {
    console.error(`[admin/data] getDoc("${collection}", "${id}") failed:`, err);
    return null;
  }
}

export async function createDoc(collection: string, data: any): Promise<{ id: string }> {
  const p = await payload();
  const doc = await p.create({ collection: collection as any, data });
  return { id: String((doc as { id: string | number }).id) };
}

export async function updateDoc(collection: string, id: string, data: any): Promise<void> {
  const p = await payload();
  await p.update({ collection: collection as any, id, data });
}

export async function deleteDoc(collection: string, id: string): Promise<void> {
  const p = await payload();
  await p.delete({ collection: collection as any, id });
}

/**
 * Convenience count helper for dashboard overview cards.
 * Returns 0 on error.
 */
export async function countDocs(collection: string, where?: any): Promise<number> {
  try {
    const p = await payload();
    const result = await p.count({ collection: collection as any, where });
    return result.totalDocs;
  } catch (err) {
    console.error(`[admin/data] countDocs("${collection}") failed:`, err);
    return 0;
  }
}
