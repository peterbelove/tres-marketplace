import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, url }) => {
  // Allow the login page to be visited by anyone
  if (url.pathname === '/admin/login') {
    return {};
  }

  // Block everything else unless admin
  if (!locals.user?.isAdmin) {
    const next = url.pathname + url.search;
    throw redirect(303, `/admin/login?next=${encodeURIComponent(next)}`);
  }

  return {};
};