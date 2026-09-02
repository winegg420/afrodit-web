import { useEffect } from 'react'

/**
 * Sayfadaki `[data-reveal]` öğelerini izler, ekrana girdiklerinde
 * `is-visible` sınıfı ekler ve izlemeyi bırakır — yani her öğe bir kere
 * belirir, yukarı kaydırınca kaybolmaz.
 *
 * Kaydırma olayı dinlenmiyor; IntersectionObserver kullanılıyor.
 */
export function useRevealOnScroll(routeKey: string): void {
  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-visible)'),
    )

    if (nodes.length === 0) return

    // Tarayıcı desteklemiyorsa ya da hareket kapalıysa hepsini göster.
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (typeof IntersectionObserver === 'undefined' || reduced) {
      for (const node of nodes) node.classList.add('is-visible')
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
    )

    for (const node of nodes) observer.observe(node)

    // Güvenlik ağı: gözlemci hiç tetiklenmediyse (kısıtlanmış sekme, eski
    // tarayıcı) içerik kalıcı olarak gizli kalmasın.
    const safety = window.setTimeout(() => {
      const stillHidden = nodes.filter((node) => !node.classList.contains('is-visible'))
      if (stillHidden.length === nodes.length) {
        for (const node of stillHidden) node.classList.add('is-visible')
      }
    }, 2500)

    return () => {
      window.clearTimeout(safety)
      observer.disconnect()
    }
  }, [routeKey])
}
