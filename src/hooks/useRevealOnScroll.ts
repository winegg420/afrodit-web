import { useEffect } from 'react'

/**
 * Sayfadaki `[data-reveal]` öğelerini izler, ekrana girdiklerinde
 * `gorunur` sınıfı ekler ve izlemeyi bırakır — yani her öğe bir kere
 * belirir, yukarı kaydırınca kaybolmaz.
 *
 * Kaydırma olayı dinlenmiyor; IntersectionObserver kullanılıyor.
 */
export function useRevealOnScroll(routeKey: string): void {
  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>('[data-reveal]:not(.gorunur)'),
    )

    if (nodes.length === 0) return

    // Tarayıcı desteklemiyorsa ya da hareket kapalıysa hepsini göster.
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (typeof IntersectionObserver === 'undefined' || reduced) {
      for (const node of nodes) node.classList.add('gorunur')
      return
    }

    // Gözlemcinin hiç haber verip vermediğini izler.
    let delivered = false

    const observer = new IntersectionObserver(
      (entries) => {
        delivered = true
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('gorunur')
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
    )

    for (const node of nodes) observer.observe(node)

    // Güvenlik ağı: gözlemci HİÇ çalışmadıysa (kısıtlanmış sekme, eski
    // tarayıcı) içerik kalıcı olarak gizli kalmasın. Normal durumda
    // gözlemci ilk turda haber verir, bu ağ devreye girmez ve animasyon
    // kaydırdıkça oynamaya devam eder.
    const safety = window.setTimeout(() => {
      if (delivered) return
      for (const node of nodes) node.classList.add('gorunur')
    }, 2500)

    return () => {
      window.clearTimeout(safety)
      observer.disconnect()
    }
  }, [routeKey])
}
