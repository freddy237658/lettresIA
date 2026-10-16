import { AI_PROVIDERS, AI_LOGS } from '@/data/adminMock'
import { Badge, Card } from '@/components/ui/Primitives'

const STATUS_TONE: Record<string, 'emerald' | 'amber' | 'rose'> = {
  ok: 'emerald',
  quota: 'amber',
  indisponible: 'rose',
}

const LOG_TONE: Record<string, 'emerald' | 'amber' | 'rose'> = {
  succes: 'emerald',
  fallback: 'amber',
  erreur: 'rose',
}

export default function AdminAI() {
  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Supervision IA</h1>
      <p className="mt-1 text-sm text-slate-500">
        Disponibilité, latence et consommation des fournisseurs IA — chaîne de fallback définie au §10 du cahier des charges.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {AI_PROVIDERS.map((p, i) => (
          <Card key={p.name} className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400">#{i + 1}</span>
              <Badge tone={STATUS_TONE[p.status]}>
                {p.status === 'ok' ? 'OK' : p.status === 'quota' ? 'Quota' : 'Indispo.'}
              </Badge>
            </div>
            <p className="mt-2 text-sm font-bold text-slate-900">{p.name}</p>
            <p className="text-xs text-slate-400">{p.latencyMs || '—'} ms · {p.callsToday} appels</p>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-full rounded-full ${p.usagePercent > 90 ? 'bg-rose-500' : p.usagePercent > 70 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                style={{ width: `${p.usagePercent}%` }}
              />
            </div>
            <p className="mt-1 text-[11px] text-slate-400">{p.usagePercent}% du quota</p>
          </Card>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2 rounded-2xl border border-dashed border-slate-200 bg-white px-4 py-3 text-xs text-slate-500">
        <i className="bi bi-signpost-split text-indigo-500" aria-hidden />
        Chaîne de fallback :
        {AI_PROVIDERS.map((p, i) => (
          <span key={p.name} className="flex items-center gap-2">
            <span className={`font-semibold ${p.status === 'indisponible' ? 'text-slate-300 line-through' : 'text-slate-700'}`}>{p.name}</span>
            {i < AI_PROVIDERS.length - 1 && <i className="bi bi-arrow-right text-slate-300" aria-hidden />}
          </span>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-sm font-semibold text-slate-900">Journal des appels récents</h2>
        <div className="mt-3 overflow-x-auto rounded-2xl border border-slate-100 bg-white">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400">
                <th className="px-4 py-3 font-semibold">Tâche</th>
                <th className="px-4 py-3 font-semibold">Fournisseur</th>
                <th className="px-4 py-3 font-semibold">Utilisateur</th>
                <th className="px-4 py-3 font-semibold">Latence</th>
                <th className="px-4 py-3 font-semibold">Heure</th>
                <th className="px-4 py-3 font-semibold">Statut</th>
              </tr>
            </thead>
            <tbody>
              {AI_LOGS.map((log) => (
                <tr key={log.id} className="border-b border-slate-50 last:border-0">
                  <td className="px-4 py-3 capitalize text-slate-700">{log.task}</td>
                  <td className="px-4 py-3 text-slate-600">{log.provider}</td>
                  <td className="px-4 py-3 text-slate-500">{log.userEmail}</td>
                  <td className="px-4 py-3 text-slate-500">{log.latencyMs ? `${log.latencyMs} ms` : '—'}</td>
                  <td className="px-4 py-3 text-slate-500">
                    {new Date(log.createdAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="px-4 py-3">
                    <Badge tone={LOG_TONE[log.status]}>{log.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}