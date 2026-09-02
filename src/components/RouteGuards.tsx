import { Navigate, Outlet, useParams } from 'react-router-dom'
import { DEFAULT_LANG, detectLang, isLang } from '../i18n'

/** /:lang parçasını doğrular; geçersizse varsayılan dile yönlendirir. */
export function LangGuard() {
  const { lang } = useParams()
  if (!isLang(lang)) return <Navigate to={`/${DEFAULT_LANG}`} replace />
  return <Outlet />
}

/** Kök adres: tarayıcı diline göre /tr, /en veya /de. */
export function RootRedirect() {
  return <Navigate to={`/${detectLang()}`} replace />
}
