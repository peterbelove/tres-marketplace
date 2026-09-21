import type { Handle } from '@sveltejs/kit';
import { one } from '$lib/server/db';

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.user = null;

  const db = event.platform?.env?.DB; // may be missing when using "vite dev"
  const sid = event.cookies.get('sid');

  // If we don't have DB (local dev) or no cookie, just continue
  if (!db || !sid) {
    return resolve(event);
  }

  const session = await one<any>(
    await db
      .prepare(
        `SELECT s.id as sid, s.expires_at, c.id as id, c.name, c.email, c.is_admin
         FROM sessions s JOIN customers c ON c.id = s.customer_id
         WHERE s.id = ? LIMIT 1`
      )
      .bind(sid)
      .all()
  );

  if (session && new Date(session.expires_at as string).getTime() > Date.now()) {
    event.locals.user = {
      id: session.id as string,
      name: session.name as string,
      email: session.email as string,
      isAdmin: Boolean(session.is_admin)
    };
  } else {
    event.cookies.delete('sid', { path: '/' });
  }

  return resolve(event);
};