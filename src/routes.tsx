import type { ReactElement } from 'react'
import type { RouteObject } from 'react-router-dom'
import Layout from './components/Layout'
import { RootRedirect } from './components/RouteGuards'
import { LANGS } from './i18n'
import { SECTION_KEYS, SLUGS } from './lib/paths'
import type { SectionKey } from './lib/paths'
import Home from './pages/Home'
import About from './pages/About'
import Rooms from './pages/Rooms'
import Amenities from './pages/Amenities'
import Tennis from './pages/Tennis'
import Nursing from './pages/Nursing'
import News from './pages/News'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

const SAYFALAR: Record<SectionKey, ReactElement> = {
  about: <About />,
  rooms: <Rooms />,
  amenities: <Amenities />,
  tennis: <Tennis />,
  nursing: <Nursing />,
  news: <News />,
  contact: <Contact />,
}

/**
 * Her dilin kendi adres ağacı var; adres parçaları o dilde
 * (/tr/odalar, /en/rooms, /de/zimmer). Bu yüzden tek bir `/:lang`
 * dalı yerine dil başına bir dal kuruluyor.
 */
export const routes: RouteObject[] = [
  { path: '/', element: <RootRedirect /> },

  ...LANGS.map((lang) => ({
    path: `/${lang}`,
    element: <Layout lang={lang} />,
    children: [
      { index: true, element: <Home /> },
      ...SECTION_KEYS.map((key) => ({
        path: SLUGS[lang][key],
        element: SAYFALAR[key],
      })),
      { path: '*', element: <NotFound /> },
    ],
  })),

  { path: '*', element: <RootRedirect /> },
]
