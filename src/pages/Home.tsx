import { Link } from 'react-router-dom'
import Section from '../components/Section'
import Photo from '../components/Photo'
import Hero from '../components/Hero'
import Reveal from '../components/Reveal'
import RoomCard from '../components/RoomCard'
import { useI18n, useLangPath } from '../i18n'
import type { Dict } from '../i18n'
import { SLUGS } from '../routes'
import { rooms } from '../content/rooms'
import { amenityGroups } from '../content/amenities'
import { reviews } from '../content/reviews'
import { news } from '../content/news'
import { facility } from '../content/facility'

/** Anasayfada gösterilecek olanak blokları — fotoğrafı olanlar. */
const HOME_AMENITIES = ['beach', 'pools', 'kitchen'] as const

export default function Home() {
  const { t } = useI18n()
  const path = useLangPath()

  const blocks = HOME_AMENITIES.map((id) =>
    amenityGroups.find((group) => group.id === id),
  ).filter((group): group is NonNullable<typeof group> => Boolean(group))

  return (
    <>
      <Hero nextSectionId="giris" />

      <Section id="giris">
        <div className="split">
          <div className="split__text">
            <Reveal>
              <h2 className="section__title">{t.home.introTitle}</h2>
            </Reveal>
            <p>{t.home.introBody}</p>
            <Link className="link-more" to={path(SLUGS.amenities)}>
              {t.actions.allAmenities}
            </Link>
          </div>
          <Reveal className="split__media">
            <Photo src="/img/hakkimizda.jpg" alt={t.home.introTitle} ratio="4/3" />
          </Reveal>
        </div>
      </Section>

      {/* Anasayfanın en önemli bölümü: görsel olarak da en büyük duruyor. */}
      <Section
        tone="alt"
        className="section--major"
        title={t.home.roomsTitle}
        lead={t.home.roomsLead}
      >
        <ul className="cards cards--4">
          {rooms.map((room, i) => (
            <Reveal as="li" key={room.id} index={i}>
              <RoomCard room={room} to={`${path(SLUGS.rooms)}#${room.slug}`} />
            </Reveal>
          ))}
        </ul>
        <Link className="link-more" to={path(SLUGS.rooms)}>
          {t.actions.allRooms}
        </Link>
      </Section>

      <Section title={t.home.amenitiesTitle} lead={t.home.amenitiesLead}>
        {blocks.map((group, i) => {
          const copy = t.amenityGroups[group.id as keyof Dict['amenityGroups']] as {
            title: string
            body: string
          }

          return (
            <div
              className={`split split--wide${i % 2 === 1 ? ' split--reverse' : ''}`}
              key={group.id}
            >
              <div className="split__text">
                <Reveal>
                  <h3 className="section__subtitle">{copy.title}</h3>
                </Reveal>
                <p>{copy.body}</p>
              </div>
              <Reveal className="split__media">
                <Photo src={group.image} alt={copy.title} ratio="3/2" />
              </Reveal>
            </div>
          )
        })}
        <Link className="link-more" to={path(SLUGS.amenities)}>
          {t.actions.allAmenities}
        </Link>
      </Section>

      <Section tone="alt">
        <div className="split split--reverse">
          <div className="split__text">
            <Reveal>
              <h2 className="section__title">{t.home.tennisTitle}</h2>
            </Reveal>
            <p>{t.home.tennisLead}</p>
            <p>{t.tennis.discountBody}</p>
            <Link className="link-more" to={path(SLUGS.tennis)}>
              {t.nav.tennis}
            </Link>
          </div>
          <Reveal className="split__media">
            <Photo src="/img/aftek.jpg" alt={t.home.tennisTitle} ratio="4/3" />
          </Reveal>
        </div>
      </Section>

      <Section>
        <div className="split">
          <div className="split__text">
            <Reveal>
              <h2 className="section__title">{t.home.nursingTitle}</h2>
            </Reveal>
            <p>{t.home.nursingLead}</p>
            <Link className="link-more" to={path(SLUGS.nursing)}>
              {t.nav.nursing}
            </Link>
          </div>
          <Reveal className="split__media">
            <Photo src="/img/yasli-bakim/2.jpg" alt={t.home.nursingTitle} ratio="4/3" />
          </Reveal>
        </div>
      </Section>

      <Section tone="deep" title={t.home.reviewsTitle} lead={t.reviews.lead}>
        <ul className="quotes">
          {reviews.map((review) => (
            <li className="quote" key={review.id}>
              <blockquote lang={review.lang}>
                <p>{review.text}</p>
              </blockquote>
              <cite className="quote__author">{review.author}</cite>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="alt" title={t.home.newsTitle}>
        <ul className="cards cards--3">
          {news.map((item, i) => {
            const copy = t.news[item.id as keyof Dict['news']] as {
              title: string
              summary: string
            }
            return (
              <Reveal as="li" key={item.id} index={i}>
                <article className="card">
                  <Link className="card__link" to={`${path(SLUGS.news)}#${item.slug}`}>
                    <Photo src={item.cover} alt={copy.title} ratio="3/2" />
                    <span className="card__body">
                      <span className="card__title">{copy.title}</span>
                      <span className="card__meta">{copy.summary}</span>
                    </span>
                  </Link>
                </article>
              </Reveal>
            )
          })}
        </ul>
        <Link className="link-more" to={path(SLUGS.news)}>
          {t.actions.allNews}
        </Link>
      </Section>

      <Section title={t.home.contactTitle} lead={t.home.contactLead} narrow>
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
            <a className="btn btn--ghost" href={facility.emailHref}>
              {facility.email}
            </a>
          </li>
        </ul>
        <Link className="link-more" to={path(SLUGS.contact)}>
          {t.nav.contact}
        </Link>
      </Section>
    </>
  )
}
