import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/data/products";

// ---------------- Cart ----------------
export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  qty: number;
  color?: string;
  size?: string;
}

interface CartState {
  items: CartItem[];
  open: boolean;
  add: (p: Product, opts?: { qty?: number; color?: string; size?: string }) => void;
  remove: (id: string) => void;
  update: (id: string, qty: number) => void;
  clear: () => void;
  setOpen: (v: boolean) => void;
  total: () => number;
  count: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      open: false,
      add: (p, opts) =>
        set((s) => {
          const existing = s.items.find((i) => i.productId === p.id);
          if (existing) {
            return {
              items: s.items.map((i) =>
                i.productId === p.id ? { ...i, qty: i.qty + (opts?.qty ?? 1) } : i
              ),
              open: true,
            };
          }
          return {
            items: [
              ...s.items,
              {
                productId: p.id,
                name: p.name,
                price: p.price,
                image: p.images[0],
                qty: opts?.qty ?? 1,
                color: opts?.color,
                size: opts?.size,
              },
            ],
            open: true,
          };
        }),
      remove: (id) => set((s) => ({ items: s.items.filter((i) => i.productId !== id) })),
      update: (id, qty) =>
        set((s) => ({
          items: s.items.map((i) => (i.productId === id ? { ...i, qty: Math.max(1, qty) } : i)),
        })),
      clear: () => set({ items: [] }),
      setOpen: (open) => set({ open }),
      total: () => get().items.reduce((sum, i) => sum + i.price * i.qty, 0),
      count: () => get().items.reduce((sum, i) => sum + i.qty, 0),
    }),
    { name: "luxora-cart" }
  )
);

// ---------------- Wishlist ----------------
interface WishlistState {
  ids: string[];
  toggle: (id: string) => void;
  has: (id: string) => boolean;
}
export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) =>
        set((s) => ({ ids: s.ids.includes(id) ? s.ids.filter((x) => x !== id) : [...s.ids, id] })),
      has: (id) => get().ids.includes(id),
    }),
    { name: "luxora-wishlist" }
  )
);

// ---------------- Private access ----------------
interface PrivateAuthState {
  unlocked: boolean;
  unlock: (password: string) => boolean;
  lock: () => void;
}

export const useAdminPasswords = create<{
  passwords: Array<{ id: string; value: string; label: string; enabled: boolean; expires?: string; uses: number; maxUses?: number; notes?: string }>;
  add: (p: { value: string; label: string; notes?: string; maxUses?: number; expires?: string }) => void;
  update: (id: string, patch: Partial<{ value: string; label: string; enabled: boolean; expires: string; maxUses: number; notes: string }>) => void;
  remove: (id: string) => void;
  validate: (v: string) => boolean;
}>()(
  persist(
    (set, get) => ({
      passwords: [
        { id: "pw-1", value: "LUXORA2026", label: "VIP Preview", enabled: true, uses: 12, notes: "Given to top clients" },
        { id: "pw-2", value: "PRIVATE888", label: "Diwali Launch", enabled: true, uses: 4, maxUses: 50 },
      ],
      add: (p) =>
        set((s) => ({
          passwords: [
            ...s.passwords,
            { id: `pw-${Date.now()}`, value: p.value, label: p.label, enabled: true, uses: 0, notes: p.notes, maxUses: p.maxUses, expires: p.expires },
          ],
        })),
      update: (id, patch) =>
        set((s) => ({ passwords: s.passwords.map((p) => (p.id === id ? { ...p, ...patch } : p)) })),
      remove: (id) => set((s) => ({ passwords: s.passwords.filter((p) => p.id !== id) })),
      validate: (v) => {
        const p = get().passwords.find((x) => x.enabled && x.value.toLowerCase() === v.toLowerCase());
        if (!p) return false;
        if (p.expires && new Date(p.expires) < new Date()) return false;
        if (p.maxUses && p.uses >= p.maxUses) return false;
        set((s) => ({ passwords: s.passwords.map((x) => (x.id === p.id ? { ...x, uses: x.uses + 1 } : x)) }));
        return true;
      },
    }),
    { name: "luxora-passwords" }
  )
);

export const usePrivateAuth = create<PrivateAuthState>()(
  persist(
    (set) => ({
      unlocked: false,
      unlock: (password) => {
        const ok = useAdminPasswords.getState().validate(password);
        if (ok) set({ unlocked: true });
        return ok;
      },
      lock: () => set({ unlocked: false }),
    }),
    { name: "luxora-private-auth" }
  )
);
