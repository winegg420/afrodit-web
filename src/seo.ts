import { dictionaries, LANGS } from './i18n'
import type { Lang } from './i18n'
import { SLUGS } from './routes'
import { absoluteUrl } from './config'
import { facility } from './content/facility'
import { amenityGroups } from './content/amenities'
import { resolveImage } from './lib/image'

export type PageMeta = {
  /** Tam yol, örn. /tr/odalar */
  path: string
  lang: Lang
  title: string
  description: string
  /** Kendi kanonik adresi */
  canonical: string
  /** Aynı sayfanın üç dildeki karşılığı — hreflang için */
  alternates: Array<{ lang: Lang; url: string }>
  /** Paylaşım görseli (tam adres) */
  ogImage: string
  ogImageWidth: number
  ogImageHeight: number
  /** <head> icine preload edilecek ilk ekran görseli */
  preloadImage?: string
  /** Preload, srcset ile aynı adayı seçsin diye WebP listesi */
  preloadSrcSet?: string
  preloadSizes?: string
  /** Yapılandırılmış veri (JSON-LD) — yalnızca anasayfalarda */
  jsonLd?: string
}

/** Sayfa başına paylaşım görseli. Sayfanın kendi ana fotoğrafı, yoksa açılış görseli. */
const OG_IMAGES: Record<string, { src: string; w: number; h: number }> = {
  home: { src: '/img/slayt-1.jpg', w: 1920, h: 1080 },
  [SLUGS.rooms]: { src: '/img/slayt-1.jpg', w: 1920, h: 1080 },
  [SLUGS.amenities]: { src: '/img/yorum.jpg', w: 1920, h: 1080 },
  [SLUGS.tennis]: { src: '/img/slayt-1.jpg', w: 1920, h: 1080 },
  [SLUGS.nursing]: { src: '/img/yasli-bakim/1.jpg', w: 1200, h: 1082 },
  [SLUGS.news]: { src: '/img/haber1a.jpg', w: 1493, h: 696 },
  [SLUGS.contact]: { src: '/img/video.jpg', w: 1920, h: 1080 },
}

/**
 * Tesisin yapılandırılmış verisi (schema.org LodgingBusiness).
 *
 * KURAL: yalnızca teyit ettiğimiz bilgiler. Fiyat aralığı, yıldız sayısı,
 * puan ve giriş/çıkış saatleri BİLEREK yok — bunlar işletmeden teyit
 * bekliyor, uydurulmayacak.
 */
function lodgingBusiness(lang: Lang): string {
  const t = dictionaries[lang]

  const data = {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    '@id': absoluteUrl('/#tesis'),
    name: facility.legalName,
    alternateName: facility.name,
    description: t.home.introBody,
    url: absoluteUrl(`/${lang}`),
    inLanguage: LANGS.map((code) => dictionaries[code].meta.htmlLang),
    telephone: facility.phoneOffice,
    email: facility.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${facility.address.street} ${facility.address.district}`,
      addressLocality: facility.address.district,
      addressRegion: facility.address.city,
      postalCode: facility.address.zip,
      addressCountry: 'TR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      // Google Haritalar yerleştirme adresinden alındı
      latitude: 39.569495,
      longitude: 26.800473,
    },
    hasMap: facility.mapLink,
    image: [
      absoluteUrl('/img/slayt-1.jpg'),
      absoluteUrl('/img/banner.jpg'),
      absoluteUrl('/img/yorum.jpg'),
      absoluteUrl('/img/video.jpg'),
    ],
    photo: absoluteUrl('/img/slayt-1.jpg'),
    sameAs: facility.social.map((item) => item.href),
    amenityFeature: amenityGroups.flatMap((group) => {
      const copy = t.amenityGroups[group.id as keyof typeof t.amenityGroups] as Record<
        string,
        string
      >
      return group.items.map((key) => ({
        '@type': 'LocationFeatureSpecification',
        name: copy[key],
        value: true,
      }))
    }),
    // TODO: priceRange, starRating, aggregateRating, checkinTime ve
    // checkoutTime işletmeden teyit edilmediği için bilerek yazılmadı.
  }

  return JSON.stringify(data)
}

/** Prerender edilecek sayfalar: 7 sayfa × 3 dil. */
export function allPages(): PageMeta[] {
  const pages: PageMeta[] = []

  const sectionsFor = (lang: Lang) => {
    const t = dictionaries[lang]
    return [
      { slug: '', title: `${t.brand.name} — ${t.brand.tagline}`, description: t.home.heroLead },
      { slug: SLUGS.rooms, title: t.rooms.pageTitle, description: t.rooms.pageLead },
      { slug: SLUGS.amenities, title: t.amenities.pageTitle, description: t.amenities.pageLead },
      { slug: SLUGS.tennis, title: t.tennis.pageTitle, description: t.tennis.pageLead },
      { slug: SLUGS.nursing, title: t.nursing.pageTitle, description: t.nursing.pageLead },
      { slug: SLUGS.news, title: t.news.pageTitle, description: t.news.pageLead },
      { slug: SLUGS.contact, title: t.contact.pageTitle, description: t.contact.pageLead },
    ]
  }

  for (const lang of LANGS) {
    const t = dictionaries[lang]

    for (const section of sectionsFor(lang)) {
      const path = section.slug ? `/${lang}/${section.slug}` : `/${lang}`
      const og = OG_IMAGES[section.slug || 'home']

      pages.push({
        path,
        lang,
        title: section.slug ? `${section.title} — ${t.brand.name}` : section.title,
        description: section.description,
        canonical: absoluteUrl(path),
        alternates: LANGS.map((code) => ({
          lang: code,
          url: absoluteUrl(section.slug ? `/${code}/${section.slug}` : `/${code}`),
        })),
        ogImage: absoluteUrl(og.src),
        ogImageWidth: og.w,
        ogImageHeight: og.h,
        ...(section.slug
          ? {}
          : {
              // Anasayfanın en üstündeki görsel; geç gelmesin diye önden yüklenir.
              preloadImage: '/img/slayt-1.jpg',
              preloadSrcSet: resolveImage('/img/slayt-1.jpg')?.webpSrcSet,
              preloadSizes: '100vw',
              jsonLd: lodgingBusiness(lang),
            }),
      })
    }
  }

  return pages
}

/** Site haritası. Her girdi kendi dil karşılıklarını da bildirir. */
export function sitemapXml(pages: PageMeta[]): string {
  const urls = pages
    .map((page) => {
      const links = page.alternates
        .map(
          (alt) =>
            `    <xhtml:link rel="alternate" hreflang="${alt.lang}" href="${alt.url}" />`,
        )
        .join('\n')

      const xDefault = page.alternates.find((alt) => alt.lang === 'tr')

      return [
        '  <url>',
        `    <loc>${page.canonical}</loc>`,
        links,
        xDefault
          ? `    <xhtml:link rel="alternate" hreflang="x-default" href="${xDefault.url}" />`
          : '',
        '  </url>',
      ]
        .filter(Boolean)
        .join('\n')
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`
}

export function robotsTxt(): string {
  return `User-agent: *
Allow: /

Sitemap: ${absoluteUrl('/sitemap.xml')}
`
}
