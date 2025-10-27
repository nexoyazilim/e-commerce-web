import { useState, useMemo, useCallback, memo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Grid, List, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ProductCard } from '@/components/product/ProductCard';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FilterSidebar } from '@/components/filters/FilterSidebar';
import { ActiveFilters } from '@/components/filters/ActiveFilters';
import { ScrollReveal } from '@/components/common/ScrollReveal';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { useFilterStore } from '@/stores/filterStore';
import { useProductsStore } from '@/stores/productsStore';
import { useTranslation } from 'react-i18next';

function ProductsPage() {
  const { t } = useTranslation();
  const products = useProductsStore((state) => state.products);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const priceRange = useFilterStore((state) => state.priceRange);
  const selectedBrands = useFilterStore((state) => state.brands);
  const selectedColors = useFilterStore((state) => state.colors);
  const selectedSizes = useFilterStore((state) => state.sizes);
  const rating = useFilterStore((state) => state.rating);
  const sortBy = useFilterStore((state) => state.sortBy);
  const viewMode = useFilterStore((state) => state.viewMode);
  const updateFilter = useFilterStore((state) => state.updateFilter);
  const clearFilters = useFilterStore((state) => state.clearFilters);
  
  const [displayCount, setDisplayCount] = useState(20);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Memoize search handler
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  // Memoize toggle filters handler
  const handleToggleFilters = useCallback(() => {
    setShowFilters(prev => !prev);
  }, []);

  // Get unique values for filters
  const brands = useMemo(() => Array.from(new Set(products.map((p) => p.brand))), [products]);                                                                  
  const colors = useMemo(
    () => Array.from(new Set(products.flatMap((p) => p.colors))),
    [products]
  );
  const sizes = useMemo(
    () => Array.from(new Set(products.flatMap((p) => p.sizes))),
    [products]
  );
  const maxPrice = useMemo(() => Math.max(...products.map((p) => p.price)), [products]);

  // Filter products
  const filteredProducts = useMemo(() => {
    // Early return if no filters active
    const hasActiveFilters = 
      searchQuery.length > 0 ||
      priceRange[0] !== 0 ||
      priceRange[1] !== maxPrice ||
      selectedBrands.length > 0 ||
      selectedColors.length > 0 ||
      selectedSizes.length > 0 ||
      rating > 0;
    
    let filtered = products;
    
    if (hasActiveFilters) {
      filtered = products.filter((product) => {
        const matchesSearch = 
          searchQuery.length === 0 || 
          product.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesPrice =
          product.price >= priceRange[0] && product.price <= priceRange[1];
        const matchesBrands =
          selectedBrands.length === 0 || selectedBrands.includes(product.brand);
        const matchesColors =
          selectedColors.length === 0 ||
          selectedColors.some((c) => product.colors.includes(c));
        const matchesSizes =
          selectedSizes.length === 0 || 
          selectedSizes.some((s) => product.sizes.includes(s));
        const matchesRating = product.rating >= rating;

        return (
          matchesSearch &&
          matchesPrice &&
          matchesBrands &&
          matchesColors &&
          matchesSizes &&
          matchesRating
        );
      });
    }

    // Sort products only if needed
    if (sortBy !== 'popular') {
      filtered = [...filtered]; // Clone before sorting
      switch (sortBy) {
        case 'price-low':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          filtered.sort((a, b) => b.rating - a.rating);
          break;
      }
    }

    return filtered;
  }, [products, searchQuery, priceRange, selectedBrands, selectedColors, selectedSizes, rating, sortBy, maxPrice]);

  const breadcrumbs = useMemo(() => [
    { label: t('pages.checkout.breadcrumbHome'), href: '/' },
    { label: t('pages.checkout.breadcrumbProducts'), href: '/products' },
  ], [t]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (!loadMoreRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && displayCount < filteredProducts.length) {
          setIsLoadingMore(true);
          setTimeout(() => {
            setDisplayCount(prev => Math.min(prev + 20, filteredProducts.length));
            setIsLoadingMore(false);
          }, 300);
        }
      },
      { threshold: 0.5 }
    );
    
    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [displayCount, filteredProducts.length]);

  // Reset displayCount when filters change
  useEffect(() => {
    setDisplayCount(20);
  }, [filteredProducts.length]);

  const displayedProducts = useMemo(
    () => filteredProducts.slice(0, displayCount),
    [filteredProducts, displayCount]
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={breadcrumbs} />
      
      <div className="mb-8 mt-4">
        <h1 className="text-3xl font-bold tracking-tight">{t('pages.products.title')}</h1>
        <p className="text-muted-foreground">{t('pages.products.showing', { count: filteredProducts.length })}</p>
      </div>

            <div className="mb-6 flex items-center justify-between gap-4">
        <div className="flex-1 max-w-sm">
          <Input
            placeholder={t('pages.products.searchPlaceholder')}
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handleToggleFilters}
            className="md:hidden"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
          
          <Select
            value={sortBy}
            onValueChange={(value) => updateFilter('sortBy', value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t('pages.products.sortBy')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">{t('pages.products.mostPopular')}</SelectItem>
              <SelectItem value="price-low">{t('pages.products.priceLow')}</SelectItem>
              <SelectItem value="price-high">{t('pages.products.priceHigh')}</SelectItem>
              <SelectItem value="rating">{t('pages.products.highestRated')}</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex rounded-md border">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="icon"
              onClick={() => updateFilter('viewMode', 'grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="icon"
              onClick={() => updateFilter('viewMode', 'list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6 md:hidden"
          >
            <FilterSidebar brands={brands} colors={colors} sizes={sizes} maxPrice={maxPrice} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-6">
        {/* Desktop Filters */}
        <aside className="hidden md:block sticky top-8 h-fit">
          <FilterSidebar brands={brands} colors={colors} sizes={sizes} maxPrice={maxPrice} />
        </aside>

                {/* Products Grid */}
        <div className="flex-1">
          <ActiveFilters />

          {filteredProducts.length > 0 ? (
            <div className="mt-6">
              <div
                className={`grid gap-6 ${
                  viewMode === 'grid'
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                    : 'grid-cols-1'
                }`}
              >
                {displayedProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className={`animate-fade-in-up stagger-${(index % 5) + 1}`}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
              
              {displayCount < filteredProducts.length && (
                <div ref={loadMoreRef} className="mt-8 flex justify-center">
                  {isLoadingMore && (
                    <div className="text-muted-foreground">{t('pages.products.loadingMore')}</div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <ScrollReveal className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-lg text-muted-foreground">{t('pages.products.noProducts')}</p>
              <Button variant="outline" onClick={clearFilters} className="mt-4">
                {t('pages.products.clearFilters')}
              </Button>
            </ScrollReveal>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(ProductsPage);
export { ProductsPage };

