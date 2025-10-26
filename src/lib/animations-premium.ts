import type { Variants, Transition } from 'framer-motion';

// Core animation variants
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -60 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

export const scaleIn: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      type: 'spring',
      stiffness: 300,
      damping: 25,
    },
  },
};

export const slideIn = (direction: 'left' | 'right' | 'up' | 'down' = 'left'): Variants => {
  const directions = {
    left: { x: -100, y: 0 },
    right: { x: 100, y: 0 },
    up: { x: 0, y: 100 },
    down: { x: 0, y: -100 },
  };

  return {
    hidden: { opacity: 0, ...directions[direction] },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };
};

export const clipPath: Variants = {
  hidden: { clipPath: 'circle(0% at 50% 50%)' },
  show: {
    clipPath: 'circle(150% at 50% 50%)',
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

export const blur: Variants = {
  hidden: { opacity: 0, filter: 'blur(20px)' },
  show: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

export const rotate: Variants = {
  hidden: { opacity: 0, rotate: -180 },
  show: {
    opacity: 1,
    rotate: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

export const slideRotate: Variants = {
  hidden: { opacity: 0, x: -100, rotate: -10 },
  show: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

// Transition presets
export const springTransition: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
};

export const smoothTransition: Transition = {
  duration: 0.3,
  ease: [0.4, 0, 0.2, 1],
};

export const bounceTransition: Transition = {
  type: 'spring',
  stiffness: 400,
  damping: 10,
};

// Utility functions
export const calculate3DRotation = (x: number, y: number, rect: DOMRect) => {
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const rotateX = ((y - centerY) / rect.height) * 20;
  const rotateY = ((centerX - x) / rect.width) * 20;
  return { rotateX, rotateY };
};

export const calculateParallax = (scrollY: number, speed: number) => {
  return scrollY * speed;
};

// Page transition variants based on route depth
export const getPageTransition = (path: string) => {
  const depth = path.split('/').length - 1;

  if (depth === 1) {
    return {
      initial: { opacity: 0, x: 100 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -100 },
    };
  } else if (depth === 2) {
    return {
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -50 },
    };
  } else {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    };
  }
};

