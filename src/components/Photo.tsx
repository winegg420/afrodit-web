import { useState } from 'react'
import Placeholder from './Placeholder'

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
