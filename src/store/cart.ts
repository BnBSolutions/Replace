import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartLine, Money, Product } from '@/types';

type CartStore = {
  lines: CartLine[];
  addItem: (product: Product, qty?: number) => void;
  updateQty: (productId: string, qty: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  getTotal: () => Money;
  getItemCount: () => number;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      lines: [],

      addItem: (product, qty = 1) => {
        set((state) => {
          const existing = state.lines.find((l) => l.productId === product.id);
          
          if (existing) {
            return {
              lines: state.lines.map((l) =>
                l.productId === product.id
                  ? {
                      ...l,
                      qty: l.qty + qty,
                      total: {
                        ...l.total,
                        amount: (l.qty + qty) * l.unitPrice.amount,
                      },
                    }
                  : l
              ),
            };
          }

          return {
            lines: [
              ...state.lines,
              {
                productId: product.id,
                qty,
                unitPrice: product.price,
                total: {
                  ...product.price,
                  amount: product.price.amount * qty,
                },
              },
            ],
          };
        });
      },

      updateQty: (productId, qty) => {
        if (qty <= 0) {
          get().removeItem(productId);
          return;
        }

        set((state) => ({
          lines: state.lines.map((l) =>
            l.productId === productId
              ? {
                  ...l,
                  qty,
                  total: {
                    ...l.total,
                    amount: qty * l.unitPrice.amount,
                  },
                }
              : l
          ),
        }));
      },

      removeItem: (productId) => {
        set((state) => ({
          lines: state.lines.filter((l) => l.productId !== productId),
        }));
      },

      clearCart: () => {
        set({ lines: [] });
      },

      getTotal: () => {
        const lines = get().lines;
        if (lines.length === 0) {
          return { amount: 0, currency: 'MDL' };
        }

        const total = lines.reduce((sum, line) => sum + line.total.amount, 0);
        return { amount: total, currency: lines[0].total.currency };
      },

      getItemCount: () => {
        return get().lines.reduce((sum, line) => sum + line.qty, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
