import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoritesStore {
  productIds: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      productIds: [],
      addFavorite: (id) => {
        if (!get().productIds.includes(id)) {
          set((state) => ({ productIds: [...state.productIds, id] }));
        }
      },
      removeFavorite: (id) =>
        set((state) => ({ productIds: state.productIds.filter((pid) => pid !== id) })),
      isFavorite: (id) => get().productIds.includes(id),
      toggleFavorite: (id) => {
        if (get().isFavorite(id)) {
          get().removeFavorite(id);
        } else {
          get().addFavorite(id);
        }
      },
    }),
    { name: 'favorites-storage' }
  )
);

