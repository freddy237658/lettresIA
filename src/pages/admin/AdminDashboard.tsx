import { Link } from 'react-router-dom'
import { ADMIN_USERS, AI_PROVIDERS, ADMIN_ACTIVITY } from '@/data/adminMock'
import { TEMPLATES } from '@/data/templates'
import { useLetters } from '@/context/LetterContext'
import { Card, Badge } from '@/components/ui/Primitives'

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime()
  const hours = Math.floor(diff / 3_600_000)
  if (hours < 1) return "à l'instant"
  if (hours < 24) return `il y a ${hours} h`
  return `il y a ${Math.floor(hours / 24)} j`
}

const STATUS_TONE: Record<string, 'emerald' | 'amber' | 'rose'> = {
  ok: 'emerald',
  quota: 'amber',
  indisponible: 'rose',
}

export default function AdminDashboard() {
  const { letters, payments } = useLetters()

  const revenue = payments
    .filter((p) => p.status === 'Payé')
    .reduce((sum, p) => sum + (parseFloat(p.amount.replace(/[^\d.]/g, '')) || 0), 0)

  const stats = [
    { label: 'Utilisateurs', value: ADMIN_USERS.length, icon: 'bi-people-fill', tone: 'bg-indigo-50 text-indigo-600' },
    { label: 'Lettres générées', value: letters.length + 128, icon: 'bi-file-earmark-text-fill', tone: 'bg-emerald-50 text-emerald-600' },
    { label: 'Modèles actifs', value: TEMPLATES.length, icon: 'bi-grid-3x3-gap-fill', tone: 'bg-violet-50 text-violet-600' },
    { label: 'Revenus (session)', value: `${revenue.toLocaleString('fr-FR')} ${payments[0]?.amount.replace(/[\d.,\s]/g, '') || 'FCFA'}`, icon: 'bi-cash-stack', tone: 'bg-amber-50 text-amber-600' },
  ]

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Tableau de bord administrateur</h1>
      <p className="mt-1 text-sm text-slate-500">Vue d'ensemble de l'activité de la plateforme LettreAI.</p>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="p-5">
            <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${s.tone}`}>
              <i className={`bi ${s.icon}`} aria-hidden />
            </div>
            <p className="text-xl font-extrabold text-slate-900">{s.value}</p>
            <p className="text-xs text-slate-500">{s.label}</p>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-900">Fournisseurs IA</h2>
            <Link to="/admin/ia" className="text-xs font-semibold text-indigo-600 hover:underline">
              Voir la supervision complète
            </Link>
          </div>
          <div className="mt-3 space-y-2">
            {AI_PROVIDERS.map((p) => (
              <div key={p.name} className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-50 text-slate-500">
                    <i className="bi bi-cpu-fill" aria-hidden />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{p.name}</p>
                    <p className="text-xs text-slate-400">{p.callsToday} appels aujourd'hui · {p.latencyMs} ms</p>
                  </div>
                </div>
                <Badge tone={STATUS_TONE[p.status]}>
                  {p.status === 'ok' ? 'Opérationnel' : p.status === 'quota' ? 'Quota élevé' : 'Indisponible'}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-slate-900">Activité récente</h2>
          <div className="mt-3 space-y-3 rounded-2xl border border-slate-100 bg-white p-4">
            {ADMIN_ACTIVITY.map((a) => (
              <div key={a.id} className="flex gap-3">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-slate-500">
                  <i className={`bi ${a.icon} text-xs`} aria-hidden />
                </span>
                <div>
                  <p className="text-xs text-slate-700">{a.text}</p>
                  <p className="text-[11px] text-slate-400">{timeAgo(a.createdAt)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}