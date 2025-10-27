import { motion } from 'framer-motion';
import { HelpCircle, ShoppingBag, Truck, CreditCard, Package } from 'lucide-react';

const faqs = [
  {
    category: 'Ordering',
    icon: ShoppingBag,
    questions: [
      {
        q: 'How do I place an order?',
        a: 'Simply browse our products, add items to your cart, and proceed to checkout. Follow the checkout process to complete your order.',
      },
      {
        q: 'Can I modify or cancel my order?',
        a: 'You can modify or cancel your order within 1 hour of placing it by contacting our customer service.',
      },
      {
        q: 'Do you offer payment plans?',
        a: 'Yes, we offer flexible payment plans for select items. Check the product page for available options.',
      },
    ],
  },
  {
    category: 'Shipping',
    icon: Truck,
    questions: [
      {
        q: 'How long does shipping take?',
        a: 'Standard shipping takes 5-7 business days. Express options are available for faster delivery.',
      },
      {
        q: 'Do you ship internationally?',
        a: 'Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location.',
      },
      {
        q: 'Can I track my order?',
        a: 'Yes, you will receive a tracking number via email once your order ships.',
      },
    ],
  },
  {
    category: 'Payments',
    icon: CreditCard,
    questions: [
      {
        q: 'What payment methods do you accept?',
        a: 'We accept all major credit cards, PayPal, and bank transfers.',
      },
      {
        q: 'Is my payment information secure?',
        a: 'Yes, we use industry-standard encryption to protect your payment information.',
      },
      {
        q: 'When will I be charged?',
        a: 'Your payment is processed immediately when you place your order.',
      },
    ],
  },
  {
    category: 'Returns',
    icon: Package,
    questions: [
      {
        q: 'What is your return policy?',
        a: 'We offer a 30-day return policy. Items must be unworn with original tags.',
      },
      {
        q: 'How do I return an item?',
        a: 'Contact our customer service to initiate a return. We will provide you with return instructions.',
      },
      {
        q: 'Who pays for return shipping?',
        a: 'Return shipping costs are the responsibility of the customer, except in cases of defective items.',
      },
    ],
  },
];

export function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-4xl"
      >
        <div className="mb-8 text-center">
          <HelpCircle className="mx-auto mb-4 h-16 w-16 text-primary" />
          <h1 className="mb-4 text-4xl font-bold tracking-tight">Frequently Asked Questions</h1>
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

