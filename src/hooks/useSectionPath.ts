import { useI18n } from '../i18n'
import { sectionPath } from '../lib/paths'
import type { SectionKey } from '../lib/paths'

/**
 * Bulunulan dile göre bölüm yolu üretir.
 *   path()          -> /de
 *   path('rooms')   -> /de/zimmer
 */
export function useSectionPath(): (key?: SectionKey) => string {
  const { lang } = useI18n()
  return (key?: SectionKey) => sectionPath(lang, key)
}
