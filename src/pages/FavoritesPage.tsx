import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product/ProductCard';
import productsData from '@/data/products.json';
import type { Product } from '@/types';
import { useFavoritesStore } from '@/stores/favoritesStore';
import { useTranslation } from 'react-i18next';

export function FavoritesPage() {
  const { t } = useTranslation();
  const favoriteIds = useFavoritesStore((state) => state.productIds);
  const products = productsData as Product[];
  const favoriteProducts = products.filter((product) => favoriteIds.includes(product.id));

  if (favoriteProducts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-12 text-center"
        >
          <Heart className="mb-4 h-16 w-16 text-muted-foreground" />
          <h1 className="mb-2 text-2xl font-bold">{t('pages.favorites.noFavorites')}</h1>
          <p className="mb-6 text-muted-foreground">{t('pages.favorites.noFavoritesDesc')}</p>
          <Button asChild>
            <Link to="/products">{t('pages.favorites.browseProducts')}</Link>
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold tracking-tight">{t('pages.favorites.title')}</h1>
        <p className="text-muted-foreground">{t('pages.favorites.itemsInFavorites', { count: favoriteProducts.length })}</p>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {favoriteProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
