import { lazy, useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Award, Shield, Truck, Laptop, Shirt, Footprints, House, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const products = useProductsStore((state) => state.products);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const newProducts = products.slice(0, 6);
  const popularProducts = products.slice(6, 12);
  const discountedProducts = products.filter(p => p.oldPrice).slice(0, 6);

  const categories = [
    { name: t('categories.electronics'), icon: Laptop, slug: 'electronics' },
    { name: t('categories.clothing'), icon: Shirt, slug: 'clothing' },
    { name: t('categories.shoes'), icon: Footprints, slug: 'shoes' },
    { name: t('categories.bags'), icon: ShoppingBag, slug: 'bags' },
    { name: t('categories.home'), icon: House, slug: 'home' },
    { name: t('categories.accessories'), icon: Sparkles, slug: 'accessories' },
  ];

  const banners = [
    {
      id: '1',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
      title: t('home.sales.summer'),
      description: t('home.sales.summerSale'),
      link: '/products',
    },
    {
      id: '2',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
      title: t('home.sales.new'),
      description: t('home.sales.checkOut'),
      link: '/products',
    },
  ];

  const heroSlides = [
    {
      id: '1',
      title: t('home.hero.welcome'),
      description: t('home.hero.welcomeDesc'),
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200',
      ctaText: t('home.hero.shopNow'),
      ctaLink: '/products',
    },
    {
      id: '2',
      title: t('home.hero.summer'),
      description: t('home.hero.summerDesc'),
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200',
      ctaText: t('home.hero.explore'),
      ctaLink: '/products',
    },
    {
      id: '3',
      title: t('home.hero.newArrivals'),
      description: t('home.hero.newArrivalsDesc'),
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200',
      ctaText: t('home.hero.viewProducts'),
      ctaLink: '/products',
    },
    {
      id: '4',
      title: t('home.hero.freeShipping'),
      description: t('home.hero.freeShippingDesc'),
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200',
      ctaText: t('home.hero.learnMore'),
      ctaLink: '/about',
    },
    {
      id: '5',
      title: t('home.hero.bestDeals'),
      description: t('home.hero.bestDealsDesc'),
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200',
      ctaText: t('home.hero.shopDeals'),
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
            <h2 className="mb-4 text-3xl font-bold tracking-tight">{t('categories.shopByCategory')}</h2>
            <p className="text-muted-foreground">{t('categories.findWhatYouNeed')}</p>
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
            <h2 className="mb-4 text-3xl font-bold tracking-tight">{t('home.features.title')}</h2>
            <p className="text-muted-foreground">{t('home.features.subtitle')}</p>
          </ScrollReveal>
          
          <Tabs defaultValue="new" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
              <TabsTrigger value="new">{t('home.tabs.new')}</TabsTrigger>
              <TabsTrigger value="popular">{t('home.tabs.popular')}</TabsTrigger>
              <TabsTrigger value="discounted">{t('home.tabs.discounted')}</TabsTrigger>
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
              { icon: Truck, title: t('home.features.freeShipping'), description: t('home.features.freeShippingDesc') },
              { icon: Shield, title: t('home.features.securePayment'), description: t('home.features.securePaymentDesc') },
              { icon: Award, title: t('home.features.qualityGuarantee'), description: t('home.features.qualityGuaranteeDesc') },
              { icon: ShoppingBag, title: t('home.features.easyReturns'), description: t('home.features.easyReturnsDesc') },
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

