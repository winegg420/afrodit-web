import Section from '../components/Section'
import Gallery from '../components/Gallery'
import Photo from '../components/Photo'
import PageHead from '../components/PageHead'
import { useI18n } from '../i18n'
import type { Dict } from '../i18n'
import { rooms } from '../content/rooms'
import { facility } from '../content/facility'

type RoomCopy = { title: string; summary: string; body: string; body2?: string }

export default function Rooms() {
  const { t } = useI18n()

  return (
    <>
      <PageHead
        title={t.rooms.pageTitle}
        lead={t.rooms.pageLead}
        image="/img/apart-daireler.jpg"
      />

      {rooms.map((room, index) => {
        const copy = t.rooms[room.id as keyof Dict['rooms']] as RoomCopy
        const unit = room.id === 'apart' ? t.rooms.unitApart : t.rooms.unit

        return (
          <Section key={room.id} id={room.slug} tone={index % 2 === 1 ? 'alt' : 'default'}>
            <article className="room">
              <div className="room__intro">
                <h2 className="section__title">{copy.title}</h2>
                <p className="room__summary">{copy.summary}</p>
                <p>{copy.body}</p>
                {copy.body2 && <p>{copy.body2}</p>}

                <dl className="specs">
                  <div className="specs__row">
                    <dt>{t.rooms.capacity}</dt>
                    <dd>
                      {room.capacityKey ? (
                        t.rooms.capacityLabels[room.capacityKey]
                      ) : (
                        <>
                          {room.capacity.min === room.capacity.max
                            ? room.capacity.max
                            : `${room.capacity.min}–${room.capacity.max}`}{' '}
                          {t.rooms.people}
                        </>
                      )}
                    </dd>
                  </div>
                  <div className="specs__row">
                    <dt>{t.rooms.size}</dt>
                    <dd>
                      {room.size.min === room.size.max
                        ? room.size.max
                        : `${room.size.min}–${room.size.max}`}{' '}
                      m²
                    </dd>
                  </div>
                  {room.count !== null && (
                    <div className="specs__row">
                      <dt>{t.rooms.count}</dt>
                      <dd>
                        {room.count} {unit}
                      </dd>
                    </div>
                  )}
                </dl>

                <h3 className="room__subtitle">{t.rooms.featuresTitle}</h3>
                <ul className="tags">
                  {room.features.map((key) => (
                    <li className="tag" key={key}>
                      {t.roomFeatures[key as keyof Dict['roomFeatures']]}
                    </li>
                  ))}
                </ul>

                <a
                  className="btn"
                  href={facility.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t.actions.reserveLong}
                </a>
              </div>

              <div className="room__media">
                <Photo src={room.cover} alt={copy.title} ratio="3/2" />
              </div>
            </article>

            <Gallery
              images={room.gallery}
              altPrefix={copy.title}
              label={`${copy.title} — ${t.rooms.galleryTitle}`}
            />
          </Section>
        )
      })}

      <Section narrow>
        <p className="todo-note">{t.rooms.note}</p>
      </Section>
    </>
  )
}
