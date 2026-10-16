import { useMemo, useState } from 'react'
import { ADMIN_USERS as SEED } from '@/data/adminMock'
import type { AdminUserRow } from '@/types'
import { Badge } from '@/components/ui/Primitives'

const ROLE_TONE = { utilisateur: 'slate', premium: 'violet', admin: 'amber' } as const
const PLAN_TONE = { gratuit: 'slate', premium: 'violet', entreprise: 'indigo' } as const

export default function AdminUsers() {
  const [users, setUsers] = useState<AdminUserRow[]>(SEED)
  const [query, setQuery] = useState('')

  const filtered = useMemo(
    () => users.filter((u) => u.name.toLowerCase().includes(query.toLowerCase()) || u.email.toLowerCase().includes(query.toLowerCase())),
    [users, query],
  )

  function toggleStatus(id: string) {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, status: u.status === 'actif' ? 'suspendu' : 'actif' } : u)))
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Utilisateurs</h1>
          <p className="mt-1 text-sm text-slate-500">{users.length} comptes enregistrés sur la plateforme.</p>
        </div>
        <div className="relative w-full sm:w-72">
          <i className="bi bi-search absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un utilisateur…"
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-100 bg-white">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400">
              <th className="px-4 py-3 font-semibold">Utilisateur</th>
              <th className="px-4 py-3 font-semibold">Rôle</th>
              <th className="px-4 py-3 font-semibold">Plan</th>
              <th className="px-4 py-3 font-semibold">Lettres</th>
              <th className="px-4 py-3 font-semibold">Inscrit le</th>
              <th className="px-4 py-3 font-semibold">Statut</th>
              <th className="px-4 py-3 font-semibold text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.id} className="border-b border-slate-50 last:border-0">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-50 text-xs font-bold text-indigo-600">
                      {u.name[0]}
                    </span>
                    <div>
                      <p className="font-medium text-slate-800">{u.name}</p>
                      <p className="text-xs text-slate-400">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3"><Badge tone={ROLE_TONE[u.role]}>{u.role}</Badge></td>
                <td className="px-4 py-3"><Badge tone={PLAN_TONE[u.plan]}>{u.plan}</Badge></td>
                <td className="px-4 py-3 text-slate-600">{u.lettersCount}</td>
                <td className="px-4 py-3 text-slate-500">{new Date(u.joinedAt).toLocaleDateString('fr-FR')}</td>
                <td className="px-4 py-3">
                  <Badge tone={u.status === 'actif' ? 'emerald' : 'rose'}>{u.status}</Badge>
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    type="button"
                    onClick={() => toggleStatus(u.id)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                      u.status === 'actif' ? 'bg-rose-50 text-rose-600 hover:bg-rose-100' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                    }`}
                  >
                    {u.status === 'actif' ? 'Suspendre' : 'Réactiver'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="px-4 py-8 text-center text-sm text-slate-400">Aucun utilisateur trouvé.</p>}
      </div>
    </div>
  )
}