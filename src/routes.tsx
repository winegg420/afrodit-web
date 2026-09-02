import type { RouteObject } from 'react-router-dom'
import Layout from './components/Layout'
import { LangGuard, RootRedirect } from './components/RouteGuards'
import Home from './pages/Home'
import Rooms from './pages/Rooms'
import Amenities from './pages/Amenities'
import Tennis from './pages/Tennis'
import Nursing from './pages/Nursing'
import News from './pages/News'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

/** Sayfa yolları — üç dilde de aynı. */
export const SLUGS = {
  rooms: 'odalar',
  amenities: 'olanaklar',
  tennis: 'tenis',
  nursing: 'saglikli-yasam',
  news: 'haberler',
  contact: 'iletisim',
} as const

export const routes: RouteObject[] = [
  { path: '/', element: <RootRedirect /> },
  {
    path: '/:lang',
    element: <LangGuard />,
    children: [
      {
        element: <Layout />,
        children: [
          { index: true, element: <Home /> },
          { path: SLUGS.rooms, element: <Rooms /> },
          { path: SLUGS.amenities, element: <Amenities /> },
          { path: SLUGS.tennis, element: <Tennis /> },
          { path: SLUGS.nursing, element: <Nursing /> },
          { path: SLUGS.news, element: <News /> },
          { path: SLUGS.contact, element: <Contact /> },
          { path: '*', element: <NotFound /> },
        ],
      },
    ],
  },
  { path: '*', element: <RootRedirect /> },
]
