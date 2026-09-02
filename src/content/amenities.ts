/**
 * Olanaklar — dilden bağımsız yapı.
 * Başlık/açıklama metinleri i18n `amenities.<id>` ve `amenityGroups.<id>` altında.
 */

export type Amenity = { id: string }

export type AmenityGroup = {
  id: string
  image: string | null
  items: string[]
}

/** Anasayfada öne çıkan altı olanak. */
export const highlights: Amenity[] = [
  { id: 'tennis' },
  { id: 'parking' },
  { id: 'slide' },
  { id: 'beach' },
  { id: 'pool' },
  { id: 'buffet' },
]

/** Olanaklar sayfasındaki gruplar. */
export const amenityGroups: AmenityGroup[] = [
  {
    id: 'beach',
    image: '/img/club-afrodit.jpg',
    items: ['blueFlag', 'sunbeds', 'beachCafe', 'sandBags'],
  },
  {
    id: 'pools',
    image: '/img/haber2a.jpg',
    items: ['semiOlympic', 'indoor', 'kids', 'slide', 'womenOnly'],
  },
  {
    id: 'wellness',
    image: null, // TODO: sağlık kulübü fotoğrafı yok
    items: ['fitness', 'massage', 'sauna', 'hamam', 'jacuzzi'],
  },
  {
    id: 'kitchen',
    // TODO: mutfak fotoğrafı yok. Buradaki hakkimizda2.jpg hem 375 px'ti
    // (gerilip bulanıklaşıyordu) hem de bir apart binası fotoğrafıydı, konuyla
    // ilgisizdi. İşletmeden mutfak/taş fırın/teras fotoğrafı istenmeli.
    image: null,
    items: ['openBuffet', 'organicGarden', 'oliveOil', 'stoneOven', 'herbs', 'terraceDinner'],
  },
  {
    id: 'mono',
    image: '/img/mono-afrodit.jpg',
    items: ['houseMusic', 'poolsideDisco', 'youtube'],
  },
  {
    id: 'other',
    image: null,
    items: ['parking', 'pets', 'wifi', 'transfer'],
  },
]
