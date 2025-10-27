import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContextProvider';
import { Layout } from './components/layout/Layout';
import { ScrollToTop } from './components/common/ScrollToTop';
import { PageTransition } from './components/common/PageTransition';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { LoadingSkeleton } from './components/common/LoadingSkeleton';

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const ProductsPage = lazy(() => import('./pages/ProductsPage').then(m => ({ default: m.ProductsPage })));
const ProductPage = lazy(() => import('./pages/ProductPage').then(m => ({ default: m.ProductPage })));
const CartPage = lazy(() => import('./pages/CartPage').then(m => ({ default: m.CartPage })));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage').then(m => ({ default: m.CheckoutPage })));
const ProfilePage = lazy(() => import('./pages/ProfilePage').then(m => ({ default: m.ProfilePage })));
const CategoryPage = lazy(() => import('./pages/CategoryPage').then(m => ({ default: m.CategoryPage })));
const SearchPage = lazy(() => import('./pages/SearchPage').then(m => ({ default: m.SearchPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const FavoritesPage = lazy(() => import('./pages/FavoritesPage').then(m => ({ default: m.FavoritesPage })));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage').then(m => ({ default: m.PrivacyPage })));
const TermsPage = lazy(() => import('./pages/TermsPage').then(m => ({ default: m.TermsPage })));
const ShippingPage = lazy(() => import('./pages/ShippingPage').then(m => ({ default: m.ShippingPage })));
const ReturnsPage = lazy(() => import('./pages/ReturnsPage').then(m => ({ default: m.ReturnsPage })));
const FAQPage = lazy(() => import('./pages/FAQPage').then(m => ({ default: m.FAQPage })));
const TrackOrderPage = lazy(() => import('./pages/TrackOrderPage').then(m => ({ default: m.TrackOrderPage })));
const SizeGuidePage = lazy(() => import('./pages/SizeGuidePage').then(m => ({ default: m.SizeGuidePage })));
const GiftCardsPage = lazy(() => import('./pages/GiftCardsPage').then(m => ({ default: m.GiftCardsPage })));
const HelpPage = lazy(() => import('./pages/HelpPage').then(m => ({ default: m.HelpPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

function AppRoutes() {
  const location = useLocation();

  return (
    <Suspense fallback={<LoadingSkeleton />}>
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={<PageTransition><HomePage /></PageTransition>} />
          <Route path="products" element={<PageTransition><ProductsPage /></PageTransition>} />
          <Route path="product/:slug" element={<PageTransition><ProductPage /></PageTransition>} />
          <Route path="cart" element={<PageTransition><CartPage /></PageTransition>} />
          <Route path="checkout" element={<PageTransition><CheckoutPage /></PageTransition>} />
          <Route path="profile" element={<PageTransition><ProfilePage /></PageTransition>} />
          <Route path="category/:slug" element={<PageTransition><CategoryPage /></PageTransition>} />
          <Route path="search" element={<PageTransition><SearchPage /></PageTransition>} />
          <Route path="favorites" element={<PageTransition><FavoritesPage /></PageTransition>} />
          <Route path="about" element={<PageTransition><AboutPage /></PageTransition>} />
          <Route path="contact" element={<PageTransition><ContactPage /></PageTransition>} />
          <Route path="privacy" element={<PageTransition><PrivacyPage /></PageTransition>} />
          <Route path="terms" element={<PageTransition><TermsPage /></PageTransition>} />
          <Route path="shipping" element={<PageTransition><ShippingPage /></PageTransition>} />
          <Route path="returns" element={<PageTransition><ReturnsPage /></PageTransition>} />
          <Route path="faq" element={<PageTransition><FAQPage /></PageTransition>} />
          <Route path="track" element={<PageTransition><TrackOrderPage /></PageTransition>} />
          <Route path="size-guide" element={<PageTransition><SizeGuidePage /></PageTransition>} />
          <Route path="gift-cards" element={<PageTransition><GiftCardsPage /></PageTransition>} />
          <Route path="help" element={<PageTransition><HelpPage /></PageTransition>} />
          <Route path="*" element={<PageTransition><NotFoundPage /></PageTransition>} />
        </Route>
      </Routes>
    </AnimatePresence>
    </Suspense>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <BrowserRouter basename="/e-commerce-web">
          <ScrollToTop />
          <AppRoutes />
        </BrowserRouter>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

