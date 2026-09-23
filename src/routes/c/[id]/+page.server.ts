import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

type Cat = { id: number; name: string; icon: string | null; parent_id: number | null; sort_order: number };

type Product = {
  id: number;
  name: string;
  slug: string;
  price_kobo: number;
  stock_qty: number;
  main_image_key: string | null;
};

export const load: PageServerLoad = async ({ platform, params }) => {
  const db = platform?.env?.DB;

  if (!db) {
    return { category: null as any, parent: null as any, children: [] as Cat[], products: [] as Product[] };
  }

  const id = Number(params.id);
  if (!Number.isFinite(id)) throw error(400, 'Invalid category id');

  const categoryRes = await db
    .prepare(`SELECT id, name, icon, parent_id, sort_order FROM categories WHERE id = ? LIMIT 1`)
    .bind(id)
    .all<Cat>();

  const category = categoryRes.results?.[0];
  if (!category) throw error(404, 'Category not found');

  let parent: Cat | null = null;
  if (category.parent_id) {
    const parentRes = await db
      .prepare(`SELECT id, name, icon, parent_id, sort_order FROM categories WHERE id = ? LIMIT 1`)
      .bind(category.parent_id)
      .all<Cat>();
    parent = parentRes.results?.[0] ?? null;
  }

  const childrenRes = await db
    .prepare(
      `SELECT id, name, icon, parent_id, sort_order
       FROM categories
       WHERE parent_id = ?
       ORDER BY sort_order`
    )
    .bind(category.id)
    .all<Cat>();

  const whereColumn = category.parent_id ? 'subcategory_id' : 'category_id';

  const productsRes = await db
    .prepare(
      `SELECT id, name, slug, price_kobo, stock_qty, main_image_key
       FROM products
       WHERE ${whereColumn} = ?
       ORDER BY created_at DESC
       LIMIT 50`
    )
    .bind(category.id)
    .all<Product>();

  return {
    category,
    parent,
    children: childrenRes.results ?? [],
    products: productsRes.results ?? []
  };
};