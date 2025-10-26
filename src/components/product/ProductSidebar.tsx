import { motion } from "framer-motion"
import { Shield, Truck, CreditCard, Clock, HelpCircle, CheckCircle } from "lucide-react"
import type { Product } from "@/types"

interface ProductSidebarProps {
  product: Product
}

export function ProductSidebar({ product }: ProductSidebarProps) {
  const trustBadges = [
    { icon: Shield, text: "2 Year Warranty", color: "text-blue-600" },
    { icon: Truck, text: "Free Shipping", color: "text-green-600" },
    { icon: CreditCard, text: "Secure Payment", color: "text-purple-600" },
    { icon: Clock, text: "24/7 Support", color: "text-orange-600" },
  ]

  const quickFeatures = [
    "Premium Sound Quality",
    "Active Noise Cancellation",
    "30+ Hours Battery Life",
    "Quick Charge 15min = 3hrs",
    "Wireless Bluetooth 5.2",
    "Comfortable Design",
  ]

  const faqItems = [
    { q: "Warranty period?", a: "2 years manufacturer warranty" },
    { q: "Return policy?", a: "30 days money back guarantee" },
    { q: "Free shipping?", a: "Yes, on orders over 500₺" },
  ]

  return (
    <div className="space-y-6">
      {/* Trust Badges */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-lg border bg-muted/30 p-4"
      >
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-green-600" />
          Why Buy From Us?
        </h3>
        <div className="space-y-2">
          {trustBadges.map((badge, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <badge.icon className={`h-4 w-4 ${badge.color}`} />
              <span className="text-muted-foreground">{badge.text}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Key Features */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-lg border bg-card p-4"
      >
        <h3 className="font-semibold mb-3">Key Features</h3>
        <ul className="space-y-2">
          {quickFeatures.map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <span className="text-primary">✓</span>
              <span className="text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Stock Info */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-900 dark:bg-green-950"
      >
        <div className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <div>
            <p className="font-semibold text-green-900 dark:text-green-100">
              In Stock & Ready to Ship
            </p>
            <p className="text-xs text-green-700 dark:text-green-300">
              Ships within 1-2 business days
            </p>
          </div>
        </div>
      </motion.div>

      {/* Quick FAQ */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-lg border bg-card p-4"
      >
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <HelpCircle className="h-4 w-4" />
          Quick Answers
        </h3>
        <div className="space-y-3">
          {faqItems.map((item, index) => (
            <div key={index} className="text-sm">
              <p className="font-medium text-foreground mb-1">Q: {item.q}</p>
              <p className="text-muted-foreground">A: {item.a}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Product Code */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center text-sm text-muted-foreground border-t pt-4"
      >
        <p>Product Code: {product.id.toUpperCase()}</p>
        <p className="text-xs mt-1">
          {product.brand} • Rated {product.rating}/5
        </p>
      </motion.div>
    </div>
  )
}

