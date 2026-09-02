import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { useRoutes } from 'react-router-dom'
import { routes } from './routes'
import { allPages, notFoundPage, redirectsTxt, sitemapXml, robotsTxt } from './seo'

function Router() {
  return useRoutes(routes)
}

/** Tek bir yolu statik HTML gövdesine çevirir. */
export function render(url: string): string {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <Router />
      </StaticRouter>
    </StrictMode>,
  )
}

export { allPages, notFoundPage, redirectsTxt, sitemapXml, robotsTxt }
