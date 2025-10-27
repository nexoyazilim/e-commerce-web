import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ZoomIn as ZoomIcon, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface ProductGalleryProps {
  images: string[]
  title: string
  badges?: string[]
  discountPercent?: number
}

export function ProductGallery({ images, title, badges, discountPercent }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [showZoomModal, setShowZoomModal] = useState(false)

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
        
        <div className="group relative cursor-pointer" onClick={() => setShowZoomModal(true)}>
          <img
            src={images[selectedIndex] || images[0]}
            alt={title}
            className="w-full h-auto max-h-[600px] object-contain"
          />
          <div className="absolute bottom-4 right-4 rounded-full bg-background/80 p-2 backdrop-blur-sm opacity-0 transition-opacity group-hover:opacity-100">
            <ZoomIcon className="h-5 w-5" />
          </div>
        </div>

        {/* Zoom Modal */}
        <AnimatePresence>
          {showZoomModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
              onClick={() => setShowZoomModal(false)}
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="relative max-w-7xl max-h-[90vh] p-4"
                onClick={(e) => e.stopPropagation()}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-6 right-6 z-10 text-white hover:bg-white/20"
                  onClick={() => setShowZoomModal(false)}
                >
                  <X className="h-6 w-6" />
                </Button>
                <img
                  src={images[selectedIndex] || images[0]}
                  alt={title}
                  className="max-h-[90vh] w-auto object-contain rounded-lg"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
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

