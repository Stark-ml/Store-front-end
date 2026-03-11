import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useFavoritesStore = create(
  persist(
    (set, get) => ({
      favorites: [],

      addToFavorites: (product) =>
        set((state) => {
          const exists = state.favorites.find((item) => item.id === product.id);
          if (exists) return state;
          return { favorites: [...state.favorites, product] };
        }),

      removeFromFavorites: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((item) => item.id !== id),
        })),

      toggleFavorite: (product) => {
        const exists = get().favorites.find((item) => item.id === product.id);
        if (exists) {
          get().removeFromFavorites(product.id);
        } else {
          get().addToFavorites(product);
        }
      },

      isFavorite: (id) => {
        return get().favorites.some((item) => item.id === id);
      },

      clearFavorites: () => set({ favorites: [] }),
    }),
    {
      name: "favorites-storage",
    }
  )
);
