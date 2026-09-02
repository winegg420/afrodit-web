import { useEffect, useState } from 'react'
import Icon from './Icon'
import { useI18n } from '../i18n'
import { facility } from '../content/facility'

/**
 * Sağ altta sabit duran hızlı eylemler: WhatsApp ve "yukarı çık".
 *
 * "Yukarı çık" ancak bir ekran boyu aşağı inildiğinde beliriyor ve
 * DOM'dan tamamen çıkıyor — opacity ile gizlenmiyor, çünkü görünmez ama
 * odaklanabilir bir düğme klavye kullanıcısını tuzağa düşürürdü.
 */
export default function FloatingActions() {
  const { t } = useI18n()
  const [yukariGorunur, setYukariGorunur] = useState(false)

  useEffect(() => {
    const kontrol = () => setYukariGorunur(window.scrollY > window.innerHeight)
    kontrol()
    window.addEventListener('scroll', kontrol, { passive: true })
    window.addEventListener('resize', kontrol, { passive: true })
    return () => {
      window.removeEventListener('scroll', kontrol)
      window.removeEventListener('resize', kontrol)
    }
  }, [])

  function basaDon() {
    // CSS'te html { scroll-behavior: smooth } var; hareket azaltma açıkken
    // burada davranışı açıkça 'instant' vererek o kuralı geçiyoruz.
    let azalt = false
    try {
      azalt = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    } catch {
      // matchMedia yoksa yumuşak kaydırmada kal
    }
    // Odak önce taşınıyor: focus() çağrısı süren yumuşak kaydırmayı iptal
    // ediyor, o yüzden scrollTo'dan sonra çağrılamaz. preventScroll ile
    // odaklanmak kendi başına sayfayı oynatmıyor.
    document.getElementById('main')?.focus({ preventScroll: true })
    window.scrollTo({ top: 0, behavior: azalt ? 'instant' : 'smooth' })

    // Yumuşak kaydırma kısıtlanmış sekmelerde hiç çalışmıyor — Layout.tsx'te
    // sayfa geçişleri için de aynı gözlem var. O durumda düğme hiçbir şey
    // yapmamış gibi görünürdü; kısa bir süre sonra hâlâ tepede değilsek
    // doğrudan atlıyoruz.
    if (!azalt) {
      window.setTimeout(() => {
        if (window.scrollY > 0) window.scrollTo({ top: 0, behavior: 'instant' })
      }, 700)
    }

    // Programatik kaydırma her tarayıcıda scroll olayı üretmiyor; o durumda
    // düğme sayfa başındayken de ekranda kalırdı. Durumu elle kapatıyoruz.
    setYukariGorunur(false)
  }

  return (
    <div className="floating-actions">
      {yukariGorunur && (
        <button
          type="button"
          className="floating-actions__button floating-actions__button--top"
          onClick={basaDon}
          aria-label={t.actions.backToTop}
        >
          <Icon name="arrowUp" />
        </button>
      )}

      <a
        className="floating-actions__button floating-actions__button--whatsapp"
        href={facility.whatsappHref}
        target="_blank"
        rel="noreferrer"
        aria-label={t.actions.whatsapp}
      >
        <Icon name="whatsapp" />
      </a>
    </div>
  )
}
