import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingCart, Share2, Star } from 'lucide-react';
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
import { ConfettiEffect } from '@/components/common/ConfettiEffect';
import { toast } from 'react-hot-toast';
import productsData from '@/data/products.json';
import type { Product } from '@/types';
import { getDefaultColor, getDefaultSize, hasAvailableVariants, calculateDiscount } from '@/lib/product-utils';

export function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = (productsData as Product[]).find((p) => p.slug === slug);
  
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showConfetti, setShowConfetti] = useState(false);
  
  const addItem = useCartStore((state) => state.addItem);
  const isFavorite = product ? useFavoritesStore((state) => state.isFavorite(product.id)) : false;
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
      toast.error('Product variants not available. Please try another product.');
      return;
    }
    
    if (!selectedColor || !selectedSize) {
      toast.error('Please select a color and size');
      return;
    }
    
    try {
      addItem({
        productId: product.id,
        variantKey: `${selectedColor}-${selectedSize}`,
        color: selectedColor,
        size: selectedSize,
      });
      setShowConfetti(true);
      toast.success('Added to cart!');
      setTimeout(() => setShowConfetti(false), 1000);
    } catch (error) {
      console.error('Error adding item to cart:', error);
      toast.error('Failed to add item to cart. Please try again.');
    }
  };

  const handleToggleFavorite = () => {
    toggleFavorite(product.id);
    toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites');
  };

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: product.title, href: `/product/${product.slug}` },
  ];

  const similarProducts = (productsData as Product[])
    .filter((p) => p.id !== product.id && p.categoryId === product.categoryId)
    .slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-8">
      <ConfettiEffect trigger={showConfetti} />
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
              aria-label="Add to cart"
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
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
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
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
                  <span className="text-muted-foreground">Brand</span>
                  <span className="font-medium">{product.brand}</span>
                </li>
                <li className="flex justify-between border-b pb-3">
                  <span className="text-muted-foreground">Available Colors</span>
                  <span>{product.colors.join(', ')}</span>
                </li>
                <li className="flex justify-between border-b pb-3">
                  <span className="text-muted-foreground">Available Sizes</span>
                  <span>{product.sizes.join(', ')}</span>
                </li>
                <li className="flex justify-between border-b pb-3">
                  <span className="text-muted-foreground">Rating</span>
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
                <h3 className="font-semibold mb-2">Free Shipping</h3>
                <p className="text-sm text-muted-foreground">
                  Free shipping on orders over 500₺
                </p>
              </div>
              <div className="rounded-lg border p-4 hover:border-primary transition-colors">
                <h3 className="font-semibold mb-2">Estimated Delivery</h3>
                <p className="text-sm text-muted-foreground">
                  2-5 business days
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="mb-6 text-2xl font-bold">Similar Products</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {similarProducts.map((item) => (
              <Link key={item.id} to={`/product/${item.slug}`}>
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

