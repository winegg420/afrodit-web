import { useState } from 'react'
import Photo from './Photo'
import Lightbox from './Lightbox'
import { useI18n } from '../i18n'

type PhotoZoomProps = {
  /** Tam ekranda gezilecek görseller; ilki kapak olarak gösterilir. */
  images: string[]
  alt: string
  ratio?: string
  className?: string
  sizes?: string
  /** Her fotoğrafın ne gösterdiğini anlatan alt metinler */
  alts?: string[]
}

/** Tek bir görsel; tıklanınca tam ekran açılır. Kaynak yoksa Photo yer tutucuya düşer. */
export default function PhotoZoom({
  images,
  alt,
  ratio = '4/3',
  className,
  sizes,
  alts,
}: PhotoZoomProps) {
  const { t } = useI18n()
  const [open, setOpen] = useState<number | null>(null)
  const cover = images[0] ?? null

  if (!cover) return <Photo src={null} alt={alt} ratio={ratio} className={className} />

  return (
    <>
      <button
        type="button"
        className={`photo-zoom${className ? ` ${className}` : ''}`}
        onClick={() => setOpen(0)}
        aria-label={`${alt}. ${t.actions.openPhoto}`}
      >
        <Photo src={cover} alt={alts?.[0] ?? alt} ratio={ratio} sizes={sizes} />
      </button>

      {open !== null && (
        <Lightbox
          images={images}
          index={open}
          altPrefix={alt}
          alts={alts}
          onIndexChange={setOpen}
          onClose={() => setOpen(null)}
        />
      )}
    </>
  )
}
