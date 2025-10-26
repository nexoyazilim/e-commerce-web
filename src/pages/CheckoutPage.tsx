import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckoutSteps } from '@/components/checkout/CheckoutSteps';
import { useCartStore } from '@/stores/cartStore';
import { useOrderStore } from '@/stores/orderStore';
import { ConfettiEffect } from '@/components/common/ConfettiEffect';
import { toast } from 'react-hot-toast';
import productsData from '@/data/products.json';
import type { Product } from '@/types';

export function CheckoutPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState({
    fullName: '',
    address: '',
    city: '',
    phone: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [showConfetti, setShowConfetti] = useState(false);

  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const addOrder = useOrderStore((state) => state.addOrder);

  const products = productsData as Product[];
  const cartProducts = items
    .map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return product ? { product, ...item } : null;
    })
    .filter(Boolean) as Array<
    { product: Product } & { quantity: number; variantKey: string; color: string; size: string }
  >;

  const totalPrice = cartProducts.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const handleNext = () => {
    if (step === 1) {
      if (!address.fullName || !address.address || !address.city || !address.phone) {
        toast.error('Please fill in all required fields');
        return;
      }
    }
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate('/cart');
    }
  };

  const handleCompleteOrder = () => {
    addOrder({
      items: cartProducts.map((item) => ({
        productId: item.product.id,
        title: item.product.title,
        quantity: item.quantity,
        price: item.product.price,
        image: item.product.images[0],
        variantKey: item.variantKey,
      })),
      total: totalPrice,
      status: 'processing',
      shippingAddress: `${address.address}, ${address.city}`,
      paymentMethod,
    });

    clearCart();
    setShowConfetti(true);
    toast.success('Order placed successfully!');
    setTimeout(() => {
      setShowConfetti(false);
      navigate('/profile');
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <ConfettiEffect trigger={showConfetti} />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>
      </motion.div>

      <CheckoutSteps currentStep={step} />

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="address"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="mx-auto max-w-2xl"
          >
            <div className="mb-8 rounded-lg border bg-card p-6">
              <h2 className="mb-6 text-xl font-bold">Shipping Address</h2>
              <div className="space-y-4">
                <Input
                  placeholder="Full Name"
                  value={address.fullName}
                  onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                />
                <Input
                  placeholder="Address"
                  value={address.address}
                  onChange={(e) => setAddress({ ...address, address: e.target.value })}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="City"
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  />
                  <Input
                    placeholder="Phone"
                    value={address.phone}
                    onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="payment"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="mx-auto max-w-2xl"
          >
            <div className="mb-8 rounded-lg border bg-card p-6">
              <h2 className="mb-6 text-xl font-bold">Payment Method</h2>
              <div className="space-y-3">
                <button
                  onClick={() => setPaymentMethod('credit-card')}
                  className={`w-full rounded-lg border p-4 text-left transition-colors ${
                    paymentMethod === 'credit-card' ? 'border-primary bg-primary/10' : ''
                  }`}
                >
                  <h3 className="font-semibold">Credit Card</h3>
                  <p className="text-sm text-muted-foreground">Pay with credit or debit card</p>
                </button>
                <button
                  onClick={() => setPaymentMethod('cash')}
                  className={`w-full rounded-lg border p-4 text-left transition-colors ${
                    paymentMethod === 'cash' ? 'border-primary bg-primary/10' : ''
                  }`}
                >
                  <h3 className="font-semibold">Cash on Delivery</h3>
                  <p className="text-sm text-muted-foreground">Pay when you receive</p>
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="review"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="mx-auto max-w-2xl"
          >
            <div className="mb-8 rounded-lg border bg-card p-6">
              <h2 className="mb-6 text-xl font-bold">Order Summary</h2>
              <div className="space-y-4">
                {cartProducts.map((item) => (
                  <div key={item.product.id} className="flex gap-4">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.title}
                      className="h-20 w-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.product.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        Qty: {item.quantity} • {item.color} • {item.size}
                      </p>
                      <p className="font-semibold">{item.product.price * item.quantity}₺</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 border-t pt-4">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>{totalPrice}₺</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mx-auto flex max-w-2xl justify-between">
        <Button variant="outline" onClick={handleBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        {step < 3 ? (
          <Button onClick={handleNext}>
            Continue <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={handleCompleteOrder}>Complete Order</Button>
        )}
      </div>
    </div>
  );
}
