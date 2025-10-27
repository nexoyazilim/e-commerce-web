import { lazy, useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Award, Shield, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProductCard } from '@/components/product/ProductCard';
import { HeroSlider } from '@/components/common/HeroSlider';
import { BrandCarousel } from '@/components/common/BrandCarousel';
import { NewsletterSection } from '@/components/common/NewsletterSection';
import { ScrollReveal } from '@/components/common/ScrollReveal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useProductsStore } from '@/stores/productsStore';
import type { Product } from '@/types';
import { OptimizedImage } from '@/components/common/OptimizedImage';

const QuickViewModal = lazy(() => import('@/components/common/QuickViewModal').then(m => ({ default: m.QuickViewModal })));

export function HomePage() {
  const products = useProductsStore((state) => state.products);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const newProducts = products.slice(0, 6);
  const popularProducts = products.slice(6, 12);
  const discountedProducts = products.filter(p => p.oldPrice).slice(0, 6);

  const categories = [
    { name: 'Electronics', icon: ShoppingBag, slug: 'electronics' },
    { name: 'Clothing', icon: ShoppingBag, slug: 'clothing' },
    { name: 'Shoes', icon: ShoppingBag, slug: 'shoes' },
    { name: 'Bags', icon: ShoppingBag, slug: 'bags' },
    { name: 'Home', icon: ShoppingBag, slug: 'home' },
    { name: 'Accessories', icon: ShoppingBag, slug: 'accessories' },
  ];

  const banners = [
    {
      id: '1',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
      title: 'Summer Sale',
      description: 'Up to 50% off',
      link: '/products',
    },
    {
      id: '2',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
      title: 'New Arrivals',
      description: 'Check them out',
      link: '/products',
    },
  ];

  const heroSlides = [
    {
      id: '1',
      title: 'Welcome to Premium Shopping',
      description: 'Discover the latest trends and find your perfect style. Shop with confidence.',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200',
      ctaText: 'Shop Now',
      ctaLink: '/products',
    },
    {
      id: '2',
      title: 'Summer Collection 2024',
      description: 'Get up to 50% off on all summer essentials. Limited time offer!',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200',
      ctaText: 'Explore Collection',
      ctaLink: '/products',
    },
    {
      id: '3',
      title: 'New Arrivals',
      description: 'Check out our newest products. Fresh designs, premium quality.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200',
      ctaText: 'View Products',
      ctaLink: '/products',
    },
    {
      id: '4',
      title: 'Free Shipping Available',
      description: 'Free shipping on orders over 500₺. Fast and reliable delivery.',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200',
      ctaText: 'Learn More',
      ctaLink: '/about',
    },
    {
      id: '5',
      title: 'Best Deals This Week',
      description: 'Don\'t miss our weekly specials. Shop now and save big!',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200',
      ctaText: 'Shop Deals',
      ctaLink: '/products',
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Slider */}
      <HeroSlider slides={heroSlides} autoPlayInterval={5000} />

      {/* Categories Section */}
      <section id="categories" className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center animate-fade-in-up">
            <h2 className="mb-4 text-3xl font-bold tracking-tight">Shop by Category</h2>
            <p className="text-muted-foreground">Find what you're looking for</p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
            {categories.map((category, i) => {
              const staggerClass = `stagger-${(i % 5) + 1}`;
              return (
                <div
                  key={category.name}
                  className={`animate-fade-in-scale ${staggerClass} transition-transform hover:scale-105`}
                >
                  <Link
                    to={`/category/${category.slug}`}
                    className="group flex flex-col items-center rounded-lg border bg-card p-4 text-center transition-all hover:shadow-md"
                  >
                    <category.icon className="mx-auto mb-2 h-8 w-8 text-primary" />
                    <span className="text-sm font-medium">{category.name}</span>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products with Tabs */}
      <section id="products" className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <ScrollReveal className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight">Featured Products</h2>
            <p className="text-muted-foreground">Hand-picked just for you</p>
          </ScrollReveal>
          
          <Tabs defaultValue="new" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
              <TabsTrigger value="new">New</TabsTrigger>
              <TabsTrigger value="popular">Popular</TabsTrigger>
              <TabsTrigger value="discounted">Discounted</TabsTrigger>
            </TabsList>
            
            <TabsContent value="new" className="mt-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {newProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="popular" className="mt-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {popularProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="discounted" className="mt-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {discountedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Banner Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-2">
            {banners.map((banner, i) => (
              <ScrollReveal key={banner.id} delay={i * 0.1} variant="scale">
                <Link to={banner.link}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="relative overflow-hidden rounded-lg h-64"
                  >
                    <OptimizedImage
                      src={banner.image}
                      alt={banner.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                      <div className="text-white">
                        <h3 className="text-2xl font-bold">{banner.title}</h3>
                        <p className="text-lg">{banner.description}</p>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Brands Carousel */}
      <BrandCarousel />

      {/* Newsletter */}
      <NewsletterSection />

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Truck, title: 'Free Shipping', description: 'On orders over 500₺' },
              { icon: Shield, title: 'Secure Payment', description: '100% secure transactions' },
              { icon: Award, title: 'Quality Guarantee', description: 'Premium quality products' },
              { icon: ShoppingBag, title: 'Easy Returns', description: '30-day return policy' },
            ].map((feature, i) => {
              const staggerClass = `stagger-${(i % 5) + 1}`;
              return (
                <div
                  key={feature.title}
                  className={`flex flex-col items-center text-center animate-fade-in-up ${staggerClass}`}
                >
                  <div className="mb-4 rounded-full bg-primary/10 p-4">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="mb-2 font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {quickViewProduct && (
        <Suspense fallback={null}>
          <QuickViewModal
            product={quickViewProduct}
            isOpen={!!quickViewProduct}
            onClose={() => setQuickViewProduct(null)}
          />
        </Suspense>
      )}
    </div>
  );
}

