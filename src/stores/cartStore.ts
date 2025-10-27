import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'react-hot-toast';
import { logError, getUserErrorMessage } from '@/lib/error-handler';
import type { CartItem } from '@/types';

interface CartStore {
  items: CartItem[];
  lastAddedItem: string | null;
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
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
      addItem: (item, quantity = 1) => {
        try {
          const existing = get().items.find(
            (i) => i.productId === item.productId && i.variantKey === item.variantKey
          );
          if (existing) {
            get().updateQuantity(item.productId, item.variantKey, existing.quantity + quantity);
          } else {
            set((state) => ({ items: [...state.items, { ...item, quantity }] }));
          }
          // Set trigger for animation
          set({ lastAddedItem: item.productId });
          
          // Clear after 100ms - simple and sufficient for animation
          setTimeout(() => {
            set({ lastAddedItem: null });
          }, 100);
        } catch (error) {
          logError({
            context: 'cartStore.addItem',
            message: 'Failed to add item to cart',
            error: error instanceof Error ? error : new Error(String(error)),
            metadata: { item },
          });
          toast.error(getUserErrorMessage(error, 'cartStore'));
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
          logError({
            context: 'cartStore.removeItem',
            message: 'Failed to remove item from cart',
            error: error instanceof Error ? error : new Error(String(error)),
            metadata: { productId, variantKey },
          });
          toast.error(getUserErrorMessage(error, 'cartStore'));
        }
      },
      updateQuantity: (productId, variantKey, quantity) => {
        try {
          if (quantity < 0) {
            logError({
              context: 'cartStore.updateQuantity',
              message: 'Quantity cannot be negative',
              level: 'warn',
              metadata: { productId, variantKey, quantity },
            });
            toast.error('Quantity cannot be negative');
            return;
          }
          
          if (quantity > 99) {
            logError({
              context: 'cartStore.updateQuantity',
              message: 'Quantity exceeds maximum (99)',
              level: 'warn',
              metadata: { productId, variantKey, quantity },
            });
            toast.error('Maximum quantity is 99');
            return;
          }
          
          set((state) => ({
            items: state.items.map((i) =>
              i.productId === productId && i.variantKey === variantKey ? { ...i, quantity } : i
            ),
          }));
        } catch (error) {
          logError({
            context: 'cartStore.updateQuantity',
            message: 'Failed to update quantity',
            error: error instanceof Error ? error : new Error(String(error)),
            metadata: { productId, variantKey, quantity },
          });
          toast.error(getUserErrorMessage(error, 'cartStore'));
        }
      },
      clearCart: () => {
        try {
          set({ items: [] });
          toast.success('Cart cleared');
        } catch (error) {
          logError({
            context: 'cartStore.clearCart',
            message: 'Failed to clear cart',
            error: error instanceof Error ? error : new Error(String(error)),
          });
          toast.error(getUserErrorMessage(error, 'cartStore'));
        }
      },
      getTotalPrice: (getProductPrice) => {
        try {
          return get().items.reduce((total, item) => {
            const price = getProductPrice(item.productId);
            return total + (price * item.quantity);
          }, 0);
        } catch (error) {
          logError({
            context: 'cartStore.getTotalPrice',
            message: 'Failed to calculate total price',
            error: error instanceof Error ? error : new Error(String(error)),
            level: 'warn',
          });
          return 0;
        }
      },
      getTotalItems: () => {
        try {
          return get().items.reduce((sum, item) => sum + item.quantity, 0);
        } catch (error) {
          logError({
            context: 'cartStore.getTotalItems',
            message: 'Failed to calculate total items',
            error: error instanceof Error ? error : new Error(String(error)),
            level: 'warn',
          });
          return 0;
        }
      },
    }),
    { name: 'cart-storage' }
  )
);

