import { useCallback, useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const brands = [
  { name: "AudioTech", logo: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200" },
  { name: "FashionHub", logo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200" },
  { name: "TechGear", logo: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200" },
  { name: "StyleShop", logo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200" },
  { name: "EliteBrand", logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200" },
  { name: "QualityGoods", logo: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=200" },
]

export function BrandCarousel() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
    },
    [Autoplay({ delay: 3000 })]
  )

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index)
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
    emblaApi.on('select', () => {
      setSelectedIndex(emblaApi.selectedScrollSnap())
    })
  }, [emblaApi])

  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 text-center"
        >
          <h2 className="text-2xl font-bold tracking-tight">Brands We Trust</h2>
          <p className="text-muted-foreground">Shop from our trusted partners</p>
        </motion.div>
        
        <div className="relative" ref={emblaRef}>
          <div className="overflow-hidden">
            <div className="flex">
              {brands.map((brand, index) => (
                <div key={index} className="flex-shrink-0 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6 px-2">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-card rounded-lg border p-4 h-24 flex items-center justify-center"
                  >
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="max-h-12 max-w-24 object-contain grayscale hover:grayscale-0 transition-all"
                      loading="lazy"
                    />
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm hover:bg-background"
            onClick={scrollPrev}
            aria-label="Previous brands"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm hover:bg-background"
            onClick={scrollNext}
            aria-label="Next brands"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  )
}

