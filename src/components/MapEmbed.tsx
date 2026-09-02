import { useEffect, useRef, useState } from 'react'
import Icon from './Icon'
import { useI18n } from '../i18n'
import { facility } from '../content/facility'

/**
 * Google haritası — ancak istenirse yüklenir.
 *
 * Harita her sayfanın altında duruyor. iframe'i doğrudan koymak her sayfa
 * açılışında yüz kilobaytlarca dış kaynak indirir ve mobilde yavaşlatır.
 * Onun yerine önce durağan bir yer tutucu çiziyoruz; gerçek çerçeve ancak
 * kullanıcı tıklayınca kuruluyor. Tıklanmadan Google'a tek istek gitmez.
 *
 * Yer tutucu <button> olduğu için klavye odağı ve Enter/Boşluk kendiliğinden
 * çalışır; elle tabindex veya tuş dinleyici gerekmiyor.
 */
export default function MapEmbed({ className }: { className?: string }) {
  const { t } = useI18n()
  const [open, setOpen] = useState(false)
  const frame = useRef<HTMLIFrameElement>(null)

  // Buton yerini çerçeveye bırakınca klavye odağı boşta kalmasın.
  useEffect(() => {
    if (open) frame.current?.focus()
  }, [open])

  const cls = className ? `map ${className}` : 'map'

  if (!open) {
    return (
      <button type="button" className={`${cls} map--closed`} onClick={() => setOpen(true)}>
        <span className="map__pin">
          <Icon name="pin" />
        </span>
        <span className="map__label">{t.actions.openMap}</span>
      </button>
    )
  }

  return (
    <div className={cls}>
      <iframe
        ref={frame}
        src={facility.mapEmbed}
        title={t.contact.mapAlt}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  )
}
