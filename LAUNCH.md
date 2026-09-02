# Yayın öncesi kontrol listesi

Üstten aşağı takip et. Her maddede **ne yapılacak**, **hangi dosya** ve
**kim yapabilir** yazılı.

- **Sen** = siteyi kuran kişi (kod değişikliği)
- **İşletme** = Club Afrodit yetkilisi (bilgi veya fotoğraf sağlar)

İşletmeden istenecek her şey ayrıca `ISLETME-SORULARI.md` içinde, olduğu
gibi iletilebilecek sade bir dille yazılı. **Bu listeye başlamadan önce o
dosyayı işletmeye gönder** — cevaplar gelene kadar diğer adımlarla
ilerleyebilirsin.

---

## A — Başlangıç (5 dakika)

- [ ] **A1. Ortamı kur.** `nvm use` (veya Node 24.18.0 kur), sonra `npm ci`.
      *Dosya:* `.nvmrc`, `package.json` → **Sen**
- [ ] **A2. Her şeyin hâlâ çalıştığını doğrula.** `npm run check` çalıştır,
      `TAMAM` yazmasını bekle. Düşen madde varsa önce onu çöz.
      *Dosya:* `scripts/check.mjs` → **Sen**
- [ ] **A3. `ISLETME-SORULARI.md` dosyasını işletmeye gönder.** Cevaplar
      B ve C bölümlerini açacak. → **Sen**

---

## B — İşletmeden cevap bekleyenler

Bu maddelerin hepsi kodda `TODO` olarak işaretli ve sitede o bilgi ya hiç
yok ya da "teyit bekliyor" notuyla duruyor. Cevap geldikçe işaretle.

### Metin ve bilgi

- [ ] **B1. Pansiyon konsepti** (oda+kahvaltı mı, yarım pansiyon mu).
      Şu an Olanaklar sayfasının altında "teyit edilmeyi bekliyor" notu var.
      *Dosya:* `src/content/facility.ts` (TODO), `src/i18n/*.ts` →
      `amenities.conceptTodo` → **İşletme** cevaplar, **Sen** yazarsın
- [ ] **B2. Giriş ve çıkış saatleri.** İletişim sayfasında not olarak duruyor.
      *Dosya:* `src/i18n/*.ts` → `contact.hoursTodo` → **İşletme + Sen**
- [ ] **B3. Fiyat gösterilecek mi?** Gösterilecekse nerede ve hangi biçimde.
      Şu an hiçbir yerde fiyat yok; JSON-LD'de `priceRange` alanı bilerek boş.
      *Dosya:* `src/seo.ts` (TODO) → **İşletme** karar verir
- [ ] **B4. Kuruluş yılı.** Sitede hiç geçmiyor.
      *Dosya:* `src/content/facility.ts` (TODO) → **İşletme + Sen**
- [ ] **B5. Oda sayıları ve metrekare teyidi.** Sayılar mevcut siteden alındı,
      doğrulanmadı. Odalar sayfasının altında not olarak duruyor.
      *Dosya:* `src/content/rooms.ts` (TODO), `src/i18n/*.ts` → `rooms.note`
      → **İşletme + Sen**
- [ ] **B6. Tenis kulübü bilinmeyenleri** — aydınlatma/gece oyunu, kort
      ücreti ve saatleri, antrenör, ekipman kiralama, lig ve turnuva takvimi,
      üyelik koşulları, %40 indirimin tam kapsamı. Şu an sayfada
      "aramanız gereken konular" listesi olarak duruyor.
      *Dosya:* `src/pages/Tennis.tsx` (TODO), `src/i18n/*.ts` →
      `tennis.unknowns` ve `tennis.todoNote` → **İşletme + Sen**
- [ ] **B7. Huzurevi ruhsat kapsamı.** Sayfadaki hastalık grupları ve ekip
      listesi ruhsatla birebir uyuşmalı. **Bu yayın öncesi zorunlu.**
      *Dosya:* `src/pages/Nursing.tsx` (TODO), `src/i18n/*.ts` →
      `nursing.complianceTodo` → **İşletme onaylar**
- [ ] **B8. Aeneas Hotel'in bu tesisle ilişkisi.** Mevcut sitede geçiyor ama
      ilişkisi belirsiz olduğu için yeni siteye hiç alınmadı. Alınacak mı?
      → **İşletme** karar verir
- [ ] **B9. Haber yayın tarihleri.** Haberlerde tarih gösterilmiyor.
      *Dosya:* `src/content/news.ts` (TODO) → **İşletme + Sen**

### Fotoğraf

- [ ] **B10. Sağlık kulübü fotoğrafı.** Hiç yok; Olanaklar sayfasında gri
      yer tutucu duruyor.
      *Dosya:* `src/content/amenities.ts` (TODO) → **İşletme**
- [ ] **B11. Mutfak / taş fırın / manzaralı teras fotoğrafı.** Hiç yok;
      Olanaklar ve anasayfada yer tutucu duruyor.
      *Dosya:* `src/content/amenities.ts` (TODO) → **İşletme**
- [ ] **B12. Yüksek çözünürlüklü fotoğraflar (en az 1400 piksel).**
      Eldeki oda fotoğrafları 800 px, tenis kortu 600 px, huzurevi 1200 px.
      Bu yüzden Odalar ve Tenis sayfalarının başlık bantları görselsiz.
      *Dosya:* `src/components/Photo.tsx` (TODO listesi burada),
      `src/pages/Rooms.tsx` (TODO), `src/pages/Tennis.tsx` (TODO)
      → **İşletme**

---

## C — Cevaplar geldikten sonra

- [ ] **C1. Gelen bilgileri siteye işle.** B bölümündeki her cevap için ilgili
      `TODO` notunu kaldır ve gerçek bilgiyi yaz. Metinleri **üç dilde de**
      güncelle (`tr.ts`, `en.ts`, `de.ts`) — biri eksik kalırsa derleme hata
      verir. → **Sen**
- [ ] **C2. Gelen fotoğrafları ekle.** `public/img/` altına koy,
      `npm run build:images` çalıştır, alt metnini `src/i18n/photoAlts.ts`
      içine üç dilde yaz. Yer tutucuları gerçek fotoğrafla değiştir.
      → **Sen**
- [x] **C3. Renk paletini seç.** ~~Yapıldı (2026-09-02):~~ **Palet A —
      "Toprak Kort"** seçildi ve uygulandı. `src/styles/tokens.css` artık
      kalıcı paleti içeriyor, "GEÇİCİ" notu kalktı;
      `src/styles/layout.css` içindeki `.tone-calm` da sıcak paletle
      uyumlu hale getirildi. Seçilmeyen öneri `design/palet-b-ege.css`
      içinde duruyor.
      *Dosya:* `src/styles/tokens.css`, `src/styles/layout.css` → **bitti**

---

## D — Yayın adresi ve derleme

- [ ] **D1. Alan adını yaz.** `src/config.ts` içindeki `FALLBACK` değerini
      gerçek adresle değiştir (sonda eğik çizgi olmadan).
      *Dosya:* `src/config.ts` (TODO) → **Sen**
- [ ] **D2. `npm run build` çalıştır.** Hata vermemeli.  → **Sen**
- [ ] **D3. 21 sayfa çıktığını doğrula.**
      `find dist -name "*.html" | wc -l` → **21** olmalı.
      Ya da tek komutta: `npm run check` → `TAMAM`. → **Sen**
- [ ] **D4. Adreslerin doğru yazıldığını gözle kontrol et.**
      `dist/tr/index.html` içindeki `canonical`, `hreflang` ve `og:url`
      etiketleri D1'de yazdığın adresi göstermeli. → **Sen**
- [ ] **D5. `dist/robots.txt` ve `dist/sitemap.xml` dosyalarını aç,**
      içlerindeki adres doğru mu bak. → **Sen**

---

## E — Cloudflare Pages

> Bu bölümdeki yönlendirme, 404 ve adres davranışları
> `npx wrangler pages dev dist` ile **yerelde birebir taklit edilip
> doğrulandı** (2026-09-02): 13 yönlendirme kuralı okundu, 21 adres 200
> verdi, eski adresler 301 ile yenilerine gitti, bilinmeyen adres 404 ile
> "Sayfa bulunamadı" sayfasını gösterdi. Yine de gerçek dağıtımdan sonra
> tekrar bakılmalı.

- [ ] **E1. Depoyu Cloudflare Pages'e bağla.**
      Derleme komutu: `npm run build` · Çıktı klasörü: `dist`
      Node sürümü: `NODE_VERSION=24.18.0` ortam değişkeni olarak gir
      (`.nvmrc` de var ama açıkça yazmak daha güvenli). → **Sen**
- [ ] **E2. İlk dağıtımı yap ve önizleme adresini aç.** → **Sen**
- [ ] **E3. `_redirects` çalışıyor mu bak.** Kök adresi (`/`) aç —
      `/tr` sayfasına gitmeli. `dist/index.html` bilerek üretilmiyor,
      bu yönlendirme onun yerine geçiyor.
      *Dosya:* `public/_redirects` → **Sen**
- [ ] **E4. Olmayan bir adres dene** (örn. `/tr/yok-boyle-sayfa`) —
      "Sayfa bulunamadı" sayfası görünmeli, boş ekran değil. Derleme
      `dist/404.html` üretiyor; Cloudflare Pages eşleşmeyen her yolda onu
      404 durumuyla sunar. → **Sen**
- [ ] **E5. Üç dilin de açıldığını doğrula:** `/tr`, `/en`, `/de` ve
      alt sayfaları. → **Sen**
- [ ] **E6. Alan adını bağla** ve HTTPS'in çalıştığını gör. → **Sen**

---

## F — Arama motoru

- [ ] **F1. Google Search Console'a siteyi ekle** ve alan adı sahipliğini
      doğrula. → **Sen**
- [ ] **F2. Sitemap gönder:** `https://<alan-adı>/sitemap.xml` → **Sen**
- [ ] **F3. Üç dilin doğru eşleştiğini kontrol et.** Search Console →
      Uluslararası hedefleme / hreflang raporu. İlk taramadan sonra bakılır.
      → **Sen**
- [ ] **F4. Paylaşım görünümünü sına.** Site adresini WhatsApp'ta kendine
      gönder — başlık, açıklama ve fotoğraf görünmeli. Facebook için
      Sharing Debugger, Twitter/X için Card Validator kullanılabilir.
      → **Sen**
- [ ] **F5. Yapılandırılmış veriyi sına.** Google Rich Results Test'e
      anasayfa adresini ver — `LodgingBusiness` hatasız okunmalı. → **Sen**

---

## G — Gerçek cihazda test

Bu bölüm bilgisayarda yapılamaz, gerçek telefon gerekir.

- [ ] **G1. Telefon bağlantısı.** İletişim sayfasındaki numaralara dokun —
      telefon uygulaması numarayla açılmalı. → **Sen**
- [ ] **G2. WhatsApp bağlantısı.** "Rezervasyon" butonuna dokun —
      WhatsApp doğru numarayla açılmalı. → **Sen**
- [ ] **G3. E-posta bağlantısı.** E-posta adresine dokun — posta uygulaması
      açılmalı. → **Sen**
- [ ] **G4. Hareket azaltma ayarıyla test et.**
      iPhone: Ayarlar → Erişilebilirlik → Hareket → Hareketi Azalt.
      Android: Ayarlar → Erişilebilirlik → Animasyonları kaldır.
      Açtıktan sonra siteyi gez: açılış görselinin yavaş yakınlaşması,
      kademeli giriş, aşağı okunun hareketi ve kaydırınca belirme
      **durmalı**; bütün metinler görünür kalmalı.
      *Dosya:* `src/styles/motion.css` sonundaki
      `@media (prefers-reduced-motion: reduce)` bloğu → **Sen**
- [ ] **G5. Galeriyi parmakla dene.** Bir fotoğrafa dokun, sağa sola kaydır,
      kapat. Arkadaki sayfa kaymamalı. → **Sen**
- [ ] **G6. Menüyü dene.** Hamburger menü açılıp kapanmalı, bir bağlantıya
      dokununca kapanmalı. → **Sen**
- [ ] **G7. Yavaş bağlantıda aç.** Mobil veriyle, önbelleksiz. Açılış
      fotoğrafı hızlı gelmeli, sayfa yüklenirken zıplamamalı. → **Sen**

---

## H — Yayın sonrası

- [ ] **H1. Mevcut siteden yönlendirme.** clubafrodit.com'daki eski sayfalar
      yeni adreslere yönlendirilecek mi? Karar ve uygulama gerekiyor.
      → **İşletme + Sen**
- [ ] **H2. `npm run check` komutunu ayda bir çalıştır.** Bağımlılık
      güncellemelerinden sonra bir şeyin bozulmadığını gösterir. → **Sen**

---

## Koddaki TODO notlarıyla eşleşme

Kodda 12 satır `TODO` geçiyor (çeviri işaretleri hariç). Aşağıda hepsinin
bu listedeki karşılığı var. Palet TODO'su 2026-09-02'de kapandı.

| # | Dosya | Konu | Madde |
|---|---|---|---|
| 1 | `src/components/Photo.tsx` | Yüksek çözünürlüklü fotoğraf listesi | B12 |
| 2 | `src/config.ts` | Alan adı | D1 |
| 3 | `src/content/amenities.ts` | Sağlık kulübü fotoğrafı yok | B10 |
| 4 | `src/content/amenities.ts` | Mutfak fotoğrafı yok | B11 |
| 5 | `src/content/facility.ts` | Kuruluş yılı, pansiyon, saatler, fiyat, Aeneas | B1, B2, B3, B4, B8 |
| 6 | `src/content/news.ts` | Haber yayın tarihleri | B9 |
| 7 | `src/content/rooms.ts` | Oda sayısı ve metrekare teyidi | B5 |
| 8 | `src/pages/Nursing.tsx` | Ruhsat kapsamı uyumu | B7 |
| 9 | `src/pages/Rooms.tsx` | Başlık bandı için oda fotoğrafı | B12 |
| 10 | `src/pages/Tennis.tsx` | Kort fotoğrafı | B12 |
| 11 | `src/seo.ts` | Fiyat, yıldız, puan, giriş/çıkış saati | B2, B3 |
| 12 | `src/styles/global.css` | *(gerçek bir iş değil — `.todo-note` CSS sınıfının başlık yorumu)* | — |

Yani **11 gerçek iş maddesi + 1 yanlış eşleşme**. Hepsi yukarıdaki listede
karşılanıyor.
