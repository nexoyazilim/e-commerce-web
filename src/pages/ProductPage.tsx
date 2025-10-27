import { useState, useEffect, lazy, Suspense } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductGallery } from '@/components/product/ProductGallery';
import { VariantSelector } from '@/components/product/VariantSelector';
import { ReviewSection } from '@/components/feedback/ReviewSection';
import { ProductSidebar } from '@/components/product/ProductSidebar';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { StarRating } from '@/components/common/StarRating';
import { ProductSkeleton } from '@/components/loading/ProductSkeleton';
import { useCartStore } from '@/stores/cartStore';
import { useFavoritesStore } from '@/stores/favoritesStore';
import { toast } from 'react-hot-toast';
import { useProductsStore } from '@/stores/productsStore';
import { getDefaultColor, getDefaultSize, hasAvailableVariants, calculateDiscount } from '@/lib/product-utils';
import { OptimizedImage } from '@/components/common/OptimizedImage';
import { useTranslation } from 'react-i18next';

const ConfettiEffect = lazy(() => import('@/components/common/ConfettiEffect').then(m => ({ default: m.ConfettiEffect })));

export function ProductPage() {
  const { t } = useTranslation();
  const { slug } = useParams<{ slug: string }>();
  const getProductBySlug = useProductsStore((state) => state.getProductBySlug);
  const products = useProductsStore((state) => state.products);
  const product = getProductBySlug(slug || '');
  
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showConfetti, setShowConfetti] = useState(false);
  
  const addItem = useCartStore((state) => state.addItem);
  const isFavorite = useFavoritesStore((state) => state.isFavorite(product?.id || ''));
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  // Sync state when product loads
  useEffect(() => {
    if (product) {
      const defaultColor = getDefaultColor(product);
      const defaultSize = getDefaultSize(product);
      setSelectedColor(defaultColor);
      setSelectedSize(defaultSize);
    }
  }, [product]);

  // Show loading skeleton while product data is resolving
  if (!product) {
    return <ProductSkeleton />;
  }

  const discountPercent = calculateDiscount(product.price, product.oldPrice);

  const handleAddToCart = () => {
    // Validate that variants are selected and available
    if (!hasAvailableVariants(product)) {
      toast.error(t('pages.product.selectVariant'));
      return;
    }
    
    if (!selectedColor || !selectedSize) {
      toast.error(t('pages.product.selectColorSize'));
      return;
    }
    
    try {
      addItem({
        productId: product.id,
        variantKey: `${selectedColor}-${selectedSize}`,
        color: selectedColor,
        size: selectedSize,
      }, quantity);
      setShowConfetti(true);
      toast.success(t('pages.product.addedToCart', { quantity }));
      setTimeout(() => setShowConfetti(false), 1000);
    } catch (error) {
      console.error('Error adding item to cart:', error);
      toast.error(t('cart.addError'));
    }
  };

  const handleToggleFavorite = () => {
    toggleFavorite(product.id);
    toast.success(isFavorite ? t('pages.product.removedFromFavorites') : t('pages.product.addedToFavorites'));
  };

  const breadcrumbs = [
    { label: t('pages.checkout.breadcrumbHome'), href: '/' },
    { label: t('pages.checkout.breadcrumbProducts'), href: '/products' },
    { label: product.title, href: `/product/${product.slug}` },
  ];

  const similarProducts = products
    .filter((p) => p.id !== product.id && p.categoryId === product.categoryId)
    .slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={null}>
        <ConfettiEffect trigger={showConfetti} />
      </Suspense>
      <Breadcrumb items={breadcrumbs} />
      
      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* Gallery & Info - 2 columns */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2"
        >
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Gallery */}
            <ProductGallery
              images={product.images}
              title={product.title}
              badges={product.badges}
              discountPercent={discountPercent}
            />

            {/* Product Info */}
            <div className="space-y-6">
        <div>
          <h1 className="mb-2 text-4xl font-bold">{product.title}</h1>
          <p className="mb-4 text-muted-foreground">{product.brand}</p>
            <div className="flex items-center gap-2 mb-4">
              <StarRating rating={product.rating} />
              <span className="text-sm text-muted-foreground">
                ({product.reviewCount} reviews)
              </span>
            </div>
          </div>

          <div>
            <div className="mb-4 flex items-center gap-2">
            <span className="text-3xl font-bold">{product.price}₺</span>
            {product.oldPrice && (
                <>
                  <span className="text-xl text-muted-foreground line-through">
                    {product.oldPrice}₺
                  </span>
                  <Badge variant="destructive">-{discountPercent}%</Badge>
                </>
            )}
          </div>
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          {/* Variant Selector */}
          <VariantSelector
            colors={product.colors}
            sizes={product.sizes}
            selectedColor={selectedColor}
            selectedSize={selectedSize}
            quantity={quantity}
            inStock={product.inStock}
            onColorChange={setSelectedColor}
            onSizeChange={setSelectedSize}
            onQuantityChange={setQuantity}
          />

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button 
              size="lg" 
              onClick={handleAddToCart} 
              disabled={!product.inStock || !hasAvailableVariants(product)} 
              className="flex-1"
              aria-label={t('pages.product.addToCart')}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              {t('pages.product.addToCart')}
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={handleToggleFavorite}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              aria-label="Share product"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        </div>
      </motion.div>

      {/* Sidebar - 1 column */}
        <aside className="lg:col-span-1">
          <div className="sticky top-8">
            <ProductSidebar product={product} />
          </div>
        </aside>
      </div>

      {/* Tabs Section - Full Width */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-16"
      >
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="description">{t('pages.product.description')}</TabsTrigger>
            <TabsTrigger value="specifications">{t('pages.product.specifications')}</TabsTrigger>
            <TabsTrigger value="reviews">{t('pages.product.reviews')}</TabsTrigger>
            <TabsTrigger value="shipping">{t('pages.product.shipping')}</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <div className="bg-muted/30 rounded-lg p-6">
              <p className="text-muted-foreground">{product.description}</p>
            </div>
          </TabsContent>

          <TabsContent value="specifications" className="mt-6">
            <div className="bg-muted/30 rounded-lg p-6">
              <ul className="space-y-3">
                <li className="flex justify-between border-b pb-3">
                  <span className="text-muted-foreground">{t('pages.product.brand')}</span>
                  <span className="font-medium">{product.brand}</span>
                </li>
                <li className="flex justify-between border-b pb-3">
                  <span className="text-muted-foreground">{t('pages.product.availableColors')}</span>
                  <span>{product.colors.join(', ')}</span>
                </li>
                <li className="flex justify-between border-b pb-3">
                  <span className="text-muted-foreground">{t('pages.product.availableSizes')}</span>
                  <span>{product.sizes.join(', ')}</span>
                </li>
                <li className="flex justify-between border-b pb-3">
                  <span className="text-muted-foreground">{t('pages.product.rating')}</span>
                  <span>{product.rating}/5</span>
                </li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <ReviewSection productId={product.id} />
          </TabsContent>

          <TabsContent value="shipping" className="mt-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border p-4 hover:border-primary transition-colors">
                <h3 className="font-semibold mb-2">{t('pages.product.freeShipping')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('pages.product.freeShippingDesc')}
                </p>
              </div>
              <div className="rounded-lg border p-4 hover:border-primary transition-colors">
                <h3 className="font-semibold mb-2">{t('pages.product.estimatedDelivery')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('pages.product.deliveryDesc')}
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="mb-6 text-2xl font-bold">{t('pages.product.similarProducts')}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {similarProducts.map((item) => (
              <Link key={item.id} to={`/product/${item.slug}`}>
                <OptimizedImage
                  src={item.images[0]}
                  alt={item.title}
                  className="w-full h-64 object-cover rounded-lg"
                  loading="lazy"
                />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

