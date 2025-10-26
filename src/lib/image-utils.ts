/**
 * Image optimization utilities
 * Provides functions for generating responsive image URLs with srcset and multiple formats
 */

export type ImageSize = 'thumbnail' | 'small' | 'medium' | 'large';

export const IMAGE_SIZES: Record<ImageSize, number> = {
  thumbnail: 200,
  small: 400,
  medium: 800,
  large: 1200,
};

/**
 * Generates a responsive image srcset for different sizes
 * @param baseUrl - Original image URL
 * @param sizes - Array of image sizes to generate
 * @returns srcset string with width descriptors
 */
export function generateSrcset(baseUrl: string, sizes: ImageSize[] = ['small', 'medium', 'large']): string {
  return sizes
    .map((size) => {
      const width = IMAGE_SIZES[size];
      const optimizedUrl = generateOptimizedImageUrl(baseUrl, size);
      return `${optimizedUrl} ${width}w`;
    })
    .join(', ');
}

/**
 * Generates an optimized image URL with size parameter
 * For production, this would integrate with an image CDN
 * @param baseUrl - Original image URL
 * @param size - Target size
 * @returns Optimized image URL
 */
export function generateOptimizedImageUrl(baseUrl: string, size: ImageSize): string {
  const width = IMAGE_SIZES[size];
  
  // If using an image CDN like Cloudinary, Imgix, etc., add transform parameters
  // For now, return the original URL with a size hint in the query
  try {
    const url = new URL(baseUrl);
    url.searchParams.set('w', width.toString());
    url.searchParams.set('q', '80'); // Quality setting
    return url.toString();
  } catch {
    // If baseUrl is not a valid URL, return as-is
    return baseUrl;
  }
}

/**
 * Generates image srcset for WebP format
 * @param baseUrl - Original image URL
 * @param sizes - Array of image sizes
 * @returns srcset string with WebP format
 */
export function generateWebPSrcset(baseUrl: string, sizes: ImageSize[] = ['small', 'medium', 'large']): string {
  return sizes
    .map((size) => {
      const width = IMAGE_SIZES[size];
      const optimizedUrl = generateOptimizedImageUrl(baseUrl, size) + '&f=webp';
      return `${optimizedUrl} ${width}w`;
    })
    .join(', ');
}

/**
 * Gets the appropriate image size for a given container width
 * @param containerWidth - Width of the container in pixels
 * @returns Recommended image size
 */
export function getOptimalImageSize(containerWidth: number): ImageSize {
  if (containerWidth <= IMAGE_SIZES.small) return 'small';
  if (containerWidth <= IMAGE_SIZES.medium) return 'medium';
  return 'large';
}

/**
 * Generates a sizes attribute for responsive images
 * @param defaultSize - Default size when viewport is unknown
 * @returns sizes attribute string
 */
export function generateSizes(defaultSize: string = '100vw'): string {
  return `(max-width: 640px) 100vw, (max-width: 1024px) 50vw, ${defaultSize}`;
}

/**
 * Lazy loads an image when it enters the viewport
 * @param imgElement - Image element to load
 * @returns Promise that resolves when image is loaded
 */
export function lazyLoadImage(imgElement: HTMLImageElement): Promise<void> {
  return new Promise((resolve, reject) => {
    if (imgElement.complete) {
      resolve();
      return;
    }

    imgElement.onload = () => resolve();
    imgElement.onerror = reject;
    
    // Trigger load if src is already set
    if (imgElement.dataset.src) {
      imgElement.src = imgElement.dataset.src;
      delete imgElement.dataset.src;
    }
  });
}
