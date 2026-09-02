/**
 * Haberler — dilden bağımsız yapı.
 * Başlık, özet ve gövde metinleri i18n `news.<id>` altında.
 */

import type { Lang } from '../i18n'

export type NewsItem = {
  id: string
  /** Bölüm çapası — her dilde kendi dilinde */
  slug: Record<Lang, string>
  cover: string
  gallery: string[]
  /** TODO: yayın tarihleri işletmeden teyit edilmedi. */
  date: string | null
}

export const news: NewsItem[] = [
  {
    id: 'afroditStory',
    slug: {
      tr: 'afrodit-ve-guzellik-yarismasinin-hikayesi',
      en: 'the-story-of-aphrodite-and-the-beauty-contest',
      de: 'die-geschichte-von-aphrodite-und-dem-schoenheitswettbewerb',
    },
    cover: '/img/haber1a.jpg',
    gallery: ['/img/haber-1/1.jpg', '/img/haber-1/2.jpg', '/img/haber-1/3.jpg'],
    date: null,
  },
  {
    id: 'seasonStart',
    slug: {
      tr: 'club-afroditte-tatil-sezonu-basladi',
      en: 'the-holiday-season-has-begun',
      de: 'die-feriensaison-hat-begonnen',
    },
    cover: '/img/haber2a.jpg',
    gallery: ['/img/haber-2/1.jpg', '/img/haber-2/2.jpg', '/img/haber-2/3.jpg'],
    date: null,
  },
  {
    id: 'mono',
    slug: {
      tr: 'mono-afrodit-kulubu-yazi-renklendiriyor',
      en: 'mono-afrodit-brings-colour-to-the-summer',
      de: 'mono-afrodit-bringt-farbe-in-den-sommer',
    },
    cover: '/img/haber3a.jpg',
    gallery: ['/img/haber-3/1.jpg', '/img/haber-3/2.jpg', '/img/haber-3/3.jpg'],
    date: null,
  },
]
