import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { useLetters } from '@/context/LetterContext'
import { PLANS, formatPrice } from '@/data/plans'
import { Button } from '@/components/ui/Button'
import { Badge, EmptyState } from '@/components/ui/Primitives'

type Tab = 'profil' | 'abonnement' | 'facturation' | 'securite'

export default function Account() {
  const { user, updateProfile, plan, setPlan } = useAuth()
  const { payments } = useLetters()
  const [tab, setTab] = useState<Tab>('profil')
  const [form, setForm] = useState({
    firstName: user?.firstName ?? '',
    lastName: user?.lastName ?? '',
    email: user?.email ?? '',
    phone: user?.phone ?? '',
    city: user?.city ?? '',
    country: user?.country ?? '',
  })
  const [savedMsg, setSavedMsg] = useState(false)

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    updateProfile(form)
    setSavedMsg(true)
    setTimeout(() => setSavedMsg(false), 2500)
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: 'profil', label: 'Profil' },
    { id: 'abonnement', label: 'Abonnement' },
    { id: 'facturation', label: 'Facturation' },
    { id: 'securite', label: 'Sécurité' },
  ]

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Mon compte</h1>

      <div className="mt-5 flex gap-1 border-b border-slate-100">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`border-b-2 px-3 py-2.5 text-sm font-semibold transition ${
              tab === t.id ? 'border-indigo-600 text-indigo-700' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'profil' && (
        <form onSubmit={onSubmit} className="mt-6 space-y-4 rounded-2xl border border-slate-100 bg-white p-6">
          <div className="flex items-center gap-4">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-xl font-bold text-indigo-600">
              {(form.firstName[0] ?? 'U').toUpperCase()}
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-800">Photo de profil</p>
              <button type="button" className="text-xs font-medium text-indigo-600 hover:underline">
                Changer la photo
              </button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Prénom</label>
              <input
                value={form.firstName}
                onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Nom</label>
              <input
                value={form.lastName}
                onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">E-mail</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Téléphone</label>
              <input
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                placeholder="Ex. +237 6 12 34 56 78"
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Ville</label>
              <input
                value={form.city}
                onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Pays</label>
              <input
                value={form.country}
                onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button type="submit">Enregistrer</Button>
            {savedMsg && <span className="text-xs font-medium text-emerald-600">Profil mis à jour.</span>}
          </div>
        </form>
      )}

      {tab === 'abonnement' && (
        <div className="mt-6 space-y-3">
          {PLANS.map((p) => (
            <div
              key={p.id}
              className={`flex flex-col gap-3 rounded-2xl border p-5 sm:flex-row sm:items-center sm:justify-between ${
                plan === p.id ? 'border-indigo-300 bg-indigo-50/50' : 'border-slate-100 bg-white'
              }`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-slate-900">{p.name}</p>
                  {plan === p.id && <Badge tone="indigo">Plan actuel</Badge>}
                  {p.highlight && plan !== p.id && <Badge tone="violet">Populaire</Badge>}
                </div>
                <p className="mt-0.5 text-xs text-slate-500">{formatPrice(p, 'XAF', false)} / mois</p>
              </div>
              <Button variant={plan === p.id ? 'outline' : 'primary'} disabled={plan === p.id} onClick={() => setPlan(p.id)}>
                {plan === p.id ? 'Plan actif' : `Choisir ${p.name}`}
              </Button>
            </div>
          ))}
          <p className="text-xs text-slate-400">
            Besoin de comparer les offres en détail ?{' '}
            <Link to="/tarifs" className="font-semibold text-indigo-600 hover:underline">
              Voir la page tarifs
            </Link>
          </p>
        </div>
      )}

      {tab === 'facturation' && (
        <div className="mt-6">
          {payments.length === 0 ? (
            <EmptyState icon="bi-receipt" title="Aucun paiement enregistré" text="Vos factures et reçus apparaîtront ici après un abonnement Premium." />
          ) : (
            <div className="space-y-2">
              {payments.map((p) => (
                <div key={p.id} className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{p.label}</p>
                    <p className="text-xs text-slate-400">{p.method} · {new Date(p.createdAt).toLocaleDateString('fr-FR')}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-slate-800">{p.amount}</p>
                    <Badge tone={p.status === 'Payé' ? 'emerald' : 'rose'}>{p.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === 'securite' && (
        <div className="mt-6 space-y-4 rounded-2xl border border-slate-100 bg-white p-6">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Mot de passe actuel</label>
            <input type="password" placeholder="••••••••" className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Nouveau mot de passe</label>
            <input type="password" placeholder="Au moins 6 caractères" className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100" />
          </div>
          <Button>Mettre à jour le mot de passe</Button>

          <div className="border-t border-slate-100 pt-4">
            <p className="text-sm font-semibold text-rose-600">Zone dangereuse</p>
            <p className="mt-1 text-xs text-slate-500">La suppression de votre compte efface définitivement vos lettres et vos données.</p>
            <Button variant="danger" size="sm" className="mt-3">
              Supprimer mon compte
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
