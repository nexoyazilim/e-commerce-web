import { motion } from "framer-motion"
import { ColorSwatch } from "@/components/common/ColorSwatch"
import { QuantitySelector } from "@/components/common/QuantitySelector"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface VariantSelectorProps {
  colors: string[]
  sizes: string[]
  selectedColor?: string
  selectedSize?: string
  quantity: number
  inStock: boolean
  onColorChange: (color: string) => void
  onSizeChange: (size: string) => void
  onQuantityChange: (quantity: number) => void
}

export function VariantSelector({
  colors,
  sizes,
  selectedColor,
  selectedSize,
  quantity,
  inStock,
  onColorChange,
  onSizeChange,
  onQuantityChange,
}: VariantSelectorProps) {
  return (
    <div className="space-y-6">
      {/* Color Selector */}
      <div>
        <label className="mb-2 block text-sm font-semibold">
          Color: <span className="font-normal">{selectedColor}</span>
        </label>
        <ColorSwatch
          colors={colors}
          selectedColor={selectedColor}
          onColorSelect={onColorChange}
        />
      </div>

      {/* Size Selector */}
      <div>
        <label className="mb-2 block text-sm font-semibold">Size</label>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <motion.button
              key={size}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSizeChange(size)}
              className={`rounded-md border px-4 py-2 text-sm font-medium transition-all ${
                selectedSize === size
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-gray-300 hover:border-primary"
              }`}
            >
              {size}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Quantity Selector */}
      <div>
        <label className="mb-2 block text-sm font-semibold">Quantity</label>
        <QuantitySelector
          value={quantity}
          onChange={onQuantityChange}
          min={1}
          max={10}
        />
      </div>

      {/* Stock Status */}
      <div>
        {inStock ? (
          <Badge variant="default" className="bg-green-500">
            ✓ In Stock
          </Badge>
        ) : (
          <Badge variant="destructive">Out of Stock</Badge>
        )}
      </div>
    </div>
  )
}

