import { motion } from "framer-motion"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { StarRating } from "@/components/common/StarRating"
import { useFilterStore } from "@/stores/filterStore"

interface FilterSidebarProps {
  brands: string[]
  colors: string[]
  sizes: string[]
  maxPrice: number
}

export function FilterSidebar({ brands, colors, sizes, maxPrice }: FilterSidebarProps) {
  const filterStore = useFilterStore()

  const handlePriceRangeChange = (value: number[]) => {
    filterStore.updateFilter("priceRange", [value[0], value[1]] as [number, number])
  }

  const toggleBrand = (brand: string) => {
    const newBrands = filterStore.brands.includes(brand)
      ? filterStore.brands.filter((b) => b !== brand)
      : [...filterStore.brands, brand]
    filterStore.updateFilter("brands", newBrands)
  }

  const toggleColor = (color: string) => {
    const newColors = filterStore.colors.includes(color)
      ? filterStore.colors.filter((c) => c !== color)
      : [...filterStore.colors, color]
    filterStore.updateFilter("colors", newColors)
  }

  const toggleSize = (size: string) => {
    const newSizes = filterStore.sizes.includes(size)
      ? filterStore.sizes.filter((s) => s !== size)
      : [...filterStore.sizes, size]
    filterStore.updateFilter("sizes", newSizes)
  }

  const handleRatingChange = (rating: number) => {
    filterStore.updateFilter("rating", rating)
  }

  return (
    <aside className="w-full md:w-64 space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Filters</h2>
        <Button variant="ghost" size="sm" onClick={() => filterStore.clearFilters()}>
          Clear All
        </Button>
      </div>

      <Accordion type="multiple" defaultValue={["price", "brands", "colors"]}>
        {/* Price Range */}
        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider
                value={filterStore.priceRange}
                onValueChange={handlePriceRangeChange}
                max={maxPrice}
                step={50}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{filterStore.priceRange[0]}₺</span>
                <span>{filterStore.priceRange[1]}₺</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Brands */}
        <AccordionItem value="brands">
          <AccordionTrigger>Brands</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {brands.map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox
                    id={`brand-${brand}`}
                    checked={filterStore.brands.includes(brand)}
                    onCheckedChange={() => toggleBrand(brand)}
                  />
                  <Label htmlFor={`brand-${brand}`} className="cursor-pointer">
                    {brand}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Colors */}
        <AccordionItem value="colors">
          <AccordionTrigger>Colors</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {colors.map((color) => (
                <div key={color} className="flex items-center space-x-2">
                  <Checkbox
                    id={`color-${color}`}
                    checked={filterStore.colors.includes(color)}
                    onCheckedChange={() => toggleColor(color)}
                  />
                  <Label htmlFor={`color-${color}`} className="cursor-pointer">
                    {color}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Sizes */}
        <AccordionItem value="sizes">
          <AccordionTrigger>Sizes</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <Button
                  key={size}
                  variant={filterStore.sizes.includes(size) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleSize(size)}
                >
                  {size}
                </Button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Rating */}
        <AccordionItem value="rating">
          <AccordionTrigger>Rating</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <button
                onClick={() => handleRatingChange(4)}
                className="flex items-center gap-2 w-full text-left hover:bg-muted p-2 rounded"
              >
                <StarRating rating={filterStore.rating >= 4 ? 4 : 0} totalStars={4} />
                <span className="text-sm">& Up</span>
              </button>
              <button
                onClick={() => handleRatingChange(3)}
                className="flex items-center gap-2 w-full text-left hover:bg-muted p-2 rounded"
              >
                <StarRating rating={filterStore.rating >= 3 ? 3 : 0} totalStars={3} />
                <span className="text-sm">& Up</span>
              </button>
              <button
                onClick={() => handleRatingChange(2)}
                className="flex items-center gap-2 w-full text-left hover:bg-muted p-2 rounded"
              >
                <StarRating rating={filterStore.rating >= 2 ? 2 : 0} totalStars={2} />
                <span className="text-sm">& Up</span>
              </button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  )
}

