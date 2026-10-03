import { useState } from 'react'
import type { Settings as SettingsType, Tone } from '@/types'
import { Button } from '@/components/ui/Button'

const TONES: { id: Tone; label: string }[] = [
  { id: 'professionnel', label: 'Professionnel' },
  { id: 'formel', label: 'Formel' },
  { id: 'cordial', label: 'Cordial' },
  { id: 'administratif', label: 'Administratif' },
  { id: 'academique', label: 'Académique' },
  { id: 'simple', label: 'Simple' },
]

export default function Settings() {
  const [settings, setSettings] = useState<SettingsType>({
    defaultTone: 'professionnel',
    defaultFont: 'sans',
    notifyLetters: true,
    notifyCredits: true,
    notifyNews: false,
  })
  const [saved, setSaved] = useState(false)

  function save() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Paramètres</h1>
      <p className="mt-1 text-sm text-slate-500">Préférences par défaut pour vos futures lettres.</p>

      <div className="mt-6 space-y-6 rounded-2xl border border-slate-100 bg-white p-6">
        <div>
          <p className="mb-2 text-sm font-medium text-slate-700">Ton par défaut</p>
          <div className="flex flex-wrap gap-2">
            {TONES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setSettings((s) => ({ ...s, defaultTone: t.id }))}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
                  settings.defaultTone === t.id ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-200 text-slate-600'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-slate-700">Police par défaut</p>
          <div className="flex gap-2">
            {(['sans', 'serif'] as const).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setSettings((s) => ({ ...s, defaultFont: f }))}
                className={`rounded-lg border px-4 py-1.5 text-xs font-medium capitalize transition ${
                  settings.defaultFont === f ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-200 text-slate-600'
                }`}
              >
                {f === 'sans' ? 'Sans-serif' : 'Serif'}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3 border-t border-slate-100 pt-5">
          <p className="text-sm font-medium text-slate-700">Notifications</p>
          {[
            { key: 'notifyLetters' as const, label: 'Une lettre est terminée' },
            { key: 'notifyCredits' as const, label: 'Crédits faibles' },
            { key: 'notifyNews' as const, label: 'Nouveaux modèles et actualités' },
          ].map((opt) => (
            <label key={opt.key} className="flex items-center justify-between text-sm text-slate-600">
              {opt.label}
              <input
                type="checkbox"
                checked={settings[opt.key]}
                onChange={(e) => setSettings((s) => ({ ...s, [opt.key]: e.target.checked }))}
                className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-400"
              />
            </label>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Button onClick={save}>Enregistrer</Button>
          {saved && <span className="text-xs font-medium text-emerald-600">Préférences enregistrées.</span>}
        </div>
      </div>
    </div>
  )
}
