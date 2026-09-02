import { images } from '../generated/images'
import type { ImageInfo } from '../generated/images'

export type ResolvedImage = {
  /** Yedek kaynak — WebP desteklemeyen tarayıcı bunu alır */
  src: string
  webpSrcSet: string
  jpgSrcSet: string
  width: number
  height: number
}

/**
 * Derleme sırasında üretilen manifestten görselin ölçülerini ve
 * boyut seçeneklerini çıkarır. Manifestte yoksa null döner; çağıran
 * bileşen o zaman düz <img> ya da yer tutucu gösterir.
 */
export function resolveImage(src: string | null): ResolvedImage | null {
  if (!src) return null

  const info: ImageInfo | undefined = images[src]
  if (!info) return null

  const sorted = [...info.variants].sort((a, b) => a.w - b.w)

  return {
    src,
    webpSrcSet: sorted.map((v) => `${v.webp} ${v.w}w`).join(', '),
    jpgSrcSet: sorted.map((v) => `${v.jpg} ${v.w}w`).join(', '),
    width: info.w,
    height: info.h,
  }
}
