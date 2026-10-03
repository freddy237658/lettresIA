import { Link, useNavigate, useParams } from 'react-router-dom'
import { TEMPLATES } from '@/data/templates'
import { getCategory } from '@/data/categories'
import { Badge } from '@/components/ui/Primitives'
import { Button, LinkButton } from '@/components/ui/Button'
import { useAuth } from '@/context/AuthContext'
import { useLetters } from '@/context/LetterContext'

export default function TemplateDetail() {
  const { templateId } = useParams()
  const template = TEMPLATES.find((t) => t.id === templateId)
  const navigate = useNavigate()
  const { isAuthenticated, plan } = useAuth()
  const { toggleFavorite, isFavorite } = useLetters()

  if (!template) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <p className="text-sm text-slate-500">Ce modèle est introuvable.</p>
        <LinkButton to="/modeles" className="mt-4 inline-flex" variant="outline">
          Retour aux modèles
        </LinkButton>
      </div>
    )
  }

  const category = getCategory(template.categoryId)
  const locked = template.isPremium && plan === 'gratuit'
  const fav = isFavorite(template.id)

  function handleUse() {
    if (!isAuthenticated) {
      navigate('/connexion', { state: { from: `/modeles/${template!.id}` } })
      return
    }
    if (locked) {
      navigate('/tarifs')
      return
    }
    navigate(`/app/creer/${template!.id}`)
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <Link to="/modeles" className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-indigo-600">
        <i className="bi bi-arrow-left" aria-hidden /> Retour aux modèles
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:items-start">
        <div className="flex items-center justify-center rounded-3xl bg-gradient-to-b from-slate-50 to-white p-10">
          <div className="w-64 rounded-lg bg-white p-6 paper-shadow">
            <div className="mb-4 h-2 w-1/2 rounded bg-slate-200" />
            <div className="space-y-2">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className={`h-1.5 rounded bg-slate-100 ${i % 3 === 2 ? 'w-2/3' : 'w-full'}`} />
              ))}
            </div>
            <div className="mt-6 h-2 w-1/3 rounded bg-slate-200" />
          </div>
        </div>

        <div>
          <span className={`text-xs font-semibold ${category?.accent}`}>{category?.name}</span>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">{template.name}</h1>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            {template.isPremium ? <Badge tone="violet">Premium</Badge> : <Badge tone="emerald">Gratuit</Badge>}
            {template.popular && <Badge tone="amber">Populaire</Badge>}
            <span className="inline-flex items-center gap-1 text-xs text-amber-500">
              <i className="bi bi-star-fill" aria-hidden /> 4.8 <span className="text-slate-400">(134 avis)</span>
            </span>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-slate-600">{template.description}</p>

          <ul className="mt-5 space-y-2 text-sm text-slate-600">
            <li className="flex items-center gap-2">
              <i className="bi bi-check-circle-fill text-emerald-500" aria-hidden /> Formulaire personnalisé
            </li>
            <li className="flex items-center gap-2">
              <i className="bi bi-check-circle-fill text-emerald-500" aria-hidden /> Rédaction assistée par l'IA
            </li>
            <li className="flex items-center gap-2">
              <i className="bi bi-check-circle-fill text-emerald-500" aria-hidden /> PDF téléchargeable
            </li>
          </ul>

          <div className="mt-7 flex items-center gap-3">
            <Button size="lg" onClick={handleUse} icon={locked ? <i className="bi bi-lock-fill" /> : <i className="bi bi-magic" />}>
              {locked ? 'Débloquer avec Premium' : 'Utiliser ce modèle'}
            </Button>
            <button
              type="button"
              onClick={() => (isAuthenticated ? toggleFavorite(template.id) : navigate('/connexion'))}
              className={`flex h-11 w-11 items-center justify-center rounded-xl border transition ${
                fav ? 'border-rose-200 bg-rose-50 text-rose-500' : 'border-slate-200 text-slate-400 hover:text-rose-500'
              }`}
              aria-label="Ajouter aux favoris"
            >
              <i className={`bi ${fav ? 'bi-heart-fill' : 'bi-heart'}`} aria-hidden />
            </button>
          </div>

          {locked && (
            <p className="mt-3 text-xs text-slate-400">
              Ce modèle fait partie de l'offre Premium.{' '}
              <Link to="/tarifs" className="font-semibold text-indigo-600 hover:underline">
                Voir les offres
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
