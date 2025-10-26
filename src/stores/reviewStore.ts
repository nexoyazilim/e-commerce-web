import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  helpful: number;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ReviewStore {
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'createdAt' | 'updatedAt' | 'helpful'>) => void;
  updateReview: (id: string, updates: Partial<Review>) => void;
  deleteReview: (id: string) => void;
  getReviewsByProduct: (productId: string) => Review[];
  getAverageRating: (productId: string) => number;
  toggleHelpful: (id: string) => void;
}

export const useReviewStore = create<ReviewStore>()(
  persist(
    (set, get) => ({
      reviews: [],
      addReview: (review) => {
        const newReview: Review = {
          ...review,
          id: `review_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          helpful: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set((state) => ({
          reviews: [...state.reviews, newReview],
        }));
      },
      updateReview: (id, updates) => {
        set((state) => ({
          reviews: state.reviews.map((review) =>
            review.id === id
              ? { ...review, ...updates, updatedAt: new Date().toISOString() }
              : review
          ),
        }));
      },
      deleteReview: (id) => {
        set((state) => ({
          reviews: state.reviews.filter((review) => review.id !== id),
        }));
      },
      getReviewsByProduct: (productId) => {
        return get().reviews.filter((review) => review.productId === productId);
      },
      getAverageRating: (productId) => {
        const reviews = get().getReviewsByProduct(productId);
        if (reviews.length === 0) return 0;
        const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
        return sum / reviews.length;
      },
      toggleHelpful: (id) => {
        set((state) => ({
          reviews: state.reviews.map((review) =>
            review.id === id
              ? { ...review, helpful: review.helpful + 1 }
              : review
          ),
        }));
      },
    }),
    {
      name: 'review-storage',
    }
  )
);

