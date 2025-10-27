import { useState, useMemo, useCallback, memo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Grid, List, SlidersHorizontal } from 'lucide-react';
import { useVirtualizer } from '@tanstack/react-virtual';
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
import productsData from '@/data/products.json';
import type { Product } from '@/types';
import { useFilterStore } from '@/stores/filterStore';

function ProductsPage() {
  const products = productsData as Product[];
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
  const parentRef = useRef<HTMLDivElement>(null);

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
    const filtered = products.filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesBrands =
        selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      const matchesColors =
        selectedColors.length === 0 ||
        selectedColors.some((c) => product.colors.includes(c));
      const matchesSizes =
        selectedSizes.length === 0 || selectedSizes.some((s) => product.sizes.includes(s));
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

    // Sort products
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
      default:
        break;
    }

    return filtered;
  }, [products, searchQuery, priceRange, selectedBrands, selectedColors, selectedSizes, rating, sortBy]);

  const breadcrumbs = useMemo(() => [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
  ], []);

  // Virtual scrolling setup
  const rowVirtualizer = useVirtualizer({
    count: filteredProducts.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 400, // Estimated height for each product card
    overscan: 5, // Render 5 extra items outside of viewport
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={breadcrumbs} />
      
      <div className="mb-8 mt-4">
        <h1 className="text-3xl font-bold tracking-tight">All Products</h1>
        <p className="text-muted-foreground">Showing {filteredProducts.length} products</p>
      </div>

            <div className="mb-6 flex items-center justify-between gap-4">
        <div className="flex-1 max-w-sm">
          <Input
            placeholder="Search products..."
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
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
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
            <div
              ref={parentRef}
              className="mt-6 h-[800px] overflow-auto"
            >
              <div
                style={{
                  height: `${rowVirtualizer.getTotalSize()}px`,
                  width: '100%',
                  position: 'relative',
                }}
              >
                <div
                  className={`absolute inset-0 grid gap-6 ${
                    viewMode === 'grid'
                      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                      : 'grid-cols-1'
                  }`}
                >
                  {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                    const product = filteredProducts[virtualRow.index];
                    return (
                      <motion.div
                        key={product.id}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: `${virtualRow.size}px`,
                          transform: `translateY(${virtualRow.start}px)`,
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ProductCard product={product} />
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <ScrollReveal className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-lg text-muted-foreground">No products found</p>
              <Button variant="outline" onClick={clearFilters} className="mt-4">
                Clear all filters
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

