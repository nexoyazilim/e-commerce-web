import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SearchHistoryItem {
  query: string;
  timestamp: number;
}

interface SearchTrend {
  term: string;
  count: number;
}

interface SearchStore {
  history: SearchHistoryItem[];
  trending: SearchTrend[];
  addToHistory: (query: string) => void;
  clearHistory: () => void;
  removeFromHistory: (query: string) => void;
  getRecentSearches: (limit?: number) => SearchHistoryItem[];
}

export const useSearchStore = create<SearchStore>()(
  persist(
    (set, get) => ({
      history: [],
      trending: [
        { term: 'laptop', count: 120 },
        { term: 'phone', count: 95 },
        { term: 'headphones', count: 78 },
        { term: 'smartwatch', count: 62 },
        { term: 'camera', count: 45 },
      ],
      addToHistory: (query) => {
        const trimmedQuery = query.trim();
        if (!trimmedQuery) return;
        
        set((state) => {
          // Remove existing entry if it exists
          const filteredHistory = state.history.filter((item) => item.query !== trimmedQuery);
          
          // Add new entry at the beginning
          const newHistory = [
            { query: trimmedQuery, timestamp: Date.now() },
            ...filteredHistory,
          ].slice(0, 10); // Keep only last 10
          
          return { history: newHistory };
        });
      },
      clearHistory: () => {
        set({ history: [] });
      },
      removeFromHistory: (query) => {
        set((state) => ({
          history: state.history.filter((item) => item.query !== query),
        }));
      },
      getRecentSearches: (limit = 5) => {
        return get().history.slice(0, limit);
      },
    }),
    {
      name: 'search-storage',
    }
  )
);

