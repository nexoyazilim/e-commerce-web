import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ShoppingCart, Heart, Search, Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useCartStore } from '@/stores/cartStore';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import productsData from '@/data/products.json';
import categoriesData from '@/data/categories.json';
import type { Product } from '@/types';
import { sanitizeSearchQuery } from '@/lib/sanitize';

export function Header() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState<Product[]>([]);
  const totalItems = useCartStore((state) => state.getTotalItems());
  const [shakeKey, setShakeKey] = useState(0);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { scrollY, scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.9]);
  
  // Search suggestions with debouncing
  useEffect(() => {
    // Clear previous timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Set new timer
    if (searchQuery.trim().length > 0) {
      debounceTimer.current = setTimeout(() => {
        try {
          const sanitizedQuery = sanitizeSearchQuery(searchQuery);
          const products = productsData as Product[];
          const suggestions = products
            .filter((p) => p.title.toLowerCase().includes(sanitizedQuery.toLowerCase()))
            .slice(0, 5);
          setSearchSuggestions(suggestions);
          setShowSearchDropdown(true);
        } catch (error) {
          console.error('Error in search:', error);
          setSearchSuggestions([]);
          setShowSearchDropdown(false);
        }
      }, 300);
    } else {
      setShowSearchDropdown(false);
    }

    // Cleanup function
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [searchQuery]);

  // Scroll listener with proper cleanup
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Watch for cart changes to trigger shake animation
  useEffect(() => {
    if (totalItems > 0) {
      setShakeKey((prev) => prev + 1);
    }
  }, [totalItems]);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'tr' : 'en';
    i18n.changeLanguage(newLang);
    
    // Update URL with language parameter
    const url = new URL(window.location.href);
    url.searchParams.set('lang', newLang);
    window.history.replaceState({}, '', url.toString());
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sanitizedQuery = sanitizeSearchQuery(searchQuery);
    if (sanitizedQuery.trim()) {
      const lang = i18n.language;
      navigate(`/search?q=${encodeURIComponent(sanitizedQuery)}&lang=${lang}`);
      setShowSearchDropdown(false);
    }
  };

  // Sync language from URL on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    if (langParam && ['en', 'tr'].includes(langParam)) {
      i18n.changeLanguage(langParam);
    }
  }, []);

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 h-1 bg-primary z-[100]"
        style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
      />

      <motion.header
        style={{ opacity: headerOpacity }}
        className={`sticky top-0 z-50 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60 ${
          isScrolled ? 'bg-background/95' : 'bg-background/80'
        }`}
      >
        <div className="container flex h-16 items-center px-4">
          <div className="mr-4 flex items-center gap-4">
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              aria-label="Toggle menu"
            >
              {showMobileMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>

            <Link to="/" className="flex items-center space-x-2">
              <motion.div
                whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10"
              >
                <img src="/e-commerce-web/logo.svg" alt="ShopHub" className="h-6 w-6 text-primary" />
              </motion.div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                ShopHub
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 ml-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-1">
                    Products
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link to="/products">All Products</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {categoriesData.map((category) => (
                    <DropdownMenuItem key={category.id} asChild>
                      <Link to={`/category/${category.slug}`}>{category.name}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-1">
                    Shop
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link to="/category/electronics">Electronics</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/category/clothing">Clothing</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/category/shoes">Shoes</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/category/bags">Bags</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/category/home">Home & Living</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/category/accessories">Accessories</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="ghost" asChild>
                <Link to="/about">About</Link>
              </Button>

              <Button variant="ghost" asChild>
                <Link to="/contact">Contact</Link>
              </Button>
            </nav>
          </div>

          <div className="flex flex-1 items-center justify-end space-x-4">
            <form onSubmit={handleSearchSubmit} className="relative w-full max-w-sm hidden md:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8"
                value={searchQuery}
                maxLength={200}
                onChange={(e) => {
                  const sanitized = sanitizeSearchQuery(e.target.value);
                  setSearchQuery(sanitized);
                }}
                onFocus={() => searchQuery && setShowSearchDropdown(true)}
                onBlur={() => setTimeout(() => setShowSearchDropdown(false), 200)}
                aria-label="Search products"
                aria-expanded={showSearchDropdown}
                aria-haspopup="listbox"
              />
              
              {/* Search Dropdown */}
              <AnimatePresence>
                {showSearchDropdown && searchSuggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full mt-2 w-full rounded-lg border bg-card shadow-lg z-50"
                  >
                    <div className="p-2 space-y-2 max-h-80 overflow-y-auto">
                      {searchSuggestions.map((product) => (
                        <Link
                          key={product.id}
                          to={`/product/${product.slug}`}
                          className="flex gap-3 p-2 rounded-lg hover:bg-muted transition-colors"
                          onClick={() => setShowSearchDropdown(false)}
                        >
                          <img
                            src={product.images[0]}
                            alt={product.title}
                            className="h-12 w-12 object-cover rounded"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-sm">{product.title}</p>
                            <p className="text-xs text-muted-foreground">{product.brand}</p>
                          </div>
                          <Badge>{product.price}₺</Badge>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>

            <ThemeToggle />

            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleLanguage}
              aria-label={`Switch to ${i18n.language === 'en' ? 'Turkish' : 'English'}`}
            >
              {i18n.language === 'en' ? '🇹🇷' : '🇬🇧'}
            </Button>

            <Button variant="ghost" size="icon" asChild>
              <Link to="/favorites" aria-label="View favorites">
                <Heart className="h-5 w-5" />
              </Link>
            </Button>

            <motion.div 
              key={shakeKey}
              initial={{ rotate: 0 }}
              animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <Button variant="ghost" size="icon" asChild>
                <Link to="/cart" className="relative inline-block" aria-label={`Shopping cart with ${totalItems} items`}>
                  <ShoppingCart className="h-5 w-5" />
                  <span className="sr-only">{totalItems} items in cart</span>
                  {totalItems > 0 && (
                    <motion.span
                      key={totalItems}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -right-2 -top-2 flex h-5 w-5 min-w-[20px] items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground shadow-sm border-2 border-background"
                      aria-live="polite"
                      aria-atomic="true"
                    >
                      {totalItems > 99 ? '99+' : totalItems}
                    </motion.span>
                  )}
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {showMobileMenu && (
            <motion.div
              initial={{ opacity: 0, x: -300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              className="fixed inset-y-0 left-0 z-50 w-64 bg-background border-r shadow-lg lg:hidden"
            >
              <div className="flex h-16 items-center justify-between border-b px-4">
                <span className="text-lg font-semibold">Menu</span>
                <Button variant="ghost" size="icon" onClick={() => setShowMobileMenu(false)}>
                  <X className="h-6 w-6" />
                </Button>
              </div>

              <div className="overflow-y-auto p-4 space-y-2">
                <Link to="/products" onClick={() => setShowMobileMenu(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    All Products
                  </Button>
                </Link>
                
                <div className="border-b my-2" />
                
                <div className="font-semibold text-sm px-2 py-1">Categories</div>
                {categoriesData.map((category) => (
                  <Link key={category.id} to={`/category/${category.slug}`} onClick={() => setShowMobileMenu(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      {category.name}
                    </Button>
                  </Link>
                ))}
                
                <div className="border-b my-2" />
                
                <Link to="/about" onClick={() => setShowMobileMenu(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    About
                  </Button>
                </Link>
                
                <Link to="/contact" onClick={() => setShowMobileMenu(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    Contact
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}

