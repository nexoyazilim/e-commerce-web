import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'react-hot-toast';
import { logError, getUserErrorMessage } from '@/lib/error-handler';

export interface Order {
  id: string;
  date: string;
  items: Array<{
    productId: string;
    title: string;
    quantity: number;
    price: number;
    image: string;
    variantKey: string;
  }>;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: string;
  paymentMethod: string;
}

interface OrderStore {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'date'>) => void;
  getOrder: (id: string) => Order | undefined;
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: [],
      addOrder: (orderData) => {
        try {
          // Validate order data
          if (!orderData.items || orderData.items.length === 0) {
            const errorMsg = 'Order must contain at least one item';
            logError({
              context: 'orderStore.addOrder',
              message: errorMsg,
              level: 'error',
            });
            toast.error('Order must contain at least one item');
            throw new Error(errorMsg);
          }
          
          if (!orderData.total || orderData.total <= 0) {
            const errorMsg = 'Order total must be greater than 0';
            logError({
              context: 'orderStore.addOrder',
              message: errorMsg,
              metadata: { total: orderData.total },
            });
            toast.error('Invalid order total');
            throw new Error(errorMsg);
          }
          
          if (!orderData.shippingAddress || orderData.shippingAddress.trim().length === 0) {
            const errorMsg = 'Shipping address is required';
            logError({
              context: 'orderStore.addOrder',
              message: errorMsg,
              level: 'error',
            });
            toast.error('Shipping address is required');
            throw new Error(errorMsg);
          }
          
          if (!orderData.paymentMethod) {
            const errorMsg = 'Payment method is required';
            logError({
              context: 'orderStore.addOrder',
              message: errorMsg,
              level: 'error',
            });
            toast.error('Payment method is required');
            throw new Error(errorMsg);
          }
          
          // Validate each item
          for (const item of orderData.items) {
            if (!item.productId || !item.title) {
              const errorMsg = 'Invalid item data';
              logError({
                context: 'orderStore.addOrder',
                message: 'Item validation failed',
                metadata: { item },
              });
              toast.error('Invalid item data');
              throw new Error(errorMsg);
            }
            
            if (!item.quantity || item.quantity <= 0) {
              const errorMsg = 'Item quantity must be greater than 0';
              logError({
                context: 'orderStore.addOrder',
                message: 'Invalid item quantity',
                metadata: { item },
              });
              toast.error('Item quantity must be greater than 0');
              throw new Error(errorMsg);
            }
            
            if (!item.price || item.price < 0) {
              const errorMsg = 'Item price must be non-negative';
              logError({
                context: 'orderStore.addOrder',
                message: 'Invalid item price',
                metadata: { item },
              });
              toast.error('Invalid item price');
              throw new Error(errorMsg);
            }
          }
          
          const newOrder: Order = {
            ...orderData,
            id: `ORD-${Date.now()}`,
            date: new Date().toISOString(),
          };
          
          set((state) => ({ orders: [newOrder, ...state.orders] }));
          toast.success('Order created successfully');
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to create order';
          logError({
            context: 'orderStore.addOrder',
            message: errorMessage,
            error: error instanceof Error ? error : new Error(String(error)),
            metadata: { orderData },
          });
          // Only show toast if not already shown
          if (!errorMessage.includes('Order') && !errorMessage.includes('Shipping') && !errorMessage.includes('Payment') && !errorMessage.includes('quantity') && !errorMessage.includes('price')) {
            toast.error(getUserErrorMessage(error, 'orderStore'));
          }
          throw error;
        }
      },
      getOrder: (id) => {
        return get().orders.find((o) => o.id === id);
      },
    }),
    { name: 'orders-storage' }
  )
);
