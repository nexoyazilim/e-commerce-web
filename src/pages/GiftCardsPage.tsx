import { motion } from 'framer-motion';
import { Gift, Sparkles, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

export function GiftCardsPage() {
  const { t } = useTranslation();
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-4xl"
      >
        <div className="mb-8 text-center">
          <Gift className="mx-auto mb-4 h-16 w-16 text-primary" />
          <h1 className="mb-4 text-4xl font-bold tracking-tight">{t('pages.giftCards.title')}</h1>
        </div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-lg border bg-gradient-to-br from-primary/10 to-primary/5 p-8 text-center"
          >
            <Sparkles className="mx-auto mb-4 h-16 w-16 text-primary" />
            <h2 className="mb-4 text-2xl font-bold">{t('pages.giftCards.perfectGift')}</h2>
            <p className="mb-6 text-muted-foreground">
              {t('pages.giftCards.perfectGiftDesc')}
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {[100, 250, 500].map((amount) => (
                <div key={amount} className="rounded-lg border bg-card p-6">
                  <div className="text-3xl font-bold">{amount}₺</div>
                </div>
              ))}
            </div>
            <Button size="lg" className="mt-6">
              {t('pages.giftCards.purchase')}
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-lg border bg-card p-6"
          >
            <CreditCard className="mb-4 h-12 w-12 text-primary" />
            <h2 className="mb-4 text-2xl font-bold">{t('pages.giftCards.howItWorks')}</h2>
            <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
              <li>{t('pages.giftCards.chooseAmount')}</li>
              <li>{t('pages.giftCards.securePayment')}</li>
              <li>{t('pages.giftCards.receiveEmail')}</li>
              <li>{t('pages.giftCards.redeem')}</li>
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

