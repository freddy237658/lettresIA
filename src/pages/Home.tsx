import { Link } from 'react-router-dom'
import { LinkButton } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Primitives'
import { HeroIllustration } from '@/components/landing/HeroIllustration'
import { CategoriesShowcase } from '@/components/landing/CategoriesShowcase'
import { CATEGORIES } from '@/data/categories'

const FEATURES = [
  { icon: 'bi-lightning-charge-fill', title: 'Génération rapide', text: 'Moins de 2 secondes en conditions normales' },
  { icon: 'bi-shield-lock-fill', title: '100% sécurisé', text: 'Vos données personnelles protégées' },
  { icon: 'bi-file-earmark-text-fill', title: 'Des centaines de modèles', text: 'Gratuits et premium' },
  { icon: 'bi-stars', title: 'IA intelligente', text: 'Des lettres professionnelles et personnalisées' },
]

const WHY = [
  {
    icon: 'bi-clock-history',
    badge: 'bi-lightning-charge-fill',
    title: 'Gain de temps',
    text: 'Créez vos lettres en quelques secondes seulement.',
    accent: 'from-indigo-500 to-violet-500',
    badgeTone: 'text-indigo-600',
  },
  {
    icon: 'bi-shield-check',
    badge: 'bi-lock-fill',
    title: 'Fiable et sécurisé',
    text: 'Vos données personnelles sont protégées.',
    accent: 'from-emerald-500 to-teal-600',
    badgeTone: 'text-emerald-600',
  },
  {
    icon: 'bi-phone',
    badge: 'bi-laptop',
    title: 'Multi-appareils',
    text: 'Accessible sur ordinateur, tablette et mobile.',
    accent: 'from-sky-500 to-indigo-600',
    badgeTone: 'text-sky-600',
  },
  {
    icon: 'bi-award',
    badge: 'bi-file-earmark-text-fill',
    title: 'Modèles professionnels',
    text: 'Des designs modernes et personnalisables.',
    accent: 'from-amber-500 to-orange-500',
    badgeTone: 'text-amber-600',
  },
]

const STEPS = [
  {
    icon: 'bi-grid-3x3-gap-fill',
    title: 'Choisissez un modèle',
    text: 'Parcourez les catégories et sélectionnez le modèle adapté à votre situation.',
  },
  {
    icon: 'bi-pencil-square',
    title: 'Remplissez les informations',
    text: 'Renseignez le destinataire, l’objet et les détails clés de votre lettre.',
  },
  {
    icon: 'bi-stars',
    title: 'L’IA rédige pour vous',
    text: 'Notre intelligence artificielle génère un texte clair, structuré et professionnel.',
  },
  {
    icon: 'bi-send-check-fill',
    title: 'Téléchargez ou envoyez',
    text: 'Exportez en PDF, signez électroniquement ou envoyez directement en ligne.',
  },
]

const ADVANCED = [
  {
    icon: 'bi-robot',
    title: 'Génération par Intelligence Artificielle',
    text: 'Saisissez quelques mots-clés et laissez l’IA rédiger une lettre sur mesure, parfaitement adaptée à votre contexte.',
    points: ['Textes personnalisés', 'Ton professionnel', 'Relecture automatique'],
    accent: 'from-indigo-600 to-violet-600',
  },
  {
    icon: 'bi-vector-pen',
    title: 'Signature électronique intégrée',
    text: 'Signez vos courriers en quelques clics puis envoyez-les directement en ligne, sans jamais les imprimer.',
    points: ['Signature sécurisée', 'Envoi en ligne', 'Zéro papier'],
    accent: 'from-sky-500 to-indigo-600',
  },
  {
    icon: 'bi-truck',
    title: 'Suivi d’envoi recommandé',
    text: 'Grâce à nos partenariats postaux, envoyez votre lettre physiquement et suivez sa livraison en un clic.',
    points: ['Envoi recommandé', 'Suivi en temps réel', 'Preuve de dépôt'],
    accent: 'from-emerald-500 to-teal-600',
  },
]

const TESTIMONIALS = [
  {
    name: 'Aïcha N.',
    role: 'Demandeuse d’emploi',
    location: 'Lyon, France',
    initials: 'AN',
    avatar: 'from-indigo-500 to-violet-500',
    quote:
      'Je redoutais d’écrire ma lettre de motivation. En 3 minutes, LettreAI en a rédigé une que le recruteur a vraiment appréciée. J’ai décroché un entretien la semaine suivante.',
    rating: 5,
  },
  {
    name: 'Samuel E.',
    role: 'Entrepreneur',
    location: 'Douala, Cameroun',
    initials: 'SE',
    avatar: 'from-emerald-500 to-teal-600',
    quote:
      'J’envoie des courriers à mes partenaires et aux administrations presque chaque semaine. Les modèles premium et l’envoi recommandé me font gagner un temps précieux.',
    rating: 5,
  },
  {
    name: 'Claire M.',
    role: 'Particulier — litige administratif',
    location: 'Bruxelles, Belgique',
    initials: 'CM',
    avatar: 'from-amber-500 to-orange-500',
    quote:
      'Pour contester une décision administrative, il me fallait un courrier formel et bien tourné. LettreAI a trouvé les bons termes et le bon ton. Dossier accepté du premier coup !',
    rating: 5,
  },
]

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-gradient-to-br from-indigo-200/50 to-violet-200/50 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:py-24">
          <div>
            <Badge tone="violet">
              <i className="bi bi-stars" aria-hidden /> L'IA au service de vos lettres
            </Badge>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl">
              Créez vos lettres en ligne en{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                quelques secondes
              </span>{' '}
              grâce à l'IA
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-500">
              LettreAI est une plateforme intelligente qui vous permet de rédiger tous types de lettres
              professionnelles, administratives, scolaires et personnelles. Rapide, simple et efficace.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <LinkButton to="/inscription" size="lg" icon={<i className="bi bi-magic" />}>
                Créer ma lettre gratuitement
              </LinkButton>
              <LinkButton to="/modeles" size="lg" variant="outline" icon={<i className="bi bi-grid-3x3-gap" />}>
                Voir les modèles
              </LinkButton>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
              {FEATURES.map((f) => (
                <div key={f.title}>
                  <div className="mb-1.5 flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                    <i className={`bi ${f.icon}`} aria-hidden />
                  </div>
                  <p className="text-sm font-semibold text-slate-800">{f.title}</p>
                  <p className="text-xs text-slate-400">{f.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Illustration principale */}
          <HeroIllustration />
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <Badge tone="indigo">
              <i className="bi bi-collection-fill" aria-hidden /> Catégories principales
            </Badge>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Trouvez le type de lettre qui vous correspond
            </h2>
            <p className="mt-2 max-w-xl text-sm text-slate-500">
              Choisissez parmi nos catégories et modèles adaptés à chaque situation.
            </p>
          </div>
          <Link to="/categories" className="text-sm font-semibold text-indigo-600 hover:underline">
            Voir toutes les catégories →
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/categories/${cat.id}`}
              className={`group rounded-2xl border bg-gradient-to-b p-5 transition hover:-translate-y-0.5 hover:shadow-md ${cat.card}`}
            >
              <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${cat.iconBox}`}>
                <i className={`bi ${cat.icon} text-lg`} aria-hidden />
              </div>
              <h3 className="text-sm font-bold text-slate-900">{cat.name}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-500">{cat.description}</p>
              <p className={`mt-4 text-xs font-semibold ${cat.accent}`}>
                Explorer <span className="transition group-hover:translate-x-0.5">→</span>
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Comment ça marche ? */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="text-center">
          <Badge tone="violet">
            <i className="bi bi-signpost-split-fill" aria-hidden /> Comment ça marche ?
          </Badge>
          <h2 className="mx-auto mt-3 max-w-xl text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Créez votre lettre en 4 étapes simples
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-sm text-slate-500">
            De l’idée à l’envoi, LettreAI vous accompagne tout au long du processus.
          </p>
        </div>

        <div className="relative mt-12">
          <div
            className="pointer-events-none absolute left-[12%] right-[12%] top-10 hidden h-0.5 rounded bg-gradient-to-r from-indigo-100 via-indigo-200 to-indigo-100 lg:block"
            aria-hidden
          />
          <ol className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, index) => (
              <li key={step.title} className="flex flex-col items-center text-center">
                <div className="relative">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white text-indigo-600 paper-shadow ring-1 ring-indigo-100">
                    <i className={`bi ${step.icon} text-3xl`} aria-hidden />
                  </div>
                  <span className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 text-xs font-bold text-white ring-4 ring-[#f7f7fb]">
                    {index + 1}
                  </span>
                </div>
                <h3 className="mt-5 text-sm font-bold text-slate-900">{step.title}</h3>
                <p className="mt-1.5 max-w-[15rem] text-xs leading-relaxed text-slate-500">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Explorez nos modèles */}
      <CategoriesShowcase />

      {/* Why choose */}
      <section className="border-y border-slate-100 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
          <Badge tone="indigo">Pourquoi choisir LettreAI ?</Badge>
          <h2 className="mx-auto mt-3 max-w-xl text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Une solution complète et intuitive
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-sm text-slate-500">
            Tout ce dont vous avez besoin pour créer, gérer et télécharger vos lettres en toute simplicité.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {WHY.map((w) => (
              <div
                key={w.title}
                className="group flex flex-col items-center rounded-2xl border border-slate-100 bg-white p-6 text-center transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className={`relative mb-5 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br ${w.accent} text-white shadow-sm`}>
                  <span className="absolute -left-3 -top-3 h-10 w-10 rounded-full bg-white/20 blur-md" aria-hidden />
                  <span className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-white/25" aria-hidden />
                  <i className={`bi ${w.icon} relative text-4xl`} aria-hidden />
                  <span className={`absolute -bottom-3 -right-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white text-base shadow ring-1 ring-slate-100 ${w.badgeTone}`}>
                    <i className={`bi ${w.badge}`} aria-hidden />
                  </span>
                </div>
                <p className="text-sm font-bold text-slate-900">{w.title}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-500">{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fonctionnalités avancées */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="text-center">
          <Badge tone="indigo">
            <i className="bi bi-gem" aria-hidden /> Fonctionnalités avancées
          </Badge>
          <h2 className="mx-auto mt-3 max-w-2xl text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Bien plus qu’un simple éditeur de texte
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-sm text-slate-500">
            Des outils pensés pour rédiger, signer et envoyer vos courriers de bout en bout.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {ADVANCED.map((feature) => (
            <div
              key={feature.title}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className={`relative flex h-40 items-center justify-center overflow-hidden bg-gradient-to-br ${feature.accent}`}>
                <div className="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-white/10 blur-xl" aria-hidden />
                <div className="absolute -bottom-8 -right-4 h-24 w-24 rounded-full bg-white/10" aria-hidden />
                <span className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-white ring-1 ring-white/30 backdrop-blur">
                  <i className={`bi ${feature.icon} text-3xl`} aria-hidden />
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-base font-bold text-slate-900">{feature.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">{feature.text}</p>
                <ul className="mt-4 space-y-1.5">
                  {feature.points.map((point) => (
                    <li key={point} className="flex items-center gap-2 text-xs font-medium text-slate-600">
                      <i className="bi bi-check-circle-fill text-emerald-500" aria-hidden /> {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Témoignages */}
      <section className="border-y border-slate-100 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="text-center">
            <Badge tone="amber">
              <i className="bi bi-chat-quote-fill" aria-hidden /> Témoignages
            </Badge>
            <h2 className="mx-auto mt-3 max-w-xl text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Ils ont adopté LettreAI
            </h2>
            <p className="mx-auto mt-2 max-w-lg text-sm text-slate-500">
              Des profils variés, un même constat : écrire une lettre n’a jamais été aussi simple.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {TESTIMONIALS.map((person) => (
              <figure
                key={person.name}
                className="flex h-full flex-col rounded-2xl border border-slate-100 bg-gradient-to-b from-slate-50/60 to-white p-6"
              >
                <div className="flex items-center gap-1 text-amber-400" aria-label={`Note ${person.rating} sur 5`}>
                  {Array.from({ length: person.rating }).map((_, i) => (
                    <i key={i} className="bi bi-star-fill text-sm" aria-hidden />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">
                  “{person.quote}”
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-5">
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${person.avatar} text-sm font-bold text-white`}
                  >
                    {person.initials}
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-slate-900">{person.name}</span>
                    <span className="block text-xs text-slate-500">{person.role}</span>
                    <span className="block text-[11px] text-slate-400">{person.location}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex flex-col items-center gap-6 rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-14 text-center sm:px-12">
          <h2 className="max-w-xl text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            Prêt à rédiger votre prochaine lettre ?
          </h2>
          <p className="max-w-md text-sm text-indigo-100">
            Rejoignez LettreAI et laissez l'IA rédiger votre lettre pendant que vous vous concentrez sur l'essentiel.
          </p>
          <LinkButton to="/inscription" variant="secondary" size="lg" className="!bg-white !text-indigo-700">
            Commencer gratuitement
          </LinkButton>
        </div>
      </section>
    </div>
  )
}
