import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import LanguageSwitcher from './LanguageSwitcher'
import { useI18n, useLangPath } from '../i18n'
import { SLUGS } from '../routes'
import { facility } from '../content/facility'

export default function Header() {
  const { t } = useI18n()
  const path = useLangPath()
  const [open, setOpen] = useState(false)

  const links = [
    { to: path(), label: t.nav.home, end: true },
    { to: path(SLUGS.rooms), label: t.nav.rooms },
    { to: path(SLUGS.amenities), label: t.nav.amenities },
    { to: path(SLUGS.tennis), label: t.nav.tennis },
    { to: path(SLUGS.nursing), label: t.nav.nursing },
    { to: path(SLUGS.news), label: t.nav.news },
    { to: path(SLUGS.contact), label: t.nav.contact },
  ]

  return (
    <header className="site-header">
      <div className="site-header__bar container">
        <NavLink to={path()} className="site-header__brand" end>
          <img src="/img/logo.png" alt={t.brand.name} width={132} height={44} />
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
