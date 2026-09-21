import type { D1Database, R2Bucket } from '@cloudflare/workers-types';

declare global {
  namespace App {
    interface Platform {
      env: {
        DB: D1Database;
        PRODUCT_MEDIA: R2Bucket;
        SESSION_SECRET: string;
        GOOGLE_CLIENT_ID: string;
        GOOGLE_CLIENT_SECRET: string;
        GOOGLE_REDIRECT_URL: string;
        ADMIN_BOOTSTRAP_EMAIL: string;
        ADMIN_BOOTSTRAP_PASSWORD: string;
      };
    }
    interface Locals {
      user: null | { id: string; name: string; email: string; isAdmin: boolean };
    }
  }
}

export {};