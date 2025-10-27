import { motion } from 'framer-motion';
import { Gift, Sparkles, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function GiftCardsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-4xl"
      >
        <div className="mb-8 text-center">
          <Gift className="mx-auto mb-4 h-16 w-16 text-primary" />
          <h1 className="mb-4 text-4xl font-bold tracking-tight">Gift Cards</h1>
        </div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-lg border bg-gradient-to-br from-primary/10 to-primary/5 p-8 text-center"
          >
            <Sparkles className="mx-auto mb-4 h-16 w-16 text-primary" />
            <h2 className="mb-4 text-2xl font-bold">The Perfect Gift</h2>
            <p className="mb-6 text-muted-foreground">
              Give the gift of choice with our flexible gift cards. They never expire and can be used on any product.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {[100, 250, 500].map((amount) => (
                <div key={amount} className="rounded-lg border bg-card p-6">
                  <div className="text-3xl font-bold">{amount}₺</div>
                </div>
              ))}
            </div>
            <Button size="lg" className="mt-6">
              Purchase Gift Card
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-lg border bg-card p-6"
          >
            <CreditCard className="mb-4 h-12 w-12 text-primary" />
            <h2 className="mb-4 text-2xl font-bold">How It Works</h2>
            <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
              <li>Choose your gift card amount</li>
              <li>Complete secure payment</li>
              <li>Receive gift card via email instantly</li>
              <li>Redeem at checkout with your unique code</li>
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

