import { useState, useEffect } from 'react';

interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  triggerOnce?: boolean;
}

export const useIntersectionObserver = (options: UseIntersectionObserverOptions = {}) => {
  const { triggerOnce = false, threshold = 0.1, root = null, rootMargin = '0px' } = options;
  const [ref, setRef] = useState<Element | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, root, rootMargin }
    );

    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, threshold, root, rootMargin, triggerOnce]);

  return [setRef, isVisible] as const;
};

export const useIntersectionObserverRef = (options: UseIntersectionObserverOptions = {}) => {
  const [setRef, isVisible] = useIntersectionObserver(options);
  return { ref: setRef, isVisible };
};

