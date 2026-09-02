# Club Afrodit — web sitesi

Altınoluk / Edremit'te, Kazdağları eteğinde, denize sıfır bir tatil köyü olan
**Club Afrodit**'in yeni web sitesi. Üç dilli (Türkçe, İngilizce, Almanca),
statik olarak üretilen bir site.

Mevcut siteye (clubafrodit.com) dokunulmuyor; bu ayrı ve yeni bir site.
İçerik ve fotoğraflar oradan alındı.

---

## Hızlı başlangıç

```bash
npm ci          # bağımlılıkları kur (package-lock.json'a birebir uyar)
npm run dev     # geliştirme sunucusu — http://localhost:5173
```

Node sürümü `.nvmrc` dosyasında yazılı (**24.18.0**). `nvm` kullanıyorsan
klasörde `nvm use` demen yeterli. `package.json` içindeki `engines` alanı da
aynı sürümü şart koşuyor.

> **Not:** `sharp` paketi işletim sistemine göre ikili dosya indirir. Bu proje
> **Windows x64**'te, sharp **0.35.4** / libvips **8.18.6** ile derlendi.
> Başka bir işletim sisteminde `npm ci` kendi ikilisini indirir; ayrıca bir
> şey yapman gerekmez.

---

## Komutlar

| Komut | Ne yapar |
|---|---|
| `npm run dev` | Geliştirme sunucusu. Önce görselleri hazırlar, sonra Vite'ı açar. Dosyayı kaydettiğinde tarayıcı kendiliğinden yenilenir. |
| `npm run build` | Yayına hazır çıktıyı `dist/` klasörüne üretir. Görseller → TypeScript denetimi → Vite derlemesi → sunucu derlemesi → prerender. Sonunda 21 HTML sayfası, `sitemap.xml` ve `robots.txt` oluşur. |
| `npm run build:images` | Yalnız görsel adımı. Her fotoğrafın WebP karşılığını ve küçük boylarını üretir, ölçülerini `src/generated/images.ts` dosyasına yazar. Yeni fotoğraf eklediğinde bunu çalıştır. |
| `npm run preview` | `dist/` klasörünü yerel sunucuda açar — yayındaki hâlini görmek için. `npm run build`'den sonra çalıştır. |
| `npm run lint` | Kod denetimi (oxlint). |
| `npm run check` | **Tek komutluk sağlık kontrolü.** Derler ve altı ölçütü sınar; hepsi geçerse `TAMAM` yazar. Aylar sonra "hâlâ çalışıyor mu" diye bakmak için bu komutu çalıştır. |

---

## "Şunu değiştirmek istiyorum, hangi dosya?"

Aylar sonra bu bölüm yeter.

### Telefon numarası, e-posta, adres, sosyal medya, mesafeler
**`src/content/facility.ts`**
Tek dosya. Numarayı değiştirirken hem görünen metni hem `tel:` bağlantısını
güncelle (`phoneOffice` ve `phoneOfficeHref` yan yana duruyor).

### Bir oda metnini değiştirmek
İki dosya var, hangisini açacağın neyi değiştirdiğine bağlı:

- **Metin** (oda adı, açıklama, özet) → **`src/i18n/tr.ts`**, `rooms` bölümü.
  Üç dil ayrı dosyada: `tr.ts`, `en.ts`, `de.ts`. Birinde değiştirirsen
  diğer ikisini de değiştir — yoksa `npm run build` hata verir (bu kasıtlı,
  bir dilin unutulmasını engelliyor).
- **Sayı ve yapı** (kapasite, metrekare, adet, fotoğraflar, özellik listesi)
  → **`src/content/rooms.ts`**.

Örnek: "Standart Oda 25 m²" yazan yeri değiştirmek için `rooms.ts` içindeki
`size` alanını, açıklama cümlesini değiştirmek için `tr.ts` içindeki
`rooms.standart.body` alanını aç.

### Sayfa metinleri (anasayfa, olanaklar, tenis, huzurevi, haberler, iletişim)
**`src/i18n/tr.ts`** — sitedeki bütün görünen metinler burada, sayfa sayfa
bölümlenmiş. `en.ts` ve `de.ts` aynı yapıda.

**JSX içine düz metin yazma.** Her metin i18n dosyalarından gelir.

### Fotoğrafların alt metinleri (ekran okuyucu için)
**`src/i18n/photoAlts.ts`** — galeri fotoğraflarının ne gösterdiğini anlatan
metinler, üç dilde.

### Renkler
**`src/styles/tokens.css`** — sitedeki bütün renkler burada, CSS değişkeni
olarak. Bileşenlerin içinde sabit renk kodu yok.
Huzurevi bölümünün kendi sakin tonu ayrı: `src/styles/motion.css` içindeki
`.tone-calm` kuralı.

Hazır iki palet önerisi `design/` klasöründe duruyor
(`palet-a-toprak.css`, `palet-b-ege.css`). Birini seçmek için dosyanın
içeriğini `tokens.css` üzerine kopyalamak yeterli.

### Fotoğraf eklemek/değiştirmek
1. Dosyayı `public/img/` altına koy.
2. Kodda nereye gireceğini söyle: oda fotoğrafı ise `src/content/rooms.ts`,
   olanak fotoğrafı ise `src/content/amenities.ts`, haber ise
   `src/content/news.ts`, sayfa başlığı bandı ise ilgili `src/pages/*.tsx`.
3. `npm run build:images` çalıştır — WebP ve küçük boylar üretilir.
4. Alt metnini `src/i18n/photoAlts.ts` içine üç dilde yaz.

> Görseller en az **1400 piksel** genişliğinde olmalı; daha küçükleri sayfada
> gerilip bulanıklaşıyor. Kod bunları yapay olarak büyütmez.

### Yayın adresi (alan adı)
**`src/config.ts`** — tek satır. `canonical`, `hreflang`, Open Graph,
`sitemap.xml` ve `robots.txt` hepsi buradan okuyor.

---

## Klasör yapısı

```
public/
  img/                  fotoğraflar (orijinaller + üretilen WebP/küçük boylar)
  _redirects            Cloudflare Pages yönlendirmeleri (kök adres -> /tr)

src/
  main.tsx              giriş noktası
  App.tsx               router sarmalayıcı
  routes.tsx            sayfa yolları (SLUGS burada)
  config.ts             SITE_URL — yayın adresi
  seo.ts                sayfa başlıkları, hreflang, Open Graph, JSON-LD, sitemap
  entry-server.tsx      prerender için sunucu tarafı giriş

  i18n/
    index.ts            dil algılama, dil değiştirme, useI18n
    tr.ts               Türkçe metinler (kaynak dil)
    en.ts  de.ts        İngilizce ve Almanca
    photoAlts.ts        fotoğraf alt metinleri, üç dilde

  content/              dilden bağımsız veriler
    facility.ts         iletişim, adres, sosyal medya, mesafeler
    rooms.ts            oda envanteri
    amenities.ts        olanaklar
    reviews.ts          misafir yorumları
    news.ts             haberler

  components/           Header, Footer, Hero, Photo, Gallery, Lightbox, ...
  pages/                Home, Rooms, Amenities, Tennis, Nursing, News, Contact
  styles/
    tokens.css          RENKLER SADECE BURADA
    global.css          temel stiller
    layout.css          bileşen ve bölüm stilleri
    motion.css          hareket, kartlar, galeri, .tone-calm
  lib/image.ts          görsel manifestinden srcset üretir
  hooks/                useRevealOnScroll
  generated/            OTOMATİK ÜRETİLİR — elle düzenleme

scripts/
  images.mjs            WebP + küçük boy üretimi, ölçü manifesti
  prerender.mjs         21 sayfa + sitemap.xml + robots.txt
  check.mjs             npm run check

design/                 renk paleti önerileri (uygulanmadı, seçim bekliyor)
LAUNCH.md               yayın öncesi kontrol listesi
ISLETME-SORULARI.md     işletmeye iletilecek bilgi listesi
PROGRESS.md             proje günlüğü — ne yapıldı, neden
CLAUDE.md               proje kuralları
```

---

## Prerender nasıl çalışıyor

Site tarayıcıda React ile çalışıyor, ama **arama motoru boş sayfa görmesin**
diye her sayfanın hazır HTML'i derleme sırasında üretiliyor.

`npm run build` şunları sırayla yapar:

1. **`scripts/images.mjs`** — her fotoğrafın WebP karşılığını ve 640/1024/1920
   piksel sürümlerini üretir (kaynaktan büyütme yapmaz), ölçüleri
   `src/generated/images.ts` dosyasına yazar.
2. **`tsc -b`** — TypeScript denetimi.
3. **`vite build`** — tarayıcı paketi + `dist/index.html` şablonu.
4. **`vite build --ssr`** — aynı uygulamayı Node'da çalışacak şekilde derler
   (`dist-ssr/entry-server.js`).
5. **`scripts/prerender.mjs`** — `seo.ts` içindeki 21 sayfanın her biri için
   uygulamayı Node'da çalıştırıp HTML'e çevirir, şablonun `<head>` bölümüne
   o sayfanın başlığını, açıklamasını, canonical adresini, üç dil
   `hreflang` bağlantısını, Open Graph etiketlerini (anasayfalarda ayrıca
   JSON-LD'yi) yazar ve `dist/tr/odalar/index.html` gibi dosyalar üretir.
   Sonra `sitemap.xml` ve `robots.txt` yazar, şablon olarak kullandığı
   `dist/index.html`'i siler.

Sonuçta `dist/` içinde **21 hazır HTML sayfası** olur (7 sayfa × 3 dil).

**Önemli kural:** JavaScript çalışmasa bile bütün metinler görünür.
Kaydırma animasyonlarını gizleyen CSS kuralı yalnızca `html.js-hazir`
sınıfı varken geçerli; o sınıfı `index.html` içindeki küçük bir betik ekliyor.
`npm run check` bunu her seferinde sınıyor.

---

## Sitede olmayanlar

Bunlar bilerek yapılmadı; ileride ayrı iş olarak gelecek:

- Rezervasyon motoru, form, ödeme — **site hiçbir veri toplamıyor**
- Veritabanı, yönetim paneli, kullanıcı girişi
- Analytics, çerez bandı
- Test altyapısı

Rezervasyon butonu her sayfada duruyor ve şimdilik WhatsApp'a gidiyor.
Oda verisi (`id`, `capacity`, `size`) ileride rezervasyona bağlanabilecek
yapıda duruyor.

---

## Yayına almadan önce

**`LAUNCH.md`** dosyasını aç ve baştan sona takip et. İşletmeden alınması
gereken bilgiler ayrıca **`ISLETME-SORULARI.md`** içinde, olduğu gibi
iletilebilecek şekilde yazılı.
