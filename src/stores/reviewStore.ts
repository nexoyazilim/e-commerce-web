import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'react-hot-toast';
import { logError, getUserErrorMessage } from '@/lib/error-handler';

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
  reviewsByProduct: Map<string, Review[]>;
  rebuildReviewsMap: (reviews: Review[]) => Map<string, Review[]>;
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
      reviewsByProduct: new Map(),
      rebuildReviewsMap: (reviews: Review[]) => {
        const map = new Map<string, Review[]>();
        reviews.forEach(review => {
          const existing = map.get(review.productId) || [];
          map.set(review.productId, [...existing, review]);
        });
        return map;
      },
      addReview: (review) => {
        try {
          // Validate review data
          if (!review.productId || review.productId.trim().length === 0) {
            const errorMsg = 'Product ID is required';
            logError({
              context: 'reviewStore.addReview',
              message: errorMsg,
              level: 'error',
            });
            toast.error(errorMsg);
            throw new Error(errorMsg);
          }
          
          if (!review.userId || review.userId.trim().length === 0) {
            const errorMsg = 'User ID is required';
            logError({
              context: 'reviewStore.addReview',
              message: errorMsg,
              level: 'error',
            });
            toast.error(errorMsg);
            throw new Error(errorMsg);
          }
          
          if (!review.userName || review.userName.trim().length === 0) {
            const errorMsg = 'User name is required';
            logError({
              context: 'reviewStore.addReview',
              message: errorMsg,
              level: 'error',
            });
            toast.error(errorMsg);
            throw new Error(errorMsg);
          }
          
          if (!review.rating || review.rating < 1 || review.rating > 5) {
            const errorMsg = 'Rating must be between 1 and 5';
            logError({
              context: 'reviewStore.addReview',
              message: errorMsg,
              metadata: { rating: review.rating },
            });
            toast.error('Please provide a rating between 1 and 5 stars');
            throw new Error(errorMsg);
          }
          
          if (!review.title || review.title.trim().length === 0) {
            const errorMsg = 'Review title is required';
            logError({
              context: 'reviewStore.addReview',
              message: errorMsg,
            });
            toast.error('Review title is required');
            throw new Error(errorMsg);
          }
          
          if (review.title.length > 200) {
            const errorMsg = 'Review title is too long (max 200 characters)';
            logError({
              context: 'reviewStore.addReview',
              message: errorMsg,
              metadata: { titleLength: review.title.length },
            });
            toast.error('Review title is too long (max 200 characters)');
            throw new Error(errorMsg);
          }
          
          if (!review.comment || review.comment.trim().length === 0) {
            const errorMsg = 'Review comment is required';
            logError({
              context: 'reviewStore.addReview',
              message: errorMsg,
            });
            toast.error('Review comment is required');
            throw new Error(errorMsg);
          }
          
          if (review.comment.length > 2000) {
            const errorMsg = 'Review comment is too long (max 2000 characters)';
            logError({
              context: 'reviewStore.addReview',
              message: errorMsg,
              metadata: { commentLength: review.comment.length },
            });
            toast.error('Review comment is too long (max 2000 characters)');
            throw new Error(errorMsg);
          }
          
          const newReview: Review = {
            ...review,
            id: `review_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            helpful: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          
          set((state) => {
            const newReviews = [...state.reviews, newReview];
            return {
              reviews: newReviews,
              reviewsByProduct: get().rebuildReviewsMap(newReviews),
            };
          });
          
          toast.success('Review added successfully');
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to add review';
          logError({
            context: 'reviewStore.addReview',
            message: errorMessage,
            error: error instanceof Error ? error : new Error(String(error)),
            metadata: { review },
          });
          // Only show toast if not already shown
          if (!errorMessage.includes('required') && !errorMessage.includes('long') && !errorMessage.includes('between')) {
            toast.error(getUserErrorMessage(error, 'reviewStore'));
          }
          throw error;
        }
      },
      updateReview: (id, updates) => {
        try {
          // Validate rating if being updated
          if (updates.rating !== undefined && (updates.rating < 1 || updates.rating > 5)) {
            const errorMsg = 'Rating must be between 1 and 5';
            logError({
              context: 'reviewStore.updateReview',
              message: errorMsg,
              metadata: { id, rating: updates.rating },
            });
            toast.error('Rating must be between 1 and 5');
            throw new Error(errorMsg);
          }
          
          // Validate title if being updated
          if (updates.title !== undefined) {
            if (updates.title.trim().length === 0) {
              const errorMsg = 'Review title is required';
              logError({
                context: 'reviewStore.updateReview',
                message: errorMsg,
              });
              toast.error(errorMsg);
              throw new Error(errorMsg);
            }
            if (updates.title.length > 200) {
              const errorMsg = 'Review title is too long (max 200 characters)';
              logError({
                context: 'reviewStore.updateReview',
                message: errorMsg,
              });
              toast.error(errorMsg);
              throw new Error(errorMsg);
            }
          }
          
          // Validate comment if being updated
          if (updates.comment !== undefined) {
            if (updates.comment.trim().length === 0) {
              const errorMsg = 'Review comment is required';
              logError({
                context: 'reviewStore.updateReview',
                message: errorMsg,
              });
              toast.error(errorMsg);
              throw new Error(errorMsg);
            }
            if (updates.comment.length > 2000) {
              const errorMsg = 'Review comment is too long (max 2000 characters)';
              logError({
                context: 'reviewStore.updateReview',
                message: errorMsg,
              });
              toast.error(errorMsg);
              throw new Error(errorMsg);
            }
          }
          
          set((state) => {
            const newReviews = state.reviews.map((review) =>
              review.id === id
                ? { ...review, ...updates, updatedAt: new Date().toISOString() }
                : review
            );
            return {
              reviews: newReviews,
              reviewsByProduct: get().rebuildReviewsMap(newReviews),
            };
          });
          
          toast.success('Review updated successfully');
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to update review';
          logError({
            context: 'reviewStore.updateReview',
            message: errorMessage,
            error: error instanceof Error ? error : new Error(String(error)),
            metadata: { id, updates },
          });
          // Only show toast if not already shown
          if (!errorMessage.includes('required') && !errorMessage.includes('long') && !errorMessage.includes('between')) {
            toast.error(getUserErrorMessage(error, 'reviewStore'));
          }
          throw error;
        }
      },
      deleteReview: (id) => {
        try {
          if (!id || id.trim().length === 0) {
            const errorMsg = 'Review ID is required for deletion';
            logError({
              context: 'reviewStore.deleteReview',
              message: errorMsg,
              level: 'error',
            });
            toast.error(errorMsg);
            throw new Error(errorMsg);
          }
          
          set((state) => {
            const newReviews = state.reviews.filter((review) => review.id !== id);
            return {
              reviews: newReviews,
              reviewsByProduct: get().rebuildReviewsMap(newReviews),
            };
          });
          
          toast.success('Review deleted successfully');
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to delete review';
          logError({
            context: 'reviewStore.deleteReview',
            message: errorMessage,
            error: error instanceof Error ? error : new Error(String(error)),
            metadata: { id },
          });
          toast.error(getUserErrorMessage(error, 'reviewStore'));
          throw error;
        }
      },
      getReviewsByProduct: (productId) => {
        return get().reviewsByProduct.get(productId) || [];
      },
      getAverageRating: (productId) => {
        const reviews = get().getReviewsByProduct(productId);
        if (reviews.length === 0) return 0;
        const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
        return sum / reviews.length;
      },
      toggleHelpful: (id) => {
        set((state) => {
          const newReviews = state.reviews.map((review) =>
            review.id === id
              ? { ...review, helpful: review.helpful + 1 }
              : review
          );
          return {
            reviews: newReviews,
            reviewsByProduct: get().rebuildReviewsMap(newReviews),
          };
        });
      },
    }),
    {
      name: 'review-storage',
    }
  )
);

