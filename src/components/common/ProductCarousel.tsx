import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Autoplay from 'embla-carousel-autoplay';

interface ProductCarouselProps {
  items: React.ReactNode[];
  autoplay?: boolean;
  autoplayDelay?: number;
  loop?: boolean;
  showDots?: boolean;
  showArrows?: boolean;
  className?: string;
}

export function ProductCarousel({
  items,
  autoplay = true,
  autoplayDelay = 4000,
  loop = true,
  showDots = true,
  showArrows = true,
  className = '',
}: ProductCarouselProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop, align: 'start', slidesToScroll: 1 },
    autoplay ? [Autoplay({ delay: autoplayDelay })] : []
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;

    setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    });
  }, [emblaApi]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') scrollPrev();
      if (e.key === 'ArrowRight') scrollNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [scrollPrev, scrollNext]);

  return (
    <div className={`relative ${className}`} ref={emblaRef}>
      <div className="overflow-hidden">
        <div className="flex">
          {items.map((item, index) => (
            <div key={index} className="min-w-0 flex-shrink-0 basis-full">
              {item}
            </div>
          ))}
        </div>
      </div>

      {showArrows && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm hover:bg-background"
            onClick={scrollPrev}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm hover:bg-background"
            onClick={scrollNext}
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </>
      )}

      {showDots && items.length > 1 && (
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === selectedIndex ? 'w-8 bg-primary' : 'w-2 bg-muted-foreground/40 hover:bg-muted-foreground/60'
              }`}
              onClick={() => scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

