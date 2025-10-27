import { motion } from 'framer-motion';
import { Scale, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function TermsPage() {
  const { t } = useTranslation();
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-4xl"
      >
        <div className="mb-8 text-center">
          <Scale className="mx-auto mb-4 h-16 w-16 text-primary" />
          <h1 className="mb-4 text-4xl font-bold tracking-tight">{t('pages.terms.title')}</h1>
          <p className="text-lg text-muted-foreground">{t('pages.terms.lastUpdated')}: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="space-y-6">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold">
              <FileText className="h-6 w-6 text-primary" />
              {t('pages.terms.agreement')}
            </h2>
            <p className="text-muted-foreground">
              {t('pages.terms.agreementDesc')}
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold">
              <CheckCircle className="h-6 w-6 text-primary" />
              {t('pages.terms.useLicense')}
            </h2>
            <p className="mb-4 text-muted-foreground">
              {t('pages.terms.useLicenseDesc')}
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold">
              <AlertCircle className="h-6 w-6 text-primary" />
              {t('pages.terms.disclaimer')}
            </h2>
            <p className="text-muted-foreground">
              {t('pages.terms.disclaimerDesc')}
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="mb-4 text-2xl font-bold">{t('pages.terms.limitations')}</h2>
            <p className="text-muted-foreground">
              {t('pages.terms.limitationsDesc')}
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="mb-4 text-2xl font-bold">{t('pages.terms.revisions')}</h2>
            <p className="text-muted-foreground">
              {t('pages.terms.revisionsDesc')}
            </p>
          </motion.section>
        </div>
      </motion.div>
    </div>
  );
}

