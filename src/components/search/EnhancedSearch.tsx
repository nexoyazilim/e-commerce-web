import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Clock, TrendingUp, Mic, MicOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useSearchStore } from '@/stores/searchStore';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import productsData from '@/data/products.json';
import type { Product } from '@/types';

interface EnhancedSearchProps {
  onClose?: () => void;
}

export function EnhancedSearch({ onClose }: EnhancedSearchProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  const addToHistory = useSearchStore((state) => state.addToHistory);
  const recentSearches = useSearchStore((state) => state.getRecentSearches(5));
  const trending = useSearchStore((state) => state.trending);
  const removeFromHistory = useSearchStore((state) => state.removeFromHistory);

  const products = productsData as Product[];

  useEffect(() => {
    if (query.trim()) {
      const searchResults = products.filter(
        (product) =>
          product.title.toLowerCase().includes(query.toLowerCase()) ||
          product.brand.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase())
      );
      setResults(searchResults.slice(0, 8));
      setShowDropdown(true);
    } else {
      setResults([]);
      setShowDropdown(true);
    }
  }, [query, products]);

  const handleSearch = (searchQuery: string) => {
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      addToHistory(trimmedQuery);
      navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`);
      onClose?.();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && query.trim()) {
      handleSearch(query);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => 
        Math.min(prev + 1, results.length - 1)
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, -1));
    }
  };

  const handleVoiceSearch = () => {
    interface WebkitSpeechRecognition extends SpeechRecognition {
      start(): void;
    }
    
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognitionConstructor = 
        (window as typeof window & { webkitSpeechRecognition: new () => SpeechRecognition }).webkitSpeechRecognition ||
        (window as typeof window & { SpeechRecognition: new () => SpeechRecognition }).SpeechRecognition;
      
      const recognition = new SpeechRecognitionConstructor() as WebkitSpeechRecognition;
      recognition.continuous = false;
      recognition.interimResults = false;
      
      recognition.onstart = () => {
        setIsListening(true);
      };
      
      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        recognition.stop();
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognition.start();
    }
  };

  const handleSelectResult = (product: Product) => {
    navigate(`/product/${product.slug}`);
    onClose?.();
  };

  const handleSelectHistory = (historyItem: string) => {
    setQuery(historyItem);
    handleSearch(historyItem);
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          placeholder={t('search.placeholder')}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowDropdown(true)}
          className="w-full pl-10 pr-20"
          autoFocus
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2">
          {query && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => {
                setQuery('');
                setSelectedIndex(-1);
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleVoiceSearch}
          >
            {isListening ? (
              <Mic className="h-4 w-4 text-destructive animate-pulse" />
            ) : (
              <MicOff className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute left-0 right-0 top-full z-50 mt-2 max-h-[500px] overflow-y-auto rounded-lg border bg-popover shadow-lg"
          >
            {query.trim() ? (
              <div className="p-4">
                {results.length > 0 ? (
                  <div className="space-y-2">
                    <h3 className="mb-2 text-sm font-semibold">
                      {t('search.results', { count: results.length })}
                    </h3>
                    {results.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`cursor-pointer rounded-md p-3 hover:bg-accent ${
                          selectedIndex === index ? 'bg-accent' : ''
                        }`}
                        onClick={() => handleSelectResult(product)}
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={product.images[0]}
                            alt={product.title}
                            className="h-12 w-12 rounded object-cover"
                          />
                          <div className="flex-1">
                            <p className="font-medium">{product.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {product.brand} • {product.price}₺
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center text-muted-foreground">
                    {t('search.noResults')}
                  </div>
                )}
              </div>
            ) : (
              <div className="p-4">
                {recentSearches.length > 0 && (
                  <div className="mb-6">
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="flex items-center gap-2 text-sm font-semibold">
                        <Clock className="h-4 w-4" />
                        {t('search.recentSearches')}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map((item) => (
                        <Badge
                          key={item.query}
                          variant="secondary"
                          className="cursor-pointer"
                          onClick={() => handleSelectHistory(item.query)}
                        >
                          {item.query}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="flex items-center gap-2 text-sm font-semibold">
                      <TrendingUp className="h-4 w-4" />
                      {t('search.trending')}
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {trending.map((trend, index) => (
                      <motion.div
                        key={trend.term}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex cursor-pointer items-center justify-between rounded-md p-2 hover:bg-accent"
                        onClick={() => handleSelectHistory(trend.term)}
                      >
                        <span className="text-sm">{trend.term}</span>
                        <Badge variant="outline">{trend.count}+</Badge>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {showDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowDropdown(false)}
        />
      )}
    </div>
  );
}

