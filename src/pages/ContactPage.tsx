import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'react-hot-toast';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent successfully!');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-4xl"
      >
        <h1 className="mb-8 text-4xl font-bold tracking-tight">Contact Us</h1>

        <div className="mb-12 grid gap-6 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-lg border bg-card p-6 text-center"
          >
            <Mail className="mx-auto mb-4 h-12 w-12 text-primary" />
            <h3 className="mb-2 font-semibold">Email</h3>
            <p className="text-sm text-muted-foreground">contact@example.com</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-lg border bg-card p-6 text-center"
          >
            <Phone className="mx-auto mb-4 h-12 w-12 text-primary" />
            <h3 className="mb-2 font-semibold">Phone</h3>
            <p className="text-sm text-muted-foreground">+90 555 123 4567</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-lg border bg-card p-6 text-center"
          >
            <MapPin className="mx-auto mb-4 h-12 w-12 text-primary" />
            <h3 className="mb-2 font-semibold">Address</h3>
            <p className="text-sm text-muted-foreground">Istanbul, Turkey</p>
          </motion.div>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-lg border bg-card p-6"
          >
            <h2 className="mb-6 text-2xl font-bold">Send us a message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <Input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <Input
                placeholder="Subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                required
              />
              <textarea
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                className="w-full rounded-lg border bg-background px-4 py-2"
                rows={6}
              />
              <Button type="submit" className="w-full">
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="h-full rounded-lg border bg-muted/30 p-6"
          >
            <h2 className="mb-6 text-2xl font-bold">Visit Our Store</h2>
            <div className="aspect-video rounded-lg bg-muted" />
            <p className="mt-4 text-sm text-muted-foreground">
              We welcome you to visit our physical store location during business hours.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
