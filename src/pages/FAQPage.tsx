import { motion } from 'framer-motion';
import { HelpCircle, ShoppingBag, Truck, CreditCard, Package } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function FAQPage() {
  const { t } = useTranslation();

  const faqs = [
    {
      category: t('pages.faq.ordering'),
      icon: ShoppingBag,
      questions: [
        {
          q: t('pages.faq.ordering1q'),
          a: t('pages.faq.ordering1a'),
        },
        {
          q: t('pages.faq.ordering2q'),
          a: t('pages.faq.ordering2a'),
        },
        {
          q: t('pages.faq.ordering3q'),
          a: t('pages.faq.ordering3a'),
        },
      ],
    },
    {
      category: t('pages.faq.shipping'),
      icon: Truck,
      questions: [
        {
          q: t('pages.faq.shipping1q'),
          a: t('pages.faq.shipping1a'),
        },
        {
          q: t('pages.faq.shipping2q'),
          a: t('pages.faq.shipping2a'),
        },
        {
          q: t('pages.faq.shipping3q'),
          a: t('pages.faq.shipping3a'),
        },
      ],
    },
    {
      category: t('pages.faq.payments'),
      icon: CreditCard,
      questions: [
        {
          q: t('pages.faq.payments1q'),
          a: t('pages.faq.payments1a'),
        },
        {
          q: t('pages.faq.payments2q'),
          a: t('pages.faq.payments2a'),
        },
        {
          q: t('pages.faq.payments3q'),
          a: t('pages.faq.payments3a'),
        },
      ],
    },
    {
      category: t('pages.faq.returns'),
      icon: Package,
      questions: [
        {
          q: t('pages.faq.returns1q'),
          a: t('pages.faq.returns1a'),
        },
        {
          q: t('pages.faq.returns2q'),
          a: t('pages.faq.returns2a'),
        },
        {
          q: t('pages.faq.returns3q'),
          a: t('pages.faq.returns3a'),
        },
      ],
    },
  ];
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-4xl"
      >
        <div className="mb-8 text-center">
          <HelpCircle className="mx-auto mb-4 h-16 w-16 text-primary" />
          <h1 className="mb-4 text-4xl font-bold tracking-tight">{t('pages.faq.title')}</h1>
        </div>

        <div className="space-y-8">
          {faqs.map((section, i) => (
            <motion.div
              key={section.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-lg border bg-card p-6"
            >
              <div className="mb-4 flex items-center gap-2">
                <section.icon className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">{section.category}</h2>
              </div>
              <div className="space-y-4">
                {section.questions.map((faq, j) => (
                  <div key={j} className="border-b pb-4 last:border-b-0 last:pb-0">
                    <h3 className="mb-2 font-semibold">{faq.q}</h3>
                    <p className="text-sm text-muted-foreground">{faq.a}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

