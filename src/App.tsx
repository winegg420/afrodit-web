import { BrowserRouter, useRoutes } from 'react-router-dom'
import { routes } from './routes'

function Router() {
  return useRoutes(routes)
}

export default function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  )
}
