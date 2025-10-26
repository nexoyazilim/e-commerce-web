import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { CookieBanner } from './CookieBanner';
import { ComparisonBar } from '@/components/product/ComparisonBar';
import { ComparisonTable } from '@/components/product/ComparisonTable';
import { Toaster } from 'react-hot-toast';
import { useProductComparison } from '@/hooks/useProductComparison';

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
      <ComparisonTable isOpen={isOpen} />
      <Toaster position="top-right" />
    </div>
  );
}

