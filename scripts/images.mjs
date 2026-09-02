/**
 * Görsel derleme adımı.
 *
 * public/img altındaki her JPEG/PNG için:
 *   - WebP karşılığını üretir (aynı ada, .webp uzantısıyla)
 *   - 640 / 1024 / 1920 piksel genişliğinde sürümler üretir (asla büyütmez)
 *   - src/generated/images.ts içine ölçü ve sürüm listesini yazar
 *
 * Orijinal dosyalara dokunulmaz. Çıktı dosyası kaynaktan yeniyse atlanır,
 * böylece tekrarlanan derlemeler hızlı olur.
 */
import { readdirSync, statSync, existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { dirname, extname, join, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const imgDir = join(root, 'public', 'img')
const outFile = join(root, 'src', 'generated', 'images.ts')

/** Üretilecek genişlikler. Kaynaktan büyük olanlar atlanır. */
const WIDTHS = [640, 1024, 1920]

/** Bu genişliğin altındaki görseller için ek boyut üretilmez. */
const MIN_FOR_VARIANTS = 900

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

/** Kaynak dosya çıktıdan yeniyse yeniden üretilmeli. */
function stale(source, target) {
  if (!existsSync(target)) return true
  return statSync(source).mtimeMs > statSync(target).mtimeMs
}

async function main() {
  if (!existsSync(imgDir)) {
    throw new Error('public/img bulunamadı.')
  }

  const files = walk(imgDir).filter((p) =>
    ['.jpg', '.jpeg', '.png'].includes(extname(p).toLowerCase()),
  )

  /** @type {Record<string, {w:number,h:number,webp:string|null,variants:Array<{w:number,jpg:string,webp:string}>}>} */
  const manifest = {}
  let uretilen = 0

  for (const file of files) {
    const image = sharp(file, { failOn: 'none' })
    const meta = await image.metadata()
    if (!meta.width || !meta.height) continue

    const ext = extname(file)
    const base = file.slice(0, -ext.length)
    const entry = { w: meta.width, h: meta.height, webp: null, variants: [] }

    // Tam boy WebP
    const webpFull = `${base}.webp`
    if (stale(file, webpFull)) {
      await sharp(file).webp({ quality: 78, effort: 5 }).toFile(webpFull)
      uretilen += 1
    }
    entry.webp = webPath(webpFull)

    // Ölçekli sürümler — yalnızca yeterince büyük görseller için
    if (meta.width >= MIN_FOR_VARIANTS) {
      for (const w of WIDTHS) {
        if (w >= meta.width) continue

        const jpgOut = `${base}-${w}.jpg`
        const webpOut = `${base}-${w}.webp`

        if (stale(file, jpgOut)) {
          await sharp(file).resize({ width: w }).jpeg({ quality: 80, mozjpeg: true }).toFile(jpgOut)
          uretilen += 1
        }
        if (stale(file, webpOut)) {
          await sharp(file).resize({ width: w }).webp({ quality: 74, effort: 5 }).toFile(webpOut)
          uretilen += 1
        }

        entry.variants.push({
          w,
          jpg: webPath(jpgOut),
          webp: webPath(webpOut),
        })
      }
    }

    // En son tam boy da bir seçenek olarak listeye girsin
    entry.variants.push({ w: meta.width, jpg: webPath(file), webp: entry.webp })

    manifest[webPath(file)] = entry
  }

  mkdirSync(dirname(outFile), { recursive: true })

  const body = `/* OTOMATİK ÜRETİLDİ — elle düzenleme. Kaynak: scripts/images.mjs */

export type ImageVariant = { w: number; jpg: string; webp: string }
export type ImageInfo = { w: number; h: number; webp: string | null; variants: ImageVariant[] }

export const images: Record<string, ImageInfo> = ${JSON.stringify(manifest, null, 2)}
`

  writeFileSync(outFile, body, 'utf8')
  console.log(
    `Görseller hazır: ${files.length} kaynak, ${uretilen} yeni dosya üretildi, manifest ${Object.keys(manifest).length} kayıt.`,
  )
}

main().catch((error) => {
  console.error('Görsel derleme başarısız:', error)
  process.exit(1)
})
