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
