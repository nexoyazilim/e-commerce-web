import { useState, useEffect } from 'react';
import { useScroll, useTransform, type MotionValue } from 'framer-motion';

export const useParallax = (speed: number = 0.5) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * speed);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return offset;
};

export const useParallaxTransform = (speed: number = 0.5): MotionValue<number> => {
  const { scrollYProgress } = useScroll();
  return useTransform(scrollYProgress, [0, 1], [0, speed * 100]);
};

