import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem } from '@/types';

interface CartStore {
  items: CartItem[];
  lastAddedItem: string | null;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (productId: string, variantKey: string) => void;
  updateQuantity: (productId: string, variantKey: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: (getProductPrice: (id: string) => number) => number;
  getTotalItems: () => number;
  clearLastAddedItem: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      lastAddedItem: null,
      addItem: (item) => {
        try {
          const existing = get().items.find(
            (i) => i.productId === item.productId && i.variantKey === item.variantKey
          );
          if (existing) {
            get().updateQuantity(item.productId, item.variantKey, existing.quantity + 1);
          } else {
            set((state) => ({ items: [...state.items, { ...item, quantity: 1 }] }));
          }
          // Set trigger for animation
          set({ lastAddedItem: item.productId });
          
          // Use a more robust approach with requestAnimationFrame
          const timeoutId = window.requestAnimationFrame(() => {
            setTimeout(() => {
              set({ lastAddedItem: null });
            }, 100);
          });
          
          // Store cleanup function if needed
          return () => window.cancelAnimationFrame(timeoutId);
        } catch (error) {
          console.error('Error adding item to cart:', error);
          throw error;
        }
      },
      clearLastAddedItem: () => set({ lastAddedItem: null }),
      removeItem: (productId, variantKey) => {
        try {
          set((state) => ({
            items: state.items.filter((i) => !(i.productId === productId && i.variantKey === variantKey)),
          }));
        } catch (error) {
          console.error('Error removing item from cart:', error);
        }
      },
      updateQuantity: (productId, variantKey, quantity) => {
        try {
          if (quantity < 0) {
            console.warn('Quantity cannot be negative');
            return;
          }
          set((state) => ({
            items: state.items.map((i) =>
              i.productId === productId && i.variantKey === variantKey ? { ...i, quantity } : i
            ),
          }));
        } catch (error) {
          console.error('Error updating quantity:', error);
        }
      },
      clearCart: () => {
        try {
          set({ items: [] });
        } catch (error) {
          console.error('Error clearing cart:', error);
        }
      },
      getTotalPrice: (getProductPrice) => {
        try {
          return get().items.reduce((total, item) => {
            const price = getProductPrice(item.productId);
            return total + (price * item.quantity);
          }, 0);
        } catch (error) {
          console.error('Error calculating total price:', error);
          return 0;
        }
      },
      getTotalItems: () => {
        try {
          return get().items.reduce((sum, item) => sum + item.quantity, 0);
        } catch (error) {
          console.error('Error calculating total items:', error);
          return 0;
        }
      },
    }),
    { name: 'cart-storage' }
  )
);

