import { useState } from "react"
import { motion } from "framer-motion"
import { ZoomIn as ZoomIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ProductGalleryProps {
  images: string[]
  title: string
  badges?: string[]
  discountPercent?: number
}

export function ProductGallery({ images, title, badges, discountPercent }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <div className="space-y-4">
      {/* Main Image - Full Size */}
      <div className="relative w-full overflow-hidden rounded-lg border bg-muted">
        <div className="absolute top-4 left-4 z-10 flex gap-2">
          {badges?.map((badge) => (
            <Badge key={badge} className="bg-primary">
              {badge}
            </Badge>
          ))}
          {discountPercent && discountPercent > 0 && (
            <Badge variant="destructive">-{discountPercent}%</Badge>
          )}
        </div>
        
        <div className="group relative">
          <img
            src={images[selectedIndex] || images[0]}
            alt={title}
            className="w-full h-auto max-h-[600px] object-contain"
          />
          <div className="absolute bottom-4 right-4 rounded-full bg-background/80 p-2 backdrop-blur-sm opacity-0 transition-opacity group-hover:opacity-100">
            <ZoomIcon className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
        {images.slice(0, 6).map((image, index) => (
          <motion.button
            key={index}
            onClick={() => setSelectedIndex(index)}
            className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-all ${
              selectedIndex === index 
                ? "border-primary ring-2 ring-primary ring-offset-2" 
                : "border-gray-300 hover:border-primary"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img 
              src={image} 
              alt={`View ${index + 1}`} 
              className="h-full w-full object-cover"
            />
            {selectedIndex === index && (
              <div className="absolute inset-0 bg-primary/10 pointer-events-none" />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  )
}

