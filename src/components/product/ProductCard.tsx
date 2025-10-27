import { memo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart } from 'lucide-react';
import type { Product } from '@/types';
import { useFavoritesStore } from '@/stores/favoritesStore';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { hasAvailableVariants, getDefaultColor, getDefaultSize, createVariantKey, calculateDiscount } from '@/lib/product-utils';
import { OptimizedImage } from '@/components/common/OptimizedImage';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = memo(function ProductCard({ product }: ProductCardProps) {
  const { t } = useTranslation();
  const isFavorite = useFavoritesStore((state) => state.isFavorite(product.id));
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    // Validate that product has available variants
    if (!hasAvailableVariants(product)) {
      toast.error('Product variants not available. Please try another product.');
      return;
    }
    
    const color = getDefaultColor(product);
    const size = getDefaultSize(product);
    const variantKey = createVariantKey(color, size);
    
    try {
      addItem({
        productId: product.id,
        variantKey,
        color,
        size,
      });
      toast.success(t('actions.addToCart'));
    } catch (error) {
      console.error('Error adding item to cart:', error);
      toast.error('Failed to add item to cart. Please try again.');
    }
  };

  const handleToggleFavorite = () => {
    toggleFavorite(product.id);
    toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites');
  };

  const discountPercent = calculateDiscount(product.price, product.oldPrice);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="group relative"
    >
      <div className="relative h-full overflow-hidden rounded-lg border bg-card transition-all duration-300 hover:shadow-2xl">
        <Link to={`/product/${product.slug}`} className="block">
          <div className="relative aspect-square bg-muted overflow-hidden">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="h-full w-full"
            >
              <OptimizedImage
                src={product.images[0]}
                alt={product.title}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </motion.div>
            {product.badges && product.badges.length > 0 && (
              <div className="absolute left-2 top-2 flex flex-col gap-1">
                {product.badges.map((badge) => (
                  <motion.span
                    key={badge}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    className="rounded bg-primary px-2 py-1 text-xs font-bold text-primary-foreground shadow-lg"
                  >
                    {badge}
                  </motion.span>
                ))}
              </div>
            )}
            {discountPercent > 0 && (
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                className="absolute right-2 top-2 rounded bg-destructive px-2 py-1 text-xs font-bold text-destructive-foreground shadow-lg"
              >
                -{discountPercent}%
              </motion.span>
            )}
          </div>
        </Link>

        <motion.div
          whileTap={{ scale: 0.8 }}
          className="absolute right-2 top-2 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm opacity-0 transition-opacity group-hover:opacity-100"
        >
          <button 
            onClick={handleToggleFavorite} 
            className="w-full h-full flex items-center justify-center"
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <motion.div
              key={isFavorite ? 'favorite' : 'not-favorite'}
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 0.3 }}
            >
              <Heart
                className={`h-4 w-4 ${isFavorite ? 'fill-destructive text-destructive' : ''}`}
              />
            </motion.div>
          </button>
        </motion.div>

        <div className="p-4">
          <div className="mb-2 flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold line-clamp-1">{product.title}</h3>
              <p className="text-sm text-muted-foreground">{product.brand}</p>
            </div>
          </div>

          <div className="mb-2 flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-xs text-yellow-500">
                {i < Math.floor(product.rating) ? '★' : '☆'}
              </span>
            ))}
            <span className="ml-1 text-xs text-muted-foreground">({product.reviewCount})</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold">
                {product.price}₺
              </span>
              {product.oldPrice && (
                <span className="text-sm text-muted-foreground line-through">{product.oldPrice}₺</span>
              )}
            </div>
          </div>

          <motion.div
            initial={{ y: 10, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <motion.button
              className="mt-3 w-full rounded-md bg-primary px-4 py-2 text-primary-foreground shadow-lg opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleAddToCart}
              disabled={!hasAvailableVariants(product)}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              aria-label={hasAvailableVariants(product) ? t('actions.addToCart') : 'Product variants not available'}
            >
              <ShoppingCart className="mr-2 inline h-4 w-4" />
              {t('actions.addToCart')}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
});

