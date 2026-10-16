import { useId } from 'react'

/**
 * Drapeau dessiné en SVG inline.
 * On évite les emojis drapeaux, qui ne s'affichent pas comme des drapeaux
 * sur Windows (ils apparaissent sous forme de lettres).
 */
export function Flag({ code, className = 'h-4 w-6' }: { code: string; className?: string }) {
  return (
    <span className={`inline-flex shrink-0 overflow-hidden rounded-[3px] ring-1 ring-black/10 ${className}`}>
      <FlagArt code={code} />
    </span>
  )
}

function FlagArt({ code }: { code: string }) {
  const rawId = useId()
  const clipId = `flag-${rawId.replace(/[^a-zA-Z0-9]/g, '')}`

  switch (code) {
    case 'fr':
      return (
        <svg viewBox="0 0 3 2" preserveAspectRatio="none" className="h-full w-full" aria-hidden>
          <rect width="1" height="2" fill="#0055A4" />
          <rect x="1" width="1" height="2" fill="#FFFFFF" />
          <rect x="2" width="1" height="2" fill="#EF4135" />
        </svg>
      )

    case 'en':
      return (
        <svg viewBox="0 0 60 30" preserveAspectRatio="none" className="h-full w-full" aria-hidden>
          <clipPath id={clipId}>
            <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
          </clipPath>
          <rect width="60" height="30" fill="#012169" />
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#FFFFFF" strokeWidth="6" />
          <path d="M0,0 L60,30 M60,0 L0,30" clipPath={`url(#${clipId})`} stroke="#C8102E" strokeWidth="4" />
          <path d="M30,0 v30 M0,15 h60" stroke="#FFFFFF" strokeWidth="10" />
          <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
        </svg>
      )

    case 'es':
      return (
        <svg viewBox="0 0 3 2" preserveAspectRatio="none" className="h-full w-full" aria-hidden>
          <rect width="3" height="2" fill="#AA151B" />
          <rect y="0.5" width="3" height="1" fill="#F1BF00" />
          <rect x="0.55" y="0.78" width="0.34" height="0.44" fill="#AA151B" />
          <rect x="0.61" y="0.84" width="0.22" height="0.32" fill="#F1BF00" />
        </svg>
      )

    case 'de':
      return (
        <svg viewBox="0 0 3 2" preserveAspectRatio="none" className="h-full w-full" aria-hidden>
          <rect width="3" height="0.667" fill="#000000" />
          <rect y="0.667" width="3" height="0.667" fill="#DD0000" />
          <rect y="1.334" width="3" height="0.666" fill="#FFCE00" />
        </svg>
      )

    case 'it':
      return (
        <svg viewBox="0 0 3 2" preserveAspectRatio="none" className="h-full w-full" aria-hidden>
          <rect width="1" height="2" fill="#009246" />
          <rect x="1" width="1" height="2" fill="#FFFFFF" />
          <rect x="2" width="1" height="2" fill="#CE2B37" />
        </svg>
      )

    case 'pt':
      return (
        <svg viewBox="0 0 3 2" preserveAspectRatio="none" className="h-full w-full" aria-hidden>
          <rect width="3" height="2" fill="#DA291C" />
          <rect width="1.2" height="2" fill="#046A38" />
          <circle cx="1.2" cy="1" r="0.5" fill="#FFE900" />
          <circle cx="1.2" cy="1" r="0.32" fill="#FFFFFF" />
          <circle cx="1.2" cy="1" r="0.2" fill="#DA291C" />
        </svg>
      )

    default:
      return null
  }
}
