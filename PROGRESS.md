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

## 2026-09-02 — Beklemeye ve yayına hazırlık

Site aylar sonra yayına alınacak. Bu turda yeni özellik yok; amaç projeyi
uzun süre bekletip sonra hızlı yayına alabilmek.

### 1. Derleme ortamı sabitlendi
`.nvmrc` → **24.18.0** (şu an çalışan sürüm). `package.json` → `engines`:
node `>=24.18.0 <25`, npm `>=11.16.0`.
sharp işletim sistemine göre ikili indirdiği için not düşüldü: bu proje
**win32-x64**'te, sharp **0.35.4** / libvips **8.18.6** ile derlendi.
README'de de yazılı.

### 2. README yeniden yazıldı
Vite şablonunun İngilizce metni gitti. Türkçe; proje tanımı, komut tablosu,
klasör yapısı, prerender'ın nasıl çalıştığı ve **"şunu değiştirmek istiyorum,
hangi dosya?"** bölümü var. Telefon numarası `facility.ts`, oda metni
`i18n/tr.ts` + `content/rooms.ts`, renkler `tokens.css` — hepsi tek tek
yazılı.

### 3. LAUNCH.md
Yayın öncesi kontrol listesi, A'dan H'ye sıralı. Her maddede ne yapılacak,
hangi dosya, kim yapabilir (ben mi işletme mi).
Sonunda koddaki 13 TODO satırının bu listedeki karşılığını gösteren tablo
var: **12 gerçek iş + 1 yanlış eşleşme** (`global.css` içindeki satır bir iş
değil, `.todo-note` CSS sınıfının başlık yorumu).

### 4. ISLETME-SORULARI.md
İşletmeye olduğu gibi iletilebilecek, teknik olmayan dille yazılmış bilgi
listesi. Yedi başlık: konaklama koşulları, tesis bilgileri, tenis kulübü
(7 soru), huzurevi ruhsatı, fotoğraflar, haberler, mevcut sitenin akıbeti.
Her sorunun altında **neden sorulduğu** bir cümleyle yazılı.

### 5. npm run check
`scripts/check.mjs`. Sırayla: derleme, lint, 21 HTML, sitemap'te 21 kayıt,
ölçüsüz görsel sıfır, `opacity:0` içeren tek seçicinin `.js-hazir .reveal`
olması. Hepsi geçerse `TAMAM`, geçmezse düşen maddeyi yazar ve 1 ile çıkar.
Sahte bir `.sahte-hata { opacity: 0 }` kuralı eklenerek gerçekten düştüğü
doğrulandı, sonra geri alındı.

### 6. Renk paleti önerileri — SEÇİM BEKLİYOR
Fotoğraflardaki baskın renkler sharp ile ölçüldü (10 fotoğraf, 60×60'a
küçültülüp HSL kovalarına ayrılarak):
- Sıcak toprak aralığı hsl(20–40°) baskın; en ayırt edici renk toprak
  kortun kili **#d69c6e** (tenis fotoğrafının %21'i)
- İkinci baskın renk havuz/deniz mavisi **#4dbfe9** / derin suda **#02688f**

İki palet hazırlandı, **uygulanmadı**:
- `design/palet-a-toprak.css` — kiremit vurgu (#c0764a), sıcak kırık beyaz
  zemin, sıcak koyu kahve metin
- `design/palet-b-ege.css` — Ege mavisi vurgu (#2b8fb5), serin kırık beyaz
  zemin, arduvaz grisi metin

Her ikisi de tam `tokens.css` dosyası; seçilen dosyanın içeriği `tokens.css`
üzerine kopyalanacak. Her dosyanın başında o palete uygun `.tone-calm`
değerleri de yazılı. Buton kontrastları ölçüldü: A 5,1:1 — B 6,7:1
(ikisi de AA eşiğinin üstünde).
Reddedilen "koyu zeytin + kum + lacivert" yönü tekrarlanmadı.

Ekran görüntüsü almak için paletler geçici olarak uygulandı, sonra
`tokens.css` birebir geri alındı (diff ile doğrulandı).

### Doğrulama
- `npm run check` → TAMAM, altı ölçüt de geçti
- Koddaki TODO sayısı 13, LAUNCH.md tablosundaki satır sayısı 13 — uyuşuyor
- Temiz klasöre klonlanıp `npm ci` + `npm run check` denendi

## 2026-09-02 — Palet A uygulandı

Kullanıcı "Toprak Kort" paletini seçti. Uygulanan değişiklikler:

- `src/styles/tokens.css` → Palet A renkleri. Dosya başındaki "GEÇİCİ palet"
  TODO notu kaldırıldı, yerine paletin neden bu olduğunu anlatan kalıcı not
  yazıldı (fotoğraflardaki baskın renk ölçümü).
- `src/styles/layout.css` → `.tone-calm` (huzurevi bölümünün kendi tonu)
  soğuk mavi-griden sıcak paletle uyumlu adaçayı yeşiline çevrildi:
  `#8a9a86 / #6c7d69 / #e8ede6`.
- Palet dosyalarındaki yanlış yol düzeltildi: `.tone-calm` kuralı
  `motion.css` değil `layout.css` içinde.
- `LAUNCH.md` → C3 maddesi tamamlandı olarak işaretlendi; TODO tablosu
  13 satırdan 12'ye indi (palet TODO'su kapandı).

### Ölçülen kontrastlar (tarayıcıda, gerçek renklerle)
- gövde metni / zemin: 14,42:1
- ikincil metin / zemin: 6,69:1
- buton yazısı / buton zemini: 4,58:1
- bağlantı / zemin: 4,78:1

Hepsi WCAG AA eşiğinin (4,5:1) üstünde.

**Düzeltme:** palet dosyalarında buton kontrastını 5,1:1 (A) ve 6,7:1 (B)
diye yazmıştım; o hesap saf beyaza göreydi. Gerçek metin rengi saf beyaz
değil (`--color-text-invert`), ölçülen değer A için 4,58:1, B için 6,13:1.
Her iki dosyadaki not düzeltildi. İkisi de AA'yı geçiyor.

### Doğrulama
- `npm run check` → TAMAM
- 360 ve 390 px, üç sayfa: yatay kaydırma yok
- Koddaki TODO 12, LAUNCH.md tablosu 12 — uyuşuyor

## 2026-09-02 — Baştan sona denetim

Site 21 sayfa × 6 genişlik + statik çıktı taranarak denetlendi.
Üç gerçek sorun bulundu ve düzeltildi; üç şey de yanlış alarm çıktı.

### Düzeltilen 1 — Çapa bağlantıları kaydırmıyordu
Anasayfadaki oda ve haber kartları `/tr/odalar#grand-suit-oda` gibi
adreslere gidiyor ama sayfa o bölüme inmiyordu (`scrollY: 0`).
Sebep: `Layout` her rota değişiminde koşulsuz `window.scrollTo(0, 0)`
çağırıyordu, çapa yok sayılıyordu.

Düzeltme: `Layout` artık adreste çapa varsa o bölüme iniyor.

**Ayrıca bulunan yan sorun:** CSS'te `html { scroll-behavior: smooth }`
olduğu için `scrollTo`/`scrollIntoView` çağrılarının varsayılanı da
yumuşak kaydırma oluyordu. Bu iki soruna yol açıyordu:
- Her sayfa geçişinde başa dönerken binlerce piksel yavaş yavaş kayıyordu.
- Yumuşak kaydırma kısıtlanmış/arka plandaki sekmede hiç çalışmıyor;
  kullanıcı yanlış yerde kalıyordu (test sırasında bizzat yaşandı).
Rota değişimindeki her iki kaydırma da `behavior: 'instant'` yapıldı.
Sayfa içi aşağı oku kendi yumuşak kaydırmasını koruyor; hareket azaltma
açıkken o da `instant`.

Doğrulandı: kart tıklaması → `scrollY 2580`, hedef bölüm yapışkan
başlığın 88 px altında, ekranda. Haber çapaları da aynı şekilde çalışıyor.

### Düzeltilen 2 — Statik barındırmada 404 sayfası yoktu
`dist/` içinde 404 sayfası üretilmiyordu. `_redirects` dosyasındaki
`/tr/* -> /tr/ 404` kuralı bilinmeyen adreste **anasayfa içeriğini**
404 durumuyla sunuyordu; tarayıcıda React sonradan doğru sayfayı
gösterse de arama motoru anasayfa içeriği görüyordu.

Düzeltme: prerender artık `dist/404.html` üretiyor —
"Sayfa bulunamadı" içeriği, `noindex`, canonical/hreflang/OG yok,
site haritasına girmiyor. `_redirects` sadeleşti (yalnız kök yönlendirme).
`npm run check` artık 21 rota sayfası **ve** 404.html arıyor.

Yan detay: 404 sayfasındaki dil değiştirici `/en/404` gibi var olmayan
adreslere işaret ediyordu; prerender bunları dil anasayfalarına çeviriyor.

### Düzeltilen 3 — Tam ekran görüntüleyici WebP kullanmıyordu
Galeri fotoğrafına tıklayınca açılan tam ekran görsel sitedeki en büyük
indirme, ama `<picture>` içinde değildi; her zaman JPEG iniyordu.
`<picture>` + WebP kaynağı eklendi. Doğrulandı: `currentSrc` artık
`.webp`, boyut ve alt metin doğru.

### Yanlış alarmlar (kod sorunu değil, ölçüm ortamı)
- **"Görseller yüklenmiyor"**: gizli belgede tarayıcı görseli indiriyor
  ama çözmüyor; `currentSrc` dolu, `naturalWidth` 0 kalıyor.
  Dosyaların varlığı statik denetimle ayrıca doğrulandı.
- **"Skip link odakta görünmüyor"**: `transition: top` yüzünden değer
  geçişin ilk anında okunmuştu. 500 ms sonra `top: 12px`, görünür.
- **"`:focus` eşleşmiyor"**: sekme odakta değilken Chrome `:focus`
  stilini uygulamıyor.

### Sorun bulunmayanlar
- Statik denetim (22 sayfa): kırık iç bağlantı, kayıp görsel/srcset,
  yinelenen id, başlık atlaması, eksik alt/width/title/description/
  canonical/hreflang/og:title, `target=_blank` rel eksiği, çapa hedefi
  eksiği, sitemap tutarsızlığı — hiçbiri yok.
- Konsol: TR/EN/DE, altı sayfa — tek hata veya uyarı yok.
- Düzen: 360/390/768/1024/1200/1440 px × TR-EN-DE — yatay kaydırma yok,
  taşan öğe yok, 44 px altı dokunma hedefi yok, hamburger eşiği doğru,
  menü tek satır, kırpılan metin yok.
- Mobil menü: açılıyor, `aria-expanded` ve etiket değişiyor, bağlantıya
  basınca kapanıyor.
- Galeri: açılıyor, ok tuşları geziniyor, ESC kapatıyor, odak geri
  dönüyor, arka plan kaydırması kilitleniyor.
- Dil değiştirici: sayfayı ve çapayı koruyor, `html lang` ve başlık
  güncelleniyor.
- JavaScript kapalı: 4.535 karakter metin, 24 reveal öğesinin hepsi
  görünür.

### Doğrulama
`npm run check` → TAMAM (altı ölçüt).

## 2026-09-02 — Görsel betiğinde birikme hatası

`git status --ignored` bakarken fark edildi: `public/img/banner-1024-640.jpg`
gibi "sürümün sürümü" dosyalar vardı.

**Sebep:** `scripts/images.mjs` `public/img` altındaki tüm JPEG/PNG'leri
kaynak sayıyordu — kendi ürettiği `foo-1024.jpg` dosyalarını da. Her
derlemede onlardan da 640'lık sürüm üretiliyordu.

**Etki:** 34 çöp dosya, manifestte 102 sahte kayıt (73 gerçek kaynağın
yanında `/img/banner-1024.jpg` gibi girdiler). Site bozulmuyordu —
uygulama yalnızca özgün yolları (`/img/banner.jpg`) sorguluyor — ama
klasör ve derleme süresi boşuna büyüyordu.

**Düzeltme:** `URETILEN` düzenli ifadesi eklendi; `-640/-1024/-1920`
ekiyle biten dosyalar kaynak listesinden çıkarılıyor. Üretilmiş tüm
dosyalar ve manifest silinip sıfırdan üretildi.

Doğrulandı: ikinci kez çalıştırıldığında "0 yeni dosya", sürümün sürümü
dosya sayısı 0, manifest tam 73 kayıt (sahte kayıt yok).
`npm run check` → TAMAM.

## 2026-09-02 — Üç düzeltme: görsel doğrulama, çevrilmiş adresler, dokunma hedefleri

### 1. Görsel üretimi — hash + genişlik doğrulaması
Eski atlama koşulu dosya tarihine bakıyordu (`mtime`). Kaynak değişip
tarihi korunduğunda (kopyalama, geri yükleme, git checkout) bayat çıktı
sessizce kalıyordu.

Yeni davranış:
- Kaynak dosyanın **sha256 özeti** `src/generated/images.cache.json`
  içinde tutuluyor. Özet değişmişse veya beklenen çıktılardan biri
  eksikse o kaynağın tüm sürümleri yeniden üretiliyor.
- Üretim bitince **her sürümün gerçek genişliği adındaki sayıyla
  karşılaştırılıyor**. Uyuşmazlık varsa derleme hata koduyla duruyor.

Sahte bir bozuk dosya (`haber1a-1024.webp` 768 px yapıldı) ile denendi:
betik yakaladı, "adında 1024, gerçekte 768" diyerek 1 koduyla çıktı.

NOT: kullanıcının bildirdiği bozuk dosyaları ölçtüğümde 0 uyuşmazlık
çıktı — bir önceki turda tüm üretilmiş dosyalar silinip sıfırdan
üretildiği için. Tarif edilen zayıflık yine de gerçekti ve kapatıldı.

### 2. Adresler çevrildi
Menüde "Zimmer" yazıp adreste `/de/odalar` göstermek tutarsızdı.

- `src/lib/paths.ts` yeni: `SLUGS` her dil için ayrı
  (tr odalar/olanaklar/tenis/saglikli-yasam/haberler/iletisim,
  en rooms/facilities/tennis/assisted-living/news/contact,
  de zimmer/anlage/tennis/gesundes-leben/aktuelles/kontakt).
- Router artık dil başına ayrı adres ağacı kuruyor; `Layout` dili
  `useParams` yerine prop olarak alıyor, `LangGuard` gereksizleşti.
- Bölüm çapaları da çevrildi: oda ve haber `slug` alanları artık
  `Record<Lang, string>`. `#standart-oda` → `#standard-room` →
  `#standardzimmer`.
- Dil değiştirici hem yolu hem çapayı çeviriyor
  (`/de/zimmer#grand-suite` → `/en/rooms#grand-suite`).
- `dist/_redirects` artık `src/seo.ts` içinde üretiliyor: eski Türkçe
  adreslerden yenilerine 12 kalıcı (301) yönlendirme. Slug değişirse
  yönlendirmeler kendiliğinden güncellenir.
- sitemap, hreflang ve canonical yeni adresleri gösteriyor.

### 3. Dokunma hedefleri
360 px'te 44 px altında öğe **bulunamadı** — kapalı/açık menü, galeri
açık, TR/EN/DE, 404 dahil 10 sayfa tarandı. En küçük öğeler tam 44 px'te
duruyordu; alt piksel yuvarlamasıyla 43,98 ölçülebilir. Bu yüzden taban
44'ten **48 px**'e çıkarıldı (görsel boyut değişmedi, yalnız dolgu).
Şimdi en küçük öğe 48×48.

### Doğrulama
- `npm run check` → TAMAM (altı ölçüt)
- 141 sürümün gerçek genişliği adıyla karşılaştırıldı → **0 uyuşmazlık**
- 21 yeni adres → hepsi 200
- `dist/de/zimmer/index.html` hreflang: tr /tr/odalar, en /en/rooms,
  de /de/zimmer, x-default /tr/odalar
- 360/390/768 px × 7 sayfa → 0 taşma, **0 küçük dokunma hedefi**
- JS kapalı (/de/zimmer): 3.394 karakter metin, 4 reveal öğesinin hepsi
  görünür, menü ve çapalar Almanca

### Ölçemediğim
`_redirects` dosyasının gerçekten yönlendirme yapması ancak Cloudflare
Pages'e dağıtımdan sonra doğrulanabilir; `vite preview` bu dosyayı
işlemiyor. Dosyanın içeriği ve 12 kuralın doğruluğu kontrol edildi.

## 2026-09-02 — Cloudflare Pages taklidiyle test

Kullanıcı "canlıda test et" dedi. **Site hiçbir yerde yayında değil**:
clubafrodit.com hâlâ eski siteyi sunuyor, /tr ve /en/rooms 404 veriyor,
depoda dağıtım yapılandırması yok. Yayına alma kullanıcının Cloudflare
hesabıyla yapılacak bir iş.

Bunun yerine `npx wrangler pages dev dist` ile Cloudflare Pages yerelde
birebir taklit edildi — `_redirects` ve `404.html` işleniyor, yani
"ölçemedim" diye bıraktığım iki madde kapandı.

### Bulunan gerçek sorun: eğik çizgi
Prerender çıktıyı `dist/tr/odalar/index.html` olarak yazıyordu. Cloudflare
Pages bu biçimde **eğik çizgili adresi asıl kabul ediyor**:
`/tr/odalar` → 308 → `/tr/odalar/`.

Oysa canonical, hreflang, sitemap ve bütün iç bağlantılarımız çizgisiz.
Yani her canonical adresi yönlenen bir adresti; Search Console bunu
"Page with redirect" diye işaretler ve canonical zayıflar.

**Düzeltme:** prerender artık düz dosya yazıyor — `dist/tr/odalar.html`.
Bu biçimde çizgisiz hâl 200 veriyor, çizgili hâl 308 ile çizgisize
yönleniyor; yani bizim ilan ettiğimiz adres asıl adres oluyor.

Yan fayda: `npm run preview` de artık `/tr` ve `/tr/odalar` adreslerini
doğrudan açıyor (önceden eğik çizgi gerekiyordu).

### Taklitle doğrulananlar
- 13 yönlendirme kuralı okundu
- Kök `/` → 302 → `/tr`
- 21 adres → hepsi **200** (yönlendirme sıçraması yok)
- 12 eski Türkçe adres → **301** ile yenilerine
  (/de/odalar → /de/zimmer, /en/haberler → /en/news …)
- Eğik çizgili hâl → 308 ile çizgisize (doğru yön)
- Bilinmeyen adres → **404** + "Sayfa bulunamadı" sayfası + noindex
- sitemap.xml, robots.txt, görseller → 200
- Tarayıcıda: /de/odalar açılınca /de/zimmer'e düşüyor ve Almanca menü
  geliyor; dil değiştirici çapayı koruyor
  (/de/zimmer#grand-suite → /tr/odalar#grand-suit-oda, doğru bölüme iniyor)
- Konsolda hata yok

### Ölçemediğim
Gerçek dağıtım: alan adı, HTTPS, Cloudflare önbelleği, gerçek ağ hızı.
Bunlar ancak yayına alındıktan sonra test edilebilir (LAUNCH.md E ve F).

## 2026-09-02 — Cloudflare Pages geçici yayın (telefon testi)

**Yapılanlar**
- `npm run check` — altı ölçüt de geçti (derleme, lint, 21 sayfa + 404,
  sitemap 21 kayıt, img ölçüleri, opacity kuralı).
- `wrangler login` (OAuth, tarayıcıdan onaylandı).
- `wrangler pages project create afrodit-web --production-branch=main`
- `wrangler pages deploy dist --project-name=afrodit-web --branch=main`
- Adres: https://afrodit-web.pages.dev (dağıtım kopyası: 151df6a2.afrodit-web.pages.dev)

**Karar: Git bağlanmadı.** Her push'un derleme hakkı harcamaması için elle
(`wrangler pages deploy`) dağıtım yapılıyor. Yeni sürüm için: `npm run check`
sonra aynı deploy komutu.

**Karar: wrangler.toml eklenmedi.** `dist/_redirects` zaten build'de
üretiliyor ve Pages onu kendiliğinden okuyor; ek ayar dosyasına gerek yok.

**Canlıda doğrulananlar (hepsi geçti)**
- 21 sayfanın hepsi 200.
- 12 eski Türkçe adres (/en/odalar, /de/odalar …) → 301, doğru hedeflere.
- `/` → `/tr` 302 (kural `_redirects` içinde 302 olarak tanımlı).
- Eğik çizgi: `/tr/odalar/` → 308 → `/tr/odalar` 200. Pages'in kendi
  normalleştirmesi; her iki yazım da açılıyor.
- sitemap.xml 200 (application/xml), robots.txt 200 (text/plain).
- Bilinmeyen adres → 404.html, 404 durumuyla.
- 21 sayfadaki 200 tekil görselin hepsi 200. Chrome ağ kaydı: tarayıcı
  yalnızca .webp indiriyor, .jpg hiç istenmiyor. WebP ~1/3 boyut
  (banner 577 KB → 212 KB, aftek 86 KB → 13 KB).
- Konsol hatası yok (TR ve DE sayfalarında ölçüldü).

**Gözlem (hata değil):** canonical, hreflang ve robots.txt içindeki sitemap
adresi `www.clubafrodit.com`'u gösteriyor. Üretim domaini için doğru; geçici
pages.dev adresinin indekslenmemesi de bu sayede.

## 2026-09-02 — Footer'a gömülü harita (tıklayınca yüklenen)

**Yapılanlar**
- Yeni bileşen `src/components/MapEmbed.tsx`. Harita tek yerden yönetiliyor;
  hem alt bilgi hem İletişim sayfası aynı bileşeni kullanıyor.
- `Footer.tsx`: grid'in altına tam genişlik "Konum" şeridi eklendi.
- `Contact.tsx`: sayfadaki doğrudan iframe aynı bileşene geçirildi.
- `Icon.tsx`: `pin` (konum) yolu eklendi.
- `i18n/tr|en|de`: tek yeni anahtar `actions.openMap`
  (Haritayı açın / Open the map / Karte öffnen).
- `layout.css`: yer tutucu stilleri, `--map-height` değişkeni, koyu zemin
  varyantı.

**Karar: iframe tıklamaya kadar kurulmuyor.** Google haritası 21 sayfanın
altında duruyor; doğrudan iframe her açılışta yüz kilobaytlarca dış kaynak
indirirdi. Yerinde durağan bir yer tutucu var, gerçek çerçeve tıklanınca
kuruluyor.

**Karar: yer tutucu `<button>`.** div + tabindex + keydown yerine gerçek
buton — klavye odağı ve Enter/Boşluk kendiliğinden çalışıyor, bakımı yok.
Açıldığında odak iframe'e taşınıyor ki klavye kullanıcısı boşta kalmasın.

**Karar: yer tutucu deseni saf CSS.** Statik harita görseli indirmek yerine
iki linear-gradient ile ızgara — sıfır ek istek.

**Not:** `.site-footer .map` kuralında `background` kısayolu yerine
`background-color` kullanıldı; kısayol daha yüksek özgüllükte olduğu için
yer tutucunun ızgara `background-image`'ini siliyordu.

**Doğrulananlar (canlı: afrodit-web.pages.dev)**
- `npm run check` — altı ölçüt de geçti.
- 21 sayfanın hepsi 200; hepsinde alt bilgi yer tutucusu var, hiçbirinin
  HTML'inde iframe yok (üretilen dosyalarda `google.com/maps/embed` sayısı 0).
- Üç dilde alt bilgi: başlık Konum/Location/Lage, buton
  Haritayı açın/Open the map/Karte öffnen.
- Ağ kaydı: sayfa tam yüklendiğinde 6 istek, hepsi kendi alan adımızdan —
  Google'a **sıfır** istek. Tıklamadan sonra tam 1 istek (maps/embed).
- Fare tıklaması: harita açılıyor (ekran görüntüsüyle görüldü).
- Klavye: Tab ile butona odaklanılıyor, odak halkası görünür
  (solid 1.6px #1f6f8b), Enter ile açılıyor, odak çerçeveye geçiyor.
- 360 px görüş alanı (/tr/olanaklar, /tr/iletisim, /de/kontakt): yatay
  kaydırma yok, taşan öğe yok.
- iframe başlığı üç dilde çevrili (`contact.mapAlt` yeniden kullanıldı).

**Ölçülemedi:** Chrome eklentisinin `resize_window` çağrısı bu ortamda
pencereyi küçültmüyor (`outerWidth: 0` dönüyor). 360 px ölçümü bunun yerine
aynı-köken bir çerçeve içinde 360 px'lik gerçek görüş alanı kurularak
yapıldı; medya sorguları çerçeve genişliğine göre çalışır.

### Düzeltme — İletişim sayfasında çift harita

Kullanıcı canlıda fark etti: İletişim sayfasında sayfanın kendi "Konum"
bölümü ile alt bilgideki harita alt alta düşüyor, iki harita görünüyordu.

**Karar: İletişim sayfasında alt bilgi haritası gizleniyor**, sayfanın kendi
büyük haritası kalıyor. Tersi de mümkündü (sayfadaki bölümü kaldırmak) ama
İletişim haritanın asıl yeri — adres bilgisinin yanında ve büyük olmalı;
alt bilgideki 15rem'lik sürüm o sayfa için küçük kalırdı. Böylece her
sayfada harita var, hiçbirinde iki tane yok.

`Footer.tsx` içinde `useLocation` + `sectionFromSlug` ile bulunulan sayfanın
`contact` olup olmadığına bakılıyor. `useLocation` SSR'de StaticRouter ile
zaten çalışıyor (LanguageSwitcher ve Layout da kullanıyor).

**Doğrulananlar (canlı)**
- `npm run check` yine altı ölçütten geçti.
- 22 üretilen sayfanın (21 + 404) her birinde tam 1 harita; İletişim
  sayfalarında `site-footer__location` yok, diğerlerinde var.
- Canlıda 21 adresin her birinde 1 harita.
- Site içi gezinme (sayfa yenilenmeden): İletişim → Odalar → İletişim
  boyunca harita sayısı hep 1, alt bilgi bölümü doğru açılıp kapanıyor.
- Konsol hatası yok. Ekran görüntüsüyle görüldü: İletişim sayfasında tek
  harita "Konum" bölümünde, alt bilgide harita yok.

## 2026-09-02 — Sosyal medya simgeleri ve Aeneas

**Yapılanlar**
- `Icon.tsx`: `instagram`, `facebook`, `youtube` yolları eklendi.
- `facility.ts`: her sosyal girdiye `icon` alanı; listeye `@aeneashotel`
  eklendi.
- `Footer.tsx`: sosyal liste artık simge + hesap adı.
- `Header.tsx`: üst menüye iki simge (Instagram, Facebook).
- `i18n/tr|en|de`: yeni `social` bölümü — her hesabın erişilebilir adı.
- `layout.css`: `.social-link`, `.social-icon`, `.site-nav__social`.
- `ISLETME-SORULARI.md` 2.3: Aeneas'ın sitedeki mevcut durumu yazıldı.

**Karar: simge markaların dolu logoları değil, ince çizgi hatları.** Dolu
marka logoları mevcut ikon setinin (stroke tabanlı) yanında yabancı
duruyordu.

**Karar: başlık simgeleri için ayrı medya sorgusu yazılmadı.** Simgeler
`site-nav__aside` içine kondu; menünün hamburger eşiği zaten 75rem = 1200px,
yani dar ekranda kendiliğinden hamburger menünün içinde kalıyor, geniş
ekranda üst çubukta görünüyor. İstenen davranış ek CSS olmadan çıktı.

**Karar: alt bilgi aria-label'ı görünür metni de içeriyor.** Önce yalnızca
"Club Afrodit Instagram'da" yazılmıştı; görünen metin "@clubafrodit" adın
içinde geçmediği için WCAG 2.5.3 (Label in Name) ihlaliydi — ses komutuyla
gezen biri "@clubafrodit" diyerek bağlantıyı tetikleyemezdi. Ad artık
"@clubafrodit — Club Afrodit Instagram'da". Başlıktaki simgelerde görünür
metin olmadığı için orada sade ad yeterli.

**Not: SVG'lerde `aria-hidden="true"` bilinçli olarak korundu.** Erişilebilir
adı bağlantı taşıyor (`aria-label`); simge dekoratif katman. Bu WAI'nin
standart deseni. `aria-hidden` kaldırılsaydı ad değişmezdi ama bazı ekran
okuyucular fazladan "grafik" duyurusu yapardı.

**Düzeltilen hata:** `.social-link { display: inline-flex }` kuralı, dosyanın
ilerisindeki dokunma hedefi kuralı (`.site-footer__links a { display:
inline-block }`) tarafından eziliyordu; simge hesap adının üstüne düşüyordu.
Seçici `.site-footer__links a.social-link` ile güçlendirildi.

**Doğrulananlar (canlı)**
- `npm run check` — altı ölçüt de geçti.
- Üç dilde alt bilgide **6** sosyal bağlantı (5 mevcut + Aeneas), hepsinde
  simge; başlıkta 2 simge.
- 8 bağlantının hepsinin erişilebilir adı dolu, Label in Name ihlali 0.
- Genişlikler — 360 / 768 / 1200, menü açık ve kapalı: yatay kaydırma yok,
  taşan öğe yok, 7 menü bağlantısı duruyor. 1200'ün altında başlık
  simgeleri hamburger menüde (44×44 dokunma hedefi), 1200 ve üstünde üst
  çubukta.
- Alt bilgide simge ve hesap adı altı bağlantının hepsinde aynı satırda.

**Sayfa ağırlığı artışı (gzip, gerçek aktarım)**
- JS +415 B, CSS +84 B, sayfa başına HTML +396 B.
- İlk ziyaret toplam **+895 bayt**; sonraki sayfalarda (JS/CSS önbellekte)
  **+396 bayt**. Simgeler HTML içinde satır içi SVG — ek ağ isteği yok.

## 2026-09-03 — Orijinal siteden dört eksik kapatıldı

Kullanıcı orijinal siteyi öğe bazlı tarayıp dört eksik bildirdi; dördü de
onaylı olarak sırayla yapıldı.

### 1 — Sabit WhatsApp düğmesi
Yeni `src/components/FloatingActions.tsx`, `Layout` içinde her sayfada.
`facility.whatsappHref` kullanıyor, erişilebilir adı `t.actions.whatsapp`
(üç dilde zaten vardı).

**Karar: WhatsApp'ın kendi koyu yeşili tokens.css'e eklendi**
(`--color-whatsapp: #128c7e`). Sitenin sıcak paletinden ayrık ama bu
düğmenin tanınırlığı renginden geliyor; beyaz simgeyle kontrast 4,0:1,
simge için gereken 3:1 eşiğini geçiyor. Bileşene sabit hex yazılmadı.

**Düzeltilen:** `.site-footer__base { padding-right }` kuralı `.container`
tarafından eziliyordu (aynı özgüllük, sonra yükleniyor) ve telif satırı
düğmenin altında kalıyordu. Seçici `.container.site-footer__base` yapıldı.

### 2 — "Yukarı çık" düğmesi
Aynı bileşende, WhatsApp'ın üstünde. Bir ekran boyu sonra beliriyor.

**Karar: opacity ile gizlenmiyor, DOM'dan çıkıyor.** Görünmez ama
odaklanabilir bir düğme klavye kullanıcısını tuzağa düşürürdü. (Ayrıca
check.mjs'in "opacity:0 yalnızca .reveal" kuralı da buna izin vermezdi.)

**Üç kusur bulundu ve düzeltildi:**
1. `focus()` çağrısı süren yumuşak kaydırmayı iptal ediyordu — sayfa başa
   dönmüyordu. Odak taşıma `scrollTo`'dan önceye alındı.
2. `behavior: 'smooth'` kısıtlanmış sekmelerde hiç çalışmıyor (Layout.tsx'te
   sayfa geçişleri için aynı gözlem zaten notlanmış). Düğme hiçbir şey
   yapmamış gibi görünüyordu; 700 ms sonra hâlâ tepede değilse doğrudan
   atlayan bir güvenlik ağı eklendi.
3. Programatik kaydırma her tarayıcıda scroll olayı üretmiyor; düğme sayfa
   başına dönüldükten sonra da ekranda kalıyordu. Durum elle kapatılıyor.

### 3 — İkinci video
`facility.youtube` (tek adres) → `facility.videos` dizisi. İkinci video
MNAmSmcoNN0 eklendi. Yeni `VideoCard` bileşeni anasayfada.

**Karar: gömülü oynatıcı yok, yerel kapak görseli var.** YouTube iframe'i de
kendi thumbnail adresi (i.ytimg.com) de dış istek demek. Kapak yerel bir
fotoğraf; tıklayınca video YouTube'da yeni sekmede açılıyor.

**TODO:** ilk videonun (gUP1Dh9Wafs) işletmedeki resmî başlığı teyit
edilmedi; şimdilik tanımlayıcı bir etiket kullanılıyor.

### 4 — Hakkımızda sayfası (21 → 24 sayfa)
`/tr/hakkimizda`, `/en/about`, `/de/ueber-uns`. `SECTION_KEYS`'e `about`
eklemek rota, sitemap, hreflang ve canonical'ı kendiliğinden hallediyor —
mimari bunun için doğru kurulmuş.

Anasayfadaki uzun giriş metni buraya taşındı; anasayfada iki cümlelik özet
ve "Devamını okuyun" bağlantısı kaldı. Aynı paragraf iki sayfada durmuyor.

İçerik: tesis hikâyesi, yatay mimari, kendi bahçe/zeytinyağı üretimi,
konum ve mesafeler (`facility.distances`), İda Dağı–Afrodit mitolojisine
kısa gönderme (tam hikâye haberde, oraya bağlanıyor), tesis fotoğrafları.
Kuruluş yılı yazılmadı — hâlâ bilinmiyor.

**Karar: başlık bandı görselsiz, küçük fotoğraflar yalnızca kart
ızgarasında.** hakkimizda.jpg ve hakkimizda2.jpg 375 px, club-afrodit.jpg ve
mono-afrodit.jpg 600 px; yarım genişlikte gerilirlerdi. Photo.tsx'teki
"hiçbir görsel doğal genişliğinin üstünde gösterilmez" kuralına uyuldu.

### Menü: 8 madde sığmadı, eşik yükseltildi
Ölçüm: 1200 px'te menü 88 px taşıyor ve yatay kaydırma açıyordu.
**Menüden madde çıkarılmadı** (kullanıcı bunun için sorulmasını istemişti).
Bunun yerine yatay menü eşiği 75rem → **84rem (1344 px)** yapıldı ve menü
boşlukları sıkılaştırıldı; 84rem üstünde `min-width: 48px` dokunma hedefi
kuralı kaldırıldı (o eşikte fare kullanılıyor).
80rem (1280 px) denendi ama Türkçe menü tam kenara dayanıyordu, gutter
kalmıyordu. 84rem'de Türkçe 55 px, Almanca 72 px boşluk kalıyor.
1366 px laptoplar hâlâ yatay menü görüyor.

`scripts/check.mjs` beklenen sayfa sayısı 21 → 24 güncellendi.

### Doğrulananlar (canlı: afrodit-web.pages.dev)
- `npm run check` — altı ölçüt de geçti, 24 sayfa + 404.
- 24 adresin hepsi 200; sitemap 24 kayıt.
- Üç dilde Hakkımızda açılıyor; canonical, dört hreflang (tr/en/de/
  x-default), kendi başlığı ve açıklaması doğru.
- Anasayfadaki uzun paragraf artık yalnızca Hakkımızda'da (imza cümlesi
  anasayfada 0, Hakkımızda'da 1 kez).
- Üç dilde WhatsApp düğmesi görünüyor, adı doğru, hedefi wa.me.
- "Yukarı çık": sayfa başında ve 300 px'te gizli, bir ekran boyu sonra
  beliriyor; tıklayınca başa dönüyor, düğme kayboluyor, odak `main`'e
  geçiyor. Hareket azaltma taklit edilerek ölçüldü: 60 ms içinde scrollY 0
  — doğrudan atlıyor, yumuşak kaydırma yapmıyor.
- İki video da üç dilde anasayfada, başlıkları ve hedefleri doğru.
  Sayfa açılışında ağ kaydında **YouTube'a sıfır istek** (6 istek, hepsi
  kendi alan adımızdan); üretilen HTML'de iframe ve ytimg izi yok.
- 360 / 768 / 1200 / 1344 / 1440 px: yatay kaydırma yok, taşan öğe yok,
  8 menü maddesi korunuyor. 1200 ve altı hamburger.
- Sabit düğmelerin metin örtmesi 360 px'te satır bazında ölçüldü: telif
  satırı artık örtülmüyor.
- Klavye: WhatsApp, "yukarı çık" ve Hakkımızda menü bağlantısı sekme
  sırasında ve odaklanabiliyor.
- JavaScript kapalı: statik HTML'de Hakkımızda'nın 9 başlığı, 6 paragrafı
  ve 6 mesafe satırı var — sunucuda önceden üretiliyor.

### Ölçülemedi
Chrome eklentisinin tuş gönderimi bu oturumda sayfaya ulaşmadı (birkaç
denemede odak yerinde kaldı). Klavye erişimi DOM düzeyinde doğrulandı
(öğeler sekme sırasında, odaklanabiliyor, gerçek `<a>`/`<button>`), ama
Tab tuşuyla sırayla gezinme elle test edilmeli.
