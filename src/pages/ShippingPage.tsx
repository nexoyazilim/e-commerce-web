import { motion } from 'framer-motion';
import { Truck, Package, Clock, MapPin } from 'lucide-react';

export function ShippingPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-4xl"
      >
        <div className="mb-8 text-center">
          <Truck className="mx-auto mb-4 h-16 w-16 text-primary" />
          <h1 className="mb-4 text-4xl font-bold tracking-tight">Shipping Information</h1>
        </div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-lg border bg-card p-6"
          >
            <Package className="mb-4 h-12 w-12 text-primary" />
            <h2 className="mb-4 text-2xl font-bold">Shipping Methods</h2>
            <p className="mb-4 text-muted-foreground">
              We offer various shipping options to meet your needs:
            </p>
            <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
              <li>Standard Shipping: 5-7 business days</li>
              <li>Express Shipping: 2-3 business days</li>
              <li>Overnight Shipping: Next business day</li>
              <li>International Shipping: 7-14 business days</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-lg border bg-card p-6"
          >
            <Truck className="mb-4 h-12 w-12 text-primary" />
            <h2 className="mb-4 text-2xl font-bold">Free Shipping</h2>
            <p className="text-muted-foreground">
              We offer free standard shipping on all orders over 500₺ within Turkey. Free shipping applies
              automatically at checkout for qualifying orders.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-lg border bg-card p-6"
          >
            <Clock className="mb-4 h-12 w-12 text-primary" />
            <h2 className="mb-4 text-2xl font-bold">Processing Time</h2>
            <p className="text-muted-foreground">
              Most orders are processed within 1-2 business days after payment confirmation.
              During peak seasons, processing may take up to 3-4 business days.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-lg border bg-card p-6"
          >
            <MapPin className="mb-4 h-12 w-12 text-primary" />
            <h2 className="mb-4 text-2xl font-bold">Shipping Locations</h2>
            <p className="text-muted-foreground">
              We ship to addresses within Turkey and internationally. Shipping costs vary based on
              destination and shipping method selected at checkout.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

