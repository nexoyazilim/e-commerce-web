import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';
import type { Product } from '@/types';
import { useComparisonStore } from '@/stores/comparisonStore';

export function useProductComparison() {
  const { t } = useTranslation();
  const comparisonProducts = useComparisonStore((state) => state.products);
  const addProduct = useComparisonStore((state) => state.addProduct);
  const removeProduct = useComparisonStore((state) => state.removeProduct);
  const isComparing = useComparisonStore((state) => state.isComparing);
  const canAdd = useComparisonStore((state) => state.canAdd);
  const [isOpen, setIsOpen] = useState(false);

  const toggleComparison = (product: Product) => {
    if (isComparing(product.id)) {
      removeProduct(product.id);
      toast.success(t('comparison.removed'));
    } else {
      if (!canAdd()) {
        toast.error(t('comparison.maxItems'));
        return;
      }
      addProduct(product);
      toast.success(t('comparison.added'));
    }
  };

  const openComparison = () => {
    if (comparisonProducts.length >= 2) {
      setIsOpen(true);
    } else {
      toast.error(t('comparison.minItems'));
    }
  };

  const closeComparison = () => {
    setIsOpen(false);
  };

  return {
    products: comparisonProducts,
    isOpen,
    openComparison,
    closeComparison,
    toggleComparison,
    isComparing,
  };
}

