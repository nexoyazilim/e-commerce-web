import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ChevronRight, Home } from "lucide-react"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-2 text-sm text-muted-foreground">
      <Link to="/" className="hover:text-foreground transition-colors">
        <Home className="h-4 w-4" />
      </Link>
      {items.map((item, index) => {
        const isLast = index === items.length - 1

        return (
          <div key={index} className="flex items-center gap-2">
            <ChevronRight className="h-4 w-4" />
            {isLast || !item.href ? (
              <span className="text-foreground font-medium">{item.label}</span>
            ) : (
              <Link
                to={item.href}
                className="hover:text-foreground transition-colors relative group"
              >
                {item.label}
                <motion.span
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all"
                  initial={false}
                />
              </Link>
            )}
          </div>
        )
      })}
    </nav>
  )
}

