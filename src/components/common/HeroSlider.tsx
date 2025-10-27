import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Autoplay from 'embla-carousel-autoplay';
import { Link } from 'react-router-dom';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface Slide {
  id: string;
  title: string;
  description: string;
  image: string;
  ctaText: string;
  ctaLink: string;
}

interface HeroSliderProps {
  slides: Slide[];
  autoPlayInterval?: number;
}

export function HeroSlider({ slides, autoPlayInterval = 5000 }: HeroSliderProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [Autoplay({ delay: autoPlayInterval })]
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
    <div className="relative overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {slides.map((slide) => (
          <div key={slide.id} className="min-w-0 flex-shrink-0 flex-grow-0 basis-full">
            <div className="relative h-[500px] md:h-[600px] overflow-hidden">
              {/* Parallax Background Image with Ken Burns Effect */}
              {prefersReducedMotion ? (
                <div className="absolute inset-0">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              ) : (
                <motion.div
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.1 }}
                  transition={{ duration: 20, ease: 'linear' }}
                  className="absolute inset-0"
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </motion.div>
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
              
              {/* Floating Elements */}
              {!prefersReducedMotion && (
                <div className="absolute inset-0">
                  {[...Array(1)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-full bg-white/10 blur-xl"
                      style={{
                        width: '150px',
                        height: '150px',
                        left: '20%',
                        top: '30%',
                      }}
                      animate={{
                        y: [0, -30, 0],
                        x: [0, 20, 0],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 7,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                  ))}
                </div>
              )}

              <div className="container relative z-10 mx-auto flex h-full items-center px-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="max-w-2xl text-white"
                >
                  {/* Text Reveal Animation - Simple slide-in */}
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
                  >
                    {slide.title}
                  </motion.h2>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="mb-6 text-lg md:text-xl"
                  >
                    {slide.description}
                  </motion.p>
                  
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05, x: 5 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    >
                      <Button size="lg" asChild className="relative overflow-hidden group bg-primary/90 hover:bg-primary text-primary-foreground">
                        <Link to={slide.ctaLink}>
                          <span className="relative z-10">{slide.ctaText}</span>
                          <motion.div
                            className="absolute inset-0 bg-white/20"
                            initial={{ x: '-100%' }}
                            whileHover={{ x: '100%' }}
                            transition={{ duration: 0.6 }}
                          />
                        </Link>
                      </Button>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white bg-black/30 hover:bg-black/50 backdrop-blur-sm"
        onClick={scrollPrev}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white bg-black/30 hover:bg-black/50 backdrop-blur-sm"
        onClick={scrollNext}
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === selectedIndex ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white/75'
            }`}
            onClick={() => scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
