/**
 * Tek komutluk sağlık kontrolü: `npm run check`
 *
 * Sırayla derler ve sonucu altı ölçütle sınar. Hepsi geçerse "TAMAM" yazar,
 * geçmezse hangi maddenin düştüğünü söyler ve 1 ile çıkar.
 *
 * Amaç: aylar sonra tek komutla her şeyin hâlâ çalıştığını görmek.
 */
import { execSync } from 'node:child_process'
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs'
import { join, resolve, dirname, extname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')

const sonuclar = []

function adim(ad, calistir) {
  process.stdout.write(`  ${ad} ... `)
  try {
    const detay = calistir()
    console.log('tamam' + (detay ? ` (${detay})` : ''))
    sonuclar.push({ ad, gecti: true, detay })
  } catch (error) {
    const mesaj = error instanceof Error ? error.message : String(error)
    console.log('DÜŞTÜ')
    sonuclar.push({ ad, gecti: false, detay: mesaj.split('\n')[0] })
  }
}

function beklenen(kosul, mesaj) {
  if (!kosul) throw new Error(mesaj)
}

function walk(dir, filtre, out = []) {
  if (!existsSync(dir)) return out
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry)
    if (statSync(p).isDirectory()) walk(p, filtre, out)
    else if (filtre(p)) out.push(p)
  }
  return out
}

console.log('\nClub Afrodit — sağlık kontrolü\n')

// 1) Derleme
adim('derleme (npm run build)', () => {
  execSync('npm run build', { cwd: root, stdio: 'pipe' })
  return 'hatasız'
})

// 2) Lint
adim('lint (oxlint)', () => {
  const cikti = execSync('npx oxlint src', { cwd: root, stdio: 'pipe' }).toString()
  const uyari = /Found (\d+) warning/.exec(cikti)
  const hata = /Found (\d+) error/.exec(cikti)
  beklenen(!hata || hata[1] === '0', `oxlint hata verdi: ${hata?.[1]}`)
  beklenen(!uyari || uyari[1] === '0', `oxlint ${uyari?.[1]} uyarı verdi`)
  return 'uyarısız'
})

// 3) 21 rota sayfası + 404.html
adim('21 sayfa ve 404.html', () => {
  const hepsi = walk(dist, (p) => extname(p) === '.html')
  const dortYuzDort = hepsi.filter((p) => p.endsWith('404.html'))
  const rotalar = hepsi.filter((p) => !p.endsWith('404.html'))
  beklenen(rotalar.length === 21, `${rotalar.length} rota sayfası bulundu, 21 bekleniyordu`)
  beklenen(dortYuzDort.length === 1, 'dist/404.html yok')
  return '21 sayfa + 404.html'
})

// 4) sitemap.xml 21 kayıt
adim('sitemap.xml 21 kayıt', () => {
  const yol = join(dist, 'sitemap.xml')
  beklenen(existsSync(yol), 'dist/sitemap.xml yok')
  const kayit = (readFileSync(yol, 'utf8').match(/<url>/g) ?? []).length
  beklenen(kayit === 21, `${kayit} kayıt bulundu, 21 bekleniyordu`)
  return '21 url'
})

// 5) Ölçüsüz görsel yok
adim('her <img> ölçülü', () => {
  const sayfalar = walk(dist, (p) => extname(p) === '.html')
  const eksik = []
  for (const sayfa of sayfalar) {
    const html = readFileSync(sayfa, 'utf8')
    for (const etiket of html.match(/<img\b[^>]*>/g) ?? []) {
      if (!/\bwidth=/.test(etiket)) eksik.push(`${sayfa}: ${etiket.slice(0, 60)}`)
    }
  }
  beklenen(eksik.length === 0, `${eksik.length} görselde width yok — ilki: ${eksik[0] ?? ''}`)
  return '0 eksik'
})

// 6) Gizleyen tek CSS seçicisi .js-hazir .reveal
//    (JavaScript kapalıyken içeriğin görünür kalmasının güvencesi)
adim('opacity:0 yalnızca .js-hazir .reveal', () => {
  const cssler = walk(join(dist, 'assets'), (p) => extname(p) === '.css')
  beklenen(cssler.length > 0, 'dist/assets içinde CSS bulunamadı')

  const secililer = new Set()
  for (const dosya of cssler) {
    const css = readFileSync(dosya, 'utf8')
    for (const blok of css.match(/[^{}@]{0,120}\{[^{}]*opacity:0[^{}]*\}/g) ?? []) {
      const secici = blok.slice(0, blok.indexOf('{')).trim()
      // @keyframes içindeki 0% adımı bir seçici değil
      if (/^\d+%$/.test(secici) || secici === 'from') continue
      secililer.add(secici)
    }
  }

  const liste = [...secililer]
  beklenen(
    liste.length === 1 && liste[0] === '.js-hazir .reveal',
    `beklenmeyen seçici(ler): ${liste.join(' | ') || 'hiç yok'}`,
  )
  return liste[0]
})

console.log('')

const dusenler = sonuclar.filter((s) => !s.gecti)

if (dusenler.length === 0) {
  console.log('TAMAM — altı ölçütün hepsi geçti.\n')
  process.exit(0)
}

console.log(`DÜŞTÜ — ${dusenler.length} madde geçmedi:\n`)
for (const d of dusenler) console.log(`  - ${d.ad}: ${d.detay}`)
console.log('')
process.exit(1)
