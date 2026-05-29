'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'

const HERO_PORTRAIT = {
  src: '/images/hero-portrait.webp',
  alt: 'Madeleine Morales',
  width: 420,
  height: 630,
} as const

export default function HeroPhoto() {
  const [loaded, setLoaded] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const img = imgRef.current
    if (img?.complete && img.naturalHeight > 0) {
      setLoaded(true)
    }
  }, [])

  const handleLoad = useCallback(() => {
    setLoaded(true)
  }, [])

  return (
    <Image
      ref={imgRef}
      id="heroPhoto"
      src={HERO_PORTRAIT.src}
      alt={HERO_PORTRAIT.alt}
      width={HERO_PORTRAIT.width}
      height={HERO_PORTRAIT.height}
      sizes="(max-width: 1023px) 88vw, 38vw"
      priority
      unoptimized
      className={loaded ? 'hero-photo loaded' : 'hero-photo'}
      onLoad={handleLoad}
    />
  )
}
