import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CATEGORIES, getCategory } from '@/data/categories'
import { TEMPLATES } from '@/data/templates'
import { Badge } from '@/components/ui/Primitives'
import { useLetters } from '@/context/LetterContext'
import { useAuth } from '@/context/AuthContext'

type PriceFilter = 'tous' | 'gratuit' | 'premium'

export default function Catalog() {
  const { categoryId } = useParams()
  const activeCategory = categoryId ? getCategory(categoryId) : undefined
  const { toggleFavorite, isFavorite } = useLetters()
  const { isAuthenticated } = useAuth()

  const [query, setQuery] = useState('')
  const [category, setCategory] = useState(categoryId ?? 'tous')
  const [price, setPrice] = useState<PriceFilter>('tous')

  const results = useMemo(() => {
    return TEMPLATES.filter((t) => {
      const matchesQuery = query.trim().length === 0 || t.name.toLowerCase().includes(query.toLowerCase())
      const matchesCategory = category === 'tous' || t.categoryId === category
      const matchesPrice = price === 'tous' || (price === 'gratuit' ? !t.isPremium : t.isPremium)
      return matchesQuery && matchesCategory && matchesPrice
    })
  }, [query, category, price])

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div>
        <Badge tone="indigo">
          <i className="bi bi-grid-3x3-gap-fill" aria-hidden /> Catalogue des modèles
        </Badge>
        <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
          {activeCategory ? activeCategory.name : 'Tous les modèles de lettres'}
        </h1>
        <p className="mt-1 max-w-xl text-sm text-slate-500">
          {activeCategory ? activeCategory.description : 'Choisissez parmi nos modèles gratuits et premium, prêts à être personnalisés par l’IA.'}
        </p>
      </div>

      {/* Search + filters */}
      <div className="mt-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-xs">
          <i className="bi bi-search absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un modèle…"
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="flex rounded-xl border border-slate-200 bg-white p-1">
            {(['tous', 'gratuit', 'premium'] as PriceFilter[]).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPrice(p)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition ${
                  price === p ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Category chips */}
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setCategory('tous')}
          className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
            category === 'tous' ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-200 bg-white text-slate-600 hover:border-indigo-300'
          }`}
        >
          Toutes les catégories
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setCategory(c.id)}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
              category === c.id ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-200 bg-white text-slate-600 hover:border-indigo-300'
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* Results */}
      <p className="mt-6 text-xs font-medium text-slate-400">
        {results.length} modèle{results.length > 1 ? 's' : ''} trouvé{results.length > 1 ? 's' : ''}
      </p>

      <div className="mt-3 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((t) => {
          const cat = getCategory(t.categoryId)
          const fav = isFavorite(t.id)
          return (
            <div key={t.id} className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/60">
              <Link to={`/modeles/${t.id}`} className="block">
                <div className="flex h-40 items-center justify-center bg-gradient-to-b from-slate-50 to-white p-6">
                  <div className="h-full w-28 rounded-md bg-white paper-shadow">
                    <div className="space-y-1.5 p-3">
                      <div className="h-1.5 w-4/5 rounded bg-slate-100" />
                      <div className="h-1.5 w-full rounded bg-slate-100" />
                      <div className="h-1.5 w-3/5 rounded bg-slate-100" />
                      <div className="mt-3 h-1.5 w-full rounded bg-slate-100" />
                      <div className="h-1.5 w-4/5 rounded bg-slate-100" />
                    </div>
                  </div>
                </div>
              </Link>
              <div className="p-4">
                <div className="flex items-center justify-between gap-2">
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
                    className="flex-1 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 py-2 text-center text-xs font-semibold text-white transition hover:brightness-110"
                  >
                    Utiliser ce modèle
                  </Link>
                  {isAuthenticated && (
                    <button
                      type="button"
                      onClick={() => toggleFavorite(t.id)}
                      aria-label="Ajouter aux favoris"
                      className={`flex h-8 w-8 items-center justify-center rounded-lg border transition ${
                        fav ? 'border-rose-200 bg-rose-50 text-rose-500' : 'border-slate-200 text-slate-400 hover:text-rose-500'
                      }`}
                    >
                      <i className={`bi ${fav ? 'bi-heart-fill' : 'bi-heart'}`} aria-hidden />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {results.length === 0 && (
        <p className="mt-10 text-center text-sm text-slate-400">Aucun modèle ne correspond à votre recherche.</p>
      )}
    </div>
  )
}
