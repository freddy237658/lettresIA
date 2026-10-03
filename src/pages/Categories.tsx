import { Link } from 'react-router-dom'
import { CATEGORIES } from '@/data/categories'
import { TEMPLATES } from '@/data/templates'
import { Badge } from '@/components/ui/Primitives'

export default function Categories() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <Badge tone="indigo">
        <i className="bi bi-collection-fill" aria-hidden /> Nos catégories
      </Badge>
      <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
        Toutes les catégories de lettres
      </h1>
      <p className="mt-2 max-w-xl text-sm text-slate-500">
        Des centaines de modèles adaptés à tous vos besoins, gratuitement ou en version premium.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {CATEGORIES.map((cat) => {
          const count = TEMPLATES.filter((t) => t.categoryId === cat.id).length
          return (
            <Link
              key={cat.id}
              to={`/categories/${cat.id}`}
              className={`group flex items-start gap-4 rounded-2xl border bg-gradient-to-b p-6 transition hover:-translate-y-0.5 hover:shadow-md ${cat.card}`}
            >
              <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${cat.iconBox}`}>
                <i className={`bi ${cat.icon} text-xl`} aria-hidden />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-slate-900">{cat.name}</h2>
                  <span className="text-xs text-slate-400">· {count} modèles</span>
                </div>
                <p className="mt-1 text-sm text-slate-500">{cat.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {cat.examples.slice(0, 4).map((ex) => (
                    <span key={ex} className="rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-slate-500">
                      {ex}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
