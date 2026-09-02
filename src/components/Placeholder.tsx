type PlaceholderProps = {
  /** Ne fotoğrafı geleceği, örn. "sağlık kulübü — yatay" */
  label: string
  /** En/boy oranı, örn. "16/9", "3/4" */
  ratio?: string
  className?: string
}

/**
 * Fotoğrafı henüz olmayan alanlar için gri kutu.
 * Fotoğraf gelince bu bileşenin yerine <Photo /> veya <img> konur.
 */
export default function Placeholder({ label, ratio = '16/9', className }: PlaceholderProps) {
  return (
    <div
      className={`placeholder${className ? ` ${className}` : ''}`}
      style={{ aspectRatio: ratio }}
      role="img"
      aria-label={label}
    >
      <span className="placeholder__label">{label}</span>
    </div>
  )
}
