import { motion } from 'framer-motion';
import { ThumbsUp, Star, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { enUS, tr } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';
import type { Review } from '@/stores/reviewStore';

interface ReviewCardProps {
  review: Review;
  onHelpful: () => void;
}

export function ReviewCard({ review, onHelpful }: ReviewCardProps) {
  const { i18n } = useTranslation();
  const locale = i18n.language === 'tr' ? tr : enUS;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-lg border bg-card p-6 shadow-sm"
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
            {review.userName.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-semibold">{review.userName}</h4>
              {review.verified && (
                <Badge variant="secondary" className="gap-1">
                  <CheckCircle className="h-3 w-3" />
                  Verified
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {formatDistanceToNow(new Date(review.createdAt), {
                addSuffix: true,
                locale,
              })}
            </p>
          </div>
        </div>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-4 w-4 ${
                star <= review.rating
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-muted-foreground'
              }`}
            />
          ))}
        </div>
      </div>

      <h3 className="mb-2 text-lg font-semibold">{review.title}</h3>
      <p className="mb-4 text-muted-foreground">{review.comment}</p>

      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={onHelpful}
          className="group gap-2"
        >
          <ThumbsUp className="h-4 w-4 group-hover:fill-primary" />
          <span>Helpful ({review.helpful})</span>
        </Button>
      </div>
    </motion.div>
  );
}

