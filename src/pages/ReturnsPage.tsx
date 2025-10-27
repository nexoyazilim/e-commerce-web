import { motion } from 'framer-motion';
import { RotateCcw, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export function ReturnsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-4xl"
      >
        <div className="mb-8 text-center">
          <RotateCcw className="mx-auto mb-4 h-16 w-16 text-primary" />
          <h1 className="mb-4 text-4xl font-bold tracking-tight">Returns & Exchanges</h1>
        </div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-lg border bg-card p-6"
          >
            <CheckCircle className="mb-4 h-12 w-12 text-primary" />
            <h2 className="mb-4 text-2xl font-bold">30-Day Return Policy</h2>
            <p className="mb-4 text-muted-foreground">
              We offer a 30-day return policy for most items. To be eligible for a return, your item must be:
            </p>
            <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
              <li>Unworn and unused with original tags attached</li>
              <li>In the original packaging</li>
              <li>In the same condition you received it</li>
              <li>Within 30 days of delivery</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-lg border bg-card p-6"
          >
            <Clock className="mb-4 h-12 w-12 text-primary" />
            <h2 className="mb-4 text-2xl font-bold">Processing Time</h2>
            <p className="text-muted-foreground">
              Return requests are typically processed within 5-7 business days after we receive your item.
              Refunds will be credited to your original payment method.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-lg border bg-card p-6"
          >
            <AlertCircle className="mb-4 h-12 w-12 text-destructive" />
            <h2 className="mb-4 text-2xl font-bold">Non-Returnable Items</h2>
            <p className="mb-4 text-muted-foreground">
              The following items are not eligible for return:
            </p>
            <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
              <li>Personalized or custom-made items</li>
              <li>Items without original packaging</li>
              <li>Items damaged by misuse</li>
              <li>Gift cards and vouchers</li>
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

