import Section from '../components/Section'
import PhotoZoom from '../components/PhotoZoom'
import Reveal from '../components/Reveal'
import Placeholder from '../components/Placeholder'
import PageHead from '../components/PageHead'
import { useI18n } from '../i18n'
import type { Dict } from '../i18n'
import { amenityGroups } from '../content/amenities'

type GroupCopy = { title: string; body: string } & Record<string, string>

export default function Amenities() {
  const { t } = useI18n()

  return (
    <>
      <PageHead
        title={t.amenities.pageTitle}
        lead={t.amenities.pageLead}
        image="/img/club-afrodit.jpg"
      />

      {amenityGroups.map((group, index) => {
        const copy = t.amenityGroups[group.id as keyof Dict['amenityGroups']] as GroupCopy

        return (
          <Section key={group.id} id={group.id} tone={index % 2 === 1 ? 'alt' : 'default'}>
            <div className={`split${index % 2 === 1 ? ' split--reverse' : ''}`}>
              <div className="split__text">
                <Reveal>
                  <h2 className="section__title">{copy.title}</h2>
                </Reveal>
                <p>{copy.body}</p>
                <ul className="checklist">
                  {group.items.map((key) => (
                    <li key={key}>{copy[key]}</li>
                  ))}
                </ul>
              </div>
              <Reveal className="split__media">
                {group.image ? (
                  <PhotoZoom images={[group.image]} alt={copy.title} ratio="4/3" />
                ) : (
                  <Placeholder label={`${copy.title} — yatay`} ratio="4/3" />
                )}
              </Reveal>
            </div>
          </Section>
        )
      })}

      <Section narrow>
        <p className="todo-note">{t.amenities.conceptTodo}</p>
      </Section>
    </>
  )
}
