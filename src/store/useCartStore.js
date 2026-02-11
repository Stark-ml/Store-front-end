import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      carts: [],

      addToCart: (product) =>
        set((state) => {
          const existingItem = state.carts.find(
            (item) => item.id === product.id
          );

          if (existingItem) {
            return {
              carts: state.carts.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }

          return {
            carts: [...state.carts, { ...product, quantity: 1 }],
          };
        }),

      removeFromCart: (id) =>
        set((state) => ({
          carts: state.carts.filter((item) => item.id !== id),
        })),

      updateQuantity: (id, quantity) =>
        set((state) => ({
          carts: state.carts.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        })),

      clearCart: () => set({ carts: [] }),

      getTotal: () => {
        return get().carts.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
    }),
    {
      name: "cart-storage",
    }
  )
);