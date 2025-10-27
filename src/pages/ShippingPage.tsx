import { motion } from 'framer-motion';
import { Truck, Package, Clock, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function ShippingPage() {
  const { t } = useTranslation();
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-4xl"
      >
        <div className="mb-8 text-center">
          <Truck className="mx-auto mb-4 h-16 w-16 text-primary" />
          <h1 className="mb-4 text-4xl font-bold tracking-tight">{t('pages.shipping.title')}</h1>
        </div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-lg border bg-card p-6"
          >
            <Package className="mb-4 h-12 w-12 text-primary" />
            <h2 className="mb-4 text-2xl font-bold">{t('pages.shipping.methods')}</h2>
            <p className="mb-4 text-muted-foreground">
              {t('pages.shipping.methodsDesc')}
            </p>
            <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
              <li>{t('pages.shipping.standard')}</li>
              <li>{t('pages.shipping.express')}</li>
              <li>{t('pages.shipping.overnight')}</li>
              <li>{t('pages.shipping.international')}</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-lg border bg-card p-6"
          >
            <Truck className="mb-4 h-12 w-12 text-primary" />
            <h2 className="mb-4 text-2xl font-bold">{t('pages.shipping.freeShipping')}</h2>
            <p className="text-muted-foreground">
              {t('pages.shipping.freeShippingDesc')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-lg border bg-card p-6"
          >
            <Clock className="mb-4 h-12 w-12 text-primary" />
            <h2 className="mb-4 text-2xl font-bold">{t('pages.shipping.processingTime')}</h2>
            <p className="text-muted-foreground">
              {t('pages.shipping.processingTimeDesc')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-lg border bg-card p-6"
          >
            <MapPin className="mb-4 h-12 w-12 text-primary" />
            <h2 className="mb-4 text-2xl font-bold">{t('pages.shipping.locations')}</h2>
            <p className="text-muted-foreground">
              {t('pages.shipping.locationsDesc')}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

