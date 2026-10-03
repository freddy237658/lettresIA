import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PLANS, formatPrice } from '@/data/plans'
import { useAuth } from '@/context/AuthContext'
import { useLetters } from '@/context/LetterContext'
import { uid } from '@/services/storage'
import { Badge } from '@/components/ui/Primitives'
import { Button } from '@/components/ui/Button'

const PAYMENT_METHODS = [
  { id: 'card', label: 'Carte bancaire', icon: 'bi-credit-card-fill' },
  { id: 'paypal', label: 'PayPal', icon: 'bi-paypal' },
  { id: 'orange', label: 'Orange Money', icon: 'bi-phone-fill' },
  { id: 'mtn', label: 'MTN Mobile Money', icon: 'bi-phone-fill' },
]

export default function Pricing() {
  const { isAuthenticated, plan, setPlan } = useAuth()
  const { addPayment } = useLetters()
  const navigate = useNavigate()
  const [annual, setAnnual] = useState(false)
  const [currency, setCurrency] = useState<'XAF' | 'EUR'>('XAF')
  const [checkoutPlan, setCheckoutPlan] = useState<string | null>(null)
  const [method, setMethod] = useState('card')

  function choose(planId: (typeof PLANS)[number]['id']) {
    if (planId === 'gratuit') {
      if (!isAuthenticated) return navigate('/inscription')
      setPlan('gratuit')
      return
    }
    if (!isAuthenticated) return navigate('/inscription')
    setCheckoutPlan(planId)
  }

  function confirmPayment() {
    const selected = PLANS.find((p) => p.id === checkoutPlan)
    if (!selected) return
    setPlan(selected.id)
    addPayment({
      id: uid('pay'),
      label: `Abonnement ${selected.name}`,
      amount: formatPrice(selected, currency, annual),
      method: PAYMENT_METHODS.find((m) => m.id === method)?.label ?? 'Carte bancaire',
      createdAt: new Date().toISOString(),
      status: 'Payé',
    })
    setCheckoutPlan(null)
    navigate('/app/mon-compte')
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <div className="text-center">
        <Badge tone="indigo">Tarifs</Badge>
        <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">Choisissez votre formule</h1>
        <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
          Accédez à tous les modèles et fonctionnalités premium. Changez ou annulez à tout moment.
        </p>

        <div className="mt-6 inline-flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-1">
          <button
            type="button"
            onClick={() => setAnnual(false)}
            className={`rounded-lg px-4 py-1.5 text-xs font-semibold transition ${!annual ? 'bg-indigo-600 text-white' : 'text-slate-500'}`}
          >
            Mensuel
          </button>
          <button
            type="button"
            onClick={() => setAnnual(true)}
            className={`rounded-lg px-4 py-1.5 text-xs font-semibold transition ${annual ? 'bg-indigo-600 text-white' : 'text-slate-500'}`}
          >
            Annuel <span className="text-[10px] opacity-80">-20%</span>
          </button>
        </div>

        <div className="mt-3">
          <button
            type="button"
            onClick={() => setCurrency((c) => (c === 'XAF' ? 'EUR' : 'XAF'))}
            className="text-xs font-medium text-indigo-600 hover:underline"
          >
            Afficher en {currency === 'XAF' ? 'euros (€)' : 'francs CFA'}
          </button>
        </div>
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {PLANS.map((p) => (
          <div
            key={p.id}
            className={`relative flex flex-col rounded-3xl border p-7 ${
              p.highlight ? 'border-indigo-300 bg-white shadow-xl shadow-indigo-100' : 'border-slate-100 bg-white'
            }`}
          >
            {p.highlight && (
              <span className="absolute -top-3 left-7 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-3 py-1 text-[11px] font-bold text-white">
                Plus populaire
              </span>
            )}
            <h2 className="text-lg font-bold text-slate-900">{p.name}</h2>
            <p className="mt-3">
              <span className="text-3xl font-extrabold text-slate-900">{formatPrice(p, currency, annual)}</span>
              <span className="text-sm text-slate-400"> / mois</span>
            </p>

            <ul className="mt-6 flex-1 space-y-2.5 text-sm text-slate-600">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <i className="bi bi-check-circle-fill mt-0.5 text-emerald-500" aria-hidden />
                  {f}
                </li>
              ))}
            </ul>

            <Button
              className="mt-7"
              variant={p.id === plan ? 'outline' : p.highlight ? 'primary' : 'secondary'}
              disabled={p.id === plan}
              onClick={() => choose(p.id)}
            >
              {p.id === plan ? 'Plan actif' : p.cta}
            </Button>
          </div>
        ))}
      </div>

      {checkoutPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">Paiement sécurisé</h3>
              <button type="button" onClick={() => setCheckoutPlan(null)} aria-label="Fermer" className="text-slate-400 hover:text-slate-700">
                <i className="bi bi-x-lg" aria-hidden />
              </button>
            </div>
            <p className="mt-1 text-xs text-slate-400">Toutes vos transactions sont protégées et sécurisées.</p>

            <p className="mb-2 mt-5 text-xs font-medium text-slate-500">Choisissez votre moyen de paiement</p>
            <div className="grid grid-cols-2 gap-2">
              {PAYMENT_METHODS.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMethod(m.id)}
                  className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left text-xs font-medium transition ${
                    method === m.id ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-200 text-slate-600'
                  }`}
                >
                  <i className={`bi ${m.icon}`} aria-hidden />
                  {m.label}
                </button>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
              <span className="text-sm text-slate-600">Total à payer</span>
              <span className="text-sm font-bold text-slate-900">
                {formatPrice(PLANS.find((p) => p.id === checkoutPlan)!, currency, annual)}
              </span>
            </div>

            <Button fullWidth size="lg" className="mt-5" onClick={confirmPayment} icon={<i className="bi bi-lock-fill" />}>
              Payer maintenant
            </Button>
            <p className="mt-3 text-center text-[11px] text-slate-400">
              Prototype : aucun paiement réel n'est effectué. La confirmation se ferait côté serveur via webhook.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
