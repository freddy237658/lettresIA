import { Link } from 'react-router-dom'
import { LinkButton } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Primitives'
import { CATEGORIES } from '@/data/categories'

const FEATURES = [
  { icon: 'bi-lightning-charge-fill', title: 'Génération rapide', text: 'Moins de 2 secondes en conditions normales' },
  { icon: 'bi-shield-lock-fill', title: '100% sécurisé', text: 'Vos données personnelles protégées' },
  { icon: 'bi-file-earmark-text-fill', title: 'Des centaines de modèles', text: 'Gratuits et premium' },
  { icon: 'bi-stars', title: 'IA intelligente', text: 'Des lettres professionnelles et personnalisées' },
]

const WHY = [
  { icon: 'bi-clock-history', title: 'Gain de temps', text: 'Créez vos lettres en quelques secondes seulement.' },
  { icon: 'bi-shield-check', title: 'Fiable et sécurisé', text: 'Vos données personnelles sont protégées.' },
  { icon: 'bi-phone', title: 'Multi-appareils', text: 'Accessible sur ordinateur, tablette et mobile.' },
  { icon: 'bi-award', title: 'Modèles professionnels', text: 'Des designs modernes et personnalisables.' },
]

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-gradient-to-br from-indigo-200/50 to-violet-200/50 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-24">
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

          {/* Letter / pen mockup */}
          <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <div className="absolute -left-6 top-10 hidden h-24 w-24 rounded-full bg-emerald-100/60 blur-2xl lg:block" />
            <div className="relative mx-auto max-w-xs rotate-1 rounded-2xl bg-white p-6 paper-shadow sm:max-w-sm">
              <p className="text-sm font-semibold text-slate-900">Lettre de motivation</p>
              <div className="mt-4 space-y-2">
                <div className="h-2 w-11/12 rounded bg-slate-100" />
                <div className="h-2 w-full rounded bg-slate-100" />
                <div className="h-2 w-10/12 rounded bg-slate-100" />
                <div className="h-2 w-full rounded bg-slate-100" />
                <div className="h-2 w-9/12 rounded bg-slate-100" />
              </div>
              <div className="mt-5 space-y-2">
                <div className="h-2 w-full rounded bg-slate-100" />
                <div className="h-2 w-11/12 rounded bg-slate-100" />
                <div className="h-2 w-8/12 rounded bg-slate-100" />
              </div>
              <div className="mt-6 flex items-center justify-between">
                <span className="font-serif text-lg italic text-slate-400">Votre signature</span>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-500">
                  <i className="bi bi-file-earmark-pdf-fill text-lg" aria-hidden />
                </span>
              </div>
            </div>

            <div className="absolute -right-2 -top-6 flex items-center gap-2 rounded-2xl bg-white px-4 py-3 paper-shadow sm:right-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-white">
                <i className="bi bi-robot" aria-hidden />
              </span>
              <div>
                <p className="text-xs font-semibold text-slate-900">L'IA rédige pour vous</p>
                <p className="text-[11px] text-slate-400">Simple, rapide, efficace</p>
              </div>
            </div>

            <div className="absolute -bottom-5 left-2 rounded-xl bg-white px-3 py-2 paper-shadow sm:left-8">
              <p className="text-xs font-semibold text-emerald-600">
                <i className="bi bi-check-circle-fill mr-1" aria-hidden /> Prêt en moins de 2 s
              </p>
            </div>
          </div>
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

          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {WHY.map((w) => (
              <div key={w.title} className="flex flex-col items-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                  <i className={`bi ${w.icon} text-xl`} aria-hidden />
                </div>
                <p className="text-sm font-semibold text-slate-900">{w.title}</p>
                <p className="mt-1 text-xs text-slate-500">{w.text}</p>
              </div>
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
