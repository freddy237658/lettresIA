import { useLetters } from '@/context/LetterContext'
import { Badge, EmptyState } from '@/components/ui/Primitives'

const SEED_PAYMENTS = [
  { id: 'p1', label: 'Abonnement Premium', amount: '9 999 FCFA', method: 'Orange Money', createdAt: '2026-09-20T10:00:00Z', status: 'Payé' as const, user: 'ahmed@exemple.com' },
  { id: 'p2', label: 'Abonnement Entreprise', amount: '29 999 FCFA', method: 'Carte bancaire', createdAt: '2026-09-18T14:30:00Z', status: 'Payé' as const, user: 'sarah.kom@exemple.com' },
  { id: 'p3', label: 'Abonnement Premium', amount: '9 999 FCFA', method: 'MTN Mobile Money', createdAt: '2026-09-15T09:12:00Z', status: 'Échoué' as const, user: 'paul.etoundi@exemple.com' },
]

export default function AdminPayments() {
  const { payments } = useLetters()
  const sessionPayments = payments.map((p) => ({ ...p, user: 'vous (session actuelle)' }))
  const all = [...sessionPayments, ...SEED_PAYMENTS]

  const totalPaid = all.filter((p) => p.status === 'Payé').length
  const totalFailed = all.filter((p) => p.status === 'Échoué').length

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Paiements</h1>
      <p className="mt-1 text-sm text-slate-500">{totalPaid} paiements réussis · {totalFailed} échoués.</p>

      {all.length === 0 ? (
        <div className="mt-6">
          <EmptyState icon="bi-receipt" title="Aucun paiement" />
        </div>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-100 bg-white">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400">
                <th className="px-4 py-3 font-semibold">Utilisateur</th>
                <th className="px-4 py-3 font-semibold">Détail</th>
                <th className="px-4 py-3 font-semibold">Moyen</th>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold">Montant</th>
                <th className="px-4 py-3 font-semibold">Statut</th>
              </tr>
            </thead>
            <tbody>
              {all.map((p) => (
                <tr key={p.id} className="border-b border-slate-50 last:border-0">
                  <td className="px-4 py-3 text-slate-600">{p.user}</td>
                  <td className="px-4 py-3 font-medium text-slate-800">{p.label}</td>
                  <td className="px-4 py-3 text-slate-500">{p.method}</td>
                  <td className="px-4 py-3 text-slate-500">{new Date(p.createdAt).toLocaleDateString('fr-FR')}</td>
                  <td className="px-4 py-3 font-semibold text-slate-800">{p.amount}</td>
                  <td className="px-4 py-3">
                    <Badge tone={p.status === 'Payé' ? 'emerald' : 'rose'}>{p.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="mt-4 text-xs text-slate-400">
        Rappel du cahier des charges (§5.9) : en production, la confirmation d'un paiement doit toujours être validée
        côté serveur via API/webhook du prestataire, jamais uniquement depuis le navigateur.
      </p>
    </div>
  )
}