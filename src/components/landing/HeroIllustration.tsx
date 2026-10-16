type CardType = 'stage' | 'motivation' | 'administratif' | 'emploi'

interface HeroCard {
  type: CardType
  title: string
  x: number
  y: number
  rotate: number
  tint: string
  color: string
}

const CARD_W = 140
const CARD_H = 100

const CARDS: HeroCard[] = [
  { type: 'stage', title: 'Demande de stage', x: 54, y: 26, rotate: -10, tint: '#F3E8FF', color: '#7C3AED' },
  { type: 'motivation', title: 'Lettre de motivation', x: 214, y: 4, rotate: 3, tint: '#DBEAFE', color: '#2563EB' },
  { type: 'administratif', title: 'Lettre administrative', x: 378, y: 24, rotate: 10, tint: '#F3E8FF', color: '#7C3AED' },
  { type: 'emploi', title: "Demande d'emploi", x: 468, y: 146, rotate: 7, tint: '#DBEAFE', color: '#2563EB' },
]

const KEY_ROWS = [262, 267.5, 273, 278.5]
const KEY_H = 4.4
const KEY_COLS = 15
const KEY_GAP = 1.3
const KEYS: { x: number; y: number; w: number }[] = (() => {
  const out: { x: number; y: number; w: number }[] = []
  for (const y of KEY_ROWS) {
    const t = (y - 257) / (300 - 257)
    const left = 174 + (158 - 174) * t + 7
    const right = 486 + (502 - 486) * t - 7
    const w = (right - left - (KEY_COLS - 1) * KEY_GAP) / KEY_COLS
    for (let c = 0; c < KEY_COLS; c++) out.push({ x: left + c * (w + KEY_GAP), y, w })
  }
  return out
})()

function CardIcon({ type, color }: { type: CardType; color: string }) {
  switch (type) {
    case 'stage':
      return (
        <g fill={color}>
          <path d="M2 9 L12 4 L22 9 L12 14 Z" />
          <rect x="16" y="10" width="2" height="6" rx="1" />
        </g>
      )
    case 'motivation':
      return (
        <g fill={color}>
          <rect x="2" y="7" width="20" height="12" rx="2.5" />
          <path d="M8 7 V5.5 A1.5 1.5 0 0 1 9.5 4 H14.5 A1.5 1.5 0 0 1 16 5.5 V7 H8 Z" fill="none" stroke={color} strokeWidth="1.6" />
        </g>
      )
    case 'administratif':
      return (
        <g fill={color}>
          <rect x="4" y="4" width="16" height="16" rx="1.5" />
          <g fill="#FFFFFF">
            <rect x="7" y="7" width="3" height="3" rx="0.5" />
            <rect x="14" y="7" width="3" height="3" rx="0.5" />
            <rect x="7" y="13" width="3" height="3" rx="0.5" />
            <rect x="14" y="13" width="3" height="3" rx="0.5" />
          </g>
        </g>
      )
    case 'emploi':
      return (
        <g fill={color}>
          <circle cx="12" cy="7" r="4" />
          <path d="M4 20 A8 8 0 0 1 20 20 Z" />
        </g>
      )
  }
}

function Sparkle({ x, y, s = 1, color = '#93B4FF' }: { x: number; y: number; s?: number; color?: string }) {
  return (
    <path
      transform={`translate(${x} ${y}) scale(${s})`}
      d="M0,-8 L1.9,-1.9 L8,0 L1.9,1.9 L0,8 L-1.9,1.9 L-8,0 L-1.9,-1.9 Z"
      fill={color}
    />
  )
}

function Flower({
  x,
  y,
  petal = '#F9A8D4',
  core = '#FDE68A',
}: {
  x: number
  y: number
  petal?: string
  core?: string
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {[0, 72, 144, 216, 288].map((angle) => (
        <ellipse key={angle} cx="0" cy="-4.6" rx="3.1" ry="4.6" fill={petal} transform={`rotate(${angle})`} />
      ))}
      <circle cx="0" cy="0" r="2.9" fill={core} />
    </g>
  )
}

export function HeroIllustration() {
  return (
    <div className="relative mx-auto w-full max-w-[680px]">
      <svg
        viewBox="44 0 576 322"
        className="h-auto w-full font-sans"
        role="img"
        aria-label="Aperçu de l'application LettreAI sur un ordinateur portable, entouré de modèles de lettres et d'un assistant IA"
      >
        <defs>
          <linearGradient id="liPrimary" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#4F46E5" />
            <stop offset="1" stopColor="#7C3AED" />
          </linearGradient>
          <linearGradient id="liBase" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#EEF1F7" />
            <stop offset="1" stopColor="#D8DEEA" />
          </linearGradient>
          <filter id="liSoft" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#2563EB" floodOpacity="0.12" />
          </filter>
          <filter id="liCard" x="-60%" y="-60%" width="220%" height="220%">
            <feDropShadow dx="0" dy="6" stdDeviation="7" floodColor="#101B45" floodOpacity="0.12" />
          </filter>
        </defs>

        {/* Fond : formes bleu très clair */}
        <ellipse cx="370" cy="160" rx="248" ry="162" fill="#EAF1FF" />
        <circle cx="150" cy="316" r="108" fill="#F1F5FF" />
        <circle cx="524" cy="80" r="60" fill="#F3EFFF" />

        {/* Étincelles d'arrière-plan */}
        <Sparkle x={104} y={120} s={1.1} color="#BFD3FF" />
        <Sparkle x={528} y={196} s={0.9} color="#C7B9FF" />
        <circle cx="70" cy="250" r="3" fill="#BFD3FF" />
        <circle cx="548" cy="300" r="2.5" fill="#C7B9FF" />

        {/* Cartes de modèles flottantes */}
        {CARDS.map((card) => (
          <g key={card.title} transform={`translate(${card.x} ${card.y}) rotate(${card.rotate})`} filter="url(#liCard)">
            <rect width={CARD_W} height={CARD_H} rx="12" fill="#FFFFFF" stroke="#EEF2F7" />
            <rect x="14" y="14" width="30" height="30" rx="9" fill={card.tint} />
            <g transform="translate(19 19)">
              <CardIcon type={card.type} color={card.color} />
            </g>
            <text x="14" y="62" fontSize="9.5" fontWeight="700" fill="#101B45">
              {card.title}
            </text>
            <rect x="14" y="72" width="90" height="3.6" rx="1.8" fill="#E2E8F0" />
            <rect x="14" y="80" width="64" height="3.6" rx="1.8" fill="#EEF2F7" />
          </g>
        ))}

        {/* Plante décorative (à gauche, derrière l'ordinateur) */}
        <g transform="translate(84 222) scale(1.5)">
          <path d="M18 26 C4 20 -6 6 4 -6 C12 4 20 12 22 26 Z" fill="#34D399" />
          <path d="M24 26 C34 16 48 8 56 12 C50 24 40 30 26 30 Z" fill="#10B981" />
          <path d="M22 24 C22 8 26 -4 34 -12 C40 -2 38 14 32 26 Z" fill="#6EE7B7" />
          <path d="M24 26 C20 10 17 0 16 -12" fill="none" stroke="#34D399" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M28 26 C31 12 34 2 36 -19" fill="none" stroke="#34D399" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M26 26 C34 14 44 6 50 -7" fill="none" stroke="#34D399" strokeWidth="1.8" strokeLinecap="round" />
          <Flower x={16} y={-14} petal="#F9A8D4" />
          <Flower x={36} y={-21} petal="#C4B5FD" />
          <Flower x={50} y={-9} petal="#93C5FD" />
          <path d="M8 26 H42 L38 56 H12 Z" fill="#BFDBFE" />
          <rect x="6" y="22" width="38" height="7" rx="3" fill="#A9CBFF" />
        </g>

        {/* Ordinateur — écran */}
        <g filter="url(#liSoft)">
          <rect x="185" y="68" width="290" height="188" rx="18" fill="#101B45" />
          <circle cx="330" cy="80" r="3" fill="#33406B" />
          <rect x="197" y="88" width="266" height="160" rx="12" fill="#FFFFFF" />

          {/* Barre latérale */}
          <path
            d="M209,88 H261 V248 H209 A12,12 0 0 1 197,236 V100 A12,12 0 0 1 209,88 Z"
            fill="#F7F9FF"
          />
          <rect x="206" y="98" width="13" height="13" rx="3.5" fill="url(#liPrimary)" />
          <text x="223" y="108" fontSize="8" fontWeight="800" fill="#101B45">
            LettreAI
          </text>
          <rect x="202" y="119" width="53" height="13" rx="4" fill="url(#liPrimary)" />
          <circle cx="209" cy="125.5" r="2.6" fill="#FFFFFF" />
          <text x="215" y="128.5" fontSize="5.6" fontWeight="700" fill="#FFFFFF">
            Accueil
          </text>
          {['Mes lettres', 'Modèles', 'Favoris', 'Mon compte'].map((label, i) => (
            <g key={label}>
              <circle cx="209" cy={139 + i * 12} r="2.6" fill="#94A3B8" />
              <text x="215" y={142 + i * 12} fontSize="5.6" fill="#64748B">
                {label}
              </text>
            </g>
          ))}

          {/* En-tête de la zone principale */}
          <text x="272" y="110" fontSize="9.5" fontWeight="800" fill="#101B45">
            Lettre de motivation
          </text>
          <rect x="372" y="98" width="84" height="17" rx="8.5" fill="url(#liPrimary)" />
          <Sparkle x={384} y={107} s={0.55} color="#FFFFFF" />
          <text x="392" y="110" fontSize="6.5" fontWeight="700" fill="#FFFFFF">
            Générer avec l&apos;IA
          </text>

          {/* Barre d'outils */}
          {Array.from({ length: 8 }).map((_, i) => (
            <g key={i}>
              <rect x={272 + i * 13} y="124" width="10" height="10" rx="3" fill="#F1F5F9" />
              <rect x={275 + i * 13} y="128" width="4" height="1.8" rx="0.9" fill="#94A3B8" />
            </g>
          ))}

          {/* Document */}
          <rect x="270" y="140" width="185" height="100" rx="8" fill="#FFFFFF" stroke="#EEF2F7" />
          <rect x="281" y="151" width="72" height="4" rx="2" fill="#CBD5E1" />
          {[120, 150, 160, 138, 156].map((w, i) => (
            <rect key={i} x="281" y={163 + i * 8} width={w} height="3" rx="1.5" fill="#E2E8F0" />
          ))}
          <rect x="281" y="205" width="52" height="3" rx="1.5" fill="#E2E8F0" />
          <rect x="281" y="215" width="62" height="3" rx="1.5" fill="#CBD5E1" />
        </g>

        {/* Charnière + base */}
        <rect x="200" y="252" width="260" height="6" rx="3" fill="#C9D2E0" />
        <path d="M174,257 L486,257 L507,293 Q509,299 502,300 L158,300 Q151,299 153,293 Z" fill="url(#liBase)" stroke="#D3DAE6" />
        {KEYS.map((k, i) => (
          <rect key={i} x={k.x} y={k.y} width={k.w} height={KEY_H} rx="1.2" fill="#CBD5E4" />
        ))}
        <rect x="286" y="288" width="88" height="10" rx="4" fill="#F1F4F9" stroke="#D3DAE6" />
        <path d="M158,300 L502,300 Q506,300 505,305 L501,312 Q500,315 496,315 L164,315 Q160,315 159,312 L155,305 Q154,300 158,300 Z" fill="#D7DEEA" />

        {/* Robot IA */}
        <g transform="translate(448 196)">
          <line x1="44" y1="4" x2="44" y2="-14" stroke="#BFDBFE" strokeWidth="3" />
          <circle cx="44" cy="-18" r="5" fill="#67E8F9" />
          <rect x="8" y="0" width="76" height="60" rx="20" fill="#FFFFFF" stroke="#DBEAFE" strokeWidth="2.4" />
          <rect x="20" y="11" width="52" height="38" rx="13" fill="#0F1B3D" />
          <ellipse cx="36" cy="27" rx="5" ry="4.3" fill="#22D3EE" />
          <ellipse cx="56" cy="27" rx="5" ry="4.3" fill="#22D3EE" />
          <path d="M37 39 Q46 46 55 39" fill="none" stroke="#22D3EE" strokeWidth="2.4" strokeLinecap="round" />
          <rect x="2" y="18" width="8" height="18" rx="4" fill="#BFDBFE" />
          <rect x="82" y="18" width="8" height="18" rx="4" fill="#BFDBFE" />
          <rect x="22" y="60" width="48" height="48" rx="15" fill="#FFFFFF" stroke="#DBEAFE" strokeWidth="2.4" />
          <rect x="37" y="74" width="20" height="17" rx="5" fill="url(#liPrimary)" />
          <text x="47" y="86.5" fontSize="8" fontWeight="800" fill="#FFFFFF" textAnchor="middle">
            IA
          </text>
          <rect x="70" y="66" width="13" height="26" rx="6.5" fill="#FFFFFF" stroke="#DBEAFE" strokeWidth="2.4" />
          <rect
            x="0"
            y="-7"
            width="56"
            height="15"
            rx="7.5"
            transform="translate(26 70) rotate(223)"
            fill="#FFFFFF"
            stroke="#DBEAFE"
            strokeWidth="2.4"
          />
          <circle cx="-16" cy="34" r="9" fill="#FFFFFF" stroke="#DBEAFE" strokeWidth="2.4" />
          <rect x="-31" y="30" width="17" height="7.5" rx="3.7" fill="#FFFFFF" stroke="#DBEAFE" strokeWidth="2.2" />
        </g>

        {/* Étincelles au premier plan */}
        <Sparkle x={166} y={40} s={0.85} color="#A7C4FF" />
        <Sparkle x={556} y={150} s={1} color="#C4B5FD" />
      </svg>
    </div>
  )
}
