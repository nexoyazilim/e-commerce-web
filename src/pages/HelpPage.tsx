import { motion } from 'framer-motion';
import { HelpCircle, Mail, Phone, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

export function HelpPage() {
  const { t } = useTranslation();
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-4xl"
      >
        <div className="mb-8 text-center">
          <HelpCircle className="mx-auto mb-4 h-16 w-16 text-primary" />
          <h1 className="mb-4 text-4xl font-bold tracking-tight">{t('pages.help.title')}</h1>
          <p className="text-muted-foreground">{t('pages.help.description')}</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-lg border bg-card p-6 text-center transition-all hover:shadow-lg"
          >
            <MessageCircle className="mx-auto mb-4 h-12 w-12 text-primary" />
            <h3 className="mb-2 font-bold">{t('pages.help.liveChat')}</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              {t('pages.help.liveChatDesc')}
            </p>
            <Button variant="outline" className="w-full">
              {t('pages.help.startChat')}
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-lg border bg-card p-6 text-center transition-all hover:shadow-lg"
          >
            <Mail className="mx-auto mb-4 h-12 w-12 text-primary" />
            <h3 className="mb-2 font-bold">{t('pages.help.emailSupport')}</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              {t('pages.help.emailSupportDesc')}
            </p>
            <Link to="/contact">
              <Button variant="outline" className="w-full">
                {t('pages.help.sendEmail')}
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-lg border bg-card p-6 text-center transition-all hover:shadow-lg"
          >
            <Phone className="mx-auto mb-4 h-12 w-12 text-primary" />
            <h3 className="mb-2 font-bold">{t('pages.help.phoneSupport')}</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              {t('pages.help.phoneSupportDesc')}
            </p>
            <div className="text-lg font-semibold">+90 555 123 4567</div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12"
        >
          <h2 className="mb-6 text-2xl font-bold">{t('pages.help.popularTopics')}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { title: t('pages.help.trackOrder'), link: '/track' },
              { title: t('pages.help.shippingInfo'), link: '/shipping' },
              { title: t('pages.help.returnsExchanges'), link: '/returns' },
              { title: t('pages.sizeGuide.title'), link: '/size-guide' },
              { title: t('pages.faq.title'), link: '/faq' },
              { title: t('pages.giftCards.title'), link: '/gift-cards' },
            ].map((topic, i) => (
              <Link key={i} to={topic.link}>
                <div className="rounded-lg border bg-card p-4 transition-all hover:shadow-md">
                  {topic.title}
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

