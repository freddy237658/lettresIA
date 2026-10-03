import { useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { useLetters } from '@/context/LetterContext'
import { Sidebar } from './Sidebar'
import { NotificationsPanel } from './NotificationsPanel'

export function AppLayout() {
  const { isAuthenticated, credits, plan } = useAuth()
  const { notifications } = useLetters()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)

  if (!isAuthenticated) {
    return <Navigate to="/connexion" state={{ from: location.pathname }} replace />
  }

  const unread = notifications.filter((n) => !n.read).length

  return (
    <div className="flex min-h-screen bg-[#f7f7fb]">
      <aside className="hidden lg:block">
        <Sidebar />
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="absolute inset-0 bg-slate-900/40" onClick={() => setMobileOpen(false)} />
          <div className="relative">
            <Sidebar onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex min-h-screen flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-slate-100 bg-white/90 px-4 backdrop-blur sm:px-6">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 lg:hidden"
            aria-label="Ouvrir le menu"
          >
            <i className="bi bi-list text-xl" aria-hidden />
          </button>

          <div className="hidden text-sm text-slate-400 lg:block">
            {plan === 'gratuit' ? (
              <span>
                <i className="bi bi-lightning-charge-fill mr-1 text-amber-500" aria-hidden />
                {credits} crédit{credits > 1 ? 's' : ''} restant{credits > 1 ? 's' : ''} ce mois-ci
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 font-medium text-indigo-600">
                <i className="bi bi-gem" aria-hidden /> Plan {plan === 'premium' ? 'Premium' : 'Entreprise'} — générations illimitées
              </span>
            )}
          </div>

          <div className="ml-auto flex items-center gap-2">
            <div className="relative">
              <button
                type="button"
                onClick={() => setNotifOpen((v) => !v)}
                className="relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100"
                aria-label="Notifications"
              >
                <i className="bi bi-bell-fill text-lg" aria-hidden />
                {unread > 0 && (
                  <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500" aria-hidden />
                )}
              </button>
              {notifOpen && <NotificationsPanel onClose={() => setNotifOpen(false)} />}
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
