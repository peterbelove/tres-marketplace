import type { PageServerLoad } from './$types';

type ProductRow = {
  id: number;
  name: string;
  slug: string;
  price_kobo: number;
  stock_qty: number;
};

export const load: PageServerLoad = async ({ platform, url }) => {
  const q = (url.searchParams.get('q') || '').trim();
  const db = platform?.env?.DB;

  if (!db || q.length < 2) {
    return { q, results: [] as ProductRow[] };
  }

  const like = `%${q}%`;

  const res = await db
    .prepare(
      `SELECT id, name, slug, price_kobo, stock_qty
       FROM products
       WHERE name LIKE ? OR brand LIKE ? OR specs_json LIKE ?
       ORDER BY created_at DESC
       LIMIT 50`
    )
    .bind(like, like, like)
    .all<ProductRow>();

  return { q, results: res.results ?? [] };
};