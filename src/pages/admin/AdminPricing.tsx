import { useState } from 'react'
import { PLANS as SEED_PLANS, formatPrice } from '@/data/plans'
import type { Plan } from '@/types'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Primitives'

const DEFAULT_CREDIT_COSTS = [
  { action: 'Génération de lettre', credits: 1 },
  { action: 'Correction', credits: 1 },
  { action: 'Reformulation', credits: 1 },
  { action: 'Changement de ton', credits: 1 },
]

export default function AdminPricing() {
  const [plans, setPlans] = useState<Plan[]>(SEED_PLANS)
  const [costs, setCosts] = useState(DEFAULT_CREDIT_COSTS)
  const [saved, setSaved] = useState(false)

  function updatePlan(id: string, patch: Partial<Plan>) {
    setPlans((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)))
  }

  function updateCost(index: number, value: number) {
    setCosts((prev) => prev.map((c, i) => (i === index ? { ...c, credits: value } : c)))
  }

  function save() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Plans & crédits</h1>
      <p className="mt-1 text-sm text-slate-500">Tarification modifiable sans redéploiement — cf. cahier des charges §5.8.</p>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {plans.map((p) => (
          <div key={p.id} className="rounded-2xl border border-slate-100 bg-white p-5">
            <div className="flex items-center justify-between">
              <input
                value={p.name}
                onChange={(e) => updatePlan(p.id, { name: e.target.value })}
                className="w-2/3 rounded-lg border border-transparent px-1 text-sm font-bold text-slate-900 hover:border-slate-200 focus:border-indigo-400 focus:outline-none"
              />
              {p.highlight && <Badge tone="violet">Mis en avant</Badge>}
            </div>

            <div className="mt-4 space-y-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-500">Prix (FCFA / mois)</label>
                <input
                  type="number"
                  value={p.priceXAF}
                  onChange={(e) => updatePlan(p.id, { priceXAF: Number(e.target.value) })}
                  className="w-full rounded-lg border border-slate-200 px-2.5 py-1.5 text-sm focus:border-indigo-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-500">Prix (EUR / mois)</label>
                <input
                  type="number"
                  value={p.priceEUR}
                  onChange={(e) => updatePlan(p.id, { priceEUR: Number(e.target.value) })}
                  className="w-full rounded-lg border border-slate-200 px-2.5 py-1.5 text-sm focus:border-indigo-400 focus:outline-none"
                />
              </div>
            </div>

            <p className="mt-3 text-xs text-slate-400">Aperçu : {formatPrice(p, 'XAF', false)} / mois</p>

            <label className="mt-3 flex items-center gap-2 text-xs text-slate-500">
              <input
                type="checkbox"
                checked={!!p.highlight}
                onChange={(e) => updatePlan(p.id, { highlight: e.target.checked })}
                className="h-3.5 w-3.5 rounded border-slate-300 text-indigo-600"
              />
              Mettre en avant sur la page tarifs
            </label>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-sm font-semibold text-slate-900">Coût des opérations IA (en crédits)</h2>
        <div className="mt-3 space-y-2 rounded-2xl border border-slate-100 bg-white p-4">
          {costs.map((c, i) => (
            <div key={c.action} className="flex items-center justify-between border-b border-slate-50 py-2 last:border-0">
              <span className="text-sm text-slate-700">{c.action}</span>
              <input
                type="number"
                min={0}
                value={c.credits}
                onChange={(e) => updateCost(i, Number(e.target.value))}
                className="w-20 rounded-lg border border-slate-200 px-2 py-1 text-right text-sm focus:border-indigo-400 focus:outline-none"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <Button onClick={save}>Enregistrer les modifications</Button>
        {saved && <span className="text-xs font-medium text-emerald-600">Configuration enregistrée.</span>}
      </div>
    </div>
  )
}