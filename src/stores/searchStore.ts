import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'react-hot-toast';
import { logError } from '@/lib/error-handler';

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
        try {
          const trimmedQuery = query.trim();
          if (!trimmedQuery) {
            logError({
              context: 'searchStore.addToHistory',
              message: 'Empty query provided',
              level: 'warn',
            });
            return;
          }
          
          if (trimmedQuery.length > 100) {
            const errorMsg = 'Search query is too long (max 100 characters)';
            logError({
              context: 'searchStore.addToHistory',
              message: errorMsg,
              metadata: { queryLength: trimmedQuery.length },
            });
            toast.error('Search query is too long');
            throw new Error(errorMsg);
          }
          
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
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to add to search history';
          logError({
            context: 'searchStore.addToHistory',
            message: errorMessage,
            error: error instanceof Error ? error : new Error(String(error)),
            metadata: { query },
          });
          // Don't show toast for empty query warnings
          if (errorMessage.includes('long')) {
            toast.error(errorMessage);
          }
          throw error;
        }
      },
      clearHistory: () => {
        try {
          set({ history: [] });
          toast.success('Search history cleared');
        } catch (error) {
          logError({
            context: 'searchStore.clearHistory',
            message: 'Failed to clear search history',
            error: error instanceof Error ? error : new Error(String(error)),
            level: 'warn',
          });
        }
      },
      removeFromHistory: (query) => {
        try {
          if (!query || query.trim().length === 0) {
            logError({
              context: 'searchStore.removeFromHistory',
              message: 'Empty query provided for removal',
              level: 'warn',
            });
            return;
          }
          
          set((state) => ({
            history: state.history.filter((item) => item.query !== query),
          }));
        } catch (error) {
          logError({
            context: 'searchStore.removeFromHistory',
            message: 'Failed to remove from search history',
            error: error instanceof Error ? error : new Error(String(error)),
            metadata: { query },
            level: 'warn',
          });
        }
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

