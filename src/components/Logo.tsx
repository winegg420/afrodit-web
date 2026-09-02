import { resolveImage } from '../lib/image'

type LogoProps = {
  src: string
  alt: string
  /** Ekranda kaplayacağı yükseklik, piksel */
  height: number
  className?: string
}

/** Logo görseli. WebP varsa onu, yoksa PNG'yi verir; ölçüleri her zaman yazar. */
export default function Logo({ src, alt, height, className }: LogoProps) {
  const image = resolveImage(src)
  const width = image ? Math.round((image.width / image.height) * height) : undefined

  return (
    <picture className="photo-picture">
      {image && <source type="image/webp" srcSet={image.webpSrcSet} />}
      <img
        className={className}
        src={src}
        alt={alt}
        width={width ?? image?.width}
        height={height}
        decoding="async"
      />
    </picture>
  )
}
