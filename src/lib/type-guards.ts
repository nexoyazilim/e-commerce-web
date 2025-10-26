import type { Product, CartItem, Order } from '@/types';

/**
 * Type Guards for Runtime Type Checking
 * 
 * These functions help TypeScript narrow types at runtime,
 * ensuring data matches expected types before using it.
 */

/**
 * Checks if an object is a valid Product
 */
export function isProduct(obj: unknown): obj is Product {
  if (!obj || typeof obj !== 'object') return false;
  
  const p = obj as Partial<Product>;
  
  return (
    typeof p.id === 'string' &&
    typeof p.slug === 'string' &&
    typeof p.title === 'string' &&
    Array.isArray(p.images) &&
    p.images.length > 0 &&
    typeof p.price === 'number' &&
    typeof p.rating === 'number' &&
    typeof p.reviewCount === 'number' &&
    typeof p.brand === 'string' &&
    typeof p.categoryId === 'string' &&
    Array.isArray(p.colors) &&
    p.colors.length > 0 &&
    Array.isArray(p.sizes) &&
    p.sizes.length > 0 &&
    typeof p.inStock === 'boolean'
  );
}

/**
 * Checks if an object is a valid CartItem
 */
export function isCartItem(obj: unknown): obj is CartItem {
  if (!obj || typeof obj !== 'object') return false;
  
  const item = obj as Partial<CartItem>;
  
  return (
    typeof item.productId === 'string' &&
    typeof item.variantKey === 'string' &&
    typeof item.color === 'string' &&
    typeof item.size === 'string' &&
    typeof item.quantity === 'number' &&
    item.quantity > 0
  );
}

/**
 * Checks if an object is a valid Order
 */
export function isOrder(obj: unknown): obj is Order {
  if (!obj || typeof obj !== 'object') return false;
  
  const order = obj as Partial<Order>;
  
  return (
    typeof order.id === 'string' &&
    typeof order.date === 'string' &&
    Array.isArray(order.items) &&
    order.items.length > 0 &&
    typeof order.total === 'number' &&
    typeof order.status === 'string' &&
    ['pending', 'processing', 'shipped', 'delivered', 'cancelled'].includes(order.status) &&
    typeof order.shippingAddress === 'string' &&
    typeof order.paymentMethod === 'string'
  );
}

/**
 * Checks if an array contains only Products
 */
export function isProductArray(arr: unknown): arr is Product[] {
  return Array.isArray(arr) && arr.every(isProduct);
}

/**
 * Checks if an array contains only CartItems
 */
export function isCartItemArray(arr: unknown): arr is CartItem[] {
  return Array.isArray(arr) && arr.every(isCartItem);
}

/**
 * Checks if a string is a valid ID
 */
export function isValidId(id: unknown): id is string {
  return typeof id === 'string' && id.length > 0;
}

/**
 * Checks if a value is a valid number
 */
export function isValidNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value) && isFinite(value);
}

