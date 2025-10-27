import { useEffect } from "react"
import confetti from "canvas-confetti"

interface ConfettiEffectProps {
  trigger: boolean
  options?: confetti.Options
}

export function ConfettiEffect({ trigger, options }: ConfettiEffectProps) {
  useEffect(() => {
    if (trigger) {
      const defaults = {
        spread: 360,
        ticks: 50,
        gravity: 0.5,
        origin: { x: 0.5, y: 0.5 },
        colors: ["#6366f1", "#f97316", "#10b981", "#ef4444", "#f59e0b"],
        ...options,
      }

      // Fire from multiple points
      confetti({
        ...defaults,
        angle: 60,
      })

      confetti({
        ...defaults,
        angle: 120,
      })

      const timeoutId = setTimeout(() => {
        confetti({
          ...defaults,
          startVelocity: 30,
          spread: 360,
        })
      }, 250)

      // Cleanup timeout on unmount or trigger change
      return () => {
        clearTimeout(timeoutId);
      }
    }
  }, [trigger, options])

  return null
}

