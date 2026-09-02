import { useState } from 'react'
import Placeholder from './Placeholder'
import { resolveImage } from '../lib/image'

/*
 * Görsel çözünürlüğü notu.
 *
 * Hiçbir görsel doğal genişliğinin üstünde gösterilmiyor; tek istisna
 * aşağıda. Düşük çözünürlüklü dosyalar ya klasördeki yüksek çözünürlüklü
 * karşılıklarıyla değiştirildi ya da o alan görselsiz bırakıldı.
 *
 * TODO: işletmeden istenecek görseller (en az 1400 px genişlik)
 *   - Mutfak / taş fırın / manzaralı teras: hiç yok, yer tutucu duruyor.
 *   - Oda ve apart: en büyüğü 800 px. Odalar sayfası başlık bandı
 *     bu yüzden görselsiz.
 *   - Tenis kortu: tek fotoğraf 600 px. Tenis sayfası başlık bandı
 *     bu yüzden görselsiz; fotoğraf gövdede doğal boyutunda kullanılıyor.
 *   - Huzurevi: en büyüğü 1200 px. Sağlıklı Yaşam başlık bandında
 *     1425 px'e geriliyor (1,19× — koyu örtü altında güçlükle fark edilir).
 */

type PhotoProps = {
  src: string | null
  alt: string
  ratio?: string
  className?: string
  /** İlk ekranda görünen görseller için false yapılmalı */
  lazy?: boolean
  /** Tarayıcıya görselin ekranda ne kadar yer kaplayacağını söyler */
  sizes?: string
}

/**
 * Fotoğraf. WebP'yi destekleyen tarayıcıya WebP, desteklemeyene JPEG verir;
 * srcset ile ekran genişliğine uygun boyutu seçtirir. Kaynak yoksa veya
 * yüklenemezse Placeholder'a düşer, böylece eksik görsel sayfayı bozmaz.
 */
export default function Photo({
  src,
  alt,
  ratio = '16/9',
  className,
  lazy = true,
  sizes = '(max-width: 52rem) 100vw, 50vw',
}: PhotoProps) {
  const [failed, setFailed] = useState(false)
  const image = resolveImage(src)

  if (!src || failed) {
    return <Placeholder label={alt} ratio={ratio} className={className} />
  }

  const imgClass = `photo${className ? ` ${className}` : ''}`
  const style = { aspectRatio: ratio }
  const loading = lazy ? 'lazy' : 'eager'

  // Manifestte yoksa (yeni eklenmiş dosya) düz img'e düş.
  if (!image) {
    return (
      <img
        className={imgClass}
        style={style}
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        onError={() => setFailed(true)}
      />
    )
  }

  return (
    <picture className="photo-picture">
      <source type="image/webp" srcSet={image.webpSrcSet} sizes={sizes} />
      <img
        className={imgClass}
        style={style}
        src={image.src}
        srcSet={image.jpgSrcSet}
        sizes={sizes}
        width={image.width}
        height={image.height}
        alt={alt}
        loading={loading}
        decoding="async"
        onError={() => setFailed(true)}
      />
    </picture>
  )
}
