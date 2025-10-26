import { useEffect, useRef } from 'react';
import { motion, useAnimationControls } from 'framer-motion';

interface FlyToCartProps {
  trigger: boolean;
  image: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  onComplete: () => void;
}

export function FlyToCart({ trigger, image, startX, startY, endX, endY, onComplete }: FlyToCartProps) {
  const controls = useAnimationControls();

  useEffect(() => {
    if (trigger) {
      // Start the animation
      controls.start({
        x: [startX, endX, endX],
        y: [startY, startY - 100, endY],
        scale: [1, 1.1, 0.2],
        opacity: [1, 1, 0],
        rotate: [0, 180, 360],
        transition: {
          duration: 0.8,
          times: [0, 0.5, 1],
          ease: 'easeOut',
          onComplete,
        },
      });
    }
  }, [trigger, controls, startX, startY, endX, endY, onComplete]);

  if (!trigger) return null;

  return (
    <motion.div
      animate={controls}
      className="pointer-events-none fixed z-[9999]"
      style={{
        left: 0,
        top: 0,
      }}
    >
      <div className="relative h-20 w-20">
        <img
          src={image}
          alt="flying product"
          className="h-full w-full rounded-lg object-cover shadow-2xl"
        />
      </div>
    </motion.div>
  );
}

