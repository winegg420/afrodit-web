import Section from '../components/Section'
import PageHead from '../components/PageHead'
import { useI18n } from '../i18n'
import type { Dict } from '../i18n'
import { facility } from '../content/facility'

export default function Contact() {
  const { t } = useI18n()
  const { address } = facility

  return (
    <>
      <PageHead
        title={t.contact.pageTitle}
        lead={t.contact.pageLead}
        image="/img/video.jpg"
      />

      <Section>
        <div className="contact-grid">
          <div>
            <h2 className="section__title">{t.contact.addressTitle}</h2>
            <address className="contact-address">
              {address.street}
              <br />
              {address.district}
              <br />
              {address.zip} {address.city}, {address.country}
            </address>
            <a className="link-more" href={facility.mapLink} target="_blank" rel="noreferrer">
              {t.actions.viewMap}
            </a>
          </div>

          <div>
            <h2 className="section__title">{t.contact.phoneTitle}</h2>
            <dl className="specs">
              <div className="specs__row">
                <dt>{t.contact.officeLabel}</dt>
                <dd>
                  <a href={facility.phoneOfficeHref}>{facility.phoneOffice}</a>
                </dd>
              </div>
              <div className="specs__row">
                <dt>{t.contact.mobileLabel}</dt>
                <dd>
                  <a href={facility.phoneMobileHref}>{facility.phoneMobile}</a>
                </dd>
              </div>
              <div className="specs__row">
                <dt>{t.contact.nursingLabel}</dt>
                <dd>
                  <a href={facility.phoneNursingHref}>{facility.phoneNursing}</a>
                </dd>
              </div>
            </dl>

            <h2 className="section__title">{t.contact.emailTitle}</h2>
            <p>
              <a href={facility.emailHref}>{facility.email}</a>
            </p>
          </div>

          <div>
            <h2 className="section__title">{t.contact.socialTitle}</h2>
            <ul className="checklist">
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
      </Section>

      <Section tone="alt" title={t.contact.distancesTitle}>
        <dl className="specs specs--columns">
          {facility.distances.map((item) => (
            <div className="specs__row" key={item.key}>
              <dt>{t.distances[item.key as keyof Dict['distances']]}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section title={t.contact.mapTitle}>
        <div className="map">
          <iframe
            src={facility.mapEmbed}
            title={t.contact.mapAlt}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </Section>

      <Section narrow>
        <p className="todo-note">{t.contact.hoursTodo}</p>
      </Section>
    </>
  )
}
