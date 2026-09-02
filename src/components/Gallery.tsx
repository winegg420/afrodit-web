import { useState } from 'react'
import Photo from './Photo'
import Lightbox from './Lightbox'
import { useI18n } from '../i18n'

type GalleryProps = {
  images: string[]
  /** Her görselin alt metni için ön ek, örn. "Standart Oda" */
  altPrefix: string
  label: string
}

/** Yatay kaydırılan görsel şeridi. Tıklanınca tam ekran açılır. */
export default function Gallery({ images, altPrefix, label }: GalleryProps) {
  const { t } = useI18n()
  const [open, setOpen] = useState<number | null>(null)

  if (images.length === 0) return null

  return (
    <>
      <div className="gallery" role="group" aria-label={label}>
        <ul className="gallery__track">
          {images.map((src, i) => (
            <li className="gallery__item" key={src}>
              <button
                type="button"
                className="gallery__button"
                onClick={() => setOpen(i)}
                aria-label={`${altPrefix} — ${i + 1}. ${t.actions.openPhoto}`}
              >
                <Photo src={src} alt={`${altPrefix} — ${i + 1}`} ratio="4/3" />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {open !== null && (
        <Lightbox
          images={images}
          index={open}
          altPrefix={altPrefix}
          onIndexChange={setOpen}
          onClose={() => setOpen(null)}
        />
      )}
    </>
  )
}
