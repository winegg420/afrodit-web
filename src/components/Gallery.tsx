import Photo from './Photo'

type GalleryProps = {
  images: string[]
  /** Her görselin alt metni için ön ek, örn. "Standart Oda" */
  altPrefix: string
  label: string
}

/** Yatay kaydırılan görsel şeridi. Klavye ile de gezilebilir. */
export default function Gallery({ images, altPrefix, label }: GalleryProps) {
  if (images.length === 0) return null

  return (
    <div className="gallery" role="group" aria-label={label} tabIndex={0}>
      <ul className="gallery__track">
        {images.map((src, i) => (
          <li className="gallery__item" key={src}>
            <Photo src={src} alt={`${altPrefix} — ${i + 1}`} ratio="4/3" />
          </li>
        ))}
      </ul>
    </div>
  )
}
