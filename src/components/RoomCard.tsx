import { Link } from 'react-router-dom'
import Photo from './Photo'
import { useI18n } from '../i18n'
import type { Dict } from '../i18n'
import type { Room } from '../content/rooms'

type RoomCardProps = {
  room: Room
  /** Kartın tıklandığında gideceği yol */
  to: string
}

/** Anasayfadaki oda kartı: fotoğraf, ad ve künye etiketleri. */
export default function RoomCard({ room, to }: RoomCardProps) {
  const { t } = useI18n()
  const copy = t.rooms[room.id as keyof Dict['rooms']] as { title: string }

  const capacity = room.capacityKey
    ? t.rooms.capacityLabels[room.capacityKey]
    : `${
        room.capacity.min === room.capacity.max
          ? room.capacity.max
          : `${room.capacity.min}–${room.capacity.max}`
      } ${t.rooms.people}`

  const size =
    room.size.min === room.size.max
      ? `${room.size.max} m²`
      : `${room.size.min}–${room.size.max} m²`

  const unit = room.id === 'apart' ? t.rooms.unitApart : t.rooms.unit

  return (
    <article className="room-card">
      <Link className="room-card__link" to={to}>
        <span className="room-card__media">
          <Photo src={room.cover} alt={copy.title} ratio="4/3" />
        </span>
        <span className="room-card__body">
          <span className="room-card__title">{copy.title}</span>
          <span className="chips">
            <span className="chip">{capacity}</span>
            <span className="chip">{size}</span>
            {room.count !== null && (
              <span className="chip">
                {room.count} {unit}
              </span>
            )}
          </span>
        </span>
      </Link>
    </article>
  )
}
