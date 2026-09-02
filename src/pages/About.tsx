import { Link } from 'react-router-dom'
import Section from '../components/Section'
import PageHead from '../components/PageHead'
import Photo from '../components/Photo'
import Reveal from '../components/Reveal'
import { useI18n } from '../i18n'
import type { Dict } from '../i18n'
import { useSectionPath } from '../hooks/useSectionPath'
import { facility } from '../content/facility'
import { news } from '../content/news'

/*
 * Görsel seçimi notu (Photo.tsx'teki kuralla aynı: hiçbir görsel doğal
 * genişliğinin üstünde gösterilmiyor).
 *   - hakkimizda.jpg ve hakkimizda2.jpg yalnızca 375 px; yarım genişlikte
 *     gerilirlerdi, o yüzden yalnızca dörtlü kart ızgarasında kullanılıyor.
 *   - club-afrodit.jpg ve mono-afrodit.jpg 600 px — aynı gerekçe.
 *   - Yarım genişlikteki iki blokta 1920 px'lik banner.jpg ve yorum.jpg var.
 *   - Başlık bandı görselsiz: bu sayfaya yakışan geniş fotoğraf elimizde yok.
 */
export default function About() {
  const { t, lang } = useI18n()
  const path = useSectionPath()

  // Mitoloji göndermesi haberdeki tam metne bağlanıyor; hikâye orada duruyor.
  const afroditHaberi = news.find((item) => item.id === 'afroditStory')

  return (
    <>
      <PageHead title={t.about.pageTitle} lead={t.about.pageLead} />

      <Section>
        <div className="split">
          <div className="split__text">
            <Reveal>
              <h2 className="section__title">{t.about.storyTitle}</h2>
            </Reveal>
            <p>{t.about.storyBody1}</p>
            <p>{t.about.storyBody2}</p>
          </div>
          <Reveal className="split__media">
            <Photo src="/img/banner.jpg" alt={t.about.storyTitle} ratio="4/3" />
          </Reveal>
        </div>
      </Section>

      <Section tone="alt">
        <div className="split split--reverse">
          <div className="split__text">
            <Reveal>
              <h2 className="section__title">{t.about.gardenTitle}</h2>
            </Reveal>
            <p>{t.about.gardenBody}</p>
          </div>
          <Reveal className="split__media">
            <Photo src="/img/yorum.jpg" alt={t.about.gardenTitle} ratio="4/3" />
          </Reveal>
        </div>
      </Section>

      <Section title={t.about.locationTitle} lead={t.about.locationLead}>
        <dl className="specs specs--columns">
          {facility.distances.map((item) => (
            <div className="specs__row" key={item.key}>
              <dt>{t.distances[item.key as keyof Dict['distances']]}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section tone="alt" narrow title={t.about.mythTitle}>
        <p>{t.about.mythBody}</p>
        {afroditHaberi && (
          <Link className="link-more" to={`${path('news')}#${afroditHaberi.slug[lang]}`}>
            {t.about.mythLink}
          </Link>
        )}
      </Section>

      <Section title={t.about.photosTitle}>
        <ul className="cards cards--4">
          <Reveal as="li"><Photo src="/img/hakkimizda.jpg" alt={t.about.photosTitle} ratio="3/4" sizes="(max-width: 40rem) 100vw, 25vw" /></Reveal>
          <Reveal as="li" index={1}><Photo src="/img/hakkimizda2.jpg" alt={t.about.photosTitle} ratio="3/4" sizes="(max-width: 40rem) 100vw, 25vw" /></Reveal>
          <Reveal as="li" index={2}><Photo src="/img/club-afrodit.jpg" alt={t.about.photosTitle} ratio="3/4" sizes="(max-width: 40rem) 100vw, 25vw" /></Reveal>
          <Reveal as="li" index={3}><Photo src="/img/mono-afrodit.jpg" alt={t.about.photosTitle} ratio="3/4" sizes="(max-width: 40rem) 100vw, 25vw" /></Reveal>
        </ul>
      </Section>
    </>
  )
}
