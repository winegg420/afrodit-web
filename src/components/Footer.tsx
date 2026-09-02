import { Link, useLocation } from 'react-router-dom'
import Logo from './Logo'
import MapEmbed from './MapEmbed'
import Icon from './Icon'
import { useI18n } from '../i18n'
import type { Dict } from '../i18n'
import { useSectionPath } from '../hooks/useSectionPath'
import { sectionFromSlug } from '../lib/paths'
import { facility } from '../content/facility'

export default function Footer() {
  const { t, lang } = useI18n()
  const path = useSectionPath()
  const { pathname } = useLocation()
  const { address } = facility

  // İletişim sayfasının kendi büyük haritası var; alt bilgide ikinci bir
  // harita çıkmasın diye orada bu bölüm atlanıyor.
  const iletisimSayfasi = sectionFromSlug(lang, pathname.split('/').filter(Boolean)[1] ?? '') === 'contact'

  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <Logo src="/img/logo-footer.png" alt={t.brand.name} height={49} />
          <p>{t.footer.lead}</p>
        </div>

        <div>
          <h2 className="site-footer__title">{t.footer.contactTitle}</h2>
          <address className="site-footer__address">
            {address.street} {address.district}
            <br />
            {address.zip} {address.city}, {address.country}
            <br />
            <a href={facility.phoneOfficeHref}>{facility.phoneOffice}</a>
            <br />
            <a href={facility.phoneMobileHref}>{facility.phoneMobile}</a>
            <br />
            <a href={facility.emailHref}>{facility.email}</a>
          </address>
          <a
            className="site-footer__map"
            href={facility.mapLink}
            target="_blank"
            rel="noreferrer"
          >
            {t.actions.viewMap}
          </a>
        </div>

        <div>
          <h2 className="site-footer__title">{t.footer.linksTitle}</h2>
          <ul className="site-footer__links">
            <li><Link to={path()}>{t.nav.home}</Link></li>
            <li><Link to={path('about')}>{t.nav.about}</Link></li>
            <li><Link to={path('rooms')}>{t.nav.rooms}</Link></li>
            <li><Link to={path('amenities')}>{t.nav.amenities}</Link></li>
            <li><Link to={path('tennis')}>{t.nav.tennis}</Link></li>
            <li><Link to={path('nursing')}>{t.nav.nursing}</Link></li>
            <li><Link to={path('news')}>{t.nav.news}</Link></li>
            <li><Link to={path('contact')}>{t.nav.contact}</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="site-footer__title">{t.footer.followTitle}</h2>
          <ul className="site-footer__links">
            {facility.social.map((item) => (
              <li key={item.key}>
                <a
                  className="social-link"
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${item.label} — ${t.social[item.key as keyof Dict['social']]}`}
                >
                  <Icon name={item.icon} />
                  <span className="social-link__ad">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {!iletisimSayfasi && (
        <div className="container site-footer__location">
          <h2 className="site-footer__title">{t.contact.mapTitle}</h2>
          <MapEmbed className="map--footer" />
        </div>
      )}

      <div className="container site-footer__base">
        <small>
          © {new Date().getFullYear()} {facility.legalName}. {t.footer.rights}
        </small>
      </div>
    </footer>
  )
}
