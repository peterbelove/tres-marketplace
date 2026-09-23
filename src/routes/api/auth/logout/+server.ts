import { redirect } from '@sveltejs/kit';
import { mustGetDB } from '$lib/server/db';

export const POST = async ({ platform, cookies }) => {
  const db = mustGetDB(platform);
  const sid = cookies.get('sid');

  if (sid) {
    await db.prepare(`DELETE FROM sessions WHERE id = ?`).bind(sid).run();
    cookies.delete('sid', { path: '/' });
  }

  throw redirect(303, '/');
};