import Section from '../components/Section'
import Photo from '../components/Photo'
import Gallery from '../components/Gallery'
import PageHead from '../components/PageHead'
import { useI18n } from '../i18n'
import { nursingRoom } from '../content/rooms'
import { facility } from '../content/facility'

/** Ekip kartlarının görselleri — gerçek siteden. */
const teamPhotos: Record<string, string> = {
  nurse: '/img/yasli-bakim/hemsire.jpg',
  doctor: '/img/yasli-bakim/doktor.jpg',
  physio: '/img/yasli-bakim/fizyoterapist.jpg',
  socialWorker: '/img/yasli-bakim/sosyal-hizmet.jpg',
  caregiver: '/img/yasli-bakim/bakim-personeli.jpg',
  support: '/img/yasli-bakim/destek-hizmet.jpg',
}

export default function Nursing() {
  const { t } = useI18n()
  const services = Object.entries(t.nursing.services)
  const who = Object.entries(t.nursing.who)
  const team = Object.entries(t.nursing.team)

  return (
    <div className="tone-calm">
      <PageHead
        title={t.nursing.pageTitle}
        lead={t.nursing.pageLead}
        image="/img/yasli-bakim/1.jpg"
      />

      <Section narrow>
        <p>{t.nursing.introBody}</p>
        <p>{t.nursing.introBody2}</p>
      </Section>

      <Section tone="alt" title={t.nursing.servicesTitle}>
        <ul className="checklist checklist--columns">
          {services.map(([key, label]) => (
            <li key={key}>{label}</li>
          ))}
        </ul>
      </Section>

      <Section title={t.nursing.whoTitle}>
        <ul className="tags tags--lg">
          {who.map(([key, label]) => (
            <li className="tag" key={key}>
              {label}
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="alt" title={t.nursing.teamTitle}>
        <ul className="cards cards--3">
          {team.map(([key, label]) => (
            <li className="card" key={key}>
              <Photo src={teamPhotos[key] ?? null} alt={label} ratio="4/3" />
              <div className="card__body">
                <h3 className="card__title">{label}</h3>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section title={t.nursing.roomsTitle}>
        <div className="split">
          <div className="split__text">
            <p className="room__summary">{t.rooms.nursing.summary}</p>
            <p>{t.rooms.nursing.body}</p>
            <ul className="tags">
              {nursingRoom.features.map((key) => (
                <li className="tag" key={key}>
                  {t.roomFeatures[key as keyof typeof t.roomFeatures]}
                </li>
              ))}
            </ul>
          </div>
          <div className="split__media">
            <Photo src={nursingRoom.cover} alt={t.rooms.nursing.title} ratio="4/3" />
          </div>
        </div>

        <Gallery
          images={nursingRoom.gallery}
          altPrefix={t.rooms.nursing.title}
          label={`${t.rooms.nursing.title} — ${t.rooms.galleryTitle}`}
        />
      </Section>

      <Section tone="deep" narrow>
        <h2 className="section__title">{t.nursing.contactTitle}</h2>
        <p>{t.nursing.contactBody}</p>
        <ul className="contact-actions">
          <li>
            <a className="btn" href={facility.phoneNursingHref}>
              {facility.phoneNursing}
            </a>
          </li>
          <li>
            <a className="btn btn--ghost btn--on-dark" href={facility.phoneOfficeHref}>
              {facility.phoneOffice}
            </a>
          </li>
        </ul>
      </Section>

      <Section narrow>
        {/* TODO: Sağlık hizmeti iddiaları ruhsat kapsamıyla uyumlu olmalı.
            Yayına almadan önce işletmeden teyit alınacak. */}
        <p className="todo-note">{t.nursing.complianceTodo}</p>
      </Section>
    </div>
  )
}
