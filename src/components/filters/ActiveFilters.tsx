import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useFilterStore } from "@/stores/filterStore"

export function ActiveFilters() {
  const filterStore = useFilterStore()

  const activeFilters = []

  if (filterStore.brands.length > 0) {
    activeFilters.push(...filterStore.brands.map((b) => ({ type: "brand", value: b, label: b })))
  }

  if (filterStore.colors.length > 0) {
    activeFilters.push(...filterStore.colors.map((c) => ({ type: "color", value: c, label: c })))
  }

  if (filterStore.sizes.length > 0) {
    activeFilters.push(...filterStore.sizes.map((s) => ({ type: "size", value: s, label: s })))
  }

  if (filterStore.rating > 0) {
    activeFilters.push({ type: "rating", value: filterStore.rating, label: `${filterStore.rating}+ Stars` })
  }

  const removeFilter = (type: string, value: string | number) => {
    switch (type) {
      case "brand":
        filterStore.updateFilter("brands", filterStore.brands.filter((b) => b !== value))
        break
      case "color":
        filterStore.updateFilter("colors", filterStore.colors.filter((c) => c !== value))
        break
      case "size":
        filterStore.updateFilter("sizes", filterStore.sizes.filter((s) => s !== value))
        break
      case "rating":
        filterStore.updateFilter("rating", 0)
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

