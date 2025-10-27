import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { CookieBanner } from './CookieBanner';
import { ComparisonBar } from '@/components/product/ComparisonBar';
import { Toaster } from 'react-hot-toast';
import { useProductComparison } from '@/hooks/useProductComparison';

const ComparisonTable = lazy(() => import('@/components/product/ComparisonTable').then(m => ({ default: m.ComparisonTable })));

export function Layout() {
  const { isOpen } = useProductComparison();
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="min-h-[calc(100vh-4rem)]">
        <Outlet />
      </main>
      <Footer />
      <CookieBanner />
      <ComparisonBar />
      {isOpen && (
        <Suspense fallback={null}>
          <ComparisonTable isOpen={isOpen} />
        </Suspense>
      )}
      <Toaster position="top-right" />
    </div>
  );
}

