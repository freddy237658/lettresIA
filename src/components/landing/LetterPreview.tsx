import type { ReactNode } from 'react'
import type { ShowcaseVariant } from '@/data/showcase'

type PreviewKind = 'standard' | 'official' | 'personal' | 'studies' | 'premium'

interface PreviewConfig {
  kind: PreviewKind
  accent: string
  icon: string
  subject?: string
  quote?: string
}

const PREVIEWS: Record<ShowcaseVariant, PreviewConfig> = {
  motivation: { kind: 'standard', accent: 'bg-blue-500', icon: 'bi-briefcase-fill', subject: 'Candidature' },
  candidature: {
    kind: 'standard',
    accent: 'bg-cyan-500',
    icon: 'bi-person-badge-fill',
    subject: 'Candidature spontanée',
  },
  relance: { kind: 'standard', accent: 'bg-amber-500', icon: 'bi-arrow-repeat', subject: 'Relance après entretien' },
  recommandation: {
    kind: 'standard',
    accent: 'bg-fuchsia-500',
    icon: 'bi-star-fill',
    subject: 'Demande de recommandation',
  },
  administratif: { kind: 'official', accent: 'bg-emerald-500', icon: 'bi-buildings-fill', subject: 'Demande officielle' },
  recours: { kind: 'official', accent: 'bg-amber-500', icon: 'bi-megaphone-fill', subject: 'Réclamation · Recours' },
  attestation: {
    kind: 'official',
    accent: 'bg-teal-500',
    icon: 'bi-file-earmark-check-fill',
    subject: "Demande d'attestation",
  },
  resiliation: {
    kind: 'official',
    accent: 'bg-rose-500',
    icon: 'bi-file-earmark-x-fill',
    subject: 'Résiliation de contrat',
  },
  etudes: { kind: 'studies', accent: 'bg-violet-500', icon: 'bi-mortarboard-fill', subject: 'Demande de stage' },
  inscription: { kind: 'studies', accent: 'bg-fuchsia-500', icon: 'bi-journal-text', subject: "Demande d'inscription" },
  bourse: { kind: 'studies', accent: 'bg-indigo-500', icon: 'bi-cash-stack', subject: 'Demande de bourse' },
  convention: {
    kind: 'studies',
    accent: 'bg-blue-500',
    icon: 'bi-file-earmark-text-fill',
    subject: 'Convention de stage',
  },
  personnel: { kind: 'personal', accent: 'bg-rose-500', icon: 'bi-heart-fill', quote: 'Merci pour ce moment précieux…' },
  remerciements: {
    kind: 'personal',
    accent: 'bg-pink-500',
    icon: 'bi-envelope-heart-fill',
    quote: 'Un grand merci pour votre gentillesse…',
  },
  excuses: {
    kind: 'personal',
    accent: 'bg-amber-500',
    icon: 'bi-chat-square-heart-fill',
    quote: 'Je tenais à vous présenter mes excuses…',
  },
  invitation: {
    kind: 'personal',
    accent: 'bg-violet-500',
    icon: 'bi-calendar-heart-fill',
    quote: "J'ai le plaisir de vous convier…",
  },
  professionnel: {
    kind: 'standard',
    accent: 'bg-indigo-500',
    icon: 'bi-diagram-3-fill',
    subject: 'Proposition de partenariat',
  },
  commercial: { kind: 'standard', accent: 'bg-sky-500', icon: 'bi-graph-up-arrow', subject: 'Offre commerciale' },
  recouvrement: { kind: 'official', accent: 'bg-rose-500', icon: 'bi-cash-coin', subject: 'Relance de facture' },
  collaboration: {
    kind: 'standard',
    accent: 'bg-teal-500',
    icon: 'bi-people-fill',
    subject: 'Demande de collaboration',
  },
  'premium-motivation': {
    kind: 'premium',
    accent: 'from-indigo-600 to-violet-600',
    icon: 'bi-crown-fill',
    subject: 'Modèle premium de motivation',
  },
  'premium-professionnel': {
    kind: 'premium',
    accent: 'from-violet-600 to-fuchsia-600',
    icon: 'bi-crown-fill',
    subject: 'Premium professionnel',
  },
  'premium-illimite': {
    kind: 'premium',
    accent: 'from-fuchsia-600 to-rose-500',
    icon: 'bi-infinity',
    subject: 'Accès illimité',
  },
  'premium-signature': {
    kind: 'premium',
    accent: 'from-amber-500 to-orange-500',
    icon: 'bi-pen-fill',
    subject: 'Signature & envoi',
  },
}

function Sheet({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`relative rounded-xl bg-white p-3 shadow-[0_16px_40px_-16px_rgba(30,27,58,0.28)] ring-1 ring-slate-900/5 sm:p-4 ${className}`}
    >
      {children}
    </div>
  )
}

function Line({ w, dark = false }: { w: string; dark?: boolean }) {
  return <div className={`h-1.5 rounded-full ${dark ? 'bg-slate-400/80' : 'bg-slate-200'}`} style={{ width: w }} />
}

function Swash({ stroke = '#4338CA' }: { stroke?: string }) {
  return (
    <svg viewBox="0 0 42 12" className="h-3.5 w-16" fill="none" aria-hidden>
      <path d="M2 9 C8 2 14 1 21 6 S33 10 40 3" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

function HeaderChip({ config }: { config: PreviewConfig }) {
  return (
    <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md ${config.accent} text-white`}>
      <i className={`bi ${config.icon} text-[9px]`} aria-hidden />
    </span>
  )
}

function ObjectLine({ subject, label = 'Objet' }: { subject: string; label?: string }) {
  return (
    <div className="mt-2 flex items-center gap-1.5">
      <span className="h-1.5 w-6 shrink-0 rounded-full bg-slate-400/80" />
      <span className="truncate text-[6.5px] font-semibold uppercase tracking-wide text-slate-500">
        {label} : {subject}
      </span>
    </div>
  )
}

function RegistryBar() {
  return (
    <span className="flex items-center gap-1">
      <span className="h-1.5 w-2 rounded bg-slate-300" />
      <span className="h-1.5 w-4 rounded bg-slate-200" />
    </span>
  )
}

function StandardLetter({ config }: { config: PreviewConfig }) {
  return (
    <div className="w-44 sm:w-52 lg:w-60">
      <Sheet>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <HeaderChip config={config} />
            <div className="min-w-0">
              <Line w="100%" dark />
              <div className="mt-1">
                <Line w="70%" />
              </div>
            </div>
          </div>
          <span className="h-1.5 w-3 shrink-0 rounded-full bg-slate-200" />
        </div>
        <div className="mt-2 border-t border-slate-100 pt-2">
          <div className="space-y-1">
            <Line w="55%" />
            <Line w="40%" />
          </div>
        </div>
        <ObjectLine subject={config.subject ?? 'Courrier'} />
        <p className="mt-2 text-[7px] italic text-slate-500">Madame, Monsieur,</p>
        <div className="mt-2 space-y-1.5">
          <Line w="92%" />
          <Line w="100%" />
          <Line w="88%" />
          <Line w="95%" />
          <Line w="60%" />
        </div>
        <div className="mt-3 flex items-end justify-between">
          <Swash />
          <div className="space-y-1 pb-1">
            <Line w="45%" dark />
          </div>
        </div>
      </Sheet>
    </div>
  )
}

function OfficialLetter({ config }: { config: PreviewConfig }) {
  return (
    <div className="w-44 sm:w-52 lg:w-60">
      <Sheet>
        <div className="flex items-center justify-between">
          <HeaderChip config={config} />
          <RegistryBar />
        </div>
        <div className="mt-2 space-y-1">
          <Line w="60%" dark />
          <Line w="45%" />
        </div>
        <ObjectLine subject={config.subject ?? 'Demande officielle'} />
        <div className="mt-2 space-y-1.5">
          <Line w="92%" />
          <Line w="85%" />
          <Line w="88%" />
          <Line w="70%" />
        </div>
        <div className="mt-3 flex items-center justify-between gap-2">
          <Line w="45%" />
          <span className={`h-1.5 w-12 shrink-0 rounded-sm ${config.accent} opacity-40`} />
        </div>
      </Sheet>
    </div>
  )
}

function PersonalLetter({ config }: { config: PreviewConfig }) {
  return (
    <div className="relative w-44 -rotate-3 sm:w-52 lg:w-56">
      <div className="absolute -right-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-slate-900/5">
        <i className={`bi ${config.icon} text-sm text-rose-400`} aria-hidden />
      </div>
      <Sheet>
        <p className="text-[7px] italic text-slate-500">« {config.quote ?? 'Avec toute mon affection…'} »</p>
        <div className="mt-2 space-y-1.5">
          <Line w="100%" />
          <Line w="90%" />
          <Line w="95%" />
          <Line w="75%" />
        </div>
        <div className="mt-3 flex items-end justify-between">
          <Swash stroke="#E11D48" />
          <span className={`flex h-5 w-5 items-center justify-center rounded-md ${config.accent} text-white`}>
            <i className={`bi ${config.icon} text-[8px]`} aria-hidden />
          </span>
        </div>
      </Sheet>
    </div>
  )
}

function StudiesLetters({ config }: { config: PreviewConfig }) {
  return (
    <div className="relative w-48 sm:w-56 lg:w-64">
      <Sheet className="absolute -left-3 top-1 -rotate-3 opacity-70">
        <div className="space-y-1.5">
          <Line w="85%" />
          <Line w="70%" />
          <Line w="55%" />
        </div>
      </Sheet>
      <Sheet className="relative rotate-1">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <HeaderChip config={config} />
            <div className="min-w-0">
              <Line w="100%" dark />
              <div className="mt-1">
                <Line w="60%" />
              </div>
            </div>
          </div>
          <RegistryBar />
        </div>
        <ObjectLine subject={config.subject ?? 'Demande'} />
        <div className="mt-2 space-y-1.5">
          <Line w="95%" />
          <Line w="88%" />
          <Line w="92%" />
          <Line w="65%" />
        </div>
        <div className="mt-3">
          <Line w="45%" dark />
        </div>
      </Sheet>
    </div>
  )
}

function PremiumStack({ config }: { config: PreviewConfig }) {
  return (
    <div className="relative w-52 sm:w-60 lg:w-64">
      <Sheet className="absolute -left-4 top-1 w-40 -rotate-3 opacity-70">
        <div className="space-y-1.5">
          <Line w="90%" />
          <Line w="75%" />
          <Line w="60%" />
        </div>
      </Sheet>
      <Sheet className="absolute left-1 top-2 w-40 rotate-2 opacity-85">
        <div className="space-y-1.5">
          <Line w="95%" />
          <Line w="80%" />
          <Line w="70%" />
        </div>
      </Sheet>
      <Sheet className="relative">
        <div className={`h-5 rounded-lg bg-gradient-to-r ${config.accent}`} />
        <div className="mt-2 flex items-center justify-between gap-2">
          <div className="min-w-0">
            <Line w="100%" dark />
            <div className="mt-1">
              <Line w="60%" />
            </div>
          </div>
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-500">
            <i className={`bi ${config.icon} text-[9px]`} aria-hidden />
          </span>
        </div>
        <div className="mt-2 space-y-1.5">
          <Line w="95%" />
          <Line w="88%" />
          <Line w="90%" />
          <Line w="70%" />
        </div>
        <ObjectLine subject={config.subject ?? 'Premium'} />
      </Sheet>
    </div>
  )
}

export function LetterPreview({ variant }: { variant: ShowcaseVariant }) {
  const config = PREVIEWS[variant]

  switch (config.kind) {
    case 'official':
      return <OfficialLetter config={config} />
    case 'personal':
      return <PersonalLetter config={config} />
    case 'studies':
      return <StudiesLetters config={config} />
    case 'premium':
      return <PremiumStack config={config} />
    default:
      return <StandardLetter config={config} />
  }
}