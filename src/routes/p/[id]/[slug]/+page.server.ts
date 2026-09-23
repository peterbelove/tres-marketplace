import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

type Product = {
  id: number;
  name: string;
  slug: string;
  brand: string | null;
  description: string | null;
  specs_json: string | null;
  price_kobo: number;
  stock_qty: number;
  main_image_key: string | null;
  category_id: number;
  subcategory_id: number | null;
};

export const load: PageServerLoad = async ({ platform, params }) => {
  const db = platform?.env?.DB;
  if (!db) return { product: null as any, specs: null as any };

  const id = Number(params.id);
  if (!Number.isFinite(id)) throw error(400, 'Invalid product id');

  const res = await db
    .prepare(
      `SELECT id, name, slug, brand, description, specs_json, price_kobo, stock_qty, main_image_key, category_id, subcategory_id
       FROM products
       WHERE id = ?
       LIMIT 1`
    )
    .bind(id)
    .all<Product>();

  const product = res.results?.[0];
  if (!product) throw error(404, 'Product not found');

  // If URL slug is wrong, redirect to the correct SEO URL
  if (params.slug !== product.slug) {
    throw redirect(302, `/p/${product.id}/${product.slug}`);
  }

  let specs: Record<string, unknown> | null = null;
  try {
    specs = product.specs_json ? JSON.parse(product.specs_json) : null;
  } catch {
    specs = null;
  }

  return { product, specs };
};