/**
 * Prerender adımı.
 *
 * `vite build` (istemci) bittikten sonra çalışır:
 *   1. dist/index.html şablonunu okur
 *   2. dist-ssr/entry-server.js içindeki render() ile her yolu HTML'e çevirir
 *   3. dist/<dil>/<sayfa>/index.html olarak yazar
 *   4. şablon olarak kullanılan dist/index.html'i siler
 *
 * Böylece arama motoru ve JavaScript'siz istemci sayfayı hazır görür.
 */
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const distDir = join(root, 'dist')
const ssrEntry = join(root, 'dist-ssr', 'entry-server.js')
const templatePath = join(distDir, 'index.html')

/** HTML özniteliği/metni için kaçış. */
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

async function main() {
  if (!existsSync(templatePath)) {
    throw new Error('dist/index.html bulunamadı. Önce `vite build` çalışmalı.')
  }
  if (!existsSync(ssrEntry)) {
    throw new Error('dist-ssr/entry-server.js bulunamadı. Önce SSR derlemesi çalışmalı.')
  }

  const template = await readFile(templatePath, 'utf8')
  const { render, allPages } = await import(pathToFileURL(ssrEntry).href)
  const pages = allPages()

  let written = 0
  const failures = []

  for (const page of pages) {
    try {
      const body = render(page.path)

      // Şablondaki preload satırı sayfaya göre ayarlanır: ilk ekran görseli
      // olan sayfalarda kalır (href güncellenir), diğerlerinde silinir.
      const preload = page.preloadImage
        ? `<link rel="preload" as="image" href="${escapeHtml(page.preloadImage)}" />`
        : ''

      const html = template
        .replace('<html lang="tr">', `<html lang="${page.lang}">`)
        .replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(page.title)}</title>`)
        .replace(/^\s*<link rel="preload" as="image"[^>]*>\n/m, preload ? `    ${preload}\n` : '')
        .replace(
          '</head>',
          `  <meta name="description" content="${escapeHtml(page.description)}" />\n  </head>`,
        )
        .replace('<div id="root"></div>', `<div id="root">${body}</div>`)
        // React `fetchPriority` yazıyor; HTML'de öznitelik adları küçük harf
        // okunur ama araçlarla aranabilsin diye çıktıda küçültülüyor.
        .replaceAll('fetchPriority="high"', 'fetchpriority="high"')

      const outFile = join(distDir, page.path, 'index.html')
      await mkdir(dirname(outFile), { recursive: true })
      await writeFile(outFile, html, 'utf8')
      written += 1
    } catch (error) {
      failures.push(`${page.path}: ${error instanceof Error ? error.message : error}`)
    }
  }

  if (failures.length > 0) {
    console.error('Prerender edilemeyen sayfalar:')
    for (const line of failures) console.error(`  - ${line}`)
    process.exitCode = 1
    return
  }

  // Şablon olarak kullanılan kök index.html'e artık gerek yok.
  // Kök adres yönlendirmesi public/_redirects dosyasıyla yapılıyor.
  await rm(templatePath)
  await rm(join(root, 'dist-ssr'), { recursive: true, force: true })

  console.log(`Prerender tamam: ${written} sayfa yazıldı.`)
}

main().catch((error) => {
  console.error('Prerender başarısız:', error)
  process.exit(1)
})
