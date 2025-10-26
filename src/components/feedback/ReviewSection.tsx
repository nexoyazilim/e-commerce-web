import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ReviewForm } from './ReviewForm';
import { ReviewCard } from './ReviewCard';
import { EmptyState } from '@/components/common/EmptyState';
import { useReviewStore } from '@/stores/reviewStore';
import { useAuthStore } from '@/stores/authStore';
import { useTranslation } from 'react-i18next';

interface ReviewSectionProps {
  productId: string;
}

export function ReviewSection({ productId }: ReviewSectionProps) {
  const { t } = useTranslation();
  const user = useAuthStore((state) => state.user);
  const reviewStore = useReviewStore();
  const reviews = reviewStore.getReviewsByProduct(productId);
  const toggleHelpful = reviewStore.toggleHelpful;
  const [showReviewForm, setShowReviewForm] = useState(false);

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{t('review.reviews')}</h2>
          <p className="text-muted-foreground">{t('review.totalReviews', { count: reviews.length })}</p>
        </div>
        {user && (
          <Button onClick={() => setShowReviewForm(true)}>
            <Plus className="mr-2 h-4 w-4" />
            {t('review.writeReview')}
          </Button>
        )}
      </div>

      {reviews.length === 0 ? (
        <EmptyState
          icon={MessageSquare}
          title={t('review.noReviews')}
          description={t('review.noReviewsDescription')}
          action={
            user ? (
              <Button onClick={() => setShowReviewForm(true)}>
                {t('review.writeFirstReview')}
              </Button>
            ) : undefined
          }
        />
      ) : (
        <div className="space-y-4">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ReviewCard review={review} onHelpful={() => toggleHelpful(review.id)} />
            </motion.div>
          ))}
        </div>
      )}

      {showReviewForm && (
        <ReviewForm productId={productId} onClose={() => setShowReviewForm(false)} />
      )}
    </section>
  );
}

