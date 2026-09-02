/**
 * Prerender adımı.
 *
 * `vite build` (istemci) bittikten sonra çalışır:
 *   1. dist/index.html şablonunu okur
 *   2. dist-ssr/entry-server.js içindeki render() ile her yolu HTML'e çevirir
 *   3. Her sayfaya kendi <head> etiketlerini yazar: başlık, açıklama,
 *      canonical, hreflang, Open Graph, Twitter kartı, JSON-LD
 *   4. dist/<dil>/<sayfa>/index.html olarak yazar
 *   5. sitemap.xml ve robots.txt üretir
 *   6. şablon olarak kullanılan dist/index.html'i siler
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

/** JSON-LD gövdesi </script> ile erken kapanmasın. */
function escapeJsonLd(value) {
  return String(value).replace(/</g, '\\u003c')
}

/** Sayfaya özel <head> etiketleri. */
function headTags(page) {
  // Arama motoruna kapalı sayfada (404) canonical, hreflang ve paylaşım
  // etiketleri anlamsız; yalnızca açıklama ve robots yazılır.
  if (page.noindex) {
    return [
      `    <meta name="description" content="${escapeHtml(page.description)}" />`,
      '    <meta name="robots" content="noindex" />',
    ].join('\n')
  }

  const lines = [
    `<meta name="description" content="${escapeHtml(page.description)}" />`,
    `<link rel="canonical" href="${escapeHtml(page.canonical)}" />`,
  ]

  for (const alt of page.alternates) {
    lines.push(
      `<link rel="alternate" hreflang="${alt.lang}" href="${escapeHtml(alt.url)}" />`,
    )
  }

  const xDefault = page.alternates.find((alt) => alt.lang === 'tr')
  if (xDefault) {
    lines.push(
      `<link rel="alternate" hreflang="x-default" href="${escapeHtml(xDefault.url)}" />`,
    )
  }

  lines.push(
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="Club Afrodit" />`,
    `<meta property="og:locale" content="${page.lang}" />`,
    `<meta property="og:title" content="${escapeHtml(page.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(page.description)}" />`,
    `<meta property="og:url" content="${escapeHtml(page.canonical)}" />`,
    `<meta property="og:image" content="${escapeHtml(page.ogImage)}" />`,
    `<meta property="og:image:width" content="${page.ogImageWidth}" />`,
    `<meta property="og:image:height" content="${page.ogImageHeight}" />`,
    `<meta property="og:image:alt" content="${escapeHtml(page.title)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(page.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(page.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(page.ogImage)}" />`,
  )

  if (page.jsonLd) {
    lines.push(
      `<script type="application/ld+json">${escapeJsonLd(page.jsonLd)}</script>`,
    )
  }

  return lines.map((line) => `    ${line}`).join('\n')
}

async function main() {
  if (!existsSync(templatePath)) {
    throw new Error('dist/index.html bulunamadı. Önce `vite build` çalışmalı.')
  }
  if (!existsSync(ssrEntry)) {
    throw new Error('dist-ssr/entry-server.js bulunamadı. Önce SSR derlemesi çalışmalı.')
  }

  const template = await readFile(templatePath, 'utf8')
  const { render, allPages, notFoundPage, sitemapXml, robotsTxt } = await import(
    pathToFileURL(ssrEntry).href
  )
  const pages = allPages()

  let written = 0
  const failures = []

  for (const page of pages) {
    try {
      const body = render(page.path)

      // Şablondaki preload satırı sayfaya göre ayarlanır: ilk ekran görseli
      // olan sayfalarda kalır (href güncellenir), diğerlerinde silinir.
      // Preload, srcset ile aynı adayı seçsin diye duyarlı yazılıyor; aksi
      // halde tarayıcı hem tam boy JPEG'i hem de küçük WebP'yi indirir.
      // type="image/webp" sayesinde WebP desteklemeyen tarayıcı bu satırı
      // atlar ve boşuna indirme yapmaz.
      const preload = !page.preloadImage
        ? ''
        : page.preloadSrcSet
          ? `<link rel="preload" as="image" type="image/webp" imagesrcset="${escapeHtml(page.preloadSrcSet)}" imagesizes="${escapeHtml(page.preloadSizes ?? '100vw')}" fetchpriority="high" />`
          : `<link rel="preload" as="image" href="${escapeHtml(page.preloadImage)}" />`

      const html = template
        .replace('<html lang="tr">', `<html lang="${page.lang}">`)
        .replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(page.title)}</title>`)
        .replace(/^\s*<link rel="preload" as="image"[^>]*>\n/m, preload ? `    ${preload}\n` : '')
        .replace('</head>', `${headTags(page)}\n  </head>`)
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

  // Statik barındırmada bilinmeyen adresler için tek bir 404 sayfası.
  // Cloudflare Pages eşleşmeyen her yolda bunu sunar. Site haritasına
  // girmez ve robots ile aramaya kapatılır.
  const bulunamadi = notFoundPage()
  const html404 = template
    .replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(bulunamadi.title)}</title>`)
    .replace(/^\s*<link rel="preload" as="image"[^>]*>\n/m, '')
    .replace('</head>', `${headTags(bulunamadi)}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${render('/tr/404')}</div>`)
    .replaceAll('fetchPriority="high"', 'fetchpriority="high"')
    // Dil değiştirici bu sayfada /en/404 gibi var olmayan adreslere işaret
    // ederdi; o dilin anasayfasına çeviriyoruz.
    .replace(/href="\/(tr|en|de)\/404"/g, 'href="/$1"')

  await writeFile(join(distDir, '404.html'), html404, 'utf8')

  await writeFile(join(distDir, 'sitemap.xml'), sitemapXml(pages), 'utf8')
  await writeFile(join(distDir, 'robots.txt'), robotsTxt(), 'utf8')

  // Şablon olarak kullanılan kök index.html'e artık gerek yok.
  // Kök adres yönlendirmesi public/_redirects dosyasıyla yapılıyor.
  await rm(templatePath)
  await rm(join(root, 'dist-ssr'), { recursive: true, force: true })

  console.log(`Prerender tamam: ${written} sayfa + 404.html, sitemap.xml ve robots.txt yazıldı.`)
}

main().catch((error) => {
  console.error('Prerender başarısız:', error)
  process.exit(1)
})
