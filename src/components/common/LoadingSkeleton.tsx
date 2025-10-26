import { motion } from 'framer-motion';

interface LoadingSkeletonProps {
  variant?: 'product-card' | 'list-item' | 'text';
  className?: string;
}

export function LoadingSkeleton({ variant = 'product-card', className = '' }: LoadingSkeletonProps) {
  if (variant === 'product-card') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`rounded-lg border bg-card ${className}`}
      >
        <div className="aspect-square bg-muted animate-pulse" />
        <div className="p-4 space-y-3">
          <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
          <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
          <div className="h-6 bg-muted rounded animate-pulse w-1/3" />
        </div>
      </motion.div>
    );
  }

  if (variant === 'list-item') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`flex gap-4 rounded-lg border bg-card p-4 ${className}`}
      >
        <div className="h-24 w-24 bg-muted rounded animate-pulse" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-muted rounded animate-pulse w-2/3" />
          <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
          <div className="h-4 bg-muted rounded animate-pulse w-1/4" />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`h-4 bg-muted rounded animate-pulse ${className}`}
    />
  );
}
