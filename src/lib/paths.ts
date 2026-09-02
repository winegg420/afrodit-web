import { LANGS } from '../i18n'
import type { Lang } from '../i18n'

/**
 * Adres parçaları — her dilde kendi dilinde.
 *
 * Menüde "Zimmer" yazıp adreste /de/odalar göstermek tutarsızdı; hem
 * kullanıcı hem arama motoru için her dil kendi adresini kullanıyor.
 *
 * Eski Türkçe adresler kırılmasın diye public/_redirects içinde
 * /en/odalar -> /en/rooms gibi kalıcı (301) yönlendirmeler var.
 */
export type SectionKey = 'rooms' | 'amenities' | 'tennis' | 'nursing' | 'news' | 'contact'

export const SECTION_KEYS: SectionKey[] = [
  'rooms',
  'amenities',
  'tennis',
  'nursing',
  'news',
  'contact',
]

export const SLUGS: Record<Lang, Record<SectionKey, string>> = {
  tr: {
    rooms: 'odalar',
    amenities: 'olanaklar',
    tennis: 'tenis',
    nursing: 'saglikli-yasam',
    news: 'haberler',
    contact: 'iletisim',
  },
  en: {
    rooms: 'rooms',
    amenities: 'facilities',
    tennis: 'tennis',
    nursing: 'assisted-living',
    news: 'news',
    contact: 'contact',
  },
  de: {
    rooms: 'zimmer',
    amenities: 'anlage',
    tennis: 'tennis',
    nursing: 'gesundes-leben',
    news: 'aktuelles',
    contact: 'kontakt',
  },
}

/** Eski (Türkçe) adreslerden yenilerine yönlendirme için: dil -> [eski, yeni] */
export function eskiYeniSluglar(lang: Lang): Array<[string, string]> {
  if (lang === 'tr') return []
  return SECTION_KEYS.map((key) => [SLUGS.tr[key], SLUGS[lang][key]] as [string, string]).filter(
    ([eski, yeni]) => eski !== yeni,
  )
}

/** Bir dilin slug'ından bölüm anahtarını bulur. */
export function sectionFromSlug(lang: Lang, slug: string): SectionKey | null {
  const tablo = SLUGS[lang]
  for (const key of SECTION_KEYS) {
    if (tablo[key] === slug) return key
  }
  return null
}

/** Bölümün o dildeki tam yolu: sectionPath('de', 'rooms') -> /de/zimmer */
export function sectionPath(lang: Lang, key?: SectionKey): string {
  return key ? `/${lang}/${SLUGS[lang][key]}` : `/${lang}`
}

/**
 * Çapa (bölüm bağlantısı) çevirileri.
 *
 * Oda ve haber bölümlerinin id'leri de dile göre değişiyor; dil
 * değiştirilirken #standart-oda -> #standard-room eşlemesi buradan
 * yapılıyor. Kayıtlar content dosyalarından toplanır.
 */
const cevrilebilirCapalar: Array<Record<Lang, string>> = []

export function registerAnchors(kayitlar: Array<Record<Lang, string>>): void {
  cevrilebilirCapalar.push(...kayitlar)
}

function capaCevir(capa: string, from: Lang, to: Lang): string {
  if (!capa) return ''
  const temiz = capa.replace(/^#/, '')
  for (const kayit of cevrilebilirCapalar) {
    if (kayit[from] === temiz) return `#${kayit[to]}`
  }
  return capa
}

/**
 * Aynı sayfada kalarak dili değiştiren yol üretir.
 *   /de/zimmer#standardzimmer  ->  /en/rooms#standard-room
 * Bölüm tanınmazsa (404 gibi) o dilin anasayfasına düşer.
 */
export function pathWithLang(pathname: string, hash: string, to: Lang): string {
  const parcalar = pathname.split('/').filter(Boolean)
  const from = parcalar[0] as Lang | undefined

  if (!from || !LANGS.includes(from)) return `/${to}`

  const slug = parcalar[1]
  if (!slug) return `/${to}${capaCevir(hash, from, to)}`

  const key = sectionFromSlug(from, slug)
  if (!key) return `/${to}`

  return `${sectionPath(to, key)}${capaCevir(hash, from, to)}`
}

// Oda ve haber bölümlerinin çapaları burada kayda geçiyor; dil
// değiştirilirken #standart-oda -> #standard-room eşlemesi bunlarla yapılıyor.
// (İçerik dosyaları buraya bağımlı olmasın diye kayıt burada yapılıyor.)
import { rooms, nursingRoom } from '../content/rooms'
import { news } from '../content/news'

registerAnchors([...rooms.map((r) => r.slug), nursingRoom.slug, ...news.map((n) => n.slug)])
