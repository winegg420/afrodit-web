import { dictionaries, LANGS } from './i18n'
import type { Lang } from './i18n'
import { SLUGS } from './routes'

export type PageMeta = {
  /** Tam yol, örn. /tr/odalar */
  path: string
  lang: Lang
  title: string
  description: string
}

/** Prerender edilecek sayfalar: 7 sayfa × 3 dil. */
export function allPages(): PageMeta[] {
  const pages: PageMeta[] = []

  for (const lang of LANGS) {
    const t = dictionaries[lang]

    pages.push({
      path: `/${lang}`,
      lang,
      title: `${t.brand.name} — ${t.brand.tagline}`,
      description: t.home.heroLead,
    })

    const sections: Array<[string, string, string]> = [
      [SLUGS.rooms, t.rooms.pageTitle, t.rooms.pageLead],
      [SLUGS.amenities, t.amenities.pageTitle, t.amenities.pageLead],
      [SLUGS.tennis, t.tennis.pageTitle, t.tennis.pageLead],
      [SLUGS.nursing, t.nursing.pageTitle, t.nursing.pageLead],
      [SLUGS.news, t.news.pageTitle, t.news.pageLead],
      [SLUGS.contact, t.contact.pageTitle, t.contact.pageLead],
    ]

    for (const [slug, title, description] of sections) {
      pages.push({
        path: `/${lang}/${slug}`,
        lang,
        title: `${title} — ${t.brand.name}`,
        description,
      })
    }
  }

  return pages
}
