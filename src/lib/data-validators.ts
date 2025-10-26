import { z } from 'zod';
import type { Product, CartItem, Order } from '@/types';

/**
 * Runtime Data Validators using Zod
 * 
 * These schemas validate data at runtime to ensure type safety
 * and prevent malformed data from causing crashes.
 */

/**
 * Product data schema for runtime validation
 */
export const productSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  title: z.string().min(1),
  description: z.string(),
  images: z.array(z.string().url()).min(1),
  price: z.number().positive(),
  oldPrice: z.number().positive().optional(),
  rating: z.number().min(0).max(5),
  reviewCount: z.number().int().min(0),
  brand: z.string().min(1),
  categoryId: z.string().min(1),
  colors: z.array(z.string()).min(1),
  sizes: z.array(z.string()).min(1),
  inStock: z.boolean(),
  badges: z.array(z.string()).optional(),
});

/**
 * Validates a product object at runtime
 * @param data - The data to validate
 * @returns Product if valid, null otherwise
 */
export function validateProduct(data: unknown): Product | null {
  try {
    return productSchema.parse(data) as Product;
  } catch {
    return null;
  }
}

/**
 * Validates an array of products
 * @param data - The array to validate
 * @returns Array of valid products
 */
export function validateProducts(data: unknown): Product[] {
  try {
    const arraySchema = z.array(productSchema);
    return arraySchema.parse(data) as Product[];
  } catch {
    return [];
  }
}

/**
 * CartItem schema
 */
export const cartItemSchema = z.object({
  productId: z.string().min(1),
  variantKey: z.string().min(1),
  color: z.string().min(1),
  size: z.string().min(1),
  quantity: z.number().int().positive(),
});

/**
 * Validates a cart item
 * @param data - The cart item to validate
 * @returns Valid cart item or null
 */
export function validateCartItem(data: unknown): CartItem | null {
  try {
    return cartItemSchema.parse(data) as CartItem;
  } catch {
    return null;
  }
}

/**
 * Order item schema
 */
export const orderItemSchema = z.object({
  productId: z.string().min(1),
  title: z.string().min(1),
  quantity: z.number().int().positive(),
  price: z.number().positive(),
  image: z.string().url(),
  variantKey: z.string(),
});

/**
 * Order schema
 */
export const orderSchema = z.object({
  id: z.string().min(1),
  date: z.string(),
  items: z.array(orderItemSchema).min(1),
  total: z.number().positive(),
  status: z.enum(['pending', 'processing', 'shipped', 'delivered', 'cancelled']),
  shippingAddress: z.string().min(1),
  paymentMethod: z.string().min(1),
});

/**
 * Validates an order
 * @param data - The order to validate
 * @returns Valid order or null
 */
export function validateOrder(data: unknown): Order | null {
  try {
    return orderSchema.parse(data) as Order;
  } catch {
    return null;
  }
}

/**
 * Validates data against a schema with better error reporting
 */
export function safeValidate<T>(
  schema: z.ZodSchema<T>,
  data: unknown,
  context?: string
): { success: boolean; data?: T; error?: string } {
  try {
    const result = schema.parse(data);
    return { success: true, data: result };
  } catch (error) {
    const message = error instanceof z.ZodError
      ? `Validation failed${context ? ` in ${context}` : ''}: ${error.issues.map((e: { message: string }) => e.message).join(', ')}`
      : 'Unknown validation error';
    
    if (import.meta.env.DEV) {
      console.error(message, error);
    }
    
    return { success: false, error: message };
  }
}

