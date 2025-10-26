import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Heart, ShoppingCart, Star } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { Product } from "@/types"
import { useCartStore } from "@/stores/cartStore"
import { useFavoritesStore } from "@/stores/favoritesStore"
import { toast } from "react-hot-toast"

interface QuickViewModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const addItem = useCartStore((state) => state.addItem)
  const isFavorite = product ? useFavoritesStore((state) => state.isFavorite(product.id)) : false
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite)

  if (!product) return null

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      variantKey: `${product.colors[0]}-${product.sizes[0]}`,
      color: product.colors[0],
      size: product.sizes[0],
    })
    toast.success("Added to cart!")
  }

  const handleToggleFavorite = () => {
    toggleFavorite(product.id)
    toast.success(isFavorite ? "Removed from favorites" : "Added to favorites")
  }

  const discountPercent = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <AnimatePresence>
        {isOpen && (
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Quick View</DialogTitle>
            </DialogHeader>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Image Gallery */}
              <div>
                <div className="mb-4">
                  <img
                    src={product.images[selectedImage] || product.images[0]}
                    alt={product.title}
                    className="w-full h-96 object-cover rounded-lg"
                  />
                </div>
                <div className="flex gap-2">
                  {product.images.slice(0, 4).map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 overflow-hidden ${
                        selectedImage === index ? "border-primary" : "border-transparent"
                      }`}
                    >
                      <img src={img} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div>
                <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
                <p className="text-muted-foreground mb-4">{product.brand}</p>

                <div className="flex items-center gap-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-sm text-muted-foreground">
                    ({product.reviewCount} reviews)
                  </span>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold">{product.price}₺</span>
                    {product.oldPrice && (
                      <span className="text-lg text-muted-foreground line-through">
                        {product.oldPrice}₺
                      </span>
                    )}
                  </div>
                  {discountPercent > 0 && (
                    <span className="inline-block mt-2 px-2 py-1 bg-destructive text-destructive-foreground text-sm rounded">
                      -{discountPercent}%
                    </span>
                  )}
                </div>

                <p className="text-sm text-muted-foreground mb-6 line-clamp-3">
                  {product.description}
                </p>

                <div className="flex gap-2">
                  <Button onClick={handleAddToCart} className="flex-1">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleToggleFavorite}
                  >
                    <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
  )
}

