import { useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CartItem } from '@/components/cart/CartItem';
import { useCartStore } from '@/stores/cartStore';
import { useProductsStore } from '@/stores/productsStore';
import type { Product } from '@/types';
import { useTranslation } from 'react-i18next';

export function CartPage() {
  const { t } = useTranslation();
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const products = useProductsStore((state) => state.products);

  const productsMap = useMemo(
    () => new Map(products.map((p) => [p.id, p])),
    [products]
  );

  const cartProducts = useMemo(
    () =>
      items
        .map((item) => {
          const product = productsMap.get(item.productId);
          return product ? { ...product, cartItem: item } : null;
        })
        .filter((item): item is Product & { cartItem: { productId: string; variantKey: string; color: string; size: string; quantity: number } } => item !== null),
    [items, productsMap]
  );

  const totalPrice = useMemo(() => {
    return cartProducts.reduce((total, item) => total + item.price * item.cartItem.quantity, 0);
  }, [cartProducts]);

  const handleQuantityChange = useCallback(
    (productId: string, variantKey: string, quantity: number) => {
      updateQuantity(productId, variantKey, quantity);
    },
    [updateQuantity]
  );

  const handleRemove = useCallback(
    (productId: string, variantKey: string) => {
      removeItem(productId, variantKey);
    },
    [removeItem]
  );

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-12 text-center"
        >
          <ShoppingBag className="mb-4 h-16 w-16 text-muted-foreground" />
          <h1 className="mb-2 text-2xl font-bold">{t('pages.cart.emptyTitle')}</h1>
          <p className="mb-6 text-muted-foreground">{t('pages.cart.emptyDesc')}</p>
          <Button asChild>
            <Link to="/products">{t('pages.cart.browseProducts')}</Link>
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 animate-fade-in-up">
        <h1 className="text-3xl font-bold tracking-tight">{t('pages.cart.title')}</h1>
        <p className="text-muted-foreground">{t('pages.cart.itemsInCart', { count: items.length })}</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cartProducts.map((item, index) => {
              const staggerClass = `stagger-${(index % 5) + 1}`;
              return (
                <div
                  key={`${item.id}-${item.cartItem.variantKey}`}
                  className={`animate-fade-in-up ${staggerClass}`}
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
                </div>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="sticky top-8 space-y-4 rounded-lg border bg-card p-6"
          >
            <h2 className="text-xl font-bold">{t('pages.cart.orderSummary')}</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>{t('pages.cart.subtotal')}</span>
                <span className="font-semibold">{totalPrice}₺</span>
              </div>
              <div className="flex justify-between">
                <span>{t('pages.cart.shipping')}</span>
                <span className="font-semibold">{t('pages.cart.shippingFree')}</span>
              </div>
              <div className="border-t pt-2" />
              <div className="flex justify-between text-lg font-bold">
                <span>{t('pages.cart.total')}</span>
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
              <Input placeholder={t('pages.cart.couponPlaceholder')} />
              <Button variant="outline" className="w-full">
                {t('pages.cart.applyCoupon')}
              </Button>
            </div>

            <Button className="w-full" size="lg" asChild>
              <Link to="/checkout">
                {t('pages.cart.checkout')} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
