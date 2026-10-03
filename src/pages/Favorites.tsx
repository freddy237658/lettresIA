import { Link } from 'react-router-dom'
import { useLetters } from '@/context/LetterContext'
import { TEMPLATES } from '@/data/templates'
import { getCategory } from '@/data/categories'
import { Badge, EmptyState } from '@/components/ui/Primitives'
import { LinkButton } from '@/components/ui/Button'

export default function Favorites() {
  const { favorites, toggleFavorite } = useLetters()
  const templates = TEMPLATES.filter((t) => favorites.includes(t.id))

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Mes favoris</h1>
      <p className="mt-1 text-sm text-slate-500">Les modèles que vous avez mis de côté.</p>

      {templates.length === 0 ? (
        <div className="mt-6">
          <EmptyState
            icon="bi-heart"
            title="Aucun favori pour le moment"
            text="Ajoutez des modèles en cliquant sur le cœur du catalogue."
            action={<LinkButton to="/modeles">Parcourir les modèles</LinkButton>}
          />
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((t) => {
            const cat = getCategory(t.categoryId)
            return (
              <div key={t.id} className="rounded-2xl border border-slate-100 bg-white p-4">
                <div className="flex items-center justify-between">
                  <span className={`text-[11px] font-semibold ${cat?.accent}`}>{cat?.name}</span>
                  {t.isPremium ? <Badge tone="violet">Premium</Badge> : <Badge tone="emerald">Gratuit</Badge>}
                </div>
                <Link to={`/modeles/${t.id}`}>
                  <h3 className="mt-1.5 text-sm font-bold text-slate-900 hover:text-indigo-700">{t.name}</h3>
                </Link>
                <p className="mt-1 line-clamp-2 text-xs text-slate-500">{t.description}</p>
                <div className="mt-4 flex items-center gap-2">
                  <Link
                    to={`/modeles/${t.id}`}
                    className="flex-1 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 py-2 text-center text-xs font-semibold text-white hover:brightness-110"
                  >
                    Utiliser
                  </Link>
                  <button
                    type="button"
                    onClick={() => toggleFavorite(t.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-rose-200 bg-rose-50 text-rose-500"
                    aria-label="Retirer des favoris"
                  >
                    <i className="bi bi-heart-fill" aria-hidden />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
