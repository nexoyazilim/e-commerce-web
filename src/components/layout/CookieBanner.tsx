import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Cookie } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      // Small delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
          }}
          className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background shadow-lg"
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
              <div className="flex items-start gap-3">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Cookie className="h-6 w-6 text-primary" />
                </motion.div>
                <div>
                  <h3 className="mb-1 font-semibold">We value your privacy</h3>
                  <p className="text-sm text-muted-foreground">
                    We use cookies to enhance your browsing experience, serve personalized content, and analyze our
                    traffic. By clicking "Accept All", you consent to our use of cookies.
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDecline}
                    className="hover:bg-destructive/10 hover:text-destructive"
                  >
                    Decline
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="sm"
                    onClick={handleAccept}
                    className="bg-primary hover:bg-primary/90"
                  >
                    Accept All
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

