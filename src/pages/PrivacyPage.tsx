import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function PrivacyPage() {
  const { t } = useTranslation();
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-4xl"
      >
        <div className="mb-8 text-center">
          <Shield className="mx-auto mb-4 h-16 w-16 text-primary" />
          <h1 className="mb-4 text-4xl font-bold tracking-tight">{t('pages.privacy.title')}</h1>
          <p className="text-lg text-muted-foreground">{t('pages.privacy.lastUpdated')}: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="space-y-6">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold">
              <Lock className="h-6 w-6 text-primary" />
              {t('pages.privacy.informationWeCollect')}
            </h2>
            <p className="mb-4 text-muted-foreground">
              {t('pages.privacy.informationWeCollectDesc')}
            </p>
            <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
              <li>{t('pages.privacy.personalInfo')}</li>
              <li>{t('pages.privacy.accountInfo')}</li>
              <li>{t('pages.privacy.paymentInfo')}</li>
              <li>{t('pages.privacy.shippingAddress')}</li>
              <li>{t('pages.privacy.reviews')}</li>
            </ul>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold">
              <Eye className="h-6 w-6 text-primary" />
              {t('pages.privacy.howWeUse')}
            </h2>
            <p className="mb-4 text-muted-foreground">
              {t('pages.privacy.howWeUseDesc')}
            </p>
            <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
              <li>{t('pages.privacy.processOrders')}</li>
              <li>{t('pages.privacy.communicate')}</li>
              <li>{t('pages.privacy.improve')}</li>
              <li>{t('pages.privacy.promotional')}</li>
              <li>{t('pages.privacy.security')}</li>
            </ul>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold">
              <Shield className="h-6 w-6 text-primary" />
              {t('pages.privacy.dataSecurity')}
            </h2>
            <p className="mb-4 text-muted-foreground">
              {t('pages.privacy.dataSecurityDesc')}
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold">
              <FileText className="h-6 w-6 text-primary" />
              {t('pages.privacy.yourRights')}
            </h2>
            <p className="mb-4 text-muted-foreground">
              {t('pages.privacy.yourRightsDesc')}
            </p>
            <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
              <li>{t('pages.privacy.access')}</li>
              <li>{t('pages.privacy.correct')}</li>
              <li>{t('pages.privacy.delete')}</li>
              <li>{t('pages.privacy.optOut')}</li>
              <li>{t('pages.privacy.portability')}</li>
            </ul>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="mb-4 text-2xl font-bold">{t('pages.privacy.contact')}</h2>
            <p className="text-muted-foreground">
              {t('pages.privacy.contactDesc')}
            </p>
          </motion.section>
        </div>
      </motion.div>
    </div>
  );
}

