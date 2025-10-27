import { motion } from 'framer-motion';
import { HelpCircle, MessageSquare, Mail, Phone, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function HelpPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-4xl"
      >
        <div className="mb-8 text-center">
          <HelpCircle className="mx-auto mb-4 h-16 w-16 text-primary" />
          <h1 className="mb-4 text-4xl font-bold tracking-tight">Help Center</h1>
          <p className="text-muted-foreground">How can we assist you today?</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-lg border bg-card p-6 text-center transition-all hover:shadow-lg"
          >
            <MessageCircle className="mx-auto mb-4 h-12 w-12 text-primary" />
            <h3 className="mb-2 font-bold">Live Chat</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Chat with our support team for instant help
            </p>
            <Button variant="outline" className="w-full">
              Start Chat
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-lg border bg-card p-6 text-center transition-all hover:shadow-lg"
          >
            <Mail className="mx-auto mb-4 h-12 w-12 text-primary" />
            <h3 className="mb-2 font-bold">Email Support</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Send us an email and we'll respond within 24 hours
            </p>
            <Link to="/contact">
              <Button variant="outline" className="w-full">
                Send Email
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
            <h3 className="mb-2 font-bold">Phone Support</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Call us Monday-Friday, 9am-6pm
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
          <h2 className="mb-6 text-2xl font-bold">Popular Topics</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { title: 'Track Your Order', link: '/track' },
              { title: 'Shipping Information', link: '/shipping' },
              { title: 'Returns & Exchanges', link: '/returns' },
              { title: 'Size Guide', link: '/size-guide' },
              { title: 'FAQ', link: '/faq' },
              { title: 'Gift Cards', link: '/gift-cards' },
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

