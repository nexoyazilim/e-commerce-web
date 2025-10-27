import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Star, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useReviewStore } from '@/stores/reviewStore';
import { useAuthStore } from '@/stores/authStore';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { logError, getUserErrorMessage } from '@/lib/error-handler';

interface ReviewFormProps {
  productId: string;
  onClose: () => void;
}

export function ReviewForm({ productId, onClose }: ReviewFormProps) {
  const { t } = useTranslation();
  const user = useAuthStore((state) => state.user);
  const addReview = useReviewStore((state) => state.addReview);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [errors, setErrors] = useState<{ title?: string; comment?: string; rating?: string }>({});

  const validateForm = () => {
    try {
      const newErrors: { title?: string; comment?: string; rating?: string } = {};
      
      // Validate rating
      if (rating === 0) {
        newErrors.rating = 'Please provide a rating';
      } else if (rating < 1 || rating > 5) {
        newErrors.rating = 'Rating must be between 1 and 5';
      }
      
      // Validate title
      if (!title.trim()) {
        newErrors.title = 'Title is required';
      } else if (title.length > 200) {
        newErrors.title = 'Title must be less than 200 characters';
      } else if (title.trim().length < 3) {
        newErrors.title = 'Title must be at least 3 characters';
      }
      
      // Validate comment
      if (!comment.trim()) {
        newErrors.comment = 'Comment is required';
      } else if (comment.length > 2000) {
        newErrors.comment = 'Comment must be less than 2000 characters';
      } else if (comment.trim().length < 10) {
        newErrors.comment = 'Comment must be at least 10 characters';
      }
      
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    } catch (error) {
      logError({
        context: 'ReviewForm.validateForm',
        message: 'Form validation failed',
        error: error instanceof Error ? error : new Error(String(error)),
      });
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate user is logged in
      if (!user) {
        toast.error('You must be logged in to submit a review');
        logError({
          context: 'ReviewForm.handleSubmit',
          message: 'User not logged in',
          level: 'warn',
        });
        return;
      }
      
      // Validate form
      if (!validateForm()) {
        return;
      }

      addReview({
        productId,
        userId: user.id,
        userName: user.name,
        rating,
        title,
        comment,
        verified: false,
      });

      toast.success(t('review.submitted'));
      onClose();
    } catch (error) {
      logError({
        context: 'ReviewForm.handleSubmit',
        message: 'Failed to submit review',
        error: error instanceof Error ? error : new Error(String(error)),
        metadata: { productId, hasUser: !!user },
      });
      toast.error(getUserErrorMessage(error, 'ReviewForm'));
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-2xl rounded-lg bg-background p-6 shadow-2xl"
        >
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">{t('review.writeReview')}</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label className="mb-2 block">{t('review.rating')}</Label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    onClick={() => setRating(star)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Star
                      className={`h-8 w-8 ${
                        star <= (hoveredRating || rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-muted-foreground'
                      }`}
                    />
                  </motion.button>
                ))}
              </div>
              {errors.rating && (
                <p className="mt-1 text-sm text-destructive">{errors.rating}</p>
              )}
            </div>

            <div>
              <Label htmlFor="review-title">{t('review.title')}</Label>
              <Input
                id="review-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t('review.titlePlaceholder')}
                className={errors.title ? 'border-destructive' : ''}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-destructive">{errors.title}</p>
              )}
            </div>

            <div>
              <Label htmlFor="review-comment">{t('review.comment')}</Label>
              <Textarea
                id="review-comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={t('review.commentPlaceholder')}
                rows={5}
                className={errors.comment ? 'border-destructive' : ''}
              />
              {errors.comment && (
                <p className="mt-1 text-sm text-destructive">{errors.comment}</p>
              )}
            </div>

            <div className="flex gap-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                {t('common.cancel')}
              </Button>
              <Button type="submit" className="flex-1">
                <Send className="mr-2 h-4 w-4" />
                {t('review.submit')}
              </Button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

