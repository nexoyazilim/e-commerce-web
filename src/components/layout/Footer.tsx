import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Facebook, Twitter, Instagram, Youtube, Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {
  const { t } = useTranslation();
  
  const quickLinks = [
    { label: t('footer.links.aboutUs'), href: '/about' },
    { label: t('footer.links.contact'), href: '/contact' },
    { label: t('footer.links.privacy'), href: '/privacy' },
    { label: t('footer.links.terms'), href: '/terms' },
    { label: t('footer.links.shipping'), href: '/shipping' },
    { label: t('footer.links.returns'), href: '/returns' },
  ];

  const customerService = [
    { label: t('footer.links.faq'), href: '/faq' },
    { label: t('footer.links.track'), href: '/track' },
    { label: t('footer.links.sizeGuide'), href: '/size-guide' },
    { label: t('footer.links.giftCards'), href: '/gift-cards' },
    { label: t('footer.links.help'), href: '/help' },
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
            <h3 className="mb-4 text-lg font-bold">{t('footer.company')}</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              {t('app.tagline')}
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{t('footer.address')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>{t('footer.phone')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>{t('footer.email')}</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="mb-4 text-lg font-bold">{t('footer.quickLinks')}</h3>
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
            <h3 className="mb-4 text-lg font-bold">{t('footer.customerService')}</h3>
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
            <h3 className="mb-4 text-lg font-bold">{t('footer.newsletter')}</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              {t('footer.subscribeDesc')}
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder={t('footer.enterEmail')}
                className="flex-1 rounded-lg border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                {t('actions.subscribe')}
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
          <p>{t('footer.copyright')}</p>
        </motion.div>
      </motion.div>
    </footer>
  );
}

