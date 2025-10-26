import Zoom from "react-medium-image-zoom"
import "react-medium-image-zoom/dist/styles.css"

interface ImageWithZoomProps {
  src: string
  alt: string
  className?: string
}

export function ImageWithZoom({ src, alt, className = "" }: ImageWithZoomProps) {
  return (
    <Zoom>
      <img src={src} alt={alt} className={className} />
    </Zoom>
  )
}

