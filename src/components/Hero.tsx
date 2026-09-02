import { useCallback, useEffect, useState } from 'react'
import { useI18n } from '../i18n'
import { facility } from '../content/facility'
import { resolveImage } from '../lib/image'

/**
 * Kademeli giriş yalnızca oturumun ilk açılışında oynasın diye modül
 * düzeyinde tutuluyor; sayfalar arasında gezinince tekrarlanmaz.
 */
let introPlayed = false

/** Açılış görseli. seo.ts bu dosyayı <head> içinde preload ediyor. */
const HERO_SRC = '/img/slayt-1.jpg'

type HeroProps = {
  /** Aşağı okunun kaydıracağı bölümün id'si */
  nextSectionId: string
}

export default function Hero({ nextSectionId }: HeroProps) {
  const { t } = useI18n()
  const [intro, setIntro] = useState(() => !introPlayed)
  const hero = resolveImage(HERO_SRC)

  useEffect(() => {
    introPlayed = true
    if (!intro) return

    // Giriş bittiğinde sınıfı kaldır. Animasyon hiç çalışmadıysa (kısıtlanmış
    // sekme, eski tarayıcı) bu, metinlerin gizli kalmamasını garanti eder.
    const timer = window.setTimeout(() => setIntro(false), 1000)
    return () => window.clearTimeout(timer)
  }, [intro])

  const scrollToNext = useCallback(() => {
    const target = document.getElementById(nextSectionId)
    if (!target) return

    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
  }, [nextSectionId])

  return (
    <section className={`hero${intro ? ' hero--intro' : ''}`}>
      <div className="hero__frame">
        <picture className="photo-picture">
          {hero && <source type="image/webp" srcSet={hero.webpSrcSet} sizes="100vw" />}
          <img
            className="hero__image"
            src={HERO_SRC}
            srcSet={hero?.jpgSrcSet}
            sizes="100vw"
            width={hero?.width}
            height={hero?.height}
            alt={t.brand.name}
            fetchPriority="high"
            loading="eager"
            decoding="async"
          />
        </picture>
      </div>
      <div className="hero__scrim" />

      <div className="hero__content container">
        <p className="hero__kicker">{t.brand.tagline}</p>
        <h1 className="hero__title">{t.home.heroTitle}</h1>
        <p className="hero__lead">{t.home.heroLead}</p>
        <div className="hero__actions">
          <a className="btn" href={facility.whatsappHref} target="_blank" rel="noreferrer">
            {t.actions.reserveLong}
          </a>
          <a className="btn btn--ghost btn--on-dark" href={facility.phoneOfficeHref}>
            {facility.phoneOffice}
          </a>
        </div>
      </div>

      <button
        type="button"
        className="hero__scroll"
        onClick={scrollToNext}
        aria-label={t.actions.scrollDown}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>
    </section>
  )
}
