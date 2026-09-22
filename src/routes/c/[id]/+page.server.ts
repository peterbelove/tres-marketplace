import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

type Cat = { id: number; name: string; icon: string | null; parent_id: number | null; sort_order: number };

export const load: PageServerLoad = async ({ platform, params }) => {
  const db = platform?.env?.DB;

  // In local dev (vite dev), DB may not exist
  if (!db) {
    return { category: null as any, parent: null as any, children: [] as Cat[] };
  }

  const id = Number(params.id);
  if (!Number.isFinite(id)) throw error(400, 'Invalid category id');

  const categoryRes = await db
    .prepare(`SELECT id, name, icon, parent_id, sort_order FROM categories WHERE id = ? LIMIT 1`)
    .bind(id)
    .all<Cat>();

  const category = categoryRes.results?.[0];
  if (!category) throw error(404, 'Category not found');

  // If this is a subcategory, load its parent
  let parent: Cat | null = null;
  if (category.parent_id) {
    const parentRes = await db
      .prepare(`SELECT id, name, icon, parent_id, sort_order FROM categories WHERE id = ? LIMIT 1`)
      .bind(category.parent_id)
      .all<Cat>();
    parent = parentRes.results?.[0] ?? null;
  }

  // Load children (subcategories) if this is a parent category
  const childrenRes = await db
    .prepare(
      `SELECT id, name, icon, parent_id, sort_order
       FROM categories
       WHERE parent_id = ?
       ORDER BY sort_order`
    )
    .bind(category.id)
    .all<Cat>();

  return {
    category,
    parent,
    children: childrenRes.results ?? []
  };
};