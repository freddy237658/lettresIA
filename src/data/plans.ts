import type { Plan } from '@/types'

/** Tarifs indicatifs — à valider. Seront gérés par l'administration (table plans). */
export const PLANS: Plan[] = [
  {
    id: 'gratuit',
    name: 'Gratuit',
    priceXAF: 0,
    priceEUR: 0,
    cta: 'Commencer',
    features: [
      '5 crédits IA par mois',
      'Modèles gratuits',
      'Téléchargement PDF',
      'Support par e-mail',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    priceXAF: 6500,
    priceEUR: 9.99,
    highlight: true,
    cta: 'Choisir Premium',
    features: [
      'Générations IA illimitées',
      'Tous les modèles premium',
      'Signature et personnalisation avancée',
      'Historique des versions',
      'Support prioritaire',
    ],
  },
  {
    id: 'entreprise',
    name: 'Entreprise',
    priceXAF: 19500,
    priceEUR: 29.99,
    cta: 'Choisir Entreprise',
    features: [
      'Tout le contenu Premium',
      "Gestion d'équipe",
      'Modèles aux couleurs de votre société',
      'Facturation entreprise',
      'Support dédié',
    ],
  },
]

export const ANNUAL_DISCOUNT = 0.2
export const FREE_CREDITS = 5

export function formatPrice(plan: Plan, currency: 'XAF' | 'EUR', annual: boolean) {
  const base = currency === 'XAF' ? plan.priceXAF : plan.priceEUR
  const value = annual ? base * (1 - ANNUAL_DISCOUNT) : base
  if (value === 0) return currency === 'XAF' ? '0 FCFA' : '0 €'
  if (currency === 'XAF') {
    return `${Math.round(value).toLocaleString('fr-FR')} FCFA`
  }
  return `${value.toFixed(2).replace('.', ',')} €`
}
