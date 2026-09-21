import type { D1Database } from '@cloudflare/workers-types';

export type DB = D1Database;

export function mustGetDB(platform: App.Platform | undefined): D1Database {
  const db = platform?.env?.DB;
  if (!db) throw new Error('Missing D1 binding: DB');
  return db;
}

// D1 result types can vary; this helper safely grabs the first row.
export async function one<T>(res: any): Promise<T | null> {
  return (res?.results?.[0] as T) ?? null;
}