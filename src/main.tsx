import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './styles/global.css'
import App from './App.tsx'

// JavaScript çalışıyor işareti. Gizleyen animasyon kuralları yalnızca
// bu sınıf varken geçerli; böylece JS'siz sayfada içerik görünür kalır.
document.documentElement.classList.add('js')

const rootEl = document.getElementById('root')

if (!rootEl) {
  throw new Error('#root elemanı bulunamadı — index.html kontrol edilmeli.')
}

const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// Prerender edilmiş sayfalarda hazır HTML var; onu baştan çizmek yerine
// üstüne bağlanıyoruz. Geliştirmede (#root boş) normal şekilde kuruluyor.
if (rootEl.hasChildNodes()) {
  hydrateRoot(rootEl, app)
} else {
  createRoot(rootEl).render(app)
}
