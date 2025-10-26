import { motion } from "framer-motion"
import { Check } from "lucide-react"

interface ColorSwatchProps {
  colors: string[]
  selectedColor?: string
  onColorSelect: (color: string) => void
}

export function ColorSwatch({ colors, selectedColor, onColorSelect }: ColorSwatchProps) {
  return (
    <div className="flex gap-2">
      {colors.map((color) => (
        <motion.button
          key={color}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onColorSelect(color)}
          className={`relative h-10 w-10 rounded-full border-2 transition-all ${
            selectedColor === color ? "border-primary scale-110" : "border-gray-300"
          }`}
          style={{ backgroundColor: color }}
          aria-label={`Select color ${color}`}
        >
          {selectedColor === color && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Check className="h-4 w-4 text-white" strokeWidth={3} />
            </motion.div>
          )}
        </motion.button>
      ))}
    </div>
  )
}

