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
  const priceRange = useFilterStore((state) => state.priceRange)
  const selectedBrands = useFilterStore((state) => state.brands)
  const selectedColors = useFilterStore((state) => state.colors)
  const selectedSizes = useFilterStore((state) => state.sizes)
  const rating = useFilterStore((state) => state.rating)
  const updateFilter = useFilterStore((state) => state.updateFilter)
  const clearFilters = useFilterStore((state) => state.clearFilters)

  const handlePriceRangeChange = (value: number[]) => {
    updateFilter("priceRange", [value[0], value[1]] as [number, number])
  }

  const toggleBrand = (brand: string) => {
    const newBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter((b) => b !== brand)
      : [...selectedBrands, brand]
    updateFilter("brands", newBrands)
  }

  const toggleColor = (color: string) => {
    const newColors = selectedColors.includes(color)
      ? selectedColors.filter((c) => c !== color)
      : [...selectedColors, color]
    updateFilter("colors", newColors)
  }

  const toggleSize = (size: string) => {
    const newSizes = selectedSizes.includes(size)
      ? selectedSizes.filter((s) => s !== size)
      : [...selectedSizes, size]
    updateFilter("sizes", newSizes)
  }

  const handleRatingChange = (rating: number) => {
    updateFilter("rating", rating)
  }

  return (
    <aside className="w-full md:w-64 space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Filters</h2>
        <Button variant="ghost" size="sm" onClick={clearFilters}>
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
                value={priceRange}
                onValueChange={handlePriceRangeChange}
                max={maxPrice}
                step={50}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{priceRange[0]}₺</span>
                <span>{priceRange[1]}₺</span>
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
                    checked={selectedBrands.includes(brand)}
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
                    checked={selectedColors.includes(color)}
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
                  variant={selectedSizes.includes(size) ? "default" : "outline"}
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
                <StarRating rating={rating >= 4 ? 4 : 0} maxRating={4} />
                <span className="text-sm">& Up</span>
              </button>
              <button
                onClick={() => handleRatingChange(3)}
                className="flex items-center gap-2 w-full text-left hover:bg-muted p-2 rounded"
              >
                <StarRating rating={rating >= 3 ? 3 : 0} maxRating={3} />
                <span className="text-sm">& Up</span>
              </button>
              <button
                onClick={() => handleRatingChange(2)}
                className="flex items-center gap-2 w-full text-left hover:bg-muted p-2 rounded"
              >
                <StarRating rating={rating >= 2 ? 2 : 0} maxRating={2} />
                <span className="text-sm">& Up</span>
              </button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  )
}

