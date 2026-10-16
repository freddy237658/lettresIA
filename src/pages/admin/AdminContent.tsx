import { useState } from 'react'
import { FAQ as SEED_FAQ } from '@/data/faq'
import { Button } from '@/components/ui/Button'
import { uid } from '@/services/storage'

interface FaqEntry {
  id: string
  q: string
  a: string
}

export default function AdminContent() {
  const [tab, setTab] = useState<'notification' | 'faq'>('notification')
  const [faq, setFaq] = useState<FaqEntry[]>(SEED_FAQ.map((f) => ({ id: uid('faq'), ...f })))

  const [broadcast, setBroadcast] = useState({ title: '', text: '', type: 'info' as 'info' | 'template' | 'security' })
  const [sent, setSent] = useState(false)

  const [newFaq, setNewFaq] = useState({ q: '', a: '' })

  function sendBroadcast() {
    if (!broadcast.title || !broadcast.text) return
    setSent(true)
    setBroadcast({ title: '', text: '', type: 'info' })
    setTimeout(() => setSent(false), 2500)
  }

  function addFaq() {
    if (!newFaq.q.trim() || !newFaq.a.trim()) return
    setFaq((prev) => [...prev, { id: uid('faq'), ...newFaq }])
    setNewFaq({ q: '', a: '' })
  }

  function removeFaq(id: string) {
    setFaq((prev) => prev.filter((f) => f.id !== id))
  }

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Notifications & FAQ</h1>
      <p className="mt-1 text-sm text-slate-500">Contenus diffusés aux utilisateurs (§5.10 et §5.12 du cahier des charges).</p>

      <div className="mt-5 flex gap-1 border-b border-slate-100">
        {(['notification', 'faq'] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`border-b-2 px-3 py-2.5 text-sm font-semibold transition ${
              tab === t ? 'border-indigo-600 text-indigo-700' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {t === 'notification' ? 'Diffuser une notification' : 'FAQ'}
          </button>
        ))}
      </div>

      {tab === 'notification' && (
        <div className="mt-6 space-y-4 rounded-2xl border border-slate-100 bg-white p-6">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Titre</label>
            <input
              value={broadcast.title}
              onChange={(e) => setBroadcast((b) => ({ ...b, title: e.target.value }))}
              placeholder="Ex. Nouveau modèle disponible"
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Message</label>
            <textarea
              rows={3}
              value={broadcast.text}
              onChange={(e) => setBroadcast((b) => ({ ...b, text: e.target.value }))}
              className="w-full resize-none rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
          </div>
          <div>
            <p className="mb-1.5 text-sm font-medium text-slate-700">Type</p>
            <div className="flex gap-2">
              {(['info', 'template', 'security'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setBroadcast((b) => ({ ...b, type: t }))}
                  className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold capitalize transition ${
                    broadcast.type === t ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-200 text-slate-600'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button onClick={sendBroadcast} icon={<i className="bi bi-broadcast" />}>
              Diffuser à tous les utilisateurs
            </Button>
            {sent && <span className="text-xs font-medium text-emerald-600">Notification diffusée.</span>}
          </div>
        </div>
      )}

      {tab === 'faq' && (
        <div className="mt-6">
          <div className="rounded-2xl border border-slate-100 bg-white p-5">
            <p className="text-sm font-semibold text-slate-800">Ajouter une question</p>
            <input
              value={newFaq.q}
              onChange={(e) => setNewFaq((f) => ({ ...f, q: e.target.value }))}
              placeholder="Question"
              className="mt-3 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
            <textarea
              value={newFaq.a}
              onChange={(e) => setNewFaq((f) => ({ ...f, a: e.target.value }))}
              placeholder="Réponse"
              rows={2}
              className="mt-2 w-full resize-none rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
            <Button className="mt-3" size="sm" icon={<i className="bi bi-plus-lg" />} onClick={addFaq}>
              Ajouter à la FAQ
            </Button>
          </div>

          <div className="mt-4 space-y-2">
            {faq.map((f) => (
              <div key={f.id} className="flex items-start justify-between gap-3 rounded-2xl border border-slate-100 bg-white p-4">
                <div>
                  <p className="text-sm font-semibold text-slate-800">{f.q}</p>
                  <p className="mt-1 text-xs text-slate-500">{f.a}</p>
                </div>
                <button
                  type="button"
                  onClick={() => removeFaq(f.id)}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-500"
                  aria-label="Supprimer"
                >
                  <i className="bi bi-trash3" aria-hidden />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}