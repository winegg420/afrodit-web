/**
 * Görsel derleme adımı.
 *
 * public/img altındaki her JPEG/PNG için:
 *   - WebP karşılığını üretir (aynı ada, .webp uzantısıyla)
 *   - 640 / 1024 / 1920 piksel genişliğinde sürümler üretir (asla büyütmez)
 *   - src/generated/images.ts içine ölçü ve sürüm listesini yazar
 *
 * Orijinal dosyalara dokunulmaz.
 *
 * ATLAMA KURALI: kaynak dosyanın içerik özeti (sha256) önbellekte tutuluyor.
 * Özet değişmediyse ve beklenen çıktıların hepsi yerindeyse yeniden
 * üretilmiyor. Dosya tarihine bakılmıyor — kaynak değişip tarihi korunduğunda
 * (kopyalama, geri yükleme, git checkout) bayat çıktı kalıyordu.
 *
 * DOĞRULAMA: üretim bitince her sürümün gerçek genişliği adındaki sayıyla
 * karşılaştırılıyor. Uymayan varsa derleme hatayla duruyor; bayat veya
 * yanlış boyutlu dosya sessizce geçemez.
 */
import { createHash } from 'node:crypto'
import {
  readdirSync,
  statSync,
  existsSync,
  mkdirSync,
  writeFileSync,
  readFileSync,
} from 'node:fs'
import { dirname, extname, join, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const imgDir = join(root, 'public', 'img')
const outDir = join(root, 'src', 'generated')
const outFile = join(outDir, 'images.ts')
const cacheFile = join(outDir, 'images.cache.json')

/** Üretilecek genişlikler. Kaynaktan büyük olanlar atlanır. */
const WIDTHS = [640, 1024, 1920]

/** Bu genişliğin altındaki görseller için ek boyut üretilmez. */
const MIN_FOR_VARIANTS = 900

/**
 * Bu betiğin kendi ürettiği dosyalar (foo-640.jpg gibi). Kaynak olarak
 * yeniden işlenmemeleri gerekir; yoksa her derlemede "foo-1024-640.jpg"
 * gibi sürümün sürümü dosyalar birikir.
 */
const URETILEN = new RegExp(`-(${WIDTHS.join('|')})\\.(jpe?g|png)$`, 'i')

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry)
    if (statSync(p).isDirectory()) walk(p, out)
    else out.push(p)
  }
  return out
}

/** public/... yolunu siteye göre mutlak yola çevirir: /img/foo.jpg */
function webPath(absolute) {
  return '/' + absolute.slice(join(root, 'public').length + 1).split(sep).join('/')
}

function ozet(dosya) {
  return createHash('sha256').update(readFileSync(dosya)).digest('hex')
}

function onbellegiOku() {
  if (!existsSync(cacheFile)) return {}
  try {
    return JSON.parse(readFileSync(cacheFile, 'utf8'))
  } catch {
    // Bozuk önbellek: her şeyi yeniden üret.
    return {}
  }
}

async function main() {
  if (!existsSync(imgDir)) {
    throw new Error('public/img bulunamadı.')
  }

  const files = walk(imgDir).filter(
    (p) => ['.jpg', '.jpeg', '.png'].includes(extname(p).toLowerCase()) && !URETILEN.test(p),
  )

  const onbellek = onbellegiOku()
  const yeniOnbellek = {}

  /** @type {Record<string, {w:number,h:number,webp:string|null,variants:Array<{w:number,jpg:string,webp:string}>}>} */
  const manifest = {}
  /** Doğrulanacak sürümler: [dosya yolu, beklenen genişlik] */
  const dogrulanacak = []
  let uretilen = 0

  for (const file of files) {
    const meta = await sharp(file, { failOn: 'none' }).metadata()
    if (!meta.width || !meta.height) continue

    const ext = extname(file)
    const base = file.slice(0, -ext.length)
    const anahtar = webPath(file)
    const kaynakOzeti = ozet(file)

    // Bu kaynaktan çıkması gereken dosyalar
    const beklenen = [{ yol: `${base}.webp`, genislik: meta.width }]
    if (meta.width >= MIN_FOR_VARIANTS) {
      for (const w of WIDTHS) {
        if (w >= meta.width) continue
        beklenen.push({ yol: `${base}-${w}.jpg`, genislik: w })
        beklenen.push({ yol: `${base}-${w}.webp`, genislik: w })
      }
    }

    const ozetAyni = onbellek[anahtar] === kaynakOzeti
    const hepsiYerinde = beklenen.every((b) => existsSync(b.yol))
    const uretmeliyiz = !ozetAyni || !hepsiYerinde

    if (uretmeliyiz) {
      await sharp(file).webp({ quality: 78, effort: 5 }).toFile(`${base}.webp`)
      uretilen += 1

      if (meta.width >= MIN_FOR_VARIANTS) {
        for (const w of WIDTHS) {
          if (w >= meta.width) continue
          await sharp(file)
            .resize({ width: w })
            .jpeg({ quality: 80, mozjpeg: true })
            .toFile(`${base}-${w}.jpg`)
          await sharp(file)
            .resize({ width: w })
            .webp({ quality: 74, effort: 5 })
            .toFile(`${base}-${w}.webp`)
          uretilen += 2
        }
      }
    }

    dogrulanacak.push(...beklenen)
    yeniOnbellek[anahtar] = kaynakOzeti

    const entry = { w: meta.width, h: meta.height, webp: webPath(`${base}.webp`), variants: [] }
    if (meta.width >= MIN_FOR_VARIANTS) {
      for (const w of WIDTHS) {
        if (w >= meta.width) continue
        entry.variants.push({
          w,
          jpg: webPath(`${base}-${w}.jpg`),
          webp: webPath(`${base}-${w}.webp`),
        })
      }
    }
    entry.variants.push({ w: meta.width, jpg: anahtar, webp: entry.webp })
    manifest[anahtar] = entry
  }

  // --- Doğrulama: her sürümün gerçek genişliği adındaki sayıya eşit mi ---
  const uyusmazliklar = []
  for (const { yol, genislik } of dogrulanacak) {
    if (!existsSync(yol)) {
      uyusmazliklar.push(`${webPath(yol)} — dosya yok`)
      continue
    }
    const { width } = await sharp(yol).metadata()
    if (width !== genislik) {
      uyusmazliklar.push(`${webPath(yol)} — adında ${genislik}, gerçekte ${width}`)
    }
  }

  if (uyusmazliklar.length > 0) {
    console.error(`\nGörsel doğrulaması düştü — ${uyusmazliklar.length} uyuşmazlık:\n`)
    for (const satir of uyusmazliklar) console.error(`  - ${satir}`)
    console.error('\nÖnbelleği silip yeniden deneyin: src/generated/images.cache.json\n')
    process.exit(1)
  }

  mkdirSync(outDir, { recursive: true })

  const body = `/* OTOMATİK ÜRETİLDİ — elle düzenleme. Kaynak: scripts/images.mjs */

export type ImageVariant = { w: number; jpg: string; webp: string }
export type ImageInfo = { w: number; h: number; webp: string | null; variants: ImageVariant[] }

export const images: Record<string, ImageInfo> = ${JSON.stringify(manifest, null, 2)}
`

  writeFileSync(outFile, body, 'utf8')
  writeFileSync(cacheFile, JSON.stringify(yeniOnbellek, null, 2), 'utf8')

  console.log(
    `Görseller hazır: ${files.length} kaynak, ${uretilen} dosya üretildi, ` +
      `${dogrulanacak.length} sürüm doğrulandı (0 uyuşmazlık), manifest ${Object.keys(manifest).length} kayıt.`,
  )
}

main().catch((error) => {
  console.error('Görsel derleme başarısız:', error)
  process.exit(1)
})
