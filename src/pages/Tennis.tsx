import Section from '../components/Section'
import Photo from '../components/Photo'
import PageHead from '../components/PageHead'
import { useI18n } from '../i18n'
import { facility } from '../content/facility'

export default function Tennis() {
  const { t } = useI18n()

  return (
    <>
      <PageHead title={t.tennis.pageTitle} lead={t.tennis.pageLead} image="/img/aftek.jpg" />

      <Section>
        <div className="split">
          <div className="split__text">
            <h2 className="section__title">{t.tennis.courtsTitle}</h2>
            <p>{t.tennis.courtsBody}</p>
            <h2 className="section__title">{t.tennis.clubTitle}</h2>
            <p>{t.tennis.clubBody}</p>
          </div>
          <div className="split__media">
            <Photo src="/img/aftek.jpg" alt={t.tennis.pageTitle} ratio="4/3" />
          </div>
        </div>
      </Section>

      <Section tone="deep" narrow>
        <h2 className="section__title">{t.tennis.discountTitle}</h2>
        <p>{t.tennis.discountBody}</p>
      </Section>

      <Section tone="alt" narrow>
        <h2 className="section__title">{t.tennis.contactTitle}</h2>
        <p>{t.tennis.contactBody}</p>
        <ul className="contact-actions">
          <li>
            <a className="btn" href={facility.phoneOfficeHref}>
              {facility.phoneOffice}
            </a>
          </li>
          <li>
            <a
              className="btn btn--ghost"
              href="https://www.instagram.com/afroditteniskulubu/"
              target="_blank"
              rel="noreferrer"
            >
              {t.tennis.instagram}
            </a>
          </li>
        </ul>
      </Section>
    </>
  )
}
