import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ShoppingBag, Heart, Search, Package, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { type ReactNode, type ComponentType, type SVGProps } from 'react';

interface EmptyStateProps {
  type?: 'cart' | 'favorites' | 'search' | 'orders';
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  title?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  action?: ReactNode;
  onCtaClick?: () => void;
}

export function EmptyState({ type, icon, title, description, ctaText, ctaLink, action, onCtaClick }: EmptyStateProps) {
  const { t } = useTranslation();
  
  const config = {
    cart: {
      icon: ShoppingCart,
      title: t('empty.cart'),
      description: t('empty.cartDesc'),
      ctaText: t('empty.browse'),
      ctaLink: '/products',
    },
    favorites: {
      icon: Heart,
      title: t('empty.favorites'),
      description: t('empty.favoritesDesc'),
      ctaText: t('empty.discover'),
      ctaLink: '/products',
    },
    search: {
      icon: Search,
      title: t('empty.search'),
      description: t('empty.searchDesc'),
      ctaText: t('empty.clearFilters'),
      ctaLink: '/products',
    },
    orders: {
      icon: Package,
      title: t('empty.orders'),
      description: t('empty.ordersDesc'),
      ctaText: t('empty.startShopping'),
      ctaLink: '/products',
    },
  };
  const selectedConfig = type ? config[type] : null;
  const selectedIcon = icon || selectedConfig?.icon || ShoppingBag;
  const defaultTitle = selectedConfig?.title || title || t('empty.default');
  const defaultDescription = selectedConfig?.description || description || t('empty.defaultDesc');
  const defaultCtaText = selectedConfig?.ctaText || ctaText || t('common.continue');
  const defaultCtaLink = selectedConfig?.ctaLink || ctaLink;

  const Icon = selectedIcon;

  const handleClick = () => {
    if (onCtaClick) {
      onCtaClick();
    }
  };

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center px-4 py-12 text-center">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 15,
          duration: 0.5,
        }}
        className="mb-6"
      >
        <motion.div
          className="relative inline-flex h-32 w-32 items-center justify-center rounded-full bg-muted"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Icon className="h-16 w-16 text-muted-foreground" />
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mb-2 text-2xl font-bold"
      >
        {title || defaultTitle}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mb-8 text-muted-foreground"
      >
        {description || defaultDescription}
      </motion.p>

      {action || ((defaultCtaLink || onCtaClick) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {action || (defaultCtaLink ? (
            <Button size="lg" asChild>
              <Link to={defaultCtaLink}>{ctaText || defaultCtaText}</Link>
            </Button>
          ) : (
            <Button size="lg" onClick={handleClick}>
              {ctaText || defaultCtaText}
            </Button>
          ))}
        </motion.div>
      ))}
    </div>
  );
}

