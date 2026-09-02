# Club Afrodit — Web Sitesi Projesi

Bu dosya projenin kalıcı kural setidir. Her oturumda önce bunu oku.

---

## 1. Proje nedir

Club Afrodit, Altınoluk / Edremit (Balıkesir) sahilinde, Kazdağları eteğinde,
denize sıfır bir tatil köyü. Mevcut sitesi (clubafrodit.com) statik HTML,
işletme kendisi güncelleyemiyor.

Bu proje **sıfırdan yeni bir site**. Mevcut siteye dokunulmuyor.

### Bu turun hedefi
Localhost'ta çalışan, tüm sayfa iskeleti duran, 3 dilli bir site.
`npm run dev` dediğimde açılmalı ve gezilebilmeli.

---

## 2. Stack

- React + Vite + TypeScript
- react-router-dom (sayfa yönlendirme)
- Sade CSS (CSS değişkenleriyle). CSS framework kurma.
- İçerik şimdilik TypeScript dosyalarında. **Supabase henüz YOK.**
- Deploy hedefi Cloudflare Pages (şimdilik deploy etme, sadece lokal)

### Kurma:
- Supabase, veritabanı, backend, auth
- Rezervasyon motoru
- Ödeme
- Analytics, çerez bandı
- Test framework'ü

Bunlar sonraki aşamalarda gelecek. Şimdi sadece iskelet ve içerik.

---

## 3. Çalışma kuralları

- Türkçe konuş.
- Değişiklik yapmadan önce ne yapacağını kısaca söyle.
- Mevcut dosyaları silme, gerekli yeri düzenle.
- Her API/veri çağrısında try-catch ve hata durumu göster.
- Emin olmadığın bilgiyi uydurma. Bu dosyada yoksa `TODO:` yaz ve sor.
- Büyük işi küçük adımlara böl, her adımı açıkla.
- İşi bitirince kendin doğrula (build al, dev server'ı çalıştır, konsol
  hatası var mı bak). Sonucu özet geç.
- Git terimlerini kullanırken parantez içinde sade karşılığını yaz.

---

## 4. Klasör yapısı

```
src/
  main.tsx
  App.tsx
  routes.tsx
  i18n/
    index.ts          dil algılama, dil değiştirme
    tr.ts             Türkçe metinler (gerçek içerik)
    en.ts             İngilizce (şimdilik TR kopyası, TODO işaretli)
    de.ts             Almanca (şimdilik TR kopyası, TODO işaretli)
  content/
    facility.ts       tesis bilgisi, iletişim, mesafeler
    rooms.ts          oda envanteri
    amenities.ts      olanaklar
    reviews.ts        misafir yorumları
    news.ts           haberler
  components/
    Header.tsx        logo, menü, dil değiştirici
    Footer.tsx        iletişim, sosyal medya, harita linki
    LanguageSwitcher.tsx
    Placeholder.tsx   fotoğraf yer tutucusu (aşağıya bak)
    Section.tsx
  pages/
    Home.tsx
    Rooms.tsx
    Amenities.tsx
    Tennis.tsx
    Nursing.tsx       huzurevi / sağlıklı yaşam
    News.tsx
    Contact.tsx
    NotFound.tsx
  styles/
    tokens.css        RENKLER SADECE BURADA
    global.css
```

---

## 5. Diller

- URL yapısı: `/tr/...`, `/en/...`, `/de/...`
- Kök `/` adresi `/tr` adresine yönlensin.
- Metinler `i18n/` altındaki dosyalardan gelsin, **JSX içine düz metin yazma**.
- EN ve DE dosyalarını şimdilik TR ile aynı doldur, her satırın başına
  `// TODO: çeviri` yaz. Uydurma çeviri yapma.
- Dil değiştirici header'da dursun, sayfada kalarak dil değiştirsin.

---

## 6. Renkler ve fotoğraflar — ÖNEMLİ

**Renk paleti henüz kararlaşmadı.** Fotoğraflar toplandıktan sonra seçilecek.

- Tüm renkler `src/styles/tokens.css` içinde CSS değişkeni olarak dursun.
- Bileşenlerin içine sabit hex kodu yazma. Her yerde `var(--...)` kullan.
- Şimdilik geçici, nötr bir palet kur (kırık beyaz zemin, koyu gri metin,
  tek bir sakin vurgu rengi). Bu geçici, sonra tek dosyadan değişecek.
- Daha önce denenen "koyu zeytin yeşili + kum + koyu lacivert" onaylanmadı,
  onu tekrar kurma.

**Fotoğraf yok.** Stok fotoğraf indirme, dış URL'den görsel çekme.
`Placeholder.tsx` diye bir bileşen yap: verilen en-boy oranında gri bir kutu
çizsin, ortasında ne fotoğrafı geleceğini yazsın
(örn. "havuz — yatay", "standart oda — dikey"). Böylece fotoğraflar gelince
sadece bu bileşenin yerine `<img>` koyacağız.

### Tasarım yönü
- Yatay mimari, denize sıfır konum, zeytinlik, Kazdağları. Tasarım bu
  yerin karakterini taşısın; genel bir "otel şablonu" olmasın.
- Bir veya iki yazı tipi. Her başlığın üstüne büyük harfli küçük etiket
  koyma. İçeriği aynı boyda kartlara doğrama.
- Hareket/animasyon çok az. Her bölüme kayarak giren efektler koyma.
- Mobil öncelikli. Klavye ile gezilebilir, odak halkası görünür olsun.

---

## 7. Sayfalar ve içerik

### Anasayfa
Tam genişlikte açılış görseli (placeholder), tesisin tek cümlelik tanımı,
kısa bölümler: odalar, plaj/havuz, tenis, mutfak, huzurevi'ne geçiş,
misafir yorumları, iletişim.

### Odalar
Aşağıdaki envanter. Her oda tipi kendi kartında/bölümünde.

**Standart Oda** — 25 adet · 25 m² · 2 kişi
Balkonlu ve balkonsuz seçenek. TV, telefon, buzdolabı, saç kurutma makinesi, klima.

**Suit Oda (aile odası)** — 65 m² · 4 kişi
1+1 ve 2+1. Yetişkin yatak odası, çocuk yatak odası, banyo, geniş balkon.
Doğa ve deniz manzarası. TV, telefon, mini bar, saç kurutma makinesi.

**Grand Suit** — 16 adet · 90 m² · 6 kişi
2 oda + 1 salon + balkon.

**Apart Daire** — 25 adet · 90–140 m² · 6–8 kişi
Bağımsız giriş, bağımsız geniş balkon, iki katlı yapılarda. Tam donanımlı
mutfak, çamaşır makinesi, bulaşık makinesi, buzdolabı, tüm odalarda klima.
Bahçeye ve denize bakan pencereler. Havuz, plaj, tenis kortları, restoran ve
Mono Afrodit yürüme mesafesinde.

**Huzurevi odaları** — 20 adet · 35 m² · 1, 2 veya 3 kişilik
Banyo, tuvalet, klima, televizyon, mini buzdolabı, elbise ve ayakkabı dolabı,
ihtiyaca göre karyola veya hasta yatağı.

> `rooms.ts` dosyasının başına şu notu koy:
> `// TODO: oda sayıları ve metrekareler işletmeden teyit edilmedi.`

### Olanaklar
- **Plaj:** Mavi bayraklı özel plaj, şezlong ve şemsiye, plaj cafe.
- **Havuzlar:** Yarı olimpik açık havuz, kapalı havuz, çocuk havuzu,
  su kaydırağı, bayanlara özel havuz.
- **Sağlık kulübü:** Fitness (ücretsiz), masaj, sauna, Türk hamamı,
  jakuzi (ücretli).
- **Mutfak:** Açık büfe. Kendi bahçesinde organik sebze meyve, kendi zeytin
  ve zeytinyağı üretimi, taş fırın, Kazdağları'nın endemik otları.
  Ege/Akdeniz mutfağı. Manzaralı terasta akşam yemeği, canlı müzik.
- **Mono Afrodit:** 2022'de başlayan house müzik parti serisi, havuz başı
  disko, kendi YouTube kanalı var.
- **Diğer:** Ücretsiz otopark, evcil hayvan kabul, resepsiyonda kablosuz
  internet.

> Pansiyon konsepti ve giriş/çıkış saatleri **belirsiz**. Siteye yazma,
> `// TODO:` olarak bırak.

### Tenis (Aftek)
Kendi başına ciddi bir bölüm olsun, tek satır geçme.
4 toprak kort. Bölgenin tek federe kulübü. Turnuvalar ve ligler.
Resmi turnuvalara katılanlara konaklamada %40'a varan indirim.

### Huzurevi / Sağlıklı Yaşam
Aynı sitenin ayrı bir dalı, ayrı site değil. Hedef kitle farklı olduğu için
kendi giriş sayfası ve kendi sakin tonu olsun; tatil bölümüyle aynı menüde
karışmasın (ana menüde tek bir giriş, oradan kendi alt yapısına).

### Haberler
3 haber var: "Afrodit ve Güzellik Yarışmasının Hikayesi" (Paris ve İda Dağı
mitolojisi), "Club Afrodit'te Tatil Sezonu Başladı", "Mono Afrodit Kulübü
Yazı Renklendiriyor". Başlıkları koy, gövde metnini `TODO` bırak.

### Misafir yorumları
- N.T — temizlik, plaj, havuz ve bar, kahvaltı/akşam yemeği
- D.U — personel, organik yemekler, plaj, su kaydırağı, havuz başı disko
- Ö.Ö.D — fiyat/performans, çocuklu aile deneyimi, yemek çeşitliliği

### İletişim
- Rezervasyon / idari ofis: +90 266 378 05 80
- Cep / WhatsApp: +90 536 452 86 88
- E-posta: info@clubafrodit.com
- Adres: Avcılar Mah., Altınoluk, Edremit / Balıkesir 10870
- Instagram: @clubafrodit, @monoafrodit, @afroditteniskulubu,
  @afroditsaglikliyasamkoyu
- Facebook: facebook.com/clubafrodit

**Mesafeler:** Altınoluk merkez 3–5 km, Akçay 8 km, Edremit 18 km,
Edremit/Körfez Havalimanı 25–30 km, Şahindere Kanyonu 3 km,
Tahtakuşlar Etnografya Galerisi 6 km.

---

## 8. Rezervasyon

Rezervasyon sistemi bu turda **yapılmayacak**. Ama altyapı buna hazır olsun:

- "Rezervasyon" butonu her sayfada dursun, şimdilik iletişim sayfasına
  veya WhatsApp'a gitsin.
- Oda verisi `rooms.ts` içinde `id`, `capacity`, `size` gibi alanlarla
  yapılandırılmış dursun ki sonra rezervasyona bağlanabilsin.

---

## 9. Bilinmeyenler — uydurma

Bunlar işletmeden teyit edilmedi. Siteye yazma, `TODO` bırak:

- Tesisin kuruluş yılı
- Pansiyon konsepti (yarım pansiyon mu, oda+kahvaltı mı)
- Giriş / çıkış saatleri
- Fiyatlar
- Oda sayıları ve metrekarelerin kesinliği
- Aeneas Hotel'in bu tesisle ilişkisi
- afroditsaglikliyasamkoyu.com sitesinin akıbeti

Marka adı konusunda kaynaklar çelişiyor ("Tatil Köyü" / "Sağlıklı Yaşam
Köyü"). Ana sitede **tatil köyü** kimliği öne çıkacak.
