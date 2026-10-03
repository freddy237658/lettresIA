import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { TEMPLATES } from '@/data/templates'
import type { Letter, PaperStyle, Tone } from '@/types'
import { useAuth } from '@/context/AuthContext'
import { useLetters } from '@/context/LetterContext'
import { generateLetter, rewriteText } from '@/services/mockAI'
import { uid } from '@/services/storage'
import { FormField } from '@/components/ui/FormField'
import { Steps } from '@/components/ui/Steps'
import { Button } from '@/components/ui/Button'
import { Spinner, Badge } from '@/components/ui/Primitives'

const TONES: { id: Tone; label: string }[] = [
  { id: 'professionnel', label: 'Professionnel' },
  { id: 'formel', label: 'Formel' },
  { id: 'cordial', label: 'Cordial' },
  { id: 'administratif', label: 'Administratif' },
  { id: 'academique', label: 'Académique' },
  { id: 'simple', label: 'Simple' },
]

const AI_STEPS = ['Analyse de vos informations', "Rédaction par l'IA", 'Mise en forme professionnelle']

export default function CreateLetter() {
  const { templateId } = useParams()
  const template = TEMPLATES.find((t) => t.id === templateId)
  const navigate = useNavigate()
  const { user, consumeCredit, plan } = useAuth()
  const { addLetter } = useLetters()

  const [step, setStep] = useState<'form' | 'generating' | 'result'>('form')
  const [data, setData] = useState<Record<string, string>>(() => ({
    nom: user ? `${user.firstName} ${user.lastName}`.trim() : '',
    email: user?.email ?? '',
    telephone: user?.phone ?? '',
    ville: user?.city ?? '',
    profession: user?.profession ?? '',
  }))
  const [tone, setTone] = useState<Tone>('professionnel')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [content, setContent] = useState('')
  const [style, setStyle] = useState<PaperStyle>({ fontFamily: 'sans', fontSize: 15, lineHeight: 1.6, margin: 'normal', signature: true })
  const [savedLetterId, setSavedLetterId] = useState<string | null>(null)
  const [aiStepIndex, setAiStepIndex] = useState(0)
  const [creditError, setCreditError] = useState(false)

  const progress = useMemo(() => (step === 'form' ? 1 : step === 'generating' ? 2 : 3), [step])

  if (!template) {
    return (
      <div className="mx-auto max-w-lg py-16 text-center text-sm text-slate-500">
        Modèle introuvable.{' '}
        <Link to="/modeles" className="font-semibold text-indigo-600 hover:underline">
          Retour aux modèles
        </Link>
      </div>
    )
  }

  function validate() {
    const next: Record<string, string> = {}
    for (const field of template!.fields) {
      if (field.required && !data[field.name]?.trim()) next[field.name] = 'Ce champ est requis.'
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleGenerate() {
    if (!validate()) return
    if (!consumeCredit()) {
      setCreditError(true)
      return
    }
    setCreditError(false)
    setStep('generating')
    setAiStepIndex(0)

    const tickA = setTimeout(() => setAiStepIndex(1), 500)
    const tickB = setTimeout(() => setAiStepIndex(2), 1100)

    const result = await generateLetter(template!, data, tone)
    clearTimeout(tickA)
    clearTimeout(tickB)
    setContent(result.content)

    const letter: Letter = {
      id: uid('letter'),
      templateId: template!.id,
      title: template!.name,
      data,
      tone,
      content: result.content,
      style,
      versions: [{ id: uid('ver'), number: 1, label: 'Version initiale', content: result.content, createdAt: new Date().toISOString() }],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    addLetter(letter)
    setSavedLetterId(letter.id)
    setStep('result')
  }

  async function handleRewrite(action: 'corriger' | 'reformuler' | 'raccourcir' | 'developper' | 'professionnaliser') {
    const next = await rewriteText(content, action)
    setContent(next)
  }

  function handlePrint() {
    window.print()
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <Link to={`/modeles/${template.id}`} className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-indigo-600">
        <i className="bi bi-arrow-left" aria-hidden /> Retour au modèle
      </Link>

      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-slate-900">{template.name}</h1>
          <p className="text-sm text-slate-500">Complétez le formulaire, choisissez un ton, laissez l'IA rédiger.</p>
        </div>
        <Steps steps={['Informations', 'Rédaction', 'Résultat']} current={progress} />
      </div>

      {/* STEP 1 — FORM */}
      {step === 'form' && (
        <div className="mt-8 rounded-2xl border border-slate-100 bg-white p-6">
          <div className="grid gap-x-4 gap-y-5 sm:grid-cols-2">
            {template.fields.map((field) => (
              <FormField
                key={field.name}
                field={field}
                value={data[field.name] ?? ''}
                onChange={(v) => setData((d) => ({ ...d, [field.name]: v }))}
                error={errors[field.name]}
              />
            ))}
          </div>

          <div className="mt-7">
            <p className="mb-2 text-sm font-medium text-slate-700">Ton de la lettre</p>
            <div className="flex flex-wrap gap-2">
              {TONES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTone(t.id)}
                  className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
                    tone === t.id ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-200 text-slate-600 hover:border-indigo-300'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {creditError && (
            <p className="mt-5 rounded-xl bg-amber-50 px-4 py-3 text-sm font-medium text-amber-700">
              Vous avez épuisé vos crédits IA gratuits.{' '}
              <Link to="/tarifs" className="underline">
                Passez à Premium
              </Link>{' '}
              pour des générations illimitées.
            </p>
          )}

          <div className="mt-7 flex items-center justify-between">
            <p className="text-xs text-slate-400">
              {plan === 'gratuit' ? "Cette génération consommera 1 crédit." : 'Générations illimitées avec votre plan.'}
            </p>
            <Button size="lg" onClick={handleGenerate} icon={<i className="bi bi-stars" />}>
              Générer avec l'IA
            </Button>
          </div>
        </div>
      )}

      {/* STEP 2 — GENERATING */}
      {step === 'generating' && (
        <div className="mt-8 flex flex-col items-center rounded-2xl border border-slate-100 bg-[#181433] px-6 py-16 text-center text-white">
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
            <i className="bi bi-robot text-3xl text-indigo-300" aria-hidden />
          </span>
          <h2 className="mt-5 text-lg font-bold">Votre lettre est en cours de création…</h2>
          <p className="mt-1 max-w-sm text-sm text-slate-400">
            Notre IA analyse vos informations et rédige une lettre professionnelle et personnalisée.
          </p>
          <div className="mt-6 h-1.5 w-64 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-1/2 animate-pulse rounded-full bg-gradient-to-r from-indigo-500 to-violet-500" />
          </div>
          <ul className="mt-6 space-y-2 text-left text-sm">
            {AI_STEPS.map((label, i) => (
              <li key={label} className="flex items-center gap-2">
                {i < aiStepIndex ? (
                  <i className="bi bi-check-circle-fill text-emerald-400" aria-hidden />
                ) : i === aiStepIndex ? (
                  <Spinner className="h-4 w-4 text-indigo-300" />
                ) : (
                  <span className="h-4 w-4 rounded-full border border-white/20" />
                )}
                <span className={i <= aiStepIndex ? 'text-white' : 'text-slate-500'}>{label}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* STEP 3 — RESULT / EDITOR */}
      {step === 'result' && (
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_280px]">
          <div>
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <Badge tone="emerald">
                <i className="bi bi-check-circle-fill" aria-hidden /> Votre lettre est prête
              </Badge>
              <div className="flex flex-wrap gap-2 print:hidden">
                {(['corriger', 'reformuler', 'professionnaliser', 'raccourcir'] as const).map((action) => (
                  <button
                    key={action}
                    type="button"
                    onClick={() => handleRewrite(action)}
                    className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium capitalize text-slate-600 hover:border-indigo-300 hover:text-indigo-700"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>

            <div
              className="rounded-2xl bg-white p-8 paper-shadow sm:p-12 print:shadow-none print:paper-shadow-none"
              style={{
                fontFamily: style.fontFamily === 'serif' ? 'Georgia, serif' : undefined,
                fontSize: style.fontSize,
                lineHeight: style.lineHeight,
                padding: style.margin === 'narrow' ? '1.5rem' : style.margin === 'wide' ? '3.5rem' : '2.5rem',
              }}
            >
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={16}
                className="w-full resize-none whitespace-pre-wrap border-0 text-slate-800 focus:outline-none"
                style={{ fontFamily: 'inherit', fontSize: 'inherit', lineHeight: 'inherit' }}
              />
            </div>

            <div className="mt-5 flex flex-wrap gap-3 print:hidden">
              <Button icon={<i className="bi bi-file-earmark-pdf-fill" />} onClick={handlePrint}>
                Télécharger le PDF
              </Button>
              {savedLetterId && (
                <Button
                  variant="outline"
                  icon={<i className="bi bi-clock-history" />}
                  onClick={() => navigate('/app/mes-lettres')}
                >
                  Voir mes lettres
                </Button>
              )}
              <Button
                variant="ghost"
                icon={<i className="bi bi-arrow-repeat" />}
                onClick={() => {
                  setStep('form')
                }}
              >
                Modifier les informations
              </Button>
            </div>
          </div>

          {/* Style panel */}
          <div className="h-fit rounded-2xl border border-slate-100 bg-white p-5 print:hidden">
            <h3 className="text-sm font-semibold text-slate-900">Mise en forme</h3>

            <div className="mt-4">
              <p className="mb-1.5 text-xs font-medium text-slate-500">Police</p>
              <div className="flex gap-2">
                {(['sans', 'serif'] as const).map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setStyle((s) => ({ ...s, fontFamily: f }))}
                    className={`flex-1 rounded-lg border py-1.5 text-xs font-medium capitalize transition ${
                      style.fontFamily === f ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    {f === 'sans' ? 'Sans-serif' : 'Serif'}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <p className="mb-1.5 text-xs font-medium text-slate-500">Taille du texte — {style.fontSize}px</p>
              <input
                type="range"
                min={12}
                max={20}
                value={style.fontSize}
                onChange={(e) => setStyle((s) => ({ ...s, fontSize: Number(e.target.value) }))}
                className="w-full accent-indigo-600"
              />
            </div>

            <div className="mt-4">
              <p className="mb-1.5 text-xs font-medium text-slate-500">Interligne — {style.lineHeight.toFixed(1)}</p>
              <input
                type="range"
                min={1.2}
                max={2}
                step={0.1}
                value={style.lineHeight}
                onChange={(e) => setStyle((s) => ({ ...s, lineHeight: Number(e.target.value) }))}
                className="w-full accent-indigo-600"
              />
            </div>

            <div className="mt-4">
              <p className="mb-1.5 text-xs font-medium text-slate-500">Marges</p>
              <div className="flex gap-2">
                {(['narrow', 'normal', 'wide'] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setStyle((s) => ({ ...s, margin: m }))}
                    className={`flex-1 rounded-lg border py-1.5 text-xs font-medium capitalize transition ${
                      style.margin === m ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    {m === 'narrow' ? 'Étroit' : m === 'normal' ? 'Normal' : 'Large'}
                  </button>
                ))}
              </div>
            </div>

            <label className="mt-4 flex items-center justify-between text-xs font-medium text-slate-500">
              Signature
              <input
                type="checkbox"
                checked={style.signature}
                onChange={(e) => setStyle((s) => ({ ...s, signature: e.target.checked }))}
                className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-400"
              />
            </label>
          </div>
        </div>
      )}
    </div>
  )
}
