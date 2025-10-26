import { motion, AnimatePresence } from 'framer-motion';
import { X, GitCompare, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useComparisonStore } from '@/stores/comparisonStore';
import { useProductComparison } from '@/hooks/useProductComparison';
import { useTranslation } from 'react-i18next';

export function ComparisonBar() {
  const { t } = useTranslation();
  const products = useComparisonStore((state) => state.products);
  const removeProduct = useComparisonStore((state) => state.removeProduct);
  const clearComparison = useComparisonStore((state) => state.clearComparison);
  const { openComparison } = useProductComparison();

  if (products.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-4 left-1/2 z-50 w-full max-w-4xl -translate-x-1/2 px-4"
      >
        <div className="flex items-center justify-between rounded-lg border bg-background p-4 shadow-2xl backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <GitCompare className="h-5 w-5 text-primary" />
              <span className="font-semibold">{t('comparison.comparing')}</span>
              <Badge variant="secondary">{products.length}</Badge>
            </div>
            <div className="flex gap-2">
              {products.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="relative group"
                >
                  <div className="flex items-center gap-2 rounded-md border bg-card p-2">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="h-10 w-10 rounded object-cover"
                    />
                    <span className="max-w-[150px] truncate text-sm">{product.title}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5"
                      onClick={() => removeProduct(product.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {products.length < 4 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <AlertCircle className="h-4 w-4" />
                {t('comparison.addMore', { count: 4 - products.length })}
              </motion.div>
            )}
            <Button variant="ghost" size="sm" onClick={clearComparison}>
              {t('comparison.clear')}
            </Button>
            <Button onClick={openComparison}>
              <GitCompare className="mr-2 h-4 w-4" />
              {t('comparison.compare')}
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

