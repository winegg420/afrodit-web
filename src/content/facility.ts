/**
 * Tesis künyesi — dilden bağımsız veriler (numara, adres, bağlantı).
 * Metinler i18n dosyalarında; burada sadece değişmeyen bilgiler durur.
 */

export const facility = {
  name: 'Club Afrodit',
  legalName: 'Club Afrodit Tatil Köyü',

  phoneOffice: '+90 266 378 05 80',
  phoneOfficeHref: 'tel:+902663780580',
  phoneMobile: '+90 536 452 86 88',
  phoneMobileHref: 'tel:+905364528688',
  whatsappHref: 'https://wa.me/905364528688',
  // Huzurevi bölümünde ayrıca bu numara veriliyor
  phoneNursing: '+90 266 378 01 80',
  phoneNursingHref: 'tel:+902663780180',

  email: 'info@clubafrodit.com',
  emailHref: 'mailto:info@clubafrodit.com',

  address: {
    street: 'Avcılar Mah.',
    district: 'Altınoluk, Edremit',
    city: 'Balıkesir',
    zip: '10870',
    country: 'Türkiye',
  },

  mapEmbed:
    'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12302.245805656059!2d26.800473!3d39.569495!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b0be02dfd54733%3A0x1f7f14fd781005d0!2sClub%20Afrodit%20Tatil%20K%C3%B6y%C3%BC!5e0!3m2!1str!2str!4v1745234214162!5m2!1str!2str',
  mapLink: 'https://www.google.com/maps/search/?api=1&query=Club+Afrodit+Tatil+K%C3%B6y%C3%BC+Alt%C4%B1noluk',

  // icon: Icon.tsx içindeki yol adı. Erişilebilir adlar i18n'de (social.<key>).
  social: [
    { key: 'instagram', icon: 'instagram', label: '@clubafrodit', href: 'https://www.instagram.com/clubafrodit' },
    { key: 'instagramMono', icon: 'instagram', label: '@monoafrodit', href: 'https://www.instagram.com/monoafrodit/' },
    { key: 'instagramTenis', icon: 'instagram', label: '@afroditteniskulubu', href: 'https://www.instagram.com/afroditteniskulubu/' },
    { key: 'instagramKoy', icon: 'instagram', label: '@afroditsaglikliyasamkoyu', href: 'https://www.instagram.com/afroditsaglikliyasamkoyu/' },
    // Aeneas — mevcut sitede bağlantısı var, ilişkisi teyit edilmedi.
    // Bu yüzden şimdilik yalnızca sosyal medya listesinde duruyor; ayrı
    // sayfa veya tanıtım bölümü açılmadı. Soru ISLETME-SORULARI.md 2.3'te.
    { key: 'aeneas', icon: 'instagram', label: '@aeneashotel', href: 'https://www.instagram.com/aeneashotel/' },
    { key: 'facebook', icon: 'facebook', label: 'facebook.com/clubafrodit', href: 'https://www.facebook.com/clubafrodit' },
  ],

  /**
   * Tanıtım videoları. Gömülü oynatıcı kullanılmıyor: kapak görseli yerel,
   * tıklanınca YouTube'da açılıyor. Böylece sayfa açılışında YouTube'a
   * tek istek gitmiyor. Başlıklar i18n'de (home.videos.<key>).
   * TODO: ilk videonun işletmedeki resmî başlığı teyit edilmedi.
   */
  videos: [
    { key: 'tanitim', cover: '/img/video.jpg', href: 'https://www.youtube.com/watch?v=gUP1Dh9Wafs' },
    { key: 'sehir', cover: '/img/club-afrodit.jpg', href: 'https://youtu.be/MNAmSmcoNN0' },
  ],

  // Mesafeler — km. Etiketleri i18n'den gelir (distances.<key>)
  distances: [
    { key: 'altinoluk', value: '3–5 km' },
    { key: 'akcay', value: '8 km' },
    { key: 'edremit', value: '18 km' },
    { key: 'airport', value: '25–30 km' },
    { key: 'sahindere', value: '3 km' },
    { key: 'tahtakuslar', value: '6 km' },
  ],

  // TODO: işletmeden teyit edilmedi — kuruluş yılı, pansiyon konsepti,
  // giriş/çıkış saatleri, fiyatlar, Aeneas Hotel ilişkisi.
} as const

export type Facility = typeof facility
