/**
 * Misafir yorumları — clubafrodit.com üzerinde yayınlanan yorumlar.
 * Metinler misafirlerin kendi ifadesi olduğu için çevrilmez, olduğu gibi durur.
 */

export type Review = {
  id: string
  author: string
  /** yorumun kendi dili */
  lang: 'tr'
  text: string
}

export const reviews: Review[] = [
  {
    id: 'nt',
    author: 'N.T',
    lang: 'tr',
    text:
      '26-30 ağustos arası 4 gece konakladık. Odalara ilk girdiğimizde mis gibi temizlenmiş ve mis gibi kokuyordu, bu bizi gerçekten mest etti; 4 gün içerisinde 2 kez temizlik oldu, havlular değişti. Plajı temiz ve güzeldir, bir kısma kadar taşlı ama kum torbaları konmuş, rahat bir şekilde kumluk kısma ulaşabiliyorsunuz. Havuz ve bar kısmı da çok güzeldi, temizdi; çalışanlar güler yüzlü ve çalışkandı. Sabah kahvaltısı ve akşam yemeklerine gerçekten bayıldık, az çeşit ama çok lezzetliydi. Genel olarak ailem ve ben otelden çok memnun kaldık, kesinlikle bir daha tercih edeceğim bir yer.',
  },
  {
    id: 'du',
    author: 'D.U',
    lang: 'tr',
    text:
      'Tüm çalışanlar güler yüzlü ve yardımsever, her ne isterseniz yardımcı oluyorlar. Sabah akşam açık büfe yemekleri çoğunlukla kendi bahçelerindeki ürünlerden yapılıyor; ev yemeğinden farkı yok, lüks restoranlara taş çıkarır. Denize yürüme 1-2 dakika, çok yakın. Otelin keyifli bir plaj cafe\u2019si, şezlongları ve şemsiyeleri var. Cafe\u2019de fiyatlar uygun; şezlongumuza çay, bira, hamburger söyledik. Havuzu da hoştu, özellikle su kaydırağı. Havuz başında disko oldu, çok eğlendik.',
  },
  {
    id: 'ood',
    author: 'Ö.Ö.D',
    lang: 'tr',
    text:
      'Bu fiyata bence harika hizmet. Geceliği 15 bin+ olan otellerde dahi böyle temiz deniz, bu kadar çeşit yemek ve konum yok. Ailecek gittik; 2 yaşındaki kızımla ne odada, ne temizlik, ne de yemek konusunda sorun yaşadık, her şey çok iyiydi. Deniz tertemiz ve güzeldi, havuz da gayet iyiydi. Yemekler gerçekten çok iyiydi; tatlılar, mezeler, salatalar çok lezzetliydi, ana yemek çeşitleri de çok güzeldi. Mutlaka yine geleceğiz.',
  },
]
