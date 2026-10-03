import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLetters } from '@/context/LetterContext'
import { TEMPLATES } from '@/data/templates'
import { Badge, EmptyState } from '@/components/ui/Primitives'
import { LinkButton } from '@/components/ui/Button'

type Filter = 'toutes' | 'gratuites' | 'premium'

export default function History() {
  const { letters, deleteLetter, duplicateLetter } = useLetters()
  const [filter, setFilter] = useState<Filter>('toutes')

  const filtered = letters.filter((l) => {
    if (filter === 'toutes') return true
    const template = TEMPLATES.find((t) => t.id === l.templateId)
    return filter === 'premium' ? template?.isPremium : !template?.isPremium
  })

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Historique de mes lettres</h1>
          <p className="mt-1 text-sm text-slate-500">Retrouvez toutes vos lettres créées.</p>
        </div>
        <LinkButton to="/modeles" icon={<i className="bi bi-plus-lg" />}>
          Nouvelle lettre
        </LinkButton>
      </div>

      <div className="mt-5 flex gap-2">
        {(['toutes', 'gratuites', 'premium'] as Filter[]).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold capitalize transition ${
              filter === f ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-200 bg-white text-slate-600'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-5 space-y-2">
        {filtered.length === 0 ? (
          <EmptyState
            icon="bi-file-earmark-text"
            title="Aucune lettre ici"
            text="Créez votre première lettre à partir d'un modèle."
            action={<LinkButton to="/modeles">Parcourir les modèles</LinkButton>}
          />
        ) : (
          filtered.map((l) => {
            const template = TEMPLATES.find((t) => t.id === l.templateId)
            return (
              <div key={l.id} className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
                <Link to={`/app/lettres/${l.id}`} className="flex min-w-0 items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    <i className="bi bi-file-earmark-text-fill" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-800">{l.title}</p>
                    <p className="text-xs text-slate-400">
                      {new Date(l.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })} · {new Date(l.createdAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </Link>

                <div className="flex items-center gap-2">
                  {template?.isPremium ? <Badge tone="violet">Premium</Badge> : <Badge tone="emerald">Gratuit</Badge>}
                  <span className="text-xs font-semibold text-slate-400">PDF</span>
                  <button
                    type="button"
                    onClick={() => duplicateLetter(l.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-indigo-600"
                    aria-label="Dupliquer"
                  >
                    <i className="bi bi-files" aria-hidden />
                  </button>
                  <Link
                    to={`/app/lettres/${l.id}`}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-indigo-600"
                    aria-label="Télécharger"
                  >
                    <i className="bi bi-download" aria-hidden />
                  </Link>
                  <button
                    type="button"
                    onClick={() => deleteLetter(l.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-500"
                    aria-label="Supprimer"
                  >
                    <i className="bi bi-trash3" aria-hidden />
                  </button>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
