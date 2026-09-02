/**
 * Sitenin yayın adresi.
 *
 * TODO: alan adı kesinleşmedi. Kesinleşince YALNIZCA burası değiştirilecek;
 * canonical, hreflang, Open Graph, sitemap.xml ve robots.txt hepsi buradan
 * okuyor. Sonda eğik çizgi olmamalı.
 *
 * Derleme sırasında `VITE_SITE_URL` ortam değişkeniyle geçici olarak
 * değiştirilebilir (örn. önizleme dağıtımları için).
 */
const FALLBACK = 'https://www.clubafrodit.com'

export const SITE_URL = (import.meta.env?.VITE_SITE_URL ?? FALLBACK).replace(/\/+$/, '')

/** Yol parçasını tam adrese çevirir: '/tr/odalar' -> 'https://.../tr/odalar' */
export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}
