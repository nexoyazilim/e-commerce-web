import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

export function ContactPage() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(t('pages.contact.success'));
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-4xl"
      >
        <h1 className="mb-8 text-4xl font-bold tracking-tight">{t('pages.contact.title')}</h1>

        <div className="mb-12 grid gap-6 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-lg border bg-card p-6 text-center"
          >
            <Mail className="mx-auto mb-4 h-12 w-12 text-primary" />
            <h3 className="mb-2 font-semibold">{t('pages.contact.email')}</h3>
            <p className="text-sm text-muted-foreground">contact@example.com</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-lg border bg-card p-6 text-center"
          >
            <Phone className="mx-auto mb-4 h-12 w-12 text-primary" />
            <h3 className="mb-2 font-semibold">{t('pages.contact.phone')}</h3>
            <p className="text-sm text-muted-foreground">+90 555 123 4567</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-lg border bg-card p-6 text-center"
          >
            <MapPin className="mx-auto mb-4 h-12 w-12 text-primary" />
            <h3 className="mb-2 font-semibold">{t('pages.contact.address')}</h3>
            <p className="text-sm text-muted-foreground">Istanbul, Turkey</p>
          </motion.div>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-lg border bg-card p-6"
          >
            <h2 className="mb-6 text-2xl font-bold">{t('pages.contact.sendMessage')}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder={t('pages.contact.namePlaceholder')}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <Input
                type="email"
                placeholder={t('pages.contact.emailPlaceholder')}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <Input
                placeholder={t('pages.contact.subjectPlaceholder')}
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                required
              />
              <textarea
                placeholder={t('pages.contact.messagePlaceholder')}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                className="w-full rounded-lg border bg-background px-4 py-2"
                rows={6}
              />
              <Button type="submit" className="w-full">
                <Send className="mr-2 h-4 w-4" />
                {t('pages.contact.sendButton')}
              </Button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="h-full rounded-lg border bg-muted/30 p-6"
          >
            <h2 className="mb-6 text-2xl font-bold">{t('pages.contact.visitStore')}</h2>
            <div className="aspect-video rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.5!2d28.9784!3d41.0082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDAwJzI5LjUiTiAyOMKwNTgnNDIuMiJF!5e0!3m2!1sen!2str!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Store Location Map"
              />
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              {t('pages.contact.storeDesc')}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
