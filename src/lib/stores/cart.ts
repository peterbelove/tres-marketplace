import { browser } from '$app/environment';
import { writable, derived } from 'svelte/store';

export type CartItem = {
  id: number;
  name: string;
  slug: string;
  price_kobo: number;
  qty: number;
};

const KEY = 'tres_cart_v1';

function load(): CartItem[] {
  if (!browser) return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

function save(items: CartItem[]) {
  if (!browser) return;
  localStorage.setItem(KEY, JSON.stringify(items));
}

function createCart() {
  const { subscribe, set, update } = writable<CartItem[]>(load());

  // persist on every change (in browser only)
  if (browser) subscribe((items) => save(items));

  return {
    subscribe,

    add(item: Omit<CartItem, 'qty'>, qty: number = 1) {
      update((items) => {
        const found = items.find((x) => x.id === item.id);
        if (found) {
          found.qty += qty;
          return [...items];
        }
        return [...items, { ...item, qty }];
      });
    },

    remove(id: number) {
      update((items) => items.filter((x) => x.id !== id));
    },

    setQty(id: number, qty: number) {
      update((items) => {
        const n = Math.max(1, Math.floor(qty || 1));
        return items.map((x) => (x.id === id ? { ...x, qty: n } : x));
      });
    },

    clear() {
      set([]);
    }
  };
}

export const cart = createCart();

export const cartCount = derived(cart, ($cart) => $cart.reduce((sum, x) => sum + x.qty, 0));
export const cartSubtotalKobo = derived(cart, ($cart) => $cart.reduce((sum, x) => sum + x.price_kobo * x.qty, 0));