import Image from 'next/image'
import { cloudinaryUrl } from '@/lib/cloudinary'

interface CloudinaryImageProps {
  publicId: string
  alt: string
  width: number
  height: number
  quality?: number
  priority?: boolean
  className?: string
}

export default function CloudinaryImage({
  publicId,
  alt,
  width,
  height,
  quality = 85,
  priority = false,
  className,
}: CloudinaryImageProps) {
  const src = cloudinaryUrl(publicId, { width: width * 2, quality, format: 'auto' })
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={className}
      unoptimized
    />
  )
}
