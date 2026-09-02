import { Link } from 'react-router-dom'
import Logo from './Logo'
import { useI18n, useLangPath } from '../i18n'
import { SLUGS } from '../routes'
import { facility } from '../content/facility'

export default function Footer() {
  const { t } = useI18n()
  const path = useLangPath()
  const { address } = facility

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
            <li><Link to={path(SLUGS.rooms)}>{t.nav.rooms}</Link></li>
            <li><Link to={path(SLUGS.amenities)}>{t.nav.amenities}</Link></li>
            <li><Link to={path(SLUGS.tennis)}>{t.nav.tennis}</Link></li>
            <li><Link to={path(SLUGS.nursing)}>{t.nav.nursing}</Link></li>
            <li><Link to={path(SLUGS.news)}>{t.nav.news}</Link></li>
            <li><Link to={path(SLUGS.contact)}>{t.nav.contact}</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="site-footer__title">{t.footer.followTitle}</h2>
          <ul className="site-footer__links">
            {facility.social.map((item) => (
              <li key={item.key}>
                <a href={item.href} target="_blank" rel="noreferrer">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container site-footer__base">
        <small>
          © {new Date().getFullYear()} {facility.legalName}. {t.footer.rights}
        </small>
      </div>
    </footer>
  )
}
