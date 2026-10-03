import type { Category } from '@/types'

export const CATEGORIES: Category[] = [
  {
    id: 'emploi',
    name: 'Emploi',
    icon: 'bi-briefcase-fill',
    description: "Lettre de motivation, demande d'emploi, candidature spontanée, lettre de stage…",
    examples: ['Motivation', 'Candidature', 'Candidature spontanée', 'Stage', 'Recommandation', 'Démission'],
    card: 'from-blue-50 to-white border-blue-100',
    iconBox: 'bg-blue-100 text-blue-600',
    accent: 'text-blue-600',
  },
  {
    id: 'scolaire',
    name: 'Scolaire & Universitaire',
    icon: 'bi-mortarboard-fill',
    description: "Demande d'inscription, bourse, attestation, relevé de notes…",
    examples: ['Inscription', 'Bourse', 'Attestation', 'Relevé de notes', 'Certificat'],
    card: 'from-emerald-50 to-white border-emerald-100',
    iconBox: 'bg-emerald-100 text-emerald-600',
    accent: 'text-emerald-600',
  },
  {
    id: 'administratif',
    name: 'Administratif',
    icon: 'bi-buildings-fill',
    description: 'Demande administrative, réclamation, autorisation, attestation…',
    examples: ['Demande administrative', 'Réclamation', 'Recours', 'Autorisation', 'Procuration'],
    card: 'from-orange-50 to-white border-orange-100',
    iconBox: 'bg-orange-100 text-orange-600',
    accent: 'text-orange-600',
  },
  {
    id: 'professionnel',
    name: 'Professionnel',
    icon: 'bi-graph-up-arrow',
    description: 'Lettre commerciale, partenariat, collaboration, devis, relance…',
    examples: ['Demande de devis', 'Partenariat', 'Relance', 'Présentation', 'Notification'],
    card: 'from-violet-50 to-white border-violet-100',
    iconBox: 'bg-violet-100 text-violet-600',
    accent: 'text-violet-600',
  },
  {
    id: 'personnel',
    name: 'Personnel',
    icon: 'bi-heart-fill',
    description: "Remerciement, excuses, félicitations, invitation, condoléances…",
    examples: ['Remerciements', 'Excuses', 'Invitation', 'Félicitations', 'Condoléances'],
    card: 'from-pink-50 to-white border-pink-100',
    iconBox: 'bg-pink-100 text-pink-600',
    accent: 'text-pink-600',
  },
]

export const getCategory = (id: string) => CATEGORIES.find((c) => c.id === id)
