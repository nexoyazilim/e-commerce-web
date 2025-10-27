import { useMemo } from "react"
import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useFilterStore } from "@/stores/filterStore"

export function ActiveFilters() {
  const brands = useFilterStore((state) => state.brands)
  const colors = useFilterStore((state) => state.colors)
  const sizes = useFilterStore((state) => state.sizes)
  const rating = useFilterStore((state) => state.rating)
  const updateFilter = useFilterStore((state) => state.updateFilter)

  const activeFilters = useMemo(() => {
    const filters = []

    if (brands.length > 0) {
      filters.push(...brands.map((b) => ({ type: "brand", value: b, label: b })))
    }

    if (colors.length > 0) {
      filters.push(...colors.map((c) => ({ type: "color", value: c, label: c })))
    }

    if (sizes.length > 0) {
      filters.push(...sizes.map((s) => ({ type: "size", value: s, label: s })))
    }

    if (rating > 0) {
      filters.push({ type: "rating", value: rating, label: `${rating}+ Stars` })
    }

    return filters
  }, [brands, colors, sizes, rating])

  const removeFilter = (type: string, value: string | number) => {
    switch (type) {
      case "brand":
        updateFilter("brands", brands.filter((b) => b !== value))
        break
      case "color":
        updateFilter("colors", colors.filter((c) => c !== value))
        break
      case "size":
        updateFilter("sizes", sizes.filter((s) => s !== value))
        break
      case "rating":
        updateFilter("rating", 0)
        break
    }
  }

  if (activeFilters.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2">
      {activeFilters.map((filter, index) => (
        <Badge key={index} variant="secondary" className="flex items-center gap-1 px-2 py-1">
          {filter.label}
          <button
            onClick={() => removeFilter(filter.type, filter.value)}
            className="ml-1 hover:opacity-70"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}
    </div>
  )
}

