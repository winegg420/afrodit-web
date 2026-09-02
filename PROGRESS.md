# Club Afrodit — Proje Günlüğü

## 2026-09-02 — Oturum 1

### Adım 1: Kurulum
- Vite + React 19 + TypeScript projesi kuruldu (`create-vite`, react-ts şablonu).
  Klasör boş olmadığı için (CLAUDE.md vardı) önce `_scaffold` alt klasörüne
  kuruldu, sonra köke taşındı. CLAUDE.md'ye dokunulmadı.
- `react-router-dom` eklendi (v7).
- Vite şablonunun demo dosyaları temizlendi: `App.css`, `index.css`,
  `src/assets/` (react.svg, vite.svg, hero.png).
- `index.html`: dil `tr`, başlık "Club Afrodit — Altınoluk".
- `package.json` adı `afrodit-web` yapıldı.
- Klasör iskeleti açıldı: `src/styles`, `i18n`, `content`, `components`, `pages`.

### Adım 2: Renkler ve global stiller
- `src/styles/tokens.css`: TÜM renkler burada CSS değişkeni olarak.
  Geçici nötr palet — kırık beyaz zemin (`#fbfaf7`), koyu gri metin (`#26262a`),
  tek sakin vurgu (adaçayı grisi `#7a8a7f`). Ayrıca tipografi, boşluk,
  ölçü ve geçiş değişkenleri.
- `src/styles/global.css`: sıfırlama, tipografi, `.container`, `.btn`,
  `.skip-link`, görünür odak halkası (`:focus-visible`),
  `prefers-reduced-motion` desteği.

### Kararlar ve nedenleri
- Palet **geçici**; fotoğraflar gelince yalnız `tokens.css` değişecek.
  Onaylanmayan "koyu zeytin + kum + lacivert" paleti kullanılmadı.
- CSS framework yok (CLAUDE.md kuralı). Sade CSS + değişken.
- Animasyon minimumda; `prefers-reduced-motion` baştan destekleniyor.

### Doğrulama
- `npm run build` → hatasız (dist 190 kB js / 3.8 kB css).
- `npm run dev` → http://localhost:5173 HTTP 200.

### Sırada
Adım 3: i18n (`/tr`, `/en`, `/de`), dil değiştirici, router.

## 2026-09-02 — Oturum 1 (devam)

### Yön değişikliği (kullanıcı talebi)
Kullanıcı "sitede hiçbir şey yok, siteyi gerçeğinden kopyala" dedi.
Bunun üzerine clubafrodit.com'dan **gerçek içerik ve gerçek fotoğraflar**
çekildi. CLAUDE.md'deki "fotoğraf yok, sadece Placeholder" kuralı bu
talimatla geçersiz kaldı — Placeholder bileşeni yine de duruyor ve
fotoğrafı olmayan yerlerde (ör. sağlık kulübü) kullanılıyor.

### Ne çekildi
- 13 sayfa (index, hakkımızda, 4 oda sayfası, huzurevi, haberler,
  3 haber detayı, iletişim) metinleriyle birlikte.
- 74 görsel, `public/img/` altına indirildi (~18 MB). Hepsi doğrulandı,
  bozuk/404 dosya yok.

### Adım 3: Dil altyapısı
- `src/i18n/index.ts`: `Lang` tipi, dil algılama (localStorage → tarayıcı
  dili → TR), `pathWithLang` (sayfada kalarak dil değiştirme),
  `I18nContext` + `useI18n` + `useLangPath`. localStorage erişimi
  try-catch ile korunuyor (gizli sekmede patlamasın).
- `tr.ts` gerçek metinlerle dolduruldu (yaklaşık 200 anahtar).
- `en.ts` ve `de.ts` bir üretici betikle tr.ts'ten türetildi; her metin
  satırının sonunda `// TODO: çeviri` var. Uydurma çeviri YAPILMADI.
- Router: `/` → tarayıcı diline göre `/tr|/en|/de`. Geçersiz dil kodu
  `/tr`'ye düşer. Sayfa yolları üç dilde de aynı (odalar, olanaklar,
  tenis, saglikli-yasam, haberler, iletisim).

### Adım 4: İçerik dosyaları
`facility.ts` (telefon, adres, sosyal medya, harita, mesafeler),
`rooms.ts` (4 oda tipi + huzurevi odası; id/capacity/size/gallery —
rezervasyona bağlanmaya hazır), `amenities.ts` (6 öne çıkan + 6 grup),
`reviews.ts` (3 misafir yorumu, gerçek metin), `news.ts` (3 haber).
Metinler i18n'de, yapı content'te — böylece JSX içinde düz metin yok.

### Adım 5: Bileşenler
`Layout` (dil sağlayıcı, skip-link, scroll-to-top), `Header` (yapışkan,
mobil menü), `Footer`, `LanguageSwitcher`, `Section`, `Placeholder`,
`Photo` (görsel yüklenmezse Placeholder'a düşer), `Gallery`, `PageHead`,
`RouteGuards`.

### Adım 6: Sayfalar
Home, Rooms, Amenities, Tennis, Nursing, News, Contact, NotFound.
Huzurevi sayfası `.tone-calm` sınıfıyla kendi (daha soğuk, mavimsi)
vurgu rengini kullanıyor — tatil bölümünden ayrışsın diye.

### Kararlar ve nedenleri
- Oda detay sayfası yapılmadı; odalar tek sayfada kendi bölümlerinde,
  anasayfa kartları `#standart-oda` gibi çapalara gidiyor. Sebep:
  CLAUDE.md'de oda detay rotası istenmemişti.
- Haber gövdeleri `TODO` bırakılmadı, gerçek siteden alındı.
- `Photo` bileşeni `onError` ile Placeholder'a düşüyor; eksik görsel
  sayfayı bozmasın diye.
- Renk paleti hâlâ geçici; huzurevi tonu dahil tüm renkler
  `tokens.css` + `.tone-calm` içinde, bileşenlerde hex yok.

### Doğrulama
- `npm run build` hatasız (JS 305 kB / CSS 12.8 kB).
- `npx oxlint src` uyarısız.
- `npm run dev` → localhost:5173. Tarayıcıda TR/EN/DE ve tüm sayfalar
  açıldı, konsolda hata yok, harita ve galeriler çalışıyor.

### Hâlâ TODO
- EN ve DE çevirileri (dosyalar hazır, metin bekliyor).
- Pansiyon konsepti, giriş/çıkış saatleri, fiyatlar, kuruluş yılı.
- Oda sayısı ve metrekare teyidi.
- Sağlık kulübü fotoğrafı yok (Placeholder duruyor).
- Kalıcı renk paleti seçimi.

## 2026-09-02 — İngilizce ve Almanca çeviriler

Kullanıcı EN ve DE dillerinin gerçekten çevrilmesini istedi.
`en.ts` ve `de.ts` baştan sona çevrildi, tüm `// TODO: çeviri`
işaretleri kalktı (grep ile doğrulandı: 0 kaldı).

Çeviri kararları:
- Kazdağları → "Mount Ida" (EN) / "Ida-Gebirge" (DE). Mitolojik hikâyede
  ise "Mount Ida" / "Ida-Berg" — Afrodit efsanesiyle bağı korumak için.
- Marka ve yer adları çevrilmedi: Club Afrodit, Mono Afrodit, Aftek,
  Altınoluk, Akçay, Edremit, Şahindere, Tahtakuşlar.
- Huzurevi → "Care Home / Assisted Living" (EN),
  "Senioren- und Pflegeresidenz" (DE). Menüde EN "Assisted Living",
  DE "Gesundes Leben" — hedef kitleye uygun, tıbbi olmayan ton.
- Misafir yorumları çevrilmedi; misafirlerin kendi ifadesi olduğu için
  Türkçe orijinal kaldı. `reviews.lead` metnine bunu belirten bir cümle
  eklendi (EN ve DE).
- `TODO` notları (pansiyon konsepti, giriş/çıkış saati, oda sayıları)
  üç dilde de duruyor — bunlar hâlâ işletmeden teyit bekliyor.

Sayfa yolları (`/odalar`, `/olanaklar`, `/iletisim` …) üç dilde de aynı
bırakıldı. Dil başına ayrı slug ileride istenirse `SLUGS` yapısını
dile göre çoğaltmak yeterli.

### Doğrulama
- `npm run build` hatasız. TypeScript `Dict` tipi sayesinde EN/DE'de
  eksik veya fazla anahtar olmadığı derleyici tarafından garanti edildi.
- `npx oxlint src` uyarısız.
- Tarayıcıda /en ve /de sayfaları kontrol edildi, metinler çevrilmiş
  geliyor, konsolda hata yok.

## 2026-09-02 — İş Paketi 2

### İŞ 1 — Prerender
`vite-react-ssg` KULLANILMADI: en güncel sürümü (0.9.2) react-router-dom
v6 istiyor, projede v7 var. `--legacy-peer-deps` ile zorlamak yönlendirme
katmanını kırma riski taşıyordu, router'ı v6'ya düşürmek de geri adım
olurdu. `@prerenderer/rollup-plugin` alternatifi ise Chromium indiriyor
(~200 MB) ve derlemeyi ağırlaştırıyor.

Bunun yerine Vite'ın kendi SSR derlemesiyle kendi prerender adımımızı
kurduk — yeni çalışma zamanı bağımlılığı yok, router'a dokunulmadı:
- `src/entry-server.tsx` — StaticRouter + renderToString
- `src/seo.ts` — 21 sayfanın yolu, başlığı ve açıklaması i18n'den üretilir
- `scripts/prerender.mjs` — dist/index.html'i şablon alıp 21 dosya yazar
- `npm run build` = tsc + vite build + SSR derleme + prerender
- `src/main.tsx` artık hazır HTML varsa hydrateRoot, yoksa createRoot

Her sayfa kendi `<title>`, `<meta description>` ve doğru `<html lang>`
değeriyle çıkıyor. Şablon olarak kullanılan `dist/index.html` siliniyor
(istenen çıktı tam 21 dosya); kök adres için `public/_redirects` eklendi.

Kabul testleri: 21 HTML ✓ · `grep -c "Grand Suit" dist/tr/odalar` = 1 ✓ ·
`npm run dev` çalışıyor ✓ · preview'da gezinme ve dil değiştirme bozulmadı,
konsolda hydration hatası yok ✓

### İŞ 2 — Eksik içerik
- Grand Suit: kapasite artık "6 kişi" değil "4 yetişkin + 2 çocuk"
  (`rooms.capacityKey` + `i18n rooms.capacityLabels`). Teras/çardaklı bahçe
  ve alt kat önerisi ayrı paragrafa alındı. Özelliklere İnternet, Kişisel
  kasa ve Oda servisi eklendi.
- Standart Oda: konumu anlatan cümle eklendi (kendi ifademizle).
- Sağlıklı Yaşam: içerik zaten ilk turda aktarılmıştı. Bu turda ekip
  sıralaması Doktor ile başlayacak şekilde düzeltildi ve ruhsat uyumu
  TODO notu eklendi (`nursing.complianceTodo`).
- ALINMADI: faks numarası, suit/apart sayfalarına yanlış kopyalanmış
  "25 adet otel odamız..." cümlesi, cevapsız SSS bölümü.

### İŞ 3 — Tenis sayfası
1.100 → 2.447 karakter. Bölümler: kortlar (toprak zeminin oyuna etkisi),
lig ve turnuvalar (federe kulüp = federasyon kaydı), konaklama avantajı
(%40 indirim + kort-oda mesafesi), kimler için, "aramanız gereken
konular" listesi, iletişim + Instagram.
Uydurulmayanlar listeye alındı ve TODO notu konuldu: aydınlatma, kort
ücreti/saatleri, antrenör, ekipman kiralama, takvim, üyelik, indirimin
tam koşulları.

### İŞ 4 — Mobil test
Chrome pencereyi 360 px'e küçültmediği için test, sayfayı 360/390/768 px
genişlikte bir iframe'e yükleyip iframe içinden ölçerek yapıldı (medya
sorguları iframe genişliğine göre çalışıyor).

Bulunan ve düzeltilen sorunlar:
1. Menü açıldığında düzen bozuluyordu — logo eziliyor, menü yana kayıyordu.
   `.site-header__bar`a `flex-wrap` ve açık menüye `flex-basis:100%`.
2. Dokunma hedefleri 44 px altındaydı: hamburger (42), logo (38),
   "devamını oku" bağlantıları (24), footer ve iletişim bağlantıları
   (20–36), dil değiştirici. Hepsine min-height/min-width 44 px verildi.
3. Masaüstü menüsünde kısa başlıklar (Tenis, News) 33–41 px genişlikteydi;
   `min-width: 44px` eklendi, 992 px'de taşma yaratmadığı doğrulandı.

Sorun bulunmayanlar: yatay kaydırma (5 genişlik × 9 sayfa, hepsinde
`scrollWidth <= innerWidth`), anasayfa başlığının taşması, kart ve olanak
kutularının dizilimi (360/390'da tek, 768'de iki sütun), fotoğraf taşması,
telefon/WhatsApp/e-posta bağlantıları (tel:, wa.me, mailto: doğru).
Galeri şeridi kendi kutusunda yatay kayıyor — bu kasıtlı, sayfayı taşırmıyor.

### Doğrulama
`npm run build` hatasız (21 sayfa prerender), `npx oxlint src` uyarısız,
`npm run dev` çalışıyor.

### TODO kalanlar
- Tenis: aydınlatma, ücret, antrenör, ekipman, takvim, üyelik, indirim koşulları
- Huzurevi: ruhsat kapsamı teyidi
- Pansiyon konsepti, giriş/çıkış saatleri, fiyatlar, kuruluş yılı
- Oda sayısı ve metrekare teyidi
- Sağlık kulübü fotoğrafı yok (Placeholder duruyor)
- Kalıcı renk paleti
- SSS bölümü (gerçek cevaplarla sıfırdan yazılacak)

## 2026-09-02 — İş Paketi 3: Görsel zenginleştirme

### Üç kuralın nasıl uygulandığı
1. **JS'siz görünürlük.** Gizleyen tek CSS kuralı `.js .reveal`; `js` sınıfını
   yalnızca `main.tsx` ekliyor. Derlenmiş CSS'te `opacity:0` içeren başka
   seçici yok (grep ile doğrulandı). Ayrıca iki güvenlik ağı kondu:
   gözlemci 2,5 sn içinde hiç tetiklenmezse hook her şeyi açıyor; hero giriş
   sınıfı 1 sn sonra kaldırılıyor (animasyon hiç çalışmazsa metin gizli
   kalmasın diye). Işıklı kutudan giriş animasyonu tamamen kaldırıldı —
   `animation-fill-mode: both` kısıtlanmış sekmede modalı görünmez bırakıyordu.
2. **prefers-reduced-motion.** `motion.css` sonunda tek blok; reveal, hero
   yakınlaşması, kademeli giriş, aşağı oku ve kart geçişlerini kapatıyor.
   `global.css`'teki genel blok da duruyor. Hook da matchMedia'ya bakıp
   hareket kapalıysa her şeyi doğrudan açıyor.
3. **Cesaret tek yerde.** Açılış çarpıcı; diğer bölümlerde yalnızca 16 px'lik
   sade belirme var.

### İŞ 1 — Anasayfa açılışı
Yeni `Hero.tsx`. Arka plan 20 sn'de %100→%108 (alternate, sonsuz).
Kademeli giriş: etiket 0 ms, başlık 120, açıklama 240, butonlar 360 —
her biri 460 ms, toplam 820 ms içinde biter; modül düzeyinde bayrakla
yalnızca ilk açılışta oynar. Okunabilirlik için düz örtü yerine iki katmanlı
geçiş (alttan yukarı + soldan sağa). Aşağı oku yavaşça inip çıkıyor,
tıklanınca `#giris` bölümüne yumuşak kaydırıyor (hareket kapalıysa anında).
Slayt/video yok.

### İŞ 2 — Kaydırınca belirme
`useRevealOnScroll` + `Reveal` bileşeni. IntersectionObserver, kaydırma
olayı dinlenmiyor. 16 px aşağıdan, 500 ms, bir kere (`unobserve`).
Yalnızca bölüm başlıkları ve büyük görsellerde; menü, alt bilgi, paragraf
ve liste maddelerinde yok. Kart gruplarında 60 ms aralıkla sırayla.

### İŞ 3 — Fotoğraf galerisi
`Lightbox.tsx` (118 satır, hazır paket yok). Ok tuşları, ESC, boşluğa
tıklama, mobilde kaydırma (40 px eşik), odak tuzağı, kapanınca odağın
tıklanan fotoğrafa dönmesi, arka planda kaydırma kilidi. Şeritteki küçük
görseller `loading="lazy"`; tam ekranda görsel gecikmesiz yükleniyor.
`Gallery` ve `PhotoZoom` bileşenleri onu kullanıyor.
NOT: elimizde tek çözünürlük var. "Küçük hâl" CSS ile küçültülmüş aynı
dosya; ayrı yüksek çözünürlüklü sürüm üretilmedi.

### İŞ 4 — Kartlar ve bölümler
`RoomCard`: fotoğraf üstte, altında ad, kapasite/metrekare/adet küçük
etiketler (chip) halinde. Üzerine gelince fotoğraf %4 yakınlaşıyor, kart
2 px kalkıyor; gölge yok.
Oda özellikleri artık ikonlu liste (`Icon.tsx`, 20 ince çizgi ikonu,
tanımsız anahtar onay işaretine düşüyor).
Anasayfadaki olanaklar bölümü ikon listesinden çıkarıldı; plaj, havuzlar
ve mutfak için dönüşümlü sağ-sol fotoğraflı bloklara çevrildi.
Hiyerarşi: odalar bölümü `section--major` ile en büyük başlık ve en geniş
boşluğa sahip.

### Yol boyunca çıkan ve düzeltilen sorunlar
- `.btn--ghost` rengi `.btn--on-dark`ı eziyordu (global.css sırası); açılıştaki
  telefon butonunun yazısı görünmüyordu. Özgüllük artırılarak düzeltildi.
- Masaüstü menüsü iki satıra düşüyordu. Menü eşiği 992 px'ten **1200 px**e
  çıkarıldı; 7 madde + 3 dil + rezervasyon butonu ancak orada rahat sığıyor.
  1200 px altında hamburger kullanılıyor.

### Doğrulama
1. `npm run build` hatasız, `npx oxlint src` uyarısız.
2. `find dist -name "*.html" | wc -l` → **21**
3. JavaScript kapalı test (sandbox'ta allow-scripts olmadan iframe):
   4.604 karakter görünür metin, 24 reveal öğesinin **hepsi opacity 1**,
   hero başlığı görünür.
4. `prefers-reduced-motion` OS ayarı bu ortamdan açılamadı; kuralların
   derlenmiş CSS'te bulunduğu ve reveal/hero/kart geçişlerini kapsadığı
   doğrulandı. **Gerçek cihazda ayrıca test edilmeli.**
5. Yatay kaydırma: 360/390/414/768/1024/1199/1200/1280/1440/1920 px ×
   TR-EN-DE sayfaları — hiçbirinde yok.
6. Galeri sadece klavyeyle: Enter açtı, odak kapatma düğmesine geçti,
   → ve ← fotoğraf değiştirdi (1/5→3/5→2/5), üç Tab odağı kutunun içinde
   döndürdü, ESC kapattı, odak tıklanan fotoğrafa döndü, kaydırma kilidi açıldı.

### TODO kalanlar
- Hareket azaltma ayarının gerçek cihazda testi
- Görsellerin ayrı küçük/büyük sürümleri (şu an tek çözünürlük)
- Önceki paketlerden gelen içerik TODO'ları (tenis bilinmeyenleri, ruhsat
  teyidi, pansiyon konsepti, fiyatlar, kalıcı renk paleti)

## 2026-09-02 — Üç hata düzeltmesi

### 1. Reveal varsayılanı görünür yapıldı
Önceki kurulumda gizleme kuralı `.js .reveal` idi ve `js` sınıfını React
paketi (`main.tsx`) ekliyordu. JS'siz durumda içerik görünüyordu ama
paket yüklendiği anda gizle-göster titremesi oluyordu.

Yeni kurulum:
- `.reveal` varsayılanı **opacity: 1** (görünür).
- Gizleme yalnızca `.js-hazir .reveal` altında.
- `js-hazir` sınıfını `index.html` içindeki **satır içi betik** ekliyor,
  React'ten önce, `<head>` içinde. Böylece titreme yok.
- Görünür sınıfının adı `is-visible` → `gorunur`.
- Betik `IntersectionObserver` yoksa sınıfı hiç eklemiyor.

İki güvenlik ağının koşulu kesinleştirildi (önceki hâlleri animasyonu
erken iptal ediyordu):
- Satır içi betik, uygulama paketi 4 sn içinde `js-app` sınıfını
  eklemediyse `js-hazir`ı kaldırıyor (paket hiç yüklenmediyse).
- Hook, IntersectionObserver hiç geri bildirim vermediyse (2,5 sn)
  her şeyi açıyor; normalde devreye girmiyor.

### 2. Düşük çözünürlüklü görseller
clubafrodit.com'da bu görsellerin daha büyük sürümü YOK (denendi, 404).
`Photo.tsx` başına konsolide TODO listesi, ayrıca `Home.tsx` ve
`content/amenities.ts` içine yerinde TODO notları kondu.

Gerilen görseller (doğal genişlik → ekranda kapladığı genişlik):
- hakkimizda2.jpg   375 → 634 px (1,69×)  Olanaklar/Mutfak, İletişim
- hakkimizda.jpg    375 → 582 px (1,55×)  Anasayfa girişi
- haber1/2/3.jpg    479 → 582 px (1,22×)  Haberler, anasayfa
- club-afrodit.jpg  600 → 634 px (1,06×)  Olanaklar/Plaj
- aftek.jpg         600 → 634 px (1,06×)  Tenis
İşletmeden en az 1200 px genişlikte orijinaller istenmeli.

### 3. Açılış fotoğrafı önceliklendirildi
`slayt-1.jpg`: `fetchpriority="high"` + `loading="eager"` (açık yazıldı) ve
prerender adımı artık `<head>` içine `<link rel="preload" as="image">`
koyuyor. `seo.ts` içine sayfa başına `preloadImage` alanı eklendi; yalnızca
üç anasayfa (`/tr`, `/en`, `/de`) bu preload'u alıyor, diğer görseller lazy.

### Doğrulama
1. `npm run build` hatasız, `npx oxlint src` uyarısız.
2. `find dist -name "*.html" | wc -l` → **21**
3. JavaScript kapalı (sandbox'ta allow-scripts olmadan): 4.528 karakter
   görünür metin, 24 reveal öğesinin **hepsi opacity 1**, hero başlık ve
   butonları görünür, `js-hazir` sınıfı eklenmemiş.
4. 360 ve 390 px × 3 sayfa: `scrollWidth > innerWidth` **false**.
5. Derlenmiş CSS'te `opacity:0` içeren tek seçici `.js-hazir .reveal`.

## 2026-09-02 — Kalan iki düzeltme

Kullanıcı ölçtü: reveal mekanizması doğruydu, diğer ikisi eksikti.
İlk ölçüm `npm run dev` üzerinde yapılmış olmalı — prerender edilmiş
`dist` çıktısında preload zaten vardı ama dev sunucusunda yoktu.

### Açılış görselinin önceliği
- `index.html` `<head>` içine statik `<link rel="preload" as="image"
  href="/img/slayt-1.jpg">` kondu. Böylece **dev sunucusunda da** var.
- Prerender bu satırı sayfaya göre ayarlıyor: `preloadImage` alanı olan
  sayfalarda (üç anasayfa) kalıyor, diğer 18 sayfada tamamen siliniyor.
- Hero `<img>`: `fetchpriority="high"` + `loading="eager"`.
  React `fetchPriority` (büyük P) yazıyordu; HTML'de öznitelik adları
  küçük harf okunduğu için tarayıcı zaten uyguluyordu ama `grep` ile
  bulunamıyordu. Prerender çıktıyı küçük harfe çeviriyor.

### Görsel çözünürlüğü
Kaynak klasörde aynı fotoğrafın büyük sürümü yoktu, ama **aynı yerin**
1493–1920 px sürümleri vardı. Değiştirilenler:
- Anasayfa girişi: hakkimizda.jpg (375) → **banner.jpg (1920)**
- Haber kapakları: haber1/2/3.jpg (479) → **haber1a/2a/3a.jpg (1493)**
- Havuzlar bloğu: haber2.jpg (479) → **haber2a.jpg (1493)**
- Olanaklar başlık bandı: club-afrodit.jpg (600) → **yorum.jpg (1920)**
- İletişim başlık bandı: hakkimizda2.jpg (375) → **video.jpg (1920)**

Yüksek çözünürlüklü karşılığı olmayanlar gerdirilmek yerine kaldırıldı:
- Mutfak bloğu: hakkimizda2.jpg hem 375 px'ti hem de bir apart binası
  fotoğrafıydı (konu dışı) → `image: null`, yer tutucu + TODO.
- Odalar başlık bandı: en büyük oda görseli 800 px → görselsiz düz bant.
- Tenis başlık bandı: tek kort fotoğrafı 600 px → görselsiz düz bant.
  Fotoğraf sayfa gövdesinde 634 px'te kalıyor (1,06×, fark edilmiyor).

Hiçbir görsel yapay olarak büyütülmedi.

### Kalan tek gerdirme
`yasli-bakim/1.jpg` 1200 px → Sağlıklı Yaşam başlık bandında 1425 px
(1,19×). Elimizdeki en büyük huzurevi fotoğrafı bu; %55 koyu örtü altında
olduğu için gözle güçlükle seçiliyor. TODO olarak bırakıldı.

### Doğrulama
- `npm run build` hatasız, `npx oxlint src` uyarısız
- `grep -c 'fetchpriority="high"' dist/tr/index.html` → **1**
- `grep -c 'rel="preload"' dist/tr/index.html` → **2**
- `find dist -name "*.html" | wc -l` → **21**
- Diğer 18 sayfanın `<head>`inde preload yok (0)
- JS kapalı: 4.535 karakter metin, 24 reveal öğesinin hepsi opacity 1
- 360 ve 390 px × 4 sayfa: `scrollWidth > innerWidth` **false**
- 1440 ve 1920 px'te tüm sayfalar tarandı: `yasli-bakim/1.jpg` dışında
  doğal genişliğinden büyük gösterilen görsel yok
- Tam ekran görüntüleyicide görseller 1:1 (800 px doğal → 800 px ekranda)

## 2026-09-02 — Arama motoru ve performans paketi

Yedi maddenin hepsi hem `npm run dev` hem de prerender çıktısında eksikti;
ölçülerek doğrulandı (hreflang 0, og:title 0, ld+json 0, sitemap yok,
15 görselin 13'ünde width yok, webp yok).

### 1. hreflang ve canonical
`src/config.ts` tek yapılandırma noktası: `SITE_URL`. Alan adı kesinleşince
yalnızca burası değişecek; canonical, hreflang, Open Graph, sitemap ve
robots hepsi buradan okuyor (`VITE_SITE_URL` ile geçici olarak değişebilir).
Her sayfa kendi canonical'ını, üç dil karşılığını ve x-default olarak
Türkçe sürümü bildiriyor.

### 2. Paylaşım etiketleri
Her sayfada og:type, og:site_name, og:locale, og:title, og:description,
og:url, og:image (+width/height/alt) ve twitter:card=summary_large_image.
Görsel o sayfanın kendi ana fotoğrafı; olmayanlarda slayt-1.jpg. Hepsi
`seo.ts` içindeki tek listeden türüyor.

### 3. Yapılandırılmış veri
Anasayfalara schema.org LodgingBusiness JSON-LD: ad, açıklama, adres,
koordinat (haritadan), telefon, e-posta, fotoğraflar, sosyal medya
hesapları ve 27 olanak (amenityFeature).
Fiyat, yıldız, puan ve giriş/çıkış saati alanları BİLEREK yok — teyit
bekliyor.

### 4. Görsel ölçüleri
`scripts/images.mjs` her dosyanın gerçek ölçüsünü okuyup
`src/generated/images.ts` manifestine yazıyor; `Photo`, `Hero`, `PageHead`,
`Lightbox` ve `Logo` ölçüleri oradan alıyor. Elle girilen ölçü yok.
Tüm sayfalarda width özniteliği olmayan `<img>` sayısı 0.

### 5. sitemap.xml ve robots.txt
Prerender 21 sayfalık sitemap üretiyor; her girdide üç dil + x-default
xhtml:link alternatifleri var. robots.txt site haritasını bildiriyor.

### 6. Görsel ağırlığı
sharp ile derleme adımı: her JPEG/PNG için WebP, 900 px'ten geniş olanlar
için 640/1024/1920 sürümleri (asla büyütme yok). Orijinaller duruyor.
`<picture>` + `srcset` + `sizes`; WebP desteklemeyen tarayıcı JPEG'e düşüyor.
Açılış görselinin preload'ı da duyarlı yazıldı (`imagesrcset` +
`type="image/webp"`) — aksi halde tarayıcı hem tam boy JPEG'i hem küçük
WebP'yi indiriyordu.

### 7. Alt metinleri
`src/i18n/photoAlts.ts`: 43 galeri fotoğrafının her biri açılıp bakıldı,
ne gösterdikleri üç dilde yazıldı. Fotoğrafta olmayan hiçbir şey tarif
edilmedi.

### Ölçümler
- public/img: 18 MB → 27 MB (orijinaller 17,6 MB + 5,9 MB WebP + 3,0 MB
  ölçekli JPEG). Ziyaretçi bunların hepsini değil, kendine uygun olanı iner.
- Anasayfa, 390 px genişlik, tüm görseller yüklendiğinde:
  görseller 3.750 KB → **399 KB** (%89 azalma).
  Sayfa toplamı (HTML + CSS + JS dahil) 4.158 KB → **807 KB**.
- İlk ekranda inen görseller: 823 KB → **47 KB**.

### Doğrulama
`npm run build` hatasız, `npx oxlint src` uyarısız, 21 HTML,
hreflang 4, og:title 1, ld+json 1, sitemap 21 url, width'siz img 0,
JS kapalı: 4.535 karakter metin ve 24 reveal öğesinin hepsi görünür.
