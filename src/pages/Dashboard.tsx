import { Link } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { useLetters } from '@/context/LetterContext'
import { CATEGORIES } from '@/data/categories'
import { TEMPLATES } from '@/data/templates'
import { Card, EmptyState } from '@/components/ui/Primitives'
import { LinkButton } from '@/components/ui/Button'

export default function Dashboard() {
  const { user, plan, credits } = useAuth()
  const { letters, favorites } = useLetters()

  const stats = [
    { label: 'Lettres créées', value: letters.length, icon: 'bi-file-earmark-text-fill', tone: 'bg-rose-50 text-rose-500' },
    { label: 'Modèles utilisés', value: new Set(letters.map((l) => l.templateId)).size, icon: 'bi-grid-fill', tone: 'bg-indigo-50 text-indigo-500' },
    { label: 'Téléchargements', value: letters.length, icon: 'bi-download', tone: 'bg-emerald-50 text-emerald-500' },
    { label: 'Favoris', value: favorites.length, icon: 'bi-heart-fill', tone: 'bg-pink-50 text-pink-500' },
  ]

  const popular = TEMPLATES.filter((t) => t.popular).slice(0, 5)

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
        Bonjour, {user?.firstName || 'là'} 👋
      </h1>
      <p className="mt-1 text-sm text-slate-500">Voici un aperçu de votre activité sur LettreAI.</p>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="p-5">
            <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${s.tone}`}>
              <i className={`bi ${s.icon}`} aria-hidden />
            </div>
            <p className="text-2xl font-extrabold text-slate-900">{s.value}</p>
            <p className="text-xs text-slate-500">{s.label}</p>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-sm font-semibold text-slate-900">Types de lettres populaires</h2>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/categories/${cat.id}`}
              className="flex flex-col items-center gap-2 rounded-2xl border border-slate-100 bg-white p-4 text-center transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${cat.iconBox}`}>
                <i className={`bi ${cat.icon}`} aria-hidden />
              </span>
              <span className="text-xs font-semibold text-slate-700">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {plan === 'gratuit' && (
        <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-5 text-white sm:flex-row">
          <div>
            <p className="text-sm font-semibold">Accédez à tous les modèles premium</p>
            <p className="text-xs text-indigo-100">
              Plus de 200 modèles professionnels et personnalisés · {credits} crédit{credits > 1 ? 's' : ''} gratuit
              {credits > 1 ? 's' : ''} restant{credits > 1 ? 's' : ''}
            </p>
          </div>
          <LinkButton to="/tarifs" variant="secondary" className="!bg-white !text-indigo-700">
            Voir les offres
          </LinkButton>
        </div>
      )}

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-900">Mes dernières lettres</h2>
            <Link to="/app/mes-lettres" className="text-xs font-semibold text-indigo-600 hover:underline">
              Tout voir
            </Link>
          </div>
          <div className="mt-3 space-y-2">
            {letters.length === 0 ? (
              <EmptyState
                icon="bi-file-earmark-plus"
                title="Aucune lettre pour le moment"
                text="Choisissez un modèle pour créer votre première lettre."
                action={
                  <LinkButton to="/modeles" size="sm">
                    Parcourir les modèles
                  </LinkButton>
                }
              />
            ) : (
              letters.slice(0, 5).map((l) => (
                <Link
                  key={l.id}
                  to={`/app/lettres/${l.id}`}
                  className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white px-4 py-3 transition hover:border-indigo-200"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                      <i className="bi bi-file-earmark-text-fill" aria-hidden />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{l.title}</p>
                      <p className="text-xs text-slate-400">{new Date(l.createdAt).toLocaleDateString('fr-FR')}</p>
                    </div>
                  </div>
                  <i className="bi bi-chevron-right text-slate-300" aria-hidden />
                </Link>
              ))
            )}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-slate-900">Modèles populaires</h2>
          <div className="mt-3 space-y-2">
            {popular.map((t) => (
              <Link
                key={t.id}
                to={`/modeles/${t.id}`}
                className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white px-4 py-3 transition hover:border-indigo-200"
              >
                <span className="text-sm font-medium text-slate-700">{t.name}</span>
                {t.isPremium ? (
                  <span className="text-xs font-semibold text-violet-500">Premium</span>
                ) : (
                  <span className="text-xs font-semibold text-emerald-500">Gratuit</span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
