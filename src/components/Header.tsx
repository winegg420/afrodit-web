import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import LanguageSwitcher from './LanguageSwitcher'
import Logo from './Logo'
import Icon from './Icon'
import { useI18n } from '../i18n'
import type { Dict } from '../i18n'
import { useSectionPath } from '../hooks/useSectionPath'
import { facility } from '../content/facility'

// Üst menüde yer dar; tesisin ana iki hesabı gösteriliyor. Tam liste
// alt bilgide. 1200 pikselin altında bunlar hamburger menünün içinde kalır.
const headerSocial = facility.social.filter(
  (item) => item.key === 'instagram' || item.key === 'facebook',
)

export default function Header() {
  const { t } = useI18n()
  const path = useSectionPath()
  const [open, setOpen] = useState(false)

  const links = [
    { to: path(), label: t.nav.home, end: true },
    { to: path('about'), label: t.nav.about },
    { to: path('rooms'), label: t.nav.rooms },
    { to: path('amenities'), label: t.nav.amenities },
    { to: path('tennis'), label: t.nav.tennis },
    { to: path('nursing'), label: t.nav.nursing },
    { to: path('news'), label: t.nav.news },
    { to: path('contact'), label: t.nav.contact },
  ]

  return (
    <header className="site-header">
      <div className="site-header__bar container">
        <NavLink to={path()} className="site-header__brand" end>
          <Logo src="/img/logo.png" alt={t.brand.name} height={44} />
        </NavLink>

        <button
          type="button"
          className="site-header__toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? t.nav.closeMenu : t.nav.openMenu}
        </button>

        {/* Mobilde bir bağlantıya basılınca menü kapansın */}
        <nav
          id="site-nav"
          className={`site-nav${open ? ' site-nav--open' : ''}`}
          aria-label={t.nav.menu}
          onClick={() => setOpen(false)}
        >
          <ul className="site-nav__list">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    `site-nav__link${isActive ? ' site-nav__link--active' : ''}`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="site-nav__aside">
            <ul className="site-nav__social">
              {headerSocial.map((item) => (
                <li key={item.key}>
                  <a
                    className="social-icon"
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={t.social[item.key as keyof Dict['social']]}
                  >
                    <Icon name={item.icon} />
                  </a>
                </li>
              ))}
            </ul>
            <LanguageSwitcher />
            <a className="btn btn--sm" href={facility.whatsappHref} target="_blank" rel="noreferrer">
              {t.actions.reserve}
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}
