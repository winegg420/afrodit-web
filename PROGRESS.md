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
