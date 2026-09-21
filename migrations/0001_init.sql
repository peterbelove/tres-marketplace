PRAGMA foreign_keys = ON;

-- Sellers (single-seller now, multi-vendor later)
CREATE TABLE IF NOT EXISTS sellers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL
);

INSERT OR IGNORE INTO sellers (id, name) VALUES ('tres', 'TRES Engineering');

-- Categories (two-level via parent_id)
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  parent_id INTEGER NULL REFERENCES categories(id) ON DELETE CASCADE,
  icon TEXT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  UNIQUE(name, parent_id)
);

-- Products
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  seller_id TEXT NOT NULL REFERENCES sellers(id),
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  brand TEXT NULL,
  category_id INTEGER NOT NULL REFERENCES categories(id),
  subcategory_id INTEGER NULL REFERENCES categories(id),
  specs_json TEXT NULL, -- JSON
  description TEXT NULL,
  price_kobo INTEGER NOT NULL,
  stock_qty INTEGER NOT NULL DEFAULT 0,
  main_image_key TEXT NULL,
  additional_images_json TEXT NULL, -- JSON array up to 5
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);

CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id, subcategory_id);
CREATE INDEX IF NOT EXISTS idx_products_created ON products(created_at);

-- Full-text search (name, brand, specs)
CREATE VIRTUAL TABLE IF NOT EXISTS products_fts
USING fts5(name, brand, specs, content='products', content_rowid='id');

CREATE TRIGGER IF NOT EXISTS products_ai AFTER INSERT ON products BEGIN
  INSERT INTO products_fts(rowid, name, brand, specs)
  VALUES (new.id, new.name, COALESCE(new.brand,''), COALESCE(new.specs_json,''));
END;

CREATE TRIGGER IF NOT EXISTS products_ad AFTER DELETE ON products BEGIN
  INSERT INTO products_fts(products_fts, rowid, name, brand, specs)
  VALUES('delete', old.id, old.name, COALESCE(old.brand,''), COALESCE(old.specs_json,''));
END;

CREATE TRIGGER IF NOT EXISTS products_au AFTER UPDATE ON products BEGIN
  INSERT INTO products_fts(products_fts, rowid, name, brand, specs)
  VALUES('delete', old.id, old.name, COALESCE(old.brand,''), COALESCE(old.specs_json,''));
  INSERT INTO products_fts(rowid, name, brand, specs)
  VALUES (new.id, new.name, COALESCE(new.brand,''), COALESCE(new.specs_json,''));
END;

-- Customers
CREATE TABLE IF NOT EXISTS customers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT NULL,
  addresses_json TEXT NULL, -- JSON array
  auth_provider TEXT NOT NULL CHECK (auth_provider IN ('email','google')),
  password_hash TEXT NULL,  -- email auth only
  google_sub TEXT NULL UNIQUE,
  loyalty_points INTEGER NOT NULL DEFAULT 0,
  is_admin INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);

-- Sessions
CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  customer_id TEXT NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);

CREATE INDEX IF NOT EXISTS idx_sessions_customer ON sessions(customer_id);

-- Wishlist
CREATE TABLE IF NOT EXISTS wishlist_items (
  customer_id TEXT NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  PRIMARY KEY(customer_id, product_id)
);

-- Orders
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  seller_id TEXT NOT NULL REFERENCES sellers(id),
  customer_id TEXT NULL REFERENCES customers(id),
  customer_snapshot_json TEXT NOT NULL, -- name/email/phone
  address_json TEXT NOT NULL, -- chosen delivery address
  items_json TEXT NOT NULL, -- array snapshot for portability
  subtotal_kobo INTEGER NOT NULL,
  discount_kobo INTEGER NOT NULL DEFAULT 0,
  total_kobo INTEGER NOT NULL,
  points_redeemed INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL CHECK (status IN ('pending','confirmed','shipped','delivered','cancelled')) DEFAULT 'pending',
  payment_method TEXT NOT NULL CHECK (payment_method IN ('whatsapp','bank_transfer')),
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);

CREATE TABLE IF NOT EXISTS order_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id TEXT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL,
  unit_price_kobo INTEGER NOT NULL,
  name_snapshot TEXT NOT NULL,
  image_snapshot_key TEXT NULL
);

CREATE INDEX IF NOT EXISTS idx_order_items_product ON order_items(product_id);

-- Reviews (verified purchase enforced in server logic)
CREATE TABLE IF NOT EXISTS reviews (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  order_id TEXT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  customer_id TEXT NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title TEXT NULL,
  body TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  UNIQUE(product_id, customer_id)
);

-- Settings (admin-editable)
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value_json TEXT NOT NULL
);