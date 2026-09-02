/**
 * Oda özellikleri için ince çizgi ikonları.
 * Tanımı olmayan anahtar sade bir onay işaretine düşer — liste hiç bozulmaz.
 */
const PATHS: Record<string, string> = {
  internet: 'M2 8.5a15 15 0 0 1 20 0M5 12a11 11 0 0 1 14 0M8.5 15.5a6 6 0 0 1 7 0M12 19h.01',
  tv: 'M3 6h18v11H3zM8 21h8M12 17v4',
  ac: 'M3 5h18v7H3zM6 15v2M10 15v3M14 15v2M18 15v3',
  fridge: 'M6 3h12v18H6zM6 11h12M9 7v2M9 14v2',
  phone: 'M7 3h10v18H7zM10 18h4',
  balcony: 'M4 12h16v9H4zM4 16h16M9 12v9M15 12v9M12 3v6',
  minibar: 'M8 3h8l-1 6-3 2v7M9 20h6M8 6h8',
  hairdryer: 'M4 6h9a4 4 0 0 1 0 8H9l-1 6H5l1-6H4a4 4 0 0 1 0-8Z',
  view: 'M3 18h18M3 14l5-5 4 4 4-6 5 7M6 6h.01',
  family: 'M8 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM16 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM4 20v-4a4 4 0 0 1 8 0v4M14 20v-3a3 3 0 0 1 6 0v3',
  livingRoom: 'M4 11a2 2 0 0 1 4 0v3h8v-3a2 2 0 0 1 4 0v7H4zM6 18v2M18 18v2',
  safe: 'M4 4h16v16H4zM12 12h.01M14 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM17 8v8',
  roomService: 'M3 17h18M5 17a7 7 0 0 1 14 0M12 7V5M9 20h6',
  kitchen: 'M4 3h16v18H4zM4 9h16M8 5v2M12 5v2M9 13v4M15 13v4',
  privateEntrance: 'M5 3h10v18H5zM12 12h.01M17 8v8l4-4z',
  yearRound: 'M12 3v18M3 12h18M6 6l12 12M18 6 6 18',
  laundry: 'M4 3h16v18H4zM7 6h.01M10 6h.01M16 13a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z',
  bathroom: 'M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM7 12V6a2 2 0 0 1 4 0M7 19l-1 2M17 19l1 2',
  wardrobe: 'M4 3h16v18H4zM12 3v18M10 11v2M14 11v2',
  careBed: 'M3 18V9M3 13h13a4 4 0 0 1 4 4v1M21 18H3M8 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z',
  pin: 'M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11ZM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
  // Sosyal ağlar — markaların dolu logoları yerine sitenin ince çizgi
  // diline uyan hatları; dolu logolar bu ikon setinde yabancı duruyordu.
  instagram:
    'M7.6 3.5h8.8a4.1 4.1 0 0 1 4.1 4.1v8.8a4.1 4.1 0 0 1-4.1 4.1H7.6a4.1 4.1 0 0 1-4.1-4.1V7.6a4.1 4.1 0 0 1 4.1-4.1ZM16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM16.9 7.1h.01',
  facebook:
    'M7.6 3.5h8.8a4.1 4.1 0 0 1 4.1 4.1v8.8a4.1 4.1 0 0 1-4.1 4.1H7.6a4.1 4.1 0 0 1-4.1-4.1V7.6a4.1 4.1 0 0 1 4.1-4.1ZM15.4 7.8h-1.2a2 2 0 0 0-2 2v10.6M10.2 12.4h4.3',
  youtube:
    'M3.5 8.4a3.1 3.1 0 0 1 3.1-3.1h10.8a3.1 3.1 0 0 1 3.1 3.1v7.2a3.1 3.1 0 0 1-3.1 3.1H6.6a3.1 3.1 0 0 1-3.1-3.1ZM10.4 9.4 15 12l-4.6 2.6Z',
  whatsapp:
    'M3.4 20.6l1.3-4.2A8.1 8.1 0 1 1 7.7 19.3L3.4 20.6ZM9.2 8.6c0 3.4 2.8 6.2 6.2 6.2a1 1 0 0 0 1-1v-.8l-2-1-1 1a5.3 5.3 0 0 1-2.4-2.4l1-1-1-2h-.8a1 1 0 0 0-1 1Z',
  arrowUp: 'M12 19V5M6 11l6-6 6 6',
}

const FALLBACK = 'M5 12.5 9.5 17 19 7'

export default function Icon({ name }: { name: string }) {
  return (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={PATHS[name] ?? FALLBACK} />
    </svg>
  )
}
