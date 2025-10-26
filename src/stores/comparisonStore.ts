import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '@/types';

interface ComparisonStore {
  products: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
  clearComparison: () => void;
  isComparing: (productId: string) => boolean;
  canAdd: () => boolean;
}

const MAX_COMPARISON_ITEMS = 4;

export const useComparisonStore = create<ComparisonStore>()(
  persist(
    (set, get) => ({
      products: [],
      addProduct: (product) => {
        const products = get().products;
        if (products.length >= MAX_COMPARISON_ITEMS) {
          return;
        }
        if (products.find((p) => p.id === product.id)) {
          return;
        }
        set((state) => ({
          products: [...state.products, product],
        }));
      },
      removeProduct: (productId) => {
        set((state) => ({
          products: state.products.filter((p) => p.id !== productId),
        }));
      },
      clearComparison: () => {
        set({ products: [] });
      },
      isComparing: (productId) => {
        return get().products.some((p) => p.id === productId);
      },
      canAdd: () => {
        return get().products.length < MAX_COMPARISON_ITEMS;
      },
    }),
    {
      name: 'comparison-storage',
    }
  )
);

