import { useEffect } from 'react'
import { Outlet, useLocation, useParams } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { DEFAULT_LANG, I18nContext, dictionaries, isLang, rememberLang } from '../i18n'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'

export default function Layout() {
  const { lang: raw } = useParams()
  const lang = isLang(raw) ? raw : DEFAULT_LANG
  const t = dictionaries[lang]
  const { pathname } = useLocation()

  useEffect(() => {
    document.documentElement.lang = t.meta.htmlLang
    rememberLang(lang)
  }, [lang, t.meta.htmlLang])

  useRevealOnScroll(pathname)

  // Sayfa değişince başa dön
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

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
