import { useState, useRef, useCallback } from 'react';
import { useMotionValue, useSpring, type MotionValue } from 'framer-motion';

interface Rotation {
  rotateX: number;
  rotateY: number;
}

interface Use3DCardOptions {
  maxRotation?: number;
  perspective?: number;
  springConfig?: {
    stiffness: number;
    damping: number;
  };
}

export const use3DCard = (options: Use3DCardOptions = {}) => {
  const { maxRotation = 20, perspective = 1000, springConfig = { stiffness: 300, damping: 30 } } = options;
  
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  
  const springX = useSpring(rotateX, springConfig);
  const springY = useSpring(rotateY, springConfig);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current || !isHovering) return;

      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (centerX - e.clientX) / rect.width;
      const deltaY = (centerY - e.clientY) / rect.height;
      
      rotateX.set(deltaY * maxRotation);
      rotateY.set(deltaX * maxRotation);
    },
    [isHovering, maxRotation, rotateX, rotateY]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  return {
    ref: cardRef,
    isHovering,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
    rotateX: springX,
    rotateY: springY,
    style: {
      perspective,
      transformStyle: 'preserve-3d' as const,
    },
  };
};

