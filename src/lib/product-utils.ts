import type { Product } from '@/types';

/**
 * Product Utility Functions
 * 
 * Extracted from duplicate code to ensure consistency
 * and reduce maintenance burden.
 */

/**
 * Calculates the discount percentage
 * @param price - Current price
 * @param oldPrice - Original price
 * @returns Discount percentage (0-100)
 */
export function calculateDiscount(price: number, oldPrice?: number): number {
  try {
    // Validate inputs
    if (typeof price !== 'number' || isNaN(price) || price < 0) {
      console.warn('Invalid price in calculateDiscount:', price);
      return 0;
    }
    
    if (!oldPrice || typeof oldPrice !== 'number' || isNaN(oldPrice) || oldPrice <= 0 || price >= oldPrice) {
      return 0;
    }
    
    const discount = ((oldPrice - price) / oldPrice) * 100;
    return Math.round(discount);
  } catch (error) {
    console.error('Error calculating discount:', error);
    return 0;
  }
}

/**
 * Formats a price value with currency symbol
 * @param amount - The price amount
 * @param currency - The currency symbol (default: ₺)
 * @returns Formatted price string
 */
export function formatPrice(amount: number, currency = '₺'): string {
  try {
    // Validate inputs
    if (typeof amount !== 'number' || isNaN(amount)) {
      console.warn('Invalid amount in formatPrice:', amount);
      return `0${currency}`;
    }
    
    if (typeof currency !== 'string' || currency.length === 0) {
      console.warn('Invalid currency in formatPrice:', currency);
      currency = '₺';
    }
    
    return `${amount}${currency}`;
  } catch (error) {
    console.error('Error formatting price:', error);
    return `0${currency}`;
  }
}

/**
 * Checks if a product has available variants
 * @param product - The product to check
 * @returns true if product has colors and sizes
 */
export function hasAvailableVariants(product: Product): boolean {
  try {
    if (!product || typeof product !== 'object') {
      return false;
    }
    
    const colors = Array.isArray(product.colors) ? product.colors : [];
    const sizes = Array.isArray(product.sizes) ? product.sizes : [];
    
    return colors.length > 0 && sizes.length > 0;
  } catch (error) {
    console.error('Error checking available variants:', error);
    return false;
  }
}

/**
 * Gets the default color for a product
 * @param product - The product
 * @returns Default color or empty string
 */
export function getDefaultColor(product: Product): string {
  try {
    if (!product || typeof product !== 'object') {
      return '';
    }
    
    const colors = Array.isArray(product.colors) ? product.colors : [];
    return colors.length > 0 ? colors[0] : '';
  } catch (error) {
    console.error('Error getting default color:', error);
    return '';
  }
}

/**
 * Gets the default size for a product
 * @param product - The product
 * @returns Default size or empty string
 */
export function getDefaultSize(product: Product): string {
  try {
    if (!product || typeof product !== 'object') {
      return '';
    }
    
    const sizes = Array.isArray(product.sizes) ? product.sizes : [];
    return sizes.length > 0 ? sizes[0] : '';
  } catch (error) {
    console.error('Error getting default size:', error);
    return '';
  }
}

/**
 * Creates a variant key from color and size
 * @param color - The color
 * @param size - The size
 * @returns Variant key string
 */
export function createVariantKey(color: string, size: string): string {
  return `${color}-${size}`;
}

/**
 * Checks if a product is in stock
 * @param product - The product to check
 * @returns true if product is in stock
 */
export function isInStock(product: Product): boolean {
  return product.inStock;
}

/**
 * Filters products by availability
 * @param products - Array of products
 * @param inStockOnly - Whether to show only in-stock products
 * @returns Filtered products
 */
export function filterByStock(products: Product[], inStockOnly: boolean): Product[] {
  try {
    if (!Array.isArray(products)) {
      console.warn('Invalid products array in filterByStock');
      return [];
    }
    
    if (!inStockOnly) return products;
    return products.filter(isInStock);
  } catch (error) {
    console.error('Error filtering by stock:', error);
    return [];
  }
}

/**
 * Sorts products by price
 * @param products - Array of products
 * @param ascending - Whether to sort ascending (default: true)
 * @returns Sorted products
 */
export function sortByPrice(products: Product[], ascending = true): Product[] {
  try {
    if (!Array.isArray(products)) {
      console.warn('Invalid products array in sortByPrice');
      return [];
    }
    
    return [...products].sort((a, b) => {
      const priceA = typeof a?.price === 'number' && !isNaN(a.price) ? a.price : 0;
      const priceB = typeof b?.price === 'number' && !isNaN(b.price) ? b.price : 0;
      return ascending ? priceA - priceB : priceB - priceA;
    });
  } catch (error) {
    console.error('Error sorting by price:', error);
    return [];
  }
}

/**
 * Searches products by title or brand
 * @param products - Array of products
 * @param query - Search query
 * @returns Filtered products
 */
export function searchProducts(products: Product[], query: string): Product[] {
  try {
    if (!Array.isArray(products)) {
      console.warn('Invalid products array in searchProducts');
      return [];
    }
    
    if (!query || typeof query !== 'string' || query.trim().length === 0) return products;
    
    const lowerQuery = query.toLowerCase().trim();
    
    return products.filter(product => {
      try {
        const title = product?.title?.toLowerCase() || '';
        const brand = product?.brand?.toLowerCase() || '';
        const description = product?.description?.toLowerCase() || '';
        
        return title.includes(lowerQuery) || brand.includes(lowerQuery) || description.includes(lowerQuery);
      } catch (error) {
        console.error('Error filtering product:', error);
        return false;
      }
    });
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
}

/**
 * Calculates total price for a cart
 * @param items - Cart items with products
 * @returns Total price
 */
export function calculateCartTotal(
  items: Array<{ product: Product; quantity: number }>
): number {
  try {
    if (!Array.isArray(items)) {
      console.warn('Invalid items array in calculateCartTotal');
      return 0;
    }
    
    return items.reduce((total, item) => {
      if (!item || typeof item !== 'object') {
        return total;
      }
      
      const product = item.product;
      const quantity = typeof item.quantity === 'number' && !isNaN(item.quantity) && item.quantity > 0 ? item.quantity : 0;
      
      if (!product || typeof product.price !== 'number' || isNaN(product.price)) {
        return total;
      }
      
      const itemTotal = product.price * quantity;
      return total + (isNaN(itemTotal) ? 0 : itemTotal);
    }, 0);
  } catch (error) {
    console.error('Error calculating cart total:', error);
    return 0;
  }
}

