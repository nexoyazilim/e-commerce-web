import { useState, memo, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';                                                                          
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Product } from '@/types';

// Define PanInfo type locally since it's not exported from framer-motion
interface PanInfo {
  offset: { x: number; y: number };
  velocity: { x: number; y: number };
}

interface CartItemProps {
  product: Product;
  color: string;
  size: string;
  quantity: number;
  onQuantityChange: (value: number) => void;
  onRemove: () => void;
}

function CartItem({
  product,
  color,
  size,
  quantity,
  onQuantityChange,
  onRemove,
}: CartItemProps) {
  const [isRemoving, setIsRemoving] = useState(false);
  const x = useMotionValue(0);
  const deleteOpacity = useTransform(x, [-100, 0], [1, 0]);

  const SWIPE_THRESHOLD = -80;

  const handleRemove = useCallback(() => {
    setIsRemoving(true);
    setTimeout(() => {
      onRemove();
    }, 300);
  }, [onRemove]);

  const handlePanEnd = useCallback((_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {                                                                         
    if (info.offset.x < SWIPE_THRESHOLD) {
      handleRemove();
    }
    x.set(0);
  }, [handleRemove, x, SWIPE_THRESHOLD]);

  const increment = useCallback(() => onQuantityChange(quantity + 1), [quantity, onQuantityChange]);
  const decrement = useCallback(() => quantity > 1 && onQuantityChange(quantity - 1), [quantity, onQuantityChange]);

  const subtotal = product.price * quantity;

  return (
    <div className="relative overflow-hidden">
      {/* Delete background that appears on swipe */}
      <motion.div
        style={{ opacity: deleteOpacity }}
        className="absolute inset-0 flex items-center justify-end bg-destructive pr-8"
      >
        <Trash2 className="h-8 w-8 text-destructive-foreground" />
      </motion.div>

      <AnimatePresence>
        {!isRemoving && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
            className="relative flex gap-4 rounded-lg border bg-card p-4"
            drag="x"
            dragConstraints={{ left: -100, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handlePanEnd}
            style={{ x }}
          >
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
              <img
                src={product.images[0]}
                alt={product.title}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <h3 className="font-semibold">{product.title}</h3>
              <p className="text-sm text-muted-foreground">
                {color} • {size}
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={decrement}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center font-semibold">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={increment}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex flex-col items-end justify-between">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive"
                onClick={handleRemove}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <p className="text-lg font-bold">{subtotal}₺</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default memo(CartItem);
export { CartItem };
