import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {

  const quickLinks = [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms & Conditions', href: '/terms' },
    { label: 'Shipping Info', href: '/shipping' },
    { label: 'Returns', href: '/returns' },
  ];

  const customerService = [
    { label: 'FAQs', href: '/faq' },
    { label: 'Track Order', href: '/track' },
    { label: 'Size Guide', href: '/size-guide' },
    { label: 'Gift Cards', href: '/gift-cards' },
    { label: 'Help Center', href: '/help' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <footer className="bg-muted/50 border-t">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="container mx-auto px-4 py-12"
      >
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <motion.div variants={itemVariants}>
            <h3 className="mb-4 text-lg font-bold">E-Commerce Demo</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Your trusted shopping destination. Quality products, great prices, exceptional service.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Istanbul, Turkey</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+90 555 123 4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>contact@example.com</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="mb-4 text-lg font-bold">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="group relative inline-block text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <span className="relative z-10">{link.label}</span>
                    <motion.span
                      className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full"
                      layoutId="underline"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Customer Service */}
          <motion.div variants={itemVariants}>
            <h3 className="mb-4 text-lg font-bold">Customer Service</h3>
            <ul className="space-y-2">
              {customerService.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="group relative inline-block text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <span className="relative z-10">{link.label}</span>
                    <motion.span
                      className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full"
                      layoutId={`underline-${link.href}`}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={itemVariants}>
            <h3 className="mb-4 text-lg font-bold">Newsletter</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Subscribe to get special offers and updates delivered right to your inbox.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-lg border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Subscribe
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Social Links */}
        <motion.div variants={itemVariants} className="mt-8 flex items-center justify-center gap-4 border-t pt-8">
          {socialLinks.map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="flex h-10 w-10 items-center justify-center rounded-full border bg-background text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              aria-label={social.label}
            >
              <social.icon className="h-5 w-5" />
            </motion.a>
          ))}
        </motion.div>

        {/* Copyright */}
        <motion.div
          variants={itemVariants}
          className="mt-8 text-center text-sm text-muted-foreground"
        >
          <p>&copy; {new Date().getFullYear()} E-Commerce Demo. All rights reserved.</p>
        </motion.div>
      </motion.div>
    </footer>
  );
}

