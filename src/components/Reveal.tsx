import type { CSSProperties, ElementType, ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  /** Sarmalayıcı etiket. Liste içinde kullanılıyorsa 'li' verilmeli. */
  as?: ElementType
  /** Kart gruplarında sırayla belirme için. Aralık 60 ms, en fazla 6 adım. */
  index?: number
  className?: string
}

/**
 * Kaydırınca beliren sarmalayıcı.
 *
 * ÖNEMLİ: Buradaki hiçbir şey CSS'te gizli başlamaz. Gizleme kuralı
 * `html.js .reveal` altında; `js` sınıfını sadece main.tsx ekliyor.
 * JavaScript çalışmazsa (prerender edilmiş HTML, arama motoru) içerik
 * olduğu gibi görünür.
 */
export default function Reveal({
  children,
  as: Tag = 'div',
  index = 0,
  className,
}: RevealProps) {
  const delay = Math.min(index, 6) * 60

  return (
    <Tag
      className={`reveal${className ? ` ${className}` : ''}`}
      data-reveal=""
      style={delay ? ({ '--reveal-delay': `${delay}ms` } as CSSProperties) : undefined}
    >
      {children}
    </Tag>
  )
}
