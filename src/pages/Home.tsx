import { Link } from 'react-router-dom'
import Section from '../components/Section'
import Photo from '../components/Photo'
import { useI18n, useLangPath } from '../i18n'
import { SLUGS } from '../routes'
import { rooms } from '../content/rooms'
import { highlights } from '../content/amenities'
import { reviews } from '../content/reviews'
import { news } from '../content/news'
import { facility } from '../content/facility'
import type { Dict } from '../i18n'

type RoomKey = keyof Dict['rooms']

export default function Home() {
  const { t } = useI18n()
  const path = useLangPath()

  return (
    <>
      <section className="hero">
        <img
          className="hero__image"
          src="/img/slayt-1.jpg"
          alt={t.brand.name}
          fetchPriority="high"
          decoding="async"
        />
        <div className="hero__overlay" />
        <div className="hero__content container">
          <p className="hero__kicker">{t.brand.tagline}</p>
          <h1 className="hero__title">{t.home.heroTitle}</h1>
          <p className="hero__lead">{t.home.heroLead}</p>
          <div className="hero__actions">
            <a className="btn" href={facility.whatsappHref} target="_blank" rel="noreferrer">
              {t.actions.reserveLong}
            </a>
            <a className="btn btn--ghost btn--on-dark" href={facility.phoneOfficeHref}>
              {facility.phoneOffice}
            </a>
          </div>
        </div>
      </section>

      <Section tone="default">
        <div className="split">
          <div className="split__text">
            <h2 className="section__title">{t.home.introTitle}</h2>
            <p>{t.home.introBody}</p>
            <Link className="link-more" to={path(SLUGS.amenities)}>
              {t.actions.allAmenities}
            </Link>
          </div>
          <div className="split__media">
            <Photo src="/img/hakkimizda.jpg" alt={t.home.introTitle} ratio="4/3" />
          </div>
        </div>
      </Section>

      <Section tone="alt" title={t.home.roomsTitle} lead={t.home.roomsLead}>
        <ul className="cards cards--4">
          {rooms.map((room) => {
            const copy = t.rooms[room.id as RoomKey] as { title: string; summary: string }
            return (
              <li className="card" key={room.id}>
                <Link className="card__link" to={`${path(SLUGS.rooms)}#${room.slug}`}>
                  <Photo src={room.cover} alt={copy.title} ratio="4/3" />
                  <div className="card__body">
                    <h3 className="card__title">{copy.title}</h3>
                    <p className="card__meta">{copy.summary}</p>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
        <Link className="link-more" to={path(SLUGS.rooms)}>
          {t.actions.allRooms}
        </Link>
      </Section>

      <Section title={t.home.amenitiesTitle} lead={t.home.amenitiesLead}>
        <ul className="feature-grid">
          {highlights.map((item) => {
            const copy = t.amenities[item.id as keyof Dict['amenities']] as {
              title: string
              body: string
            }
            return (
              <li className="feature" key={item.id}>
                <h3 className="feature__title">{copy.title}</h3>
                <p className="feature__body">{copy.body}</p>
              </li>
            )
          })}
        </ul>
        <Link className="link-more" to={path(SLUGS.amenities)}>
          {t.actions.allAmenities}
        </Link>
      </Section>

      <Section tone="alt">
        <div className="split split--reverse">
          <div className="split__text">
            <h2 className="section__title">{t.home.tennisTitle}</h2>
            <p>{t.home.tennisLead}</p>
            <p>{t.tennis.discountBody}</p>
            <Link className="link-more" to={path(SLUGS.tennis)}>
              {t.nav.tennis}
            </Link>
          </div>
          <div className="split__media">
            <Photo src="/img/aftek.jpg" alt={t.home.tennisTitle} ratio="4/3" />
          </div>
        </div>
      </Section>

      <Section>
        <div className="split">
          <div className="split__text">
            <h2 className="section__title">{t.home.nursingTitle}</h2>
            <p>{t.home.nursingLead}</p>
            <Link className="link-more" to={path(SLUGS.nursing)}>
              {t.nav.nursing}
            </Link>
          </div>
          <div className="split__media">
            <Photo src="/img/yasli-bakim/2.jpg" alt={t.home.nursingTitle} ratio="4/3" />
          </div>
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
          {news.map((item) => {
            const copy = t.news[item.id as keyof Dict['news']] as {
              title: string
              summary: string
            }
            return (
              <li className="card" key={item.id}>
                <Link className="card__link" to={`${path(SLUGS.news)}#${item.slug}`}>
                  <Photo src={item.cover} alt={copy.title} ratio="3/2" />
                  <div className="card__body">
                    <h3 className="card__title">{copy.title}</h3>
                    <p className="card__meta">{copy.summary}</p>
                  </div>
                </Link>
              </li>
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
