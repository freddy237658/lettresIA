import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

const items = [
  { to: '/admin', label: 'Tableau de bord', icon: 'bi-speedometer2', end: true },
  { to: '/admin/utilisateurs', label: 'Utilisateurs', icon: 'bi-people-fill' },
  { to: '/admin/catalogue', label: 'Catégories & modèles', icon: 'bi-grid-3x3-gap-fill' },
  { to: '/admin/tarification', label: 'Plans & crédits', icon: 'bi-gem' },
  { to: '/admin/paiements', label: 'Paiements', icon: 'bi-credit-card-fill' },
  { to: '/admin/ia', label: "Supervision IA", icon: 'bi-cpu-fill' },
  { to: '/admin/contenus', label: 'Notifications & FAQ', icon: 'bi-megaphone-fill' },
]

export function AdminSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const { logout, user } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="flex h-full w-64 flex-col bg-[#14161f] text-slate-300">
      <div className="flex h-16 items-center gap-2 px-5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 text-white">
          <i className="bi bi-shield-lock-fill" aria-hidden />
        </span>
        <div className="leading-tight">
          <span className="block text-base font-extrabold text-white">
            Lettre<span className="text-amber-400">AI</span>
          </span>
          <span className="block text-[10px] font-semibold uppercase tracking-wide text-amber-400/80">Administration</span>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                isActive ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <i className={`bi ${item.icon} text-base`} aria-hidden />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-white/10 p-3">
        <NavLink
          to="/app/tableau-de-bord"
          className="mb-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
        >
          <i className="bi bi-arrow-left-circle text-base" aria-hidden />
          Espace client
        </NavLink>
        <div className="mb-2 flex items-center gap-3 rounded-xl px-2 py-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-500/20 text-sm font-bold text-amber-300">
            {(user?.firstName?.[0] ?? 'A').toUpperCase()}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">{user?.firstName || 'Admin'}</p>
            <p className="truncate text-xs text-slate-400">{user?.email}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            logout()
            navigate('/')
          }}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
        >
          <i className="bi bi-box-arrow-right text-base" aria-hidden />
          Déconnexion
        </button>
      </div>
    </div>
  )
}