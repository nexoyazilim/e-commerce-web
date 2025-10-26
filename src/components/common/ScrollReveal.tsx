import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, type ReactNode } from "react"

interface ScrollRevealProps {
  children: ReactNode
  delay?: number
  className?: string
  variant?: "fadeUp" | "fadeIn" | "scale"
}

export function ScrollReveal({ children, delay = 0, className = "", variant = "fadeUp" }: ScrollRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const variants = {
    fadeUp: {
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0 },
    },
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
    },
    scale: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
    },
  }

  const selectedVariant = variants[variant]

  return (
    <motion.div
      ref={ref}
      initial={selectedVariant.initial}
      animate={isInView ? selectedVariant.animate : selectedVariant.initial}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

