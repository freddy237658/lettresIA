import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

const items = [
  { to: '/app/tableau-de-bord', label: 'Tableau de bord', icon: 'bi-grid-1x2-fill' },
  { to: '/app/mes-lettres', label: 'Mes lettres', icon: 'bi-file-earmark-text-fill' },
  { to: '/modeles', label: 'Modèles', icon: 'bi-file-earmark-ruled-fill' },
  { to: '/app/favoris', label: 'Favoris', icon: 'bi-heart-fill' },
  { to: '/app/mon-compte', label: 'Mon compte', icon: 'bi-person-fill' },
  { to: '/app/parametres', label: 'Paramètres', icon: 'bi-gear-fill' },
]

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const { logout, user } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="flex h-full w-64 flex-col bg-[#181433] text-slate-300">
      <div className="flex h-16 items-center gap-2 px-5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 text-white">
          <i className="bi bi-envelope-paper-fill" aria-hidden />
        </span>
        <span className="text-base font-extrabold text-white">
          Lettre<span className="text-indigo-400">AI</span>
        </span>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
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
        <div className="mb-2 flex items-center gap-3 rounded-xl px-2 py-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-500/20 text-sm font-bold text-indigo-300">
            {(user?.firstName?.[0] ?? 'U').toUpperCase()}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">{user?.firstName || 'Utilisateur'}</p>
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
