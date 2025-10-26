import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { FilterState } from '@/types';

interface FilterStore extends FilterState {
  updateFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  clearFilters: () => void;
  priceRange: [number, number];
  brands: string[];
  colors: string[];
  sizes: string[];
  rating: number;
  sortBy: string;
  category: string;
}

export const useFilterStore = create<FilterStore>()(
  persist(
    (set) => ({
      viewMode: 'grid',
      priceRange: [0, 2000],
      brands: [],
      colors: [],
      sizes: [],
      rating: 0,
      sortBy: 'popular',
      category: '',
      updateFilter: (key, value) => set({ [key]: value }),
      clearFilters: () =>
        set({
          viewMode: 'grid',
          priceRange: [0, 2000],
          brands: [],
          colors: [],
          sizes: [],
          rating: 0,
          sortBy: 'popular',
          category: '',
        }),
    }),
    { name: 'filter-storage' }
  )
);

