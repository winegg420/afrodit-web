import Section from '../components/Section'
import Photo from '../components/Photo'
import Gallery from '../components/Gallery'
import PageHead from '../components/PageHead'
import { useI18n } from '../i18n'
import { altsFor } from '../i18n/photoAlts'
import type { Dict } from '../i18n'
import { news } from '../content/news'

type NewsCopy = { title: string; summary: string } & Record<string, string>

export default function News() {
  const { t, lang } = useI18n()

  return (
    <>
      <PageHead title={t.news.pageTitle} lead={t.news.pageLead} image="/img/haber1a.jpg" />

      {news.map((item, index) => {
        const copy = t.news[item.id as keyof Dict['news']] as NewsCopy
        const paragraphs = Object.keys(copy)
          .filter((key) => key.startsWith('body'))
          .sort()
          .map((key) => copy[key])

        return (
          <Section key={item.id} id={item.slug} tone={index % 2 === 1 ? 'alt' : 'default'}>
            <article className="article">
              <h2 className="section__title">{copy.title}</h2>
              <Photo src={item.cover} alt={copy.title} ratio="16/9" />
              <p className="article__summary">{copy.summary}</p>
              {paragraphs.map((text, i) => (
                <p key={i}>{text}</p>
              ))}
            </article>

            <Gallery
              images={item.gallery}
              altPrefix={copy.title}
              label={copy.title}
              alts={altsFor(lang, item.gallery)}
            />
          </Section>
        )
      })}
    </>
  )
}
