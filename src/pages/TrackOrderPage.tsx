import { useState } from 'react';
import { motion } from 'framer-motion';
import { PackageSearch, ArrowRight, CheckCircle2, Clock, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function TrackOrderPage() {
  const [orderId, setOrderId] = useState('');
  const [isTracking, setIsTracking] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setIsTracking(true);
    // Mock tracking logic
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-2xl"
      >
        <div className="mb-8 text-center">
          <PackageSearch className="mx-auto mb-4 h-16 w-16 text-primary" />
          <h1 className="mb-4 text-4xl font-bold tracking-tight">Track Your Order</h1>
          <p className="text-muted-foreground">
            Enter your order number or tracking ID to check the status of your order
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-lg border bg-card p-6"
        >
          <form onSubmit={handleTrack} className="flex gap-2">
            <Input
              placeholder="Enter order number"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="flex-1"
            />
            <Button type="submit">
              Track Order
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </motion.div>

        {isTracking && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 rounded-lg border bg-card p-6"
          >
            <h2 className="mb-6 text-2xl font-bold">Order Status</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-500" />
                <div>
                  <p className="font-semibold">Order Confirmed</p>
                  <p className="text-sm text-muted-foreground">Order placed successfully</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-500" />
                <div>
                  <p className="font-semibold">Payment Received</p>
                  <p className="text-sm text-muted-foreground">Payment processed</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-6 w-6 text-yellow-500" />
                <div>
                  <p className="font-semibold">Order Processing</p>
                  <p className="text-sm text-muted-foreground">Preparing your order</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Truck className="h-6 w-6 text-blue-500" />
                <div>
                  <p className="font-semibold">Out for Delivery</p>
                  <p className="text-sm text-muted-foreground">Estimated delivery: 2-3 days</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

