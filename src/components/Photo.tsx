import { useState } from 'react'
import Placeholder from './Placeholder'

/*
 * TODO: yüksek çözünürlüklü görseller gerekiyor.
 *
 * Aşağıdaki dosyalar sayfada kapladıkları alandan küçük; gerilerek
 * bulanıklaşıyorlar. clubafrodit.com'da daha büyük sürümleri YOK,
 * işletmeden orijinalleri istenmeli (en az 1200 piksel genişlik).
 *
 *   hakkimizda2.jpg    375 px → 634 px  (1,69×)  Olanaklar/Mutfak, İletişim
 *   hakkimizda.jpg     375 px → 582 px  (1,55×)  Anasayfa girişi
 *   haber1.jpg         479 px → 582 px  (1,22×)  Haberler
 *   haber2.jpg         479 px → 582 px  (1,22×)  Anasayfa, Haberler
 *   haber3.jpg         479 px → 582 px  (1,22×)  Haberler
 *   club-afrodit.jpg   600 px → 634 px  (1,06×)  Olanaklar/Plaj
 *   aftek.jpg          600 px → 634 px  (1,06×)  Tenis
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
