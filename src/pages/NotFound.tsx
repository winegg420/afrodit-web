import { Link } from 'react-router-dom'
import Section from '../components/Section'
import PageHead from '../components/PageHead'
import { useI18n } from '../i18n'
import { useSectionPath } from '../hooks/useSectionPath'

export default function NotFound() {
  const { t } = useI18n()
  const path = useSectionPath()

  return (
    <>
      <PageHead title={t.notFound.title} lead={t.notFound.body} />
      <Section narrow>
        <Link className="btn" to={path()}>
          {t.actions.backHome}
        </Link>
      </Section>
    </>
  )
}
