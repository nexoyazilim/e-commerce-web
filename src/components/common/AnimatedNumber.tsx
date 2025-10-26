import { useEffect, useRef } from "react"
import { useInView, useMotionValue, useSpring } from "framer-motion"

interface AnimatedNumberProps {
  value: number
  className?: string
  prefix?: string
  suffix?: string
  decimals?: number
}

export function AnimatedNumber({
  value,
  className = "",
  prefix = "",
  suffix = "",
  decimals = 0,
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  })
  const isInView = useInView(ref, { once: true, margin: "0px" })

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [motionValue, isInView, value])

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = latest.toFixed(decimals)
      }
    })
  }, [springValue, decimals])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  )
}

