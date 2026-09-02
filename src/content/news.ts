/**
 * Haberler — dilden bağımsız yapı.
 * Başlık, özet ve gövde metinleri i18n `news.<id>` altında.
 */

export type NewsItem = {
  id: string
  slug: string
  cover: string
  gallery: string[]
  /** TODO: yayın tarihleri işletmeden teyit edilmedi. */
  date: string | null
}

export const news: NewsItem[] = [
  {
    id: 'afroditStory',
    slug: 'afrodit-ve-guzellik-yarismasinin-hikayesi',
    cover: '/img/haber1.jpg',
    gallery: ['/img/haber-1/1.jpg', '/img/haber-1/2.jpg', '/img/haber-1/3.jpg'],
    date: null,
  },
  {
    id: 'seasonStart',
    slug: 'club-afroditte-tatil-sezonu-basladi',
    cover: '/img/haber2.jpg',
    gallery: ['/img/haber-2/1.jpg', '/img/haber-2/2.jpg', '/img/haber-2/3.jpg'],
    date: null,
  },
  {
    id: 'mono',
    slug: 'mono-afrodit-kulubu-yazi-renklendiriyor',
    cover: '/img/haber3.jpg',
    gallery: ['/img/haber-3/1.jpg', '/img/haber-3/2.jpg', '/img/haber-3/3.jpg'],
    date: null,
  },
]
