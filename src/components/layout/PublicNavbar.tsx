import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { LinkButton } from '@/components/ui/Button'

const links = [
  { to: '/', label: 'Accueil' },
  { to: '/modeles', label: 'Modèles' },
  { to: '/categories', label: 'Catégories' },
  { to: '/tarifs', label: 'Tarifs' },
  { to: '/faq', label: 'FAQ' },
]

export function PublicNavbar() {
  const { isAuthenticated } = useAuth()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white">
            <i className="bi bi-envelope-paper-fill text-lg" aria-hidden />
          </span>
          <span className="text-lg font-extrabold tracking-tight text-slate-900">
            Lettre<span className="text-indigo-600">AI</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive ? 'text-indigo-700' : 'text-slate-600 hover:text-indigo-700'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {isAuthenticated ? (
            <LinkButton to="/app/tableau-de-bord" variant="primary" size="md">
              Tableau de bord
            </LinkButton>
          ) : (
            <>
              <LinkButton to="/connexion" variant="ghost" size="md">
                Connexion
              </LinkButton>
              <LinkButton to="/inscription" variant="primary" size="md" icon={<i className="bi bi-person-plus-fill" />}>
                S'inscrire
              </LinkButton>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 md:hidden"
          aria-label="Ouvrir le menu"
          aria-expanded={open}
        >
          <i className={`bi ${open ? 'bi-x-lg' : 'bi-list'} text-xl`} aria-hidden />
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-100 bg-white px-4 py-3 md:hidden">
          <nav className="flex flex-col gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
          <div className="mt-3 flex flex-col gap-2 border-t border-slate-100 pt-3">
            {isAuthenticated ? (
              <LinkButton to="/app/tableau-de-bord" variant="primary">
                Tableau de bord
              </LinkButton>
            ) : (
              <>
                <LinkButton to="/connexion" variant="outline">
                  Connexion
                </LinkButton>
                <LinkButton to="/inscription" variant="primary">
                  S'inscrire
                </LinkButton>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
