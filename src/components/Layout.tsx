import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { I18nContext, dictionaries, rememberLang } from '../i18n'
import type { Lang } from '../i18n'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'

export default function Layout({ lang }: { lang: Lang }) {
  const t = dictionaries[lang]
  const { pathname, hash } = useLocation()

  useEffect(() => {
    document.documentElement.lang = t.meta.htmlLang
    rememberLang(lang)
  }, [lang, t.meta.htmlLang])

  useRevealOnScroll(pathname)

  // Sayfa değişince başa dön — ama adreste çapa varsa (örn.
  // /tr/odalar#suit-oda) o bölüme in. Bölümlerin scroll-margin-top değeri
  // olduğu için yapışkan başlık içeriği örtmez.
  //
  // 'instant' bilerek: CSS'te `scroll-behavior: smooth` olduğu için
  // varsayılan davranış yumuşak kaydırma olurdu. Sayfalar arası geçişte
  // binlerce piksel yumuşak kaymak hem yavaş hem kafa karıştırıcı; ayrıca
  // yumuşak kaydırma kısıtlanmış sekmede hiç çalışmıyor ve kullanıcı
  // yanlış yerde kalıyor. Sayfa içi çapalar (açılıştaki aşağı oku) kendi
  // yumuşak kaydırmasını kullanmaya devam ediyor.
  useEffect(() => {
    if (hash) {
      const hedef = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (hedef) {
        hedef.scrollIntoView({ behavior: 'instant', block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])

  return (
    <I18nContext.Provider value={{ lang, t }}>
      <div className="app-shell">
        <a className="skip-link" href="#main">
          {t.nav.skipToContent}
        </a>
        <Header />
        <main className="app-main" id="main" tabIndex={-1}>
          <Outlet />
        </main>
        <Footer />
      </div>
    </I18nContext.Provider>
  )
}
