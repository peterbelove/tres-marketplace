import type { PageServerLoad } from './$types';

type Cat = { id: number; name: string; icon: string | null; parent_id: number | null; sort_order: number };

export const load: PageServerLoad = async ({ platform }) => {
  // In live Cloudflare Pages, DB exists. In local "vite dev" it may be missing.
  const db = platform?.env?.DB;
  if (!db) return { categories: [] as Array<{ parent: Cat; subs: Cat[] }> };

  const parents = await db
    .prepare(`SELECT id, name, icon, parent_id, sort_order FROM categories WHERE parent_id IS NULL ORDER BY sort_order`)
    .all<Cat>();

  const subs = await db
    .prepare(
      `SELECT id, name, icon, parent_id, sort_order
       FROM categories
       WHERE parent_id IS NOT NULL
       ORDER BY parent_id, sort_order`
    )
    .all<Cat>();

  const parentRows = parents.results ?? [];
  const subRows = subs.results ?? [];

  return {
    categories: parentRows.map((p) => ({
      parent: p,
      subs: subRows.filter((s) => s.parent_id === p.id)
    }))
  };
};