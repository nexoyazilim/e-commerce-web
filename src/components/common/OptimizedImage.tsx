import { useState, useRef, useEffect, memo } from 'react';
import { generateSrcset, generateWebPSrcset, generateSizes } from '@/lib/image-utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * OptimizedImage component with lazy loading, responsive images, and WebP support
 * Uses Intersection Observer for efficient lazy loading
 */
export const OptimizedImage = memo(function OptimizedImage({
  src,
  alt,
  className = '',
  width,
  height,
  sizes,
  priority = false,
  loading = 'lazy',
  onLoad,
  onError,
}: OptimizedImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (priority || loading === 'eager') {
      // Load immediately if priority or eager
      return;
    }

    const img = imgRef.current;
    if (!img) return;

    // Use Intersection Observer for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLImageElement;
            if (target.dataset.src) {
              target.src = target.dataset.src;
              target.dataset.src = '';
              observer.unobserve(target);
            }
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before the image is visible
        threshold: 0.01,
      }
    );

    observer.observe(img);

    return () => {
      observer.disconnect();
    };
  }, [priority, loading]);

  const handleLoad = () => {
    setImageLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Generate srcset for responsive images
  const srcset = generateSrcset(src);
  const webpSrcset = generateWebPSrcset(src);
  const sizesAttr = sizes || generateSizes();

  const imageProps = priority || loading === 'eager' 
    ? { src, srcSet: srcset }
    : { 'data-src': src, 'data-srcset': srcset };

  return (
    <picture className={className}>
      {/* WebP source for modern browsers */}
      <source
        type="image/webp"
        srcSet={priority || loading === 'eager' ? webpSrcset : undefined}
        data-srcset={priority || loading === 'eager' ? undefined : webpSrcset}
        sizes={sizesAttr}
      />
      
      {/* Fallback to original format */}
      <img
        ref={imgRef}
        {...imageProps}
        alt={alt}
        width={width}
        height={height}
        sizes={sizesAttr}
        loading={priority ? 'eager' : loading}
        className={`transition-opacity duration-300 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        onLoad={handleLoad}
        onError={handleError}
        style={{ aspectRatio: width && height ? `${width}/${height}` : undefined }}
      />
      
      {/* Loading placeholder */}
      {!imageLoaded && !hasError && (
        <div className="absolute inset-0 animate-pulse bg-muted-foreground/20" />
      )}
      
      {/* Error placeholder */}
      {hasError && (
        <div className="flex items-center justify-center bg-muted text-muted-foreground">
          <span className="text-sm">Failed to load image</span>
        </div>
      )}
    </picture>
  );
});
