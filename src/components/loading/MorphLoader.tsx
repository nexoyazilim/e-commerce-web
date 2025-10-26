import { motion } from 'framer-motion';

const morphVariants = {
  initial: {
    scale: 1,
    borderRadius: '50%',
  },
  animate: {
    scale: [1, 1.2, 1],
    borderRadius: ['50%', '20%', '50%'],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export function MorphLoader({ size = 50 }: { size?: number }) {
  return (
    <motion.div
      variants={morphVariants}
      initial="initial"
      animate="animate"
      style={{
        width: size,
        height: size,
        background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
      }}
      className="mx-auto"
    />
  );
}

