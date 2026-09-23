import { error, redirect } from '@sveltejs/kit';
import { mustGetDB, one } from '$lib/server/db';
import { hashPassword, newId, verifyPassword } from '$lib/server/auth';

export const POST = async ({ request, platform, cookies }) => {
  const db = mustGetDB(platform);

  const form = await request.formData();
  const email = String(form.get('email') ?? '').trim().toLowerCase();
  const password = String(form.get('password') ?? '');
  const next = String(form.get('next') ?? '/admin');

  if (!email || !password) throw error(400, 'Email and password are required');

  // Find existing user
  const existing = await one<any>(
    await db
      .prepare(`SELECT id, email, name, password_hash, is_admin FROM customers WHERE email = ? LIMIT 1`)
      .bind(email)
      .all()
  );

  let user = existing;

  // If user not found, allow "bootstrap admin" ONLY if no admin exists yet
  if (!user) {
    const adminCountRow = await one<any>(
      await db.prepare(`SELECT COUNT(*) as n FROM customers WHERE is_admin = 1`).all()
    );
    const adminCount = Number(adminCountRow?.n ?? 0);

    const bootstrapEmail = platform?.env?.ADMIN_BOOTSTRAP_EMAIL;
    const bootstrapPassword = platform?.env?.ADMIN_BOOTSTRAP_PASSWORD;

    const canBootstrap =
      adminCount === 0 &&
      bootstrapEmail &&
      bootstrapPassword &&
      email === String(bootstrapEmail).trim().toLowerCase() &&
      password === String(bootstrapPassword);

    if (!canBootstrap) {
      throw error(401, 'Invalid login');
    }

    const id = newId('cus');
    const password_hash = await hashPassword(password);

    await db
      .prepare(
        `INSERT INTO customers (id, name, email, auth_provider, password_hash, is_admin)
         VALUES (?, ?, ?, 'email', ?, 1)`
      )
      .bind(id, 'Admin', email, password_hash)
      .run();

    user = { id, email, name: 'Admin', is_admin: 1 };
  } else {
    // Normal login: verify password
    if (!user.password_hash) throw error(401, 'Account has no password set');
    const ok = await verifyPassword(password, String(user.password_hash));
    if (!ok) throw error(401, 'Invalid login');
  }

  // Create session
  const sid = newId('sid');
  const expires = new Date(Date.now() + 30 * 24 * 3600 * 1000); // 30 days

  await db
    .prepare(`INSERT INTO sessions (id, customer_id, expires_at) VALUES (?, ?, ?)`)
    .bind(sid, user.id, expires.toISOString())
    .run();

  const secure = true; // Pages is HTTPS
  cookies.set('sid', sid, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure,
    maxAge: 30 * 24 * 3600
  });

  throw redirect(303, next.startsWith('/') ? next : '/admin');
};