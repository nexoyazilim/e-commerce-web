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
  if (!oldPrice || oldPrice <= 0 || price >= oldPrice) return 0;
  
  const discount = ((oldPrice - price) / oldPrice) * 100;
  return Math.round(discount);
}

/**
 * Formats a price value with currency symbol
 * @param amount - The price amount
 * @param currency - The currency symbol (default: ₺)
 * @returns Formatted price string
 */
export function formatPrice(amount: number, currency = '₺'): string {
  return `${amount}${currency}`;
}

/**
 * Checks if a product has available variants
 * @param product - The product to check
 * @returns true if product has colors and sizes
 */
export function hasAvailableVariants(product: Product): boolean {
  return product.colors.length > 0 && product.sizes.length > 0;
}

/**
 * Gets the default color for a product
 * @param product - The product
 * @returns Default color or empty string
 */
export function getDefaultColor(product: Product): string {
  return product.colors.length > 0 ? product.colors[0] : '';
}

/**
 * Gets the default size for a product
 * @param product - The product
 * @returns Default size or empty string
 */
export function getDefaultSize(product: Product): string {
  return product.sizes.length > 0 ? product.sizes[0] : '';
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
  if (!inStockOnly) return products;
  return products.filter(isInStock);
}

/**
 * Sorts products by price
 * @param products - Array of products
 * @param ascending - Whether to sort ascending (default: true)
 * @returns Sorted products
 */
export function sortByPrice(products: Product[], ascending = true): Product[] {
  return [...products].sort((a, b) => {
    return ascending ? a.price - b.price : b.price - a.price;
  });
}

/**
 * Searches products by title or brand
 * @param products - Array of products
 * @param query - Search query
 * @returns Filtered products
 */
export function searchProducts(products: Product[], query: string): Product[] {
  if (!query || query.trim().length === 0) return products;
  
  const lowerQuery = query.toLowerCase().trim();
  
  return products.filter(product => 
    product.title.toLowerCase().includes(lowerQuery) ||
    product.brand.toLowerCase().includes(lowerQuery) ||
    product.description.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Calculates total price for a cart
 * @param items - Cart items with products
 * @returns Total price
 */
export function calculateCartTotal(
  items: Array<{ product: Product; quantity: number }>
): number {
  return items.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);
}

