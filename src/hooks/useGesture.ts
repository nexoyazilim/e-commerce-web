import { useDrag, usePinch } from '@use-gesture/react';
import type { DragState, PinchState } from '@use-gesture/react';

interface UseSwipeToDeleteOptions {
  threshold?: number;
  velocityThreshold?: number;
  onDelete: () => void;
}

export const useSwipeToDelete = ({ threshold = 100, velocityThreshold = 0.5, onDelete }: UseSwipeToDeleteOptions) => {
  const bind = useDrag(({ movement: [mx], velocity: [vx], direction: [xDir] }: DragState) => {
    if (Math.abs(mx) > threshold && Math.abs(vx) > velocityThreshold && xDir > 0) {
      onDelete();
    }
  });

  return bind;
};

export const usePinchZoom = (callback: (scale: number) => void) => {
  const bind = usePinch(({ offset: [scale] }: PinchState) => {
    callback(scale);
  });

  return bind;
};

