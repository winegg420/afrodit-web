import { Link, useLocation } from 'react-router-dom'
import { LANGS, dictionaries, pathWithLang, useI18n } from '../i18n'

/** Sayfada kalarak dili değiştirir. */
export default function LanguageSwitcher() {
  const { lang, t } = useI18n()
  const { pathname, search, hash } = useLocation()

  return (
    <nav className="lang" aria-label={t.nav.languageLabel}>
      <ul className="lang__list">
        {LANGS.map((code) => (
          <li key={code}>
            <Link
              to={`${pathWithLang(pathname, code)}${search}${hash}`}
              className={`lang__item${code === lang ? ' lang__item--active' : ''}`}
              lang={code}
              hrefLang={code}
              aria-current={code === lang ? 'true' : undefined}
              title={dictionaries[code].meta.langName}
            >
              {dictionaries[code].meta.langShort}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
