import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useComparisonStore } from '@/stores/comparisonStore';
import { useCartStore } from '@/stores/cartStore';
import { useProductComparison } from '@/hooks/useProductComparison';
import { StarRating } from '@/components/common/StarRating';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface ComparisonTableProps {
  isOpen: boolean;
}

export function ComparisonTable({ isOpen }: ComparisonTableProps) {
  const { t } = useTranslation();
  const products = useComparisonStore((state) => state.products);
  const removeProduct = useComparisonStore((state) => state.removeProduct);
  const clearComparison = useComparisonStore((state) => state.clearComparison);
  const addItem = useCartStore((state) => state.addItem);
  const { closeComparison } = useProductComparison();

  if (!isOpen || products.length < 2) return null;

  const handleAddToCart = (product: any) => {
    addItem({
      productId: product.id,
      variantKey: 'default',
      image: product.images[0],
      title: product.title,
      price: product.price,
      color: 'Default',
      size: 'Default',
    });
    toast.success(t('actions.addedToCart'));
  };

  const features = [
    { key: 'title', label: t('comparison.product') },
    { key: 'brand', label: t('comparison.brand') },
    { key: 'category', label: t('comparison.category') },
    { key: 'rating', label: t('comparison.rating') },
    { key: 'price', label: t('comparison.price') },
    { key: 'availability', label: t('comparison.availability') },
    { key: 'actions', label: t('comparison.actions') },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        onClick={closeComparison}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-6xl max-h-[90vh] overflow-auto rounded-lg bg-background shadow-2xl"
        >
          <div className="sticky top-0 flex items-center justify-between border-b bg-background p-4">
            <h2 className="text-2xl font-bold">{t('comparison.title')}</h2>
            <div className="flex gap-2">
              <Button variant="outline" onClick={clearComparison}>
                {t('comparison.clearAll')}
              </Button>
              <Button variant="ghost" size="icon" onClick={closeComparison}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr>
                  <th className="p-4 text-left">{t('comparison.feature')}</th>
                  {products.map((product) => (
                    <th key={product.id} className="min-w-[250px] p-4 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 200 }}
                        >
                          <img
                            src={product.images[0]}
                            alt={product.title}
                            className="h-32 w-32 rounded-lg object-cover"
                          />
                        </motion.div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-2"
                          onClick={() => removeProduct(product.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features.map((feature, featureIndex) => (
                  <tr key={feature.key} className="border-b">
                    <td className="p-4 font-semibold">{feature.label}</td>
                    {products.map((product, productIndex) => (
                      <td key={product.id} className="p-4 text-center">
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: (featureIndex + productIndex) * 0.05 }}
                        >
                          {feature.key === 'title' && (
                            <Link to={`/product/${product.slug}`}>
                              <p className="font-semibold hover:text-primary">{product.title}</p>
                            </Link>
                          )}
                          {feature.key === 'brand' && <p>{product.brand}</p>}
                          {feature.key === 'category' && <p>{product.category}</p>}
                          {feature.key === 'rating' && (
                            <div className="flex items-center justify-center gap-2">
                              <StarRating rating={product.rating} />
                              <span className="text-sm">({product.reviews})</span>
                            </div>
                          )}
                          {feature.key === 'price' && (
                            <div>
                              <p className="text-lg font-bold text-primary">{product.price}₺</p>
                              {product.oldPrice && (
                                <p className="text-sm text-muted-foreground line-through">
                                  {product.oldPrice}₺
                                </p>
                              )}
                            </div>
                          )}
                          {feature.key === 'availability' && (
                            <Badge variant={product.stock > 0 ? 'default' : 'destructive'}>
                              {product.stock > 0 ? t('inStock') : t('outOfStock')}
                            </Badge>
                          )}
                          {feature.key === 'actions' && (
                            <div className="flex justify-center gap-2">
                              <Button size="sm" onClick={() => handleAddToCart(product)}>
                                <ShoppingCart className="mr-2 h-4 w-4" />
                                {t('actions.addToCart')}
                              </Button>
                              <Button variant="outline" size="sm" asChild>
                                <Link to={`/product/${product.slug}`}>{t('viewDetails')}</Link>
                              </Button>
                            </div>
                          )}
                        </motion.div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

