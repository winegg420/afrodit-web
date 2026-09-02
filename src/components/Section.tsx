import type { ReactNode } from 'react'

type SectionProps = {
  id?: string
  title?: string
  lead?: string
  children: ReactNode
  /** Zemin rengi değişimi ile bölümleri ayırır */
  tone?: 'default' | 'alt' | 'deep'
  narrow?: boolean
  className?: string
}

export default function Section({
  id,
  title,
  lead,
  children,
  tone = 'default',
  narrow = false,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`section section--${tone}${className ? ` ${className}` : ''}`}
    >
      <div className={`container${narrow ? ' container--narrow' : ''}`}>
        {(title || lead) && (
          <header className="section__head">
            {title && <h2 className="section__title">{title}</h2>}
            {lead && <p className="section__lead">{lead}</p>}
          </header>
        )}
        {children}
      </div>
    </section>
  )
}
