import { useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/Button'

export default function AdminLogin() {
  const { loginAsAdmin } = useAuth()
  const navigate = useNavigate()
  const location = useLocation() as { state?: { from?: string } }
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!email || !password) {
      setError('Merci de renseigner votre e-mail et votre mot de passe.')
      return
    }
    setError('')
    setLoading(true)
    await loginAsAdmin(email, password)
    setLoading(false)
    navigate(location.state?.from || '/admin', { replace: true })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#14161f] px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white">
            <i className="bi bi-shield-lock-fill text-xl" aria-hidden />
          </span>
          <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-white">Administration LettreAI</h1>
          <p className="mt-1 text-sm text-slate-400">Accès réservé à l'équipe LettreAI.</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6">
          {error && <p className="rounded-xl bg-rose-500/10 px-3 py-2 text-sm font-medium text-rose-300">{error}</p>}

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-300">E-mail administrateur</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@lettreai.com"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-300">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
            />
          </div>

          <Button type="submit" fullWidth size="lg" disabled={loading} className="!bg-gradient-to-r !from-amber-500 !to-orange-600">
            {loading ? 'Connexion…' : "Accéder à l'administration"}
          </Button>

          <p className="text-center text-xs text-slate-500">
            Prototype : n'importe quel e-mail / mot de passe donne accès à l'espace admin.
          </p>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          <Link to="/" className="font-medium text-slate-300 hover:text-white">
            ← Retour au site
          </Link>
        </p>
      </div>
    </div>
  )
}