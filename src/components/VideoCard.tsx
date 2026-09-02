import Photo from './Photo'
import Icon from './Icon'

/**
 * Video kartı — gömülü oynatıcı değil, kapak görseli.
 *
 * YouTube'un kendi iframe'i (ve thumbnail adresi) her sayfa açılışında dış
 * istek demek. Kapak yerel bir fotoğraf; tıklayınca video YouTube'da yeni
 * sekmede açılıyor. Bağlantının erişilebilir adı görünür başlıktan geliyor,
 * o yüzden kapak görseli dekoratif (alt boş).
 */
export default function VideoCard({
  title,
  cover,
  href,
}: {
  title: string
  cover: string
  href: string
}) {
  return (
    <a className="video-card" href={href} target="_blank" rel="noreferrer">
      <span className="video-card__media">
        <Photo src={cover} alt="" ratio="16/9" sizes="(max-width: 52rem) 100vw, 50vw" />
        <span className="video-card__play" aria-hidden="true">
          <Icon name="youtube" />
        </span>
      </span>
      <span className="video-card__title">{title}</span>
    </a>
  )
}
