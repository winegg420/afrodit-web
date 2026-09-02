import { useCallback, useEffect, useRef } from 'react'
import { useI18n } from '../i18n'
import { resolveImage } from '../lib/image'

type LightboxProps = {
  images: string[]
  index: number
  altPrefix: string
  /** Her fotoğrafın ne gösterdiğini anlatan alt metinler */
  alts?: string[]
  onIndexChange: (index: number) => void
  onClose: () => void
}

/** Tam ekran fotoğraf görüntüleyici. Klavye, dokunma ve odak yönetimi dahil. */
export default function Lightbox({
  images,
  index,
  altPrefix,
  alts,
  onIndexChange,
  onClose,
}: LightboxProps) {
  const { t } = useI18n()
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const touchX = useRef<number | null>(null)

  const go = useCallback(
    (step: number) => onIndexChange((index + step + images.length) % images.length),
    [index, images.length, onIndexChange],
  )

  // Açılışta odağı içeri al, kapanışta çağıran öğeye geri ver.
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    return () => opener?.focus?.()
  }, [])

  // Arkadaki sayfa kaymasın.
  useEffect(() => {
    const { overflow, paddingRight } = document.body.style
    const gap = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    if (gap > 0) document.body.style.paddingRight = `${gap}px`
    return () => {
      document.body.style.overflow = overflow
      document.body.style.paddingRight = paddingRight
    }
  }, [])

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Escape') return onClose()
      if (event.key === 'ArrowRight') return go(1)
      if (event.key === 'ArrowLeft') return go(-1)
      if (event.key !== 'Tab') return

      // Odak halkası kutunun içinde dönsün, arkadaki sayfaya kaçmasın.
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>('button')
      if (!focusable || focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = document.activeElement

      if (event.shiftKey && active === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
      }
    },
    [go, onClose],
  )

  const current = resolveImage(images[index])
  const many = images.length > 1

  return (
    <div
      ref={dialogRef}
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`${altPrefix} — ${t.actions.photoCounter} ${index + 1}/${images.length}`}
      onKeyDown={onKeyDown}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
      onTouchStart={(event) => {
        touchX.current = event.touches[0].clientX
      }}
      onTouchEnd={(event) => {
        if (touchX.current === null) return
        const delta = event.changedTouches[0].clientX - touchX.current
        touchX.current = null
        if (Math.abs(delta) > 40 && many) go(delta < 0 ? 1 : -1)
      }}
    >
      <button ref={closeRef} type="button" className="lightbox__close" onClick={onClose}>
        {t.actions.closePhoto}
      </button>

      {many && (
        <button type="button" className="lightbox__nav lightbox__nav--prev" onClick={() => go(-1)}>
          <span aria-hidden="true">‹</span>
          <span className="visually-hidden">{t.actions.prevPhoto}</span>
        </button>
      )}

      <figure className="lightbox__figure">
        {/* Tam ekranda görsel gecikmesiz yüklenir; şeritteki küçük hâlleri lazy. */}
        <img
          src={images[index]}
          srcSet={current?.jpgSrcSet}
          sizes="(max-width: 76rem) 100vw, 76rem"
          width={current?.width}
          height={current?.height}
          alt={alts?.[index] ?? `${altPrefix} — ${index + 1}`}
          decoding="async"
        />
        <figcaption className="lightbox__caption">
          {altPrefix} · {index + 1}/{images.length}
        </figcaption>
      </figure>

      {many && (
        <button type="button" className="lightbox__nav lightbox__nav--next" onClick={() => go(1)}>
          <span aria-hidden="true">›</span>
          <span className="visually-hidden">{t.actions.nextPhoto}</span>
        </button>
      )}
    </div>
  )
}
