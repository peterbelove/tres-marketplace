PRAGMA foreign_keys = ON;

-- Helper: insert parent categories
INSERT OR IGNORE INTO categories (name, parent_id, icon, sort_order) VALUES
('Solar & Power', NULL, '☀️', 1),
('Batteries & Energy Storage', NULL, '🔋', 2),
('Security & Surveillance', NULL, '📷', 3),
('Smart Automation', NULL, '🏠', 4),
('Electrical Infrastructure', NULL, '⚡', 5),
('Consumables & Small Parts', NULL, '🧰', 6),
('Tools & Test Equipment', NULL, '🛠️', 7),
('Safety & PPE', NULL, '🦺', 8);

-- Subcategories
INSERT OR IGNORE INTO categories (name, parent_id, icon, sort_order)
SELECT 'Solar Panels', c.id, NULL, 1 FROM categories c WHERE c.name='Solar & Power' AND c.parent_id IS NULL;
INSERT OR IGNORE INTO categories (name, parent_id, icon, sort_order)
SELECT 'Inverters', c.id, NULL, 2 FROM categories c WHERE c.name='Solar & Power' AND c.parent_id IS NULL;
INSERT OR IGNORE INTO categories (name, parent_id, icon, sort_order)
SELECT 'Solar Generators', c.id, NULL, 3 FROM categories c WHERE c.name='Solar & Power' AND c.parent_id IS NULL;
INSERT OR IGNORE INTO categories (name, parent_id, icon, sort_order)
SELECT 'Charge Controllers', c.id, NULL, 4 FROM categories c WHERE c.name='Solar & Power' AND c.parent_id IS NULL;
INSERT OR IGNORE INTO categories (name, parent_id, icon, sort_order)
SELECT 'Mounting & Racking Hardware', c.id, NULL, 5 FROM categories c WHERE c.name='Solar & Power' AND c.parent_id IS NULL;

INSERT OR IGNORE INTO categories (name, parent_id, icon, sort_order)
SELECT 'Lithium Batteries', c.id, NULL, 1 FROM categories c WHERE c.name='Batteries & Energy Storage' AND c.parent_id IS NULL;
INSERT OR IGNORE INTO categories (name, parent_id, icon, sort_order)
SELECT 'Tubular Batteries', c.id, NULL, 2 FROM categories c WHERE c.name='Batteries & Energy Storage' AND c.parent_id IS NULL;
INSERT OR IGNORE INTO categories (name, parent_id, icon, sort_order)
SELECT 'Battery Accessories & Monitors', c.id, NULL, 3 FROM categories c WHERE c.name='Batteries & Energy Storage' AND c.parent_id IS NULL;

INSERT OR IGNORE INTO categories (name, parent_id, icon, sort_order)
SELECT 'CCTV Cameras', c.id, NULL, 1 FROM categories c WHERE c.name='Security & Surveillance' AND c.parent_id IS NULL;
INSERT OR IGNORE INTO categories (name, parent_id, icon, sort_order)
SELECT 'Solar CCTV Cameras', c.id, NULL, 2 FROM categories c WHERE c.name='Security & Surveillance' AND c.parent_id IS NULL;
INSERT OR IGNORE INTO categories (name, parent_id, icon, sort_order)
SELECT 'NVR/DVR Systems', c.id, NULL, 3 FROM categories c WHERE c.name='Security & Surveillance' AND c.parent_id IS NULL;
INSERT OR IGNORE INTO categories (name, parent_id, icon, sort_order)
SELECT 'Access Control', c.id, NULL, 4 FROM categories c WHERE c.name='Security & Surveillance' AND c.parent_id IS NULL;
INSERT OR IGNORE INTO categories (name, parent_id, icon, sort_order)
SELECT 'Fire Alarm Systems', c.id, NULL, 5 FROM categories c WHERE c.name='Security & Surveillance' AND c.parent_id IS NULL;
INSERT OR IGNORE INTO categories (name, parent_id, icon, sort_order)
SELECT 'CCTV Accessories', c.id, NULL, 6 FROM categories c WHERE c.name='Security & Surveillance' AND c.parent_id IS NULL;

INSERT OR IGNORE INTO categories (name, parent_id, icon, sort_order)
SELECT 'Smart Home Devices', c.id, NULL, 1 FROM categories c WHERE c.name='Smart Automation' AND c.parent_id IS NULL;
INSERT OR IGNORE INTO categories (name, parent_id, icon, sort_order)
SELECT 'Smart Hotel/Office Automation', c.id, NULL, 2 FROM categories c WHERE c.name='Smart Automation' AND c.parent_id IS NULL;
INSERT OR IGNORE INTO categories (name, parent_id, icon, sort_order)
SELECT 'IoT Sensors & Controllers', c.id, NULL, 3 FROM categories c WHERE c.name='Smart Automation' AND c.parent_id IS NULL;

INSERT OR IGNORE INTO categories (name, parent_id, icon, sort_order)
SELECT 'ATS & Changeover Switches', c.id, NULL, 1 FROM categories c WHERE c.name='Electrical Infrastructure' AND c.parent_id IS NULL;
INSERT OR IGNORE INTO categories (name, parent_id, icon, sort_order)
SELECT 'Cables & Wires', c.id, NULL, 2 FROM categories c WHERE c.name='Electrical Infrastructure' AND c.parent_id IS NULL;
INSERT OR IGNORE INTO categories (name, parent_id, icon, sort_order)
SELECT 'Breakers & Distribution Boards', c.id, NULL, 3 FROM categories c WHERE c.name='Electrical Infrastructure' AND c.parent_id IS NULL;
INSERT OR IGNORE INTO categories (name, parent_id, icon, sort_order)
SELECT 'Switches & Sockets', c.id, NULL, 4 FROM categories c WHERE c.name='Electrical Infrastructure' AND c.parent_id IS NULL;
INSERT OR IGNORE INTO categories (name, parent_id, icon, sort_order)
SELECT 'UPS Systems', c.id, NULL, 5 FROM categories c WHERE c.name='Electrical Infrastructure' AND c.parent_id IS NULL;

INSERT OR IGNORE INTO categories (name, parent_id, icon, sort_order)
SELECT 'Insulation Tape', c.id, NULL, 1 FROM categories c WHERE c.name='Consumables & Small Parts' AND c.parent_id IS NULL;
INSERT OR IGNORE INTO categories (name, parent_id, icon, sort_order)
SELECT 'Cable Ties', c.id, NULL, 2 FROM categories c WHERE c.name='Consumables & Small Parts' AND c.parent_id IS NULL;
INSERT OR IGNORE INTO categories (name, parent_id, icon, sort_order)
SELECT 'Bolts & Nuts', c.id, NULL, 3 FROM categories c WHERE c.name='Consumables & Small Parts' AND c.parent_id IS NULL;
INSERT OR IGNORE INTO categories (name, parent_id, icon, sort_order)
SELECT 'Lugs & Ferrules', c.id, NULL, 4 FROM categories c WHERE c.name='Consumables & Small Parts' AND c.parent_id IS NULL;
INSERT OR IGNORE INTO categories (name, parent_id, icon, sort_order)
SELECT 'MC4 Connectors', c.id, NULL, 5 FROM categories c WHERE c.name='Consumables & Small Parts' AND c.parent_id IS NULL;
INSERT OR IGNORE INTO categories (name, parent_id, icon, sort_order)
SELECT 'Conduits & Trunking', c.id, NULL, 6 FROM categories c WHERE c.name='Consumables & Small Parts' AND c.parent_id IS NULL;
INSERT OR IGNORE INTO categories (name, parent_id, icon, sort_order)
SELECT 'Cable Glands', c.id, NULL, 7 FROM categories c WHERE c.name='Consumables & 