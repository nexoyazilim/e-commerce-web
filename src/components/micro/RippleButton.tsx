import { type ReactNode, useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface RippleButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function RippleButton({ children, className = '', onClick }: RippleButtonProps) {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const timeoutIdsRef = useRef<number[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = {
      id: Date.now(),
      x,
      y,
    };
    
    setRipples((prev) => [...prev, newRipple]);
    
    const timeoutId = window.setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
      // Remove from tracking array
      timeoutIdsRef.current = timeoutIdsRef.current.filter(id => id !== timeoutId);
    }, 600);
    
    // Track timeout ID
    timeoutIdsRef.current.push(timeoutId);
    
    onClick?.();
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      timeoutIdsRef.current.forEach(clearTimeout);
      timeoutIdsRef.current = [];
    };
  }, []);

  return (
    <button
      onClick={handleClick}
      className={`relative overflow-hidden ${className}`}
    >
      {children}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="absolute pointer-events-none bg-white/40 rounded-full"
          initial={{ width: 0, height: 0, x: ripple.x, y: ripple.y }}
          animate={{ width: 200, height: 200, x: ripple.x - 100, y: ripple.y - 100 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{
            borderRadius: '50%',
          }}
        />
      ))}
    </button>
  );
}

