import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useLetters } from '@/context/LetterContext'
import { TEMPLATES } from '@/data/templates'
import { Badge } from '@/components/ui/Primitives'
import { Button } from '@/components/ui/Button'

export default function LetterView() {
  const { letterId } = useParams()
  const navigate = useNavigate()
  const { letters, updateLetter, deleteLetter, duplicateLetter } = useLetters()
  const letter = letters.find((l) => l.id === letterId)
  const [content, setContent] = useState(letter?.content ?? '')
  const [saved, setSaved] = useState(true)

  if (!letter) {
    return (
      <div className="mx-auto max-w-lg py-16 text-center text-sm text-slate-500">
        Lettre introuvable.{' '}
        <Link to="/app/mes-lettres" className="font-semibold text-indigo-600 hover:underline">
          Retour à l'historique
        </Link>
      </div>
    )
  }

  const template = TEMPLATES.find((t) => t.id === letter.templateId)

  function handleSave() {
    updateLetter(letter!.id, { content })
    setSaved(true)
  }

  return (
    <div className="mx-auto max-w-3xl">
      <Link to="/app/mes-lettres" className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-indigo-600">
        <i className="bi bi-arrow-left" aria-hidden /> Retour à l'historique
      </Link>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-slate-900">{letter.title}</h1>
          <p className="text-xs text-slate-400">
            Créée le {new Date(letter.createdAt).toLocaleDateString('fr-FR')} · Ton {letter.tone}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {template?.isPremium ? <Badge tone="violet">Premium</Badge> : <Badge tone="emerald">Gratuit</Badge>}
          {!saved && <Badge tone="amber">Modifications non enregistrées</Badge>}
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-white p-8 paper-shadow sm:p-10">
        <textarea
          value={content}
          onChange={(e) => {
            setContent(e.target.value)
            setSaved(false)
          }}
          rows={18}
          className="w-full resize-none whitespace-pre-wrap border-0 text-[15px] leading-relaxed text-slate-800 focus:outline-none"
        />
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <Button icon={<i className="bi bi-save-fill" />} onClick={handleSave} disabled={saved}>
          Enregistrer
        </Button>
        <Button variant="outline" icon={<i className="bi bi-file-earmark-pdf-fill" />} onClick={() => window.print()}>
          Télécharger le PDF
        </Button>
        <Button variant="outline" icon={<i className="bi bi-files" />} onClick={() => duplicateLetter(letter.id)}>
          Dupliquer
        </Button>
        <Button
          variant="danger"
          icon={<i className="bi bi-trash3" />}
          onClick={() => {
            deleteLetter(letter.id)
            navigate('/app/mes-lettres')
          }}
        >
          Supprimer
        </Button>
      </div>
    </div>
  )
}
