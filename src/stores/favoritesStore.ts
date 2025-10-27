import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'react-hot-toast';
import { logError, getUserErrorMessage } from '@/lib/error-handler';

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
        try {
          if (!id || id.trim().length === 0) {
            const errorMsg = 'Product ID is required';
            logError({
              context: 'favoritesStore.addFavorite',
              message: errorMsg,
              level: 'error',
            });
            toast.error(errorMsg);
            throw new Error(errorMsg);
          }
          
          if (!get().productIds.includes(id)) {
            set((state) => ({ productIds: [...state.productIds, id] }));
            toast.success('Added to favorites');
          }
        } catch (error) {
          logError({
            context: 'favoritesStore.addFavorite',
            message: error instanceof Error ? error.message : 'Failed to add to favorites',
            error: error instanceof Error ? error : new Error(String(error)),
            metadata: { id },
          });
          const errorMessage = error instanceof Error ? error.message : '';
          if (!errorMessage.includes('required')) {
            toast.error(getUserErrorMessage(error, 'favoritesStore'));
          }
          throw error;
        }
      },
      removeFavorite: (id) => {
        try {
          if (!id || id.trim().length === 0) {
            const errorMsg = 'Product ID is required';
            logError({
              context: 'favoritesStore.removeFavorite',
              message: errorMsg,
              level: 'error',
            });
            throw new Error(errorMsg);
          }
          
          const wasFavorite = get().productIds.includes(id);
          set((state) => ({ productIds: state.productIds.filter((pid) => pid !== id) }));
          
          if (wasFavorite) {
            toast.success('Removed from favorites');
          }
        } catch (error) {
          logError({
            context: 'favoritesStore.removeFavorite',
            message: error instanceof Error ? error.message : 'Failed to remove from favorites',
            error: error instanceof Error ? error : new Error(String(error)),
            metadata: { id },
          });
          toast.error(getUserErrorMessage(error, 'favoritesStore'));
          throw error;
        }
      },
      isFavorite: (id) => {
        try {
          if (!id || id.trim().length === 0) {
            return false;
          }
          return get().productIds.includes(id);
        } catch (error) {
          logError({
            context: 'favoritesStore.isFavorite',
            message: 'Failed to check favorite status',
            error: error instanceof Error ? error : new Error(String(error)),
            metadata: { id },
            level: 'warn',
          });
          return false;
        }
      },
      toggleFavorite: (id) => {
        try {
          if (!id || id.trim().length === 0) {
            const errorMsg = 'Product ID is required';
            logError({
              context: 'favoritesStore.toggleFavorite',
              message: errorMsg,
              level: 'error',
            });
            throw new Error(errorMsg);
          }
          
          if (get().isFavorite(id)) {
            get().removeFavorite(id);
          } else {
            get().addFavorite(id);
          }
        } catch (error) {
          logError({
            context: 'favoritesStore.toggleFavorite',
            message: 'Failed to toggle favorite',
            error: error instanceof Error ? error : new Error(String(error)),
            metadata: { id },
          });
          toast.error(getUserErrorMessage(error, 'favoritesStore'));
          throw error;
        }
      },
    }),
    { name: 'favorites-storage' }
  )
);

