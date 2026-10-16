import { useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { AdminSidebar } from './AdminSidebar'

export function AdminLayout() {
  const { isAuthenticated, isAdmin } = useAuth()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/admin/connexion" state={{ from: location.pathname }} replace />
  }

  return (
    <div className="flex min-h-screen bg-[#f4f4f7]">
      <aside className="hidden lg:block">
        <AdminSidebar />
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="absolute inset-0 bg-slate-900/40" onClick={() => setMobileOpen(false)} />
          <div className="relative">
            <AdminSidebar onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex min-h-screen flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-slate-200 bg-white/90 px-4 backdrop-blur sm:px-6">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 lg:hidden"
            aria-label="Ouvrir le menu"
          >
            <i className="bi bi-list text-xl" aria-hidden />
          </button>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
            <i className="bi bi-shield-lock-fill" aria-hidden /> Espace administrateur
          </span>
        </header>

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}