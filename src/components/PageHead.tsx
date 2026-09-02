import { useEffect } from 'react'
import { useI18n } from '../i18n'

type PageHeadProps = {
  title: string
  lead?: string
  /** Üst bant görseli; yoksa düz zeminli sade başlık gösterilir */
  image?: string | null
}

/** Sayfa başlığı bandı. Belge başlığını da günceller. */
export default function PageHead({ title, lead, image = null }: PageHeadProps) {
  const { t } = useI18n()

  useEffect(() => {
    document.title = `${title} — ${t.brand.name}`
  }, [title, t.brand.name])

  return (
    <section className={`page-head${image ? ' page-head--image' : ''}`}>
      {image && (
        <img
          className="page-head__image"
          src={image}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          decoding="async"
        />
      )}
      <div className="container page-head__content">
        <h1 className="page-head__title">{title}</h1>
        {lead && <p className="page-head__lead">{lead}</p>}
      </div>
    </section>
  )
}
