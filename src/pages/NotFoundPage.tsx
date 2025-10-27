import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Search, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

export function NotFoundPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const popularCategories = [
    { name: 'Electronics', href: '/category/electronics' },
    { name: 'Clothing', href: '/category/clothing' },
    { name: 'Shoes', href: '/category/shoes' },
    { name: 'Home & Living', href: '/category/home' },
  ];

  return (
    <div className="container mx-auto flex min-h-[80vh] items-center justify-center px-4">
      <div className="max-w-2xl text-center">
        {/* Animated 404 Numbers */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <motion.h1
            className="text-[120px] font-bold leading-none text-primary"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            4
            <motion.span
              animate={{
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              0
            </motion.span>
            <motion.span
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.2,
              }}
            >
              4
            </motion.span>
          </motion.h1>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-4 text-3xl font-bold"
        >
          {t('pages.notFound.title')}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-8 text-muted-foreground"
        >
          {t('pages.notFound.description')}
        </motion.p>

        {/* Floating Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden opacity-20">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-32 w-32 rounded-full bg-primary"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Search Suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mb-8"
        >
          <h3 className="mb-4 text-lg font-semibold">{t('pages.notFound.popularCategories')}</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {popularCategories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={category.href}
                  className="inline-block rounded-full border bg-card px-4 py-2 text-sm font-medium transition-colors hover:border-primary hover:bg-primary/10"
                >
                  {category.name}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button size="lg" asChild>
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                {t('pages.notFound.goHome')}
              </Link>
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button size="lg" variant="outline" asChild>
              <Link to="/products">
                <Search className="mr-2 h-4 w-4" />
                {t('pages.notFound.browseProducts')}
              </Link>
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              variant="ghost"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('pages.notFound.goBack')}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

