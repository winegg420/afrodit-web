import { Navigate } from 'react-router-dom'
import { detectLang } from '../i18n'

/** Kök adres: tarayıcı diline göre /tr, /en veya /de. */
export function RootRedirect() {
  return <Navigate to={`/${detectLang()}`} replace />
}
