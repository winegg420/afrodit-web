import { useState } from 'react'
import Placeholder from './Placeholder'

type PhotoProps = {
  src: string | null
  alt: string
  ratio?: string
  className?: string
  /** İlk ekranda görünen görseller için false yapılmalı */
  lazy?: boolean
}

/**
 * Fotoğraf. Kaynak yoksa veya yüklenemezse Placeholder'a düşer,
 * böylece eksik görsel sayfayı bozmaz.
 */
export default function Photo({
  src,
  alt,
  ratio = '16/9',
  className,
  lazy = true,
}: PhotoProps) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return <Placeholder label={alt} ratio={ratio} className={className} />
  }

  return (
    <img
      className={`photo${className ? ` ${className}` : ''}`}
      style={{ aspectRatio: ratio }}
      src={src}
      alt={alt}
      loading={lazy ? 'lazy' : 'eager'}
      decoding="async"
      onError={() => setFailed(true)}
    />
  )
}
