import { motion } from 'framer-motion';
import { RotateCcw, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function ReturnsPage() {
  const { t } = useTranslation();
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-4xl"
      >
        <div className="mb-8 text-center">
          <RotateCcw className="mx-auto mb-4 h-16 w-16 text-primary" />
          <h1 className="mb-4 text-4xl font-bold tracking-tight">{t('pages.returns.title')}</h1>
        </div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-lg border bg-card p-6"
          >
            <CheckCircle className="mb-4 h-12 w-12 text-primary" />
            <h2 className="mb-4 text-2xl font-bold">{t('pages.returns.policy')}</h2>
            <p className="mb-4 text-muted-foreground">
              {t('pages.returns.policyDesc')}
            </p>
            <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
              <li>{t('pages.returns.unworn')}</li>
              <li>{t('pages.returns.packaging')}</li>
              <li>{t('pages.returns.condition')}</li>
              <li>{t('pages.returns.timeframe')}</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-lg border bg-card p-6"
          >
            <Clock className="mb-4 h-12 w-12 text-primary" />
            <h2 className="mb-4 text-2xl font-bold">{t('pages.returns.processing')}</h2>
            <p className="text-muted-foreground">
              {t('pages.returns.processingDesc')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-lg border bg-card p-6"
          >
            <AlertCircle className="mb-4 h-12 w-12 text-destructive" />
            <h2 className="mb-4 text-2xl font-bold">{t('pages.returns.nonReturnable')}</h2>
            <p className="mb-4 text-muted-foreground">
              {t('pages.returns.nonReturnableDesc')}
            </p>
            <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
              <li>{t('pages.returns.personalized')}</li>
              <li>{t('pages.returns.noPackaging')}</li>
              <li>{t('pages.returns.damaged')}</li>
              <li>{t('pages.returns.giftCards')}</li>
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

