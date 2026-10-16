export type ShowcaseVariant =
  | 'motivation'
  | 'candidature'
  | 'relance'
  | 'recommandation'
  | 'administratif'
  | 'recours'
  | 'attestation'
  | 'resiliation'
  | 'etudes'
  | 'inscription'
  | 'bourse'
  | 'convention'
  | 'personnel'
  | 'remerciements'
  | 'excuses'
  | 'invitation'
  | 'professionnel'
  | 'commercial'
  | 'recouvrement'
  | 'collaboration'
  | 'premium-motivation'
  | 'premium-professionnel'
  | 'premium-illimite'
  | 'premium-signature'

export interface ShowcaseCategory {
  id: string
  label: string
}

export interface ShowcaseCard {
  id: string
  categories: string[]
  tag: string
  title: string
  description: string
  cta: string
  to: string
  icon: string
  chip: string
  bg: string
  preview: ShowcaseVariant
}

export const SHOWCASE_CATEGORIES: ShowcaseCategory[] = [
  { id: 'tous', label: 'Tous' },
  { id: 'emploi', label: 'Emploi' },
  { id: 'administratif', label: 'Administratif' },
  { id: 'etudes', label: 'Études' },
  { id: 'professionnel', label: 'Professionnel' },
  { id: 'personnel', label: 'Personnel' },
  { id: 'premium', label: 'Premium' },
]

export const SHOWCASE_CARDS: ShowcaseCard[] = [
  {
    id: 'motivation',
    categories: ['tous', 'emploi'],
    tag: 'Lettre de motivation',
    title: 'Faites la différence dès votre candidature',
    description:
      "Créez une lettre de motivation personnalisée pour présenter vos compétences et convaincre vos futurs recruteurs.",
    cta: 'Découvrir les modèles',
    to: '/categories/emploi',
    icon: 'bi-briefcase-fill',
    chip: 'bg-sky-100 text-sky-700',
    bg: 'bg-gradient-to-br from-blue-50 to-indigo-100/70',
    preview: 'motivation',
  },
  {
    id: 'administratif',
    categories: ['tous', 'administratif'],
    tag: 'Document officiel',
    title: 'Simplifiez vos démarches administratives',
    description: "Rédigez des demandes, des attestations et des courriers officiels avec une présentation soignée.",
    cta: 'Explorer les modèles',
    to: '/categories/administratif',
    icon: 'bi-buildings-fill',
    chip: 'bg-emerald-100 text-emerald-700',
    bg: 'bg-gradient-to-br from-emerald-50 to-teal-100/70',
    preview: 'administratif',
  },
  {
    id: 'personnel',
    categories: ['tous', 'personnel'],
    tag: 'Lettres personnelles',
    title: 'Trouvez les bons mots',
    description: "Exprimez vos sentiments avec des lettres de remerciement, d'excuses ou d'invitation.",
    cta: 'Découvrir',
    to: '/categories/personnel',
    icon: 'bi-heart-fill',
    chip: 'bg-rose-100 text-rose-600',
    bg: 'bg-gradient-to-br from-pink-50 to-rose-100/70',
    preview: 'personnel',
  },
  {
    id: 'etudes',
    categories: ['tous', 'etudes'],
    tag: 'Études & formation',
    title: "Donnez vie à vos projets d'études",
    description: "Préparez vos demandes de stage, d'inscription, de bourse ou d'attestation avec des modèles adaptés.",
    cta: 'Voir les modèles',
    to: '/categories/scolaire',
    icon: 'bi-mortarboard-fill',
    chip: 'bg-violet-100 text-violet-700',
    bg: 'bg-gradient-to-br from-violet-50 to-purple-100/70',
    preview: 'etudes',
  },

  {
    id: 'candidature',
    categories: ['emploi'],
    tag: 'Candidature',
    title: 'Une candidature sans accroc',
    description: "Envoyez des demandes d'emploi et des candidatures spontanées claires et percutantes.",
    cta: 'Voir les modèles',
    to: '/categories/emploi',
    icon: 'bi-person-badge-fill',
    chip: 'bg-cyan-100 text-cyan-700',
    bg: 'bg-gradient-to-br from-cyan-50 to-sky-100/70',
    preview: 'candidature',
  },
  {
    id: 'relance',
    categories: ['emploi'],
    tag: 'Relance',
    title: 'Relancez avec élégance',
    description: "Relancez un recruteur après un entretien ou une candidature restée sans réponse.",
    cta: 'Découvrir',
    to: '/categories/emploi',
    icon: 'bi-arrow-repeat',
    chip: 'bg-amber-100 text-amber-700',
    bg: 'bg-gradient-to-br from-amber-50 to-orange-100/70',
    preview: 'relance',
  },
  {
    id: 'recommandation',
    categories: ['emploi'],
    tag: 'Recommandation',
    title: 'Obtenez une recommandation',
    description: "Demandez une lettre de recommandation auprès d'un ancien employeur ou d'un professeur.",
    cta: 'Explorer',
    to: '/categories/emploi',
    icon: 'bi-star-fill',
    chip: 'bg-fuchsia-100 text-fuchsia-700',
    bg: 'bg-gradient-to-br from-fuchsia-50 to-pink-100/70',
    preview: 'recommandation',
  },

  {
    id: 'recours',
    categories: ['administratif'],
    tag: 'Réclamation',
    title: 'Faites entendre votre droit',
    description: 'Rédigez réclamations, recours et courriers officiels avec le ton et la forme appropriés.',
    cta: 'Explorer',
    to: '/categories/administratif',
    icon: 'bi-megaphone-fill',
    chip: 'bg-lime-100 text-lime-700',
    bg: 'bg-gradient-to-br from-lime-50 to-emerald-100/70',
    preview: 'recours',
  },
  {
    id: 'attestation',
    categories: ['administratif'],
    tag: 'Attestation',
    title: 'Demandez vos attestations',
    description: 'Obtenez attestations, justificatifs et documents officiels auprès de vos organismes.',
    cta: 'Voir les modèles',
    to: '/categories/administratif',
    icon: 'bi-file-earmark-check-fill',
    chip: 'bg-teal-100 text-teal-700',
    bg: 'bg-gradient-to-br from-teal-50 to-cyan-100/70',
    preview: 'attestation',
  },
  {
    id: 'resiliation',
    categories: ['administratif'],
    tag: 'Résiliation',
    title: 'Résiliez en toute confiance',
    description: "Rédigez une demande de résiliation de contrat, d'abonnement ou de service claire et ferme.",
    cta: 'Découvrir',
    to: '/categories/administratif',
    icon: 'bi-file-earmark-x-fill',
    chip: 'bg-rose-100 text-rose-600',
    bg: 'bg-gradient-to-br from-rose-50 to-red-100/70',
    preview: 'resiliation',
  },

  {
    id: 'inscription',
    categories: ['etudes'],
    tag: 'Inscription',
    title: 'Réussissez votre inscription',
    description: "Rédigez une demande d'inscription claire pour intégrer l'établissement de votre choix.",
    cta: 'Explorer',
    to: '/categories/scolaire',
    icon: 'bi-journal-text',
    chip: 'bg-fuchsia-100 text-fuchsia-700',
    bg: 'bg-gradient-to-br from-fuchsia-50 to-violet-100/70',
    preview: 'inscription',
  },
  {
    id: 'bourse',
    categories: ['etudes'],
    tag: 'Bourse',
    title: 'Financez vos études',
    description: "Préparez une demande de bourse ou d'aide financière convaincante et structurée.",
    cta: 'Découvrir',
    to: '/categories/scolaire',
    icon: 'bi-cash-stack',
    chip: 'bg-indigo-100 text-indigo-700',
    bg: 'bg-gradient-to-br from-indigo-50 to-blue-100/70',
    preview: 'bourse',
  },
  {
    id: 'convention',
    categories: ['etudes'],
    tag: 'Convention de stage',
    title: 'Encadrez votre stage',
    description: 'Rédigez conventions et courriers de stage pour démarrer votre expérience sereinement.',
    cta: 'Voir les modèles',
    to: '/categories/scolaire',
    icon: 'bi-file-earmark-text-fill',
    chip: 'bg-sky-100 text-sky-700',
    bg: 'bg-gradient-to-br from-sky-50 to-indigo-100/70',
    preview: 'convention',
  },

  {
    id: 'remerciements',
    categories: ['personnel'],
    tag: 'Remerciements',
    title: 'Remerciez avec élégance',
    description: 'Exprimez votre gratitude après un entretien, un cadeau ou un service rendu.',
    cta: 'Découvrir',
    to: '/categories/personnel',
    icon: 'bi-envelope-heart-fill',
    chip: 'bg-pink-100 text-pink-600',
    bg: 'bg-gradient-to-br from-rose-50 to-pink-100/70',
    preview: 'remerciements',
  },
  {
    id: 'excuses',
    categories: ['personnel'],
    tag: 'Excuses',
    title: 'Sachez vous excuser',
    description: 'Présentez des excuses sincères et bien formulées pour préserver vos relations.',
    cta: 'Voir les modèles',
    to: '/categories/personnel',
    icon: 'bi-chat-square-heart-fill',
    chip: 'bg-amber-100 text-amber-700',
    bg: 'bg-gradient-to-br from-amber-50 to-yellow-100/70',
    preview: 'excuses',
  },
  {
    id: 'invitation',
    categories: ['personnel'],
    tag: 'Invitation',
    title: 'Lancez vos invitations',
    description: 'Invitez vos proches à un événement avec des messages chaleureux et soignés.',
    cta: 'Explorer',
    to: '/categories/personnel',
    icon: 'bi-calendar-heart-fill',
    chip: 'bg-purple-100 text-purple-700',
    bg: 'bg-gradient-to-br from-purple-50 to-fuchsia-100/70',
    preview: 'invitation',
  },

  {
    id: 'professionnel',
    categories: ['professionnel'],
    tag: 'Professionnel',
    title: 'Communiquez avec professionnalisme',
    description: 'Préparez vos courriers commerciaux, vos propositions de partenariat et vos demandes de collaboration.',
    cta: 'Découvrir les modèles',
    to: '/categories/professionnel',
    icon: 'bi-diagram-3-fill',
    chip: 'bg-indigo-100 text-indigo-700',
    bg: 'bg-gradient-to-br from-indigo-50 to-sky-100/70',
    preview: 'professionnel',
  },
  {
    id: 'commercial',
    categories: ['professionnel'],
    tag: 'Commercial',
    title: 'Développez votre activité',
    description: 'Devis, offres et lettres commerciales pour convaincre vos clients et partenaires.',
    cta: 'Explorer',
    to: '/categories/professionnel',
    icon: 'bi-graph-up-arrow',
    chip: 'bg-sky-100 text-sky-700',
    bg: 'bg-gradient-to-br from-slate-50 to-sky-100/70',
    preview: 'commercial',
  },
  {
    id: 'recouvrement',
    categories: ['professionnel'],
    tag: 'Recouvrement',
    title: 'Relancez vos factures',
    description: 'Rédigez des relances de paiement fermes et courtoises pour être payé dans les délais.',
    cta: 'Voir les modèles',
    to: '/categories/professionnel',
    icon: 'bi-cash-coin',
    chip: 'bg-rose-100 text-rose-600',
    bg: 'bg-gradient-to-br from-rose-50 to-orange-100/70',
    preview: 'recouvrement',
  },
  {
    id: 'collaboration',
    categories: ['professionnel'],
    tag: 'Collaboration',
    title: 'Bâtissez des partenariats',
    description: 'Proposez une collaboration ou un partenariat avec un ton professionnel et convaincant.',
    cta: 'Découvrir',
    to: '/categories/professionnel',
    icon: 'bi-people-fill',
    chip: 'bg-teal-100 text-teal-700',
    bg: 'bg-gradient-to-br from-teal-50 to-emerald-100/70',
    preview: 'collaboration',
  },

  {
    id: 'premium-motivation',
    categories: ['premium'],
    tag: 'Premium · Motivation',
    title: 'Sublimez vos candidatures',
    description: 'Des modèles premium soignés pour des lettres de motivation qui marquent les esprits.',
    cta: 'Explorer Premium',
    to: '/tarifs',
    icon: 'bi-crown-fill',
    chip: 'bg-amber-100 text-amber-700',
    bg: 'bg-gradient-to-br from-indigo-100 via-violet-50 to-purple-100',
    preview: 'premium-motivation',
  },
  {
    id: 'premium-professionnel',
    categories: ['premium'],
    tag: 'Premium · Pro',
    title: "L'excellence professionnelle",
    description: 'Des courriers professionnels haut de gamme, prêts à impressionner vos interlocuteurs.',
    cta: 'Explorer Premium',
    to: '/tarifs',
    icon: 'bi-crown-fill',
    chip: 'bg-violet-100 text-violet-700',
    bg: 'bg-gradient-to-br from-violet-100 via-fuchsia-50 to-purple-100',
    preview: 'premium-professionnel',
  },
  {
    id: 'premium-illimite',
    categories: ['premium'],
    tag: 'Premium · Illimité',
    title: 'Créez sans limites',
    description: "Accédez sans restriction à l'ensemble des modèles et fonctionnalités premium.",
    cta: 'Découvrir Premium',
    to: '/tarifs',
    icon: 'bi-infinity',
    chip: 'bg-fuchsia-100 text-fuchsia-700',
    bg: 'bg-gradient-to-br from-fuchsia-100 via-pink-50 to-rose-100',
    preview: 'premium-illimite',
  },
  {
    id: 'premium-signature',
    categories: ['premium'],
    tag: 'Premium · Signature',
    title: 'Signez et envoyez',
    description: "Signature électronique et envoi simplifié : de la rédaction à l'envoi en un clin d'œil.",
    cta: 'Explorer Premium',
    to: '/tarifs',
    icon: 'bi-pen-fill',
    chip: 'bg-amber-100 text-amber-700',
    bg: 'bg-gradient-to-br from-amber-100 via-orange-50 to-yellow-100',
    preview: 'premium-signature',
  },
]