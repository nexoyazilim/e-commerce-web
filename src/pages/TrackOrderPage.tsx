import { useState } from 'react';
import { motion } from 'framer-motion';
import { PackageSearch, ArrowRight, CheckCircle2, Clock, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTranslation } from 'react-i18next';

export function TrackOrderPage() {
  const { t } = useTranslation();
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
          <h1 className="mb-4 text-4xl font-bold tracking-tight">{t('pages.trackOrder.title')}</h1>
          <p className="text-muted-foreground">
            {t('pages.trackOrder.description')}
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
              placeholder={t('pages.trackOrder.placeholder')}
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="flex-1"
            />
            <Button type="submit">
              {t('pages.trackOrder.trackOrder')}
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
            <h2 className="mb-6 text-2xl font-bold">{t('pages.trackOrder.orderStatus')}</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-500" />
                <div>
                  <p className="font-semibold">{t('pages.trackOrder.confirmed')}</p>
                  <p className="text-sm text-muted-foreground">{t('pages.trackOrder.confirmedDesc')}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-500" />
                <div>
                  <p className="font-semibold">{t('pages.trackOrder.paymentReceived')}</p>
                  <p className="text-sm text-muted-foreground">{t('pages.trackOrder.paymentReceivedDesc')}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-6 w-6 text-yellow-500" />
                <div>
                  <p className="font-semibold">{t('pages.trackOrder.processing')}</p>
                  <p className="text-sm text-muted-foreground">{t('pages.trackOrder.processingDesc')}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Truck className="h-6 w-6 text-blue-500" />
                <div>
                  <p className="font-semibold">{t('pages.trackOrder.outForDelivery')}</p>
                  <p className="text-sm text-muted-foreground">{t('pages.trackOrder.outForDeliveryDesc')}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

