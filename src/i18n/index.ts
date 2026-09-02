import { createContext, useContext } from 'react'
import { tr } from './tr'
import { en } from './en'
import { de } from './de'
import type { Dict } from './tr'

export type Lang = 'tr' | 'en' | 'de'

export const LANGS: Lang[] = ['tr', 'en', 'de']
export const DEFAULT_LANG: Lang = 'tr'

export const dictionaries: Record<Lang, Dict> = { tr, en, de }

const STORAGE_KEY = 'afrodit.lang'

export function isLang(value: unknown): value is Lang {
  return typeof value === 'string' && (LANGS as string[]).includes(value)
}

/** URL'in ilk parçasından dili okur, yoksa null döner. */
export function langFromPath(pathname: string): Lang | null {
  const first = pathname.split('/').filter(Boolean)[0]
  return isLang(first) ? first : null
}

/** Tarayıcı ve kayıtlı tercihe bakarak başlangıç dilini belirler. */
export function detectLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (isLang(saved)) return saved
  } catch {
    // localStorage kapalı olabilir (gizli sekme, izin); sorun değil
  }

  try {
    for (const nav of navigator.languages ?? [navigator.language]) {
      const code = nav?.slice(0, 2).toLowerCase()
      if (isLang(code)) return code
    }
  } catch {
    // navigator yoksa varsayılana düş
  }

  return DEFAULT_LANG
}

export function rememberLang(lang: Lang): void {
  try {
    localStorage.setItem(STORAGE_KEY, lang)
  } catch {
    // yazılamazsa sessizce geç
  }
}

/** Aynı sayfada kalarak dili değiştiren yol üretir: /tr/odalar -> /en/odalar */
export function pathWithLang(pathname: string, lang: Lang): string {
  const parts = pathname.split('/').filter(Boolean)
  if (isLang(parts[0])) parts[0] = lang
  else parts.unshift(lang)
  return '/' + parts.join('/')
}

type I18nValue = { lang: Lang; t: Dict }

export const I18nContext = createContext<I18nValue>({ lang: DEFAULT_LANG, t: tr })

export function useI18n(): I18nValue {
  return useContext(I18nContext)
}

/** Dile göre önek eklenmiş yol üretir: path('odalar') -> /tr/odalar */
export function useLangPath(): (path?: string) => string {
  const { lang } = useI18n()
  return (path = '') => `/${lang}${path ? `/${path.replace(/^\//, '')}` : ''}`
}

export type { Dict }
