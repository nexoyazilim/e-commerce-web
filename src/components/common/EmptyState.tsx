import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, Search, Package, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ReactNode, ComponentType, SVGProps } from 'react';

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

const config = {
  cart: {
    icon: ShoppingCart,
    title: 'Your cart is empty',
    description: 'Start shopping to add items to your cart',
    ctaText: 'Browse Products',
    ctaLink: '/products',
  },
  favorites: {
    icon: Heart,
    title: 'No favorites yet',
    description: 'Save products you love for easy access later',
    ctaText: 'Discover Products',
    ctaLink: '/products',
  },
  search: {
    icon: Search,
    title: 'No results found',
    description: 'Try adjusting your search or filters',
    ctaText: 'Clear Filters',
    ctaLink: '/products',
  },
  orders: {
    icon: Package,
    title: 'No orders yet',
    description: 'Start shopping to see your orders here',
    ctaText: 'Start Shopping',
    ctaLink: '/products',
  },
};

export function EmptyState({ type, icon, title, description, ctaText, ctaLink, action, onCtaClick }: EmptyStateProps) {
  const selectedConfig = type ? config[type] : null;
  const selectedIcon = icon || selectedConfig?.icon || ShoppingBag;
  const defaultTitle = selectedConfig?.title || title || 'Empty';
  const defaultDescription = selectedConfig?.description || description || 'Nothing to show';
  const defaultCtaText = selectedConfig?.ctaText || ctaText || 'Continue';
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

