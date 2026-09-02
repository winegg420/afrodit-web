import Section from '../components/Section'
import Photo from '../components/Photo'
import PageHead from '../components/PageHead'
import { useI18n } from '../i18n'
import { facility } from '../content/facility'

export default function Tennis() {
  const { t } = useI18n()
  const audience = Object.entries(t.tennis.audience)
  const unknowns = Object.entries(t.tennis.unknowns)

  return (
    <>
      <PageHead title={t.tennis.pageTitle} lead={t.tennis.pageLead} image="/img/aftek.jpg" />

      <Section>
        <div className="split">
          <div className="split__text">
            <h2 className="section__title">{t.tennis.courtsTitle}</h2>
            <p>{t.tennis.courtsBody}</p>
            <p>{t.tennis.courtsBody2}</p>
          </div>
          <div className="split__media">
            <Photo src="/img/aftek.jpg" alt={t.tennis.pageTitle} ratio="4/3" />
          </div>
        </div>
      </Section>

      <Section tone="alt">
        <div className="split split--reverse">
          <div className="split__text">
            <h2 className="section__title">{t.tennis.clubTitle}</h2>
            <p>{t.tennis.clubBody}</p>
            <p>{t.tennis.clubBody2}</p>
          </div>
          <div className="split__media">
            <Photo src="/img/indirim.jpg" alt={t.tennis.clubTitle} ratio="4/3" />
          </div>
        </div>
      </Section>

      <Section tone="deep" narrow>
        <h2 className="section__title">{t.tennis.discountTitle}</h2>
        <p>{t.tennis.discountBody}</p>
        <p>{t.tennis.discountBody2}</p>
      </Section>

      <Section title={t.tennis.audienceTitle}>
        <ul className="feature-grid">
          {audience.map(([key, label]) => (
            <li className="feature" key={key}>
              <p className="feature__body">{label}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="alt" title={t.tennis.unknownsTitle} lead={t.tennis.unknownsLead}>
        <ul className="checklist checklist--columns">
          {unknowns.map(([key, label]) => (
            <li key={key}>{label}</li>
          ))}
        </ul>
      </Section>

      <Section narrow>
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
              href={facility.whatsappHref}
              target="_blank"
              rel="noreferrer"
            >
              {t.actions.whatsapp}
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
        <p className="todo-note">{t.tennis.todoNote}</p>
      </Section>
    </>
  )
}
