import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CartItem } from '@/components/cart/CartItem';
import { useCartStore } from '@/stores/cartStore';
import productsData from '@/data/products.json';
import type { Product } from '@/types';

export function CartPage() {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const products = productsData as Product[];

  const cartProducts = useMemo(
    () =>
      items
        .map((item) => {
          const product = products.find((p) => p.id === item.productId);
          return product ? { ...product, cartItem: item } : null;
        })
        .filter((item): item is Product & { cartItem: { productId: string; variantKey: string; color: string; size: string; quantity: number } } => item !== null),
    [items, products]
  );

  const totalPrice = useMemo(() => {
    return cartProducts.reduce((total, item) => total + item.price * item.cartItem.quantity, 0);
  }, [cartProducts]);

  const handleQuantityChange = (productId: string, variantKey: string, quantity: number) => {
    updateQuantity(productId, variantKey, quantity);
  };

  const handleRemove = (productId: string, variantKey: string) => {
    removeItem(productId, variantKey);
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-12 text-center"
        >
          <ShoppingBag className="mb-4 h-16 w-16 text-muted-foreground" />
          <h1 className="mb-2 text-2xl font-bold">Your cart is empty</h1>
          <p className="mb-6 text-muted-foreground">Start shopping to add items to your cart</p>
          <Button asChild>
            <Link to="/products">Browse Products</Link>
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold tracking-tight">Shopping Cart</h1>
        <p className="text-muted-foreground">{items.length} items in your cart</p>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cartProducts.map((item, index) => (
              <motion.div
                key={`${item.id}-${item.cartItem.variantKey}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <CartItem
                  product={item}
                  color={item.cartItem.color}
                  size={item.cartItem.size}
                  quantity={item.cartItem.quantity}
                  onQuantityChange={(quantity) =>
                    handleQuantityChange(item.id, item.cartItem.variantKey, quantity)
                  }
                  onRemove={() => handleRemove(item.id, item.cartItem.variantKey)}
                />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="sticky top-8 space-y-4 rounded-lg border bg-card p-6"
          >
            <h2 className="text-xl font-bold">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold">{totalPrice}₺</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-semibold">Free</span>
              </div>
              <div className="border-t pt-2" />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <motion.span
                  key={totalPrice}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  className="text-primary"
                >
                  {totalPrice}₺
                </motion.span>
              </div>
            </div>

            <div className="space-y-2">
              <Input placeholder="Coupon code" />
              <Button variant="outline" className="w-full">
                Apply Coupon
              </Button>
            </div>

            <Button className="w-full" size="lg" asChild>
              <Link to="/checkout">
                Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
