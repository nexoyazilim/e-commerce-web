import { describe, it, expect, beforeEach } from 'vitest';
import { useCartStore } from './cartStore';

describe('CartStore', () => {
  beforeEach(() => {
    // Reset store before each test
    useCartStore.setState({ items: [], lastAddedItem: null });
  });

  it('should add item to cart', () => {
    const addItem = useCartStore.getState().addItem;
    
    addItem({
      productId: '1',
      variantKey: 'default',
      image: 'test.jpg',
      title: 'Test Product',
      price: 100,
      color: 'Red',
      size: 'M',
    });

    const items = useCartStore.getState().items;
    expect(items).toHaveLength(1);
    expect(items[0].productId).toBe('1');
  });

  it('should increase quantity when adding same item', () => {
    const addItem = useCartStore.getState().addItem;
    
    addItem({
      productId: '1',
      variantKey: 'default',
      image: 'test.jpg',
      title: 'Test Product',
      price: 100,
      color: 'Red',
      size: 'M',
    });

    addItem({
      productId: '1',
      variantKey: 'default',
      image: 'test.jpg',
      title: 'Test Product',
      price: 100,
      color: 'Red',
      size: 'M',
    });

    const items = useCartStore.getState().items;
    expect(items).toHaveLength(1);
    expect(items[0].quantity).toBe(2);
  });

  it('should remove item from cart', () => {
    const addItem = useCartStore.getState().addItem;
    const removeItem = useCartStore.getState().removeItem;
    
    addItem({
      productId: '1',
      variantKey: 'default',
      image: 'test.jpg',
      title: 'Test Product',
      price: 100,
      color: 'Red',
      size: 'M',
    });

    removeItem('1', 'default');
    
    const items = useCartStore.getState().items;
    expect(items).toHaveLength(0);
  });

  it('should calculate total items', () => {
    const addItem = useCartStore.getState().addItem;
    const getTotalItems = useCartStore.getState().getTotalItems;
    
    addItem({
      productId: '1',
      variantKey: 'default',
      image: 'test.jpg',
      title: 'Test Product',
      price: 100,
      color: 'Red',
      size: 'M',
    });

    addItem({
      productId: '1',
      variantKey: 'default',
      image: 'test.jpg',
      title: 'Test Product',
      price: 100,
      color: 'Red',
      size: 'M',
    });

    const total = getTotalItems();
    expect(total).toBe(2);
  });
});

