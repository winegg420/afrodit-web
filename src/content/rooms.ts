// TODO: oda sayıları ve metrekareler işletmeden teyit edilmedi.

/**
 * Oda envanteri — dilden bağımsız yapı.
 * Başlık/açıklama metinleri i18n içindeki `rooms.<id>` altında.
 * `id`, `capacity`, `size` alanları ileride rezervasyon motoruna bağlanacak.
 */

import type { Lang } from '../i18n'

export type Room = {
  id: string
  /** Bölüm çapası — her dilde kendi dilinde */
  slug: Record<Lang, string>
  /** kişi sayısı (min–max) */
  capacity: { min: number; max: number }
  /** m² (min–max) */
  size: { min: number; max: number }
  /** tesisteki adet — bilinmiyorsa null */
  count: number | null
  /** kart görseli */
  cover: string
  /** galeri görselleri */
  gallery: string[]
  /** i18n `roomFeatures.<key>` anahtarları */
  features: string[]
  /** Genel "N kişi" ifadesi yetmiyorsa i18n `rooms.capacityLabels.<key>` */
  capacityKey?: 'grandSuit'
}

export const rooms: Room[] = [
  {
    id: 'standart',
    slug: { tr: 'standart-oda', en: 'standard-room', de: 'standardzimmer' },
    capacity: { min: 1, max: 2 },
    size: { min: 25, max: 25 },
    count: 25,
    cover: '/img/standart-oda.jpg',
    gallery: [
      '/img/standart-oda/1.jpg',
      '/img/standart-oda/2.jpg',
      '/img/standart-oda/3.jpg',
      '/img/standart-oda/4.jpg',
      '/img/standart-oda/5.jpg',
    ],
    features: ['tv', 'ac', 'fridge', 'phone', 'balcony', 'hairdryer', 'view'],
  },
  {
    id: 'suit',
    slug: { tr: 'suit-oda', en: 'suite-room', de: 'suite' },
    capacity: { min: 2, max: 4 },
    size: { min: 65, max: 65 },
    count: null,
    cover: '/img/suit-oda.jpg',
    gallery: [
      '/img/suit-oda/1.jpg',
      '/img/suit-oda/2.jpg',
      '/img/suit-oda/3.jpg',
      '/img/suit-oda/4.jpg',
      '/img/suit-oda/5.jpg',
      '/img/suit-oda/6.jpg',
    ],
    features: ['family', 'ac', 'balcony', 'fridge', 'minibar', 'tv', 'view'],
  },
  {
    id: 'grandSuit',
    slug: { tr: 'grand-suit-oda', en: 'grand-suite', de: 'grand-suite' },
    capacity: { min: 4, max: 6 },
    size: { min: 90, max: 90 },
    count: 16,
    cover: '/img/grand-suit-oda.jpg',
    gallery: [
      '/img/grand-suit-oda/1.jpg',
      '/img/grand-suit-oda/2.jpg',
      '/img/grand-suit-oda/3.jpg',
      '/img/grand-suit-oda/4.jpg',
      '/img/grand-suit-oda/5.jpg',
      '/img/grand-suit-oda/6.jpg',
      '/img/grand-suit-oda/7.jpg',
      '/img/grand-suit-oda/8.jpg',
      '/img/grand-suit-oda/9.jpg',
      '/img/grand-suit-oda/10.jpg',
    ],
    capacityKey: 'grandSuit',
    features: ['livingRoom', 'ac', 'internet', 'safe', 'fridge', 'phone', 'tv', 'roomService'],
  },
  {
    id: 'apart',
    slug: { tr: 'apart-daireler', en: 'apartments', de: 'apartments' },
    capacity: { min: 6, max: 8 },
    size: { min: 90, max: 140 },
    count: 25,
    cover: '/img/apart-daireler.jpg',
    gallery: [
      '/img/apart-daireler/1.png',
      '/img/apart-daireler/2.png',
      '/img/apart-daireler/3.png',
    ],
    features: ['kitchen', 'ac', 'family', 'privateEntrance', 'balcony', 'yearRound', 'laundry'],
  },
]

/** Huzurevi bölümünün odaları — tatil envanterinden ayrı tutulur. */
export const nursingRoom: Room = {
  id: 'nursing',
  slug: { tr: 'huzurevi-odalari', en: 'care-home-rooms', de: 'zimmer-der-residenz' },
  capacity: { min: 1, max: 3 },
  size: { min: 35, max: 35 },
  count: 20,
  cover: '/img/yasli-bakim/1.jpg',
  gallery: [
    '/img/yasli-bakim/1.jpg',
    '/img/yasli-bakim/2.jpg',
    '/img/yasli-bakim/3.jpg',
    '/img/yasli-bakim/4.jpg',
    '/img/yasli-bakim/5.jpg',
    '/img/yasli-bakim/6.jpg',
    '/img/yasli-bakim/7.jpg',
    '/img/yasli-bakim/8.jpg',
    '/img/yasli-bakim/9.jpg',
    '/img/yasli-bakim/10.jpg',
  ],
  features: ['bathroom', 'ac', 'tv', 'fridge', 'wardrobe', 'careBed'],
}
