import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
        const newOrder: Order = {
          ...orderData,
          id: `ORD-${Date.now()}`,
          date: new Date().toISOString(),
        };
        set((state) => ({ orders: [newOrder, ...state.orders] }));
      },
      getOrder: (id) => {
        return get().orders.find((o) => o.id === id);
      },
    }),
    { name: 'orders-storage' }
  )
);
